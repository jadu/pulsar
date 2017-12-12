const $ = require('jquery');

/**
 * @todo Expand service to cover swapping between scrolling tables and responsive
 * @todo Expand service to accept an options object so options can be set in JS as well as by element data attributes
 */
class DataTableService {

    /**
     * Bind DataTables to element
     * @param {jQuery} $datatables - jQuery object of the element that will initialised as a datatable
     */
    init ($datatables) {
        if (typeof $datatables === 'undefined' || !$datatables.length) {
            throw new Error('$element must be passed to DataTableService');
        }

        // Initiate each table in the collection with options
        $datatables.each((index, table) => {
            const $table = $(table);

            $table.DataTable(this.buildOptions($table));
        });

    }

    /**
     * Destroys the DataTable on the element
     * @param {jQuery} $datatable - jQuery object of the element that will initialised as a datatable
     */
    destroy ($datatable) {
        $datatable.dataTable().fnDestroy();
    }

    /**
     * Build options for DataTable
     * @param {jQuery} $datatable - jQuery object of the element that will initialised as a datatable
     */
    buildOptions ($datatable) {
        const options = {
            'autoWidth': false,
            'buttons': [],
            'dom': '<"dataTables_top"Birf><"dataTables_actions"T><"table-container"t><"dataTables_bottom"lp>',
            'info': true,
            'ordering': false,
            'paging': false,
            'searching': true,
            'language': {
                'emptyTable': 'There are currently no items to display', // this aint working!
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

        if ($datatable.attr('data-datatable-empty-text') !== 'undefined') {
            options.language.emptyTable = $datatable.attr('data-datatable-empty-text');
        }

        return options;
    }

    addRow ($datatable, row) {
        console.log('adding rows...')

        console.log($datatable.DataTable().data();
        // $datatable.DataTable().row.add(row).draw();
    }
}

module.exports = DataTableService;
