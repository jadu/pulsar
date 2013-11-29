/**
 * Jadu CMP Dashboard
 *
 * Attaches the behaviour to a Dashboard in Jadu CMP
 */
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
            sortableTolerance: "pointer",
            stateContainer: "#dashboard_state",
            widgetRemoveAttribute: "[data-widget-action=remove]"
          };

      // Constructor
      function Plugin ( element, options ) {
          this.element = element;
          this.currentItem = '';
          this.settings = $.extend( {}, defaults, options );
          this._defaults = defaults;
          this._name = pluginName;
          this.widgetData = '';
          this.widgetState = [];
          this.init();
      }

      // Methods
      Plugin.prototype = {
          init: function () {

            // Set up the draggable widget tray
            this.initTray();

            // Set up the sortable dashboard
            this.initDashboard();
          },

          initDashboard: function () {
            console.log('init dashboard');

            var parent = this;

            // Set up the sortable
            $(this.element).sortable({
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

                    // Populate data attributes in new widget instance
                    widget.data('widget', sender.data('widget'))
                          .data('widget-title', sender.data('widget-title'))
                          .data('widget-description', sender.data('widget-description'))
                          .attr('data-last-appended', 'true');

                    // Update our state once we've properly fetched the widget contents
                    parent.captureState();

                    // Tidy up after ourselves
                    parent.widgetData = '';
                  } else {

                    // Wait a bit more...
                    setTimeout(isFetched, parent.settings.fetchRetryTimeout);
                  }
                }

              },
              revert: this.settings.sortableRevert,
              stop: function() {
                parent.captureState();
              },
              tolerance: this.settings.sortableTolerance
            });

            // Remove widget event handler
            $(this.element).on('click', this.settings.widgetClass + ' ' + this.settings.widgetRemoveAttribute, function() {
              $(this).closest(parent.settings.widgetClass).remove();
              this.captureState;
            });
          },

          initTray: function () {
            console.log('init tray');

            var parent = this;

            $(this.settings.widgetClass, this.settings.trayContainer).draggable({
              connectToSortable: this.element,
              helper: this.settings.draggableHelper,
              revert: this.settings.draggableRevert,
              start: function(e, ui) {
                parent.fetchWidget(e, ui);
              }
            });

            // Widget tray event handlers
            // TODO: Clean this up
            $('.tray__widgets li').on('click', function() {
              var $this = $(this);
              $('.tray__widgets').find('li').removeClass('active');
              $this.addClass('active');
              $('.widget__title').text($this.data('widget-title'));
              $('.widget__description').text($this.data('widget-description'));
              $('.widget__price').text($this.data('widget-price'));

              $('.tray__detail .widget').data('widget', $this.data('widget'))
                .data('widget-title', $this.data('widget-title'))
                .data('widget-description', $this.data('widget-description'))
                .show();
            });
          },

          captureState: function () {
            var widgetState = [];

            // Grab the widget states
            $.map($(this.element).find(this.settings.widgetClass), function(el) {
              widgetState.push({
                guid: "widget_guid",
                id: $(el).attr('id'),
                settings: {
                  name: $(el).data('widget')
                }
              });
            });

            // Create the json object that stores dashboard state
            var Dashboard = {
              title: this.settings.title,
              widgets: widgetState
            };

            // Store our JSON object
            this.widgetState = Dashboard;

            // Copy state to hidden stateContainer field in the DOM
            console.log(JSON.stringify(Dashboard));
            $(this.settings.stateContainer).val(JSON.stringify(Dashboard));
          },

          fetchWidget: function (e, ui) {
            console.log('fetching widget...');

            var parent = this,
                widget = $(ui.helper.context).data('widget')

            // Fetch it
            $.ajax({
              url: '/views/widgets/' + widget + '/index.php'
            }).done(function (data) {
              console.log('fetched');
              parent.widgetData = data;
            });
          }
      };

      $.fn[ pluginName ] = function ( options ) {
          return this.each(function() {
              if ( !$.data( this, "plugin_" + pluginName ) ) {
                  $.data( this, "plugin_" + pluginName, new Plugin( this, options ) );
              }
          });
      };

  })( jQuery, window, document );

});