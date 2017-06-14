'use strict';

var $ = require('jquery'),
    $window = window;

require('datatables.net')($window, $);
require('datatables.net-buttons')($window, $);
require('datatables.net-responsive')($window, $);
require('datatables.net-select')($window, $);
require('../libs/jquery.countdown/dist/jquery.countdown.min');

function PulsarUIComponent(html, history) {

    this.history = history;
    this.$html = html;

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
}

PulsarUIComponent.prototype.initTables = function () {

    // Wrap non datatable tables in responsive container so they can scroll
    // when required
    var $tables = this.$html.find('.table:not(.datatable), .table--datagrid:not(.datatable), .table--horizontal');

    $tables.each(function(i, v) {
        var $table = $(v);

        if (!$table.parent().hasClass('table-container')) {
            $table.wrap('<div class="table-container"></div>');
        }
    });
};

PulsarUIComponent.prototype.initDataTables = function () {

    var component = this,
        datatables = this.$html.find('.datatable:not(.table--horizontal)'),
        scrollingDatatables = this.$html.find('.datatable.table--horizontal');

    datatables.each(function() {
        var $this = $(this);

        var select = {
            className: 'dt-row-selected',
            style:     'multi',
            selector:  'td.table-selection'
        }

        var dom = '<"dataTables_top"Birf><"dataTables_actions"T>t<"dataTables_bottom"lp>';

        if (!$this.data('empty-table')) {
            $this.data('empty-table', 'There are currently no items to display');
        }

        if ($this.data('select') === false) {
            dom = '<"dataTables_top"irf><"dataTables_actions"T><"dt-disable-selection"t><"dataTables_bottom"lp>';
            select = false;
        }

        $this.DataTable({
            dom: dom,
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
            fixedColumns: true,
            language: {
                "emptyTable": $this.data('empty-table'),
                "info": "Showing _START_ to _END_ of _TOTAL_ items",
                "infoEmpty": 'No items',
                "infoFiltered": " (filtered from _MAX_ items)",
                "zeroRecords": "No items matched your filter, please clear it and try again"
            },
            responsive: {
                details: {
                    type: 'column'
                }
            },
            select: select,
            stateSave: false
        });
    });

     scrollingDatatables.each(function() {
        var $this = $(this);

        var select = {
            className: 'dt-row-selected',
            style:     'multi',
            selector:  'td.table-selection'
        };

        var dom = '<"dataTables_top"Birf><"dataTables_actions"T>t<"dataTables_bottom"lp>';

        if (!$this.data('empty-table')) {
            $this.data('empty-table', 'There are currently no items to display');
        }

        if ($this.data('select') === false) {
            dom = '<"dataTables_top"irf><"dataTables_actions"T><"dt-disable-selection"t><"dataTables_bottom"lp>';
            select = false;
        }

        $this.DataTable({
            dom: dom,
            aaSorting: [],
            bAutoWidth: false,
            "bScrollCollapse": true,
            buttons: [
                'selectAll',
                'selectNone'
            ],
            columnDefs: [
                { className: 'control', orderable: false, targets: 0 },
                { "searchable": false, "targets": [0, 1] },
                { "orderable": false, "targets": [0, 1] }
            ],
            language: {
                "emptyTable": $this.data('empty-table'),
                "info": "Showing _START_ to _END_ of _TOTAL_ items",
                "infoEmpty": 'No items',
                "infoFiltered": " (filtered from _MAX_ items)",
                "zeroRecords": "No items matched your filter, please clear it and try again"
            },
            scrollX: true,
            select: select,
            stateSave: false
        });

        $this.closest('.dataTables_scrollBody').scroll(function() {
            component.styleTableOverflows();
        });
    });

    // Refresh datatables when tabs are switched, this fixes some layout issues
    this.$html.find('a[data-toggle="tab"]').on('shown.bs.tab', function (e) {
        component.refreshDatatables();
    });

    this.$html.find('.table--horizontal').each(function() {
        var $table = $(this).parent();

        $table.scroll(function() {
            component.styleTableOverflows($table);
        });

        $($window).on('load resize', function () {
            component.styleTableOverflows($table);
        });
    });
};

PulsarUIComponent.prototype.styleTableOverflows = function ($container) {

    var $table = $container.find('.table'),
        tableFullWidth = $table[0].scrollWidth,
        tableVisibleWidth = $container.width();
        console.log(tableFullWidth);
        console.log(tableVisibleWidth);

    // Toggle right hand shadow, if overflowing to the right
    if (tableFullWidth === tableVisibleWidth) {
        console.log('a');
        $container
            .removeClass('table--overflow-right');
    }
    else {
        console.log('b');
        $container.addClass('table--overflow-right');
    }

    // Toggle left hand shadow, if overflowing to the left
    if (($table.offsetParent().offset().left - $table.offset().left) > 0) {
        console.log('c');
        $container.addClass('table--overflow-left');
    }
    else {
        console.log('d');
        $container.removeClass('table--overflow-left');
    }

    // Remove right hand shadow if table scrolled to right hand edge
    if (-Math.abs((tableFullWidth - tableVisibleWidth - $table.offsetParent().offset().left)) >= $table.offset().left) {
        console.log('e');
        $container.removeClass('table--overflow-right');
    }
};

PulsarUIComponent.prototype.initCountdown = function () {

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

module.exports = PulsarUIComponent;
