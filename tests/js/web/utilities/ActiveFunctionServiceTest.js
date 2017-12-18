const ActiveFunctionService = require('../../../../js/utilities/ActiveFunctionService');

describe('ActiveFunctionService', () => {
    let activeFunctionService;

    beforeEach(() => {
        activeFunctionService = new ActiveFunctionService();
    });

    describe('wrap', () => {
        let $element;

        beforeEach(() => {
            $element = $('<div></div>');
        })

        it('should not invoke the function argument id the disabled class is not present on the element', () => {
            const spy = sinon.spy();

            $element.addClass('disabled');
            activeFunctionService.wrap($element[0], spy, {});

            expect(spy).to.have.not.been.called;
        });

        it('should invoke the function argument id the disabled class is not present on the element', () => {
            const spy = sinon.spy();

            activeFunctionService.wrap($element[0], spy, {});

            expect(spy).to.have.been.called;
        });
    });
});
