(function ($) {

    // Protect IE8 from any erroneous console.log uses which would break everything
    if (!window.console) {
        console = { log: function() {} }
    };

    var $html = $('html'),
        lt10 = $html.hasClass('lt-ie10');

    $html.removeClass('no-js');

    pulsar.errorSummary = new pulsar.ErrorSummaryComponent();
    pulsar.button = new pulsar.ButtonComponent($html);
    pulsar.dropdownButton = new pulsar.DropdownButtonComponent($html);
    pulsar.disableUi = new pulsar.DisableUiComponent($html);
    pulsar.flash = new pulsar.FlashMessageComponent($html);
    pulsar.helpText = new pulsar.HelpTextComponent($html, window, document);
    pulsar.pulsarForm = new pulsar.PulsarFormComponent($html);
    pulsar.pulsarUI = new pulsar.PulsarUIComponent($html, window.History);
    pulsar.pulsarSortable = new pulsar.PulsarSortableComponent($html, window);
    pulsar.signIn = new pulsar.SignInComponent($html);
    pulsar.masterSwitch = new pulsar.MasterSwitchComponent($html, pulsar.disableUi);
	pulsar.modulePermissions = new pulsar.ModulePermissionsComponent($html);
    pulsar.focusManagementService = new pulsar.FocusManagementService();
    pulsar.navMain = new pulsar.NavMainComponent($html, window, pulsar.focusManagementService);
    pulsar.filterBar = new pulsar.FilterBarComponent($html);
    pulsar.faviconEditor = new pulsar.FaviconEditor(document.head);
    pulsar.stickySidebar = new pulsar.StickySidebarComponent($html, window);
    pulsar.tableDetail = new pulsar.TableDetailComponent($html);
    pulsar.repeaterManager = new pulsar.RepeaterManagerComponent(
        pulsar.pulsarForm,
        pulsar.repeaterComponentFactory,
        $html
    );
    pulsar.modalFocusService = new pulsar.ModalFocusService();
    pulsar.modalListener = new pulsar.ModalListener(pulsar.modalFocusService);
    pulsar.tabEnhancements = new pulsar.TabEnhancements(document);

    $(function () {
        pulsar.button.init();
        pulsar.dropdownButton.init();
        pulsar.errorSummary.init($html);
        pulsar.flash.init();
        pulsar.helpText.init();
        pulsar.helpText.updateHelpSidebar();
        pulsar.pulsarForm.init();
        pulsar.pulsarSortable.init();
        pulsar.pulsarUI.init();
        pulsar.signIn.init();
        pulsar.masterSwitch.init();
        pulsar.modulePermissions.init();
        pulsar.navMain.init();
        pulsar.filterBar.init();
        pulsar.disableUi.init();
        pulsar.stickySidebar.init();
        pulsar.tableDetail.init();
        pulsar.dropZoneComponent = pulsar.DropZoneComponentFactory.create($('body')[0], '.dropzone');
        pulsar.repeaterManager.init();
        pulsar.tooltipListener = pulsar.tooltipFactory($html);
        pulsar.tooltipListener.init();
        pulsar.modalListener.listen($html);
        pulsar.datePicker.init($html);

        // jsTree
        $('#container').jstree({
            'plugins' : ['state']
        });

        // DropZone
        pulsar.dropZoneComponent.init({
            supported: !lt10,
            showInputNode: lt10
        });

        // Favicon editor
        pulsar.faviconEditor.init();

        // Tab Enhacements
        pulsar.tabEnhancements.init($html);
    });

}(jQuery));
