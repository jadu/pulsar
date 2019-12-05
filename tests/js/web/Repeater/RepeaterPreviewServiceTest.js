const RepeaterPreviewService = require('../../../../js/Repeater/RepeaterPreviewService');
const QueryService = require('../../../../js/utilities/QueryService');
const ActiveFunctionService = require('../../../../js/utilities/ActiveFunctionService');
const InputValueService = require('../../../../js/Repeater/InputValueService');
const $ = require('jquery');

describe('RepeaterPreviewService', () => {
    let repeaterPreviewService;
    let queryServiceStub;
    let activeFunctionServiceStub;
    let inputValueServiceStub;

    beforeEach(() => {
        queryServiceStub = sinon.createStubInstance(QueryService);
        activeFunctionServiceStub = sinon.createStubInstance(ActiveFunctionService);
        inputValueServiceStub = sinon.createStubInstance(InputValueService);
        repeaterPreviewService = new RepeaterPreviewService(
            queryServiceStub,
            activeFunctionServiceStub,
            inputValueServiceStub
        );

        queryServiceStub.getAttr.withArgs('preview-heading').returns('data-repeater-for-name');
        queryServiceStub.getAttr.withArgs('preview-update-id').returns('data-repeater-update-id');
        inputValueServiceStub.printValue.returns('printed value');
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

            expect($(row).find('[data-repeater-update-id]')).to.have.length.of(Object.keys(state).length);

            // Expect each preview to contain the corresponding value property from the state
            $(row).find('[data-repeater-update-id]').each((index, element) => {
                expect(element.innerText).to.equal('printed value');
            });
        });

        it('should create empty placeholders for elements that are not selected or empty', () => {
            const state = {
                'input-foo': { value: [ { value: 'foo', selected: false } ] },
                'input-bar': { value: [ { value: 'bar', selected: false } ] }
            };
            const row = repeaterPreviewService.create(state, headings, root);

            expect($(row).find('[data-repeater-update-id]')).to.have.length.of(Object.keys(state).length);

            // Expect each preview to contain the empty placeholder
            $(row).find('[data-repeater-update-id]').each((index, element) => {
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

            expect($(row).find('[data-repeater-update-id]')[0].innerText).to.equal('printed value');
            expect($(row).find('[data-repeater-update-id]')[1].innerText).to.equal('printed value, printed value');
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
                                <td data-repeater-update-id="input-foo_0">foo</td>
                                <td data-repeater-update-id="input-bar_0">bar</td>
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

            expect($(root).find('[data-repeater-update-id]')[0].innerText).to.equal('printed value');
            expect($(root).find('[data-repeater-update-id]')[1].innerText).to.equal('empty');
        });
    });

    describe('toggleUi', () => {
        let $html;
        let root;

        beforeEach(() => {
            $html = $(`
                <div id="html">
                    <div id="ui">
                        <div>
                            <div data-preview-id="0" data-preview-ui class="disabled"></div>
                        </div>
                        <div>
                            <div data-preview-id="1" data-preview-ui class=""></div>
                        </div>
                        <div>
                            <div data-preview-id="2" data-preview-ui class=""></div>
                        </div>
                    </div>
                </div>
            `);

            root = $html.find('#ui')[0];
        });

        it('should toggle all preview IDs if no ID is provided', () => {
            queryServiceStub.getAttr.withArgs('preview-id').returns('data-preview-id');
            queryServiceStub.getQuery.withArgs('preview-ui').returns('[data-preview-ui]');
            queryServiceStub.get.returns([].slice.call(root.children));

            repeaterPreviewService.toggleUi();

            expect(root.children[0].firstElementChild.className).to.equal('');
            expect(root.children[1].firstElementChild.className).to.equal('disabled');
            expect(root.children[2].firstElementChild.className).to.equal('disabled');

            repeaterPreviewService.toggleUi();

            expect(root.children[0].firstElementChild.className).to.equal('disabled');
            expect(root.children[1].firstElementChild.className).to.equal('');
            expect(root.children[2].firstElementChild.className).to.equal('');
        });

        it('should disable a specific preview IU element by ID', () => {
            queryServiceStub.getAttr.withArgs('preview-id').returns('data-preview-id');
            queryServiceStub.getQuery.withArgs('preview-ui').returns('[data-preview-ui]');
            queryServiceStub.get.returns([].slice.call(root.children));

            repeaterPreviewService.toggleUi(1);

            expect(root.children[1].firstElementChild.className).to.equal('disabled');
            expect(root.children[1].firstElementChild.getAttribute('disabled')).to.equal('disabled');

            repeaterPreviewService.toggleUi(1);

            expect(root.children[1].firstElementChild.className).to.equal('');
            expect(root.children[1].firstElementChild.getAttribute('disabled')).to.be.null;
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
