'use strict';

class ModalFocusService {
    /**
     * Trap focus within modals
     * @param {jQuery} $modal - jquery wrapper of the modal markup
     * @param {jQuery} $container - jquery wrapper of the container, typically body
     */
    trapFocus ($modal, $container) {
        const $modalFocusableElements = $modal.find('.modal__content')
                .find('a[href], area[href], input, select, textarea, button, iframe, object, embed, [tabindex], *[contenteditable]')
                .not('[tabindex=-1], [disabled], :hidden, [aria-hidden]');
        const $modalBodyFocusableElements = $modal.find('.modal__body')
                .find('a[href], area[href], input, select, textarea, button, iframe, object, embed, [tabindex], *[contenteditable]')
                .not('[tabindex=-1], [disabled], :hidden, [aria-hidden]');
        const $modalCloseButton = $modal.find('.close[data-dismiss="modal"]').first();
        const $modalFooterCancelButton = $modal.find('.modal__footer [data-dismiss="modal"]').first();

        /**
         * Manage focus
         * If modal has focusable elements in body, focus the first
         * if not, focus the X close button
         * if for some reason it doesn't have that, focus the cancel button in footer
         */
        if ($modalBodyFocusableElements.length) {
            $modalBodyFocusableElements.first().trigger('focus');
        } else if ($modalCloseButton.length) {
            $modalCloseButton.trigger('focus');
        } else {
            $modalFooterCancelButton.trigger('focus');
        }

        /**
         * Trap focus within modal
         */
        $container.on('keydown', this.keydownListener.bind(this, $modalFocusableElements));
    }

    /**
     * Manage focus when tab / shift + tab are pressed
     * @param {jQuery} $modalFocusableelements - jquery wrapper of elements that can gain focus
     * @param {event} event
     */
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

    /**
     * Release focus back to original triggering element
     * @param {$triggeringElement} $triggeringElement - jquery wrapper of the element that triggered the modal
     */
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
