!function ($) {

    'use strict';

    // Public methods ----------------------------------------------------------

    var methods = {

        init : function (toggle) {

            // Bind action to close an entire deck.
            $('.deck').on({click: closeDeck}, '[data-dismiss="deck"]');

            // Bind action to open a specified slide.
            $('.deck').on({click: showSlide}, '[data-toggle="slide"]');

            // Bind action to close a specified slide.
            $('.deck').on({click: closeSlide}, '[data-dismiss="slide"]');

            // Call the 'show' method.
            methods.show.call(this, toggle);

        },

        show : function (toggle) {

            return this.each(function () {

                var deck = $(this),
                    source = deck.attr('data-deck-source'),
                    params = toggle.attr('data-params');

                // Hide any active decks
                methods.hide.call(this);

                /**
                 * If the data-deck-source attribute is present slides will be retrieved
                 * with XHR, otherwise, we'll assume they're inline.
                 */
                if (source) {
                    var slides = getSlides(deck, source, params);
                    populateDeck(deck, slides);
                }

                // Unfocus the background
                // $($.fn.deck.defaults.backgroundElements).addClass($.fn.deck.defaults.backgroundClassName);
var vague = $($.fn.deck.defaults.backgroundElements).Vague({
    intensity: 2 //blur intensity
});
vague.blur();

                /**
                 * Activate the deck and show first slide.
                 * (slides are hidden by default in CSS)
                 */
                deck.addClass($.fn.deck.defaults.activeClassName)
                    .children()
                    .first()
                    .show();

            });

        },

        hide : function (deck) {

            if (!deck) {

                // If no specific deck is provided, hide 'em all.
                $($.fn.deck.defaults.deckClass).removeClass($.fn.deck.defaults.activeClassName)
                    .children()
                    .hide();
            } else {

                // Remove active class, reset the deck's position and hide all slides.
                deck.removeClass($.fn.deck.defaults.activeClassName)
                    .children()
                    .hide();
            }

            // Refocus the background UI.
            // $($.fn.deck.defaults.backgroundElements).removeClass($.fn.deck.defaults.backgroundClassName);
var vague = $($.fn.deck.defaults.backgroundElements).Vague({
    intensity: 2 //blur intensity
});
vague.destroy();

            return this;

        }

    };

    // Private methods ---------------------------------------------------------

    function getSlides(deck, source, params) {

        var result = '';

        $.ajax({
            async: false,
            data: params,
            url: $.fn.deck.defaults.deckPath + source,
            success: function (data) {
                result = data;
            }
        });

        return result;

    }

    function populateDeck(deck, slides) {
        deck.html(slides);
    }

    function closeDeck() {
        methods.hide.call();
    }

    function closeSlide() {

        var slide = $(this).parent();

        slide.hide();

        /** 
         * If this is the first slide in a deck, closing the slide needs to close
         * the deck and restore the background UI.
         */
        if (slide.index() === 0) {
            methods.hide.call(this, slide.parent());
        }

    }

    function showSlide() {

        var slide = $($(this).attr('href')),
            deckTop = slide.parent().offset().top,
            slideTop = slide.offset().top;

        /**
         * We need to show the slide at this point as the next vars need to be set 
         * based on it's rendered position (the values when hidden are different).
         */
        slide.show();

        // Store the current x position so we can re-apply it later.
        var originalLeft = slide.css('left'),
            originalWidth = slide.width(),
            previousLeft = slide.offset().left,
            previousTop = $(window).scrollTop(),
            viewportTop = $($.fn.deck.defaults.viewportOffsetElement).height();

        /**
         * Switch to relative positioning so that scrolling can be properly
         * detected with both mouse and trackpad.
         */
        slide.css({
            'left' : slide.offset().left,
            'position' : 'fixed',
            'top' : viewportTop,
            'width' : originalWidth
        });

        /**
         * If this slide is 'below the fold', we'll stick it to the top of the
         * viewport, and reattach it to the top of the deck when the user 
         * scrolls to the top.
         */
        if (slideTop > deckTop) {

            /**
            * Monitor the scroll event and wait until we're at the top of the deck.
            * This uses the jquery-mousewheen plugin to normalise x-browser scrolling
            * behaviour: https://github.com/brandonaaron/jquery-mousewheel.
            */
            $(window).bind('mousewheel', function (e, delta) {

                var scrollDirection = delta > 0 ? 'up' : 'down',
                    currentTop = $(window).scrollTop();

                // Switch our styles depending on the scroll direction.
                if (scrollDirection === 'down') {

                    /**
                    * Lock the slide in place using relative position so we can scroll
                    * down to see it's content.
                    */
                    slide.css({
                        'position' : 'relative',
                        'left' : originalLeft,
                        'top' : previousTop - 50
                    });

                } else { // Going up!

                    /**
                    * Only switch back to fixed when we've scrolled back upto the top of
                    * the slide, this allows for smooth upward scrolling, and also to 
                    * scroll back up the slide's content.
                    */
                    if (currentTop < previousTop) {

                        // Update the position as we scroll up.
                        previousTop = currentTop;
                        slide.css({
                            'position' : 'fixed',
                            'left' : previousLeft,
                            'top' : viewportTop
                        });

                    }

                }

                // When the user scrolls so the top of the deck container is visible.
                if (deckTop >= (currentTop + viewportTop)) {

                    // Snap to the top by restoring normal stylings.
                    slide.css({
                        'left' : originalLeft,
                        'position' : 'absolute',
                        'top' : 0
                    });

                    // Stop watching the scroll event.
                    $(window).unbind('mousewheel');

                }

            });

        }

    }

    // Constructor -------------------------------------------------------------

    $.fn.deck = function (method, options) {

        // Method calling logic.
        if (methods[method]) {
            return methods[method].apply(this, Array.prototype.slice.call(arguments, 1));
        } else if (typeof method === 'object' || !method) {
            return methods.init.apply(this, arguments);
        } else {
            $.error('Method ' + method + ' does not exist on jQuery.deck');
        }

    };

    // Default options.
    $.fn.deck.defaults = {
        deckPath : 'decks/',
        deckClass : '.deck',
        activeClassName : 'active',
        backgroundClassName : 'deck-background',
        backgroundElements : '.breadcrumb, .actionsbar, .heading, .tabs__list, .tabs__content, .summary',
        viewportOffsetElement : 'header'
    };

    // Data API ----------------------------------------------------------------

    $(function () {

        $('body').on('click.deck.data-api', '[data-toggle="deck"]', function (e) {

            e.preventDefault();

            // Grab the deck target from the data-attribute.
            var self = $(this),
                target = $(self).attr('href');

            // Init the target deck of the clicked element.
            $(target).deck(self);

        });

    });

}(jQuery);

