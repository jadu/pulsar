/**
 * Jadu CMP Datagrid
 */
define([
  'store-js',
  'jquery'
], function(store) {

  'use strict';

  (function (defaults, $, window, document, undefined) {

		$.extend({

			pluginSetup: function (options) {
				return $.extend(defaults, options);
			}

		}).fn.extend({

			datagrid: function (options) {
				
				options = $.extend({}, defaults, options);

				return $(this).each(function () {

					$(this).setSelectedItems();

				});
			},

			setSelectedItems: function () {

				var _this = $(this),
						datagrid = _this.closest(defaults.datagridSelector),
						datagridId = datagrid.attr('id'),
						selectedItems = store.get(defaults.storageKey + datagridId);

				$.each(selectedItems, function () {
					$('[data-id=' + this + ']', datagrid).prop('checked', true);
				});

				$(this).checkIndeterminate();
 			},

			selectItem: function () {

				var _this = $(this),
						selected = _this.data('id'),
						datagridId = _this.closest(defaults.datagridSelector).attr('id'),
						selectedItems = store.get(defaults.storageKey + datagridId),
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
					store.set(defaults.storageKey + datagridId, selectedItems);
				}

				$(this).checkIndeterminate();
				$(this).badgeActionsButton();
			},

			selectAll: function () {

				var _this = $(this),
						checked = false,
						datagrid = _this.closest(defaults.datagridSelector),
						datagridId = datagrid.attr('id'),
						selectedItems = store.get(defaults.storageKey + datagridId),
						checkboxes = $(defaults.selector, datagrid);

				if (typeof selectedItems === "undefined") {
					var selectedItems = [];
				}

				if (_this.is(':checked')) {
					checked = true;
				}

				checkboxes.prop('checked', checked);

				$.each(checkboxes, function() {

					var _this = $(this),
							selected = _this.data('id'),
							found = $.inArray(selected, selectedItems);

					if (_this.is(':checked')) {
						if (found < 0) {
							selectedItems.push(selected);
						}
					} else {
						if (found >= 0) {
							selectedItems.splice(found, 1);
						}
					}

				});
				
				if (store.enabled) {
					store.set(defaults.storageKey + datagridId, selectedItems);
				}

			},

			checkIndeterminate: function () {

				var _this = $(this),
						state = false,
						datagrid = _this.closest(defaults.datagridSelector),
						datagridId = datagrid.attr('id'),
						selectedItems = store.get(defaults.storageKey + datagridId);

				if (selectedItems.length > 0) {
					state = true;
				}

				$(defaults.selectAllHandler, datagrid).prop('indeterminate', state);

			},

			badgeActionsButton: function () {
				console.log($('.actions-menu'));
			}

		});
	})({
		datagridSelector : '.table--datagrid',
		selector : '[data-id]',
		selectAllHandler : '[data-action=select-all]',
		storageKey : 'datagrid-'
	}, jQuery, window, document);

	$(document)
		.on('click', '[data-action=select]', function (e) {
			$(this).selectItem();
		})
		.on('click', '[data-action=select-all]', function (e) {
			$(this).selectAll();
		});

});