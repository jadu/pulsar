/**
 * Jadu CMP Actions Button
 */
define([
  'jquery'
], function() {

  'use strict';

  (function (defaults, $, window, document, undefined) {

    $.extend({

      pluginSetup: function (options) {
        return $.extend(defaults, options);
      }

    }).fn.extend({

      actionsMenu: function (options) {
        
        var _this = $(this);

        options = $.extend({}, defaults, options);

        // init actions menu
        return _this.each(function () {
          _this.updateActions();
        });

      },

      updateActions: function (count) {

        var _this = $(this);

        if (count >= 1) {
          _this.updateBadge(count);
        }

      },

      updateBadge: function (count) {

        var badge = $(defaults.badgeSelector, $(defaults.actionsMenuSelector));
        
        if (count) {

          // add the count and show the badge
          badge
            .text(count)
            .addClass(defaults.badgeActiveClass)
            .fadeIn(defaults.animationSpeed)
        } else {

          // hide the badge and empty the count
          badge.fadeOut(defaults.animationSpeed, function () {
            $(this).text('');
          });  
        }

        if (count >= 1) {
          $(defaults.disabledItemSelector).removeClass(defaults.disabledItemClass)
        } else {
          $(defaults.disabledItemSelector).addClass(defaults.disabledItemClass);
        }

      }

    });

  })({
    actionsMenuSelector : '.actions-menu',
    animationSpeed : 250,
    badgeSelector : '.badge',
    badgeActiveClass : 'badge--primary',
    disabledItemSelector : '[data-on-datagrid-item-selected=enable]',
    disabledItemClass : 'disabled'
  }, jQuery, window, document);

});