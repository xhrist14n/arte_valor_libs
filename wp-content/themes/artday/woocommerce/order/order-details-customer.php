<?php
/**
 * Order Customer Details
 *
 * @author  WooThemes
 * @package WooCommerce/Templates
 * @version 2.4.0
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}
?>
<header><h2><?php esc_html_e( 'Customer Details', 'woocommerce' ); ?></h2></header>
<table class="shop_table shop_table_responsive customer_details">
	<?php if ( $order->customer_note ) : ?>
		<tr>
			<th><?php esc_html_e( 'Note:', 'woocommerce' ); ?></th>
			<td><?php echo wptexturize( $order->customer_note ); ?></td>
		</tr>
	<?php endif; ?>

	<?php if ( $order->billing_email ) : ?>
		<tr>
			<th><?php esc_html_e( 'Email:', 'woocommerce' ); ?></th>
			<td><?php echo esc_html( $order->billing_email ); ?></td>
		</tr>
	<?php endif; ?>

	<?php if ( $order->billing_phone ) : ?>
		<tr>
			<th><?php esc_html_e( 'Telephone:', 'woocommerce' ); ?></th>
			<td><?php echo esc_html( $order->billing_phone ); ?></td>
		</tr>
	<?php endif; ?>

	<?php do_action( 'woocommerce_order_details_after_customer_details', $order ); ?>
</table>

<?php if ( ! wc_ship_to_billing_address_only() && $order->needs_shipping_address() ) : ?>

<div class="row">
	<div class="col-sm-6">

<?php endif; ?>

<div class="ws-customer-address">
	<header>
		<h3><?php esc_html_e( 'Billing Address', 'woocommerce' ); ?></h3>		
	</header>
	<address>
		<?php echo ( $address = $order->get_formatted_billing_address() ) ? $address : esc_html__( 'N/A', 'woocommerce' ); ?>
	</address>
</div>

<?php if ( ! wc_ship_to_billing_address_only() && $order->needs_shipping_address() ) : ?>

	</div>
	<div class="col-sm-6 ws-customer-address">
		<header class="title">
			<h3><?php esc_html_e( 'Shipping Address', 'woocommerce' ); ?></h3>			
		</header>
		<address>
			<?php echo ( $address = $order->get_formatted_shipping_address() ) ? $address : esc_html__( 'N/A', 'woocommerce' ); ?>
		</address>
	</div>
</div>

<?php endif; ?>
