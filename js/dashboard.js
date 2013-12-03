/**
 * Jadu CMP Dashboard
 *
 * Attaches the behaviour to a Dashboard in Jadu CMP
 */
;define(['jquery', 'jquery-ui', 'jquery-ui-touch', 'modal', 'tray'], function() {

  (function ( $, window, document, undefined ) {

      // Defaults
      var pluginName = "dashboard",
          defaults = {
            fetchRetryTimeout: 50,
            title: "My Dashboard",
            titleContainer: ".heading",
            sortableForcePlaceholderSize: true,
            sortableOpacity: 0.5,
            sortableRevert: 100,
            sortableTolerance: "pointer",
            stateContainer: "#dashboard-state",
            trayContainer: ".tray",
            widgetClass: ".widget",
            widgetDataContainer: '#widget__data',
            widgetRemoveAttribute: "[data-widget-action=remove]"
          };

      // Constructor
      function Plugin ( element, options ) {
          this.element = element;
          this.currentItem = '';
          this.settings = $.extend( {}, defaults, options );
          this._defaults = defaults;
          this._name = pluginName;
          this.widgetState = [];
          this.widgetData = '';
          this.init();
      }

      // Methods
      Plugin.prototype = {
          init: function () {

            var self = this;

            // Set up the tray
            tray = $(this.settings.trayContainer).tray({ 
              connectToSortable: this.element
            });

            // Set up the sortable dashboard
            self.initDashboard();

            // Check for an existing state, and render it
            $(document).ready(function() {
              self.parseState();
            });
          },

          initDashboard: function () {
            console.log('init dashboard');

            var parent = this;

            // Set up the sortable
            $(this.element).sortable({
              forcePlaceholderSize: this.settings.sortableForcePlaceholderSize,
              opacity: this.settings.sortableOpacity,
              receive: function( e, ui ) {
                console.log('received');

                var $this = $(this);

                // If the fetch started by the dragging event hasn't finished, keep checking for the response...
                isFetched();

                function isFetched() {
                  parent.widgetData = $(parent.settings.widgetDataContainer).val();

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

                    // Tidy up after ourselves
                    $(parent.settings.widgetDataContainer).val('');
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

            // Remove widget event
            $(this.element).on('click', this.settings.widgetClass + ' ' + this.settings.widgetRemoveAttribute, function() {
              $(this).closest(parent.settings.widgetClass).remove();
              this.captureState;
            });

            // Rename dashboard
            $('form#rename').submit(function(e) {
              e.preventDefault();

              var values = {};
              $.each($(this).serializeArray(), function(i, field) {
                values[field.name] = field.value;
              });

              parent.settings.title = values.name;
              
              $(parent.settings.titleContainer).text(parent.settings.title);
              parent.captureState();

              $(this).closest('.modal').modal().modal('hide');
              $('.modal__backdrop').remove();              
            });
          },

          captureState: function () {
            var state = [];

            // Grab the widget states
            $.map($(this.element).find(this.settings.widgetClass), function(el) {
              state.push({
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
              widgets: state
            };

            // Store our JSON object
            this.state = Dashboard;

            // Copy state to hidden stateContainer field in the DOM
            console.log(JSON.stringify(Dashboard));
            $(this.settings.stateContainer).val(JSON.stringify(Dashboard));
          },

          parseState: function () {
            console.log('parse state');
            
            var state = JSON.parse( $(this.settings.stateContainer).html() );
            
            console.log(state);
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