// Plugins ---------------------------------------------------------------------

/*! Copyright (c) 2011 Brandon Aaron (http://brandonaaron.net)
 * Licensed under the MIT License (LICENSE.txt).
 *
 * Thanks to: http://adomas.org/javascript-mouse-wheel/ for some pointers.
 * Thanks to: Mathias Bank(http://www.mathias-bank.de) for a scope bug fix.
 * Thanks to: Seamus Leahy for adding deltaX and deltaY
 *
 * Version: 3.0.6
 * 
 * Requires: 1.2.2+
 */

(function ($) {

    var types = ['DOMMouseScroll', 'mousewheel'];

    if ($.event.fixHooks) {
        for ( var i=types.length; i; ) {
            $.event.fixHooks[ types[--i] ] = $.event.mouseHooks;
        }
    }

    $.event.special.mousewheel = {
        setup: function () {
            if ( this.addEventListener ) {
                for ( var i=types.length; i; ) {
                    this.addEventListener( types[--i], handler, false );
                }
            } else {
                this.onmousewheel = handler;
            }
        },
        
        teardown: function () {
            if ( this.removeEventListener ) {
                for ( var i=types.length; i; ) {
                    this.removeEventListener( types[--i], handler, false );
                }
            } else {
                this.onmousewheel = null;
            }
        }
    };

    $.fn.extend({
        mousewheel: function (fn) {
            return fn ? this.bind("mousewheel", fn) : this.trigger("mousewheel");
        },
        
        unmousewheel: function (fn) {
            return this.unbind("mousewheel", fn);
        }
    });


    function handler(event) {
        var orgEvent = event || window.event, args = [].slice.call( arguments, 1 ), delta = 0, returnValue = true, deltaX = 0, deltaY = 0;
        event = $.event.fix(orgEvent);
        event.type = "mousewheel";
        
        // Old school scrollwheel delta
        if ( orgEvent.wheelDelta ) { delta = orgEvent.wheelDelta/120; }
        if ( orgEvent.detail    ) { delta = -orgEvent.detail/3; }
        
        // New school multidimensional scroll (touchpads) deltas
        deltaY = delta;
        
        // Gecko
        if ( orgEvent.axis !== undefined && orgEvent.axis === orgEvent.HORIZONTAL_AXIS ) {
            deltaY = 0;
            deltaX = -1*delta;
        }
        
        // Webkit
        if ( orgEvent.wheelDeltaY !== undefined ) { deltaY = orgEvent.wheelDeltaY/120; }
        if ( orgEvent.wheelDeltaX !== undefined ) { deltaX = -1*orgEvent.wheelDeltaX/120; }
        
        // Add event and delta to the front of the arguments
        args.unshift(event, delta, deltaX, deltaY);
        
        return ($.event.dispatch || $.event.handle).apply(this, args);
    }

})(jQuery);
