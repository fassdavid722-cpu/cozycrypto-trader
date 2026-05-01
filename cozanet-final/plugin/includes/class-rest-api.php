<?php
defined('ABSPATH') || exit;

class CZP_REST_API {
    const NS = 'cozanet/v1';

    public static function init() {
        add_action('rest_api_init', [__CLASS__, 'register']);
    }

    public static function register() {
        register_rest_route(self::NS, '/route', [
            'methods'             => 'POST',
            'callback'            => [__CLASS__, 'route'],
            'permission_callback' => '__return_true',
            'args' => [
                'amount'         => ['required'=>true,'type'=>'integer','sanitize_callback'=>'absint'],
                'from_currency'  => ['default'=>'NGN','sanitize_callback'=>'sanitize_text_field'],
                'to_crypto'      => ['default'=>'USDT','sanitize_callback'=>'sanitize_text_field'],
                'network'        => ['default'=>'BSC','sanitize_callback'=>'sanitize_text_field'],
                'priority'       => ['default'=>'cheapest','sanitize_callback'=>'sanitize_text_field'],
                'wallet_address' => ['default'=>'','sanitize_callback'=>'sanitize_text_field'],
            ],
        ]);

        register_rest_route(self::NS, '/status', [
            'methods'             => 'GET',
            'callback'            => fn() => rest_ensure_response(['status'=>'online','version'=>CZP_VER]),
            'permission_callback' => '__return_true',
        ]);
    }

    public static function route(WP_REST_Request $req): WP_REST_Response {
        $params = $req->get_params();
        $key    = 'cz_' . md5(serialize($params));
        $cached = get_transient($key);
        if ($cached) return rest_ensure_response($cached);

        $result = CZP_Route_Engine::find($params);
        if (is_wp_error($result)) return new WP_REST_Response(['message'=>$result->get_error_message()], 400);

        $result['ai_insight'] = CZP_AI_Insight::generate($result['best'], $params);

        // Log
        global $wpdb;
        $wpdb->insert($wpdb->prefix . 'cz_searches', [
            'user_id'       => get_current_user_id(),
            'amount'        => $params['amount'],
            'from_currency' => $params['from_currency'],
            'to_crypto'     => $params['to_crypto'],
            'network'       => $params['network'],
            'best_provider' => $result['best']['name'],
            'result'        => wp_json_encode($result),
            'created_at'    => current_time('mysql'),
        ]);

        set_transient($key, $result, 5 * MINUTE_IN_SECONDS);
        return rest_ensure_response($result);
    }
}
