import InputCloneService from '../../../../js/Repeater/InputCloneService';
import $ from 'jquery';

describe('InputCloneService', () => {
    let inputCloneService;

    beforeEach(() => {
        inputCloneService = new InputCloneService();
    });

    describe('clone', () => {
        it('<select/>', () => {
            const $select = $(`
                <select>
                    <option value="">Choose a colour</option>
                    <option value="red">Red</option>
                    <option value="blue">Blue</option>
                </select>
            `);
            let clone;

            $select.find('[value="blue"]').prop('selected', true);
            clone = inputCloneService.clone($select[0]);

            expect(clone.value).to.equal('blue');
        });
    });
});
