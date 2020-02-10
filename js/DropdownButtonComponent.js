'use strict';

const $ = require('jquery')
const Selectors = {
    'DATA_TOGGLE': '[data-toggle=dropdown]',
    'DROP_MENU': '.dropdown__menu',
    'VISIBLE_ITEMS': '.dropdown__menu li a:not(.is-disabled):not(.disabled), .dropdown__menu li button:not(.is-disabled):not(.disabled):not(:disabled)',
    'DISABLED': '.disabled, .is-disabled, :disabled',
    'DROPDOWN': '.dropdown',
    'BTN_GROUP': '.btn__group',
    'BTN_GROUP_OPEN': '.btn__group.open',
    'BTN_GROUP_DROP': '.btn__group.dropdown, .btn__group.dropup',
    'DROPUP': 'dropup',
    'OPEN': 'open'
}
const Keycodes = {
    'ESC': 27,
    'UP': 38,
    'DOWN': 40
}

class DropdownButtonComponent {
    /**
     * DropdownButton
     * @param {jQuery} $html - jQuery wrapper of the html node
     */
    constructor ($html) {
        this.$html = $html;
    }

    /**
     * Initialise component
     */
    init () {
        if (typeof this.$html === 'undefined' || !this.$html.length) {
            throw new Error('$html must be passed to DropdownButtonComponent');
        }

        this.$html
            .on('click', Selectors.DATA_TOGGLE, (event) => this.toggle(event))
            .on('click', (event) => this.handleBodyClick(event))
            .on('keydown', (event) => this.handleEscKeydown(event))
            .on('focusout', Selectors.BTN_GROUP_OPEN, (event) => this.handleDropParentFocusout(event));

        this.$html.find(Selectors.DATA_TOGGLE).on('keydown', (event) => this.handleDropButtonKeydown(event));
        this.$html.find(Selectors.DROP_MENU).on('keydown', (event) => this.handleDropMenuKeydown(event));
    }

    /**
     * Handle toggle
     * @param {Event} event
     */
    toggle (event) {
        const $button = $(event.target).closest(Selectors.DATA_TOGGLE),
            $parent = $button.parent(),
            dropdownOpen = $parent.hasClass(Selectors.OPEN);

        if ($button.is(Selectors.DISABLED)) {
            return;
        }

        this.closeAllDropdowns();

        if (!dropdownOpen) {
            if (event.isDefaultPrevented()) {
                return;
            }

            $parent.toggleClass(Selectors.OPEN);
            $button.attr('aria-expanded', 'true');
        }
    }

    /**
     * Close all dropdowns
     */
    closeAllDropdowns () {
        const dropdownButtons = this.$html.find(Selectors.DATA_TOGGLE);

        dropdownButtons.each((index, button) => {
            let $button = $(button),
                $parent = $button.parent();

            if (!$parent.hasClass(Selectors.OPEN)) {
                return;
            }

            $parent
                .removeClass(Selectors.OPEN)
                .trigger('hidden.bs.dropdown');

            $button.attr('aria-expanded', 'false');
        });
    }

    /**
     * Close all dropdowns on body click
     * @param {Event} event
     */
    handleBodyClick (event) {
        const $clickedElement = $(event.target);

        if ($clickedElement.attr('data-toggle') === 'dropdown' || $clickedElement.closest(Selectors.BTN_GROUP).hasClass(Selectors.OPEN) || $clickedElement.closest(Selectors.DROPDOWN).hasClass(Selectors.OPEN)) {
            return;
        }
        this.closeAllDropdowns();
    }

    /**
     * Close all dropdowns on body click
     * @param {Event} event
     */
    handleEscKeydown (event) {
        const $elementWithFocus = $(':focus');

        if (event.keyCode === Keycodes.ESC) {
            if ($elementWithFocus.closest(Selectors.BTN_GROUP_DROP)) {
                $elementWithFocus.closest(Selectors.BTN_GROUP_DROP).find(Selectors.DATA_TOGGLE).trigger('focus');
            }

            this.closeAllDropdowns();
        }
    }

    /**
     * Open dropdown menu on arrow up or down, depending on dropdown or dropup
     * @param {Event} event
     */
    handleDropButtonKeydown (event) {
        const $keydownElement = $(event.target),
            $parentButtonGroup = $keydownElement.closest(Selectors.BTN_GROUP),
            direction = $parentButtonGroup.hasClass(Selectors.DROPUP) ? 'up' : 'down',
            $dropdownItems = $parentButtonGroup.find(Selectors.VISIBLE_ITEMS);

        if ($keydownElement.is(Selectors.DISABLED)) {
            return;
        }

        if (event.keyCode === Keycodes.DOWN && direction === 'down') {
            event.preventDefault();

            if (!$dropdownItems.length) {
                return;
            }

            if (!$parentButtonGroup.hasClass(Selectors.OPEN)) {
                $keydownElement.trigger('click');
            }

            $dropdownItems.first().trigger('focus');
        }

        if (event.keyCode === Keycodes.UP && direction === 'up') {
            event.preventDefault();

            if (!$dropdownItems.length) {
                return;
            }

            if (!$parentButtonGroup.hasClass(Selectors.OPEN)) {
                $keydownElement.trigger('click');
            }

            $dropdownItems.last().trigger('focus');
        }
    }

    /**
     * Allow arrow key menu navigation
     * @param {Event} event
     */
    handleDropMenuKeydown (event) {
        const codes = [Keycodes.ESC, Keycodes.UP, Keycodes.DOWN],
            $keydownElement = $(event.target),
            $dropdownItems = $keydownElement.closest(Selectors.BTN_GROUP).find(Selectors.VISIBLE_ITEMS);
        const isKey = (key, codes) => codes.filter(code => code === key).length;
        let index;

        if (!isKey(event.keyCode, codes)) {
            return;
        }

        if (!$dropdownItems.length) {
            return;
        }

        event.preventDefault();

        index = $dropdownItems.index($dropdownItems.filter(':focus'));

        if (event.keyCode === Keycodes.UP && index > 0) {
            index--;
        }

        if (event.keyCode === Keycodes.DOWN && index < $dropdownItems.length) {
            index++;
        }

        if (index < 0) {
            index = 0;
        }

        $dropdownItems.eq(index).trigger('focus');
    }

    /**
     * Close drop menu when focus leaves parent btn__group
     */
    handleDropParentFocusout () {
        // Using timeout due to :focus return body when an element loses focus before new element gains focus
        setTimeout(() => {
            const $elementWithFocus = $(':focus');
            if (!$elementWithFocus.closest(Selectors.BTN_GROUP_OPEN).length) {
                this.closeAllDropdowns();
            }
        }, 1);
    }
}

module.exports = DropdownButtonComponent;
