class StickyScrollBarComponent {

    /**
     * StickyScrollBarComponent
     * @constructor
     * @param {jQuery} $rootWindow - jQuery wrapper of the window object
     * @param {jQuery} $html - jQuery wrapper of the html node
     */
    constructor ($rootWindow, $html) {
        this.$window = $rootWindow;
        this.$html = $html;
        this.$stickyScrollBar = $('<div class="sticky-scrollbar"><div class="sticky-scrollbar__inner"></div></div>');
        this.$stickyScrollBarInner = this.$stickyScrollBar.children();
        // cache methods with context
        this.scrollStickyScrollBarWithContext = this.scrollStickyScrollBar.bind(this);
        this.scrollElementWithStickyScrollBarByScrollBarWithContext = this.scrollElementWithStickyScrollBarByScrollBar.bind(this);
        this.updateStickyScrollBarWithContext = this.updateStickyScrollBar.bind(this);
    }

    /**
     * Initialise
     * @param {jQuery} $element - jQuery object of the element that requires a sticky scroll bar
     */
    init ($element) {
        if (typeof $element === 'undefined' || !$element) {
            throw new Error('an element to add the scroller to must be passed to StickyScrollBarComponent');
        }

        if (typeof this.$window === 'undefined' || !this.$window) {
            throw new Error('window must be passed to StickyScrollBarComponent');
        }

        if (typeof this.$html === 'undefined' || !this.$html) {
            throw new Error('$html must be passed to StickyScrollBarComponent');
        }

        // Set $elementWithStickyScrollBar
        this.$elementWithStickyScrollBar = $element;
    
        // Add the sticky scroll bar
        this.$stickyScrollBar.appendTo(this.$elementWithStickyScrollBar);

        // Init the sticky scroll bar
        this.$stickyScrollBar
            .addClass('u-display-none')
            .on('scroll', this.scrollElementWithStickyScrollBarByScrollBarWithContext);

        // Call on load
        this.updateStickyScrollBar();

        // Call on scroll and window resize
        this.$window.on('scroll resize', this.updateStickyScrollBarWithContext);
    }

    /**
     * Set $elementWithStickyScrollBar scroll when scrolled by sticky scroll bar
     */
    scrollElementWithStickyScrollBarByScrollBar () {
        this.$elementWithStickyScrollBar.scrollLeft(this.$stickyScrollBar.scrollLeft());
    }

    /**
     * Set $stickyScrollBar scroll when $elementWithStickyScrollBar is scrolled
     */
    scrollStickyScrollBar () {
        this.$stickyScrollBar.scrollLeft(this.$elementWithStickyScrollBar.scrollLeft());
    }

    /**
     * Toggle visiblity of sticky scroll bar
     */
    showStickyScrollBar (option) {
        if (option) {
            this.$stickyScrollBar.removeClass('u-display-none');
        } else {
            this.$stickyScrollBar.addClass('u-display-none');
        }
    }

    /**
     * Update sticky scroll bar visibility, thumb position and width
     */
    updateStickyScrollBar () {
        const { top } = this.$elementWithStickyScrollBar.offset();
        const bottom = top + this.$elementWithStickyScrollBar.height();
        const topOffset = 30;
        let viewportBottom;

        // Allow for footer
        if (this.$html.find('.footer').css('position') === 'fixed') {
            viewportBottom = this.$window.scrollTop() + this.$window.height() - this.$html.find('.footer').outerHeight();
        } else {
            viewportBottom = this.$window.scrollTop() + this.$window.height();
        }

        // Check if the $elementWithStickyScrollBar is visible but bottom is outside of viewport
        if (top + topOffset < viewportBottom && bottom > viewportBottom) {

            // Check if the $elementWithStickyScrollBar has a scrollbar
            const scroll = this.$elementWithStickyScrollBar.scrollLeft();
            const scrollMax = this.$elementWithStickyScrollBar[0].scrollWidth - this.$elementWithStickyScrollBar[0].clientWidth
            const widthOuter = this.$elementWithStickyScrollBar.innerWidth();
            const widthInner = widthOuter + scrollMax;

            this.$elementWithStickyScrollBar.scrollLeft(scroll);

            // Abort if the $elementWithStickyScrollBar doesn't have a scrollbar
            if (widthInner <= widthOuter) {
                return; 
            }

            // Show sticky scroll bar
            this.showStickyScrollBar(true);

            // Sync sticky scroll bar if $elementWithStickyScrollBar content is scrolled
            this.$elementWithStickyScrollBar.off('scroll', this.scrollStickyScrollBarWithContext);
            this.$elementWithStickyScrollBar.on('scroll', this.scrollStickyScrollBarWithContext);

            // Adjust the sticky scroll bar scrollbar
            this.$stickyScrollBar
                .css({
                    left: this.$elementWithStickyScrollBar.offset().left - this.$window.scrollLeft(),
                    width: widthOuter
                })
                .scrollLeft(scroll);

            // Set sticky scroll bar width
            this.$stickyScrollBarInner.width(widthInner);

        } else {
            // Hide when not needed
            this.showStickyScrollBar(false);
        }
    }
}

module.exports = StickyScrollBarComponent;
