const RepeaterDataService = require('../../../../js/Repeater/RepeaterDataService');
const InputCloneService = require('../../../../js/Repeater/InputCloneService');
const InputValueService = require('../../../../js/Repeater/InputValueService');
const UniqueIdService = require('../../../../js/utilities/UniqueIdService');

describe('RepeaterDataService', () => {
    let repeaterDataService;
    let inputCloneServiceStub;
    let inputValueServiceStub;
    let uniqueIdServiceStub;
    let $html;

    beforeEach(() => {
        $html = $('<div id="root">');
        inputCloneServiceStub = sinon.createStubInstance(InputCloneService);
        inputValueServiceStub = sinon.createStubInstance(InputValueService);
        uniqueIdServiceStub = sinon.createStubInstance(UniqueIdService);
        repeaterDataService = new RepeaterDataService(
            $html[0],
            inputCloneServiceStub,
            inputValueServiceStub,
            uniqueIdServiceStub
        );
    });

    afterEach(() => {
        $html.empty();
    });

    describe('create', () => {
        let group;
        let data;

        beforeEach(() => {
            $html.append(`
                    <div data-repeater-saved-entries-root id="data"></div>
                    <form id="form">
                        <div class="form__group">
                            <label class="control__label" for="test_input">example</label>
                            <input id="test_input" data-repeater-name="test_input" type="text" value="foo"/>
                        </div>
                    </form>
            `);

            group = $html.find('#form')[0];
            data = $html.find('#data')[0];
        });

        it('should create a saved data repeater group from a form group', () => {
            const clonedInput = group.querySelector('#test_input').cloneNode();

            inputCloneServiceStub.clone.returns(clonedInput);
            repeaterDataService.create(group, 666);

            expect(data.children).to.have.length.of(1);
            expect(data.firstElementChild.getAttribute('data-repeater-saved-data-id')).to.equal('666');
            expect(clonedInput.getAttribute('name')).to.equal('test_input');
            expect(clonedInput.className).to.equal('u-display-none');
            expect(clonedInput.getAttribute('data-repeater-name')).to.be.null;
            expect(clonedInput.getAttribute('aria-label')).to.equal('example');
            expect(uniqueIdServiceStub.uniquifyIds).to.have.been.calledOnce;
        });
    });

    describe('update', () => {
        let data;

        beforeEach(() => {
            $html.append(`
                <div data-repeater-saved-entries-root id="data">
                    <div data-repeater-saved-data-id="666">
                        <input name="foo" value="foo"/>
                        <input name="bar" value="bar"/>
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
