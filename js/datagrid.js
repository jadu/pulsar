/**
 * Pulsar-UI actions
 *
 * Defines the behaviour of Pulsar-UI 'actions menu'
 */
define([
    'store-js',
    'jquery'
], function(store) {

    'use strict';

    (function ($, window, document, undefined) {

        var pluginName = 'datagrid',
            defaults = {
                checkboxSelector : '[data-id]',
                datagridSelector : '.is-active .table--datagrid',
                missingDatagridIdMessage : 'Datagrid state cannot be saved becase no ID has been defined',
                missingCheckboxIdMessage : 'Checkbox state cannot be saved because of a missing data-id attribute',
                selectedCountKey : 'actions-count',
                selectAllHandler : '[data-action=select-all]',
                storageKey : 'datagrid-'
            };

        // constructor
        function Plugin (element, options) {
            this.options = $.extend( {}, defaults, options) ;

            this._defaults = defaults;
            this._name = pluginName;
            this.datagridId;
            this.element = element;
            this.selectedCount = 0;
            this.selectedItems = [];

            this.init();
        }

        // methods
        Plugin.prototype = {

            init: function () {
                var _this = this;

                this.datagridId = $(this.element).attr('id');
                this.clearSelectedItems();

                $(this.element)
                    .on('click', '[data-action=select]', function () {
                        _this.selectItem(this);
                    })
                    .on('click', '[data-action=select-all]', function () {
                        _this.selectAll(this);
                    });
            },

            getSelectedItems: function () {
                if (!store.enabled) {
                    return false;
                }

                // update cached count
                this.selectedItems = store.get(this.options.storageKey + this.datagridId);

                if (!this.selectedItems) {
                    this.selectedItems = [];
                }

                return this.selectedItems;
            },

            /**
             * check the selected items currently saved in localstorage and set their
             * respective checkbox states
             */
            setSelectedItems: function () {

                // loop over the IDs saved in localstorage and check them
                $.each(this.selectedItems, function () {
                    $('[data-id=' + this + ']').prop('checked', true);
                });

                this.checkIndeterminate();
            },

            // Remove 
            clearSelectedItems: function () {
                if (store.enabled) {
                    store.clear(this.options.selectedCountKey);
                    store.clear(this.options.storageKey + this.datagridId);
                    return true;
                }
            },

            /**
             * select an individual datagrid item
             */
            selectItem: function (element) {
                this.updateSelectedItems(element);
                this.checkIndeterminate();
            },

            /**
             * select all datagrid items on the currently visible page
             */
            selectAll: function (element) {
                var _this = this,
                    $element = $(element),
                    checked = false,
                    checkboxes = $('#' + this.datagridId + ' ' + this.options.checkboxSelector);

                if ($element.is(':checked')) {
                    checked = true;
                }

                checkboxes.prop('checked', checked);

                $.each(checkboxes, function() {
                    _this.updateSelectedItems(this);
                });
            },

            /**
            * add or remove the selected ID from localstorage based on it's checked
            * state
            */
            updateSelectedItems: function (element) {
                var $element = $(element),
                    selectedId = $element.data('id'),
                    found = $.inArray(selectedId, this.selectedItems),
                    storedSelectCount;

                if (store.enabled) {
                    storedSelectCount = store.get(this.options.selectedCountKey);

                    // only use the stored select count if we have one
                    if (typeof storedSelectCount !== 'undefined') {
                        this.selectedCount = storedSelectCount;
                    }
                }

                if ($element.is(':checked')) {
                    if (found < 0) {
                        this.selectedItems.push(selectedId);
                        this.selectedCount++;
                    }
                } else {
                    if (found >= 0) {
                        this.selectedItems.splice(found, 1);
                        if (this.selectedCount) {
                            this.selectedCount--;
                        }
                    }
                }

                if (store.enabled) {
                    store.set(this.options.storageKey + this.datagridId, this.selectedItems);
                    store.set(this.options.selectedCountKey, this.selectedCount);
                    return true;
                }

                return false;
            },

            /**
             * if some, but not all items are selected, this will set the 'select all'
             * checkbox to the indeterminate state [-]
             */
            checkIndeterminate: function () {

                var state = false;

                if (this.selectedItems.length) {
                    state = true;
                }

                $('#' + this.datagridId + ' ' + this.options.selectAllHandler).prop('indeterminate', state);
            }

        };

        $.fn[pluginName] = function (options) {
            return this.each(function () {
                if (!$.data(this, 'plugin_' + pluginName)) {
                    $.data(this, 'plugin_' + pluginName,
                    new Plugin(this, options));
                }
            });
        };

    })(jQuery, window, document);

});
