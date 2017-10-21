var ulp_active_window_id = false;
var ulp_active_campaign = "";
var ulp_subscribing = false;
var ulp_onload_displayed = false;
var ulp_onexit_displayed = false;
var ulp_onscroll_displayed = false;
var ulp_onidle_displayed = false;
var ulp_no_preload_loading = false;
var ulp_timeout;
var ulp_onidle_counter = 0;
var ulp_onidle_timer;
var ulp_position_margin = 16;
var ulp_recaptcha_queue = new Array();
var ulp_css3_animations_in = ['bounceIn','bounceInUp','bounceInDown','bounceInLeft','bounceInRight','fadeIn','fadeInUp','fadeInDown','fadeInLeft','fadeInRight','flipInX','flipInY','lightSpeedIn','rotateIn','rotateInDownLeft','rotateInDownRight','rotateInUpLeft','rotateInUpRight','rollIn','zoomIn','zoomInUp','zoomInDown','zoomInLeft','zoomInRight'];
var ulp_css3_animations_out = ['bounceOut','bounceOutUp','bounceOutDown','bounceOutLeft','bounceOutRight','fadeOut','fadeOutUp','fadeOutDown','fadeOutLeft','fadeOutRight','flipOutX','flipOutY','lightSpeedOut','rotateOut','rotateOutDownLeft','rotateOutDownRight','rotateOutUpLeft','rotateOutUpRight','rollOut','zoomOut','zoomOutUp','zoomOutDown','zoomOutLeft','zoomOutRight'];

var ulp_mobile = (function(a){if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(a)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0,4)))return true; else return false;})(navigator.userAgent||navigator.vendor||window.opera);

