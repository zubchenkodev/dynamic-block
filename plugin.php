<?php
/**
 * Plugin Name:       Dynamic Block
 * Description:       Example block scaffolded with Create Block tool and customly configuered.
 * Requires at least: 6.1
 * Requires PHP:      7.0
 * Version:           0.1.0
 * Author:            Viktoria Zubchenko
 * Text Domain:       viktorias-blocks
 */

function viktorias_blocks_render_latest_pots_block ($attributes) {
	$args = array(
		'posts_per_page' => $attributes['numberOfPosts'],
		'post_status' => 'publish',
		'order' => $attributes['order'],
		'orderby' => $attributes['orderBy'],
	);
	if(isset($attributes['categories'])) {
		$args['category__in'] = array_column($attributes['categories'], 'id');
	}
	$recent_posts = get_posts($args);
	

	$posts = '<ul className="latest-posts__grid"' . get_block_wrapper_attributes() . '>';
		foreach($recent_posts as $post){
			$title = get_the_title($post);
			$url = get_the_permalink($post);
			$thumbnail = get_the_post_thumbnail($post, 'thumbnail', array( 'loading' => 'lazy' ));
			$excerpt = get_the_excerpt($post);
			$posts .= '<li>';
			if($attributes['displayFeaturedImages'] && has_post_thumbnail($post)){
				$posts .= $thumbnail;
			}
			$posts .= '<h4><a href="'. esc_url($url) .'">'.$title.'</a></h4>';
			$posts .= '<p>'.$excerpt.'</p>';
			$posts .= '</li>';
		}
	$posts .= '</ul>';

	return $posts;
}



function create_block_dynamic_block_init() {
	register_block_type( __DIR__ . '/build', array(
		'render_callback' => 'viktorias_blocks_render_latest_pots_block'
	) );
}
add_action( 'init', 'create_block_dynamic_block_init' );
