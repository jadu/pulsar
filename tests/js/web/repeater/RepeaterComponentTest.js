import RepeaterComponent from '../../../../js/Repeater/RepeaterComponent';
import $ from 'jquery';

describe('RepeaterComponent', () => {
    let repeaterComponent;
    let $html;
    let $repeater;
    let windowMock;

    beforeEach(() => {
        $html = $(`
            <div id="html">
                <div class="repeater">
                    <div class="repeater__saved-data"></div>
                    <table class="table table--full repeatable__table">
                        <thead class="repeater__preview-headings">
                            <tr>
                                <th data-repeater-for-name="input-text">input text</th>
                            </tr>
                        </thead>
                        <tbody class="repeater__preview-data">
                            <tr class="repeater__empty-placeholder">
                                <td colspan="2" class="muted">Empty</td>
                            </tr>
                        </tbody>
                    </table>
                    <div class="repeater__group" data-repeater-new-group>
                        <input id="input-text" type="text" name="input-text"/>
                        <a href="#" class="repeater__update-group" data-repeater-save-group>save</a>
                        <a href="#" class="repeater__save-group" data-repeater-cancel-save>cancel</a>
                    </div>
                    <div class="repeater__group-actions">
                        <a href="#" class="repeater__add-group" data-repeater-add-group>Add</a>
                        <a href="#" class="repeater__cancel-group" data-repeater-cancel-group>cancel</a>
                    </div>
                </div>
            </div>
        `);
        windowMock = { getComputedStyle: sinon.stub() };
        $repeater = $html.find('.repeater');
        repeaterComponent = new RepeaterComponent(windowMock);
    });

    describe('getQueryReference', () => {
        beforeEach(() => {
            repeaterComponent.init($repeater[0]);
        });

        it('should return a reference to a node', () => {
            const query = repeaterComponent.getQueryReference({ query: '.repeater__group' });

            expect($repeater.find('.repeater__group')[0]).to.equal(query);
        });
    });

    describe('removeGroupInputNames', () => {
        beforeEach(() => {
            repeaterComponent.init($repeater[0]);
        });

        it('should remove name attributes and replace with data attributes', () => {
            const $input = $repeater.find('#input-text');

            expect($input.attr('name')).to.be.falsy;
            expect($input.attr('data-repeater-name')).to.equal('input-text');
        });
    });

    describe('handleAddGroup', () => {
        let event;
        let $repeaterGroup;

        beforeEach(() => {
            repeaterComponent.init($repeater[0]);
            event = { preventDefault: sinon.spy() };
            $repeaterGroup = $repeater.find('.repeater__group');
            windowMock.getComputedStyle.returns({ display: 'none' });
        });

        afterEach(() => {
            windowMock.getComputedStyle.reset();
        });

        it('should prevent the default behaviour of the add button', () => {
            repeaterComponent.handleAddGroup(event);

            expect(event.preventDefault).to.have.been.calledOnce;
        });


        it('should display the repeater new group fields', () => {
            repeaterComponent.handleAddGroup(event);



            expect($repeaterGroup.css('display')).to.not.equal('none');
        });
    });

    describe('saveGroupAsEntry', () => {
        let event;
        let $repeaterGroup;

        beforeEach(() => {
            repeaterComponent.init($repeater[0]);
            event = { preventDefault: sinon.spy() };
            $repeaterGroup = $repeater.find('.repeater__group');
        });

        it('should create a new repeater entry in the repeater entry root', () => {
            const value = 'test_value';
            let entry;

            // add a value to one of the inputs
            $repeaterGroup.find(':input').filter('#input-text').val(value);
            // // save repeater group
            entry = repeaterComponent.saveGroupAsEntry();

            expect(entry.data[0]).to.deep.equal({ name: 'input-text', value: value });
            expect(entry.id).to.equal(0);
        });
    });

    describe('createPreviewDataElement', () => {
        it('should create a data preview element', () => {
            const getAttr = sinon.stub().withArgs('data-repeater-for-name').returns('test_name');
            const data = { clone: {}, data: [{ name: 'test_name', value: 'test_value' }] };
            const element = { getAttribute: getAttr };
            const [ actual ] = repeaterComponent.createPreviewDataElement(data.data, [], element);

           expect(actual.textContent).to.equal('test_value');
           expect(actual.getAttribute('data-repeater-update-id')).to.equal('test_name_0');
        });
    });

    describe('createEntryPreview', () => {
        let $input;
        let $entryRoot;

        beforeEach(() => {
            repeaterComponent.init($repeater[0]);
            $entryRoot = $repeater.find('.repeater__preview-data');
            $input = $repeater.find('#input-text');
            $input.val('test_input');
        });

        it('should create an entry preview for a saved group', () => {
            const entry = repeaterComponent.saveGroupAsEntry();
            let $preview;

            repeaterComponent.createEntryPreview(entry.data);
            $preview = $entryRoot.find('[data-repeater-preview-id]');

            // expect to have a preview element for each object in the entry data
            expect($preview.children().length).to.equal(entry.data.length);

            $preview.children().each((index, preview) => {
                // expect the content of the preview to match the entry data
                expect(preview.textContent).to.equal(entry.data[index].value);
            });
        });
    });

    describe('removePlaceholder, addPlaceholder', () => {
        let $previewRoot;

        beforeEach(() => {
            repeaterComponent.init($repeater[0]);
            $previewRoot = $repeater.find('.repeater__preview-data');
        });

        it('should remove the placeholder element', () => {
            expect($previewRoot.find('.repeater__empty-placeholder')).to.have.length.of(1);

            repeaterComponent.removePlaceholder();

            expect($previewRoot.find('.repeater__empty-placeholder')).to.have.length.of(0);

            repeaterComponent.addPlaceholder();

            expect($previewRoot.find('.repeater__empty-placeholder')).to.have.length.of(1);
        });
    });

    describe('resetGroupFields', () => {
        let $input;
        let $group;

        beforeEach(() => {
            repeaterComponent.init($repeater[0]);
            $group = $repeater.find('.repeater__group');
            $input = $repeater.find('#input-text');
            $input.val('test_input');
        });

        it('should reset all input inside the group', () => {
            repeaterComponent.resetGroupFields();

            expect($input.val()).to.equal('');
        });
    });

    describe('createEditEntryGroup', () => {
        let $repeaterGroup;
        let $previewData;
        let $input;

        beforeEach(() => {
            repeaterComponent.init($repeater[0]);
            $repeaterGroup = $repeater.find('.repeater__group');
            $previewData = $repeater.find('.repeater__preview-data');
            $input = $repeater.find('#input-text');
            $input.val('test_input');
        });

        it('should insert an edit form after the preview', () => {
            const { data, clone } = repeaterComponent.saveGroupAsEntry();
            const preview = repeaterComponent.createEntryPreview(data);
            let $clonedInputs;

            repeaterComponent.createEditEntryGroup(clone, preview);
            $clonedInputs = $(clone).find(':input').not('button');

            // expect the entry clone to be inserted after the preview with a corresponding ID
            expect($previewData.find('[data-repeater-preview-id="0"]').next().attr('data-repeater-edit-id'))
                .to.equal('0');

            $clonedInputs.each((index, input) => {
                expect(input.getAttribute('name')).to.be.falsy;
            });

            // expect the new-group attr to have been removed from the cloned group
            expect($previewData.find('[data-repeater-edit-id="0"]').attr('data-repeater-new-group')).to.be.undefined;
        });
    });

    describe('createPreviewUi', () => {
        let $previewData;
        let $input;

        beforeEach(() => {
            repeaterComponent.init($repeater[0]);
            $previewData = $repeater.find('.repeater__preview-data');
            $input = $repeater.find('#input-text');
            $input.val('test_input');
        });

        it('should add UI HTML to the preview row', () => {
            const entry = repeaterComponent.saveGroupAsEntry();
            const preview = repeaterComponent.createEntryPreview(entry.data);
            let $previewElement;

            repeaterComponent.createEntryPreviewUi(preview);
            $previewElement = $previewData.find('[data-repeater-preview-id="0"]');

            // expect the UI elements to have been appended to the preview row
            expect($previewElement.find('[data-repeater-edit-group]')).to.have.length.of(1);
            expect($previewElement.find('[data-repeater-delete-group]')).to.have.length.of(1);
        });
    });

    describe('handleUpdateGroup', () => {
        let $input;

        beforeEach(() => {
            repeaterComponent.init($repeater[0]);
            $input = $repeater.find('#input-text');
            $input.val('test_input');
        });

        it('should update the preview value', () => {
            const event = { preventDefault: sinon.spy () }
            const { data, clone } = repeaterComponent.saveGroupAsEntry();
            const preview = repeaterComponent.createEntryPreview(data);
            const $dataRoot = $repeater.find('.repeater__saved-data');
            let $updateInput;
            let $savedInput;

            repeaterComponent.createEditEntryGroup(clone, preview);
            repeaterComponent.createEntryGroupData(clone);
            $updateInput = $(clone).find('#input-text');
            $savedInput = $dataRoot.find('#input-text');
            $updateInput.val('updated_value');
            repeaterComponent.handleUpdateGroup(clone, 0, event);

            expect($(preview).first().text()).to.equal('updated_value');
            expect($savedInput.val()).to.equal('updated_value');
        });
    });

    describe('createEntryGroupData', () => {
        let $input;

        beforeEach(() => {
            repeaterComponent.init($repeater[0]);
            $input = $repeater.find('#input-text');
            $input.val('test_input');
        });

        it('should create a saved entry data element and append to the DOM', () => {
            const { data, clone } = repeaterComponent.saveGroupAsEntry();
            const $dataRoot = $repeater.find('.repeater__saved-data');
            let $savedInput;

            repeaterComponent.removeGroupInputNames(clone);
            repeaterComponent.createEntryGroupData(clone);
            $savedInput = $dataRoot.find('#input-text');

            // expect the saved input to have a name attribute
            expect($savedInput.attr('name')).to.equal('input-text');
            // expect there to be a child input for each entry in the entry data
            expect($dataRoot.find('[data-repeater-saved-data-id="0"]').children(':input')).to.have.length.of(data.length);
        });
    });

    describe('handleCancelGroupUpdate', () => {
        let $input;

        beforeEach(() => {
            repeaterComponent.init($repeater[0]);
            $input = $repeater.find('#input-text');
            $input.val('test_input');
        });

        it('should restore changes to edit group if update is cancelled', () => {
            const event = { preventDefault: sinon.spy () }
            const { data, clone } = repeaterComponent.saveGroupAsEntry();
            const preview = repeaterComponent.createEntryPreview(data);
            let $updateInput;

            repeaterComponent.createEditEntryGroup(clone, preview);
            repeaterComponent.createEntryGroupData(clone);
            $updateInput = $(clone).find('#input-text');
            $updateInput.val('updated_input');
            repeaterComponent.handleCancelGroupUpdate(clone, 0, event);

            // expect inputs with edited values to be restored if the edit is cancelled
            expect($updateInput.val()).to.equal('test_input');
        });
    });

    describe('handleDeleteGroup', () => {
        let $input;
        let $savedData;

        beforeEach(() => {
            repeaterComponent.init($repeater[0]);
            $input = $repeater.find('#input-text');
            $savedData = $repeater.find('.repeater__saved-data');
            $input.val('test_input');
        });

        it('should remove the preview row and saved data', () => {
            const event = { preventDefault: sinon.spy () }
            const { data, clone } = repeaterComponent.saveGroupAsEntry();
            const preview = repeaterComponent.createEntryPreview(data);

            repeaterComponent.createEditEntryGroup(clone, preview);
            repeaterComponent.createEntryGroupData(clone);

            // expect all of our DOM to be in place before removing
            expect($savedData.children()).to.have.length.of(1);
            expect(preview).to.be.truthy;
            expect(clone).to.be.truthy;

            repeaterComponent.handleDeleteGroup(0, event);

            // expect all the things to be removed
            expect($savedData.children()).to.have.length.of(0);
            expect(preview).to.be.falsy;
            expect(clone).to.be.falsy;
        });
    });
});
