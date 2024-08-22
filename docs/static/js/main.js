document.addEventListener('DOMContentLoaded', function() {
    var $html = $('html');

    pulsar.errorSummary = new pulsar.ErrorSummaryComponent();
    pulsar.button = new pulsar.ButtonComponent($html);
    pulsar.dropdownButton = new pulsar.DropdownButtonComponent($html);
    pulsar.disableUi = new pulsar.DisableUiComponent($html);
    pulsar.pulsarForm = new pulsar.PulsarFormComponent($html);
    pulsar.pulsarUI = new pulsar.PulsarUIComponent($html, window.History);
    pulsar.pulsarSortable = new pulsar.PulsarSortableComponent($html, window);
    pulsar.filterBar = new pulsar.FilterBarComponent($html);
    pulsar.masterSwitch = new pulsar.MasterSwitchComponent($html, pulsar.disableUi);
    pulsar.tableDetail = new pulsar.TableDetailComponent($html);
    pulsar.repeaterManager = new pulsar.RepeaterManagerComponent(
        pulsar.pulsarForm,
        pulsar.repeaterComponentFactory,
        $html
    );
    pulsar.modalFocusService = new pulsar.ModalFocusService();
    pulsar.modalListener = new pulsar.ModalListener(pulsar.modalFocusService);

    // Initialize components after DOM is loaded
    pulsar.button.init();
    pulsar.dropdownButton.init();
    pulsar.errorSummary.init($html);
    pulsar.pulsarForm.init();
    pulsar.pulsarSortable.init();
    pulsar.pulsarUI.init();
    pulsar.masterSwitch.init();
    pulsar.filterBar.init();
    pulsar.tableDetail.init();
    pulsar.repeaterManager.init();
    pulsar.tooltipListener = pulsar.tooltipFactory($html);
    pulsar.tooltipListener.init();
    pulsar.modalListener.listen($html);
    pulsar.datePicker.init($html);
});