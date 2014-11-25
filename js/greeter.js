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
        submitButtonSelector: '[data-ui-component=submit]',
        submitWrapperSelector: '[data-ui-component=submit-wrapper]',
        inputFieldSelector: '[data-ui-component=input]',
        hideClass: 'visually-hidden',
        hintSelector: '[data-ui-component=hint]',
        hintElement: '<p class="greeter__hint visually-hidden" data-ui-component="hint"><i class="icon-hand-up"></i> You should write something first!</p>',
        hoverElement: '<div class="js-hover" style="position: absolute; left: 0; right: 0; top: 0; bottom: 0;"></div>'
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
            elem.removeAttr('disabled');
        },

        registerActions: function() {
            var self = this,
                $inputField = $(this.options.inputFieldSelector),
                $submitButton = $(this.options.submitButtonSelector),
                $submitWrapper = $(this.options.submitWrapperSelector);

            // Disable the submit button on load
            this.disableElem($submitButton);

            /**
             * Add the hint markup and an element to attach hover behavior to.
             *
             * Because we can't bind hover to disabled inputs, we put an
             * absolutely positioned element over the top of the input, and
             * bind to that instead.
             */
            $submitWrapper
              .prepend(this.options.hintElement)
              .append(this.options.hoverElement);

            var $hint = $(this.options.hintSelector);

            /**
             * Show & hide the hint message if nothing has been entered yet and
             * the user is hovering over the submit button.
             */
            $('.js-hover')
              .on('mouseover', function () {
                if (!$.trim($inputField.val())) {
                  $hint
                    .css({
                      opacity: 0
                    })
                    .removeClass(self.options.hideClass)
                    .animate({
                      opacity: 1
                    }, 250);
                }
              })
              .on('mouseout', function () {
                if (!$.trim($inputField.val())) {
                  $hint
                    .animate({
                      opacity: 0
                    }, 250, function() {
                      $(this).addClass(self.options.hideClass)
                    });
                }
              });

            /**
             * Enable the field when the user starts typing, making sure to
             * remove and replace the hover element as we do so.
             */
            $inputField.on('change keyup paste', function () {
                if ($.trim($inputField.val())) {
                    $('.js-hover').detach();
                    self.enableElem($submitButton);
                } else {
                    $submitWrapper.append(self.options.hoverElement);
                    self.disableElem($submitButton);
                }
            });
        },

        init: function (parameters) {
            this.registerActions();
        }

    });

    return Greeter;
});
