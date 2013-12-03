/**
 * Jadu CMP Tray
 *
 * The tray displays the currently available widgets and enables them to be 
 * dropped into a dashboard or a homepage.
 */
define(['jquery', 'jquery-ui', 'jquery-ui-touch'], function() {

	'use strict';

	(function ( $, window, document, undefined ) {

		// Defaults
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

		// Constructor
		function Plugin ( element, options ) {
			this.element = element;
			this.settings = $.extend( {}, defaults, options );
			this._defaults = defaults;
			this._name = pluginName;
			this.init();
		}

		// Methods
		Plugin.prototype = {
			init: function () {
				this.initTray();
			},

			initTray: function () {
				var parent = this;

				// Set up the draggable
				$(this.settings.widgetClass, this.settings.trayContainer).draggable({
					connectToSortable: this.settings.connectToSortable,
					helper: this.settings.draggableHelper,
					revert: this.settings.draggableRevert,
					start: function(e, ui) {

						// Start fetching when dragging starts
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

					$('.tray__detail .widget')
						.data('widget-guid', $this.data('widget-guid'))
						.data('widget-version', $this.data('widget-version'))
						.data('widget-title', $this.data('widget-title'))
						.data('widget-description', $this.data('widget-description'))
						.show();
				});
			},

			fetchWidget: function ( e, ui ) {
				var parent = this,
						widget = $(ui.helper.context),
					  widgetGuid = widget.data('widget-guid'),
					  widgetVersion = widget.data('widget-version'); // The data attribute of the widget we're dragging

				// Fetch it
				$.ajax({
					url: parent.settings.widgetPath + widgetGuid + '/' + widgetVersion + '/index.php'
				}).done(function (data) {

					// Throw the data into the newly created widget container
					$(parent.settings.widgetDataContainer).val(data);
				});
			}

		};

		$.fn[ pluginName ] = function ( options ) {
			return this.each(function() {
				if ( !$.data( this, 'plugin_' + pluginName ) ) {
					$.data( this, 'plugin_' + pluginName, new Plugin( this, options ) );
				}
			});
		};

	})( jQuery, window, document );

});
