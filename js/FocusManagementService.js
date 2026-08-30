class FocusManagementService {
    /**
     * Focus Management Service
     */
    constructor () {
        this.$element = null;
        this.focusableElementList = 'a[href], input, select, textarea, button';
        this.activeFocusTrap = null;
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
     * Move focus to first focusable element in a collection
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
     * Create a focus trap that includes additional elements
     * @param {jQuery} $container - The main container to trap focus within
     * @param {jQuery} [$additionalElements] - Additional elements to include in the focus trap
     */
    trapFocus ($container, $additionalElements) {
        // Remove any existing focus trap
        this.removeFocusTrap();

        // Get focusable elements from the container
        let $focusableElements = $container
            .find(this.focusableElementList)
            .not('[tabindex=-1], [disabled], :hidden, [aria-hidden]');

        // Add any additional elements to the focus trap
        if ($additionalElements && $additionalElements.length) {
            $focusableElements = $focusableElements.add($additionalElements);
        }

        // Ensure all elements are focusable
        $focusableElements.each(function() {
            if ($(this).attr('tabindex') === undefined) {
                $(this).attr('tabindex', '0');
            }
        });

        // Sort elements by their DOM order
        $focusableElements = $($focusableElements.toArray().sort((a, b) => {
            return a.compareDocumentPosition(b) & Node.DOCUMENT_POSITION_FOLLOWING ? -1 : 1;
        }));

        // Store the current focus trap
        this.activeFocusTrap = {
            $container: $container,
            $focusableElements: $focusableElements
        };

        // Add focus trap handler to document
        $(document).on('keydown.focusTrap', this.trapFocusKeydownListener.bind(this, $focusableElements));

        // Add focusout handler to container to ensure focus stays within
        $container.add($additionalElements).on('focusout.focusTrap', (event) => {
            // Use setTimeout to check focus after the event has completed
            setTimeout(() => {
                const $focused = $(document.activeElement);
                if (!$focusableElements.is($focused)) {
                    $focusableElements.first().focus();
                }
            }, 0);
        });
    }

    /**
     * Manage focus on keydown
     * @param {jQuery} $focusableElements - Collection of focusable elements
     * @param {Event} event
     */
    trapFocusKeydownListener ($focusableElements, event) {
        let keyCode = event.keyCode || event.which;

        // If tab key is pressed
        if (keyCode === 9) {
            const $focused = $(document.activeElement);
            
            // If the focused element is not in our focusable elements collection, focus the first element
            if (!$focusableElements.is($focused)) {
                event.preventDefault();
                $focusableElements.first().focus();
                return;
            }

            // Check for shift tab
            if (event.shiftKey) {
                // Focus previous, check if first element is currently in focus, if so focus last element
                if ($focused.is($focusableElements.first())) {
                    event.preventDefault();
                    $focusableElements.last().focus();
                }
            } else {
                // Focus next, check if last element is currently in focus, if so focus first element
                if ($focused.is($focusableElements.last())) {
                    event.preventDefault();
                    $focusableElements.first().focus();
                }
            }
        }
    }

    /**
     * Remove the focus trap
     */
    removeFocusTrap() {
        if (this.activeFocusTrap) {
            this.activeFocusTrap.$container.off('focusout.focusTrap');
            this.activeFocusTrap = null;
        }
        $(document).off('keydown.focusTrap');
    }
}

module.exports = FocusManagementService;

