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
	svgeezy         = require('../libs/svgeezy/svgeezy.min'),
	toggles         = require('../libs/jquery-toggles/toggles.min'),

	datatables      = require('../libs/datatables/media/js/jquery.dataTables.min'),
	FixedHeader 	= require('../libs/DataTables-FixedHeader/js/dataTables.fixedHeader'),

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

	var table = $('.table').DataTable({
		"dom": '<"dataTables_top"irf>t<"dataTables_bottom"lp>',
		"aaSorting": [],
		"columnDefs": [
			{ "searchable": false, "targets": 0 },
			{ "orderable": false, "targets": 0 }
		]
	});

	new $.fn.dataTable.FixedHeader( table );

});

