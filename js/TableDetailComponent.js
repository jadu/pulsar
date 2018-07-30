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
            '<div class="table-detail t-table-detail" data-table-detail-panel>' +
            '   <div class="table-detail__header">' +
            '       <button type="button" class="close table-detail__header-close" data-table-detail-close-panel aria-hidden="true">&times;</button>' +
            '       <h1 class="table-detail__title" data-table-detail-panel-title>Detail</h1>' +
            '   </div>' +
            '   <div class="table-detail__body" data-table-detail-panel-body></div>' +
            '</div>'
        );

        this.$table = this.$html.find('[data-table-detail-table]');

        // Add backdrop and detail panel if UI contains a table detail pattern
        if (this.$table.length) {
            this.$html.find('body')
                .append('<div class="table-detail-backdrop"></div>')
                .append($panelHtml);
        }

        // Grab detail panel bits we need
        this.$detailPanel = this.$html.find('[data-table-detail-panel]');
        this.$detailPanelBody = this.$html.find('[data-table-detail-panel-body]');
        this.$detailPanelTitle = this.$html.find('[data-table-detail-panel-title]');

        // Open click listener
        this.$table.find('[data-table-detail-view-detail]').on('click', (event) => {
            event.preventDefault();

            let detailContent = $(event.currentTarget).closest('tr').data('table-detail-content');
            let customDetailPanelTitle = $(event.currentTarget).closest('tr').data('table-detail-panel-custom-title');

            this.viewDetail(detailContent, customDetailPanelTitle);
        });

        // Close click listener
        this.$detailPanel.find('[data-table-detail-close-panel]').on('click', (event) => {
            event.preventDefault();
            this.closeDetail();
        });

        //Close with backdrop click
        this.$html.find('.table-detail-backdrop').on('click', (event) => {
            if (this.$html.find('.table-detail-backdrop').hasClass('in')) {
                this.closeDetail();
            };
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

        // Remove any previously added contents
        this.$detailPanelBody.empty();

        // Add attached data to detail panel body
        this.$detailPanelBody.html(content);

        // Apply backdrop
        this.$html.find('.table-detail-backdrop').addClass('in');

        // Open panel
        this.$detailPanel.addClass('table-detail--open');
    }

    /**
     * Hide detail panel and remove backdrop
     */
    closeDetail () {
        // Remove backdrop
        this.$html.find('.table-detail-backdrop').removeClass('in');

        // Close panel
        this.$detailPanel.removeClass('table-detail--open');
    }
}

module.exports = TableDetailComponent;
