const InputValueService = require('../../../../js/repeater/InputValueService');
const $ = require('jquery');

describe('InputValueService', () => {
    let inputValueService;

    beforeEach(() => {
        inputValueService = new InputValueService();
    });

    describe('getValue', () => {
        let $checkbox;
        let $multiSelect;
        let $radio;
        let $input;

        beforeEach(() => {
            $input = $('<input type="text" value="foo"/>');
            $checkbox = $('<input type="checkbox" value="foo"/>');
            $radio = $('<input type="radio" name="foo" value="foo"/>');
            $multiSelect = $(`
                <select multiple="true">
                    <option value="foo" selected></option>
                    <option value="bar" selected></option>
                    <option value="baz"></option>
                </select>
            `);
        });

        it('should get values from checkboxes', () => {
            expect(inputValueService.getValue($checkbox[0])).to.deep.equal({
                value: 'foo', selected: false
            });
        });

        it('should get values from multi-select boxes', () => {
            expect(inputValueService.getValue($multiSelect[0])).to.deep.equal([
                { value: 'foo', selected: true },
                { value: 'bar', selected: true },
                { value: 'baz', selected: false }
            ]);
        });

        it('should get values from radio buttons', () => {
            expect(inputValueService.getValue($radio[0])).to.deep.equal({
                value: 'foo', selected: false
            });
        });

        it('should get values from inputs that do not require manual intervention', () => {
            expect(inputValueService.getValue($input[0])).to.deep.equal({
                value: 'foo', selected: true
            });
        });
    });

    describe('setValue', () => {
        let $checkbox;
        let $multiSelect;
        let $radio;
        let $input;

        beforeEach(() => {
            $input = $('<input type="text" value="foo"/>');
            $checkbox = $('<input type="checkbox" value="foo"/>');
            $radio = $('<input type="radio" name="foo" value="foo"/>');
            $multiSelect = $(`
                <select multiple="true">
                    <option value="foo" selected></option>
                    <option value="bar" selected></option>
                    <option value="baz"></option>
                </select>
            `);
        });

        it('should set the values of checkboxes', () => {
            inputValueService.setValue($checkbox[0], true, {});

            expect($checkbox.prop('checked')).to.equal(true);
        });

        it('should set the value of radio inputs', () => {
            inputValueService.setValue($radio[0], 'bar', { selected: true });

            expect($radio.val()).to.equal('bar');
            expect($radio.prop('checked')).to.equal(true);
        });

        it('should set the value of multi-select boxes', () => {
            inputValueService.setValue($multiSelect[0], 'baz', { selected: true });

            expect($multiSelect.find(':selected').toArray().map(e => e.value).join(','))
                .to.equal('foo,bar,baz');
        });

        it('should set the value of inputs that do not require manual intervention', () => {
            inputValueService.setValue($input[0], 'bar', {});

            expect($input.val()).to.equal('bar');
        });
    });

    describe('printValue', () => {
        let $password;
        let $multiSelect;
        let $select;
        let $input;

        beforeEach(() => {
            $password = $('<input type="password" value="password"/>');
            $multiSelect = $(`
                <select multiple="true">
                    <option value="foo" selected>foo</option>
                    <option value="bar" selected>bar</option>
                    <option value="baz">baz</option>
                </select>
            `);
            $select = $(`
                <select>
                    <option value="foo" selected>foo</option>
                    <option value="bar">bar</option>
                    <option value="baz">baz</option>
                </select>
            `);
            $input = $('<input type="text" value="foo"/>');
        });

        it('should print password values', () => {
            expect(inputValueService.printValue($password[0], 'password', {})).to.equal('********');
        });

        it('should print single select values', () => {
            expect(inputValueService.printValue($select[0], 'foo', {})).to.equal('foo');
        });

        it('should print multi select values', () => {
            expect(inputValueService.printValue($multiSelect[0], 'foo', {})).to.equal('foo');
        });

        it('should print value that do not require manual intervention', () => {
            expect(inputValueService.printValue($input[0], 'foo')).to.equal('foo');
        });
    });

    describe('getSelected', () => {
        let $checkbox;
        let $radio;
        let $input;

        beforeEach(() => {
            $input = $('<input type="text" value="foo"/>');
            $checkbox = $('<input type="checkbox" value="foo"/>')
            $radio = $('<input type="radio" value="foo" name="radio"/>');
        });

        it('should return the checked value for a checkbox', () => {
            expect(inputValueService.getSelected($checkbox[0])).to.be.false;

            $checkbox.click();

            expect(inputValueService.getSelected($checkbox[0])).to.be.true;
        });

        it('should return the checked value for a radio', () => {
            expect(inputValueService.getSelected($radio[0])).to.be.false;

            $radio.click();

            expect(inputValueService.getSelected($radio[0])).to.be.true;
        });

        it('should return true for inputs that do not have a selected property', () => {
            expect(inputValueService.getSelected($input[0])).to.be.true;
        });
    });

    describe('getCheckboxValue', () => {
        let $checkbox;

        beforeEach(() => {
            $checkbox = $('<input type="checkbox" value="foo">');
        });

        it('should return the checkbox value if it is checked', () => {
            $checkbox.click();

            expect(inputValueService.getCheckboxValue($checkbox[0])).to.deep.equal({
                value: 'foo', selected: true
            });
        });

        it('should return false if the checkbox is not checked', () => {
            expect(inputValueService.getCheckboxValue($checkbox[0])).to.deep.equal({
                value: 'foo', selected: false
            });
        });
    });

    describe('setCheckboxValue', () => {
        let $checkbox;

        beforeEach(() => {
            $checkbox = $('<input type="checkbox" value="foo">');
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
