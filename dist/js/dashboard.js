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
  'tray'
], function(store) {

  'use strict';

  (function ($, window, document, undefined) {

    // defaults
    var pluginName = 'dashboard',
        api = {
          save: 'api/dashboard/save/',
        },
        defaults = {
          fetchRetryTimeout: 50,
          fetchRetryLimit: 5,
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
        },
        flash = {
          saveSuccess: 'Your dashboard has been saved.',
          saveFail: 'There was a problem and your dashboard wasn’t saved. Please try again.',
          saveErrorApi: 'There was a problem and your dashboard wasn’t saved, please try again or contact your support team if you see this message again. (error code: API)',
          saveError500: 'There was a problem and your dashboard wasn’t saved, please try again or contact your support team if you see this message again. (error code: 500)',
          saveDelay: 'Your dashboard is taking longer than expected to save, please wait a moment...'
        };

    // constructor
    function Plugin (element, options) {
      this._defaults = defaults;
      this._name = pluginName;
      this.api = api;
      this.element = element;
      this.flash = flash;
      this.settings = $.extend({}, defaults, options);
      this.currentItem;
      this.state;
      this.tray;
      this.widgetData;

      this.init();
    }

    // methods
    Plugin.prototype = {

      init: function () {

        // set up the tray
        this.tray = $(this.settings.trayContainer).tray({
          connectToSortable: this.element
        });

        // set up the sortable dashboard
        this.initDashboard();
      },

      initDashboard: function () {
        console.log('init dashboard');

        var _this = this;

        // set up the sortable
        $(this.element).sortable({
          forcePlaceholderSize: this.settings.sortableForcePlaceholderSize,
          opacity: this.settings.sortableOpacity,
          receive: function(e, ui) {
            console.log('received');

            var $this = $(this);

            function isFetched() {
              _this.widgetData = $(_this.settings.widgetDataContainer).val();

              if (_this.widgetData !== '') {
                var widget = $this.data().uiSortable.currentItem;
                var sender = ui.sender;

                widget.html(_this.widgetData) // populate widget content
                  .uniqueId(); // attach unique identifier

                // reset last-appended flag
                $(_this.settings.widgetClass, _this.element).not(widget)
                  .removeAttr('data-last-appended');

                // populate data attributes in new widget instance
                widget.data('widget', sender.data('widget'))
                    .data('widget-title', sender.data('widget-title'))
                    .data('widget-description', sender.data('widget-description'))
                    .attr('data-last-appended', 'true');

                // tidy up after ourselves
                $(_this.settings.widgetDataContainer).val('');
                _this.widgetData = '';
              } else {

                // wait a bit more...
                setTimeout(isFetched, _this.settings.fetchRetryTimeout);
              }
            }

            /**
             * if the fetch started by the dragging event hasn't finished,
             * keep checking for the response...
             */
            isFetched();

          },
          revert: this.settings.sortableRevert,
          stop: function() {
            _this.captureState();
          },
          tolerance: this.settings.sortableTolerance
        });

        // remove widget event
        $(this.element).on('click', this.settings.widgetClass + ' ' + this.settings.widgetRemoveAttribute, function() {
          $(this).closest(_this.settings.widgetClass).remove();
          _this.captureState();
        });

        // action - rename dashboard
        $('[data-action=rename]').submit(function(e) {
          console.log('rename');
          var values = {};

          e.preventDefault();

          $.each($(this).serializeArray(), function(i, field) {
            values[field.name] = field.value;
          });

          _this.settings.title = values.name;
          
          $(_this.settings.titleContainer).text(_this.settings.title);

          // update the name used in the 'delete widget' modal
          $('#dashboard-title').text(_this.settings.title);

          _this.captureState();

          $(this).closest('.modal').modal('hide');
        });

        // action - save dashboard
        $('[data-action=save]').on('click', function() {
          _this.captureState(true);
        });

      },

      captureState: function (showFlash) {
        var state = [];

        if (typeof(showFlash) === 'undefined') {
          showFlash = false;
        }

        // grab the widget states
        $.map($(this.element).find(this.settings.widgetClass), function(el) {
          state.push({
            guid: 'widget_guid',
            id: $(el).attr('id'),
            settings: {
              name: $(el).data('widget')
            }
          });
        });

        // create the json object that stores dashboard state
        var Dashboard = {
          title: this.settings.title,
          widgets: state
        };

        // store our JSON object
        this.state = Dashboard;

        // save state to localstorage if available
        if (store.enabled) {
          store.set(this.settings.storageStateName, this.state);
          store.set(this.settings.storageModifiedName, Number(new Date));
        }

        this.saveState(showFlash);
      },

      getState: function () {
        console.log('get state');

        var state = [];
        
        // check for a stored state object first, then try localstorage
        if (this.state) {
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

      saveState: function(showFlash) {
        console.log('saving state... (' + this.api.save + ')');
        console.log(this.state);

        var _this = this,
            state = this.getState();

        $.ajax({
          data: state,
          type: 'POST',
          tryCount : 0,
          retryLimit : _this.settings.fetchRetryLimit,
          url: this.api.save
        }).done(function (data) {
          if (showFlash === true) {
            $(document).flash().success(_this.flash.saveSuccess);
          }
        }).error(function(xhr, textStatus, errorThrown) {
          if (textStatus == 'timeout') {
            this.tryCount++;

            // show the delay message if we're having trouble saving
            if (this.tryCount > 2) {
              $(document).flash().warning(_this.flash.saveDelay, true);
            }

            // try again
            if (this.tryCount <= this.retryLimit) {
              $.ajax(this);
              return;
            }            
            return;
          }
          if (xhr.status == 500) {
            $(document).flash().error(_this.flash.saveError500);
          } else {
            $(document).flash().error(_this.flash.saveErrorApi);
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