<?php
/**
 * Plugin Name:       Boiler Plate
 * Description:       Example block scaffolded with Create Block tool and customly configuered.
 * Requires at least: 6.1
 * Requires PHP:      7.0
 * Version:           0.1.0
 * Author:            Viktoria Zubchenko
 * Text Domain:       boiler-plate
 */

function create_block_boiler_plate_block_init() {
	register_block_type( __DIR__ . '/build' );
}
add_action( 'init', 'create_block_boiler_plate_block_init' );
