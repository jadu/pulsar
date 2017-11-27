const PseudoRadioInputService = require('../../../../js/Repeater/PseudoRadioInputService');

describe('PseudoRadioInputService', () => {
    let pseudoRadioInputService;
    let $root;

    beforeEach(() => {
        $root = $(`
            <div id="root">
                <input type="radio" name="test" data-name="test" value="foo">
                <input type="radio" name="test" data-name="test" value="bar">
                <input type="radio" name="test" data-name="test" value="baz">
            </div>
        `);
        pseudoRadioInputService = new PseudoRadioInputService($root[0], 'data-name');
    });

    describe('init', () => {
        it('should create an initial state', () => {
            pseudoRadioInputService.init();

            expect(pseudoRadioInputService.state).to.deep.equal({
                test: [
                    { value: 'foo', checked: false },
                    { value: 'bar', checked: false },
                    { value: 'baz', checked: false }
                ]
            });

            expect($root.find('[value="foo"]').attr('data-pseudo-radio-id')).to.equal('1');
            expect($root.find('[value="bar"]').attr('data-pseudo-radio-id')).to.equal('2');
            expect($root.find('[value="baz"]').attr('data-pseudo-radio-id')).to.equal('3');
        });
    });

    describe('updateState', () => {
        beforeEach(() => {
            pseudoRadioInputService.init();
        });

        it('should update the radio state and DOM', () => {
            pseudoRadioInputService.updateState('test', 'bar');

            expect(pseudoRadioInputService.state).to.deep.equal({
                test: [
                    { value: 'foo', checked: false },
                    { value: 'bar', checked: true },
                    { value: 'baz', checked: false }
                ]
            });

            expect($root.find('[value="foo"]').prop('checked')).to.be.false;
            expect($root.find('[value="bar"]').prop('checked')).to.be.true;
            expect($root.find('[value="baz"]').prop('checked')).to.be.false;
        });
    });

    describe('refresh', () => {
        beforeEach(() => {
            pseudoRadioInputService.init();
        });

        it('should refresh the DOM to match the internal state', () => {
            pseudoRadioInputService.state = {
                test: [
                    { value: 'foo', checked: false },
                    { value: 'bar', checked: false },
                    { value: 'baz', checked: true }
                ]
            }

            pseudoRadioInputService.refresh();

            expect(pseudoRadioInputService.state).to.deep.equal({
                test: [
                    { value: 'foo', checked: false },
                    { value: 'bar', checked: false },
                    { value: 'baz', checked: true }
                ]
            });

            expect($root.find('[value="foo"]').prop('checked')).to.be.false;
            expect($root.find('[value="bar"]').prop('checked')).to.be.false;
            expect($root.find('[value="baz"]').prop('checked')).to.be.true;
        });
    });
});
