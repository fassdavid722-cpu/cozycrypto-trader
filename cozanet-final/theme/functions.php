<?php
defined('ABSPATH') || exit;
define('CZT_VER', '2.0.0');
define('CZT_URI', get_template_directory_uri());

function czt_setup() {
    add_theme_support('title-tag');
    add_theme_support('post-thumbnails');
    add_theme_support('custom-logo');
    add_theme_support('html5', ['search-form','comment-form','gallery','caption','script','style']);
    register_nav_menus(['primary' => 'Primary Menu']);
}
add_action('after_setup_theme', 'czt_setup');

function czt_assets() {
    wp_enqueue_style('czt-fonts', 'https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&family=Inter+Tight:wght@600;700;800&family=JetBrains+Mono:wght@400;500;700&display=swap', [], null);
    wp_enqueue_style('czt-main', CZT_URI . '/assets/css/cozanet.css', [], CZT_VER);
    wp_enqueue_script('czt-app', CZT_URI . '/assets/js/cozanet.js', [], CZT_VER, true);
    wp_localize_script('czt-app', 'CZ', [
        'restBase' => esc_url_raw(rest_url('cozanet/v1')),
        'nonce'    => wp_create_nonce('wp_rest'),
        'homeUrl'  => esc_url(home_url('/')),
    ]);
}
add_action('wp_enqueue_scripts', 'czt_assets');

// Clean WP head
remove_action('wp_head', 'wp_generator');
remove_action('wp_head', 'wlwmanifest_link');
remove_action('wp_head', 'rsd_link');
add_filter('the_generator', '__return_empty_string');
remove_action('wp_head', 'print_emoji_detection_script', 7);
remove_action('wp_print_styles', 'print_emoji_styles');
remove_filter('the_content', 'wpautop');
