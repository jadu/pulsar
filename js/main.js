
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

});
