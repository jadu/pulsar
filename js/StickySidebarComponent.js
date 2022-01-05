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
     * Add the required sticky class to the container, and remove it if scrolled up
     */
    sticky () {
        const $container = this.$html.find('.tab__container.has-settings .tab__inner');
        const $header = $container.children('.tab__header');
        const $settings = $container.find('.tab__settings');
        const hasClass = $container.hasClass('is-sticky');

        if (!$settings.length) {
            return;
        }

        const scrollTop = $(this.window).scrollTop();
        const sidebarOffset = Math.floor($container.offset().top + ($header.length > 0 ? $header.outerHeight() : 0));

        const hasScrolledPastContainer = scrollTop >= sidebarOffset;

        if (hasScrolledPastContainer) {
            if (!hasClass) {
                $container.addClass('is-sticky');
            }
        } else {
            if (hasClass) {
                // Ensure when re-stickying that the content is scrolled to the top
                $settings.scrollTop(0);

                $container.removeClass('is-sticky');
            }
        }

    }
}

module.exports = StickySidebarComponent;
