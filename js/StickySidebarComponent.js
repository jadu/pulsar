'use strict';

var $ = require('jquery');

class StickySidebarComponent {

    /**
     * StickySidebarComponent
     * @constructor 
     * @param {jQuery} $rootWindow - jQuery wrapper of the window object
     * @param {jQuery} $html - jQuery wrapper of the html node
     */
    constructor ($html, window) {
        this.$html = $html;
        this.window = window;
    }

    init () {
        if (typeof this.window === 'undefined' || !this.window) {
            throw new Error('window must be passed to StickySidebarComponent');
        }

        if (typeof this.$html === 'undefined' || !this.$html) {
            throw new Error('$html must be passed to StickySidebarComponent');
        }

        this.sticky()
        $(this.window).on('scroll resize', (event) => this.sticky(event));
    }

    sticky () {
console.log('sticky');        

        const $container = this.$html.find('.tab__container.has-settings .tab__inner');

        if (!$container.length) {
            return false;
        }
        
        let windowTop = $(window).scrollTop(),
            containerTop = $container.offset().top;
console.log(windowTop);
console.log(containerTop);

console.log(this.$html.find('.tab__container.has-settings .tab__content').outerHeight());
console.log(this.$html.find('.tab__container.has-settings .tab__settings').outerHeight());
            
        if (this.$html.find('.tab__container.has-settings .tab__content').outerHeight() > this.$html.find('.tab__container.has-settings .tab__settings').outerHeight()) {
            if (windowTop > containerTop) {
                $container.addClass('is-sticky');
            } else {
                $container.removeClass('is-sticky');
            }
        } else {
            $container.removeClass('is-sticky');
        }
        
    }
}

module.exports = StickySidebarComponent;


// (function($) {
//     function sticky() {
        
//         var windowTop = $(window).scrollTop(),
//             $container = $('.tab__container.has-settings .tab__inner'),
//             $settings = $('.tab__container.has-settings .tab__settings'),
//             containerTop = $container.offset().top;

//         if ($('.tab__container.has-settings .tab__content').outerHeight() > $('.tab__container.has-settings .tab__settings').outerHeight()) {
//             if (windowTop > containerTop) {
//                 $container.addClass('is-sticky');
//             } else {
//                 $container.removeClass('is-sticky');
//             }
//         } else {
//             $container.removeClass('is-sticky');
//         }
//     }

//     sticky();

//     $(window).on('scroll resize', sticky);

// })(jQuery);