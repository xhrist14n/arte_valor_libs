<?php
/**
 * Checkout coupon form
 *
 * @author 		WooThemes
 * @package 	WooCommerce/Templates
 * @version     2.2
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit; // Exit if accessed directly
}

if ( ! WC()->cart->coupons_enabled() ) {
	return;
}
?>

<!-- Coupon -->            
<div class="ws-checkout-coupon">		
	<div class="coupon-info">
		<?php echo $info_message = apply_filters( 'woocommerce_checkout_coupon_message', esc_html__( 'Have a coupon?', 'woocommerce' ) . ' <a data-toggle="collapse" href="#coupon-collapse">' . esc_html__( 'Click here to enter your code', 'woocommerce' ) . '</a>' ); ?>	
	</div>
	<div class="collapse" id="coupon-collapse">
		<!-- Coupon -->
		<div class="ws-checkout-coupon-code">  
					
			<form class="form-inline" method="post">

				<p><input type="text" name="coupon_code" class="input-text" placeholder="<?php esc_attr_e( 'Coupon code', 'woocommerce' ); ?>" id="coupon_code" value="" /></p>
				
				<!-- Button -->
				<input type="submit" class="btn ws-btn-fullwidth" name="apply_coupon" value="<?php esc_attr_e( 'Apply Coupon', 'woocommerce' ); ?>" />

				<div class="clear"></div>
			</form>
		</div>
	</div>		
</div>
