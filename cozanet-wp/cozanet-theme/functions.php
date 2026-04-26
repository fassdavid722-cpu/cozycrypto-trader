<?php
/**
 * Cozanet Theme Functions v2.0.0
 * @package Cozanet
 */

if ( ! defined( 'ABSPATH' ) ) { exit; }

define( 'COZANET_VERSION', '2.0.0' );

// ── Theme Setup ───────────────────────────────────────────────────────────────
function cozanet_setup() {
    add_theme_support( 'title-tag' );
    add_theme_support( 'post-thumbnails' );
    add_theme_support( 'custom-logo', array(
        'height'      => 60,
        'width'       => 60,
        'flex-height' => true,
        'flex-width'  => true,
    ));
    add_theme_support( 'html5', array( 'search-form', 'comment-form', 'comment-list', 'gallery', 'caption' ) );
    register_nav_menus( array( 'primary' => __( 'Primary Menu', 'cozanet-theme' ) ) );
}
add_action( 'after_setup_theme', 'cozanet_setup' );

// ── Enqueue Scripts & Styles ──────────────────────────────────────────────────
function cozanet_scripts() {
    $uri = get_template_directory_uri();
    $v   = COZANET_VERSION;

    // Core styles
    wp_enqueue_style( 'cozanet-style', get_stylesheet_uri(), array(), $v );
    wp_enqueue_style( 'cozanet-no-anim', $uri . '/assets/css/no-animations.css', array(), $v );
    wp_enqueue_style( 'cozanet-spacing', $uri . '/assets/css/spacing-fixes.css', array(), $v );
    wp_enqueue_style( 'cozanet-app-css', $uri . '/assets/js/index-DPwWK0q6.css', array(), $v );

    if ( is_page() && ! is_front_page() ) {
        wp_enqueue_style( 'cozanet-page', $uri . '/assets/css/page-style.css', array(), $v );
    }

    // JS
    wp_enqueue_script( 'cozanet-app', $uri . '/assets/js/index-BP6Ss8tT.js', array(), $v, true );
    wp_enqueue_script( 'cozanet-smooth', $uri . '/assets/js/smooth-scroll-enhanced.js', array(), $v, true );

    // Pass theme directory URL to JS so images load correctly
    wp_localize_script( 'cozanet-app', 'CozanetData', array(
        'themeUrl'  => $uri,
        'siteUrl'   => get_site_url(),
        'ajaxUrl'   => admin_url( 'admin-ajax.php' ),
        'nonce'     => wp_create_nonce( 'cozanet_nonce' ),
    ));
}
add_action( 'wp_enqueue_scripts', 'cozanet_scripts' );

// ── Contact Form AJAX Handler ─────────────────────────────────────────────────
function cozanet_handle_contact() {
    check_ajax_referer( 'cozanet_nonce', 'nonce' );
    $name    = sanitize_text_field( $_POST['name'] ?? '' );
    $email   = sanitize_email( $_POST['email'] ?? '' );
    $message = sanitize_textarea_field( $_POST['message'] ?? '' );

    if ( ! $name || ! is_email( $email ) || ! $message ) {
        wp_send_json_error( array( 'message' => 'Please fill all fields correctly.' ) );
    }

    $to      = get_option( 'admin_email' );
    $subject = "New Contact from {$name} via Cozanet";
    $body    = "Name: {$name}\nEmail: {$email}\n\nMessage:\n{$message}";
    $headers = array( 'Content-Type: text/plain; charset=UTF-8', "Reply-To: {$email}" );

    wp_mail( $to, $subject, $body, $headers );
    wp_send_json_success( array( 'message' => 'Message sent!' ) );
}
add_action( 'wp_ajax_cozanet_contact', 'cozanet_handle_contact' );
add_action( 'wp_ajax_nopriv_cozanet_contact', 'cozanet_handle_contact' );

// ── Security: Remove version numbers ─────────────────────────────────────────
remove_action( 'wp_head', 'wp_generator' );
add_filter( 'the_generator', '__return_empty_string' );
