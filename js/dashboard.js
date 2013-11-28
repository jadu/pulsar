;define(['jquery', 'jquery-ui', 'jquery-ui-touch'], function() {

  (function ( $, window, document, undefined ) {

      // Defaults
      var pluginName = "dashboard",
          defaults = {
            fetchRetryTimeout: 50,
            title: "My Dashboard",
            trayContainer: ".tray__detail",
            widgetClass: ".widget",
            draggableHelper: "clone",
            draggableRevert: "invalid",
            sortableForcePlaceholderSize: true,
            sortableOpacity: 0.5,
            sortableRevert: 100,
            sortableTolerance: "pointer"
          };

      // Constructor
      function Plugin ( element, options ) {
          this.element = element;
          this.currentItem = '';
          this.settings = $.extend( {}, defaults, options );
          this._defaults = defaults;
          this._name = pluginName;
          this.widgetData = '';
          this.init();
      }

      Plugin.prototype = {
          init: function () {
            console.log(this.settings);

            // Set up the draggable widget tray
            this.initTray();

            // Set up the sortable dashboard
            this.initDashboard();
          },

          captureState: function () {
            console.log('capture state');

          },

          createWidget: function (e, ui, $this, currentItem) {
            console.log('create widget');
            
          },

          fetchWidget: function (e, ui) {
            console.log('fetching widget...');

            var parent = this,
                widget = $(ui.helper.context).data('widget'),
                widgetData = '';

            // Fetch it
            $.ajax({
              url: '/views/widgets/' + widget + '/index.php'
            }).done(function (data) {
              console.log('fetched');
              parent.widgetData = data;
            });

          },

          initDashboard: function () {
            console.log('init dashboard');

            var parent = this;

            $(this.element).sortable({
              change: this.captureState,
              forcePlaceholderSize: this.settings.sortableForcePlaceholderSize,
              opacity: this.settings.sortableOpacity,
              receive: function(e, ui) {
                console.log('received');

                var $this = $(this);

                // If the fetch started by the dragging event hasn't finished, keep checking for the response...
                isFetched();

                function isFetched() {

                  if (parent.widgetData != '') {

                    var widget = $this.data().uiSortable.currentItem;
                    var sender = ui.sender;

                    widget.html(parent.widgetData) // Populate widget content
                      .uniqueId(); // Attach unique identifier

                    // Reset last-appended flag
                    $(parent.settings.widgetClass, parent.element).not(widget)
                      .removeAttr('data-last-appended');
console.log(widget);
                    // Populate data attributes in new widget instance
                    widget.data('widget', sender.data('widget'))
                          .data('widget-title', sender.data('widget-title'))
                          .data('widget-description', sender.data('widget-description'))
                          .attr('data-last-appended', 'true');

                    // Update our state once we've properly fetched the widget contents
                    parent.captureState;

                    // Tidy up after ourselves
                    parent.widgetData = '';
                  } else {

                    // Wait a bit more...
                    setTimeout(isFetched, 50);
                  }
                }


              },
              revert: this.settings.sortableRevert,
              tolerance: this.settings.sortableTolerance
            });
          },

          initTray: function () {
            console.log('init tray');

            var parent = this;
            console.log(parent);

            $(this.settings.widgetClass, this.settings.trayContainer).draggable({
              connectToSortable: this.element,
              helper: this.settings.draggableHelper,
              revert: this.settings.draggableRevert,
              start: function(e, ui) {
                console.log(parent);
                parent.fetchWidget(e, ui);
              }
            });
          }
      };

      // A really lightweight plugin wrapper around the constructor,
      // preventing against multiple instantiations
      $.fn[ pluginName ] = function ( options ) {
          return this.each(function() {
              if ( !$.data( this, "plugin_" + pluginName ) ) {
                  $.data( this, "plugin_" + pluginName, new Plugin( this, options ) );
              }
          });
      };

  })( jQuery, window, document );

});