<?php
/**
 * Plugin Name: Cozanet
 * Plugin URI:  https://cozynetwork.fwh.is
 * Description: Core engine for Cozanet — REST API (/wp-json/cozanet/v1/route), routing logic, shortcodes. Completely separate from the theme.
 * Version:     2.0.0
 * Author:      Cozanet
 * License:     Private
 * Text Domain: cozanet
 */
defined('ABSPATH') || exit;

define('CZP_VER', '2.0.0');
define('CZP_DIR', plugin_dir_path(__FILE__));

require_once CZP_DIR . 'includes/class-route-engine.php';
require_once CZP_DIR . 'includes/class-ai-insight.php';
require_once CZP_DIR . 'includes/class-rest-api.php';
require_once CZP_DIR . 'includes/shortcodes.php';

add_action('plugins_loaded', function () {
    CZP_REST_API::init();
    CZP_Shortcodes::init();
});

register_activation_hook(__FILE__, function () {
    global $wpdb;
    $c = $wpdb->get_charset_collate();
    $sql = "CREATE TABLE IF NOT EXISTS {$wpdb->prefix}cz_searches (
        id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
        user_id BIGINT UNSIGNED DEFAULT 0,
        amount BIGINT UNSIGNED NOT NULL,
        from_currency VARCHAR(10) DEFAULT 'NGN',
        to_crypto VARCHAR(20) DEFAULT 'USDT',
        network VARCHAR(20) DEFAULT 'BSC',
        best_provider VARCHAR(100),
        result JSON,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    ) $c;";
    require_once ABSPATH . 'wp-admin/includes/upgrade.php';
    dbDelta($sql);
});
