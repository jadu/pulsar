(function ($) {

    // Protect IE8 from any erroneous console.log uses which would break everything
    if (!window.console) {
        console = { log: function() {} }
    };

    var $html = $('html');

    $html.removeClass('no-js');

    pulsar.button       = new pulsar.ButtonComponent($html);
    pulsar.flash        = new pulsar.FlashMessageComponent($html);
    pulsar.helpText     = new pulsar.HelpTextComponent($html, window, document);
    pulsar.pulsarForm   = new pulsar.PulsarFormComponent($html);
    pulsar.pulsarUI     = new pulsar.PulsarUIComponent($html);
    pulsar.signIn       = new pulsar.SignInComponent($html);
    pulsar.masterSwitch = new pulsar.MasterSwitchComponent($html);
	pulsar.modulePermissions = new pulsar.ModulePermissionsComponent($html);
    pulsar.navMain      = new pulsar.NavMainComponent($html);

    $(function () {

        pulsar.button.init();
        pulsar.flash.init();
        pulsar.helpText.init();
        pulsar.helpText.updateHelpSidebar();
        pulsar.pulsarForm.init();
        pulsar.pulsarUI.init();
        pulsar.signIn.init();
        pulsar.masterSwitch.init();
        pulsar.modulePermissions.init();
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
    });

}(jQuery));
