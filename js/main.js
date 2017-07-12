    (function ($) {

    // Protect IE8 from any erroneous console.log uses which would break everything
    if (!window.console) {
        console = { log: function() {} }
    };

    var $html = $('html');

    $html.removeClass('no-js');

    pulsar.button       = new pulsar.ButtonComponent($html);
    pulsar.disableUi    = new pulsar.DisableUiComponent($html);
    pulsar.flash        = new pulsar.FlashMessageComponent($html);
    pulsar.helpText     = new pulsar.HelpTextComponent($html, window, document);
    pulsar.pulsarForm   = new pulsar.PulsarFormComponent($html);
    pulsar.pulsarUI     = new pulsar.PulsarUIComponent($html, pulsar.history);
    pulsar.signIn       = new pulsar.SignInComponent($html);
    pulsar.masterSwitch = new pulsar.MasterSwitchComponent($html);
	pulsar.modulePermissions = new pulsar.ModulePermissionsComponent($html);
    pulsar.navMain      = new pulsar.NavMainComponent($html, window);
    pulsar.filterBar    = new pulsar.FilterBarComponent($html);

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
        pulsar.filterBar.init();
        pulsar.disableUi.init();

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

        $('div.is-sortable').sortable({
             placeholder: "form__group is-sorting",
             helper: "clone",
             opacity: 0.9,
             start: function(e, ui) {
                $(ui.helper).addClass('is-dragging');
            }
        }).disableSelection();

        var fixHelper = function(e, ui) {
            ui.children().each(function() {
                $(this).width($(this).width());
            });
            return ui;
        };

        $('.table.is-sortable tbody').sortable({
            placeholder: "is-sorting",
            helper: fixHelper,
            opacity: 0.9,
            create: function() {
                $(this).find('tr > td:first-of-type').each(function(i) {
                    var $this = $(this),
                        label = $(this).text();

                    i++;

                    $this.html('<span class="sortable__count js-sortable-count">' + i + '</span> ' + label);
                });
            },
            start: function(e, ui) {
                $(ui.helper).addClass('is-dragging');
            },
            update: function(e, ui) {
                var $item = $(ui.item);

                $item.addClass('has-success fade', function() {
                    setTimeout(function() {
                        $item.removeClass('has-success fade');
                    }, 2500);
                });

                $(this).find('.js-sortable-count').each(function(i) {

                    console.log($(this).text());

                    var $this = $(this);

                    i++;

                    $this.text(i);
                });

            }
        }).disableSelection();

        // tinycon.setBubble(6);

        // jsTree
        $('#container').jstree({
            'plugins' : ['state']
        });

    });

}(jQuery));
