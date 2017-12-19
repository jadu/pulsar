const RepeaterManagerComponent = require('../../../../js/Repeater/RepeaterManagerComponent');
const PulsarFormComponent = require('../../../../js/PulsarFormComponent');

describe('RepeaterManagerComponent', () => {
    let repeaterManagerComponent;
    let pulsarFormComponentStub;
    let repeaterComponentFactory;
    let repeaterInstanceStub;
    let $html;

    beforeEach(() => {
        $html = $(`
            <div id="html">
                <div data-repeater></div>
                <div data-repeater></div>
                <div data-repeater></div>
            </div>
        `);
        pulsarFormComponentStub = sinon.createStubInstance(PulsarFormComponent);
        repeaterInstanceStub = { init: sinon.spy() };
        repeaterComponentFactory = sinon.stub().returns(repeaterInstanceStub);
        repeaterManagerComponent = new RepeaterManagerComponent(
            pulsarFormComponentStub,
            repeaterComponentFactory,
            $html
        );
    });

    describe('init', () => {
        it('should create a repeater instance for each repeater element on the page and initiate', () => {
             repeaterManagerComponent.init();

            expect(repeaterComponentFactory).to.have.been.calledThrice;
            expect(repeaterInstanceStub.init).to.have.been.calledThrice;
        });
    });
});
