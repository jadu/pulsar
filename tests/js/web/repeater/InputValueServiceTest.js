const InputValueService = require('../../../../js/repeater/InputValueService');
const $ = require('jquery');

describe('InputValueService', () => {
    let inputValueService;

    beforeEach(() => {
        inputValueService = new InputValueService();
    });

    describe('getCheckboxValue', () => {
        let $checkbox;

        beforeEach(() => {
            $checkbox = $('<input type="checkbox">');
        });

        it('should return the checkbox value if it is checked', () => {
            $checkbox.click();

            expect(inputValueService.getCheckboxValue($checkbox[0])).to.equal('on');
        });

        it('should return false if the checkbox is not checked', () => {
            expect(inputValueService.getCheckboxValue($checkbox[0])).to.equal('');
        });
    });

    describe('setCheckboxValue', () => {
        let $checkbox;

        beforeEach(() => {
            $checkbox = $('<input type="checkbox">');
        });

        it('should check the checkbox if the value is truthy', () => {
            inputValueService.setCheckboxValue($checkbox[0], 'yolo');

            expect($checkbox.prop('checked')).to.be.true;
        });

        it('should not check the checkbox if the value is falsy', () => {
            inputValueService.setCheckboxValue($checkbox[0], '');

            expect($checkbox.prop('checked')).to.be.false;
        });
    });
});
