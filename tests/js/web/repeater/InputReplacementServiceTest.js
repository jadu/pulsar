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
       let select2Data;

       // [{"selected":true,"disabled":false,"text":"Red","id":"colour_red","title":"","_resultId":"select2-repeater-select2multi-result-t384-colour_red","element":{"jQuery11240037265588672245054":3048}},{"selected":true,"disabled":false,"text":"Blue","id":"colour_blue","title":"","_resultId":"select2-repeater-select2multi-result-2em6-colour_blue","element":{"jQuery11240037265588672245054":3049}}]

       beforeEach(() => {
           select2Data = JSON.stringify([
               { id: 'foo', selected: false },
               { id: 'bar', selected: true },
               { id: 'baz', selected: false }
           ]);

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

           $html.find('.js-select2').attr('data-select2', select2Data);
       });

       it('should replace radio inputs', () => {
            const radio = $html[0].querySelectorAll(('[type="radio"]'));
            const clone = radio[0].cloneNode();

            clone.setAttribute('data-clone', 'true');

            inputReplacementService.replace(radio, clone);

            expect($html.find('[type="radio"]').attr('data-clone')).to.equal('true');
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

           inputReplacementService.replace(select, {});

           expect(select[0].children[0].selected).to.be.false;
           expect(select[0].children[1].selected).to.be.true;
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
