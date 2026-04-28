<?php
/**
 * Cozanet Route Engine
 * Handles: routing logic, provider scoring, fee calculations.
 * This is the core brain. UI never touches this directly.
 */
defined('ABSPATH') || exit;

class CZ_Route_Engine {

    /**
     * Live provider data (in production, fetch from external APIs or a DB table).
     * For now, we use a curated static dataset with realistic NGN rates.
     */
    private static function get_providers() {
        return [
            [
                'id'       => 'quidax',
                'name'     => 'Quidax',
                'type'     => 'Direct Purchase',
                'icon'     => 'Q',
                'color'    => '#0d1b2e',
                'fee_pct'  => 3.2,
                'speed_min'=> 15,
                'speed_label' => 'Fast',
                'risk'     => 'Low',
                'reliability' => 99.2,
            ],
            [
                'id'       => 'binance_p2p',
                'name'     => 'Binance P2P',
                'type'     => 'Peer-to-Peer',
                'icon'     => '◆',
                'color'    => '#1a1200',
                'fee_pct'  => 4.5,
                'speed_min'=> 25,
                'speed_label' => 'Moderate',
                'risk'     => 'Medium',
                'reliability' => 91.0,
            ],
            [
                'id'       => 'yellowcard',
                'name'     => 'Yellow Card',
                'type'     => 'Exchange',
                'icon'     => 'Y',
                'color'    => '#1a1400',
                'fee_pct'  => 2.1,
                'speed_min'=> 20,
                'speed_label' => 'Fast',
                'risk'     => 'Low',
                'reliability' => 96.5,
            ],
            [
                'id'       => 'paxful_p2p',
                'name'     => 'Paxful P2P',
                'type'     => 'Peer-to-Peer',
                'icon'     => 'P',
                'color'    => '#0a1a0a',
                'fee_pct'  => 5.5,
                'speed_min'=> 30,
                'speed_label' => 'Slow',
                'risk'     => 'High',
                'reliability' => 83.0,
            ],
        ];
    }

    /**
     * Main routing function.
     *
     * @param array $params {
     *   int    $amount
     *   string $from_currency
     *   string $to_crypto
     *   string $network
     *   string $priority  — 'cheapest' | 'fastest' | 'safest'
     * }
     * @return array { best: array, others: array }
     */
    public static function find_best_route( array $params ) {
        $amount   = absint( $params['amount'] );
        $priority = sanitize_text_field( $params['priority'] ?? 'cheapest' );

        if ( $amount < 100 ) {
            return new WP_Error( 'invalid_amount', 'Amount must be at least 100', [ 'status' => 400 ] );
        }

        $providers = self::get_providers();
        $scored    = [];

        foreach ( $providers as $p ) {
            $total_fees = round( $amount * ( $p['fee_pct'] / 100 ) );
            $you_pay    = $amount - $total_fees;  // net received in crypto equivalent

            // Score: lower is better (we'll sort ascending)
            $score = self::compute_score( $p, $total_fees, $priority );

            $scored[] = array_merge( $p, [
                'total_fees' => $total_fees,
                'you_pay'    => $you_pay,
                'score'      => $score,
                'why'        => self::build_why( $p, $priority ),
            ] );
        }

        // Sort by score ascending (best first)
        usort( $scored, fn( $a, $b ) => $a['score'] <=> $b['score'] );

        $best   = $scored[0];
        $second = $scored[1] ?? null;

        // Savings vs next best
        if ( $second ) {
            $best['savings'] = max( 0, $second['total_fees'] - $best['total_fees'] );
        }

        // Remove score from output
        $clean = fn( $r ) => array_diff_key( $r, [ 'score' => 1 ] );

        return [
            'best'   => $clean( $best ),
            'others' => array_map( $clean, array_slice( $scored, 1 ) ),
        ];
    }

    private static function compute_score( array $p, int $fees, string $priority ): float {
        switch ( $priority ) {
            case 'fastest':
                return $p['speed_min'] * 1.0;
            case 'safest':
                return ( 100 - $p['reliability'] );
            case 'cheapest':
            default:
                // Weighted: 60% fees, 25% speed, 15% reliability
                $norm_fee   = $fees;
                $norm_speed = $p['speed_min'] * 500;  // scale to same magnitude
                $norm_rel   = ( 100 - $p['reliability'] ) * 1000;
                return ( $norm_fee * 0.60 ) + ( $norm_speed * 0.25 ) + ( $norm_rel * 0.15 );
        }
    }

    private static function build_why( array $p, string $priority ): array {
        $items = [];
        if ( $p['fee_pct'] <= 3.5 ) {
            $items[] = [ 'icon' => '✅', 'label' => 'Lower total cost', 'desc' => 'Saves you more' ];
        }
        if ( $p['speed_min'] <= 15 ) {
            $items[] = [ 'icon' => '⚡', 'label' => 'Faster settlement', 'desc' => "Money in {$p['speed_min']} minutes" ];
        }
        if ( $p['reliability'] >= 95 ) {
            $items[] = [ 'icon' => '🛡', 'label' => 'High reliability', 'desc' => "{$p['reliability']}% success rate" ];
        }
        if ( empty( $items ) ) {
            $items[] = [ 'icon' => '📊', 'label' => 'Best available', 'desc' => 'Top option for your settings' ];
        }
        return array_slice( $items, 0, 3 );
    }
}
