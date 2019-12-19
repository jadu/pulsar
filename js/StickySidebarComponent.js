'use strict';

var $ = require('jquery');

class StickySidebarComponent {

    /**
     * StickySidebarComponent
     * @constructor 
     * @param {object} window - window object
     * @param {jQuery} $html - jQuery wrapper of the html node
     */
    constructor ($html, window) {
        this.$html = $html;
        this.window = window;
    }

    /**
     * Initialise component
     * 
     * Should be fired on page load, checks for required options, performs an 
     * initial sticky calculation and binds to resize & scroll events
     */
    init () {
        if (typeof this.$html === 'undefined') {
            throw new Error('$html must be passed to StickySidebarComponent');
        }

        if (typeof this.window === 'undefined') {
            throw new Error('window must be passed to StickySidebarComponent');
        }

        this.sticky()
        $(this.window).on('scroll resize', (event) => this.sticky(event));
    }

    /**
     * Sticky calculation
     * 
     * If content is taller than settings, and the viewport has been scrolled 
     * enough then add the required sticky class to the container, and remove it
     * if no longer required
     */
    sticky () {
        const $container = this.$html.find('.tab__container.has-settings .tab__inner');

        if (!$container.length) {
            return false;
        }

        const isContentTallerThanContent = this.$html.find('.tab__container.has-settings .tab__content').outerHeight() > this.$html.find('.tab__container.has-settings .tab__settings').outerHeight();
        const hasScrolledPastContainer = $(this.window).scrollTop() > $container.offset().top;

        if (isContentTallerThanContent && hasScrolledPastContainer) {
            $container.addClass('is-sticky');
        } else {
            $container.removeClass('is-sticky');
        }
        
    }
}

module.exports = StickySidebarComponent;
