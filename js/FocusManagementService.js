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
        if (this.$element == null) {
            return false;
        } else {
            return true;
        }
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
}

module.exports = FocusManagementService;
