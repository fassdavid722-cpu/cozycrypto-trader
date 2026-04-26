<?php
/**
 * Template for WordPress pages (About, Privacy, etc.)
 * @package Cozanet
 */
if ( ! defined( 'ABSPATH' ) ) { exit; }
get_header();
?>
<style>
body { background: #070708; color: #e8e8f0; }
.page-wrap { max-width: 800px; margin: 100px auto 60px; padding: 40px 24px; }
.page-wrap h1 { font-size: 36px; font-weight: 300; color: #e8e8f0; margin-bottom: 24px; }
.page-wrap h1 span { color: #c9a84c; }
.page-wrap .content { color: #6b6b80; line-height: 1.8; font-size: 15px; }
.page-wrap .content h2 { color: #c9a84c; font-size: 18px; margin: 28px 0 12px; font-weight: 600; }
.page-wrap .content p { margin-bottom: 16px; }
.page-wrap .content a { color: #c9a84c; }
.back-link { display: inline-block; margin-bottom: 32px; color: #6b6b80; font-size: 13px; text-decoration: none; }
.back-link:hover { color: #c9a84c; }
</style>
<div class="page-wrap">
  <a href="<?php echo home_url('/'); ?>" class="back-link">← Back to Home</a>
  <?php while ( have_posts() ) : the_post(); ?>
    <h1><?php the_title(); ?></h1>
    <div class="content"><?php the_content(); ?></div>
  <?php endwhile; ?>
</div>
<?php get_footer(); ?>
