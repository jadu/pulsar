/**
 * Jadu CMP Dashboard
 *
 * Attaches the behaviour to a Dashboard in Jadu CMP
 */
define([
    'store-js',
    'jquery',
    'jquery-ui',
    'jquery-ui-touch',
    'modal',
    'tray'
], function(store) {

    'use strict';

    (function ($, window, document, undefined) {

        // Defaults
        var pluginName = 'dashboard',
            api = {
                save: 'api/dashboard/save/',
            },
            defaults = {
                fetchRetryTimeout: 50,
                title: 'My Dashboard',
                titleContainer: '.heading',
                sortableForcePlaceholderSize: true,
                sortableOpacity: 0.5,
                sortableRevert: 100,
                sortableTolerance: 'pointer',
                stateContainer: '#dashboard-state',
                storageStateName: 'dashboard-state',
                storageModifiedName: 'dashboard-modified',
                trayContainer: '.tray',
                widgetClass: '.widget',
                widgetDataContainer: '#widget__data',
                widgetRemoveAttribute: '[data-widget-action=remove]'
            };

        // Constructor
        function Plugin (element, options) {
            this._defaults = defaults;
            this._name = pluginName;
            this.api = api;
            this.element = element;
            this.currentItem = '';
            this.settings = $.extend( {}, defaults, options );
            this.state = [];
            this.tray = '';
            this.widgetData = '';
            this.init();
        }

        // Methods
        Plugin.prototype = {
            init: function () {

                // Set up the tray
                this.tray = $(this.settings.trayContainer).tray({
                    connectToSortable: this.element
                });

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

                        function isFetched() {
                            parent.widgetData = $(parent.settings.widgetDataContainer).val();

                            if (parent.widgetData !== '') {
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

                        // If the fetch started by the dragging event hasn't finished, keep checking for the response...
                        isFetched();

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
                    parent.captureState();
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
                        guid: 'widget_guid',
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

                // Save state to localstorage if available
                if (store.enabled) {
                    store.set(this.settings.storageStateName, this.state);
                    store.set(this.settings.storageModifiedName, +new Date);
                }

                this.saveState();
            },

            getState: function () {
                console.log('get state');

                var state = [];
                
                // Check for a stored state object first, then try localstorage
                if (this.state !== 'undefined') {
                    state = this.state;
                }
                else if (store.enabled) {
                    state = store.get(this.settings.storageStateName);
                } 
                else {
                    return false;
                }

                return state;
            },

            saveState: function() {
                console.log('saving state... (' + this.api.save + ')');
                console.log(this.state);

                var state = this.getState();

                $.ajax({
                    data: state,
                    type: 'POST',
                    tryCount : 0,
                    retryLimit : 3,
                    url: this.api.save
                }).done(function (data) {

                    console.log('saved!');

                }).error(function(xhr, textStatus, errorThrown) {
                    if (textStatus == 'timeout') {
                        this.tryCount++;
                        if (this.tryCount <= this.retryLimit) {
                            
                            // Try again
                            $.ajax(this);
                            return;
                        }            
                        return;
                    }
                    if (xhr.status == 500) {
                        $.error('Unable to save data via API (error 500)');
                    } else {
                        $.error('Unable to save data via API');
                    }
                });

            }
            
        };

        $.fn[pluginName] = function (options) {
            return this.each(function() {
                if (!$.data(this, 'plugin_' + pluginName)) {
                    $.data(this, 'plugin_' + pluginName, new Plugin(this, options));
                }
            });
        };

    })(jQuery, window, document);

});