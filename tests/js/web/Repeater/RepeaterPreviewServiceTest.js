const RepeaterPreviewService = require('../../../../js/Repeater/RepeaterPreviewService');
const ActiveFunctionService = require('../../../../js/utilities/ActiveFunctionService');
const InputValueService = require('../../../../js/Repeater/InputValueService');
const $ = require('jquery');

describe('RepeaterPreviewService', () => {
    let repeaterPreviewService;
    let activeFunctionServiceStub;
    let inputValueServiceStub;
    let $html;

    beforeEach(() => {
        $html = $('<div id="html">');
        activeFunctionServiceStub = sinon.createStubInstance(ActiveFunctionService);
        inputValueServiceStub = sinon.createStubInstance(InputValueService);
        repeaterPreviewService = new RepeaterPreviewService(
            $html[0],
            inputValueServiceStub
        );

        inputValueServiceStub.printValue.returns('printed value');

        $('body').append($html);
    });

    afterEach(() => {
        $html.remove();
    });

    describe('create', () => {
        let headings;
        let root;

        beforeEach(() => {
            $html.append(`
                <table>
                    <thead class="repeater__preview-headings">
                        <tr>
                            <th data-repeater-for-name="input-foo">input foo</th>
                            <th data-repeater-for-name="input-bar">input bar</th>
                        </tr>
                    </thead>
                    <tbody data-repeater-preview-root class="repeater__preview-data">
                    </tbody>
                </table>
            `);
            headings = $html.find('[data-repeater-for-name]').toArray();
            root = $html.find('.repeater__preview-data')[0];
        });

        it('should throw if a heading is present that references an item not in the state', () => {
            expect(() => {
                repeaterPreviewService.create({}, headings);
            }).to.throw();
        });

        it('should create preview elements for each headings and append them to the DOM', () => {
            const state = {
                'input-foo': { value: [ { value: 'foo', selected: true } ] },
                'input-bar': { value: [ { value: 'bar', selected: true } ] }
            };
            const row = repeaterPreviewService.create(state, headings, 666);

            expect($(row).find('[data-repeater-preview-update-id]')).to.have.length.of(Object.keys(state).length);

            // Expect each preview to contain the corresponding value property from the state
            $(row).find('[data-repeater-preview-update-id]').each((index, element) => {
                expect(element.innerText).to.equal('printed value');
            });
        });

        it('should create empty placeholders for elements that are not selected or empty', () => {
            const state = {
                'input-foo': { value: [ { value: 'foo', selected: false } ] },
                'input-bar': { value: [ { value: 'bar', selected: false } ] }
            };
            const row = repeaterPreviewService.create(state, headings, root);

            expect($(row).find('[data-repeater-preview-update-id]')).to.have.length.of(Object.keys(state).length);

            // Expect each preview to contain the empty placeholder
            $(row).find('[data-repeater-preview-update-id]').each((index, element) => {
                expect(element.innerText).to.equal('empty');
            });
        });

        it('should handle state that contains multiple selectable inputs', () => {
            const state = {
                'input-foo': {
                    value: [
                        { value: 'bar', selected: true },
                        { value: 'foo', selected: false },
                        { value: 'baz', selected: false }
                    ]
                },
                'input-bar': {
                    value: [
                        { value: 'foo', selected: false },
                        { value: 'bar', selected: true },
                        { value: 'baz', selected: true }
                    ]
                }
            };
            const row = repeaterPreviewService.create(state, headings, root);

            expect($(row).find('[data-repeater-preview-update-id]')[0].innerText).to.equal('printed value');
            expect($(row).find('[data-repeater-preview-update-id]')[1].innerText).to.equal('printed value, printed value');
        });
    });


    describe('update', () => {
        let headings;
        let root;

        beforeEach(() => {
            $html.append(`
                <table>
                    <thead class="repeater__preview-headings">
                        <tr>
                            <th data-repeater-for-name="input-foo">input foo</th>
                            <th data-repeater-for-name="input-bar">input bar</th>
                        </tr>
                    </thead>
                    <tbody class="repeater__preview-data">
                        <tr>
                            <td data-repeater-preview-update-id="input-foo_0">foo</td>
                            <td data-repeater-preview-update-id="input-bar_0">bar</td>
                        </tr>
                    </tbody>
                </table>
            `);

            headings = $html.find('[data-repeater-for-name]').toArray();
            root = $html.find('.repeater__preview-data')[0];
        });

        it('should update preview elements with new state', () => {
            const state = {
                'input-foo': {
                    value: [
                        { value: 'foo', selected: false },
                        { value: 'bar', selected: false },
                        { value: 'baz', selected: true }
                    ]
                },
                'input-bar': {
                    value: [
                        { value: 'bar', selected: false }
                    ]
                }
            };

            repeaterPreviewService.update(state, headings, root, 0);

            expect($(root).find('[data-repeater-preview-update-id]')[0].innerText).to.equal('printed value');
            expect($(root).find('[data-repeater-preview-update-id]')[1].innerText).to.equal('empty');
        });
    });

    describe('toggleUi', () => {
        let root;

        beforeEach(() => {
            $html.append(`
                <div id="ui">
                    <div data-repeater-preview-id="0">
                        <button data-repeater-preview-ui class="disabled" disabled>button 1</button>
                    </div>
                    <div data-repeater-preview-id="1">
                        <button data-repeater-preview-ui class="">button 2</button>
                    </div>
                    <div data-repeater-preview-id="2">
                        <button data-repeater-preview-ui class="">button 3</button>
                    </div>
                </div>
            `);

            root = $html.find('#ui')[0];
        });

        it('should toggle all preview uis', () => {
            repeaterPreviewService.toggleUi();

            expect($(root).find('[data-repeater-preview-ui]').eq(0).attr('class')).to.equal('');
            expect($(root).find('[data-repeater-preview-ui]').eq(1).attr('class')).to.equal('disabled');
            expect($(root).find('[data-repeater-preview-ui]').eq(2).attr('class')).to.equal('disabled');

            repeaterPreviewService.toggleUi();

            expect($(root).find('[data-repeater-preview-ui]').eq(0).attr('class')).to.equal('disabled');
            expect($(root).find('[data-repeater-preview-ui]').eq(1).attr('class')).to.equal('');
            expect($(root).find('[data-repeater-preview-ui]').eq(2).attr('class')).to.equal('');
        });
    });

    describe('print', () => {
        it('should invoke the input service to print whilst concatenating multiple values', () => {
            inputValueServiceStub.printValue.returns('printed value');

            expect(repeaterPreviewService.print({}, 'empty', 'foo')).to.equal('printed value');
            expect(repeaterPreviewService.print({}, 'bar', 'foo')).to.equal('bar, printed value');
        });
    });
});
