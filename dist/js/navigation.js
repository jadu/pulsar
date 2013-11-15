/**
 * Pulsar primary navigation handler.
 *
 * Attaches dropdown interaction behaviour to the navigation element created
 * through the pulsar.primary_nav() helper.
 * 
 * @param  {[object]} $ The default element defined in navSelector
 * @return {[boolean]}
 */
require(['jquery'], function ($) {

    'use strict';

    var delay = null,
        mouseOver = false,
        options = null;

    // Public methods ----------------------------------------------------------

    var methods = {

        init : function () {
            methods.show.call(this, $(options.subNavSelector, this));
        },

        show : function (el) {

            // if (el === undefined || $(el).length === 0) { 
            //     throw new Error('Element does not exist.'); 
            // }

            var subNavs = $(options.navSelector + options.subNavSelector + '.' + options.openClass);

            if (delay !== null) {
                clearTimeout(delay);
            }

            delay = setTimeout(function() {
                methods.hide.call(this, subNavs);
                el.show()
                    .addClass(options.openClass)
                    .parent().addClass(options.highlightClass);
            }, options.hoverDelay);

            return true;
        },

        hide : function () {
            $(options.navSelector + options.subNavSelector)
                .hide()
                .removeClass(options.openClass)
                .parent().removeClass(options.highlightClass);

            return true;
        }

    };

    // Constructor
    // ----------------------------------------------------------------

    $.fn.nav = function (method) {

        // Method calling logic
        if (methods[method]) {
            return methods[method].apply(this, Array.prototype.slice.call(arguments, 1));
        } else if (typeof method === 'object' || !method) {
            return methods.init.apply(this, arguments);
        } else {
            $.error('Method ' + method + ' does not exist on jQuery.nav');
        }

    };

    // Default options
    $.fn.nav.defaults = {
        navSelector: '.toolbar .dropdown__menu > li',
        subNavSelector: '> [data-subnav]',
        highlightClass: 'is-open',
        openClass: 'open',
        hoverDelay: 250
    };

    // Data API
    // ----------------------------------------------------------------
    
    $(document).ready(function() {
        $($.fn.nav.defaults.navSelector).hover(
            function() {
                mouseOver = true;
                options = $.fn.nav.defaults;
                $(this).nav();
            }
        );

    });

});
