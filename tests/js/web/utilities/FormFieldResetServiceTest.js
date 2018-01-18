const FormFieldResetService = require('../../../../js/utilities/FormFieldResetService');
const $ = require('jquery');

describe('FormFieldResetService', () => {
    let $html;
    let formFieldResetService;

    document.addEventListener('reset', () => console.log('reset!'))

    beforeEach(() => {
        $html = $(`
            <div>
                <div id="text">
                    <input type="text" name="text"/>
                </div>
                <div id="radio">
                    <input type="radio" name="radio" value="foo"/>
                </div>
                <div id="checkbox">
                    <input type="checkbox" name="checkbox"/>
                </div>
                <div id="select">
                    <select name="select">
                        <option value="foo">foo</option>
                        <option value="bar">bar</option>
                    </select>
                </div>
            </div>
        `);
        formFieldResetService = new FormFieldResetService();
    });

    describe('reset', () => {
        it('should reset the value of text inputs', () => {
            const $input = $html.find('#text').find('input');

            $input.val('asdkhfgsldfgsldfg');

            formFieldResetService.reset($input);

            expect($input.val()).to.equal('');
        });

        it('should reset the checked property of radio inputs', () => {
            const $input = $html.find('#radio').find('input');

            $input.click();

            formFieldResetService.reset($input);

            expect($input.prop('checked')).to.be.false;
        });

        it('should reset the checked property of checkboxes', () => {
            const $input = $html.find('#checkbox').find('input');

            $input.click();

            formFieldResetService.reset($input);

            expect($input.prop('checked')).to.be.false;
        });

        it('should reset the value of select inputs', () => {
            const $input = $html.find('#select').find('select');

            // Select the second option
            $input.children().eq(1).prop('selected', 'true');

            formFieldResetService.reset($input);

            // Should revert to default first option
            expect($input.val()).to.equal('foo');
        });
    });
});
