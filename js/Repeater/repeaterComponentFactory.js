const InputCloneService = require('./InputCloneService');
const InputValueService = require('./InputValueService');
const PseudoRadioInputService = require('./PseudoRadioInputService');
const InputReplacementService = require('./InputReplacementService');
const RepeaterPreviewService = require('./RepeaterPreviewService');
const ActiveFunctionService = require('../utilities/ActiveFunctionService');
const RepeaterDataService = require('./RepeaterDataService');
const UniqueIdService = require('../utilities/UniqueIdService');
const HashService = require('../utilities/HashService');
const Repeater = require('./RepeaterComponent');
const RepeaterPlaceholderService = require('./RepeaterPlaceholderService');
const FormFieldResetService = require('../utilities/FormFieldResetService');
const FocusManagementService = require('../FocusManagementService');

/**
 * Create a repeater component instance
 * @param pulsarFormComponent {PulsarFormComponent}
 * @param repeater {HTMLElement}
 * @returns {Repeater}
 */
function repeaterComponentFactory (
    pulsarFormComponent,
    repeater
) {
    const activeFunctionService = new ActiveFunctionService();
    const inputCloneService = new InputCloneService();
    const inputValueService = new InputValueService();
    const inputReplacementService = new InputReplacementService(
        pulsarFormComponent
    );
    const uniqueIdService = new UniqueIdService(
        new HashService(Date)
    );
    const repeaterDataService = new RepeaterDataService(
        repeater,
        inputCloneService,
        inputValueService,
        uniqueIdService
    );
    const repeaterPreviewService = new RepeaterPreviewService(
        repeater,
        inputValueService
    );
    const pseudoRadioInputService = new PseudoRadioInputService(
        repeater,
        'data-repeater-name'
    );
    const repeaterPlaceholderService = new RepeaterPlaceholderService(
        repeater
    );
    const formFieldResetService = new FormFieldResetService();
    const focusManagementService = new FocusManagementService();

    return new Repeater(
        repeater,
        pulsarFormComponent,
        activeFunctionService,
        inputCloneService,
        inputValueService,
        inputReplacementService,
        uniqueIdService,
        repeaterPreviewService,
        pseudoRadioInputService,
        repeaterDataService,
        repeaterPlaceholderService,
        formFieldResetService,
        focusManagementService
    );
}

module.exports = repeaterComponentFactory;
