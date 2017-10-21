<?php

/*
 * Theme Dynamic Stylesheet - ARTDAY
 * Version: 1.0
 */

header("Content-type: text/css;");
$absolute_path = __FILE__;
$path_to_file = explode( 'wp-content', $absolute_path );
$path_to_wp = $path_to_file[0];

// get_template_directory() can't use here because get_template_directory and another WP functions will not work without wp-load.php
require_once( $path_to_wp . '/wp-load.php' );


$woss_typography_body=woss_theme_data('woss-typography-body');
$woss_theme_color=woss_theme_data('woss_theme_color');
$woss_typography_elements=woss_theme_data('woss-typography-elements');
$woss_theme_hover=woss_theme_data('woss_theme_hover');

if($woss_typography_body ==''){
	$woss_typography_body = array(
		'font-family' => 'PT Serif',
	);
}
if($woss_theme_color ==''){
	$woss_theme_color = '#C2A476';
}
if($woss_typography_elements ==''){
	$woss_typography_elements = array(
		'font-family' => 'Montserrat',
	);
}
if($woss_theme_hover ==''){
	$woss_theme_hover = '#CCB48E';
}

?>

<?php /* Custom Body Font */ ?>
body{
	font-family: <?php echo $woss_typography_body['font-family']; ?>;
}

