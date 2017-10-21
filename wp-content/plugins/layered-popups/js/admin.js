var ulp_new_layer_id = 0;
var ulp_active_layer = "";
var ulp_wordfence_whitelist_attempts = 0;
function ulp_reset_cookie() {
	jQuery("#ulp-reset-loading").fadeIn(350);
	var data = {action: "ulp_reset_cookie"};
	jQuery.post(ulp_ajax_handler, data, function(data) {
		jQuery("#ulp-reset-loading").fadeOut(350);
	});
	return false;
}
function ulp_save_settings() {
	jQuery(".ulp-popup-form").find("#ulp-save-loading").fadeIn(350);
	jQuery(".ulp-popup-form").find(".ulp-message").slideUp(350);
	jQuery(".ulp-popup-form").find(".ulp-button").attr("disabled", "disabled");
	jQuery.post(ulp_ajax_handler, 
		jQuery(".ulp-popup-form").serialize(),
		function(return_data) {
			//alert(return_data);
			jQuery(".ulp-popup-form").find("#ulp-save-loading").fadeOut(350);
			jQuery(".ulp-popup-form").find(".ulp-button").removeAttr("disabled");
			var data;
			try {
				var data = jQuery.parseJSON(return_data);
				var status = data.status;
				if (status == "OK") {
					location.href = data.return_url;
				} else if (status == "ERROR") {
					jQuery(".ulp-popup-form").find(".ulp-message").html(data.message);
					jQuery(".ulp-popup-form").find(".ulp-message").slideDown(350);
				} else {
					jQuery(".ulp-popup-form").find(".ulp-message").html("Service is not available.");
					jQuery(".ulp-popup-form").find(".ulp-message").slideDown(350);
				}
			} catch(error) {
				jQuery(".ulp-popup-form").find(".ulp-message").html("Service is not available.");
				jQuery(".ulp-popup-form").find(".ulp-message").slideDown(350);
			}
		}
	);
	return false;
}
function ulp_save_campaign() {
	jQuery(".ulp-campaign-form").find(".ulp-loading").fadeIn(350);
	jQuery(".ulp-campaign-form").find(".ulp-message").slideUp(350);
	jQuery(".ulp-campaign-form").find(".ulp-button").attr("disabled", "disabled");
	jQuery.post(ulp_ajax_handler, 
		jQuery(".ulp-campaign-form").serialize(),
		function(return_data) {
			//alert(return_data);
			jQuery(".ulp-campaign-form").find(".ulp-loading").fadeOut(350);
			jQuery(".ulp-campaign-form").find(".ulp-button").removeAttr("disabled");
			var data;
			try {
				var data = jQuery.parseJSON(return_data);
				var status = data.status;
				if (status == "OK") {
					location.href = data.return_url;
				} else if (status == "ERROR") {
					jQuery(".ulp-campaign-form").find(".ulp-message").html(data.message);
					jQuery(".ulp-campaign-form").find(".ulp-message").slideDown(350);
				} else {
					jQuery(".ulp-campaign-form").find(".ulp-message").html("Service is not available.");
					jQuery(".ulp-campaign-form").find(".ulp-message").slideDown(350);
				}
			} catch(error) {
				jQuery(".ulp-campaign-form").find(".ulp-message").html("Service is not available.");
				jQuery(".ulp-campaign-form").find(".ulp-message").slideDown(350);
			}
		}
	);
	return false;
}
function ulp_save_popup() {
	jQuery(".ulp-popup-form").find("#ulp-loading").fadeIn(350);
	jQuery(".ulp-popup-form").find("#ulp-message").slideUp(350);
	jQuery(".ulp-popup-form").find(".ulp-button").attr("disabled", "disabled");
	ulp_neo_hide_layer_details();
	var layers = "";
	jQuery("#ulp-layers-list li").each(function(){
		var layer_id = jQuery(this).attr("id");
		layer_id = layer_id.replace("ulp-layer-", "");
		if (layers != "") layers = layers + ",";
		layers = layers + layer_id;
	});
	jQuery("#ulp_layers").val(layers);
	var postdata;
	if (ulp_post_method && ulp_post_method == "string") {
		postdata = {"ulp_postdata":jQuery(".ulp-popup-form").serialize(), "action":"ulp_save_popup"};
	} else postdata = jQuery(".ulp-popup-form").serialize();
	jQuery.ajax({
		type	: "POST",
		url		: ulp_ajax_handler, 
		data	: postdata,
		success	: function(return_data) {
			jQuery(".ulp-popup-form").find("#ulp-loading").fadeOut(350);
			jQuery(".ulp-popup-form").find(".ulp-button").removeAttr("disabled");
			var data;
			try {
				var data = jQuery.parseJSON(return_data);
				var status = data.status;
				if (status == "OK") {
					location.href = data.return_url;
				} else if (status == "ERROR") {
					jQuery(".ulp-popup-form").find("#ulp-message").html(data.message);
					jQuery(".ulp-popup-form").find("#ulp-message").slideDown(350);
				} else {
					jQuery(".ulp-popup-form").find("#ulp-message").html("Service is not available.");
					jQuery(".ulp-popup-form").find("#ulp-message").slideDown(350);
				}
			} catch(error) {
				jQuery(".ulp-popup-form").find("#ulp-message").html("Service is not available.");
				jQuery(".ulp-popup-form").find("#ulp-message").slideDown(350);
			}
		},
		error	: function(XMLHttpRequest, textStatus, errorThrown) {
			jQuery(".ulp-popup-form").find("#ulp-loading").fadeOut(350);
			jQuery(".ulp-popup-form").find(".ulp-button").removeAttr("disabled");
			var response_text = XMLHttpRequest.responseText;
			if (response_text.indexOf("Wordfence") >= 0) {
				if (ulp_wordfence_whitelist_attempts > 0) jQuery(".ulp-popup-form").find("#ulp-message").html("Seems applying changes not finished yet or we couldn't automatically whitelist your IP-address. You can do it manually on <a href='admin.php?page=WordfenceSecOpt' target='_blank'>Wordfence Options</a> page or disable XSS rule on <a href='admin.php?page=WordfenceWAF' target='_blank'>Wordfence Web Application Firewall</a> page.");
				else jQuery(".ulp-popup-form").find("#ulp-message").html("Seems we have false positive from Wordfence Web Application Firewall while trying to save the popup. To avoid this problem in the future, please whitelist your IP-address or disable XSS rule on <a href='admin.php?page=WordfenceWAF' target='_blank'>Wordfence Web Application Firewall</a> page.<br /><a href=\'#\' id=\'ulp-wordfence-whitelist-ip-button\' class=\'button-secondary ulp-button ulp-message-button\' onclick=\'return ulp_wordfence_whitelist_ip();\'>Whitelist My IP-address and Save Popup</a>");
				jQuery(".ulp-popup-form").find("#ulp-message").slideDown(350);
			}
		}
	});
	return false;
}
function ulp_wordfence_whitelist_ip() {
	var data = {action: "ulp_wordfence_whitelist_ip"};
	jQuery("#ulp-wordfence-whitelist-ip-button").attr("disabled", "disabled");
	jQuery("#ulp-wordfence-whitelist-ip-button").html("Whitelisting your IP-address...");
	jQuery.post(ulp_ajax_handler, data, function(data) {
		if (data == "OK") {
			var ulp_wordfence_wait_counter = 30;
			var ulp_interval;
			jQuery(".ulp-popup-form").find("#ulp-message").html("Applying changes. It takes some time. Please wait <span id=\'ulp-wordfence-timer-value\'>"+ulp_wordfence_wait_counter+"</span> seconds.");
			var ulp_wordfence_timer_function = function () {
				ulp_wordfence_wait_counter--;
				if (ulp_wordfence_wait_counter > 0) {
					jQuery("#ulp-wordfence-timer-value").html(ulp_wordfence_wait_counter);
				} else {
					clearInterval(ulp_interval);
					ulp_wordfence_whitelist_attempts++;
					jQuery(".ulp-popup-form").find("#ulp-message").slideUp(350);
					ulp_save_popup();
				}
			}
			ulp_interval = setInterval(function() {ulp_wordfence_timer_function()}, 1000);
		} else {
			jQuery(".ulp-popup-form").find("#ulp-message").html("Unfortunately, we couldn't whitelist your IP automatically, so you have to do it manually on <a href='admin.php?page=WordfenceSecOpt' target='_blank'>Wordfence Options</a> page.");
		}
	});
	return false;
}

