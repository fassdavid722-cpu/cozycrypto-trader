<?php get_header(); ?>
<div style="padding:120px 24px 80px;max-width:900px;margin:0 auto">
  <?php while(have_posts()): the_post(); ?>
    <h1 style="font-size:40px;font-weight:700;color:#fff;margin-bottom:24px"><?php the_title(); ?></h1>
    <div style="color:#C5C6C7;font-size:16px;line-height:1.75"><?php the_content(); ?></div>
  <?php endwhile; ?>
</div>
<?php get_footer(); ?>
