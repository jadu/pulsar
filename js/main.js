(function ($) {

    // Protect IE8 from any erroneous console.log uses which would break everything
    if (!window.console) {
        console = { log: function() {} }
    };

    var $html = $('html');

    pulsar.button       = new pulsar.ButtonComponent($html);
    pulsar.flash        = new pulsar.FlashMessageComponent($html);
    pulsar.pulsarForm   = new pulsar.PulsarFormComponent($html);
    pulsar.pulsarUI     = new pulsar.PulsarUIComponent($html);
    pulsar.signIn       = new pulsar.SignInComponent($html);
    pulsar.masterSwitch = new pulsar.MasterSwitchComponent($html);
    pulsar.navMain      = new pulsar.NavMainComponent($html);

    $(function () {

        pulsar.button.init();
        pulsar.flash.init();
        pulsar.pulsarForm.init();
        pulsar.pulsarUI.init();
        pulsar.signIn.init();
        pulsar.masterSwitch.init();
        pulsar.navMain.init();

        // Switch out .svg for .png for <img> elements in older browsers
        pulsar.svgeezy.init('nocheck', 'png');

        // Use clickover enhancements for popovers
        $('[rel="clickover"]').clickover({ 'global_close': true });

        // Open navigation (should be added to NavMainComponent)
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

    });

}(jQuery));
