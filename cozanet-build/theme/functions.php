<?php
/**
 * Cozanet Aegis Theme — functions.php
 * ONLY handles: enqueue styles/scripts, theme setup, layout support.
 * ALL logic lives in the Cozanet Aegis Plugin.
 */
defined('ABSPATH') || exit;

define('CZTHEME_VER', '1.0.0');
define('CZTHEME_URI', get_template_directory_uri());

/* ── Theme Setup ── */
function cz_theme_setup() {
    add_theme_support('title-tag');
    add_theme_support('post-thumbnails');
    add_theme_support('html5', ['search-form','comment-form','gallery','caption','script','style']);
    add_theme_support('custom-logo');
    add_theme_support('menus');
    register_nav_menus(['primary' => __('Primary Menu', 'cozanet-aegis')]);
}
add_action('after_setup_theme', 'cz_theme_setup');

/* ── Enqueue Assets ── */
function cz_enqueue_assets() {
    // Main stylesheet
    wp_enqueue_style('cz-theme', get_stylesheet_uri(), [], CZTHEME_VER);
    wp_enqueue_style('cz-main', CZTHEME_URI . '/assets/css/cozanet.css', [], CZTHEME_VER);

    // Google Fonts (Inter)
    wp_enqueue_style('cz-fonts',
        'https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap',
        [], null
    );

    // Frontend JS (handles UI only — sends requests to REST API, renders results)
    wp_enqueue_script('cz-app', CZTHEME_URI . '/assets/js/cozanet-app.js', [], CZTHEME_VER, true);

    // Pass REST API URL to frontend JS
    wp_localize_script('cz-app', 'CZAPI', [
        'base'  => esc_url_raw(rest_url('cozanet/v1')),
        'nonce' => wp_create_nonce('wp_rest'),
        'ajax'  => admin_url('admin-ajax.php'),
    ]);
}
add_action('wp_enqueue_scripts', 'cz_enqueue_assets');

/* ── Clean up WP head noise ── */
remove_action('wp_head', 'wp_generator');
remove_action('wp_head', 'wlwmanifest_link');
remove_action('wp_head', 'rsd_link');
remove_action('wp_head', 'wp_shortlink_wp_head');
add_filter('the_generator', '__return_empty_string');

/* ── Disable WP emoji (keeps things lean) ── */
remove_action('wp_head', 'print_emoji_detection_script', 7);
remove_action('wp_print_styles', 'print_emoji_styles');

/* ── Allow SVG uploads ── */
add_filter('upload_mimes', function($mimes) {
    $mimes['svg'] = 'image/svg+xml';
    return $mimes;
});
