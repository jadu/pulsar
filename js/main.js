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

        new chartist.Line('.ct-chart', {
            labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August'],
            series: [
                [6, 8, 12, 6, 9, 7, 8, 10]
            ]
            }, {
                fullWidth: true,
                chartPadding: {
                    right: 40
                }
            }
        );

        $('input[name="daterange"]').daterangepicker({
            "ranges": {
                "Today": [
                    "2016-07-27T11:54:09.395Z",
                    "2016-07-27T11:54:09.395Z"
                ],
                "Yesterday": [
                    "2016-07-26T11:54:09.395Z",
                    "2016-07-26T11:54:09.395Z"
                ],
                "Last 7 Days": [
                    "2016-07-21T11:54:09.395Z",
                    "2016-07-27T11:54:09.395Z"
                ],
                "Last 30 Days": [
                    "2016-06-28T11:54:09.395Z",
                    "2016-07-27T11:54:09.395Z"
                ],
                "This Month": [
                    "2016-06-30T23:00:00.000Z",
                    "2016-07-31T22:59:59.999Z"
                ],
                "Last Month": [
                    "2016-05-31T23:00:00.000Z",
                    "2016-06-30T22:59:59.999Z"
                ]
            },
            "alwaysShowCalendars": true,
            "startDate": "07/21/2016",
            "endDate": "07/27/2016",
            "locale": {
                "format": "MM/DD/YYYY",
                "separator": " - "
            },
            "opens": "left"
        }, function(start, end, label) {
              console.log("New date range selected: ' + start.format('YYYY-MM-DD') + ' to ' + end.format('YYYY-MM-DD') + ' (predefined range: ' + label + ')");
        });

        $('a[data-toggle="tab"]').on('shown.bs.tab', function (e) {
            $('.ct-chart').get(0).__chartist__.update();
        });

    });
}(jQuery));