<?php /* Custom Elements Font */ ?>
.ws-contact-form, .ws-page-container .blog-comments .ws-comments-body h4, .ws-journal-single-tags, .ws-journal-single-content h1, .ws-journal-single-content h2, .ws-journal-single-content h3, .ws-journal-single-content h4, .ws-journal-single-content h5, .ws-journal-single-content h6, .ws-blog-btn, .ws-category-box h1, .ws-category-box h2, .ws-category-box h3, .ws-category-box h4, .ws-category-box h5, .ws-category-box h6, .ws-category-box button, .ws-category-box a, .btn, .ws-journal-title h3, .ws-page-container #true_loadmore, .ws-page-container .woocommerce .ws-checkout-order table.shop_table th, .ws-page-container .woocommerce-error, .ws-page-container .woocommerce-info, .ws-checkout-coupon .coupon-info, .ws-page-container .woocommerce-message, .ws-journal-content a.more-link, .ws-journal-pagination, .ws-journal-sidebar .widget-area .widget-title, .ws-journal-sidebar .widget_search input.search-submit,
.ws-journal-sidebar .widget .tagcloud a, .ws-page-container .blog-comments-title h2, .ws-navbar .navbar-nav li a, .ws-page-container .blog-comments .ws-comment-date,
.ws-page-container .blog-comments .ws-comment-reply, .ws-journal-date, .ws-page-container .ws-leave-comment h3, .ws-page-container .comment-respond h3, .ws-page-container .ws-leave-comment label, .ws-journal-single .comment-respond label, .ws-journal-single header h1, .ws-journal-single .logged-in-as a, .ws-journal-single nav.post-navigation a, .ws-footer-bar, .ws-footer .sidebar-title, .ws-footer li, .ws-topbar-message, .minicart-content-total h3, .ws-search-item header h2, .ws-parallax-header .ws-parallax-holder h1,
.ws-login-form .control-label, .ws-login-form .checkbox label, .ws-register-form h3, .ws-register-form .control-label, .ws-instagram-header h3, .ws-page-container .woocommerce form.lost_reset_password label,
.ws-subscribe-content h3, .woocommerce-view-order .ws-page-container .woocommerce p.order-info mark, .woocommerce-view-order .ws-page-container .woocommerce h2,
.woocommerce-view-order .ws-page-container .woocommerce table.order_details thead th, .ws-page-container .woocommerce table.customer_details tbody th,
.ws-page-container .woocommerce .ws-customer-address header h3, .woocommerce-view-order .ws-page-container .woocommerce a.button,
.woocommerce-edit-account .ws-page-container .woocommerce form label, .woocommerce-edit-account .ws-page-container .woocommerce form p input.button, .woocommerce-edit-account .ws-page-container .woocommerce form fieldset legend,
.woocommerce-edit-address .ws-page-container .woocommerce form label, .woocommerce-edit-address .ws-page-container .woocommerce form p input.button, .woocommerce-edit-address .ws-page-container .woocommerce form h3,
.woocommerce-account .ws-page-container .woocommerce p.ws-account-details strong, .ws-page-container .woocommerce h2, .woocommerce-account .ws-page-container .woocommerce table.my_account_orders thead th,
.woocommerce-account .ws-page-container .woocommerce table.my_account_orders tbody .order-actions a, .woocommerce-account .ws-page-container .woocommerce .addresses header.title,
.ws-mycart-content thead th.cart-item-head, .ws-coupon-code, .ws-page-container .woocommerce .woocommerce-checkout #payment input#place_order, .ws-page-container .woocommerce p.return-to-shop a.button, .ws-page-container .woocommerce .woocommerce-billing-fields label, .ws-page-container .woocommerce .woocommerce-billing-fields h3,
.ws-page-container .woocommerce .woocommerce-shipping-fields h3, .ws-page-container .woocommerce .woocommerce-shipping-fields label, .ws-mycart-total tbody tr.cart-subtotal th, .ws-mycart-total table tr.shipping th, .ws-mycart-total tbody tr.order-total th, .woocommerce-order-received .ws-page-container .woocommerce ul.order_details li strong,
.woocommerce-order-received .ws-page-container .woocommerce h2, .woocommerce-order-received .ws-page-container .woocommerce table.shop_table thead th, .woocommerce-order-received .ws-page-container .woocommerce h3,
.ws-page-container .ws-breadcrumb .breadcrumb, .ws-page-container ul.products span.onsale, .ws-page-container ul.products li.product h3, .ws-page-container nav.woocommerce-pagination,
.ws-page-container h1.page-title, .ws-page-container .woocommerce-ordering select.orderby, .ws-page-container ul.products li.product a.button, ul.ws-shop-nav, .ws-page-container ul.products span.ws-item-subtitle,
.ws-page-container .product span.onsale, .ws-page-container .related h2, .ws-journal-sidebar .widget_shopping_cart .total, .ws-journal-sidebar .widget_shopping_cart .buttons, .ws-journal-sidebar .widget_shopping_cart ul li a,
.ws-journal-sidebar .widget_price_filter .button, .ws-journal-sidebar .widget_products ul li a, .ws-journal-sidebar .widget_product_search form, .ws-journal-sidebar .widget_recently_viewed_products ul li a,
.ws-journal-sidebar .widget_top_rated_products ul li a, .ws-journal-sidebar .widget_recent_reviews ul li a, .ws-page-container .upsells h2, .ws-page-container .wc-tabs-wrapper ul li,
.ws-page-container div.product .woocommerce-tabs .panel h2, .ws-page-container #reviews #comments ol.commentlist li .comment-text p.meta, .ws-page-container #respond, .ws-page-container table.shop_attributes th,
.ws-page-container div.product div.summary h1.product_title, .ws-page-container div.product div.summary span.ws-item-subtitle, .ws-page-container div.product p.stock, .ws-page-container div.product form.cart button.button,
.ws-page-container div.product .product_meta span, .ws-page-container div.product .ws-product-description, .ws-page-container div.product form.cart .variations, .ws-page-container .woocommerce-message a.button,
.ws-page-container .woocommerce-error a.button, .ws-page-container .woocommerce-info a.button, .ws-page-container form.track_order label, .ws-page-container form.track_order input.button,
.ws-page-container table.order_details thead th, .ws-contact-info h2, .ws-contact-form .control-label, .vc_tta-color-grey.vc_tta-style-outline .vc_tta-tab>a, .vc_tta-panel-body h2,
.ws-about-team .caption h3, .ws-page-container .error-404 h1, .ws-heading h2, .ws-heading h3, h3.ws-heading, .widget_top_rated_products h2.widgettitle, .ws-contact-office-item strong, .ws-parallax-holder h2, .ws-item-category, h3.ws-item-title,
.ws-journal-nav li a, .ws-call-btn, .ws-page-container .woocommerce form.checkout_coupon label, .ws-page-container .woocommerce form.login label, .ws-page-container .woocommerce form.register label, .ws-page-container .woocommerce form.checkout_coupon input.button, .ws-page-container .woocommerce form.login input.button, .ws-page-container .woocommerce form.register input.button,
.ws-subscribe-content input.ws-input-subscribe, .ws-contact-form div.wpcf7-validation-errors, .ws-contact-form div.wpcf7-mail-sent-ok, .ws-mycart-total a.shipping-calculator-button, .ws-mycart-total table tr.shipping button, .ws-header-fourth a{
	font-family: <?php echo $woss_typography_elements['font-family']; ?>;
}

