<?php
/**
 * Cozanet Aegis Theme Functions
 * @version 3.0.0
 */
if (!defined('ABSPATH')) exit;

define('COZANET_AEGIS_VERSION', '3.0.0');
define('COZANET_AEGIS_URI', get_template_directory_uri());

function cozanet_aegis_setup() {
    add_theme_support('title-tag');
    add_theme_support('post-thumbnails');
    add_theme_support('html5', ['search-form', 'comment-form', 'comment-list', 'gallery', 'caption']);
    add_theme_support('custom-logo');
    add_theme_support('customize-selective-refresh-widgets');
}
add_action('after_setup_theme', 'cozanet_aegis_setup');

function cozanet_aegis_scripts() {
    // Styles
    wp_enqueue_style('cozanet-aegis-style', get_stylesheet_uri(), [], COZANET_AEGIS_VERSION);
    wp_enqueue_style('cozanet-aegis-main', COZANET_AEGIS_URI . '/assets/css/main.css', [], COZANET_AEGIS_VERSION);
    // Scripts
    wp_enqueue_script('cozanet-aegis-main', COZANET_AEGIS_URI . '/assets/js/main.js', [], COZANET_AEGIS_VERSION, true);
}
add_action('wp_enqueue_scripts', 'cozanet_aegis_scripts');

// Security
remove_action('wp_head', 'wp_generator');
add_filter('the_generator', '__return_empty_string');
remove_action('wp_head', 'wlwmanifest_link');
remove_action('wp_head', 'rsd_link');

// Remove WP auto-paragraph formatting (we handle our own HTML)
remove_filter('the_content', 'wpautop');
