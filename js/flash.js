/**
 * Jadu Alert Handler
 */
define([
  'jquery',
  'sticky'
], function() {

  'use strict';

  (function ($, window, document, undefined) {

    // Defaults
    var pluginName = 'flash',
        defaults = {
          autohide: false,
          autohideDelay: 5000,
          consoleLog: true,
          container: 'header',
          successType: 'success',
          warningType: 'warning',
          errorType: 'error',
          defaultType: 'default',
          dismissHandler: '[data-dismiss="flash"]',
          slideSpeed: 100,
          stickyTopSpacing: 44,
          helper: '/app/helpers/flash.php'
        };

    // Constructor
    function Plugin (element, options) {
      this._defaults = defaults;
      this._name = pluginName;
      this.element = element;
      this.settings = $.extend({}, defaults, options);
      this.html;
      this.flashMessage;
      this.flashType = 'default';
      this.flashAutohide = false;

      this.init();
    }

    // Methods
    Plugin.prototype = {

      init: function () {
      },

      setFlash: function () {
        var _this = this;

        $.ajax({
          data: 'flash_message=' + _this.flashMessage +
                '&flash_type=' + _this.flashType +
                '&flash_autohide=' + _this.flashAutohide,
          url: _this.settings.helper
        }).done(function (data) {
            _this.html = data;
            _this.render();
        });

        // if required, show the message in the console
        if (_this.settings.consoleLog === true) {
          $.error(_this.flashMessage);
        }

      },

      render: function () {
        var _this = this,
            $container = $(_this.settings.container);

        // double check we do actually have the data back
        if (_this.html) {

          var $newFlash = $container.append(_this.html)
            .children()
            .last();

          // insert our flash message into the header
          $newFlash.slideDown(_this.settings.slideSpeed, function() {
            $(this).sticky({
              topSpacing: _this.settings.stickyTopSpacing
            });
          });

          // self-dismissing flash messages
          if (_this.flashAutohide) {
            var timer = setTimeout(function() {

              /** 
               * parent() targets the sticky wrapper, otherwise the space 
               * occupied by the flash message doesn't get removed
               */
              $newFlash.parent().slideUp(_this.settings.slideSpeed);
            }, _this.settings.autohideDelay);
          }

          // bind the dismiss handler
          $(_this.element).on('click', _this.settings.dismissHandler, function () {

              // parent() targets the sticky wrapper
              $(this).closest('.flash')
                .parent()
                .slideUp(_this.settings.slideSpeed);
          });
        }
      },

      success: function (message, autohide) {
        var _this = this;

        _this.flashType = _this.settings.successType;
        _this.flashMessage = message;
        _this.flashAutohide = autohide;
        _this.setFlash();
      },

      warning: function (message, autohide) {
        var _this = this;

        _this.flashType = _this.settings.warningType;
        _this.flashMessage = message;
        _this.flashAutohide = autohide;
        _this.setFlash();
      },

      error: function (message, autohide) {
        var _this = this;

        _this.flashType = _this.settings.errorType;
        _this.flashMessage = message;
        _this.flashAutohide = autohide;
        _this.setFlash();
      },

      message: function (message, autohide) {
        var _this = this;

        _this.flashType = _this.settings.defaultType;
        _this.flashMessage = message;
        _this.flashAutohide = autohide;
        _this.setFlash();
      }

    };

    $.fn[pluginName] = function (options) {
      var plugin;
      this.each(function() {
        plugin = $.data(this, 'plugin_' + pluginName);
        if (!plugin) {
          plugin = new Plugin(this, options);
          $.data(this, 'plugin_' + pluginName, plugin);
        }
      });
      return plugin;
    };

  })(jQuery, window, document);

});