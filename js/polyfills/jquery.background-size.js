/**
 * jQuery plugin to add support for CSS3 background-size property in older browsers
 */

/*global jQuery */
(function ($) {
    'use strict';

    var nativelySupported = typeof $('<div>').css('background-size') !== 'undefined';

    $.fn.backgroundSize = nativelySupported ? function () {
        return this;
    } : function () {
        return this.each(function () {
            var $element = $(this),
                elementOffset,
                $image,
                imageOffset,
                src = ($element.css('background-image').match(/^url\(("?)(.*)\1\)$/) || [])[2];

            $element[0].style.cssText += ' background-image: none !important';
            $image = $('<img />').attr('src', src).css({
                'position': 'relative',
                'display': 'block'
            }).prependTo($element);
            elementOffset = $element.offset();
            imageOffset = $image.offset();
            $image.css({
                'left': -(imageOffset.left - elementOffset.left) + 'px',
                'top': -(imageOffset.top - elementOffset.top) + 'px',
                'width': $element.width(),
                'height': $element.height()
            });
        });
    };
}(jQuery));
