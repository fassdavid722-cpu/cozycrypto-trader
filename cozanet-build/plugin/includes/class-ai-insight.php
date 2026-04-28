<?php
/**
 * Cozanet AI Insight Engine
 * Generates smart, contextual recommendations based on route data.
 * Kept separate from routing logic — clean separation of concerns.
 */
defined('ABSPATH') || exit;

class CZ_AI_Insight {

    /**
     * Generate AI insight for a found route.
     *
     * @param array $best    Best route data from Route Engine
     * @param array $params  Original request params
     * @return array { summary, steps, badges }
     */
    public static function generate( array $best, array $params ): array {
        $name    = $best['name'];
        $savings = $best['savings'] ?? 0;
        $time    = $best['time'] ?? $best['speed_min'] . ' min';
        $risk    = $best['risk'] ?? 'Low';
        $crypto  = sanitize_text_field( $params['to_crypto'] ?? 'USDT' );
        $network = sanitize_text_field( $params['network'] ?? 'BSC' );
        $amount  = absint( $params['amount'] ?? 0 );

        // Generate dynamic summary
        $summary = "{$name} offers the best balance of low fees, fast settlement, and high reliability for your transaction.";

        if ( $savings > 0 ) {
            $summary .= " You save ₦" . number_format( $savings ) . " compared to the next best option.";
        }

        $steps = [
            [
                'title' => "Deposit ₦" . number_format( $amount ),
                'desc'  => "Transfer to {$name} using your bank.",
            ],
            [
                'title' => "Buy {$crypto}",
                'desc'  => "Purchase {$crypto} with your NGN balance.",
            ],
            [
                'title' => 'Withdraw to Wallet',
                'desc'  => "Paste your wallet address and select {$network}.",
            ],
            [
                'title' => 'Confirm Network',
                'desc'  => "Ensure you select the {$network} network.",
            ],
            [
                'title' => "Receive {$crypto}",
                'desc'  => "{$crypto} will be sent to your wallet.",
            ],
        ];

        $badges = [
            [ 'icon' => '⬇️', 'label' => 'Low Fees' ],
            [ 'icon' => '⚡', 'label' => 'Fastest' ],
            [ 'icon' => '✅', 'label' => 'Reliable' ],
        ];

        return compact( 'summary', 'steps', 'badges' );
    }
}
