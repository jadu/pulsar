var $             = require('jquery'),
    dt            = require('datatables.net')(window, $),
var $             = require('jquery'),
    dt_buttons    = require('datatables.net-buttons')(window, $),
    dt_responsive = require('datatables.net-responsive')(window, $),
    dt_select     = require('datatables.net-select')(window, $),
    countdown     = require('../libs/jquery.countdown/dist/jquery.countdown.min');

function PulsarUIComponent(html) {

    this.$html = html;

};

PulsarUIComponent.prototype.init = function () {

    var component = this;

    // Stop disabled links from being interactive
    this.$html.on('click', 'a[disabled]', function(e) {
        e.preventDefault();
    });

    this.initTables();
    this.initDataTables();

    // Initial basic implementation of https://github.com/hilios/jQuery.countdown
    this.$html.find('.js-countdown').each(function() {

        var $this = $(this),
            format = '%ww %dd %Hh %Mm %S';

        if (typeof $this.data('format') !== 'undefined') {
            format = $this.data('format');
        }

        $this.countdown($this.data('final-date'), function(event) {
            $this.html(event.strftime(format));
        });
    });

};

PulsarUIComponent.prototype.initTables = function () {

    // Wrap non datatable tables in responsive container so they can scroll
    // when required
    var $tables = this.$html.find('.table:not(.datatable), .table--datagrid:not(.datatable)');

    $tables.each(function(i, v) {
        var $table = $(v);

        if (!$table.parent().hasClass('table-container')) {
            $table.wrap('<div class="table-container"></div>');
        }
    });
};

PulsarUIComponent.prototype.initDataTables = function () {

    this.$html.find('.datatable').DataTable({
        dom: '<"dataTables_top"Birf><"dataTables_actions"T>t<"dataTables_bottom"lp>',
        aaSorting: [],
        bAutoWidth: false,
        buttons: [
            'selectAll',
            'selectNone'
        ],
        columnDefs: [
            { className: 'control', orderable: false, targets: 0 },
            { "searchable": false, "targets": [0, 1] },
            { "orderable": false, "targets": [0, 1] }
        ],
        oLanguage: {
         sSearch: "Filter:"
        },
        language: {
            buttons: {
                selectAll: "Select all items",
                selectNone: "Select none"
            }
        },
        responsive: {
            details: {
                type: 'column'
            }
        },
        select: {
            className: 'dt-row-selected',
            style:     'multi',
            selector:  'td.table-selection'
        },
        stateSave: false
    });

    // Refresh datatables when tabs are switched, this fixes some layout issues
    this.$html.find('a[data-toggle="tab"]').on('shown.bs.tab', function (e) {
        $($.fn.dataTable.tables(true)).DataTable().columns.adjust().responsive.recalc();
    });
};

module.exports = PulsarUIComponent;
