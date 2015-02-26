'use strict';

var $ = require('jquery'),
	vague = require('../libs/Vague.js/Vague');

//require(['jquery', 'jquery-mousewheel', 'vague'], function ($) {


  // Public methods ------------------------------------------------------------

  var methods = {

    init : function (toggle) {

      // Call the 'show' method.
      methods.show.call(this, toggle);
      bindEvents();

    },

    show : function (toggle) {

      return this.each(function () {

        var deck = $(this),
            source = deck.attr('data-deck-source');

        if (toggle) {
          var params = toggle.attr('data-params');
        }

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
        $($.fn.deck.defaults.backgroundElements).addClass($.fn.deck.defaults.backgroundClassName);

        if (!$('html').hasClass('ie7')) {
          var vague = $($.fn.deck.defaults.backgroundElements).Vague({
            intensity: 2 // Blur intensity.
          });

          vague.blur();
        }

        /**
         * Activate the deck and show first slide.
         * (slides are hidden by default in CSS).
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
      $($.fn.deck.defaults.backgroundElements).removeClass($.fn.deck.defaults.backgroundClassName);

      if (!$('html').hasClass('ie7')) {
        var vague = $($.fn.deck.defaults.backgroundElements).Vague({
          intensity: 2 // Blur intensity.
        });

        vague.destroy();
      }

      return this;

    }

  };

  // Private methods -----------------------------------------------------------

  function bindEvents() {

    // Bind action to close an entire deck.
    $('[data-dismiss="deck"]').on({click: closeDeck});

    // Bind action to open a specified slide.
    $('[data-toggle="slide"]').on({click: showSlide});

    // Bind action to close a specified slide.
    $('[data-dismiss="slide"]').on({click: closeSlide});

  }

  function getSlides(deck, source, params) {

    var result = '';

    $.ajax({
      async: false,
      data: params,
      url: source,
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

  function closeSlide(e) {

    e.preventDefault();

    var self = $(e.currentTarget),
        slide = self.closest($.fn.deck.defaults.slideClass);

    slide.hide();

    /**
     * If this is the first slide in a deck, closing the slide needs to close
     * the deck and restore the background UI.
     */
    if (slide.index() === 0) {
      methods.hide.call(self, slide.parent());
    }

  }

  function showSlide(e) {

    e.preventDefault();

    var self = $(e.currentTarget),
        slide = $(self.attr('href')),
        deckTop = slide.parent().offset().top,
        slideTop = slide.offset().top;

    /**
     * We need to show the slide at this point as the next vars need to be set
     * based on its rendered position (the values when hidden are different).
     */
    slide.show();

    // Store the current x position so we can re-apply it later.
    var originalLeft = slide.css('left'),
        originalWidth = slide.width(),
        previousLeft = slide.offset().left,
        previousTop = $(window).scrollTop(),
        viewportTop = $($.fn.deck.defaults.viewportOffsetElement).height();

  }

  // Constructor ---------------------------------------------------------------

  $.fn.deck = function (method) {

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
    deckClass : '.deck',
    slideClass : '.slide',
    activeClassName : 'active',
    backgroundClassName : 'deck-background',
    backgroundElements : '.breadcrumb, .actionsbar, .heading, .actionsbar + .tabs__list, .summary',
    viewportOffsetElement : '.toolbar'
  };

  // Data API ------------------------------------------------------------------

  $(function () {

    $('body').on('click.deck.data-api', '[data-toggle="deck"]', function (e) {

      e.preventDefault();

      // Grab the deck target from the data-attribute.
      var self = $(this),
          target = $(self).attr('href');

      // Init the target deck of the clicked element.
      $(target).deck(self);

    });

    /**
     * Open any decks that are .active
     * To prevent issues, we'll only open the first deck that matches.
     */
    $(document).ready(function() {
      $('.deck.active').first().deck();
    });

  });
