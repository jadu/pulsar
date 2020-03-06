'use strict';

class ModalFocusService {
    trapFocus ($modal, $container) {
        let $modalFocusableElements = $modal.find('.modal__content')
                .find('a[href], area[href], input, select, textarea, button, iframe, object, embed, [tabindex], *[contenteditable]')
                .not('[tabindex=-1], [disabled], :hidden, [aria-hidden]'),
            $modalHasForm = $modal.find('.modal__content form').length > 0;

        // If modal contains a form, we should focus the first field, otherwise focus the close button
        if ($modalHasForm) {
            $modal.find('.modal__content form :input:not(input[type=button]):not(button):not([disabled]):not([aria-hidden]):visible:first').trigger('focus');
        } else {
            $modal.find('.modal__header .close').trigger('focus');
        }

        $container.on('keydown', this.keydownListener.bind(this, $modalFocusableElements));
    }

    keydownListener ($modalFocusableelements, event) {
        let keyCode = event.keyCode || event.which;

        // If tab key is pressed
        if (keyCode === 9) {
            // Check for shift tab
            if (event.shiftKey) {
                // Focus previous, check if first element is is currently in focus, if so focus last element
                if ($modalFocusableelements.first().is(':focus')) {
                    event.preventDefault();
                    $modalFocusableelements.last().trigger('focus');
                }
            } else {
                // Focus next, check if last element is is currently in focus, if so focus first element
                if ($modalFocusableelements.last().is(':focus')) {
                    event.preventDefault();
                    $modalFocusableelements.first().trigger('focus');
                }
            }
        }
    }

    releaseFocus ($triggeringElement) {
        if ($triggeringElement.closest('.dropdown__menu').length) {
            // If triggering link is in a button group / dropdown, return focus to the surrounding button
            $triggeringElement.closest('.btn__group').find('.btn.dropdown__toggle').trigger('focus');
        } else {
            // Else return it to the triggering link
            $triggeringElement.trigger('focus');
        }
    }
}

module.exports = ModalFocusService;
