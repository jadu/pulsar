const InputCloneService = require('./InputCloneService');
const InputValueService = require('./InputValueService');
const PseudoRadioInputService = require('./PseudoRadioInputService');
const InputReplacementService = require('./InputReplacementService');
const RepeaterPreviewService = require('./RepeaterPreviewService');
const QueryService = require('../utilities/QueryService');
const ActiveFunctionService = require('../utilities/ActiveFunctionService');
const RepeaterDataService = require('./RepeaterDataService');
const UniqueIdService = require('../utilities/UniqueIdService');
const HashService = require('../utilities/HashService');
const Repeater = require('./Repeater');
const RepeaterPlaceholderService = require('./RepeaterPlaceholderService');
const config = require('./repeaterConfig');

/**
 * Create a repeater component instance
 * @param pulsarFormComponent {PulsarFormComponent}
 * @param dataTableService {DataTableService}
 * @param repeater {HTMLElement}
 * @param dataTableSupport {boolean}
 * @returns {Repeater}
 */
function repeaterComponentFactory (
    pulsarFormComponent,
    dataTableService,
    repeater,
    dataTableSupport
) {
    const queryService = new QueryService(
        repeater,
        config
    );
    const activeFunctionService = new ActiveFunctionService();
    const inputCloneService = new InputCloneService(
        pulsarFormComponent,
        queryService
    );
    const inputValueService = new InputValueService();
    const inputReplacementService = new InputReplacementService(
        pulsarFormComponent,
        queryService
    );
    const uniqueIdService = new UniqueIdService(
        new HashService(Date)
    );
    const repeaterDataService = new RepeaterDataService(
        queryService,
        inputCloneService,
        inputValueService,
        uniqueIdService
    );
    const repeaterPreviewService = new RepeaterPreviewService(
        queryService,
        activeFunctionService,
        inputValueService
    );
    const pseudoRadioInputService = new PseudoRadioInputService(
        repeater,
        queryService.getAttr('name')
    );
    const repeaterPlaceholderService = new RepeaterPlaceholderService(
        queryService
    );

    return new Repeater(
        repeater,
        pulsarFormComponent,
        dataTableService,
        queryService,
        activeFunctionService,
        inputCloneService,
        inputValueService,
        inputReplacementService,
        uniqueIdService,
        repeaterPreviewService,
        pseudoRadioInputService,
        repeaterDataService,
        repeaterPlaceholderService,
        dataTableSupport
    );
}

module.exports = repeaterComponentFactory;
