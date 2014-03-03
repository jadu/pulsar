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

      actionsmenu: function (options) {
        
        var _this = $(this);

        options = $.extend({}, defaults, options);

        // init actions menu
        return _this.each(function () {


        });

      },

      updateBadge: function (count) {
        
        var badge = $(defaults.badgeSelector, $(defaults.actionsMenuSelector));

        if (count) {

          // add the count and show the badge
          badge
            .text(count)
            .fadeIn(defaults.animationSpeed)
        } else {

          // hide the badge and empty the count
          badge.fadeOut(defaults.animationSpeed, function () {
            $(this).text('');
          });  
        }

      }

    });

  })({
    actionsMenuSelector : '.actions-menu',
    animationSpeed : 250,
    badgeSelector : '.badge'
  }, jQuery, window, document);

});