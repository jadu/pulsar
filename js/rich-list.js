/*global define, setTimeout, window */
define([
    'jquery'
], function (
    $
) {
  'use strict';

  (function (defaults, $, window, document, undefined) {

    $.extend({

      pluginSetup: function (options) {
        return $.extend(defaults, options);
      }

    }).fn.extend({

      richList: function (options) {
        var _this = $(this);

        options = $.extend({}, defaults, options);

        return _this.each(function () {
          if (_this.find($(defaults.tileSelector).length)) {
            _this.tileGrid();
          }

          $(window).resize(function() {
            _this.tileGrid();
          });
        });
      },

      tileGrid: function () {
        var $tiles = $(defaults.tileSelector);

        $tiles.each(function() {
          var _this = $(this);

          // set tile height to match tile width
          _this.height(_this.width());
        });
      }

    });

  })({
    tileSelector: '.tile'
  }, jQuery, window, document);

});
