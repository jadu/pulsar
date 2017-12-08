const $ = require('jquery');
const dt = require('datatables.net')(window, $),
const dt_buttons = require('datatables.net-buttons')(window, $),
const dt_responsive = require('datatables.net-responsive')(window, $),
const dt_select = require('datatables.net-select')(window, $),

/**
 * @todo Expand service to cover swapping between scrolling tables and responsive
 * @todo Expand service to accept an options object so options can be set in JS as well as by element data attributes
 */
class DataTableService {
    
    /**
     * Bind DataTables to element
     * @param {jQuery} $element - jQuery object of the element that will initialised as a datatable
     */
    init ($element) {
        let options;

        if (typeof $element === 'undefined' || !$element) {
            throw new Error('$element must be passed to DataTableService');
        }

        if ($element.length) {
            
            // Build options from data attributes
            options = this.optionBuilder($element);

            // Init datatable with options
            $element.DataTable(options);
        }
    }

    /**
     * Destroys the DataTable on the element
     * @param {jQuery} $element - jQuery object of the element that will initialised as a datatable
     */
    destroy ($element) {
        $datatable.dataTable().fnDestroy();
    }

    /**
     * Build options for DataTable
     * @param {jQuery} $element - jQuery object of the element that will initialised as a datatable
     */
    optionBuilder ($datatable) {
        let options = {
            'autoWidth': false,
            'buttons': [],
            'dom': '<"dataTables_top"Birf><"dataTables_actions"T><"table-container"t><"dataTables_bottom"lp>',
            'info': false,
            'ordering': false,
            'paging': false,
            'searching': false,
            'language': {
                'emptyTable': 'There are currently no items to display',
                'info': 'Showing _START_ to _END_ of _TOTAL_ items',
                'infoEmpty': 'No items',
                'infoFiltered': ' (filtered from _MAX_ items)',
                'zeroRecords': 'No items matched your filter, please clear it and try again'
            }
        };

        if ($datatable.attr('data-datatable-paginated')) {
            options.paging = true;
            options.info = true;
            options.searching = true;
        }

        if ($datatable.attr('data-datatable-responsive')) {
            options.responsive = {
                'details': {
                    type: 'column',
                    target: '.table-child-toggle'
                }
            };
        }

        if (typeof $datatable.attr('data-datatable-empty-text') !== 'undefined') {
            options.language.emptyTable = $datatable.attr('data-datatable-empty-text');
        }

        return options;
    }
}

module.exports = DataTableService;