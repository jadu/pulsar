'use strict';

var $ = require('jquery'),
    StickyScrollBarComponent = require('./StickyScrollBarComponent');

require('datatables.net')(window, $);
require('datatables.net-buttons')(window, $);
require('datatables.net-responsive')(window, $);
require('datatables.net-select')(window, $);
require('../libs/jquery.countdown/dist/jquery.countdown.min');

function PulsarUIComponent(html, history) {
    this.history = history;
    this.$html = html;
    this.$window = $(window);
    this.stickyScrollBarComponent = new StickyScrollBarComponent(this.$window, this.$html);
}

PulsarUIComponent.prototype.init = function () {
    var component = this;

    // Stop disabled links from being interactive
    this.$html.on('click', 'a[disabled]', function(e) {
        e.preventDefault();
    });

    // Watch for push-state requests via data-html attribute
    this.$html.on('click', '[data-href]', function(e) {
        var href = $(this).data('href');
        component.history.pushState({state:1}, href, href);
    });

    this.initTables();
    this.initDataTables();
    this.initCountdown();
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
    var component = this,
        datatables = component.$html.find('.datatable:not(.table--horizontal)'),
        datatablesHorizontal = component.$html.find('.datatable.table--horizontal');

    datatables.each(function () {
        var $this = $(this);

        var select = {
            className: 'dt-row-selected',
            style:     'multi',
            selector:  'td.table-selection'
        }

        var dom = '<"dataTables_top"Birf><"dataTables_actions"T>t<"dataTables_bottom"lip>';

        if (!$this.data('empty-table')) {
            $this.data('empty-table', 'There are currently no items to display');
        }

        if ($this.data('select') === false) {
            dom = '<"dataTables_top"irf><"dataTables_actions"T><"dt-disable-selection"t><"dataTables_bottom"p>';
            select = false;
        }

        let table = $this.DataTable({
            dom: dom,
            aaSorting: [],
            bAutoWidth: false,
            pageLength: 25,
            lengthChange: false,
            buttons: [],
            columnDefs: [
                { className: 'control', orderable: false, targets: 0 },
                { "searchable": false, "targets": [0] },
                { "orderable": false, "targets": [0, 1] }
            ],
            language: {
                "emptyTable": $this.data('empty-table'),
                "info": "Showing _START_ to _END_ of _TOTAL_ items",
                "infoEmpty": 'No items',
                "infoFiltered": " (filtered from _MAX_ items)",
                "zeroRecords": "No items matched your filter, please clear it and try again",
                "search": "Filter records"
            },
            responsive: {
                details: {
                    type: 'column'
                }
            },
            select: select,
            stateSave: false
        });

        $this.on('click', '.js-select-all', function(e) {
            var $checkbox = $(e.target),
                $allCheckboxes = $this.find('.js-select');

            if ($checkbox.hasClass('selected')) {
                table.rows().deselect();
                $checkbox.removeClass('selected');
                $allCheckboxes.removeClass('selected').prop('checked', false);
            } else {
                table.rows().select();
                $checkbox.addClass('selected');
                $allCheckboxes.addClass('selected').prop('checked', true);
            }
        });
    });

    datatablesHorizontal.each(function () {
        var $this = $(this);

        var select = {
            className: 'dt-row-selected',
            style:     'multi',
            selector:  '.js-select',
            info:       true
        }

        var dom = '<"dataTables_top"Birf><"dataTables_actions"T><"table-container"t><"dataTables_bottom"p>';

        if (!$this.data('empty-table')) {
            $this.data('empty-table', 'There are currently no items to display');
        }

        if ($this.data('select') === false) {
            dom = '<"dataTables_top"irf><"dataTables_actions"T><"dt-disable-selection"<"table-container"t>><"dataTables_bottom"lp>';
            select = false;
        }

        let table = $this.DataTable({
            dom: dom,
            aaSorting: [],
            bAutoWidth: false,
            stateSave: true,
            pageLength: 25,
            lengthChange: false,
            buttons: [],
            columnDefs: [
                { className: 'control', orderable: false, targets: 0 },
            ],
            language: {
                "emptyTable": $this.data('empty-table'),
                "info": "Showing _START_ to _END_ of _TOTAL_ items",
                "infoEmpty": 'No items',
                "infoFiltered": " (filtered from _MAX_ items)",
                "zeroRecords": "No items matched your filter, please clear it and try again",
                "search": "Quick filter"
            },
            select: select,
            stateSave: false
        });

        // Add sticky scroll bar
        component.stickyScrollBarComponent.init($this.parent());

        // Init bulk actions menu
        component.toggleBulkActions($this);

        // Rerun bulk actions on row select
        table.on('select deselect', function (e, dt, type, indexes) {
            if (type === 'row') {
                component.toggleBulkActions($this);
            }
        });

            
        $this.on('click', '.js-select-all', function(e) {
            var $checkbox = $(e.target),
                $allCheckboxes = $this.find('.js-select');

            if ($checkbox.hasClass('selected')) {
                table.rows({ search: 'applied' }).deselect();

                $checkbox.removeClass('selected');
                $allCheckboxes.removeClass('selected').prop('checked', false);
            } else {
                table.rows({ search: 'applied' }).select();
                $checkbox.addClass('selected');
                $allCheckboxes.addClass('selected').prop('checked', true);
            }
        });
    });

    // Refresh datatables when tabs are switched, this fixes some layout issues
    this.$html.find('a[data-toggle="tab"]').on('shown.bs.tab', function (e) {
        $($.fn.dataTable.tables(true)).DataTable().columns.adjust().responsive.recalc();
    });

    this.$html.find('.table--horizontal').each(function () {
        var $table = $(this).parent();

        $table.scroll(function () {
            component.styleTableOverflows($table);
        });

        $(window).on('load resize', function () {
            component.styleTableOverflows($table);
        });

        // Add sticky scroll bar
        component.stickyScrollBarComponent.init($table);
    });
};

