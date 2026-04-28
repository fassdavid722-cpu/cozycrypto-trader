<?php
/**
 * Plugin Name: Cozanet Aegis
 * Plugin URI:  https://cozynetwork.fwh.is
 * Description: Core logic engine for Cozanet Aegis — routing, scoring, AI insight, REST API. Completely separate from the theme.
 * Version:     1.0.0
 * Author:      Cozanet
 * License:     Private
 * Text Domain: cozanet-aegis
 */
defined('ABSPATH') || exit;

define('CZPLUGIN_VER',  '1.0.0');
define('CZPLUGIN_DIR',  plugin_dir_path(__FILE__));
define('CZPLUGIN_URL',  plugin_dir_url(__FILE__));

/* ═══════════════════════════════════════════════════════
   1. LOAD MODULES
═══════════════════════════════════════════════════════ */
require_once CZPLUGIN_DIR . 'includes/class-route-engine.php';
require_once CZPLUGIN_DIR . 'includes/class-ai-insight.php';
require_once CZPLUGIN_DIR . 'includes/class-rest-api.php';
require_once CZPLUGIN_DIR . 'includes/shortcodes.php';

/* ═══════════════════════════════════════════════════════
   2. BOOT
═══════════════════════════════════════════════════════ */
add_action('plugins_loaded', function () {
    CZ_REST_API::init();
    CZ_Shortcodes::init();
});

/* ═══════════════════════════════════════════════════════
   3. ACTIVATION / DEACTIVATION
═══════════════════════════════════════════════════════ */
register_activation_hook(__FILE__, function () {
    // Create DB table for saved routes & transaction history
    global $wpdb;
    $charset = $wpdb->get_charset_collate();

    $sql = "CREATE TABLE IF NOT EXISTS {$wpdb->prefix}cz_routes (
        id         BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
        user_id    BIGINT UNSIGNED NOT NULL DEFAULT 0,
        amount     BIGINT UNSIGNED NOT NULL,
        currency   VARCHAR(10) NOT NULL DEFAULT 'NGN',
        crypto     VARCHAR(20) NOT NULL DEFAULT 'USDT',
        network    VARCHAR(20) NOT NULL DEFAULT 'BSC',
        provider   VARCHAR(100) NOT NULL,
        result_json LONGTEXT,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    ) $charset;";

    require_once ABSPATH . 'wp-admin/includes/upgrade.php';
    dbDelta($sql);

    update_option('cz_plugin_version', CZPLUGIN_VER);
});

register_deactivation_hook(__FILE__, function () {
    // Clean transient cache
    global $wpdb;
    $wpdb->query("DELETE FROM {$wpdb->options} WHERE option_name LIKE '_transient_cz_%'");
});
