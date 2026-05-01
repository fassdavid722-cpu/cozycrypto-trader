<?php
defined('ABSPATH') || exit;

class CZP_Route_Engine {

    private static function providers(): array {
        return [
            ['id'=>'quidax',     'name'=>'Quidax',      'type'=>'Direct Purchase', 'icon'=>'Q', 'color'=>'#7c3aed','fee_pct'=>3.2, 'speed_min'=>15,'speed_label'=>'Fast',    'risk'=>'Low',    'reliability'=>99.2],
            ['id'=>'binance_p2p','name'=>'Binance P2P',  'type'=>'P2P',             'icon'=>'B', 'color'=>'#d97706','fee_pct'=>4.5, 'speed_min'=>25,'speed_label'=>'Moderate','risk'=>'Medium', 'reliability'=>91.0],
            ['id'=>'yellowcard', 'name'=>'Yellow Card',  'type'=>'Exchange',        'icon'=>'Y', 'color'=>'#ea580c','fee_pct'=>2.1, 'speed_min'=>20,'speed_label'=>'Fast',    'risk'=>'Low',    'reliability'=>96.5],
            ['id'=>'paxful_p2p', 'name'=>'Paxful P2P',  'type'=>'P2P',             'icon'=>'P', 'color'=>'#2563eb','fee_pct'=>5.5, 'speed_min'=>30,'speed_label'=>'Slow',    'risk'=>'High',   'reliability'=>83.0],
        ];
    }

    public static function find(array $p): array|WP_Error {
        $amount   = absint($p['amount'] ?? 0);
        $priority = sanitize_text_field($p['priority'] ?? 'cheapest');
        if ($amount < 100) return new WP_Error('invalid', 'Minimum amount is 100', ['status'=>400]);

        $scored = [];
        foreach (self::providers() as $prov) {
            $fees    = (int) round($amount * ($prov['fee_pct'] / 100));
            $you_pay = $amount - $fees;
            $score   = match ($priority) {
                'fastest' => $prov['speed_min'],
                'safest'  => 100 - $prov['reliability'],
                default   => ($fees * 0.6) + ($prov['speed_min'] * 400 * 0.25) + ((100 - $prov['reliability']) * 800 * 0.15),
            };
            $scored[] = array_merge($prov, ['total_fees'=>$fees,'you_pay'=>$you_pay,'score'=>$score]);
        }
        usort($scored, fn($a,$b) => $a['score'] <=> $b['score']);

        $best    = $scored[0];
        $second  = $scored[1] ?? null;
        if ($second) $best['savings'] = max(0, $second['total_fees'] - $best['total_fees']);
        $best['time'] = $best['speed_min'] . ' min';

        $others = array_map(function($r) {
            $r['time'] = $r['speed_min'] . ' min';
            unset($r['score']);
            return $r;
        }, array_slice($scored, 1));

        unset($best['score']);
        return ['best' => $best, 'others' => $others];
    }
}
