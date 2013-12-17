/**
 * Jadu CMP Tray
 *
 * The tray displays the currently available widgets and enables them to be 
 * dropped into a dashboard or a homepage.
 */
define([
  'jquery',
  'jquery-ui',
  'jquery-ui-touch'
], function() {

  'use strict';

  (function ($, window, document, undefined) {

    // defaults
    var pluginName = 'tray',
      defaults = {
        container: '.tray__detail',
        connectToSortable: false,
        widgetClass: '.widget',
        widgetDataContainer: '#widget__data',
        widgetPath: '/var/widgets/',
        draggableHelper: 'clone',
        draggableRevert: 'invalid'
      };

    // constructor
    function Plugin (element, options) {
      this._defaults = defaults;
      this._name = pluginName;
      this.element = element;
      this.settings = $.extend({}, defaults, options);

      this.init();
    }

    // methods
    Plugin.prototype = {
      
      init: function () {
        this.initTray();
      },

      initTray: function () {
        var _this = this;

        // set up the draggable
        $(this.settings.widgetClass, this.settings.trayContainer).draggable({
          connectToSortable: this.settings.connectToSortable,
          helper: this.settings.draggableHelper,
          revert: this.settings.draggableRevert,
          start: function(e, ui) {

            // start fetching when dragging starts
            _this.fetchWidget(e, ui);
          }
        });

        // widget tray event handlers
        // TODO: Clean this up
        $('.tray__widgets li').on('click', function() {
          var $this = $(this);

          $('.tray__widgets').find('li').removeClass('active');

          $this.addClass('active');

          $('.widget__title').text($this.data('widget-title'));
          $('.widget__description').text($this.data('widget-description'));
          $('.widget__price').text($this.data('widget-price'));
          console.log($this.data('widget-grid-span'));
          $('.tray__detail .widget')
            .data('widget-guid', $this.data('widget-guid'))
            .data('widget-version', $this.data('widget-version'))
            .data('widget-title', $this.data('widget-title'))
            .data('widget-description', $this.data('widget-description'))
            .data('widget-grid-span', $this.data('widget-grid-span'))
            .show();
        });
      },

      fetchWidget: function (e, ui) {
        var _this = this,
            widget = $(ui.helper.context),
            widgetGuid = widget.data('widget-guid'),
            widgetVersion = widget.data('widget-version'); // The data attribute of the widget we're dragging

        // fetch it
        $.ajax({
          url: _this.settings.widgetPath + widgetGuid + '/' + widgetVersion + '/index.php'
        }).done(function (data) {

          // throw the data into the newly created widget container
          $(_this.settings.widgetDataContainer).val(data);
        });
      }

    };

    // data-api
    $(document).on('click', '[data-toggle=tray]', function (e) {
      var _this = $(this),
          $target = $($(this).attr('data-target'));
      
      e.preventDefault();

      // show/hide the tray
      $target.slideToggle(100, function () {

        // toggle active state on tray toggle
        if ($(this).is(':visible')) {
          _this.addClass('active');
        } else {
          _this.removeClass('active');
        }
      });

    })

    $.fn[pluginName] = function (options) {
      return this.each(function() {
        if (!$.data(this, 'plugin_' + pluginName)) {
          $.data(this, 'plugin_' + pluginName, new Plugin(this, options));
        }
      });
    };

  })(jQuery, window, document);

});
