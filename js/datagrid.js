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
        
        var _this = $(this);

        options = $.extend({}, defaults, options);

        return _this.each(function () {

          // set the state of the checkboxes currently visible in the datagrid
          _this.setSelectedItems();

        });
      },

      getSelectedItems: function () {
        
        var _this = $(this),
            datagrid = _this.closest(defaults.datagridSelector),
            datagridId = datagrid.attr('id');

        // retrieve our saved values from localstorage
        if (store.enabled) {
          return store.get(defaults.storageKey + datagridId);
        }

        return false;
      },

      /**
       * check the selected items currently saved in localstorage and set their
       * respective checkbox states
       */
      setSelectedItems: function () {

        var _this = $(this),
            datagrid = _this.closest(defaults.datagridSelector),
            selectedItems = _this.getSelectedItems();

        // loop over the IDs saved in localstorage and check them
        $.each(selectedItems, function () {
          $('[data-id=' + this + ']', datagrid).prop('checked', true);
        });

        _this.checkIndeterminate();
      },

      /**
       * select an individual datagrid item
       */
      selectItem: function () {

        var _this = $(this),
            datagridId = _this.closest(defaults.datagridSelector).attr('id'),
            selected = _this.data('id');
        
        _this.updateSelectedItems(selected);
        _this.checkIndeterminate();
      },

      /**
       * select all datagrid items on the currently visible page
       */
      selectAll: function () {

        var _this = $(this),
            checked = false,
            datagrid = _this.closest(defaults.datagridSelector),
            checkboxes = $(defaults.selector, datagrid);

        if (_this.is(':checked')) {
          checked = true;
        }

        checkboxes.prop('checked', checked);

        $.each(checkboxes, function() {
          var _this = $(this),
              selected = _this.data('id')

          _this.updateSelectedItems(selected);
        });
      },

      /**
       * add or remove the selected ID from localstorage based on it's checked
       * state
       */
      updateSelectedItems: function (selected) {

        var _this = $(this),
            datagrid = _this.closest(defaults.datagridSelector),
            datagridId = datagrid.attr('id'),
            selectedItems = _this.getSelectedItems(),
            found = $.inArray(selected, selectedItems);

        // start a collection, if we don't have anything in localstorage
        if (typeof selectedItems === "undefined") {
          selectedItems = [];
        }

        if (_this.is(':checked')) {
          if (found < 0) {
            selectedItems.push(selected);
          }
        } else {
          if (found >= 0) {
            selectedItems.splice(found, 1);
          }
        }

        // save to localstorage
        if (store.enabled) {
          store.set(defaults.storageKey + datagridId, selectedItems);
          return true;
        }

        return false;
      },

      /**
       * if some, but not all items are selected, this will set the 'select all'
       * checkbox to the indeterminate state [-]
       */
      checkIndeterminate: function () {

        var _this = $(this),
            state = false,
            datagrid = _this.closest(defaults.datagridSelector),
            selectedItems = _this.getSelectedItems();

        if (selectedItems.length) {
          state = true;
        }

        $(defaults.selectAllHandler, datagrid).prop('indeterminate', state);
      }

    });

  })({
    datagridSelector : '.is-active .table--datagrid',
    missingDatagridIdMessage : 'Datagrid state cannot be saved becase no ID has been defined',
    missingCheckboxIdMessage : 'Checkbox state cannot be saved because of a missing data-id attribute',
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