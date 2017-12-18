const RepeaterComponent = require('../../../../js/Repeater/RepeaterComponent');
const PulsarFormComponent = require('../../../../js/PulsarFormComponent');
const QueryService = require('../../../../js/utilities/QueryService');
const ActiveFunctionService = require('../../../../js/utilities/ActiveFunctionService');
const InputCloneService = require('../../../../js/Repeater/InputCloneService');
const InputValueService = require('../../../../js/Repeater/InputValueService');
const InputReplacementService = require('../../../../js/Repeater/InputReplacementService');
const UniqueIdService = require('../../../../js/utilities/UniqueIdService');
const RepeaterPreviewService = require('../../../../js/Repeater/RepeaterPreviewService');
const PseudoRadioInputService = require('../../../../js/Repeater/PseudoRadioInputService');
const RepeaterDataService = require('../../../../js/Repeater/RepeaterDataService');
const RepeaterPlaceholderService = require('../../../../js/Repeater/RepeaterPlaceholderService');
const FormFieldResetService = require('../../../../js/utilities/FormFieldResetService');
const $ = require('jquery');
const config = {
    'name': 'data-repeater-name',
    'add-new-group-text': 'data-repeater-add-new-group-text',
    'add-another-group-text': 'data-repeater-add-another-group-text',
    'add-group-form': 'data-repeater-new-group',
    'add-group-button': 'data-repeater-add-group',
    'add-group-controls': 'data-repeater-new-group-controls',
    'edit-group': 'data-repeater-edit-group',
    'delete-group': 'data-repeater-delete-group',
    'edit-id': 'data-repeater-edit-id',
    'save-group-button': 'data-repeater-save-group',
    'cancel-save-group-button': 'data-repeater-cancel-save',
    'max-saved-groups': 'data-repeater-max-entries',
    'preview-colspan': 'data-repeater-preview-colspan',
    'preview-element': 'data-repeater-preview-id',
    'preview-id': 'data-repeater-preview-id',
    'preview-root': 'data-repeater-preview-root',
    'preview-ui': 'data-repeater-preview-ui',
    'preview-heading': 'data-repeater-for-name',
    'preview-placeholder': 'data-repeater-preview-placeholder',
    'preview-update-id': 'data-repeater-preview-update-id',
    'pseudo-radio-id': 'data-pseudo-radio-id',
    'select2-data': 'data-repeater-select2-data',
    'saved-entry-id': 'data-repeater-saved-data-id',
    'saved-entries-root': 'data-repeater-saved-entries-root'
};

