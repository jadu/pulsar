const RepeaterDataService = require('../../../../js/Repeater/RepeaterDataService');
const QueryService = require('../../../../js/utilities/QueryService');
const InputCloneService = require('../../../../js/Repeater/InputCloneService');
const InputValueService = require('../../../../js/Repeater/InputValueService');
const UniqueIdService = require('../../../../js/utilities/UniqueIdService');

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

        queryServiceStub.getQuery.withArgs('name').returns('[data-name]');
        queryServiceStub.getAttr.withArgs('name').returns('data-name');
        queryServiceStub.getAttr.withArgs('saved-entry-id').returns('data-saved-entry-id');
    });

    describe('create', () => {
        let $html;
        let group;
        let data;

        beforeEach(() => {
            $html = $(`
                <div id="root">
                    <div id="data"></div>
                    <form id="form">
                        <input id="test_input" data-name="test_input" type="text" value="foo"/>
                    </form>
                </div>
            `);

            group = $html.find('#form')[0];
            data = $html.find('#data')[0];
        });

        it('should create a saved data repeater group from a form group', () => {
            const clonedInput = group.querySelector('#test_input').cloneNode();

            queryServiceStub.get.withArgs('saved-entries-root').returns(data);
            inputCloneServiceStub.clone.returns(clonedInput);
            repeaterDataService.create(group, 666);

            expect(data.children).to.have.length.of(1);
            expect(data.firstElementChild.getAttribute('data-saved-entry-id')).to.equal('666');
            expect(clonedInput.getAttribute('name')).to.equal('test_input');
            expect(clonedInput.className).to.equal('u-display-none');
            expect(clonedInput.getAttribute('data-name')).to.be.null;
            expect(uniqueIdServiceStub.uniquifyIds).to.have.been.calledOnce;
        });
    });

    describe('update', () => {
        let $html;
        let data;

        beforeEach(() => {
            $html = $(`
                <div id="root">
                    <div id="data">
                        <div data-saved-entry-id="666">
                            <input name="foo" value="foo"/>
                            <input name="bar" value="bar"/>
                        </div>
                    </div>
                </div>
            `);

            data = $html.find('#data')[0];
        });

        it('should invoke the input value service for each matched input in the state', () => {
            const state = {
                foo: {
                    value: [ { value: 'foo', selected: true } ]
                },
                bar: {
                    value: [ { value: 'bar', selected: false } ]
                }
            };

            queryServiceStub.get.withArgs('saved-entries-root').returns(data);

            repeaterDataService.update(state, 666);

            expect(inputValueServiceStub.setValue).to.have.been.calledWith(
                data.querySelector('[name="foo"]'),
                'foo',
                { selected: true }
            );

            expect(inputValueServiceStub.setValue).to.have.been.calledWith(
                data.querySelector('[name="bar"]'),
                'bar',
                { selected: false }
            );
        });
    });
});
