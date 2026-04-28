<?php
/* Cozanet Aegis — Page Template */
get_header();
?>
<?php while (have_posts()) : the_post(); ?>
<div class="cz-page-wrapper">
  <?php the_content(); ?>
</div>
<?php endwhile; ?>
<?php get_footer(); ?>
