<?php
/**
 * 404 template
 * @package Cozanet
 */
if ( ! defined( 'ABSPATH' ) ) { exit; }
get_header();
?>
<style>
.notfound { min-height: 100vh; display: flex; align-items: center; justify-content: center; text-align: center; flex-direction: column; gap: 20px; }
.notfound h1 { font-size: 100px; font-weight: 700; color: #c9a84c; line-height: 1; }
.notfound p { color: #6b6b80; font-size: 18px; }
.notfound a { display: inline-block; padding: 12px 28px; background: linear-gradient(135deg, #c9a84c, #a07828); color: #000; border-radius: 4px; font-weight: 600; text-decoration: none; margin-top: 10px; }
</style>
<div class="notfound">
  <h1>404</h1>
  <p>This page doesn't exist — yet.</p>
  <a href="<?php echo home_url('/'); ?>">← Back to Cozanet</a>
</div>
<?php get_footer(); ?>
