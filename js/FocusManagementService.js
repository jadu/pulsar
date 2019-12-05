const $ = require('jquery'); // might not need

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
     * @param element {HTMLElement}
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
     * Move focus to first focuable element in a collection
     * @param jquery? or do we want to jqery in here?
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