describe('RepeaterComponent', () => {
    let repeaterComponent;
    let pulsarFormComponentStub;
    let activeFunctionServiceStub;
    let inputCloneServiceStub;
    let inputValueServiceStub;
    let inputReplacementServiceStub;
    let uniqueIdServiceStub;
    let repeaterPreviewServiceStub;
    let pseudoRadioInputServiceStub;
    let repeaterDataService;
    let repeaterPlaceholderService;
    let $html;
    let $repeater;
    let queryService;
    let formFieldResetServiceStub;

    beforeEach(() => {
        $html = $('<div id="html"></div>');
        queryService = new QueryService($html[0], config);
        $html.append(`
            <div 
                class="repeater"
                ${queryService.getAttr('preview-colspan')}="2"
                ${queryService.getAttr('add-new-group-text')}="test_add"
                ${queryService.getAttr('add-another-group-text')}="test_add_another"
                ${queryService.getAttr('max-saved-groups')}="2"
            >
                <div class="repeater__saved-data" ${queryService.getAttr('saved-entries-root')}>
                
                </div>
                <table class="table table--full repeatable__table">
                    <thead class="repeater__preview-headings">
                        <tr>
                            <th ${queryService.getAttr('preview-heading')}="input-text">input text</th>
                        </tr>
                    </thead>
                    <tbody class="repeater__preview-data" ${queryService.getAttr('preview-root')}>
                        <tr class="repeater__empty-placeholder" ${queryService.getAttr('preview-placeholder')}>
                            <td colspan="2" class="muted">Empty</td>
                        </tr>
                    </tbody>
                </table>
                <div class="repeater__group" ${queryService.getAttr('add-group-form')}>
                    <div ${queryService.getAttr('add-group-controls')}>
                        <input id="input-text" type="text" name="input-text" value="foo!"/>
                    </div>
                    <div>
                        <a href="#" class="repeater__update-group" ${queryService.getAttr('save-group-button')}>save</a>
                        <a href="#" class="repeater__save-group" ${queryService.getAttr('cancel-save-group-button')}>cancel</a>
                    </div>
                </div>
                <div class="repeater__group-actions">
                    <a href="#" class="repeater__add-group" ${queryService.getAttr('add-group-button')}>Add</a>
                </div>
            </div>
        `);
        $repeater = $html.find('.repeater');
        pulsarFormComponentStub = sinon.createStubInstance(PulsarFormComponent);
        activeFunctionServiceStub = sinon.createStubInstance(ActiveFunctionService);
        inputCloneServiceStub = sinon.createStubInstance(InputCloneService);
        inputValueServiceStub = sinon.createStubInstance(InputValueService);
        inputReplacementServiceStub = sinon.createStubInstance(InputReplacementService);
        uniqueIdServiceStub = sinon.createStubInstance(UniqueIdService);
        repeaterPreviewServiceStub = sinon.createStubInstance(RepeaterPreviewService);
        pseudoRadioInputServiceStub = sinon.createStubInstance(PseudoRadioInputService);
        repeaterDataService = sinon.createStubInstance(RepeaterDataService);
        repeaterPlaceholderService = sinon.createStubInstance(RepeaterPlaceholderService);
        formFieldResetServiceStub = sinon.createStubInstance(FormFieldResetService);
        repeaterComponent = new RepeaterComponent(
            $repeater[0],
            pulsarFormComponentStub,
            // Too much stubbing required for this service, we'll pass
            // in a real instance at our own peril
            queryService,
            activeFunctionServiceStub,
            inputCloneServiceStub,
            inputValueServiceStub,
            inputReplacementServiceStub,
            uniqueIdServiceStub,
            repeaterPreviewServiceStub,
            pseudoRadioInputServiceStub,
            repeaterDataService,
            repeaterPlaceholderService,
            formFieldResetServiceStub
        );
    });

    describe('init', () => {
        it('should initiate the pseudo radio service', () => {
            repeaterComponent.init();

            expect(pseudoRadioInputServiceStub.init).to.have.been.calledOnce;
        });

        it('should remove input name attributes in the "new group" form', () => {
            repeaterComponent.init();

            expect($html.find('[name]')).to.have.length.of(0);
        });
    });

    describe('handleAddGroup', () => {
        let event;
        let $repeaterGroup;

        beforeEach(() => {
            repeaterComponent.init($repeater[0]);
            event = { preventDefault: sinon.spy() };
            $repeaterGroup = $repeater.find(queryService.getQuery('add-group-form'));
        });

        it('should prevent the default behaviour of the add button', () => {
            repeaterComponent.handleAddGroup(event);

            expect(event.preventDefault).to.have.been.calledOnce;
        });


        it('should display the repeater new group fields', () => {
            repeaterComponent.handleAddGroup(event);

            expect($repeaterGroup.css('display')).to.not.equal('none');
        });

        it('should disable the add new group button', () => {
            repeaterComponent.handleAddGroup(event);

            expect($repeater.find(queryService.getQuery('add-group-button')).hasClass('disabled')).to.be.true;
        });
    });

    describe('handleSaveGroup', () => {
        let $repeaterGroup;
        let $preview;
        let event;

        beforeEach(() => {
            $preview = $('<div id="preview"></div>');
            event = { preventDefault: sinon.spy() };
            repeaterComponent.init($repeater[0]);
            $repeaterGroup = $repeater.find(queryService.getQuery('add-group-form'));
            inputValueServiceStub.getValue.returns({ value: 'test-value', ref: $repeaterGroup.find('#input-text')[0] });
            inputCloneServiceStub.clone.returns($repeaterGroup.find('#input-text')[0].cloneNode());
            repeaterPreviewServiceStub.create.returns($preview[0]);
        });

        it('should prevent the default event', () => {
            repeaterComponent.handleSaveGroup(event);

            expect(event.preventDefault).to.have.been.calledOnce;
        });

        it('should create the preview element', () => {
            repeaterComponent.handleSaveGroup(event);

            expect($html.find('#preview')).to.have.length.of(1);
        });

        it('should set the colspan and preview ID on the preview element', () => {
            repeaterComponent.handleSaveGroup(event);

            expect($html.find('#preview').attr(queryService.getAttr('preview-id'))).to.equal('0');
        });

        it('should append the preview element to the preview root', () => {
            repeaterComponent.handleSaveGroup(event);

            expect($html.find('#preview').attr('colspan')).to.equal('2');
        });

        it('should append the preview UI to the preview element', () => {
            repeaterComponent.handleSaveGroup(event);

            expect($html.find('#preview').find(queryService.getQuery('preview-ui'))).to.have.length.of(2);
        });

        it('should create the saved representation of the "new group"', () => {
            repeaterComponent.handleSaveGroup(event);

            expect(repeaterDataService.create).to.have.been.calledOnce;
        });

        it('should create an "edit group" form', () => {
            repeaterComponent.handleSaveGroup(event);

            expect($html.find(queryService.getQuery('edit-id'))).to.have.length.of(1);
        });

        it('should remove the empty placeholder', () => {
            repeaterComponent.handleSaveGroup(event);

            expect(repeaterPlaceholderService.remove).to.have.been.calledOnce;
        });

        it('should reset the "new group" fields', () => {
            repeaterComponent.handleSaveGroup(event);

            expect(formFieldResetServiceStub.reset).to.have.been.calledOnce;
            expect(pulsarFormComponentStub.updateColourPicker).to.have.been.calledOnce;
        });

        it('should increment the repeater entries', () => {
            repeaterComponent.handleSaveGroup(event);

            expect(repeaterComponent.repeaterEntries).to.equal(1);
        });

        it('should increment the saved entries', () => {
            repeaterComponent.handleSaveGroup(event);

            expect(repeaterComponent.savedEntries).to.equal(1);
        });

        it('should disable the "add group" button if the max groups has been met', () => {
            const $button = $html.find(queryService.getQuery('add-group-button'));

            // Need to invoke 'handleAddGroup' here to disable the add group button
            repeaterComponent.handleAddGroup(event);
            repeaterComponent.handleSaveGroup(event);

            expect($button.hasClass('disabled')).to.be.false;

            repeaterComponent.handleAddGroup(event);
            repeaterComponent.handleSaveGroup(event);

            expect($button.hasClass('disabled')).to.be.true;
        });

        it('should update the "add group" button text with the "add another" text', () => {
            repeaterComponent.handleSaveGroup(event);

            expect($html.find(queryService.getQuery('add-group-button')).text()).equal('test_add_another');
        });

        it('should re-init select2s in the "add group" form', () => {
            repeaterComponent.handleSaveGroup(event);

            expect(pulsarFormComponentStub.initSelect2).to.have.been.calledOnce;
        });

        it('should hide the "add group" form', () => {
            repeaterComponent.handleSaveGroup(event);

            expect($html.find(queryService.getQuery('add-group-form')).css('display')).to.equal('none');
        });
    });

    describe('createState', () => {
        let $fields;

        beforeEach(() => {
            $fields = $(`
                <div>
                    <input type="text" value="foo" ${queryService.getAttr('name')}="text"/>
                    <input type="radio" value="bar" ${queryService.getAttr('name')}="radio"/>
                    <input type="checkbox" value="baz" ${queryService.getAttr('name')}="checkbox"/>
                </div>
            `);
            inputValueServiceStub.getValue.callsFake((el) => ({
                value: 'test_value',
                ref: el,
                selected: true
            }));
        });

        it('should return a state object from a form group', () => {
            expect(repeaterComponent.createState($fields[0])).to.deep.equal({
                text: {
                    value: [
                        {
                            ref: $fields.find(queryService.getQuery('name'))[0],
                            value: 'test_value',
                            selected: true
                        }
                    ]
                },
                radio: {
                    value: [
                        {
                            ref: $fields.find(queryService.getQuery('name'))[1],
                            value: 'test_value',
                            selected: true
                        }
                    ]
                },
                checkbox: {
                    value: [
                        {
                            ref: $fields.find(queryService.getQuery('name'))[2],
                            value: 'test_value',
                            selected: true
                        }
                    ]
                }
            });
        });
    });

    describe('createEditEntryGroup', () => {
        let $group;
        let $preview;

        beforeEach(() => {
            $repeater.append(`<div ${queryService.getAttr('preview-id')}="0"></div>`);
            $group = $(`
                <div class="repeater__group" ${queryService.getAttr('add-group-form')}>
                    <div ${queryService.getAttr('add-group-controls')}>
                        <input id="input-text" type="text" ${queryService.getAttr('name')}="input-text"/>
                        <input id="input-radio" type="radio" ${queryService.getAttr('name')}="input-text"/>
                    </div>
                    <div>
                        <a href="#" class="repeater__update-group" ${queryService.getAttr('save-group-button')}>save</a>
                        <a href="#" class="repeater__save-group" ${queryService.getAttr('cancel-save-group-button')}>cancel</a>
                    </div>
                </div>
            `);

            inputCloneServiceStub.clone.callsFake((el) => el.cloneNode(true));
            $preview = $repeater.find(queryService.getQuery('preview-id'));
        });

        it('should invoke the input clone service for each input', () => {
            repeaterComponent.createEditEntryGroup($group[0]);

            expect(inputCloneServiceStub.clone).to.have.been.calledTwice;
        });

        it('should add an ID to the edit group', () => {
            repeaterComponent.createEditEntryGroup($group[0]);

            expect($repeater.find(queryService.getQuery('edit-id')).attr(queryService.getAttr('edit-id'))).to.equal('0');
        });

        it('should remove the "add group" attribute from the cloned group', () => {
            repeaterComponent.createEditEntryGroup($group[0]);

            expect($preview.find(queryService.getQuery('add-group-form'))).to.have.length.of(0);
        });

        it('should remove name attributes from fields', () => {
            repeaterComponent.createEditEntryGroup($group[0]);

            expect($repeater.find(`[${queryService.getAttr('edit-id')}="0"]`)).to.have.length.of(1);
            expect($repeater.find(`[${queryService.getAttr('edit-id')}="0"]`).find('[name]')).to.have.length.of(0);
        });

        it('should add the edit group after the corresponding preview', () => {
            repeaterComponent.createEditEntryGroup($group[0]);

            expect($repeater.find(queryService.getQuery('preview-id')).next().attr(queryService.getAttr('edit-id')))
                .to.equal('0');
        });

        it('should invoke the input replacement service on each cloned input', () => {
            repeaterComponent.createEditEntryGroup($group[0]);

            expect(inputReplacementServiceStub.replace).to.have.been.called
        });

        it('should invoke the unique ID service for the newly cloned group', () => {
            repeaterComponent.createEditEntryGroup($group[0]);

            expect(uniqueIdServiceStub.uniquifyFors).to.have.been.calledOnce;
        });

        it('should refresh the pseudo radio input service', () => {
            repeaterComponent.createEditEntryGroup($group[0]);

            expect(pseudoRadioInputServiceStub.refresh).to.have.been.calledOnce;
        });

        it('should refresh the Pulsar form component', () => {
            repeaterComponent.createEditEntryGroup($group[0]);

            expect(pulsarFormComponentStub.refresh).to.have.been.calledOnce;
        });

        it('should hide the edit form', () => {
            repeaterComponent.createEditEntryGroup($group[0]);

            expect($repeater.find(queryService.getQuery('edit-id')).css('display')).to.equal('none');
        });
    });

    describe('handleEditGroup', () => {
        let event;

        beforeEach(() => {
            event = { preventDefault: sinon.spy() };
            $html.find(queryService.getQuery('preview-root')).append(`
                <div ${queryService.getAttr('edit-id')}="666" style="display: none"></div>
            `);
        });

        it('should prevent default behaviour', () => {
            repeaterComponent.handleEditGroup(666, event);

            expect(event.preventDefault).to.have.been.calledOnce;
        });

        it('should toggle the preview UI state', () => {
            repeaterComponent.handleEditGroup(666, event);

            expect(repeaterPreviewServiceStub.toggleUi).to.have.been.calledOnce;
        });

        it('should disable the "add group" button', () => {
            repeaterComponent.handleEditGroup(666, event);

            expect($repeater.find(queryService.getQuery('add-group-button')).hasClass('disabled')).to.be.true;
        });

        it('should show the edit form', () => {
            repeaterComponent.handleEditGroup(666, event);

            expect($repeater.find(queryService.getQuery('edit-id')).css('display')).to.not.equal('none');
        });
    });

    describe('handleDeleteGroup', () => {
        let event;

        beforeEach(() => {
            event = { preventDefault: sinon.spy() };
            $html.find(queryService.getQuery('saved-entries-root')).append(`
                <div ${queryService.getAttr('saved-entry-id')}="666"></div>
            `);
            $html.find(queryService.getQuery('preview-root')).append(`
                <div ${queryService.getAttr('preview-id')}="666"></div>
                <div ${queryService.getAttr('edit-id')}="666" style="display: none"></div>
            `);
            // Need to init the service to parse max saved groups
            repeaterComponent.init();
        });

        it('should prevent default behaviour', () => {
            repeaterComponent.handleDeleteGroup(666, event);

            expect(event.preventDefault).to.have.been.calledOnce;
        });

        it('should remove the preview element', () =>{
            repeaterComponent.handleDeleteGroup(666, event);

            expect($repeater.find(`[${queryService.getAttr('preview-id')}="666"]`).length).to.equal(0);
        });

        it('should remove the edit group', () => {
            repeaterComponent.handleDeleteGroup(666, event);

            expect($repeater.find(`[${queryService.getAttr('edit-id')}="666"]`).length).to.equal(0);
        });

        it('should remove the saved entry', () => {
            repeaterComponent.handleDeleteGroup(666, event);

            expect($repeater.find(`[${queryService.getAttr('saved-entry-id')}="666"]`).length).to.equal(0);
        });

        it('should update the saved entries count', () => {
            repeaterComponent.savedEntries = 666;

            repeaterComponent.handleDeleteGroup(666, event);

            expect(repeaterComponent.savedEntries).to.equal(665);
        });

        it('should enable the "add group" button if max entries is not exceeded', () => {
            const $button = $repeater.find(queryService.getQuery('add-group-button'));

            $button.addClass('disabled');
            repeaterComponent.savedEntries = 2;

            repeaterComponent.handleDeleteGroup(666, event);

            expect($button.hasClass('disabled')).to.be.false;
        });

        it('should update the "add group" text if there are not saved groups', () => {
            const $button = $repeater.find(queryService.getQuery('add-group-button'));

            $button.text('the incorrect text');

            repeaterComponent.handleDeleteGroup(666, event);

            expect($button.text()).to.equal('test_add');
        });

        it('should add the empty placeholder if there are no saved groups', () => {
            repeaterComponent.handleDeleteGroup(666, event);

            expect(repeaterPlaceholderService.add).to.have.been.calledOnce;
        });
    });

    describe('handleCancelGroup', () => {
        let event;

        beforeEach(() => {
            event = { preventDefault: sinon.spy() };
        });

        it('should prevent the default behaviour', () => {
            repeaterComponent.handleCancelGroup(event);

            expect(event.preventDefault).to.have.been.calledOnce;
        });

        it('should reset the "new group" fields', () => {
            repeaterComponent.handleCancelGroup(event);

            expect(formFieldResetServiceStub.reset).to.have.been.calledOnce;
            expect(pulsarFormComponentStub.updateColourPicker).to.have.been.calledOnce;
        });

        it('should hide the "new group" form', () => {
            repeaterComponent.handleCancelGroup(event);

            expect($repeater.find(queryService.getQuery('add-group-form')).css('display')).to.equal('none');
        });
    });

    describe('handleUpdateGroup', () => {
        let event;
        let $group;

        beforeEach(() => {
            event = { preventDefault: sinon.spy() };
            $group = $(`
                <div class="repeater__group" ${queryService.getAttr('add-group-form')}>
                    <div ${queryService.getAttr('add-group-controls')}>
                        <input id="input-text" type="text" ${queryService.getAttr('name')}="input-text"/>
                        <input id="input-radio" type="radio" ${queryService.getAttr('name')}="input-text"/>
                    </div>
                </div>
            `);
            inputValueServiceStub.getValue.callsFake((el) => ({
                value: 'test_value',
                ref: el,
                selected: true
            }));
        });

        it('should prevent the default behaviour', () => {
            repeaterComponent.handleUpdateGroup($group[0], 666, event);

            expect(event.preventDefault).to.have.been.calledOnce;
        });

        it('should update the preview service', () => {
            repeaterComponent.handleUpdateGroup($group[0], 666, event);

            expect(repeaterPreviewServiceStub.update).to.have.been.calledOnce;
        });

        it('should update the data service', () => {
            repeaterComponent.handleUpdateGroup($group[0], 666, event);

            expect(repeaterDataService.update).to.have.been.calledOnce;
        });

        it('should toggle the preview UI', () => {
            repeaterComponent.handleUpdateGroup($group[0], 666, event);

            expect(repeaterPreviewServiceStub.toggleUi).to.have.been.calledOnce;
        });

        it('should enable the "add group" button if we are not at capacity', () => {
            const $button = $repeater.find(queryService.getQuery('add-group-button'));

            repeaterComponent.handleUpdateGroup($group[0], 666, event);

            expect($button.hasClass('disabled')).to.be.false;

            repeaterComponent.maxEntries = -1;
            $button.addClass('disabled');

            repeaterComponent.handleUpdateGroup($group[0], 666, event);

            expect($button.hasClass('disabled')).to.be.true;
        });

        it('should hide the group', () => {
            repeaterComponent.handleUpdateGroup($group[0], 666, event);

            expect($group.css('display')).to.equal('none');
        });
    });

    describe('handleCancelGroupUpdate', () => {
        let event;
        let $group;

        beforeEach(() => {
            event = { preventDefault: sinon.spy() };
            $group = $(`
                <div class="repeater__group" ${queryService.getAttr('add-group-form')}>
                    <div ${queryService.getAttr('add-group-controls')}>
                        <input id="input-text" type="text" ${queryService.getAttr('name')}="input-text"/>
                        <input id="input-radio" type="radio" ${queryService.getAttr('name')}="input-radio"/>
                    </div>
                </div>
            `);

            repeaterComponent.state = [
                {
                    'input-text': {
                        value: [
                            { value: '', selected: true, ref: $group.find('#input-text')[0] }
                        ]
                    },
                    'input-radio': {
                        value: [
                            { value: '', selected: false, ref: $group.find('#input-radio')[0] }
                        ]
                    }
                }
            ];
        });

        it('should prevent the default behaviour', () => {
            repeaterComponent.handleCancelGroupUpdate($group[0], 0, event);

            expect(event.preventDefault).to.have.been.calledOnce;
        });

        it('should invoke the setValue service for each input in the state', () => {
            repeaterComponent.handleCancelGroupUpdate($group[0], 0, event);

            expect(inputValueServiceStub.setValue).to.have.been.calledTwice;
        });

        it('should set the pseudo radio service state', () => {
            repeaterComponent.handleCancelGroupUpdate($group[0], 0, event);

            expect(pseudoRadioInputServiceStub.setState).to.have.been.calledOnce;
        });

        it('should toggle the preview UI', () => {
            repeaterComponent.handleCancelGroupUpdate($group[0], 0, event);

            expect(repeaterPreviewServiceStub.toggleUi).to.have.been.calledOnce;
        })

        it('should enable the "add group" button if we are not at capacity', () => {
            const $button = $repeater.find(queryService.getQuery('add-group-button'));

            repeaterComponent.handleCancelGroupUpdate($group[0], 0, event);

            expect($button.hasClass('disabled')).to.be.false;

            repeaterComponent.maxEntries = -1;
            $button.addClass('disabled');

            repeaterComponent.handleCancelGroupUpdate($group[0], 0, event);

            expect($button.hasClass('disabled')).to.be.true;
        });

        it('should update colour pickers', () => {
            repeaterComponent.handleCancelGroupUpdate($group[0], 0, event);

            expect(pulsarFormComponentStub.updateColourPicker).to.have.been.calledOnce;
        });

        it('should hide the group', () => {
            repeaterComponent.handleCancelGroupUpdate($group[0], 0, event);

            expect($group.css('display')).to.equal('none');
        });
    });

    describe('removeGroupInputNames', () => {
        let $group;

        beforeEach(() => {
            $group = $(`
                <div>
                    <input name="foo"/>
                    <input name="foo"/>
                    <input name="foo"/>
                </div>
            `);
        });

        it('should remove name atribtues and replace with our pseudo names', () => {
            repeaterComponent.removeGroupInputNames($group[0]);

            $group.children().each((index, element) => {
                expect(element.getAttribute('name')).to.be.null;
                expect(element.getAttribute(queryService.getAttr('name'))).to.equal('foo');
            });
        });
    });
});