<?php /* Main Theme Color */ ?>
.ws-journal-single-tags ul li.ws-journal-category-tag a, .ws-journal-author-tag a, .ws-journal-container .sticky .ws-journal-title h3 a, .ws-journal-sidebar #wp-calendar td a, .ws-journal-single .blog-comments .ws-comment-reply a,
.ws-journal-single .ws-leave-comment label span, .ws-journal-single .comment-respond label span, .ws-journal-single .comment-respond a#cancel-comment-reply-link, .ws-journal-single .logged-in-as a, .ws-footer-bar p, .ws-login-form .control-label span, .ws-forgot-pass a, .ws-register-link a, .ws-register-form .control-label span, #ws-register-modal .close, .ws-instagram-header a, .ws-page-container .woocommerce .woocommerce-error a, .ws-page-container .woocommerce form.lost_reset_password label span,
.ws-page-container .woocommerce .woocommerce-message a, .woocommerce-view-order .ws-page-container .woocommerce p.order-info mark, .woocommerce-view-order .ws-page-container .woocommerce table.order_details a,
.woocommerce-view-order .ws-page-container .woocommerce a.button, .woocommerce-edit-account .ws-page-container .woocommerce form label span, .woocommerce-edit-address .ws-page-container .woocommerce form label abbr,
.woocommerce-account .ws-page-container .woocommerce p.ws-account-details strong, .ws-page-container ul.products span.ws-item-subtitle, .woocommerce-account .ws-page-container .woocommerce p.ws-account-details a, .woocommerce-account .ws-page-container .woocommerce ul.digital-downloads a,
.woocommerce-account .ws-page-container .woocommerce table.my_account_orders tbody a, .woocommerce-account .ws-page-container .woocommerce .addresses a.edit, .ws-mycart-total .cart-discount a,
.ws-page-container .woocommerce .woocommerce-billing-fields label abbr, .ws-page-container .woocommerce .woocommerce-shipping-fields label abbr, .ws-page-container .woocommerce .ws-checkout-order table.shop_table a, .ws-page-container .woocommerce .woocommerce-checkout #payment ul.payment_methods li.payment_method_paypal a,
.ws-page-container .woocommerce .woocommerce-checkout .place-order .terms a, .woocommerce-order-received .ws-page-container .woocommerce ul.order_details li strong, .woocommerce-order-received .ws-page-container .woocommerce table.shop_table a,
.ws-page-container ul.products li.product .price ins, .ws-page-container nav.woocommerce-pagination ul li a, .ws-breadcrumb ol :last-child, .ws-journal-sidebar .widget_shopping_cart .buttons a.checkout, .ws-journal-sidebar .widget_price_filter .button, .ws-journal-sidebar .widget_recent_reviews ul li a, .ws-page-container div.product .woocommerce-tabs ul.tabs li.active, .ws-page-container .star-rating span:before,
.ws-page-container p.stars a, .ws-page-container #review_form #respond p label span, .ws-page-container div.product div.summary span.ws-item-subtitle, .ws-page-container div.product p.stock, .ws-page-container div.product .product_meta a, .ws-page-container .woocommerce-message a, .ws-page-container div.product form.cart .variations a,
.ws-page-container .woocommerce-error a.button, .ws-page-container .woocommerce-info a.button, .ws-page-container table.order_details a, .coupon-info a, .ws-page-container .blog-comments a, .ws-contact-info a, .ws-contact-form .control-label span, .ws-about-team .caption h5, .ws-item-category, .ws-item-price ins, .ws-journal-nav li.current-cat a, .ws-page-container .woocommerce form.checkout_coupon a, .ws-page-container .woocommerce form.login a, .ws-page-container .woocommerce form.register a,
.woocommerce-info a, .ws-page-container .woocommerce form.checkout_coupon label span, .ws-page-container .woocommerce form.login label span, .ws-page-container .woocommerce form.register label span, .ws-heading h5{
	color: <?php echo $woss_theme_color; ?>;
}

