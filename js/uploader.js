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

      uploader: function (options) {
        var _this = $(this);

        options = $.extend({}, defaults, options);

        return _this.each(function () {
          _this.setUp(this, options);
        });
      },

      updateLabel: function (options) {

      },

      setUp: function (instance, options) {
        var $instance = $(instance),
            $fileInput = $instance.find(options.fileInputSelector),
            $browseButton = $instance.find($(options.browseButtonSelector));

        // assume the browse button toggles a single file input
        $browseButton.on('click', function() {
          $fileInput.trigger('click');
        });

        // watch for changes to the file input and update the label
        $fileInput.on('change', function() {
          $(this).parent().find(options.labelSelector).text($fileInput.val());
        });
      }

    });

  })({
    mainSelector: '.uploader',
    browseButtonSelector: '[data-action=browse]',
    fileInputSelector: '[type=file]',
    labelSelector: '.uploader__label'
  }, jQuery, window, document);

});
