/*global define, setTimeout, window */
define([
    'jquery',
    'util'
], function (
    $,
    util
) {
    'use strict';

    var defaults = {
        submitButton: '[data-ui-component=submit]',
        inputField: '[data-ui-component=input]'
    };

    function Greeter(options) {
        options = $.extend({}, defaults, options);
        this.options = options;
    }

    util.extend(Greeter.prototype, {

        disableElem: function (elem) {
            elem.attr('disabled', 'disabled');
        },

        enableElem: function (elem) {
          console.log('enable');
            elem.removeAttr('disabled');
        },

        init: function (parameters) {
            var self = this,
                $submitButton = $(this.options.submitButton),
                $inputField = $(this.options.inputField);

            // Disable the input field on load
            this.disableElem($submitButton);

            // Enable the field when the user starts typing
            $inputField.on('change keyup paste', function () {
                if ($.trim($inputField.val())) {
                    self.enableElem($submitButton);
                } else {
                    self.disableElem($submitButton);
                }
            });
        }

    });

    return Greeter;
});
