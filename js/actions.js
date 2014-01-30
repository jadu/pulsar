/**
 * Pulsar-UI actions
 *
 * Defines the behaviour of Pulsar-UI 'actions menu'
 */
define([
    'store-js',
    'jquery'
], function(store) {

    'use strict';

    (function ($, window, document, undefined) {

        var pluginName = 'actions',
            defaults = {
                animationSpeed: 250,
                badgeSelector: '.badge',
                localstorageKey: 'actions-count'
            };

        // constructor
        function Plugin (element, options) {

            this.element = element;

            this.options = $.extend( {}, defaults, options) ;

            this._defaults = defaults;
            this._name = pluginName;
            this.count = 0;
            this.badge;

            this.init();
        }

        // methods
        Plugin.prototype = {

            init: function () {
                this.badge = $(this.options.badgeSelector, this.element);
                this.updateBadge();
            },

            updateBadge: function (count) {
                if (typeof count != 'undefined') {

                    // use value passed to method
                    this.count = parseInt(count);
                } else {

                    // check localstorage
                    this.getCount();
                }

                // truthy check for a positive value
                if (this.count) {

                  // add the count and show the badge
                  this.badge
                    .text(this.count)
                    .fadeIn(this.options.animationSpeed)
                } else {

                  // hide the badge and empty the count
                  this.badge.fadeOut(this.options.animationSpeed, function () {
                    $(this).text('');
                  });  
                }

            },

            getCount: function () {
                if (!store.enabled) {
                    return false
                }

                // update cached count
                this.count = store.get(this.options.localstorageKey);

                return this.count;
            },

            setCount: function (count) {
                if (!store.enabled || !count) {
                    return false
                }

                // set localstorage value
                store.set(this.options.localstorageKey, count);

                // update cached count
                this.count = count;

                return this.count;
            }
        };

        $.fn[pluginName] = function (options) {
            return this.each(function () {
                if (!$.data(this, 'plugin_' + pluginName)) {
                    $.data(this, 'plugin_' + pluginName,
                    new Plugin(this, options));
                }
            });
        };

    })(jQuery, window, document);

});
