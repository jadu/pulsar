class FocusManagementService {
    /**
     * Focus Management Service
     */
    constructor () {
        this.$element = null;
        this.focusableElementList = 'a[href], input, select, textarea, button';
    }

    /**
     * Store element that focus will be returned to
     * @param {jQuery} $element - jQuery wrapper of the element
     */
    storeElement ($element) {
        this.$element = $element;
    }

    /**
     * Return focus to original element
     */
    returnFocusToElement () {
        this.$element.focus();
    }

    /**
     * Check if an element is stored
     */
    hasStoredElement () {
        return this.$element !== null;
    }

    /**
     * Move focus to first focuable element in a collection
     * @param {jQuery} $collection - jQuery collection of elements
     */
    focusFirstFocusableElement ($collection) {
        const $focusableElements = $collection
            .find(this.focusableElementList)
            .not('[tabindex=-1], [disabled], :hidden, [aria-hidden]');

        if ($focusableElements.length) {
            $focusableElements.first().focus();
        }
    }

    /**
     * Trap focus within a container
     * @param {jQuery} $container
     */
    trapFocus ($container) {
        const $focusableElements = $container
            .find(this.focusableElementList)
            .not('[tabindex=-1], [disabled], :hidden, [aria-hidden]');

        $container.on('keydown', this.trapFocusKeydownListener.bind(this, $focusableElements));
    }

    /**
     * Manage focus on keydown
     * @param {jQuery} $container
     * @param {Event} event
     */
    trapFocusKeydownListener ($focusableElements, event) {
        let keyCode = event.keyCode || event.which;

        // If tab key is pressed
        if (keyCode === 9) {
            // Check for shift tab
            if (event.shiftKey) {
                // Focus previous, check if first element is is currently in focus, if so focus last element
                if ($focusableElements.first().is(':focus')) {
                    event.preventDefault();
                    $focusableElements.last().trigger('focus');
                }
            } else {
                // Focus next, check if last element is is currently in focus, if so focus first element
                if ($focusableElements.last().is(':focus')) {
                    event.preventDefault();
                    $focusableElements.first().trigger('focus');
                }
            }
        }
    }
}

module.exports = FocusManagementService;
