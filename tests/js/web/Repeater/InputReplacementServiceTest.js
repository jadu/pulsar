const InputReplacementService = require('../../../../js/Repeater/InputReplacementService');
const PulsarFormComponent = require('../../../../js/PulsarFormComponent');
const QueryService = require('../../../../js/utilities/QueryService');

describe('InputReplacementService', () => {
   let inputReplacementService;
   let pulsarFormComponentStub;
   let queryServiceStub;

   beforeEach(() => {
        pulsarFormComponentStub = sinon.createStubInstance(PulsarFormComponent);
        queryServiceStub = sinon.createStubInstance(QueryService);
        inputReplacementService = new InputReplacementService(
            pulsarFormComponentStub,
            queryServiceStub
        );

        queryServiceStub.getAttr.withArgs('pseudo-radio-id').returns('data-pseudo-radio-id');
        queryServiceStub.getAttr.withArgs('select2-data').returns('data-select2');
   });

   describe('replace', () => {
       let $html;

       beforeEach(() => {
           $html = $(`
                <div id="root">
                    <input data-clone="false" type="text"/>
                    <input data-clone="false" data-pseudo-radio-id="666" type="radio" value="foo" name="foo"/>
                    <select id="select" data-clone="false">
                        <option value="foo" selected>foo</option>
                        <option value="bar">bar</option>
                        <option value="baz">baz</option>
                    </select>
                    <select class="js-select2" id="select2" data-clone="false">
                        <option value="foo">foo</option>
                        <option value="bar">bar</option>
                        <option value="baz">baz</option>
                    </select>
                </div>
            `);
       });

       it('should replace radio inputs', () => {
            const radio = $html[0].querySelectorAll(('[type="radio"]'));
            const clone = radio[0].cloneNode();

            clone.setAttribute('data-clone', 'true');

            inputReplacementService.replace(radio, clone);

            expect($html.find('[type="radio"]').attr('data-clone')).to.equal('true');
       });

       it('should not replace radio inputs with mismatched IDs', () => {
           const radio = $html[0].querySelectorAll(('[type="radio"]'));
           const clone = radio[0].cloneNode();

           clone.setAttribute('data-clone', 'true');
           clone.setAttribute('data-pseudo-radio-id', '665');

           inputReplacementService.replace(radio, clone);

           expect($html.find('[type="radio"]').attr('data-clone')).to.equal('false');
       });

       it('should replace single select inputs', () => {
            const select = $html[0].querySelectorAll('#select');
            const clone = select[0].cloneNode(true);

            clone.setAttribute('data-clone', 'true');

            inputReplacementService.replace(select, clone);

            expect($html.find('#select').attr('data-clone')).to.equal('true');
       });

       it('should re-init select2 inputs instead of replacing whilst maintaining option state', () => {
           const select = $html[0].querySelectorAll('#select2');

           select[0].setAttribute('data-select2', JSON.stringify([
               { id: 'baz', selected: true },
               { id: 'foo', selected: false },
               { id: 'bar', selected: false },
               { id: 'not_in_select' }
           ]));

           inputReplacementService.replace(select, {});

           expect(select[0].children[0].selected).to.be.false;
           expect(select[0].children[1].selected).to.be.false;
           expect(select[0].children[2].selected).to.be.true;
           expect(pulsarFormComponentStub.initSelect2).to.have.been.calledOnce;
       });

       it('should re-init select2 inputs whilst handling no cached select2 data', () => {
           const select = $html[0].querySelectorAll('#select2');

           inputReplacementService.replace(select, {});

           expect(select[0].children[0].selected).to.be.true;
           expect(select[0].children[1].selected).to.be.false;
           expect(select[0].children[2].selected).to.be.false;
           expect(pulsarFormComponentStub.initSelect2).to.have.been.calledOnce;
       });

       it('should replace inputs that do not require manual intervention', () => {
            const input = $html[0].querySelectorAll('[type="text"]');
            const clone = input[0].cloneNode();

            clone.setAttribute('data-clone', 'true');

            inputReplacementService.replace(input, clone);

            expect($html.find('[type="text"]').attr('data-clone')).to.equal('true');
       });
   });
});
