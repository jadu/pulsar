/**
 * Pulsar
 *
 * Core UI components that should always be present.
 *
 * Jadu Ltd.
 */

// Fixes issue with dependencies that expect both $ and jQuery to be set
window.jQuery = window.$ = require('jquery');

// Global UI components
var $               = require('jquery'),
	deck            = require('./deck'),
	dropdown        = require('./dropdown'),
	flash           = require('./flash'),
	modal           = require('./modal'),
	tab             = require('./tab'),
	popover         = require('./popover'),
	tooltip         = require('./tooltip'),

	clickover       = require('../libs/bootstrapx-clickover/js/bootstrapx-clickover'),
	// footable		= require('../libs/footable/js/footable'),
	svgeezy         = require('../libs/svgeezy/svgeezy.min'),
	select2         = require('../libs/select2/dist/js/select2.min'),
	toggles         = require('../libs/jquery-toggles/toggles.min'),

	datatables      = require('../libs/datatables/media/js/jquery.dataTables.min'),
	responsive 		= require('../libs/datatables-responsive/js/dataTables.responsive'),
	TableTools 		= require('../libs/datatables-tabletools/js/dataTables.tableTools'),

	ButtonComponent = require('./ButtonComponent'),
	MasterSwitchComponent = require('./masterSwitchComponent'),
	NavMainComponent = require('./navMainComponent'),
	SignInComponent = require('./area/signin/signin');

module.exports = {
	NavMainComponent: NavMainComponent
};

$(function () {

	var $html = $('html');

	buttonComponent = new ButtonComponent($html);
    buttonComponent.init();

    signIn = new SignInComponent($html);
    signIn.initialize();

    masterSwitch = new MasterSwitchComponent($html);
    masterSwitch.init();

    navMain = new pulsar.NavMainComponent($html);
    navMain.init();

    // Switch out .svg for .png for <img> elements in older browsers
    svgeezy.init('nocheck', 'png');

    // Use clickover enhancements for popovers
    $('[rel="clickover"]').clickover({ 'global_close': true });

    // Select2 elements created my form.select2() helper
    $('.js-select2').select2();

	var table = $('.datatable').DataTable({
		dom: '<"dataTables_top"irf><"dataTables_actions"T>t<"dataTables_bottom"lp>',
		aaSorting: [],
		bAutoWidth: false,
		columnDefs: [
			{ "searchable": false, "targets": 0 },
			{ "orderable": false, "targets": 0 }
		],
		oLanguage: {
         sSearch: "Filter:"
	    },
		responsive: {
			details: {
	            type: 'column',
	            target: '.table-child-toggle'
	        }
        },
		stateSave: false,
        tableTools: {
            sRowSelect: "multi",
            sRowSelector: '.js-select',
            aButtons: [
            	{
                    "sExtends":    "collection",
                    "sButtonText": '<i class="icon-check-minus"></i>',
                    "aButtons":    [ "select_all", "select_none" ]
                }
            ]
        }
	});

	// $('.nav-tertiary__toggle').on('click', function() {
	// 	$('.nav-tertiary').toggleClass('is-open');
	// 	$('.content-main').toggleClass('has-tertiary-nav')
	// });

    $('.mobile-menu-button').on('click', function(e) {
        e.preventDefault();

        $('body').toggleClass('open-nav');
        $(this).toggleClass('open');

        if ($(this).text() == 'Menu') {
            $(this).text('Close');
        } else {
            $(this).text('Menu');
        }
    });

	$('a[data-toggle="tab"]').on('shown.bs.tab', function (e) {
  		$($.fn.dataTable.tables(true)).DataTable().columns.adjust().responsive.recalc();
  		console.log('!');
})

});

