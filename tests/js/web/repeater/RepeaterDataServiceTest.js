const RepeaterDataService = require('../../../../js/Repeater/RepeaterDataService');
const QueryService = require('../../../../js/utilities/QueryService');
const InputCloneService = require('../../../../js/Repeater/InputCloneService');
const InputValueService = require('../../../../js/Repeater/InputValueService');
const UniqueIdService = require('../../../../js/utilitlies/UniqueIdService');

describe('RepeaterDataService', () => {
    let repeaterDataService;
    let queryServiceStub;
    let inputCloneServiceStub;
    let inputValueServiceStub;
    let uniqueIdServiceStub;

    beforeEach(() => {
        queryServiceStub = sinon.createStubInstance(QueryService);
        inputCloneServiceStub = sinon.createStubInstance(InputCloneService);
        inputValueServiceStub = sinon.createStubInstance(InputValueService);
        uniqueIdServiceStub = sinon.createStubInstance(UniqueIdService);
        repeaterDataService = new RepeaterDataService(
            queryServiceStub,
            inputCloneServiceStub,
            inputValueServiceStub,
            uniqueIdServiceStub
        );
    });

    describe('create', () => {
        it('should create a saved data repeater group from a form group', () => {

        });
    });
});
