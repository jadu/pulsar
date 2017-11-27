const RepeaterPreviewService = require('../../../../js/Repeater/RepeaterPreviewService');
const QueryService = require('../../../../js/Repeater/QueryService');
const ActiveFunctionService = require('../../../../js/Repeater/ActiveFunctionService');
const $ = require('jquery');

describe('RepeaterPreviewService', () => {
    let repeaterPreviewService;
    let queryServiceStub;
    let activeFunctionService;

    beforeEach(() => {
        queryServiceStub = sinon.createStubInstance(QueryService);
        activeFunctionService = sinon.createStubInstance(ActiveFunctionService);
        repeaterPreviewService = new RepeaterPreviewService(
            queryServiceStub,
            activeFunctionService
        );
    });

    describe('create', () => {
        let $html;
        let headings;
        let root;

        beforeEach(() => {
            $html = $(`
                <div id="html">
                    <table>
                        <thead class="repeater__preview-headings">
                            <tr>
                                <th data-repeater-for-name="input-foo">input foo</th>
                                <th data-repeater-for-name="input-bar">input bar</th>
                            </tr>
                        </thead>
                        <tbody class="repeater__preview-data">
                        </tbody>
                    </table>
                </div>
            `);
            headings = $html.find('[data-repeater-for-name]').toArray();
            root = $html.find('.repeater__preview-data')[0];
        })

        it('should create preview elements for each headings and append them to the DOM', () => {
            const state = {
                'input-foo': [
                    { value: 'foo', selected: true }
                ],
                'input-bar': [
                    { value: 'bar', selected: true }
                ]
            };

            repeaterPreviewService.create(state, headings, root);

            expect(root.children).to.have.length.of(2);

            // Expect each preview to contain the corresponding value property from the state
            $(root).find('[data-repeater-update-id]').each((index, element) => {
                expect(element.innerText).to.equal(state[Object.keys(state)[index]][0].value);
            });
        });

        it('should create empty placeholders for elements that are not selected or empty', () => {
            const state = {
                'input-foo': [
                    { value: '', selected: true }
                ],
                'input-bar': [
                    { value: 'bar', selected: false }
                ]
            };

            repeaterPreviewService.create(state, headings, root);

            expect(root.children).to.have.length.of(2);

            // Expect each preview to contain the empty placeholder
            $(root).find('[data-repeater-update-id]').each((index, element) => {
                expect(element.innerText).to.equal('empty');
            });
        });

        it('should handle state that contains multiple selectable inputs', () => {
            const state = {
                'input-foo': [
                    { value: 'foo', selected: false },
                    { value: 'bar', selected: true },
                    { value: 'baz', selected: false }
                ],
                'input-bar': [
                    { value: 'foo', selected: false },
                    { value: 'bar', selected: true },
                    { value: 'baz', selected: true }
                ]
            };

            repeaterPreviewService.create(state, headings, root);

            expect($(root).find('[data-repeater-update-id]')[0].innerText).to.equal(
                state['input-foo']
                    .filter(s => s.selected)
                    .map(v => v.value)
                    .join(', ')
            );

            expect($(root).find('[data-repeater-update-id]')[1].innerText).to.equal(
                state['input-bar']
                    .filter(s => s.selected)
                    .map(v => v.value)
                    .join(', ')
            );
        });
    });

    describe('update', () => {
        let $html;
        let headings;
        let root;

        beforeEach(() => {
            $html = $(`
                <div id="html">
                    <table>
                        <thead class="repeater__preview-headings">
                            <tr>
                                <th data-repeater-for-name="input-foo">input foo</th>
                                <th data-repeater-for-name="input-bar">input bar</th>
                            </tr>
                        </thead>
                        <tbody class="repeater__preview-data">
                            <tr>
                                <td data-repeater-update-id="input-foo">foo</td>
                                <td data-repeater-update-id="input-bar">bar</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            `);

            headings = $html.find('[data-repeater-for-name]').toArray();
            root = $html.find('.repeater__preview-data')[0];
        })

        it('should update preview elements with new state', () => {
            const state = {
                'input-foo': [
                    { value: 'foo', selected: false },
                    { value: 'bar', selected: false },
                    { value: 'baz', selected: true }
                ],
                'input-bar': [
                    { value: 'bar', selected: false }
                ]
            };

            repeaterPreviewService.update(state, headings, root);

            expect($(root).find('[data-repeater-update-id]')[0].innerText).to.equal('baz');
            expect($(root).find('[data-repeater-update-id]')[1].innerText).to.equal('empty');
        });
    });
});
