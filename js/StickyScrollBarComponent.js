class StickyScrollerComponent {

    /**
     * StickyScrollerComponent
     * @constructor
     * @param {jQuery} $rootWindow - jQuery wrapper of the window object
     */
    constructor ($rootWindow) {
        this.$scrollableElement = {};
        this.$window = $rootWindow;
        this.$scroller = $('<div class="sticky-scrollbar"><div class="sticky-scrollbar__inner"></div></div>');
        this.$scrollerInner = this.$scroller.children();
        // cache methods with context
        this.scrollStickyScrollBarWithContext = this.scrollStickyScrollBar.bind(this);
        this.scrollScrollableElemtentByScrollBarWithContext = this.scrollScrollableElemtentByScrollBar.bind(this);
        this.updateStickyScrollBarWithContext = this.updateStickyScrollBar.bind(this);
    }

    /**
     * Initialise
     * @param {jQuery} $element - jQuery object of the element that requires a sticky scroller
     */
    init ($element) {
        if (!$element.length) {
            throw new Error('an element to add the scroller to must be passed to StickyScrollerComponent');
        }

        if (!this.$window.length) {
            throw new Error('window must be passed to StickyScrollerComponent');
        }

        // Set element
        this.$scrollableElement = $element;
    
        // Add scroller
        this.$scroller.appendTo(this.$scrollableElement);

        // Init the sticky scroll bar
        this.$scroller
            .addClass('hide')
            .on('scroll', this.scrollScrollableElemtentByScrollBarWithContext);

        // Call on load
        this.updateStickyScrollBarWithContext();

        // Call on scroll and window resize
        this.$window.on('resize', this.updateStickyScrollBarWithContext);
        this.$window.on('scroll', this.updateStickyScrollBarWithContext);
    }

    /**
     * Set $scrollableElement scroll when scrolled by sticky scroll bar
     */
    scrollScrollableElemtentByScrollBar () {
        this.$scrollableElement.scrollLeft(this.$scroller.scrollLeft());
    }

    /**
     * Set $scroller scroll when $scrollableElement is scrolled
     */
    scrollStickyScrollBar () {
        this.$scroller.scrollLeft(this.$scrollableElement.scrollLeft());
    }

    /**
     * Toggle visiblity of fake scroll bar
     */
    showScrollBar (option) {
        if (option) {
            this.$scroller.removeClass('hide');
        } else {
            this.$scroller.addClass('hide');
        }
    }

    /**
     * Update fake scroll bar visibility, thumb position and width
     */
    updateStickyScrollBar () {
        const top = this.$scrollableElement.offset().top;
        const bottom = top + this.$scrollableElement.height();
        const viewportBottom = this.$window.scrollTop() + this.$window.height();
        const topOffset = 30;

        // Check if the scrollableElement is visible but bottom is outside of viewport
        if (top + topOffset < viewportBottom && bottom > viewportBottom) {

            // Check if the $scrollableElement has a scrollbar
            const scroll = this.$scrollableElement.scrollLeft();
            const scrollMax = this.$scrollableElement.scrollLeft(99999999).scrollLeft(); // Magic number, get the max scroll by scrolling futher than any potential window size
            const widthOuter = this.$scrollableElement.innerWidth();
            const widthInner = widthOuter + scrollMax;

            this.$scrollableElement.scrollLeft(scroll);

            // Abort if the scrollableElement doesn't have a scrollbar
            if (widthInner <= widthOuter) {
                return; 
            }

            // Show fake scroll bar
            this.showScrollBar(true);

            // Sync floating scrollbar if scrollableElement content is scrolled
            this.$scrollableElement.off('scroll', this.scrollStickyScrollBarWithContext);
            this.$scrollableElement.on('scroll', this.scrollStickyScrollBarWithContext);

            // Adjust the floating scrollbar
            this.$scroller
                .css({
                    left: this.$scrollableElement.offset().left - this.$window.scrollLeft(),
                    width: widthOuter
                })
                .scrollLeft(scroll);

            // Set fake scrollbar width
            this.$scrollerInner.width(widthInner);

        } else {
            // Hide when not needed
            this.showScrollBar(false);
        }
    }
}

module.exports = StickyScrollerComponent;
