/**
 * Jadu CMP Datagrid
 */
define([
  'store-js',
  'jquery'
], function(store) {

  'use strict';

  (function(defaults, $, window, document, undefined) {

		$.extend({
			// Function to change the default properties of the plugin
			// Usage:
			// jQuery.pluginSetup({property:'Custom value'});
			pluginSetup : function (options) {

				return $.extend(defaults, options);

			}

		}).fn.extend({
			// Usage:
			// jQuery(selector).pluginName({property:'value'});
			datagrid : function (options) {
				console.log('datagrid');
				options = $.extend({}, defaults, options);

				return $(this).each(function () {

					// Plugin logic
					// Calling the function:
					// jQuery(selector).pluginName(options);
					$(document).setSelectedItems();
				});

			},

			setSelectedItems : function () {
				var selectedItems = store.get(defaults.storageKey);

				$.each(selectedItems, function () {
					$('[data-id=' + this + ']').prop('checked', true);
				})

 			},

			selectItem : function () {				
				var selectedItems = store.get(defaults.storageKey),
						selected = $(this).data('id'),
						found = $.inArray(selected, selectedItems);

				if (typeof selectedItems === "undefined") {
					var selectedItems = [];
				}
				
				if ($(this).is(':checked')) {
					if (found < 0) {
						selectedItems.push(selected);
					}
				} else {
					if (found >= 0) {
						selectedItems.splice(found, 1);
					}
				}

				if (store.enabled) {
					store.set(defaults.storageKey, selectedItems);
				}

			},

			selectAll : function () {
				var checked = false;

				if ($(this).is(':checked')) {
					checked = true;	
				}

				$(defaults.selector).prop('checked', checked);
			}

		});
	})({
		selector : '[data-id]',
		storageKey : 'datagrid-selected'
	}, jQuery, window, document);

	$(document)
		.on('click', '[data-action=select]', function (e) {
			$(this).selectItem();
		})
		.on('click', '[data-action=select-all]', function (e) {
			$(this).selectAll();
		});

});