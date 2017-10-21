<?php
//
// Your code goes below!
//
add_action( 'wp_enqueue_scripts', 'woss_artday_child_theme' , 11);
function woss_artday_child_theme() {
    wp_enqueue_style( 'artday-style', get_template_directory_uri() . '/style.css' );

}