<?php /* Main Theme Background Color */ ?>
.ws-journal-sidebar .widget_search input.search-submit, .ws-journal-sidebar .widget .tagcloud a, .ws-separator, .ws-separator-related, .ws-journal-single .ws-leave-comment .form-submit input.submit,
.ws-journal-single .comment-respond .form-submit input.submit, input.ws-btn-fullwidth, .ws-shop-cart .cart-top-btn, .ws-footer-separator, .ws-shop-cart .ws-shop-viewcart .btn,
.ws-shop-noproducts-btn .ws-btn-fullwidth, .woocommerce-edit-account .ws-page-container .woocommerce form p input.button, .woocommerce-edit-address .ws-page-container .woocommerce form p input.button,
.woocommerce-account .ws-page-container .woocommerce .ws-account-singout a, .ws-btn-fullwidth, .ws-page-container .woocommerce p.return-to-shop a.button,
.ws-page-container .woocommerce .woocommerce-checkout #payment input#place_order, .ws-page-container ul.products li.product h3:after, .ws-page-container ul.products li.product a.button,
.ws-journal-sidebar .widget_shopping_cart p.buttons a:first-child, .ws-journal-sidebar .widget_price_filter .ui-slider .ui-slider-handle, .ws-journal-sidebar .widget_price_filter .ui-slider .ui-slider-range, .ws-journal-sidebar .widget_product_search form input[type="submit"], .ws-separator-small, .ws-page-container form.track_order input.button,
.ws-contact-form input.ws-big-btn, .ws-item-separator, .ws-btn-black:hover, .ws-spinner, .ws-page-container .woocommerce form.checkout_coupon input.button, .ws-page-container .woocommerce form.login input.button, .ws-page-container .woocommerce form.register input.button,
.ws-page-container #true_loadmore:hover{
	background-color: <?php echo $woss_theme_color; ?>;
}

<?php /* Main Theme Border Color */ ?>
.ws-journal-sidebar .widget .widget-title:after, .ws-journal-single header span a:after, .ws-register-link a, .ws-mycart-total .woocommerce-shipping-calculator select:focus, .ws-mycart-total select.shipping_method:focus, .ws-page-container .woocommerce .woocommerce-shipping-fields input:focus, .ws-journal-sidebar .widget_shopping_cart .buttons a.checkout,
.ws-journal-sidebar .widget_product_search form input:focus, .ws-page-container #review_form #respond textarea:focus, .ws-page-container #respond p.comment-form-author input:focus, .ws-page-container #respond p.comment-form-email input:focus, .ws-page-container .woocommerce-message a.button, .ws-page-container .woocommerce-error a.button, .ws-page-container .woocommerce-info a.button,
.ws-page-container form.track_order input.input-text:focus, .ws-contact-form input:focus, .ws-contact-form textarea:focus,
.ws-page-container .woocommerce form.checkout_coupon input.input-text:focus, .ws-page-container .woocommerce form.register input.input-text:focus{
	border-color: <?php echo $woss_theme_color; ?>;
}

<?php /* Main Theme Hover Color */ ?>
.ws-header-fourth .navbar-nav .active a:hover, .ws-header-fourth .navbar-nav>.open>a, .ws-header-fourth .navbar-nav>.open>a:focus,
.ws-header-fourth .navbar-nav>.open>a:hover, .ws-header-cart a:hover, .ws-header-fourth .nav li a:hover, .ws-blog-btn a:hover, .ws-journal-date a:hover, .ws-journal-title h3 a:hover, .ws-journal-pagination .nav-links a:hover, .ws-journal-sidebar .widget ul li a:hover, .ws-journal-content a.more-link:hover, .ws-journal-single header span a:hover,
.ws-journal-single .blog-comments .ws-comment-reply a:hover, .ws-journal-single .blog-comments .ws-comments-body a:hover, .ws-journal-single .comment-respond a#cancel-comment-reply-link:hover,
.ws-journal-single-tags ul li.ws-journal-author-tag a:hover, .ws-journal-single .logged-in-as a:hover, .ws-journal-single nav.post-navigation a:hover, .ws-search-item header h2 a:hover, .ws-shop-account .btn:hover,
.ws-header-static .ws-navbar .navbar-nav li a:hover, .ws-footer a:hover, span.minicart-content-remove a:hover, .woocommerce-view-order .ws-page-container .woocommerce a.button:hover,
.woocommerce-account .ws-page-container .woocommerce p.ws-account-details a:hover, .ws-page-container .ws-breadcrumb .breadcrumb li a:hover, .ws-page-container ul.products li.product a:hover,
.ws-page-container nav.woocommerce-pagination ul li a:hover, .ws-shop-nav>li.active>a, .ws-shop-nav>li>a:hover, .ws-shop-nav>li.active>a:hover, .ws-journal-sidebar .widget_price_filter .button:hover,
.ws-journal-sidebar .widget_products ul li a:hover, .ws-page-container div.product .woocommerce-tabs ul.tabs li a:hover, .ws-page-container div.product .product_meta a:hover, .ws-page-container .woocommerce-message a:hover,
.ws-mycart-content .cart-item-title a:hover, .ws-mycart-content .cart-item-remove a:hover, .ws-page-container .blog-comments a:hover, .ws-header-static .ws-navbar .navbar-nav>.open>a, .ws-header-static .ws-navbar .navbar-nav>.open>a:focus, .ws-header-static .ws-navbar .navbar-nav>.open>a:hover,
.ws-works-item a:hover, .ws-journal-nav li a:hover, .ws-header-transparent .ws-navbar .navbar-nav li a:hover{
	color: <?php echo $woss_theme_hover; ?>;
}

