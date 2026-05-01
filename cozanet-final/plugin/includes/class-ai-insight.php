<?php
defined('ABSPATH') || exit;

class CZP_AI_Insight {
    public static function generate(array $best, array $params): array {
        $name    = $best['name'];
        $savings = $best['savings'] ?? 0;
        $crypto  = sanitize_text_field($params['to_crypto'] ?? 'USDT');
        $network = sanitize_text_field($params['network'] ?? 'BSC');
        $amount  = absint($params['amount'] ?? 0);

        $summary = "{$name} offers the best balance of low fees, fast settlement, and high reliability for your transaction.";
        if ($savings > 0) $summary .= ' You save ₦' . number_format($savings) . ' compared to the next best option.';

        $steps = [
            ['title' => 'Deposit ₦' . number_format($amount), 'desc' => "Transfer to {$name} using your bank."],
            ['title' => "Buy {$crypto}", 'desc' => "Purchase {$crypto} with your NGN balance."],
            ['title' => 'Withdraw to Wallet', 'desc' => "Paste your wallet address and select {$network}."],
            ['title' => 'Confirm Network', 'desc' => "Ensure you select {$network} network."],
            ['title' => "Receive {$crypto}", 'desc' => "{$crypto} will be sent to your wallet."],
        ];

        return ['summary' => $summary, 'steps' => $steps];
    }
}
