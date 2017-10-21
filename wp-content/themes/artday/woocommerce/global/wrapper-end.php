<?php
/**
 * Content wrappers
 *
 * @author 		WooThemes
 * @package 	WooCommerce/Templates
 * @version     1.6.4
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit; // Exit if accessed directly
}

$template = get_option( 'template' );

switch( $template ) {
	case 'twentyeleven' :
		echo '</div></div>';
		break;
	case 'twentytwelve' :
		echo '</div></div>';
		break;
	case 'twentythirteen' :
		echo '</div></div>';
		break;
	case 'twentyfourteen' :
		echo '</div></div></div>';
		get_sidebar( 'content' );
		break;
	case 'twentyfifteen' :
		echo '</div></div>';
		break;
	case 'twentysixteen' :
		echo '</div></main>';
		break;
	default :
		echo '</div></div>';
		if( is_product() ){
			do_action('woss_after_main_content_preview_image');
			echo '<div class="container ws-page-container"><div class="row">';
				do_action('woss_after_main_content');
			echo '</div></div>';
		}
		if ( !function_exists('dynamic_sidebar') || !dynamic_sidebar("page_bottom") ) :
		endif;
		break;
}