<?php /* Main Theme Hover Background Color */ ?>
.ws-journal-sidebar .widget_search input.search-submit:hover, .ws-journal-sidebar .widget .tagcloud a:hover, .ws-journal-single .ws-leave-comment .form-submit input.submit:hover,
.ws-journal-single .comment-respond .form-submit input.submit:hover, input.ws-btn-fullwidth:hover, .ws-shop-cart .cart-top-btn:hover, .ws-shop-cart .ws-shop-viewcart .btn:hover, .ws-shop-noproducts-btn .ws-btn-fullwidth:hover, .woocommerce-edit-account .ws-page-container .woocommerce form p input.button:hover,
.woocommerce-edit-address .ws-page-container .woocommerce form p input.button:hover, .woocommerce-account .ws-page-container .woocommerce .ws-account-singout a:hover, .ws-btn-fullwidth:hover, input.ws-small-btn-black:hover, .ws-page-container .woocommerce p.return-to-shop a.button:hover, .ws-page-container .woocommerce .woocommerce-checkout #payment input#place_order:hover, .ws-subscribe-content input.ws-btn-subscribe:hover,
.ws-page-container ul.products li.product a.button:hover, .ws-journal-sidebar .widget_shopping_cart .buttons a.checkout:hover, .ws-journal-sidebar .widget_shopping_cart p.buttons a:first-child:hover,
.ws-journal-sidebar .widget_product_search form input[type="submit"]:hover, .ws-page-container #respond p.form-submit input#submit:hover, .ws-page-container div.product form.cart button.button:hover,
.ws-page-container .woocommerce-message a.button:hover, .ws-page-container .woocommerce-error a.button:hover, .ws-page-container .woocommerce-info a.button:hover, .ws-page-container form.track_order input.button:hover,
.ws-more-btn:hover, .ws-contact-form input.ws-big-btn:hover, .ws-page-container .woocommerce form.checkout_coupon input.button:hover, .ws-page-container .woocommerce form.login input.button:hover, .ws-page-container .woocommerce form.register input.button:hover{
	background-color: <?php echo $woss_theme_hover; ?>;
}

<?php /* Revolution Slider Background Color */ ?>
.ws-slider-btn{
	background-color: <?php echo $woss_theme_color; ?> !important;
}
<?php /* Revolution Slider Hover Background Color */ ?>
.ws-slider-btn:hover, .ws-btn-black:hover, .ws-category-box button:hover, .ws-category-box a:hover, .ws-btn-white:hover{
	background-color: <?php echo $woss_theme_hover; ?> !important;
}
<?php /* Main Theme Important Color */ ?>
.vc_tta-color-grey.vc_tta-style-outline .vc_tta-tab.vc_active>a{
	color: <?php echo $woss_theme_color; ?> !important;
}
<?php /* Main Theme Important Hover Color */ ?>
.vc_tta-color-grey.vc_tta-style-outline .vc_tta-tab>a:hover{
	color: <?php echo $woss_theme_hover; ?> !important;
}

<?php /* Custom CSS from Theme Options Page */ ?>
<?php echo wp_kses_post(woss_theme_data('opt-ace-editor-css')); ?>
