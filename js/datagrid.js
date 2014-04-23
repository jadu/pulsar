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

      /**
       * check the selected items currently saved in localstorage and set their
       * respective checkbox states
       */
      setSelectedItems: function () {

        var _this = $(this),
            datagrid = _this.closest(defaults.datagridSelector),
            datagridId = datagrid.attr('id'),
            selectedItems = store.get(defaults.storageKey + datagridId);

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

        // don't go any further if the datagrid doesn't have an ID
        if (!datagridId) {
          $.error(defaults.missingDatagridIdMessage);
          return false;
        }

        // if selected item doesn't have a data-id, we can't save it
        if (!selected) {
          $.error(defaults.missingCheckboxIdMessage);
          return false;
        }

        // retrieve our saved values from localstorage
        if (store.enabled) {
          var selectedItems = store.get(defaults.storageKey + datagridId);
        }

        // start a collection, if we don't have anything in localstorage
        if (typeof selectedItems === "undefined") {
          var selectedItems = [];
        }
        
        _this.updateSelectedItems(selected, selectedItems);

        // save to localstorage
        if (store.enabled) {
          store.set(defaults.storageKey + datagridId, selectedItems);
        }

        _this.checkIndeterminate();
        _this.badgeActionsButton();
      },

      /**
       * select all datagrid items on the currently visible page
       */
      selectAll: function () {

        var _this = $(this),
            checked = false,
            datagrid = _this.closest(defaults.datagridSelector),
            datagridId = datagrid.attr('id'),
            checkboxes = $(defaults.selector, datagrid);

        // don't go any further if the datagrid doesn't have an ID
        if (!datagridId) {
          $.error(defaults.missingDatagridIdMessage);
          return false;
        }

        // retrieve our saved values from localstorage
        if (store.enabled) {
          var selectedItems = store.get(defaults.storageKey + datagridId);
        }

        // start a collection, if we don't have anything in localstorage
        if (typeof selectedItems === "undefined") {
          var selectedItems = [];
        }

        if (_this.is(':checked')) {
          checked = true;
        }

        checkboxes.prop('checked', checked);

        $.each(checkboxes, function() {
          var _this = $(this),
              selected = _this.data('id')

          _this.updateSelectedItems(selected, selectedItems);
        });
        
        if (store.enabled) {
          store.set(defaults.storageKey + datagridId, selectedItems);
        }

      },

      /**
       * add or remove the selected ID from localstorage based on it's checked
       * state
       */
      updateSelectedItems: function (selected, selectedItems) {

        var _this = $(this),
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

        return selectedItems;
      },

      /**
       * if some, but not all items are selected, this will set the 'select all'
       * checkbox to the indeterminate state [-]
       */
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
        //console.log($('.actions-menu'));
      }

    });
  })({
    datagridSelector : '.table--datagrid',
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