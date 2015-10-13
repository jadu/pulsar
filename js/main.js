
var $html = $('html');

pulsar.buttonComponent = new pulsar.ButtonComponent($html);
pulsar.flash           = new pulsar.FlashMessageComponent($html);
pulsar.signIn          = new pulsar.SignInComponent($html);
pulsar.masterSwitch    = new pulsar.MasterSwitchComponent($html);

$(function () {

    pulsar.buttonComponent.init();
    pulsar.flash.init();
    pulsar.signIn.init();
    pulsar.masterSwitch.init();

    // Switch out .svg for .png for <img> elements in older browsers
    pulsar.svgeezy.init('nocheck', 'png');

    // Use clickover enhancements for popovers
    $('[rel="clickover"]').clickover({ 'global_close': true });

    // Select2 elements created by form.select2() helper
    $('.js-select2').select2();

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

    // Refresh datatables when tabs are switched, this fixes some layout issues
    $('a[data-toggle="tab"]').on('shown.bs.tab', function (e) {
        $($.fn.dataTable.tables(true)).DataTable().columns.adjust().responsive.recalc();
        console.log('!');
    });

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