PulsarUIComponent.prototype.styleTableOverflows = function ($container) {
    var $table = $container.find('.table'),
        tableFullWidth = $table[0].scrollWidth,
        tableVisibleWidth = $container.width();

    // Toggle right hand shadow, if overflowing to the right
    if (tableFullWidth === tableVisibleWidth) {
        $container
            .removeClass('table--overflow-right');
    }
    else {
        $container.addClass('table--overflow-right');
    }

    // Toggle left hand shadow, if overflowing to the left
    if (($table.offsetParent().offset().left - $table.offset().left) > 0) {
        $container.addClass('table--overflow-left');
    }
    else {
        $container.removeClass('table--overflow-left');
    }

    // Remove right hand shadow if table scrolled to right hand edge
    if (-Math.abs((tableFullWidth - tableVisibleWidth - $table.offsetParent().offset().left)) >= $table.offset().left) {
        $container.removeClass('table--overflow-right');
    }
};

PulsarUIComponent.prototype.initCountdown = function () {

    // Initial basic implementation of https://github.com/hilios/jQuery.countdown
    this.$html.find('.js-countdown').each(function () {

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

PulsarUIComponent.prototype.toggleBulkActions = function(table) {
    var table = table.DataTable(),
        count = table.rows({ selected: true }).count(),
        $bulkActionsButton = this.$html.find('.bulk-actions'),
        $bulkActionsBadge = $bulkActionsButton.find('.js-bulk-actions-badge'),
        $bulkActions = this.$html.find('[data-bulk-action]');

    if (count === 0) {
        $bulkActionsBadge.hide();

        $bulkActions
            .addClass('disabled')
            .prop('aria-disabled', 'true')
            .prop('aria-label', 'no rows selected')
            .parent().attr({
                'data-toggle': 'tooltips',
                'data-placement': 'right',
                'data-container': 'body',
                'title': 'Select one or more items to perform this bulk action'
            }).tooltips();
    } 
    else {
        $bulkActionsBadge
            .attr('aria-label', count + ' row' + ((count > 1) ? 's' : '') + ' selected')
            .text(count)
            .show();

        $bulkActions
            .removeClass('disabled')
            .prop('aria-disabled', 'false')
            .parent().tooltips('destroy');
    }
};

module.exports = PulsarUIComponent;