function ulp_popup_id(_popup_id) {
	if (_popup_id == "") return "";
	var ids = _popup_id.split("*");
	if (ids.length == 1) return _popup_id;
	if (ulp_mobile) return ids[1];
	return ids[0];
}
function ulp_prepare_ids() {
	ulp_onload_popup = ulp_popup_id(ulp_onload_popup);
	ulp_onexit_popup = ulp_popup_id(ulp_onexit_popup);
	ulp_onscroll_popup = ulp_popup_id(ulp_onscroll_popup);
	ulp_onidle_popup = ulp_popup_id(ulp_onidle_popup);
}
function ulp_inline_open(resize) {
	jQuery(".ulp-inline-window").each(function() {
		var inline_id = jQuery(this).attr("id");
		var inline_popup_id = jQuery(this).attr("data-id");
		if (!resize) ulp_track(inline_id, "layered-inline", "show", "");
		_ulp_inline_open(inline_id, true, resize);
	});
}
function _ulp_inline_hide_confirmation(inline_id) {
	if (jQuery("#"+inline_id).length) {
		var content = jQuery("#"+inline_id).find(".ulp-content");
		jQuery(content).find(".ulp-layer").each(function() {
			var layer = this;
			var confirmation_layer = jQuery(layer).attr("data-confirmation");
			if (confirmation_layer == "on") {
				jQuery(layer).fadeOut(300);
			}
		});
	}
}
function _ulp_inline_open(inline_id, main_window, resize) {
	jQuery("#"+inline_id).each(function() {
		viewport_width = Math.max(320, jQuery(this).parent().innerWidth());
		var width = parseInt(jQuery(this).attr("data-width"), 10);
		var height = parseInt(jQuery(this).attr("data-height"), 10);
		
		var scale = viewport_width/width;
		if (scale > 1) scale = 1;
		width = parseInt(width*scale, 10);
		height = parseInt(height*scale, 10);
		jQuery(this).css({
			"width": width+"px",
			"height": height+"px"
		});
		var content = jQuery(this).find(".ulp-content");
		jQuery(content).css({
			"width": width+"px",
			"height": height+"px"
		});
		jQuery(content).find(".ulp-layer").each(function() {
			var layer = this;
			var confirmation_layer = jQuery(layer).attr("data-confirmation");
			if (confirmation_layer == "on" && main_window) {
				if (resize) jQuery(layer).fadeOut(300);
				else jQuery(layer).hide();
				return;
			} else if (confirmation_layer == "off" && !main_window) {
				return;
			}
			jQuery(layer).show();
			if (ulp_recaptcha_enable == "on") {
				jQuery(layer).find(".ulp-recaptcha").each(function() {
					var widget_id = jQuery(this).attr("data-widget");
					if (typeof widget_id == 'undefined') {
						var theme = jQuery(this).attr("data-theme");
						var id = jQuery(this).attr("id");
						if (id) {
							if (typeof grecaptcha != 'undefined') {
								widget_id = grecaptcha.render(id, {"sitekey" : ulp_recaptcha_public_key, "theme" : theme});
								jQuery(this).attr("data-widget", widget_id);
							} else {
								ulp_recaptcha_queue.push(id);
							}
						}
					}
				});
			}
			if (!resize) {
				var layer_content_encoded = jQuery(layer).attr("data-base64");
				if (layer_content_encoded) {
					jQuery(layer).html(ulp_decode64(jQuery(layer).html()));
				}
			}
			var layer_left = jQuery(layer).attr("data-left");
			var layer_top = jQuery(layer).attr("data-top");
			var layer_width = jQuery(layer).attr("data-width");
			var layer_height = jQuery(layer).attr("data-height");
			var layer_font_size = jQuery(layer).attr("data-font-size");
			if (layer_width) jQuery(layer).css("width", parseInt(layer_width*scale, 10)+"px");
			if (layer_height) {
				jQuery(layer).css("height", parseInt(layer_height*scale, 10)+"px");
				var layer_scrollbar = jQuery(layer).attr("data-scrollbar");
				if (layer_scrollbar && layer_scrollbar == "on") {
					jQuery(layer).css("overflow", "hidden");
					jQuery(layer).scrollTop(0);
					if (jQuery.fn.perfectScrollbar) jQuery(layer).perfectScrollbar({suppressScrollX: true});
				}
			}
			if (layer_font_size) jQuery(layer).css("font-size", Math.max(4, parseInt(layer_font_size*scale, 10))+"px");
			jQuery(layer).css({
				"left": parseInt(layer_left*scale, 10)+"px",
				"top": parseInt(layer_top*scale, 10)+"px"
			});
			if (!main_window) {
				jQuery(layer).css({
					"display": "none"
				});
				jQuery(layer).fadeIn(500);
			}
		});
		if (jQuery.fn.mask) {
			jQuery(this).find(".ulp-input-mask").each(function() {
				var mask = jQuery(this).attr("data-mask");	
				if (mask) jQuery(this).mask(mask);
				jQuery(this).removeClass("ulp-input-mask");
			});
		}
		jQuery(this).fadeIn(300);
	});
	return false;
}
function _ulp_inline_subscribe(inline_id, action) {
	jQuery(".ulp-input-error").removeClass("ulp-input-error");
	
	var inline_popup_id = jQuery("#"+inline_id).attr("data-id");
	var button_icon_loading = "";
	var button_icon = jQuery("#"+inline_id).find('.ulp-submit').attr("data-icon");
	if (!button_icon || button_icon == "" || button_icon == "fa-noicon") button_icon = "";
	else {
		button_icon = "<i class='fa "+button_icon+"'></i>&nbsp; ";
		button_icon_loading = "<i class='fa fa-spinner fa-spin'></i>&nbsp; ";
	}
	
	var button_label = jQuery("#"+inline_id).find('.ulp-submit').attr("data-label");
	var button_label_loading = jQuery("#"+inline_id).find('.ulp-submit').attr("data-loading");
	if (!button_label_loading || button_label_loading == "") button_label_loading = "Loading...";
	jQuery("#"+inline_id).find('.ulp-submit').html(button_icon_loading+button_label_loading);
	var post_data = {
		"ulp-popup" : inline_popup_id,
		"ulp-campaign" : "",
		"action" : action
	}
	jQuery("#"+inline_id).find(".ulp-input-field").each(function() {
		var name = jQuery(this).attr("name");
		if (jQuery(this).is(":checked")) post_data[name] = "on";
		else post_data[name] = jQuery(this).val();
	});
	
	if (ulp_recaptcha_enable == "on" && typeof grecaptcha != 'undefined') {
		jQuery("#"+inline_id).find(".ulp-recaptcha").each(function() {
			var widget_id = jQuery(this).attr("data-widget");
			if (typeof widget_id != 'undefined') {
				var id = jQuery(this).attr("id");
				post_data[id] = grecaptcha.getResponse(widget_id);
			}
		});
	}
	
	jQuery.post(ulp_ajax_url, post_data, function(return_data) {
			//alert(return_data);
			ulp_subscribing = false;
			var data;
			jQuery("#"+inline_id).find('.ulp-submit').html(button_icon+button_label);
			ulp_reset_recaptcha(inline_id);
			try {
				var data = jQuery.parseJSON(return_data);
				var status = data.status;
				if (status == "OK") {
					var cookie_lifetime = 180;
					if (typeof data.cookie_lifetime != 'undefined') cookie_lifetime = parseInt(data.cookie_lifetime, 10);
					if (cookie_lifetime > 0) {
						if (inline_popup_id == ulp_onload_popup || (ulp_onexit_limits == "on" && ulp_onload_popup != "")) {
							ulp_write_cookie("ulp-onload-"+ulp_onload_popup, ulp_cookie_value, cookie_lifetime);
							ulp_onload_displayed = true;
						}
						if (inline_popup_id == ulp_onexit_popup || (ulp_onexit_limits == "on" && ulp_onexit_popup != "")) {
							ulp_write_cookie("ulp-onexit-"+ulp_onexit_popup, ulp_cookie_value, cookie_lifetime);
							ulp_onexit_displayed = true;
						}
						if (inline_popup_id == ulp_onscroll_popup || (ulp_onexit_limits == "on" && ulp_onscroll_popup != "")) {
							ulp_write_cookie("ulp-onscroll-"+ulp_onscroll_popup, ulp_cookie_value, cookie_lifetime);
							ulp_onscroll_displayed = true;
						}
						if (inline_popup_id == ulp_onidle_popup || (ulp_onexit_limits == "on" && ulp_onidle_popup != "")) {
							ulp_write_cookie("ulp-onidle-"+ulp_onidle_popup, ulp_cookie_value, cookie_lifetime);
							ulp_onidle_displayed = true;
						}
						ulp_write_cookie("ulp-inline-"+inline_popup_id, ulp_cookie_value, cookie_lifetime);
					}
					ulp_track(inline_id, "layered-inline", "subscribe", jQuery("#"+inline_id).find('[name="ulp-email"]').val());
					_ulp_inline_open(inline_id, false, true);
					if (typeof ulp_inline_subscribed == 'function') { 
						ulp_inline_subscribed(inline_id, data);
					}
					var redirect_url = data.return_url;
					var close_delay = 0;
					if (data.close_delay) close_delay = parseInt(data.close_delay, 10);
					var thanksgiving_popup = data.thanksgiving_popup;
					setTimeout(function() {
						_ulp_inline_hide_confirmation(inline_id);
						if (redirect_url.length > 0) location.href = redirect_url;
						if (thanksgiving_popup.length > 0) ulp_open(thanksgiving_popup);
					}, close_delay);
				} else if (status == "ERROR") {
					jQuery("#"+inline_id).find(".ulp-input-field, .ulp-recaptcha, .ulp-checkbox").each(function() {
						var name = jQuery(this).attr("name");
						if (data[name] == "ERROR") jQuery(this).addClass("ulp-input-error");
					});
				} else {
					jQuery("#"+inline_id).find('.ulp-submit').html(button_icon+"Error!");
				}
			} catch(error) {
				jQuery("#"+inline_id).find('.ulp-submit').html(button_icon+"Error!");
			}
		}
	);
	return false;
}
function ulp_open(id) {
	if (ulp_active_window_id == id) return;
	if (ulp_active_window_id) ulp_self_close();
	var str_id = id;
	ulp_active_campaign = "";
	if (id.substr(0, 3) == 'ab-') {
		if (ulp_campaigns[id]) {
			str_id = ulp_campaigns[id][Math.floor(Math.random()*ulp_campaigns[id].length)];
			ulp_active_campaign = id;
		} else return;
	}
	if (!jQuery("#ulp-"+str_id).length) {
		if (ulp_no_preload == 'on') {
			if (ulp_overlays[str_id] && !ulp_no_preload_loading && !ulp_active_window_id) {
				ulp_no_preload_loading = true;
				if (ulp_overlays[str_id][0] != "") {
					var overlay_html = "<div class='ulp-overlay' id='ulp-"+str_id+"-overlay' style='background: "+ulp_overlays[str_id][0]+"; opacity: "+ulp_overlays[str_id][1]+";'></div>";
					jQuery('body').append(overlay_html);
					jQuery("#ulp-"+str_id+"-overlay").fadeIn(300, function() {
						var loader = "<div class='ulp-loader ulp-loader-"+ulp_overlays[str_id][3]+"'></div>";
						jQuery('body').append(loader);
					});
				} else {
					var loader = "<div class='ulp-loader ulp-loader-"+ulp_overlays[str_id][3]+"'></div>";
					jQuery('body').append(loader);
				}
				if (ulp_overlays[str_id][2] == "on") {
					jQuery("#ulp-"+str_id+"-overlay").bind("click", function($) {
						ulp_no_preload_loading = false
						jQuery(".ulp-loader").hide();
						jQuery(".ulp-loader").remove();
						if (!jQuery("#ulp-"+str_id).length) {
							jQuery("#ulp-"+str_id+"-overlay").unbind("click");
							jQuery("#ulp-"+str_id+"-overlay").fadeOut(300);
						} else {
							jQuery("#ulp-"+str_id+"-overlay").unbind("click");
							ulp_close(str_id);
						}
					});
				}
				jQuery.post(ulp_ajax_url, 
					{"ulp-campaign" : ulp_active_campaign, "ulp-popup" : str_id, "action" : "ulp_loadpopup"},
					function(return_data) {
						jQuery(".ulp-loader").hide();
						jQuery(".ulp-loader").remove();
						var data;
						try {
							var data = jQuery.parseJSON(return_data);
							var status = data.status;
							if (status == "OK") {
								if (!ulp_no_preload_loading) return false;
								jQuery('body').append(data.html);
								if (typeof FB != 'undefined' && FB.XFBML != 'undefined') {
									FB.XFBML.parse(); 
								}
								if (typeof twttr != 'undefined' && typeof twttr.widgets != 'undefined') {
									twttr.widgets.load();
								}
								if (typeof gapi != 'undefined' && typeof gapi.plusone != 'undefined') {
									gapi.plusone.go();
								}
								if (typeof IN != 'undefined' && typeof IN.parse != 'undefined') {
									IN.parse();
								}
								jQuery.post(ulp_ajax_url, {"ulp-campaign" : ulp_active_campaign, "ulp-popup" : str_id, "action" : "ulp_addimpression"});
								ulp_track(str_id, "layered-popup", "show", "");
								_ulp_open(str_id, true, true);
								ulp_no_preload_loading = false;
								return false;
							} else {
								return false;
							}
						} catch(error) {
							return false;
						}
					}
				);
			} else return false;
		}
	} else {
		jQuery.post(ulp_ajax_url, {"ulp-campaign" : ulp_active_campaign, "ulp-popup" : str_id, "action" : "ulp_addimpression"});
		ulp_track(str_id, "layered-popup", "show", "");
		return _ulp_open(str_id, true, false);
	}
	return false;
}
function _ulp_open(id, main_window, overlay_displayed) {
	clearTimeout(ulp_timeout);
	jQuery("#ulp-"+id).each(function() {
		if (typeof ulpext_open_before == 'function') {
			ulpext_open_before(id);
		}
		ulp_active_window_id = id;
		if (main_window && !overlay_displayed) {
			jQuery("#ulp-"+id+"-overlay").fadeIn(300);
			if (jQuery(this).attr("data-close") == "on") {
				jQuery("#ulp-"+id+"-overlay").bind("click", function($) {
					ulp_close(id);
				});
			}
		}
		var viewport = {
			width: Math.max(320, jQuery(window).width()),
			height: Math.max(320, jQuery(window).height())
		};
		var width = parseInt(jQuery(this).attr("data-width"), 10);
		var height = parseInt(jQuery(this).attr("data-height"), 10);
		
		var scale = Math.min((viewport.width-20)/width, viewport.height/height);
		if (scale > 1) scale = 1;
		width = parseInt(width*scale, 10);
		height = parseInt(height*scale, 10);
		var position = jQuery(this).attr("data-position");
		jQuery(this).css({
			"width": width+"px",
			"height": height+"px"
		});
		switch (position) {
			case 'top-left':
				jQuery(this).css({
					"top": ulp_position_margin + "px",
					"left": ulp_position_margin + "px"
				});
				break;
			case 'top-center':
				jQuery(this).css({
					"top": ulp_position_margin + "px",
					"left": "50%",
					"margin-left": "-"+parseInt(width/2, 10)+"px"
				});
				break;
			case 'top-right':
				jQuery(this).css({
					"top": ulp_position_margin + "px",
					"right": ulp_position_margin + "px"
				});
				break;
			case 'bottom-left':
				jQuery(this).css({
					"bottom": ulp_position_margin + "px",
					"left": ulp_position_margin + "px"
				});
				break;
			case 'bottom-center':
				jQuery(this).css({
					"bottom": ulp_position_margin + "px",
					"left": "50%",
					"margin-left": "-"+parseInt(width/2, 10)+"px"
				});
				break;
			case 'bottom-right':
				jQuery(this).css({
					"bottom": ulp_position_margin + "px",
					"right": ulp_position_margin + "px"
				});
				break;
			case 'middle-left':
				jQuery(this).css({
					"top": "50%",
					"margin-top": "-"+parseInt(height/2, 10)+"px",
					"left": ulp_position_margin + "px"
				});
				break;
			case 'middle-right':
				jQuery(this).css({
					"top": "50%",
					"margin-top": "-"+parseInt(height/2, 10)+"px",
					"right": ulp_position_margin + "px"
				});
				break;
			default:
				jQuery(this).css({
					"top": "50%",
					"left": "50%",
					"margin-left": "-"+parseInt(width/2, 10)+"px",
					"margin-top": "-"+parseInt(height/2, 10)+"px"
				});
				break;
		}
		
		var content = jQuery(this).find(".ulp-content");
		jQuery(content).css({
			"width": width+"px",
			"height": height+"px"
		});
		jQuery(content).find(".ulp-layer").each(function() {
			var layer = this;
			var confirmation_layer = jQuery(layer).attr("data-confirmation");
			if (confirmation_layer == "on" && main_window) {
				jQuery(layer).hide();
				return;
			} else if (confirmation_layer == "off" && !main_window) {
				return;
			}
			jQuery(layer).show();
			if (ulp_recaptcha_enable == "on") {
				jQuery(layer).find(".ulp-recaptcha").each(function() {
					var widget_id = jQuery(this).attr("data-widget");
					if (typeof widget_id == 'undefined') {
						var theme = jQuery(this).attr("data-theme");
						var id = jQuery(this).attr("id");
						if (id) {
							if (typeof grecaptcha != 'undefined') {
								widget_id = grecaptcha.render(id, {"sitekey" : ulp_recaptcha_public_key, "theme" : theme});
								jQuery(this).attr("data-widget", widget_id);
							} else {
								ulp_recaptcha_queue.push(id);
							}
						}
					}
				});
			}
			var layer_content_encoded = jQuery(layer).attr("data-base64");
			if (layer_content_encoded) {
				jQuery(layer).html(ulp_decode64(jQuery(layer).html()));
			}
			var layer_left = jQuery(layer).attr("data-left");
			var layer_top = jQuery(layer).attr("data-top");
			var layer_width = jQuery(layer).attr("data-width");
			var layer_height = jQuery(layer).attr("data-height");
			var layer_font_size = jQuery(layer).attr("data-font-size");
			var layer_appearance = jQuery(layer).attr("data-appearance");
			var layer_appearance_delay = parseInt(jQuery(layer).attr("data-appearance-delay"), 10);
			var layer_appearance_speed = parseInt(jQuery(layer).attr("data-appearance-speed"), 10);
			if (layer_width) jQuery(layer).css("width", parseInt(layer_width*scale, 10)+"px");
			if (layer_height) {
				jQuery(layer).css("height", parseInt(layer_height*scale, 10)+"px");
				var layer_scrollbar = jQuery(layer).attr("data-scrollbar");
				if (layer_scrollbar && layer_scrollbar == "on") {
					jQuery(layer).css("overflow", "hidden");
					jQuery(layer).scrollTop(0);
					if (jQuery.fn.perfectScrollbar) jQuery(layer).perfectScrollbar({suppressScrollX: true});
				}
			}
			if (layer_font_size) jQuery(layer).css("font-size", Math.max(4, parseInt(layer_font_size*scale, 10))+"px");
			
			if (ulp_css3_enable != "on") {
				if (ulp_css3_animations_in.indexOf(layer_appearance) >= 0) {
					layer_appearance = "fade-in";
				}
			}
			
			switch (layer_appearance) {
				case "slide-down":
					jQuery(layer).css({
						"left": parseInt(layer_left*scale, 10)+"px",
						"top": "-"+parseInt(2*viewport.height)+"px"
					});
					setTimeout(function() {
						jQuery(layer).animate({
							"top": parseInt(layer_top*scale, 10)+"px"
						}, layer_appearance_speed);
					}, layer_appearance_delay);
					break;
				case "slide-up":
					jQuery(layer).css({
						"left": parseInt(layer_left*scale, 10)+"px",
						"top": parseInt(2*viewport.height)+"px"
					});
					setTimeout(function() {
						jQuery(layer).animate({
							"top": parseInt(layer_top*scale, 10)+"px"
						}, layer_appearance_speed);
					}, layer_appearance_delay);
					break;
				case "slide-left":
					jQuery(layer).css({
						"left": parseInt(2*viewport.width)+"px",
						"top": parseInt(layer_top*scale, 10)+"px"
					});
					setTimeout(function() {
						jQuery(layer).animate({
							"left": parseInt(layer_left*scale, 10)+"px"
						}, layer_appearance_speed);
					}, layer_appearance_delay);
					break;
				case "slide-right":
					jQuery(layer).css({
						"left": "-"+parseInt(2*viewport.width)+"px",
						"top": parseInt(layer_top*scale, 10)+"px"
					});
					setTimeout(function() {
						jQuery(layer).animate({
							"left": parseInt(layer_left*scale, 10)+"px"
						}, layer_appearance_speed);
					}, layer_appearance_delay);
					break;
				case "fade-in":
					jQuery(layer).css({
						"left": parseInt(layer_left*scale, 10)+"px",
						"top": parseInt(layer_top*scale, 10)+"px",
						"display": "none"
					});
					setTimeout(function() {
						jQuery(layer).fadeIn(layer_appearance_speed);
					}, layer_appearance_delay);
					break;
				default:
					if (ulp_css3_animations_in.indexOf(layer_appearance) >= 0) {
						jQuery(layer).css({
							"animation-duration": parseInt(layer_appearance_speed, 10)+"ms",
							"-webkit-animation-duration": parseInt(layer_appearance_speed, 10)+"ms",
							"-ms-animation-duration": parseInt(layer_appearance_speed, 10)+"ms",
							"-moz-animation-duration": parseInt(layer_appearance_speed, 10)+"ms",
							"animation-delay": parseInt(layer_appearance_delay, 10)+"ms",
							"-webkit-animation-delay": parseInt(layer_appearance_delay, 10)+"ms",
							"-ms-animation-delay": parseInt(layer_appearance_delay, 10)+"ms",
							"-moz-animation-delay": parseInt(layer_appearance_delay, 10)+"ms"
						});
						jQuery(layer).attr("class", "ulp-layer ulp-animated ulp-"+layer_appearance);
						jQuery(layer).css({
							"left": parseInt(layer_left*scale, 10)+"px",
							"top": parseInt(layer_top*scale, 10)+"px"
						});
					} else {
						jQuery(layer).css({
							"left": parseInt(layer_left*scale, 10)+"px",
							"top": parseInt(layer_top*scale, 10)+"px"
						});
					}
					break;
			}
		});
		if (jQuery.fn.mask) {
			jQuery(this).find(".ulp-input-mask").each(function() {
				var mask = jQuery(this).attr("data-mask");	
				if (mask) jQuery(this).mask(mask);
				jQuery(this).removeClass("ulp-input-mask");
			});
		}
		jQuery(this).show();
	});
	return false;
}
function ulp_close(id) {
	jQuery("#ulp-"+id).each(function() {
		ulp_subscribing = false;
		ulp_active_window_id = false;
		ulp_active_campaign = false;
		var layer_appearance_speed = 500;
		var content = jQuery(this).find(".ulp-content");
		var viewport = {
			width: Math.max(320, jQuery(window).width()),
			height: Math.max(320, jQuery(window).height())
		};
		jQuery("#ulp-"+id+"-overlay").unbind("click");
		
		jQuery(content).find(".ulp-layer").each(function() {
			var layer = this;
			var layer_appearance = jQuery(layer).attr("data-appearance");
			
			if (ulp_css3_enable != "on") {
				if (ulp_css3_animations_in.indexOf(layer_appearance) >= 0) {
					layer_appearance = "fade-in";
				}
			}
			
			switch (layer_appearance) {
				case "slide-down":
					jQuery(layer).animate({
						"top": "-"+parseInt(2*viewport.height)+"px"
					}, layer_appearance_speed);
					break;
				case "slide-up":
					jQuery(layer).animate({
						"top": parseInt(2*viewport.height)+"px"
					}, layer_appearance_speed);
					break;
				case "slide-left":
					jQuery(layer).animate({
						"left": parseInt(2*viewport.width)+"px"
					}, layer_appearance_speed);
					break;
				case "slide-right":
					jQuery(layer).animate({
						"left": "-"+parseInt(2*viewport.width)+"px"
					}, layer_appearance_speed);
					break;
				case "fade-in":
					jQuery(layer).fadeOut(layer_appearance_speed);
					break;
				default:
					if (ulp_css3_animations_in.indexOf(layer_appearance) >= 0) {
						layer_appearance = ulp_css3_animations_out[ulp_css3_animations_in.indexOf(layer_appearance)];
						jQuery(layer).css({
							"animation-duration": parseInt(layer_appearance_speed, 10)+"ms",
							"-webkit-animation-duration": parseInt(layer_appearance_speed, 10)+"ms",
							"-ms-animation-duration": parseInt(layer_appearance_speed, 10)+"ms",
							"-moz-animation-duration": parseInt(layer_appearance_speed, 10)+"ms",
							"animation-delay": "0s",
							"-webkit-animation-delay": "0s",
							"-ms-animation-delay": "0s",
							"-moz-animation-delay": "0s"
						});
						jQuery(layer).attr("class", "ulp-layer ulp-animated ulp-"+layer_appearance);
					} else {
						jQuery(layer).css({
							"display": "none"
						});
					}
					break;
			}
			setTimeout(function() {
				var layer_content_encoded = jQuery(layer).attr("data-base64");
				if (layer_content_encoded) {
					jQuery(layer).html(ulp_encode64(jQuery(layer).html()));
				}
			}, layer_appearance_speed);		
		});
		
		setTimeout(function() {
			jQuery("#ulp-"+id).hide();
			ulp_clear_form(id);
			jQuery("#ulp-"+id+"-overlay").fadeOut(300);
			if (typeof ulpext_close_after == 'function') { 
				ulpext_close_after(id);
			}
		}, layer_appearance_speed);		
	});
	return false;
}
function ulp_self_close() {
	ulp_close(ulp_active_window_id);
	return false;
}
function ulp_reset_recaptcha(window_id) {
	if (ulp_recaptcha_enable == "on" && typeof grecaptcha != 'undefined') {
		jQuery("#"+window_id).find(".ulp-recaptcha").each(function() {
			var widget_id = jQuery(this).attr("data-widget");
			if (typeof widget_id != 'undefined') {
				var id = jQuery(this).attr("id");
				grecaptcha.reset(widget_id);
			}
		});
	}
}
function ulp_subscribe(object, action) {
	if (ulp_subscribing) return false;
	ulp_subscribing = true;
	
	if (typeof action === 'undefined') action = 'ulp_subscribe';
	
	var inline_id = jQuery(object).parents(".ulp-inline-window").attr("id");
	if (inline_id) {
		_ulp_inline_subscribe(inline_id, action);
		return false;
	}
	
	jQuery(".ulp-input-error").removeClass("ulp-input-error");
	var button_icon_loading = "";
	var button_icon = jQuery("#ulp-"+ulp_active_window_id).find('.ulp-submit').attr("data-icon");
	if (!button_icon || button_icon == "" || button_icon == "fa-noicon") button_icon = "";
	else {
		button_icon = "<i class='fa "+button_icon+"'></i>&nbsp; ";
		button_icon_loading = "<i class='fa fa-spinner fa-spin'></i>&nbsp; ";
	}
	
	var button_label = jQuery("#ulp-"+ulp_active_window_id).find('.ulp-submit').attr("data-label");
	var button_label_loading = jQuery("#ulp-"+ulp_active_window_id).find('.ulp-submit').attr("data-loading");
	if (!button_label_loading || button_label_loading == "") button_label_loading = "Loading...";
	jQuery("#ulp-"+ulp_active_window_id).find('.ulp-submit').html(button_icon_loading+button_label_loading);
	var post_data = {
		"ulp-popup" : ulp_active_window_id,
		"ulp-campaign" : ulp_active_campaign,
		"action" : action
	}
	jQuery("#ulp-"+ulp_active_window_id).find(".ulp-input-field").each(function() {
		var name = jQuery(this).attr("name");
		if (jQuery(this).is(":checked")) post_data[name] = "on";
		else post_data[name] = jQuery(this).val();
	});

	if (ulp_recaptcha_enable == "on" && typeof grecaptcha != 'undefined') {
		jQuery("#ulp-"+ulp_active_window_id).find(".ulp-recaptcha").each(function() {
			var widget_id = jQuery(this).attr("data-widget");
			if (typeof widget_id != 'undefined') {
				var id = jQuery(this).attr("id");
				post_data[id] = grecaptcha.getResponse(widget_id);
			}
		});
	}
	
	jQuery.post(ulp_ajax_url, post_data, function(return_data) {
			//alert(return_data);
			var data;
			jQuery("#ulp-"+ulp_active_window_id).find('.ulp-submit').html(button_icon+button_label);
			ulp_reset_recaptcha("ulp-"+ulp_active_window_id);
			try {
				var data = jQuery.parseJSON(return_data);
				var status = data.status;
				if (status == "OK") {
					var cookie_lifetime = 180;
					if (typeof data.cookie_lifetime != 'undefined') cookie_lifetime = parseInt(data.cookie_lifetime, 10);
					if (cookie_lifetime > 0) {
						if (ulp_active_window_id == ulp_onload_popup || (ulp_active_campaign == ulp_onload_popup && ulp_onload_popup != "") || (ulp_onexit_limits == "on" && ulp_onload_popup != "")) {
							ulp_write_cookie("ulp-onload-"+ulp_onload_popup, ulp_cookie_value, cookie_lifetime);
							ulp_onload_displayed = true;
						}
						if (ulp_active_window_id == ulp_onexit_popup || (ulp_active_campaign == ulp_onexit_popup && ulp_onexit_popup != "") || (ulp_onexit_limits == "on" && ulp_onexit_popup != "")) {
							ulp_write_cookie("ulp-onexit-"+ulp_onexit_popup, ulp_cookie_value, cookie_lifetime);
							ulp_onexit_displayed = true;
						}
						if (ulp_active_window_id == ulp_onscroll_popup || (ulp_active_campaign == ulp_onscroll_popup && ulp_onscroll_popup != "") || (ulp_onexit_limits == "on" && ulp_onscroll_popup != "")) {
							ulp_write_cookie("ulp-onscroll-"+ulp_onscroll_popup, ulp_cookie_value, cookie_lifetime);
							ulp_onscroll_displayed = true;
						}
						if (ulp_active_window_id == ulp_onidle_popup || (ulp_active_campaign == ulp_onidle_popup && ulp_onidle_popup != "") || (ulp_onexit_limits == "on" && ulp_onidle_popup != "")) {
							ulp_write_cookie("ulp-onidle-"+ulp_onidle_popup, ulp_cookie_value, cookie_lifetime);
							ulp_onidle_displayed = true;
						}
						if (typeof ulp_subscribed == 'function') { 
							ulp_subscribed(ulp_active_window_id, data);
						}
						ulp_write_cookie("ulp-inline-"+ulp_active_window_id, ulp_cookie_value, cookie_lifetime);
					}
					ulp_track(ulp_active_window_id, "layered-popup", "subscribe", jQuery("#ulp-"+ulp_active_window_id).find('[name="ulp-email"]').val());
					_ulp_open(ulp_active_window_id, false, false);
					var close_delay = 0;
					if (data.close_delay) close_delay = data.close_delay;
					var redirect_url = data.return_url;
					var thanksgiving_popup = data.thanksgiving_popup;
					setTimeout(function() {
						if (redirect_url.length > 0) location.href = redirect_url;
						else if (thanksgiving_popup.length > 0) {
							ulp_subscribing = false;
							ulp_open(thanksgiving_popup);
						} else {
							ulp_self_close();
							ulp_subscribing = false;
						}
					}, close_delay);
				} else if (status == "ERROR") {
					ulp_subscribing = false;
					jQuery("#ulp-"+ulp_active_window_id).find(".ulp-input-field, .ulp-recaptcha, .ulp-checkbox").each(function() {
						var name = jQuery(this).attr("name");
						if (data[name] == "ERROR") jQuery(this).addClass("ulp-input-error");
					});
				} else {
					ulp_subscribing = false;
					jQuery("#ulp-"+ulp_active_window_id).find('.ulp-submit').html(button_icon+"Error!");
				}
			} catch(error) {
				ulp_subscribing = false;
				jQuery("#ulp-"+ulp_active_window_id).find('.ulp-submit').html(button_icon+"Error!");
			}
		}
	);
	return false;
}
function ulp_onload_open(onload_popup) {
	if (!ulp_active_window_id && !ulp_no_preload_loading && !ulp_onload_displayed) {
		if (ulp_onload_mode == "once-session") ulp_write_cookie("ulp-onload-"+ulp_onload_popup, ulp_cookie_value, 0);
		else if (ulp_onload_mode == "once-only") ulp_write_cookie("ulp-onload-"+ulp_onload_popup, ulp_cookie_value, 180);
		else if (ulp_onload_mode == "once-period") ulp_write_cookie("ulp-onload-"+ulp_onload_popup, ulp_cookie_value, ulp_onload_period);
		ulp_open(onload_popup);
		ulp_onload_displayed = true;
		if (ulp_onload_close_delay != 0) {
			ulp_timeout = setTimeout(function() {ulp_self_close();}, parseInt(ulp_onload_close_delay, 10)*1000);
		}
	}
}
function ulp_init() {
	var ulp_onload_cookie = ulp_read_cookie("ulp-onload-"+ulp_onload_popup);
	if (ulp_onload_popup != "" && ulp_onload_mode != "none" && ulp_onload_cookie != ulp_cookie_value) {
		if (parseInt(ulp_onload_delay, 10) <= 0) {
			ulp_onload_open(ulp_onload_popup);
		} else {
			setTimeout(function() {
				ulp_onload_open(ulp_onload_popup);
			}, parseInt(ulp_onload_delay, 10)*1000);
		}
	}
	var ulp_onexit_cookie = ulp_read_cookie("ulp-onexit-"+ulp_onexit_popup);
	if (ulp_onexit_popup != "" && ulp_onexit_mode != "none" && ulp_onexit_cookie != ulp_cookie_value) {
		jQuery(document).bind('mouseleave', function(e) {
			var mouseY = parseInt(e.pageY - jQuery(window).scrollTop(), 10);
			if (!ulp_active_window_id && !ulp_no_preload_loading && !ulp_onexit_displayed && mouseY < 20) {
				if (ulp_onexit_mode == "once-session") ulp_write_cookie("ulp-onexit-"+ulp_onexit_popup, ulp_cookie_value, 0);
				else if (ulp_onexit_mode == "once-only") ulp_write_cookie("ulp-onexit-"+ulp_onexit_popup, ulp_cookie_value, 180);
				else if (ulp_onexit_mode == "once-period") ulp_write_cookie("ulp-onexit-"+ulp_onexit_popup, ulp_cookie_value, ulp_onexit_period);
				ulp_open(ulp_onexit_popup);
				ulp_onexit_displayed = true;
			}
		});
	}
	var ulp_onscroll_cookie = ulp_read_cookie("ulp-onscroll-"+ulp_onscroll_popup);
	if (ulp_onscroll_popup != "" && ulp_onscroll_mode != "none" && ulp_onscroll_cookie != ulp_cookie_value) {
		jQuery(window).scroll(function(e) {
			if (!ulp_active_window_id && !ulp_no_preload_loading && !ulp_onscroll_displayed) {
				var position = jQuery(window).scrollTop();
				if (position > ulp_onscroll_offset) {
					if (ulp_onscroll_mode == "once-session") ulp_write_cookie("ulp-onscroll-"+ulp_onscroll_popup, ulp_cookie_value, 0);
					else if (ulp_onscroll_mode == "once-only") ulp_write_cookie("ulp-onscroll-"+ulp_onscroll_popup, ulp_cookie_value, 180);
					else if (ulp_onscroll_mode == "once-period") ulp_write_cookie("ulp-onscroll-"+ulp_onscroll_popup, ulp_cookie_value, ulp_onscroll_period);
					ulp_open(ulp_onscroll_popup);
					ulp_onscroll_displayed = true;
				}
			}
		});
	}
	var ulp_onidle_cookie = ulp_read_cookie("ulp-onidle-"+ulp_onidle_popup);
	if (ulp_onidle_popup != "" && ulp_onidle_mode != "none" && ulp_onidle_cookie != ulp_cookie_value) {
		jQuery(window).mousemove(function(event) {
			ulp_onidle_counter = 0;
		});
		jQuery(window).click(function(event) {
			ulp_onidle_counter = 0;
		});
		jQuery(window).keypress(function(event) {
			ulp_onidle_counter = 0;
		});
		jQuery(window).scroll(function(event) {
			ulp_onidle_counter = 0;
		});
		ulp_onidle_timer = setTimeout("ulp_onidle_counter_handler();", 1000);
	}
}
function ulp_onidle_counter_handler() {
	if (ulp_onidle_counter >= ulp_onidle_delay) {
		if (!ulp_active_window_id && !ulp_no_preload_loading && !ulp_onidle_displayed) {
			if (ulp_onidle_mode == "once-session") {
				ulp_write_cookie("ulp-onidle-"+ulp_onidle_popup, ulp_cookie_value, 0);
				ulp_onidle_displayed = true;
			} else if (ulp_onidle_mode == "once-only") {
				ulp_write_cookie("ulp-onidle-"+ulp_onidle_popup, ulp_cookie_value, 180);
				ulp_onidle_displayed = true;
			} else if (ulp_onidle_mode == "once-period") {
				ulp_write_cookie("ulp-onidle-"+ulp_onidle_popup, ulp_cookie_value, ulp_onidle_period);
				ulp_onidle_displayed = true;
			}
			ulp_open(ulp_onidle_popup);
		}
		ulp_onidle_counter = 0;
	} else {
		ulp_onidle_counter = ulp_onidle_counter + 1;
	}
	ulp_onidle_timer = setTimeout("ulp_onidle_counter_handler();", 1000);
}
function ulp_read_cookie(key) {
	var pairs = document.cookie.split("; ");
	for (var i = 0, pair; pair = pairs[i] && pairs[i].split("="); i++) {
		if (pair[0] === key) return pair[1] || "";
	}
	return null;
}
function ulp_write_cookie(key, value, days) {
	if (days) {
		var date = new Date();
		date.setTime(date.getTime()+(days*24*60*60*1000));
		var expires = "; expires="+date.toGMTString();
	} else var expires = "";
	document.cookie = key+"="+value+expires+"; path=/";
}
jQuery(window).resize(function() {
	ulp_inline_open(true);
	if (ulp_active_window_id) {
		var viewport = {
			width: Math.max(320, jQuery(window).width()),
			height: Math.max(320, jQuery(window).height())
		};
		var width = parseInt(jQuery("#ulp-"+ulp_active_window_id).attr("data-width"), 10);
		var height = parseInt(jQuery("#ulp-"+ulp_active_window_id).attr("data-height"), 10);
		var scale = Math.min((viewport.width-20)/width, viewport.height/height);
		if (scale > 1) scale = 1;
		width = parseInt(width*scale, 10);
		height = parseInt(height*scale, 10);
		
		var position = jQuery("#ulp-"+ulp_active_window_id).attr("data-position");
		jQuery("#ulp-"+ulp_active_window_id).css({
			"width": width+"px",
			"height": height+"px"
		});
		switch (position) {
			case 'top-left':
				break;
			case 'top-center':
				jQuery("#ulp-"+ulp_active_window_id).css({
					"margin-left": "-"+parseInt(width/2, 10)+"px"
				});
				break;
			case 'top-right':
				break;
			case 'bottom-left':
				break;
			case 'bottom-center':
				jQuery("#ulp-"+ulp_active_window_id).css({
					"margin-left": "-"+parseInt(width/2, 10)+"px"
				});
				break;
			case 'bottom-right':
				break;
			case 'middle-left':
				jQuery("#ulp-"+ulp_active_window_id).css({
					"margin-top": "-"+parseInt(height/2, 10)+"px"
				});
				break;
			case 'middle-right':
				jQuery("#ulp-"+ulp_active_window_id).css({
					"margin-top": "-"+parseInt(height/2, 10)+"px"
				});
				break;
			default:
				jQuery("#ulp-"+ulp_active_window_id).css({
					"margin-left": "-"+parseInt(width/2, 10)+"px",
					"margin-top": "-"+parseInt(height/2, 10)+"px"
				});
				break;
		}
		
		var content = jQuery("#ulp-"+ulp_active_window_id).find(".ulp-content");
		jQuery(content).css({
			"width": width+"px",
			"height": height+"px"
		});
		jQuery(content).find(".ulp-layer").each(function() {
			var layer = this;
			var layer_left = jQuery(layer).attr("data-left");
			var layer_top = jQuery(layer).attr("data-top");
			var layer_width = jQuery(layer).attr("data-width");
			var layer_height = jQuery(layer).attr("data-height");
			var layer_font_size = jQuery(layer).attr("data-font-size");
			if (layer_width) jQuery(layer).css("width", parseInt(layer_width*scale, 10)+"px");
			//if (layer_height) jQuery(layer).css("height", parseInt(layer_height*scale, 10)+"px");
			if (layer_height) {
				jQuery(layer).css("height", parseInt(layer_height*scale, 10)+"px");
				var layer_scrollbar = jQuery(layer).attr("data-scrollbar");
				if (layer_scrollbar && layer_scrollbar == "on") {
					jQuery(layer).css("overflow", "hidden");
					jQuery(layer).scrollTop(0);
					if (jQuery.fn.perfectScrollbar) jQuery(layer).perfectScrollbar({suppressScrollX: true});
				}
			}
			
			if (layer_font_size) jQuery(layer).css("font-size", Math.max(4, parseInt(layer_font_size*scale, 10))+"px");
			jQuery(layer).css({
				"left": parseInt(layer_left*scale, 10)+"px",
				"top": parseInt(layer_top*scale, 10)+"px"
			});
		});
	}
});
function ulp_ready() {
	jQuery(".ulp-window").each(function() {
		var ulp_id = jQuery(this).attr("id");
		ulp_id = ulp_id.replace("ulp-", "");
		jQuery('[href="#'+ulp_id+'"]').click(function() {
			ulp_open(ulp_id);
			return false;
		});
	});
	jQuery("a").each(function() {
		var ulp_id = jQuery(this).attr("href");
		if (ulp_id) {
			var ulp_idx = ulp_id.indexOf("#ulp-");
			if (ulp_idx >= 0) {
				jQuery(this).click(function() {
					var ulp_id = jQuery(this).attr("href");
					var ulp_idx = ulp_id.indexOf("#ulp-");
					ulp_id = ulp_id.substr(ulp_idx+5);
					ulp_id = ulp_popup_id(ulp_id);
					ulp_open(ulp_id);
					return false;
				});
			}
		}
	});
	if (typeof FB != 'undefined') {
		FB.Event.subscribe('edge.create',function() {
			ulp_share('facebook-like');
		});
	}
	if (typeof twttr != 'undefined') {
		twttr.ready(function (twttr) {
			twttr.events.bind('tweet', function(event) {
				ulp_share('twitter-tweet');
			});
			twttr.events.bind('follow', function(event) {
				ulp_share('twitter-follow');
			});
		});
	}
	jQuery(document).keyup(function(e) {
		if (ulp_active_window_id) {
			if (jQuery("#ulp-"+ulp_active_window_id).attr("data-close") == "on") {
				if (e.keyCode == 27) ulp_self_close();
			}
		}
	});
}
function ulp_utf8encode(string) {
	string = string.replace(/\x0d\x0a/g, "\x0a");
	var output = "";
	for (var n = 0; n < string.length; n++) {
		var c = string.charCodeAt(n);
		if (c < 128) {
			output += String.fromCharCode(c);
		} else if ((c > 127) && (c < 2048)) {
			output += String.fromCharCode((c >> 6) | 192);
			output += String.fromCharCode((c & 63) | 128);
		} else {
			output += String.fromCharCode((c >> 12) | 224);
			output += String.fromCharCode(((c >> 6) & 63) | 128);
			output += String.fromCharCode((c & 63) | 128);
		}
	}
	return output;
}
function ulp_encode64(input) {
	var keyString = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";
	var output = "";
	var chr1, chr2, chr3, enc1, enc2, enc3, enc4;
	var i = 0;
	input = ulp_utf8encode(input);
	while (i < input.length) {
		chr1 = input.charCodeAt(i++);
		chr2 = input.charCodeAt(i++);
		chr3 = input.charCodeAt(i++);
		enc1 = chr1 >> 2;
		enc2 = ((chr1 & 3) << 4) | (chr2 >> 4);
		enc3 = ((chr2 & 15) << 2) | (chr3 >> 6);
		enc4 = chr3 & 63;
		if (isNaN(chr2)) {
			enc3 = enc4 = 64;
		} else if (isNaN(chr3)) {
			enc4 = 64;
		}
		output = output + keyString.charAt(enc1) + keyString.charAt(enc2) + keyString.charAt(enc3) + keyString.charAt(enc4);
	}
	return output;
}
function ulp_utf8decode(input) {
	var string = "";
	var i = 0;
	var c = c1 = c2 = 0;
	while ( i < input.length ) {
		c = input.charCodeAt(i);
		if (c < 128) {
			string += String.fromCharCode(c);
			i++;
		} else if ((c > 191) && (c < 224)) {
			c2 = input.charCodeAt(i+1);
			string += String.fromCharCode(((c & 31) << 6) | (c2 & 63));
			i += 2;
		} else {
			c2 = input.charCodeAt(i+1);
			c3 = input.charCodeAt(i+2);
			string += String.fromCharCode(((c & 15) << 12) | ((c2 & 63) << 6) | (c3 & 63));
			i += 3;
		}
	}
	return string;
}
function ulp_decode64(input) {
	var keyString = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";
	var output = "";
	var chr1, chr2, chr3;
	var enc1, enc2, enc3, enc4;
	var i = 0;
	input = input.replace(/[^A-Za-z0-9\+\/\=]/g, "");
	while (i < input.length) {
		enc1 = keyString.indexOf(input.charAt(i++));
		enc2 = keyString.indexOf(input.charAt(i++));
		enc3 = keyString.indexOf(input.charAt(i++));
		enc4 = keyString.indexOf(input.charAt(i++));
		chr1 = (enc1 << 2) | (enc2 >> 4);
		chr2 = ((enc2 & 15) << 4) | (enc3 >> 2);
		chr3 = ((enc3 & 3) << 6) | enc4;
		output = output + String.fromCharCode(chr1);
		if (enc3 != 64) {
			output = output + String.fromCharCode(chr2);
		}
		if (enc4 != 64) {
			output = output + String.fromCharCode(chr3);
		}
	}
	output = ulp_utf8decode(output);
	return output;
}
function ulp_track(id, type, action, email) {
	if (ulp_km_tracking == "on") {
		try {
			if (email && email != "") {
				if (typeof _kmq == 'object') {
					_kmq.push(['identify', email]);
				}
			}
		} catch(error) {
		}
	}
	if (ulp_ga_tracking == "on") {
		try {
			var title = '';
			if (type == 'layered-popup') {
				if (jQuery("#ulp-"+id).attr("data-title").length > 0) title = jQuery("#ulp-"+id).attr("data-title");
			} else if (type == 'layered-inline') {
				if (jQuery("#"+id).attr("data-title").length > 0) title = jQuery("#"+id).attr("data-title");
			}
			if (title.length > 0) {
				if (typeof _gaq == 'object') {
					_gaq.push(['_trackEvent', type, action, title, 1, false]);
				} else if (typeof _trackEvent == 'function') { 
					_trackEvent(type, action, title, 1, false);
				} else if (typeof __gaTracker == 'function') { 
					__gaTracker('send', 'event', type, action, title);
				} else if (typeof ga == 'function') {
					ga('send', 'event', type, action, title);
				}
			}
		} catch(error) {
		}
	}
}
function ulp_share(source) {
	if (ulp_active_window_id) {
		jQuery.post(ulp_ajax_url, {
			"ulp-source" : source,
			"ulp-popup" : ulp_active_window_id,
			"ulp-campaign" : ulp_active_campaign,
			"action" : "ulp_share"
			}, function(return_data) {
				//alert(return_data);
				var data;
				try {
					var data = jQuery.parseJSON(return_data);
					var status = data.status;
					if (status == "OK") {
						var cookie_lifetime = 180;
						if (typeof data.cookie_lifetime != 'undefined') cookie_lifetime = parseInt(data.cookie_lifetime, 10);
						if (cookie_lifetime > 0) {
							if (ulp_active_window_id == ulp_onload_popup || (ulp_active_campaign == ulp_onload_popup && ulp_onload_popup != "") || (ulp_onexit_limits == "on" && ulp_onload_popup != "")) {
								ulp_write_cookie("ulp-onload-"+ulp_onload_popup, ulp_cookie_value, cookie_lifetime);
								ulp_onload_displayed = true;
							}
							if (ulp_active_window_id == ulp_onexit_popup || (ulp_active_campaign == ulp_onexit_popup && ulp_onexit_popup != "") || (ulp_onexit_limits == "on" && ulp_onexit_popup != "")) {
								ulp_write_cookie("ulp-onexit-"+ulp_onexit_popup, ulp_cookie_value, cookie_lifetime);
								ulp_onexit_displayed = true;
							}
							if (ulp_active_window_id == ulp_onscroll_popup || (ulp_active_campaign == ulp_onscroll_popup && ulp_onscroll_popup != "") || (ulp_onexit_limits == "on" && ulp_onscroll_popup != "")) {
								ulp_write_cookie("ulp-onscroll-"+ulp_onscroll_popup, ulp_cookie_value, cookie_lifetime);
								ulp_onscroll_displayed = true;
							}
							if (ulp_active_window_id == ulp_onidle_popup || (ulp_active_campaign == ulp_onidle_popup && ulp_onidle_popup != "") || (ulp_onexit_limits == "on" && ulp_onidle_popup != "")) {
								ulp_write_cookie("ulp-onidle-"+ulp_onidle_popup, ulp_cookie_value, cookie_lifetime);
								ulp_onidle_displayed = true;
							}
							//ulp_write_cookie("ulp-inline-"+ulp_active_window_id, ulp_cookie_value, cookie_lifetime);
						}
						ulp_track(ulp_active_window_id, "layered-popup", "share-"+source, "");
						_ulp_open(ulp_active_window_id, false, false);
						var close_delay = 0;
						if (data.close_delay) close_delay = data.close_delay;
						var redirect_url = data.return_url;
						setTimeout(function() {
							if (redirect_url.length > 0) location.href = redirect_url;
							else {
								ulp_subscribing = false;
								ulp_self_close();
							}
						}, close_delay);
					} else {
						ulp_subscribing = false;
						ulp_self_close();
					}
				} catch(error) {
					ulp_subscribing = false;
					ulp_self_close();
				}
			});
	}
	return false;
}
function ulp_social_google_plusone(plusone) {
	if (plusone.state == "on") {
		ulp_share('google-plusone');
	}
}
function ulp_social_linkedin_share() {
	ulp_share('linkedin-share');
}
function ulp_close_forever(cookie_lifetime) {
	if (typeof cookie_lifetime === "undefined") cookie_lifetime = 180;
	if (ulp_active_window_id == ulp_onload_popup || (ulp_active_campaign == ulp_onload_popup && ulp_onload_popup != "") || (ulp_onexit_limits == "on" && ulp_onload_popup != "")) {
		ulp_write_cookie("ulp-onload-"+ulp_onload_popup, ulp_cookie_value, cookie_lifetime);
		ulp_onload_displayed = true;
	}
	if (ulp_active_window_id == ulp_onexit_popup || (ulp_active_campaign == ulp_onexit_popup && ulp_onexit_popup != "") || (ulp_onexit_limits == "on" && ulp_onexit_popup != "")) {
		ulp_write_cookie("ulp-onexit-"+ulp_onexit_popup, ulp_cookie_value, cookie_lifetime);
		ulp_onexit_displayed = true;
	}
	if (ulp_active_window_id == ulp_onscroll_popup || (ulp_active_campaign == ulp_onscroll_popup && ulp_onscroll_popup != "") || (ulp_onexit_limits == "on" && ulp_onscroll_popup != "")) {
		ulp_write_cookie("ulp-onscroll-"+ulp_onscroll_popup, ulp_cookie_value, cookie_lifetime);
		ulp_onscroll_displayed = true;
	}
	if (ulp_active_window_id == ulp_onidle_popup || (ulp_active_campaign == ulp_onidle_popup && ulp_onidle_popup != "") || (ulp_onexit_limits == "on" && ulp_onidle_popup != "")) {
		ulp_write_cookie("ulp-onidle-"+ulp_onidle_popup, ulp_cookie_value, cookie_lifetime);
		ulp_onidle_displayed = true;
	}
	ulp_self_close();
	return false;
}
function ulp_clear_form(str_id) {
	jQuery("#ulp-"+str_id).find(".ulp-input-error").removeClass("ulp-input-error");
	jQuery("#ulp-"+str_id).find('input[type=text], input[type=password], input[type=email], textarea').val("");
}
function ulp_recaptcha_loaded() {
	var id, theme, widget_id;
	while (ulp_recaptcha_queue.length > 0) {
		id = ulp_recaptcha_queue.pop();
		theme = jQuery("#"+id).attr("data-theme");
		if (!theme) theme = 'light';
		widget_id = grecaptcha.render(id, {"sitekey" : ulp_recaptcha_public_key, "theme" : theme});
		jQuery("#"+id).attr("data-widget", widget_id);
	}
}