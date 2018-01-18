const InputCloneService = require('../../../../js/Repeater/InputCloneService');
const PulsarFormComponent = require('../../../../js/PulsarFormComponent');
const QueryService = require('../../../../js/utilities/QueryService');
const $ = require('jquery');

describe('InputCloneService', () => {
    let inputCloneService;
    let pulsarFormComponentStub;
    let queryServiceStub;

    beforeEach(() => {
        pulsarFormComponentStub = sinon.createStubInstance(PulsarFormComponent);
        queryServiceStub = sinon.createStubInstance(QueryService);
        inputCloneService = new InputCloneService(
            pulsarFormComponentStub,
            queryServiceStub
        );

        $.fn.select2 = sinon.stub();
        queryServiceStub.getAttr.withArgs('select2-data').returns('data-select2-data');
    });

    afterEach(() => {
        $.fn.select2.reset();
    });

    describe('clone', () => {
        describe('text', () => {
           it('should return a deep clone for inputs that do not require manual intervention', () => {
                const $wrap = $('<div><input type="text"/></div>');
                const clone = inputCloneService.clone($wrap.find('input')[0]);
                const $cloneWrap = $('<div></div>').append(clone);

                expect($wrap.html()).to.equal($cloneWrap.html());
           });
        });

        describe('select', () => {
            it('should clone a select-one input', () => {
                const $select = $(`
                    <select>
                        <option value="choose">Choose a colour</option>
                        <option value="red">Red</option>
                        <option value="blue">Blue</option>
                    </select>
                `);

                $select.find('[value="blue"]').prop('selected', true);

                const clone = inputCloneService.clone($select[0]);

                expect(clone.value).to.equal('blue');
            });

            it('should clone a select-multiple input', () => {
                const $select = $(`
                    <select multiple="true">
                        <option value="choose">Choose a colour</option>
                        <option value="red">Red</option>
                        <option value="blue">Blue</option>
                    </select>
                `);

                $select.find('[value="blue"]').prop('selected', true);
                $select.find('[value="red"]').prop('selected', true);

                const clone = inputCloneService.clone($select[0]);

                expect(clone.children[0].selected).to.be.false;
                expect(clone.children[1].selected).to.be.true;
                expect(clone.children[2].selected).to.be.true;
            });

            it('should destroy a select2 and store data as an attribute', () => {
                const $select = $(`
                    <select class="js-select2">
                        <option value="choose">Choose a colour</option>
                        <option value="red">Red</option>
                        <option value="blue">Blue</option>
                    </select>
                `);

                $select.data('select2', {foo: 'bar'});
                $.fn.select2.withArgs('data').returns({foo: 'bar'});

                inputCloneService.clone($select[0]);

                expect($.fn.select2).to.have.been.calledTwice;
                expect($.fn.select2).to.have.been.calledWith('data');
                expect($.fn.select2).to.have.been.calledWith('destroy');
                expect($select[0].getAttribute('data-select2-data')).to.equal(JSON.stringify({
                    foo: 'bar'
                }));
            });
        });
    });
});