function ulp_save_ext_settings() {
	jQuery(".ulp-popup-form").find(".ulp-loading").fadeIn(350);
	jQuery(".ulp-popup-form").find(".ulp-message").slideUp(350);
	jQuery(".ulp-popup-form").find(".ulp-button").attr("disabled", "disabled");
	jQuery.post(ulp_ajax_handler, 
		jQuery(".ulp-popup-form").serialize(),
		function(return_data) {
			//alert(return_data);
			jQuery(".ulp-popup-form").find(".ulp-loading").fadeOut(350);
			jQuery(".ulp-popup-form").find(".ulp-button").removeAttr("disabled");
			var data;
			try {
				var data = jQuery.parseJSON(return_data);
				var status = data.status;
				if (status == "OK") {
					location.href = data.return_url;
				} else if (status == "ERROR") {
					jQuery(".ulp-popup-form").find(".ulp-message").html(data.message);
					jQuery(".ulp-popup-form").find(".ulp-message").slideDown(350);
				} else {
					jQuery(".ulp-popup-form").find(".ulp-message").html("Service is not available.");
					jQuery(".ulp-popup-form").find(".ulp-message").slideDown(350);
				}
			} catch(error) {
				jQuery(".ulp-popup-form").find(".ulp-message").html("Service is not available.");
				jQuery(".ulp-popup-form").find(".ulp-message").slideDown(350);
			}
		}
	);
	return false;
}
function ulp_submitOperation() {
	var answer = confirm("Do you really want to continue?")
	if (answer) return true;
	else return false;
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
function ulp_2hex(c) {
	var hex = c.toString(16);
	return hex.length == 1 ? "0" + hex : hex;
}
function ulp_rgb2hex(r, g, b) {
	return "#" + ulp_2hex(r) + ulp_2hex(g) + ulp_2hex(b);
}
function ulp_hex2rgb(hex) {
	var shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
	hex = hex.replace(shorthandRegex, function(m, r, g, b) {
		return r + r + g + g + b + b;
	});
	var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
	return result ? {
		r: parseInt(result[1], 16),
		g: parseInt(result[2], 16),
		b: parseInt(result[3], 16)
	} : false;
}
function ulp_inarray(needle, haystack) {
	var length = haystack.length;
	for(var i = 0; i < length; i++) {
		if(haystack[i] == needle) return true;
	}
	return false;
}
function ulp_self_close() {
	return false;
}
function ulp_seticon(object, prefix) {
	var icon = jQuery(object).children().attr("class");
	icon = icon.replace("fa ", "");
	jQuery("#"+prefix).val(icon);
	jQuery("#"+prefix+"-image i").removeClass();
	jQuery("#"+prefix+"-image i").addClass("fa "+icon);
	jQuery("#"+prefix+"-set .ulp-icon-active").removeClass("ulp-icon-active");
	jQuery(object).addClass("ulp-icon-active");
	jQuery("#"+prefix+"-set").slideUp(300);
	ulp_build_preview();
}
function ulp_customfields_addfield(field_type) {
	jQuery("#ulp-customfields-loading").fadeIn(350);
	jQuery("#ulp-customfields-message").slideUp(350);
	jQuery("#ulp-customfields-selector").toggle(200);
	jQuery("#ulp-customfields-selector").attr("disabled", "disabled");
	jQuery.post(ulp_ajax_handler, 
		"action=ulp-customfields-addfield&ulp_type="+field_type,
		function(return_data) {
			//alert(return_data);
			jQuery("#ulp-customfields-loading").fadeOut(350);
			jQuery("#ulp-customfields-selector").removeAttr("disabled");
			var data;
			try {
				var data = jQuery.parseJSON(return_data);
				var status = data.status;
				if (status == "OK") {
					jQuery("#ulp-customfields").append(data.html);
					jQuery("#ulp-customfields-field-"+data.id).slideDown(350);
				} else if (status == "ERROR") {
					jQuery("#ulp-customfields-message").html(data.message);
					jQuery("#ulp-customfields-message").slideDown(350);
				} else {
					jQuery("#ulp-customfields-message").html("Service is not available.");
					jQuery("#ulp-customfields-message").slideDown(350);
				}
			} catch(error) {
				jQuery("#ulp-customfields-message").html("Service is not available.");
				jQuery("#ulp-customfields-message").slideDown(350);
			}
		}
	);
	return false;
}
function ulp_delete_custom_field(field_id) {
	jQuery("#ulp-customfields-field-"+field_id).slideUp(350, function() {
		jQuery("#ulp-customfields-field-"+field_id).remove();
		ulp_build_preview();
	});
	return false;
}
function ulp_escape_html(text) {
	var map = {
		'&': '&amp;',
		'<': '&lt;',
		'>': '&gt;',
		'"': '&quot;',
		"'": '&#039;'
	};
	return text.replace(/[&<>"']/g, function(m) { return map[m]; });
}
function ulp_input_options_focus(object, post) {
	var base_id = jQuery(object).attr("id");
	var action = jQuery(object).attr("data-action");
	if (jQuery("#"+base_id+"-items").hasClass("ulp-visible")) {
	} else {
		jQuery("#"+base_id+"-items").find(".ulp-options-list-spinner").fadeIn(300);
		jQuery("#"+base_id+"-items").find(".ulp-options-list-data").html("");
		jQuery("#"+base_id+"-items").removeClass("ulp-vertical-scroll");
		jQuery("#"+base_id+"-items").fadeIn(300);
		jQuery("#"+base_id+"-items").addClass("ulp-visible");
		jQuery.post(ulp_ajax_handler, post, function(return_data) {
			jQuery("#"+base_id+"-items").find(".ulp-options-list-spinner").hide();
			try {
				var data = jQuery.parseJSON(return_data);
				var status = data.status;
				if (status == "OK") {
					jQuery("#"+base_id+"-items").find(".ulp-options-list-data").html(data.html);
					if (data.items > 4) jQuery("#"+base_id+"-items").addClass("ulp-vertical-scroll");
				} else {
					jQuery("#"+base_id+"-items").find(".ulp-options-list-data").html("<div style='text-align: center;'><strong>Internal error! Can not connect to server.</strong></div>");
				}
			} catch(error) {
				jQuery("#"+base_id+"-items").find(".ulp-options-list-data").html("<div style='text-align: center;'><strong>Internal error! Can not connect to server.</strong></div>");
			}
		});
	}
}
function ulp_input_options_blur(object) {
	var base_id = jQuery(object).attr("id");
	jQuery("#"+base_id+"-items").removeClass("ulp-visible");
	jQuery("#"+base_id+"-items").fadeOut(300);
}
function ulp_input_options_selected(object) {
	var item_id = jQuery(object).attr("data-id");
	var item_title = jQuery(object).attr("data-title");
	var base_id = jQuery(object).parentsUntil(".ulp-options-list").parent().attr("id");
	base_id = base_id.replace("-items", "");
	jQuery("#"+base_id).val(item_title);
	jQuery("#"+base_id+"-id").val(item_id);
	return false;
}
function ulp_neo_toggle_layers() {
	if (jQuery("#ulp-toggle-layers-icon").hasClass("fa-minus-square")) {
		jQuery("#ulp-toggle-layers-icon").removeClass("fa-minus-square");
		jQuery("#ulp-toggle-layers-icon").addClass("fa-plus-square");
		jQuery("#ulp-layers-list").slideUp(200);
	} else {
		jQuery("#ulp-toggle-layers-icon").removeClass("fa-plus-square");
		jQuery("#ulp-toggle-layers-icon").addClass("fa-minus-square");
		jQuery("#ulp-layers-list").slideDown(200);
	}
	return false;
}
function ulp_neo_toggle_constructor_settings() {
	jQuery("#ulp-layers-constructor-settings").slideToggle(200);
	return false;
}
function ulp_neo_hide_layer_details() {
	jQuery("body").animate({"left" : "0px"});
	jQuery("#ulp-layer-details").animate({"right" : "-400px"});
	return false;
}
function ulp_neo_add_layer(params) {
	ulp_new_layer_id++;
	var layer_id = "new-"+ulp_new_layer_id;
	jQuery.each(ulp_default_layer_options, function(key, value) {
		jQuery("#ulp-layers").append('<input type="hidden" id="ulp_layer_'+layer_id+'_'+key+'" name="ulp_layer_'+layer_id+'_'+key+'">');
		if (params.hasOwnProperty(key)) value = params[key];
		jQuery("#ulp_layer_"+layer_id+"_"+key).val(value);
	});
	jQuery("#ulp-layers-list").append('<li id="ulp-layer-'+layer_id+'"><i class="fa fa-arrows-v ulp-sortable-icon"></i><a href="#" class="ulp-layer-action-icon ulp-layer-action-delete" title="Delete the layer"><i class="fa fa-close"></i></a><a href="#" class="ulp-layer-action-icon ulp-layer-action-copy" title="Duplicate the layer"><i class="fa fa-files-o"></i></a><label></label><span></span></li>');
	if (params.hasOwnProperty("title")) jQuery("#ulp-layer-"+layer_id+" label").html(params.title);
	else jQuery("#ulp-layer-"+layer_id+" label").html(ulp_default_layer_options.title);
	if (params.hasOwnProperty("content")) {
		if (params.content == "") jQuery("#ulp-layer-"+layer_id+" span").html("No content...");
		else jQuery("#ulp-layer-"+layer_id+" span").html(ulp_escape_html(params.content));
	} else jQuery("#ulp-layer-"+layer_id+" span").html("No content...");
	jQuery("#ulp-layer-"+layer_id+" .ulp-layer-action-delete").click(function(event){
		event.stopPropagation();
		ulp_neo_delete_layer(this);
		return false;
	});
	jQuery("#ulp-layer-"+layer_id+" .ulp-layer-action-copy").click(function(event){
		event.stopPropagation();
		ulp_neo_copy_layer(this);
		return false;
	});
	jQuery("#ulp-layer-"+layer_id).click(function(){
		ulp_neo_edit_layer(layer_id, true);
	});
	ulp_neo_edit_layer(layer_id, true);
	ulp_build_preview();
	return false;
}
function ulp_neo_edit_layer(layer_id, open_details) {
	jQuery(".ulp-layers-list-item-selected").removeClass("ulp-layers-list-item-selected");
	jQuery("#ulp-layer-"+layer_id).addClass("ulp-layers-list-item-selected");
	ulp_neo_select_preview_layer(layer_id);
	jQuery.each(ulp_default_layer_options, function(key, value) {
		if (key == "scrollbar" || key == "confirmation_layer" || key == "inline_disable" || key == "background_gradient" || key == "box_shadow" || key == "box_shadow_inset") {
			if (jQuery("[name=\'ulp_layer_"+layer_id+"_"+key+"\']").val() == "on") {
				jQuery("[data-id=\'ulp_layer_"+key+"\']").removeClass("fa-square-o");
				jQuery("[data-id=\'ulp_layer_"+key+"\']").addClass("fa-check-square-o");
				if (key == "background_gradient") jQuery(".ulp-background-gradient-only").show();
				if (key == "box_shadow") jQuery(".ulp-box-shadow-only").show();
			} else {
				jQuery("[data-id=\'ulp_layer_"+key+"\']").removeClass("fa-check-square-o");
				jQuery("[data-id=\'ulp_layer_"+key+"\']").addClass("fa-square-o");
				if (key == "background_gradient") jQuery(".ulp-background-gradient-only").hide();
				if (key == "box_shadow") jQuery(".ulp-box-shadow-only").hide();
			}
		}
		jQuery("[name=\'ulp_layer_"+key+"\']").val(jQuery("[name=\'ulp_layer_"+layer_id+"_"+key+"\']").val());
	});
	ulp_active_layer = layer_id;
	if (open_details) {
		jQuery("body").animate({"left" : "-400px"});
		jQuery("#ulp-layer-details").animate({"right" : "0px"});
	}
	return false;
}
function ulp_neo_select_preview_layer(layer_id) {
	var width, height, top, left;
	jQuery(".ulp-layer-position").remove();
	jQuery(".ulp-layer-size").remove();
	jQuery(".ulp-preview-layer-selected").removeClass("ulp-preview-layer-selected");
	jQuery("#ulp-preview-layer-"+layer_id).append("<div class=\'ulp-layer-position\'></div>");
	jQuery("#ulp-preview-layer-"+layer_id).append("<div class=\'ulp-layer-size\'></div>");
	jQuery("#ulp-preview-layer-"+layer_id).addClass("ulp-preview-layer-selected");
	top = jQuery("#ulp_layer_"+layer_id+"_top").val();
	left = jQuery("#ulp_layer_"+layer_id+"_left").val();
	jQuery("#ulp-preview-layer-"+layer_id).find(".ulp-layer-position").html("("+left+", "+top+")");
	width = jQuery("#ulp_layer_"+layer_id+"_width").val();
	height = jQuery("#ulp_layer_"+layer_id+"_height").val();
	if (!isFinite(width) || isNaN(parseFloat(width))) width = "auto";
	if (!isFinite(height) || isNaN(parseFloat(height))) height = "auto";
	jQuery("#ulp-preview-layer-"+layer_id).find(".ulp-layer-size").html(""+width+" x "+height+"");
	return false;
}
function ulp_neo_sync_layer_details() {
	if (ulp_active_layer != "") {
		jQuery.each(ulp_default_layer_options, function(key, value) {
			jQuery("[name=\'ulp_layer_"+ulp_active_layer+"_"+key+"\']").val(jQuery("[name=\'ulp_layer_"+key+"\']").val());
		});
	}
}
function ulp_neo_delete_layer(object) {
	var answer = confirm("Do you really want to delete this layer?")
	if (answer) {
		var layer = jQuery(object).parent();
		var layer_id = jQuery(layer).attr("id");
		layer_id = layer_id.replace("ulp-layer-", "");
		jQuery(layer).slideUp(300, function(){
			jQuery(layer).remove();
			if (ulp_active_layer == layer_id) {
				ulp_active_layer = "";
				ulp_neo_hide_layer_details();
			}
			jQuery.each(ulp_default_layer_options, function(key, value) {
				jQuery("[name=\'ulp_layer_"+layer_id+"_"+key+"\']").remove();
			});
			ulp_build_preview();
		});
	}
}
function ulp_neo_copy_layer(object) {
	var answer = confirm("Do you really want to duplicate this layer?")
	if (answer) {
		var layer = jQuery(object).parent();
		var layer_id = jQuery(layer).attr("id");
		layer_id = layer_id.replace("ulp-layer-", "");
		ulp_new_layer_id++;
		var new_layer_id = "new-"+ulp_new_layer_id;
		jQuery.each(ulp_default_layer_options, function(key, value) {
			jQuery("#ulp-layers").append('<input type="hidden" id="ulp_layer_'+new_layer_id+'_'+key+'" name="ulp_layer_'+new_layer_id+'_'+key+'">');
			jQuery("#ulp_layer_"+new_layer_id+"_"+key).val(jQuery("#ulp_layer_"+layer_id+"_"+key).val());
		});
		jQuery("#ulp-layers-list").append('<li id="ulp-layer-'+new_layer_id+'"><i class="fa fa-arrows-v ulp-sortable-icon"></i><a href="#" class="ulp-layer-action-icon ulp-layer-action-delete" title="Delete the layer"><i class="fa fa-close"></i></a><a href="#" class="ulp-layer-action-icon ulp-layer-action-copy" title="Duplicate the layer"><i class="fa fa-files-o"></i></a><label></label><span></span></li>');
		jQuery("#ulp-layer-"+new_layer_id+" label").html(jQuery("#ulp-layer-"+layer_id+" label").html());
		jQuery("#ulp-layer-"+new_layer_id+" span").html(jQuery("#ulp-layer-"+layer_id+" span").html());
		jQuery("#ulp-layer-"+new_layer_id+" .ulp-layer-action-delete").click(function(event){
			event.stopPropagation();
			ulp_neo_delete_layer(this);
			return false;
		});
		jQuery("#ulp-layer-"+new_layer_id+" .ulp-layer-action-copy").click(function(event){
			event.stopPropagation();
			ulp_neo_copy_layer(this);
			return false;
		});
		jQuery("#ulp-layer-"+new_layer_id).click(function(){
			ulp_neo_edit_layer(new_layer_id, true);
		});
		ulp_build_preview();
	}
}
function ulp_helper_close() {
	jQuery("#ulp-helper-overlay").fadeOut(300);
	jQuery(".ulp-helper-window").fadeOut(300);
	return false;
}
function ulp_helper2_close() {
	jQuery("#ulp-helper2-overlay").fadeOut(300);
	jQuery(".ulp-helper2-window").fadeOut(300);
	return false;
}
function ulp_helper3_close() {
	jQuery("#ulp-helper3-overlay").fadeOut(300);
	jQuery(".ulp-helper3-window").fadeOut(300);
	return false;
}
function ulp_helper_add_layer() {
	jQuery("#ulp-helper-overlay").fadeIn(300);
	if (typeof ulpext_helper_add_layer == 'function') {
		ulpext_helper_add_layer();
	}
	jQuery(".ulp-helper-add-layer-item").show();
	jQuery(".ulp-helper-add-layer-item").each(function(){
		var item = this;
		var unique = jQuery(this).attr("data-unique");
		if (unique) {
			jQuery("#ulp-layers-list li").each(function(){
				var layer_id = jQuery(this).attr("id").replace("ulp-layer-", "");
				var content = jQuery("#ulp_layer_"+layer_id+"_content").val();
				if (content.indexOf(unique) > -1) {
					jQuery(item).hide();
					return false;
				}
			});
		}
	});
	jQuery("#ulp-helper-add-layer-window").fadeIn(300);
	return false;
}
function ulp_helper_add_layer_process(content_type) {
	if (typeof ulpext_helper_add_layer_process == 'function') {
		var result = ulpext_helper_add_layer_process(content_type);
		if (result) return false;
	}
	switch(content_type) {
		case 'rectangle':
			ulp_helper_close();
			ulp_neo_add_layer({"title":"Rectangle","content":"","width":"200","height":"100","background_color":"#808080"});
			break;
		case 'field-name':
			ulp_helper_close();
			ulp_neo_add_layer({"title":"Name Field","content":"{subscription-name}","width":"250","height":"40"});
			break;
		case 'field-email':
			ulp_helper_close();
			ulp_neo_add_layer({"title":"E-mail Field","content":"{subscription-email}","width":"250","height":"40"});
			break;
		case 'field-phone':
			ulp_helper_close();
			ulp_neo_add_layer({"title":"Phone Field","content":"{subscription-phone}","width":"250","height":"40"});
			break;
		case 'field-message':
			ulp_helper_close();
			ulp_neo_add_layer({"title":"Message Field","content":"{subscription-message}","width":"250","height":"120"});
			break;
		case 'submit-button':
			ulp_helper_close();
			ulp_neo_add_layer({"title":"Submit Button","content":"{subscription-submit}","width":"250","height":"50","content_align":"center","font_color":"#FFF","font_size":"15"});
			break;
		default:
			var window = jQuery("#ulp-helper-window-"+content_type);
			if (window.length > 0) {
				jQuery(window).find("input, textarea").val("");
				jQuery(window).find('input[type="checkbox"]').prop("checked", false);
				jQuery("#ulp-helper2-overlay").fadeIn(300);
				jQuery(window).fadeIn(300);
				var wh = jQuery(window).height();
				if (wh > 100) {
					wh = parseInt(wh/2, 10)*2 + 2;
					jQuery(window).height(wh);
				}
			}
			break;
	}
	return false;
}
function ulp_helper_create_label() {
	var content, title;
	var label = jQuery("#ulp-helper2-label-label").val();
	var url = jQuery("#ulp-helper2-label-url").val();
	var inherited = "";
	if (jQuery("#ulp-helper2-label-inherited").is(":checked")) inherited = ' class="ulp-inherited"';
	label = label.trim();
	url = url.trim();
	if (label.length == 0) {
		jQuery("#ulp-helper3-message").html("Please enter text label.");
		jQuery("#ulp-helper3-overlay").fadeIn(300);
		jQuery("#ulp-helper-window-message").fadeIn(300);
		return false;
	}
	if (url.length == 0) {
		title = "Text Label";
		content = label;
	} else {
		title = "Link";
		content = "<a"+inherited+" href=\""+ulp_escape_html(url)+"\">"+ulp_escape_html(label)+"</a>";
	}
	ulp_helper2_close();
	ulp_helper_close();
	ulp_neo_add_layer({"title":title,"content":content});
	return false;
}
function ulp_helper_create_youtube() {
	var content, id;
	var code = jQuery("#ulp-helper2-youtube-code").val();
	var error = "";
	code = code.trim();
	if (code.length == 0) {
		error = "Please enter YouTube embed code.";
	} else {
		var rx = /^.*(?:(?:youtu\.be\/|v\/|vi\/|u\/\w\/|embed\/)|(?:(?:watch)?\?v(?:i)?=|\&v(?:i)?=))([^#\&\?]*).*/;
		id = code.match(rx);
		if (!id || !(1 in id)) error = "Can not parse YouTube URL or embed code.";
	}
	if (error.length > 0) {
		jQuery("#ulp-helper3-message").html(error);
		jQuery("#ulp-helper3-overlay").fadeIn(300);
		jQuery("#ulp-helper-window-message").fadeIn(300);
		return false;
	}
	content = "<iframe width=\"100%\" height=\"100%\" src=\"https://www.youtube.com/embed/"+id[1]+"?rel=0\" frameborder=\"0\" allowfullscreen></iframe>";
	ulp_helper2_close();
	ulp_helper_close();
	ulp_neo_add_layer({"title":"YouTube Video","content":content,"width":"720","height":"405"});
	return false;
}
function ulp_helper_create_vimeo() {
	var content, id;
	var code = jQuery("#ulp-helper2-vimeo-code").val();
	var error = "";
	code = code.trim();
	if (code.length == 0) {
		error = "Please enter YouTube embed code.";
	} else {
		var rx = /^.*(vimeo\.com\/)((channels\/[A-z]+\/)|(groups\/[A-z]+\/videos\/))?([0-9]+)/;
		id = code.match(rx);
		if (!id || !(5 in id)) error = "Can not parse Vimeo URL or embed code.";
	}
	if (error.length > 0) {
		jQuery("#ulp-helper3-message").html(error);
		jQuery("#ulp-helper3-overlay").fadeIn(300);
		jQuery("#ulp-helper-window-message").fadeIn(300);
		return false;
	}
	content = "<iframe width=\"100%\" height=\"100%\" src=\"https://player.vimeo.com/video/"+id[5]+"?color=ffffff&title=0&byline=0&portrait=0&badge=0\" frameborder=\"0\" allowfullscreen></iframe>";
	ulp_helper2_close();
	ulp_helper_close();
	ulp_neo_add_layer({"title":"Vimeo Video","content":content,"width":"720","height":"405"});
	return false;
}
function ulp_helper_create_html() {
	var code = jQuery("#ulp-helper2-html-code").val();
	code = code.trim();
	ulp_helper2_close();
	ulp_helper_close();
	ulp_neo_add_layer({"title":"Custom HTML","content":code});
	return false;
}
function ulp_helper_create_linkedbutton() {
	var content;
	var label = jQuery("#ulp-helper2-linked-button-label").val();
	var url = jQuery("#ulp-helper2-linked-button-url").val();
	var color = jQuery("#ulp-helper2-linked-button-color").val();
	label = label.trim();
	url = url.trim();
	if (label.length == 0) {
		jQuery("#ulp-helper3-message").html("Please enter button label.");
		jQuery("#ulp-helper3-overlay").fadeIn(300);
		jQuery("#ulp-helper-window-message").fadeIn(300);
		return false;
	}
	if (color.length == 0) {
		jQuery("#ulp-helper3-message").html("Please select button color.");
		jQuery("#ulp-helper3-overlay").fadeIn(300);
		jQuery("#ulp-helper-window-message").fadeIn(300);
		return false;
	}
	if (url.length == 0) url = "#";
	content = "<a href=\""+ulp_escape_html(url)+"\" class=\"ulp-link-button ulp-link-button-"+color+"\">"+ulp_escape_html(label)+"</a>";
	ulp_helper2_close();
	ulp_helper_close();
	ulp_neo_add_layer({"title":"Linked Button","content":content,"width":"250","height":"40","font_color":"#FFF","content_align":"center"});
	return false;
}
function ulp_helper_seticon(object, prefix) {
	var icon = jQuery(object).children().attr("class");
	icon = icon.replace("fa ", "");
	jQuery("#"+prefix).val(icon);
	jQuery("#"+prefix+"-set .ulp-helper-icon-active").removeClass("ulp-helper-icon-active");
	jQuery(object).addClass("ulp-helper-icon-active");
	return false;
}
function ulp_helper_create_icon() {
	var content;
	var title = jQuery("#ulp-helper2-icon-title").val();
	var url = jQuery("#ulp-helper2-icon-url").val();
	var icon = jQuery("#ulp-helper2-icon-icon").val();
	title = title.trim();
	url = url.trim();
	if (icon.length == 0) {
		jQuery("#ulp-helper3-message").html("Please select icon.");
		jQuery("#ulp-helper3-overlay").fadeIn(300);
		jQuery("#ulp-helper-window-message").fadeIn(300);
		return false;
	}
	if (url.length == 0) {
		content = "<i class=\"fa "+icon+"\"></i>";
	} else {
		if (title.length == 0) content = "<a href=\""+ulp_escape_html(url)+"\"><i class=\"fa "+icon+"\"></i></a>";
		else content = "<a href=\""+ulp_escape_html(url)+"\" title=\""+ulp_escape_html(title)+"\"><i class=\"fa "+icon+"\"></i></a>";
	}
	if (title.length == 0) title = icon;
	ulp_helper2_close();
	ulp_helper_close();
	ulp_neo_add_layer({"title":"Icon: "+title,"content":content,"font_size":"28","content_align":"center"});
	return false;
}
function ulp_helper_create_image() {
	var content;
	var title = jQuery("#ulp-helper2-image-title").val();
	var image_url = jQuery("#ulp-helper2-image-url").val();
	var url = jQuery("#ulp-helper2-image-url2").val();
	title = title.trim();
	url = url.trim();
	image_url = image_url.trim();
	if (image_url.length == 0) {
		jQuery("#ulp-helper3-message").html("Please specify image URL.");
		jQuery("#ulp-helper3-overlay").fadeIn(300);
		jQuery("#ulp-helper-window-message").fadeIn(300);
		return false;
	}
	if (jQuery("#ulp-helper2-image-type-img").is(":checked")) {
		if (url.length == 0) {
			content = "<img src=\""+ulp_escape_html(image_url)+"\" alt=\""+ulp_escape_html(title)+"\" />";
		} else {
			content = "<a href=\""+ulp_escape_html(url)+"\" title=\""+ulp_escape_html(title)+"\"><img src=\""+ulp_escape_html(image_url)+"\" alt=\""+ulp_escape_html(title)+"\" /></a>";
		}
		ulp_helper2_close();
		ulp_helper_close();
		ulp_neo_add_layer({"title":"Image","content":content,"width":"350"});
	} else {
		if (url.length != 0) {
			content = "<a class=\"ulp-inherited\" href=\""+ulp_escape_html(url)+"\" title=\""+ulp_escape_html(title)+"\">&nbsp;</a>";
		} else content = "";
		ulp_helper2_close();
		ulp_helper_close();
		ulp_neo_add_layer({"title":"Background Image","content":content,"width":"350","height":"350","background_image":image_url,"background_image_repeat":"no-repeat","background_image_size":"cover"});
	}
	return false;
}
var ulp_media_frame;
function ulp_helper_media_library_image(dest_id) {
	ulp_media_frame = wp.media({
		title: 'Select Image',
		library: {
			type: 'image'
		},
		multiple: false
	});
	ulp_media_frame.on("select", function() {
		var attachment = ulp_media_frame.state().get("selection").first();
		jQuery("#"+dest_id).val(attachment.attributes.url);
	});
	ulp_media_frame.open();
	return false;
}
function ulp_helper_change_close_type() {
	jQuery(".ulp-helper2-close-types").slideUp(300);
	var type = jQuery("#ulp-helper2-close-type").val();
	if (type == "image") jQuery("#ulp-helper2-close-type-image").slideDown(300);
	else if (type == "icon") jQuery("#ulp-helper2-close-type-icon").slideDown(300);
	return false;
}
function ulp_helper_create_close() {
	var content, onclick;
	if (jQuery("#ulp-helper2-close-action-forever").is(":checked")) onclick = "return ulp_close_forever();";
	else onclick = "return ulp_self_close();";
	var type = jQuery("#ulp-helper2-close-type").val();
	if (type == "image") {
		var image_url = jQuery("#ulp-helper2-close-image").val();
		image_url = image_url.trim();
		if (image_url.length == 0) {
			jQuery("#ulp-helper3-message").html("Please specify image URL.");
			jQuery("#ulp-helper3-overlay").fadeIn(300);
			jQuery("#ulp-helper-window-message").fadeIn(300);
			return false;
		}
		content = "<a href=\"#\" onclick=\""+onclick+"\"><img src=\""+ulp_escape_html(image_url)+"\" alt=\"\" /></a>";
		ulp_helper2_close();
		ulp_helper_close();
		ulp_neo_add_layer({"title":"Close Icon","content":content,"width":"60"});
	} else if (type == "icon") {
		var icon = jQuery("#ulp-helper2-close-icon").val();
		if (icon.length == 0) {
			jQuery("#ulp-helper3-message").html("Please select icon.");
			jQuery("#ulp-helper3-overlay").fadeIn(300);
			jQuery("#ulp-helper-window-message").fadeIn(300);
			return false;
		}
		content = "<a href=\"#\" onclick=\""+onclick+"\"><i class=\"fa "+icon+"\"></i></a>";
		ulp_helper2_close();
		ulp_helper_close();
		ulp_neo_add_layer({"title":"Close Icon","content":content,"font_size":"28","inline_disable":"on"});
	} else {
		content = "<a href=\"#\" onclick=\""+onclick+"\">×</a>";
		ulp_helper2_close();
		ulp_helper_close();
		ulp_neo_add_layer({"title":"Close Icon","content":content,"font_size":"32","inline_disable":"on"});
	}
	return false;
}
function ulp_helper_setcolor(object, prefix) {
	var color = jQuery(object).attr("data-color");
	jQuery("#"+prefix).val(color);
	jQuery("#"+prefix+"-set .ulp-helper2-color-item-selected").removeClass("ulp-helper2-color-item-selected");
	jQuery(object).addClass("ulp-helper2-color-item-selected");
	return false;
}
function ulp_helper_change_bullet_type() {
	jQuery(".ulp-helper2-bullet-types").slideUp(300);
	var type = jQuery("#ulp-helper2-bullet-type").val();
	if (type == "icon") jQuery("#ulp-helper2-bullet-type-icon").slideDown(300);
	return false;
}
function ulp_helper_create_bullet() {
	var content, li_class;
	var text = jQuery("#ulp-helper2-bullet-items").val();
	text = text.trim();
	var type = jQuery("#ulp-helper2-bullet-type").val();
	var color = jQuery("#ulp-helper2-bullet-color").val();
	if (text.length == 0) {
		jQuery("#ulp-helper3-message").html("Please specify at least one item.");
		jQuery("#ulp-helper3-overlay").fadeIn(300);
		jQuery("#ulp-helper-window-message").fadeIn(300);
		return false;
	}
	if (color.length == 0) {
		jQuery("#ulp-helper3-message").html("Please select bullet color.");
		jQuery("#ulp-helper3-overlay").fadeIn(300);
		jQuery("#ulp-helper-window-message").fadeIn(300);
		return false;
	}
	if (type == "icon") {
		var icon = jQuery("#ulp-helper2-bullet-icon").val();
		if (icon.length == 0) {
			jQuery("#ulp-helper3-message").html("Please select bullet icon.");
			jQuery("#ulp-helper3-overlay").fadeIn(300);
			jQuery("#ulp-helper-window-message").fadeIn(300);
			return false;
		}
		li_class = icon;
	} else {
		li_class = "ulp-ul-li";
	}
	var items = text.split("\n");
	content = "<ul class=\"ulp-ul ulp-ul-"+color+"\">";
	for (var i=0; i<items.length; i++) {
		items[i] = items[i].trim();
		if (items[i].length > 0) content += "<li class=\""+li_class+"\">"+ulp_escape_html(items[i])+"</li>";
	}
	content += "</ul>";
	ulp_helper2_close();
	ulp_helper_close();
	ulp_neo_add_layer({"title":"Bulleted List","content":content});
	return false;
}
function ulp_toggle_loader_settings() {
	if (jQuery("#ulp_no_preload").is(":checked")) {
		jQuery(".ulp-row-loader-settings").fadeIn(300);
	} else {
		jQuery(".ulp-row-loader-settings").fadeOut(300);
		jQuery("#ulp_preload_event_popups").prop("checked", false);
	}
}
function ulp_set_spinner(object, spinner) {
	jQuery("#ulp_ajax_spinner").val(spinner);
	jQuery(".ulp-spinner-item").removeClass("ulp-spinner-item-selected");
	jQuery(object).addClass("ulp-spinner-item-selected");
}