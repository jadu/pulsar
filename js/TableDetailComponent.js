class TableDetailComponent {

    /**
     * TableDetailComponent
     * @constructor
     * @param {jQuery} $html - jQuery wrapper of the html node
     */
    constructor ($html) {
        this.$html = $html;
    }

    /**
     * Initialise
     */
    init () {
        if (typeof this.$html === 'undefined' || !this.$html.length) {
            throw new Error('$html must be passed to TableDetailComponent');
        }

        let $panelHtml = $(
            '<div class="table-detail t-table-detail" data-table-detail-panel role="dialog" aria-modal="true" aria-hidden="true">' +
            '   <div class="table-detail__header">' +
            '       <button type="button" class="close table-detail__header-close" data-table-detail-close-panel aria-label="Close" tabindex="-1"><span aria-hidden="true">&times;</span></button>' +
            '       <h1 class="table-detail__title" data-table-detail-panel-title>Detail</h1>' +
            '   </div>' +
            '   <div class="table-detail__body" data-table-detail-panel-body></div>' +
            '</div>'
            ),
            $elementToAppendTo,
            $main = this.$html.find('main'),
            $roleMain = this.$html.find('[role="main"]'),
            $triggeringElement;

        this.$table = this.$html.find('[data-table-detail-table]');

        // If main or role="main" is present append alerts to that (to satify WCAG 1.3.1 Info and Relationships)
        if ($main.length > 0) {
            $elementToAppendTo = $main;
        } else if ($roleMain.length > 0) {
            $elementToAppendTo = $roleMain;
        } else {
            $elementToAppendTo = this.$html.find('body');
        }

        // Add backdrop and detail panel if UI contains a table detail pattern
        if (this.$table.length) {
            $elementToAppendTo
                .append('<div class="table-detail-backdrop"></div>')
                .append($panelHtml);
        }

        // Grab detail panel bits we need
        this.$detailPanel = this.$html.find('[data-table-detail-panel]');
        this.$detailPanelBody = this.$html.find('[data-table-detail-panel-body]');
        this.$detailPanelTitle = this.$html.find('[data-table-detail-panel-title]');
        this.$tableDetailBackdrop = this.$html.find('.table-detail-backdrop');

        // Open click listener
        this.$table.find('[data-table-detail-view-detail]').on('click', (event) => {
            event.preventDefault();
            let detailContent = $(event.currentTarget).closest('tr').data('table-detail-content');
            let customDetailPanelTitle = $(event.currentTarget).closest('tr').data('table-detail-panel-custom-title');
            $triggeringElement = $(event.target);

            this.viewDetail(detailContent, customDetailPanelTitle);
        });

        // Close click listener
        this.$detailPanel.find('[data-table-detail-close-panel]').on('click', (event) => {
            event.preventDefault();
            this.closeDetail();
            $triggeringElement.focus();
        });

        // Close with backdrop click
        this.$tableDetailBackdrop.on('click', (event) => {
            event.preventDefault();
            if (this.$tableDetailBackdrop.hasClass('in')) {
                this.closeDetail();
                $triggeringElement.focus();
            }
        });

        // Close ESC button
        this.$html.on('keydown', (event) => {
            if (event.keyCode === 27) {
                this.closeDetail();
                $triggeringElement.focus();
            }
        });
    }
    /**
     * Show detail panel and populate with content and optional custom title
     * @param {String} content - string of html content to populate the detail panel body with
     * @param {String} customDetailPanelTitle - optinal custom detail panel title specific to the row clicked
     */
    viewDetail (content, customDetailPanelTitle) {
        // Set the title if present
        if (customDetailPanelTitle) {
            this.$detailPanelTitle.html(customDetailPanelTitle);
        }

        // Remove aria-hidden so SR can read
        this.$detailPanel.removeAttr('aria-hidden');

        // Remove any previously added contents
        this.$detailPanelBody.empty();

        // Add attached data to detail panel body
        this.$detailPanelBody.html(content);

        // Apply backdrop
        this.$tableDetailBackdrop.addClass('in');

        // Open panel
        this.$detailPanel.addClass('table-detail--open');

        // Make elements focusable again
        this.$detailPanel
            .find('a[href], area[href], input, select, textarea, button, iframe, object, embed, [tabindex], *[contenteditable]')
            .not('[disabled], :hidden, [aria-hidden]')
            .removeAttr('tabindex');

        // Trap focus within the panel
        this.trapFocus();
    }

    /**
     * Hide detail panel and remove backdrop
     */
    closeDetail () {
        // Remove backdrop
        this.$tableDetailBackdrop.removeClass('in');

        // Close panel
        this.$detailPanel.removeClass('table-detail--open');

        // Hide panel contents from screen readers
        this.$detailPanel.attr('aria-hidden', 'true');

        // Make sure focusable elemnts cannot gain focus whilst panel is closed
        this.$detailPanel
            .find('a[href], area[href], input, select, textarea, button, iframe, object, embed, [tabindex], *[contenteditable]')
            .not('[tabindex=-1], [disabled], :hidden, [aria-hidden]')
            .attr('tabindex', '-1');

        // Remove previously bound listener
        this.$html.off('keydown', this.boundKeydownListener);
    }

    /**
     * Listen for keyboard navigation, trap tabbing within the panels focusable elements
     * @param {jQuery} $focusableElements - Collection of focusable elements in the details panel
     */
    keydownListener ($focusableElements, event) {
        const keyCode = event.keyCode || event.which;

        // If tab key is pressed
        if (keyCode === 9) {
            // Check for shift tab
            if (event.shiftKey) {
                // Focus previous, check if first element is is currently in focus, if so focus last element
                if ($focusableElements.first().is(':focus')) {
                    event.preventDefault();
                    $focusableElements.last().focus();
                }
            } else {
                // Focus next, check if last element is is currently in focus, if so focus first element
                if ($focusableElements.last().is(':focus')) {
                    event.preventDefault();
                    $focusableElements.first().focus();
                }
            }
        }
    }

    /**
     * Trap keyboard focus in the panel
     */
    trapFocus () {
        let $focusablePanelBodyElements = this.$detailPanelBody
                .find('a[href], area[href], input, select, textarea, button, iframe, object, embed, [tabindex], *[contenteditable]')
                .not('[tabindex=-1], [disabled], :hidden, [aria-hidden]'),
            $focusableElements = this.$detailPanel
                .find('a[href], area[href], input, select, textarea, button, iframe, object, embed, [tabindex], *[contenteditable]')
                .not('[tabindex=-1], [disabled], :hidden, [aria-hidden]');

        // If the panel body contains a focusable element we should focus that rather than the close button
        if ($focusablePanelBodyElements.length > 0) {
            $focusablePanelBodyElements.first().focus();
        } else {
            this.$detailPanel.find('[data-table-detail-close-panel]').focus();
        }

        this.boundKeydownListener = this.keydownListener.bind(this, $focusableElements);
        this.$html.on('keydown', this.boundKeydownListener);
    }
}

module.exports = TableDetailComponent;
