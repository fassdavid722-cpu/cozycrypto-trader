<?php
/**
 * Cozanet REST API
 * Registers: /wp-json/cozanet/v1/route
 * This is the clean bridge between UI and logic.
 */
defined('ABSPATH') || exit;

class CZ_REST_API {

    const NS = 'cozanet/v1';

    public static function init() {
        add_action( 'rest_api_init', [ __CLASS__, 'register_routes' ] );
    }

    public static function register_routes() {
        // POST /wp-json/cozanet/v1/route
        register_rest_route( self::NS, '/route', [
            'methods'             => WP_REST_Server::CREATABLE,
            'callback'            => [ __CLASS__, 'handle_route' ],
            'permission_callback' => '__return_true', // public — no auth required to get routes
            'args'                => [
                'amount' => [
                    'required'          => true,
                    'type'              => 'integer',
                    'minimum'           => 100,
                    'sanitize_callback' => 'absint',
                ],
                'from_currency' => [
                    'default'           => 'NGN',
                    'sanitize_callback' => 'sanitize_text_field',
                ],
                'to_crypto' => [
                    'default'           => 'USDT',
                    'sanitize_callback' => 'sanitize_text_field',
                ],
                'network' => [
                    'default'           => 'BSC',
                    'sanitize_callback' => 'sanitize_text_field',
                ],
                'priority' => [
                    'default'           => 'cheapest',
                    'enum'              => [ 'cheapest', 'fastest', 'safest' ],
                    'sanitize_callback' => 'sanitize_text_field',
                ],
                'wallet_address' => [
                    'default'           => '',
                    'sanitize_callback' => 'sanitize_text_field',
                ],
            ],
        ] );

        // GET /wp-json/cozanet/v1/providers
        register_rest_route( self::NS, '/providers', [
            'methods'             => WP_REST_Server::READABLE,
            'callback'            => [ __CLASS__, 'handle_providers' ],
            'permission_callback' => '__return_true',
        ] );

        // GET /wp-json/cozanet/v1/status
        register_rest_route( self::NS, '/status', [
            'methods'             => WP_REST_Server::READABLE,
            'callback'            => [ __CLASS__, 'handle_status' ],
            'permission_callback' => '__return_true',
        ] );
    }

    /**
     * POST /route — find best route + AI insight
     */
    public static function handle_route( WP_REST_Request $req ): WP_REST_Response {
        $params = $req->get_params();

        // Cache key: same params = same result (cache 5 min)
        $cache_key = 'cz_route_' . md5( json_encode( $params ) );
        $cached    = get_transient( $cache_key );

        if ( $cached ) {
            return rest_ensure_response( $cached );
        }

        $result = CZ_Route_Engine::find_best_route( $params );

        if ( is_wp_error( $result ) ) {
            return new WP_REST_Response(
                [ 'message' => $result->get_error_message() ],
                $result->get_error_data()['status'] ?? 400
            );
        }

        // Generate AI insight
        $result['ai_insight'] = CZ_AI_Insight::generate( $result['best'], $params );

        // Format time field
        $result['best']['time'] = ( $result['best']['speed_min'] ?? 15 ) . ' min';
        foreach ( $result['others'] as &$r ) {
            $r['time'] = ( $r['speed_min'] ?? 30 ) . ' min';
        }

        // Save to DB (for history)
        self::log_search( $params, $result );

        // Cache for 5 minutes
        set_transient( $cache_key, $result, 5 * MINUTE_IN_SECONDS );

        return rest_ensure_response( $result );
    }

    /**
     * GET /providers
     */
    public static function handle_providers(): WP_REST_Response {
        return rest_ensure_response( [
            'providers' => [
                [ 'id' => 'quidax',     'name' => 'Quidax',      'type' => 'Exchange' ],
                [ 'id' => 'binance_p2p','name' => 'Binance P2P', 'type' => 'P2P' ],
                [ 'id' => 'yellowcard', 'name' => 'Yellow Card',  'type' => 'Exchange' ],
                [ 'id' => 'paxful_p2p', 'name' => 'Paxful P2P',  'type' => 'P2P' ],
            ],
        ] );
    }

    /**
     * GET /status
     */
    public static function handle_status(): WP_REST_Response {
        return rest_ensure_response( [
            'status'    => 'online',
            'version'   => CZPLUGIN_VER,
            'providers' => 4,
            'timestamp' => current_time( 'mysql' ),
        ] );
    }

    /**
     * Log search to DB
     */
    private static function log_search( array $params, array $result ) {
        global $wpdb;
        $wpdb->insert(
            $wpdb->prefix . 'cz_routes',
            [
                'user_id'     => get_current_user_id(),
                'amount'      => $params['amount'],
                'currency'    => $params['from_currency'],
                'crypto'      => $params['to_crypto'],
                'network'     => $params['network'],
                'provider'    => $result['best']['name'] ?? '',
                'result_json' => wp_json_encode( $result ),
                'created_at'  => current_time( 'mysql' ),
            ],
            [ '%d', '%d', '%s', '%s', '%s', '%s', '%s', '%s' ]
        );
    }
}
