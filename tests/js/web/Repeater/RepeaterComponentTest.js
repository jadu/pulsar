const RepeaterComponent = require('../../../../js/Repeater/RepeaterComponent');
const PulsarFormComponent = require('../../../../js/PulsarFormComponent');
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
const FocusManagementService = require('../../../../js/FocusManagementService');
const $ = require('jquery');

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
    let formFieldResetServiceStub;
    let focusManagementServiceStub;

    beforeEach(() => {
        $html = $('<div id="html"></div>');
        $html.append(`
            <div
                class="repeater"
                data-repeater-preview-colspan="2"
                data-repeater-add-new-group-text="test_add"
                data-repeater-add-another-group-text="test_add_another"
                data-repeater-max-entries="2"
            >
                <div class="repeater__saved-data" data-repeater-saved-entries-root></div>
                <table class="table table--full repeatable__table">
                    <thead class="repeater__preview-headings">
                        <tr>
                            <th data-repeater-for-name="input-text">input text</th>
                        </tr>
                    </thead>
                    <tbody class="repeater__preview-data" data-repeater-preview-root>
                        <tr class="repeater__empty-placeholder" data-repeater-preview-placeholder>
                            <td colspan="2" class="muted">Empty</td>
                        </tr>
                    </tbody>
                </table>
                <div class="repeater__group" data-repeater-new-group>
                    <div data-repeater-new-group-controls>
                        <input id="input-text" type="text" name="input-text" value="foo!"/>
                    </div>
                    <div>
                        <button class="repeater__update-group" data-repeater-save-group>save</button>
                        <button class="repeater__save-group" data-repeater-cancel-save>cancel</button>
                    </div>
                </div>
                <div class="repeater__group-actions">
                    <button href="#" class="repeater__add-group" data-repeater-add-group>Add</button>
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
        focusManagementServiceStub = sinon.createStubInstance(FocusManagementService);

        repeaterComponent = new RepeaterComponent(
            $repeater[0],
            pulsarFormComponentStub,
            activeFunctionServiceStub,
            inputCloneServiceStub,
            inputValueServiceStub,
            inputReplacementServiceStub,
            uniqueIdServiceStub,
            repeaterPreviewServiceStub,
            pseudoRadioInputServiceStub,
            repeaterDataService,
            repeaterPlaceholderService,
            formFieldResetServiceStub,
            focusManagementServiceStub
        );

        $('html').append($html);
    });

    afterEach(() => {
        $html.remove();
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

        it('should set maxItems to infinity if the maxItems attribute is not set', () => {
            const $element = $(`<div class="repeater"></div>`);

            repeaterComponent.repeater = $element[0];
            repeaterComponent.init();

            expect(repeaterComponent.maxSavedGroups).to.equal(Infinity);
        });
    });

    describe('parseInitialState', () => {
        let initialState;

        beforeEach(() => {
            initialState = [
                [{name: 'input-text', value: 'initial text value'}]
            ];
            sinon.stub(repeaterComponent, 'handleSaveGroup');
        });

        it('should set the values for each new row form', () => {
            repeaterComponent.init(initialState);

            initialState.forEach(state => {
                state.forEach(({name, value}) => {
                    expect($repeater.find(`[data-repeater-name="${name}"]`).val()).to.equal(value);
                });
            });
        });

        it('should save each group', () => {
            repeaterComponent.init(initialState);

            expect(repeaterComponent.handleSaveGroup).to.have.been.calledOnce;
        });
    });

    describe('handleAddGroup', () => {
        let event;
        let $repeaterGroup;

        beforeEach(() => {
            repeaterComponent.init();
            event = {preventDefault: sinon.spy()};
            $repeaterGroup = $repeater.find('[data-repeater-new-group]');
        });

        it('should prevent the default behaviour of the add button', () => {
            repeaterComponent.handleAddGroup(event);

            expect(event.preventDefault).to.have.been.calledOnce;
        });

        it('should display the repeater new group fields', () => {
            repeaterComponent.handleAddGroup(event);

            expect($repeaterGroup.css('display')).to.not.equal('none');
        });

        it('should add the disabled class to the add new group button', () => {
            repeaterComponent.handleAddGroup(event);

            expect($repeater.find('[data-repeater-add-group]').hasClass('disabled')).to.be.true;
        });

        it('should add the disabled attribute to the add new group button', () => {
            repeaterComponent.handleAddGroup(event);

            expect($repeater.find('[data-repeater-add-group]').attr('disabled')).to.equal('disabled');
        });

        it('should shift focus to the first focuable element in the new group form', () => {
            repeaterComponent.handleAddGroup(event);

            expect(focusManagementServiceStub.focusFirstFocusableElement).to.have.been.calledOnce;
        });

        it('should store a reference to the button so we can return focus to it', () => {
            repeaterComponent.handleAddGroup(event);

            expect(focusManagementServiceStub.storeElement).to.have.been.calledOnce;
        });
    });

    describe('handleSaveGroup', () => {
        let $repeaterGroup;
        let $preview;
        let event;

        beforeEach(() => {
            $preview = $('<div id="preview"></div>');
            event = {preventDefault: sinon.spy()};
            repeaterComponent.init();
            $repeaterGroup = $repeater.find('[data-repeater-new-group]');
            inputValueServiceStub.getValue.returns({value: 'test-value', ref: $repeaterGroup.find('#input-text')[0]});
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

            expect($html.find('#preview').attr('data-repeater-preview-id')).to.equal('0');
        });

        it('should append the preview element to the preview root', () => {
            repeaterComponent.handleSaveGroup(event);

            expect($html.find('#preview').attr('colspan')).to.equal('2');
        });

        it('should append the preview UI to the preview element', () => {
            repeaterComponent.handleSaveGroup(event);

            expect($html.find('#preview').find('[data-repeater-preview-ui]')).to.have.length.of(2);
        });

        it('should create the saved representation of the "new group"', () => {
            repeaterComponent.handleSaveGroup(event);

            expect(repeaterDataService.create).to.have.been.calledOnce;
        });

        it('should create an "edit group" form', () => {
            repeaterComponent.handleSaveGroup(event);

            expect($html.find('[data-repeater-edit-id]')).to.have.length.of(1);
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
            const $button = $html.find('[data-repeater-add-group]');

            // Need to invoke 'handleAddGroup' here to disable the add group button
            repeaterComponent.handleAddGroup(event);
            repeaterComponent.handleSaveGroup(event);

            expect($button.hasClass('disabled')).to.be.false;
            expect($button.attr('disabled')).to.be.undefined;

            repeaterComponent.handleAddGroup(event);
            repeaterComponent.handleSaveGroup(event);

            expect($button.hasClass('disabled')).to.be.true;
            expect($button.attr('disabled')).to.equal('disabled');
        });

        it('should update the "add group" button text with the "add another" text', () => {
            repeaterComponent.handleSaveGroup(event);

            expect($html.find('[data-repeater-add-group]').text()).equal('test_add_another');
        });

        it('should re-init select2s in the "add group" form', () => {
            repeaterComponent.handleSaveGroup(event);

            expect(pulsarFormComponentStub.initSelect2).to.have.been.calledOnce;
        });

        it('should hide the "add group" form', () => {
            repeaterComponent.handleSaveGroup(event);

            expect($html.find('[data-repeater-new-group]').css('display')).to.equal('none');
        });
    });

    describe('createState', () => {
        let $fields;

        beforeEach(() => {
            $fields = $(`
                <div>
                    <input type="text" value="foo" data-repeater-name="text"/>
                    <input type="radio" value="bar" data-repeater-name="radio"/>
                    <input type="checkbox" value="baz" data-repeater-name="checkbox"/>
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
                            ref: $fields.find('[data-repeater-name]')[0],
                            value: 'test_value',
                            selected: true
                        }
                    ]
                },
                radio: {
                    value: [
                        {
                            ref: $fields.find('[data-repeater-name]')[1],
                            value: 'test_value',
                            selected: true
                        }
                    ]
                },
                checkbox: {
                    value: [
                        {
                            ref: $fields.find('[data-repeater-name]')[2],
                            value: 'test_value',
                            selected: true
                        }
                    ]
                }
            });
        });

        it('should handle an array returned from the inputValueService', () => {
            inputValueServiceStub.getValue.callsFake((el) => [{
                value: 'test_value',
                ref: el,
                selected: true
            }]);

            expect(repeaterComponent.createState($fields[0])).to.deep.equal({
                text: {
                    value: [
                        {
                            ref: $fields.find('[data-repeater-name]')[0],
                            value: 'test_value',
                            selected: true
                        }
                    ]
                },
                radio: {
                    value: [
                        {
                            ref: $fields.find('[data-repeater-name]')[1],
                            value: 'test_value',
                            selected: true
                        }
                    ]
                },
                checkbox: {
                    value: [
                        {
                            ref: $fields.find('[data-repeater-name]')[2],
                            value: 'test_value',
                            selected: true
                        }
                    ]
                }
            });
        });
    });

    describe('addGroupToRepeater', () => {
        let $group;
        let $preview;

        beforeEach(() => {
            $repeater.append(`<div data-repeater-preview-id="0"></div>`);
            $group = $(`
                <div class="repeater__group" data-repeater-new-group>
                    <div data-repeater-new-group-controls>
                        <input id="input-text" type="text" data-repeater-name="input-text"/>
                        <input id="input-radio" type="radio" data-repeater-name="input-text"/>
                    </div>
                    <div>
                        <button class="repeater__update-group" data-repeater-save-group>save</button>
                        <button class="repeater__save-group" data-repeater-cancel-save>cancel</button>
                    </div>
                </div>
            `);

            $group = $(repeaterComponent.createEditEntryGroup());
            inputCloneServiceStub.clone.callsFake((el) => el.cloneNode(true));
            $preview = $repeater.find('[data-repeater-preview-id]');
        });

        it('should invoke the input clone service for each input', () => {
            repeaterComponent.addGroupToRepeater($group[0]);

            expect(inputCloneServiceStub.clone).to.have.been.calledOnce;
        });

        it('should remove the "add group" attribute from the cloned group', () => {
            repeaterComponent.addGroupToRepeater($group[0]);

            expect($preview.find('[data-repeater-new-group]')).to.have.length.of(0);
        });

        it('should add the edit group after the corresponding preview', () => {
            repeaterComponent.addGroupToRepeater($group[0]);

            expect($repeater.find('[data-repeater-preview-id]').next().attr('data-repeater-edit-id'))
                .to.equal('0');
        });

        it('should invoke the input replacement service on each cloned input', () => {
            repeaterComponent.addGroupToRepeater($group[0]);

            expect(inputReplacementServiceStub.replace).to.have.been.called;
        });

        it('should invoke the unique ID service for the newly cloned group', () => {
            repeaterComponent.addGroupToRepeater($group[0]);

            expect(uniqueIdServiceStub.uniquifyFors).to.have.been.calledOnce;
        });

        it('should invoke the unique ID service for the newly cloned group selectWoo elements', () => {
            repeaterComponent.addGroupToRepeater($group[0]);

            expect(uniqueIdServiceStub.uniquifySelectWoo).to.have.been.calledOnce;
        });

        it('should refresh the pseudo radio input service', () => {
            repeaterComponent.addGroupToRepeater($group[0]);

            expect(pseudoRadioInputServiceStub.refresh).to.have.been.calledOnce;
        });

        it('should refresh the Pulsar form component', () => {
            repeaterComponent.addGroupToRepeater($group[0]);

            expect(pulsarFormComponentStub.refresh).to.have.been.calledOnce;
        });

        it('should hide the edit form', () => {
            repeaterComponent.addGroupToRepeater($group[0]);

            expect($repeater.find('[data-repeater-edit-id]').css('display')).to.equal('none');
        });
    });

    describe('createEditEntryGroup', () => {
        let $group;

        beforeEach(() => {
            $repeater.append(`<div data-repeater-preview-id="0"></div>`);
            $group = $(`
                <div class="repeater__group" data-repeater-new-group>
                    <div data-repeater-new-group-controls>
                        <input id="input-text" type="text" data-repeater-name="input-text"/>
                        <input id="input-radio" type="radio" data-repeater-name="input-text"/>
                    </div>
                    <div>
                        <button class="repeater__update-group" data-repeater-save-group>save</button>
                        <button class="repeater__save-group" data-repeater-cancel-save>cancel</button>
                    </div>
                </div>
            `);
        });

        it('should add an ID to the edit group', () => {
            const $editGroup = $(repeaterComponent.createEditEntryGroup());

            expect($editGroup.attr('data-repeater-edit-id')).to.equal('0');
        });

        it('should remove name attributes from fields', () => {
            const $editGroup = $(repeaterComponent.createEditEntryGroup());

            expect($editGroup.find('input').length).to.equal(1);
            expect($editGroup.find(`[data-repeater-edit-id="0"]`).find('[name]')).to.have.length.of(0);
        });
    });

    describe('handleEditGroup', () => {
        let event;

        beforeEach(() => {
            event = {preventDefault: sinon.spy()};
            $html.find('[data-repeater-preview-root]').append(`
                <div data-repeater-edit-id="666" style="display: none"></div>
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

            expect($repeater.find('[data-repeater-add-group]').hasClass('disabled')).to.be.true;
            expect($repeater.find('[data-repeater-add-group]').attr('disabled')).to.equal('disabled');
        });

        it('should show the edit form', () => {
            repeaterComponent.handleEditGroup(666, event);

            expect($repeater.find('[data-repeater-edit-id]').css('display')).to.not.equal('none');
        });

        it('should shift focus to the first focuable element in the edit group form', () => {
            repeaterComponent.handleEditGroup(666, event);

            expect(focusManagementServiceStub.focusFirstFocusableElement).to.have.been.calledOnce;
        });

        it('should store a reference to the button so we can return focus to it', () => {
            repeaterComponent.handleEditGroup(666, event);

            expect(focusManagementServiceStub.storeElement).to.have.been.calledOnce;
        });
    });

    describe('handleDeleteGroup', () => {
        let event;

        beforeEach(() => {
            event = {preventDefault: sinon.spy()};
            $html.find('[data-repeater-saved-entries-root]').append(`
                <div data-repeater-saved-data-id="666"></div>
            `);
            $html.find('[data-repeater-preview-root]').append(`
                <div data-repeater-preview-id="666"></div>
                <div data-repeater-edit-id="666" style="display: none"></div>
            `);
            // Need to init the service to parse max saved groups
            repeaterComponent.init();
        });

        it('should prevent default behaviour', () => {
            repeaterComponent.handleDeleteGroup(666, event);

            expect(event.preventDefault).to.have.been.calledOnce;
        });

        it('should remove the preview element', () => {
            repeaterComponent.handleDeleteGroup(666, event);

            expect($repeater.find(`[${'data-repeater-preview-id'}="666"]`).length).to.equal(0);
        });

        it('should remove the edit group', () => {
            repeaterComponent.handleDeleteGroup(666, event);

            expect($repeater.find(`[data-repeater-edit-id="666"]`).length).to.equal(0);
        });

        it('should remove the saved entry', () => {
            repeaterComponent.handleDeleteGroup(666, event);

            expect($repeater.find(`[data-repeater-saved-data-id="666"]`).length).to.equal(0);
        });

        it('should update the saved entries count', () => {
            repeaterComponent.savedEntries = 666;

            repeaterComponent.handleDeleteGroup(666, event);

            expect(repeaterComponent.savedEntries).to.equal(665);
        });

        it('should enable the "add group" button if max entries is not exceeded', () => {
            const $button = $repeater.find('[data-repeater-add-group]');

            $button
                .addClass('disabled')
                .attr('disabled', true);

            repeaterComponent.savedEntries = 2;

            repeaterComponent.handleDeleteGroup(666, event);

            expect($button.hasClass('disabled')).to.be.false;
            expect($button.attr('disabled')).to.be.undefined;
        });

        it('should update the "add group" text if there are not saved groups', () => {
            const $button = $repeater.find('[data-repeater-add-group]');

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
            event = {preventDefault: sinon.spy()};
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

            expect($repeater.find('[data-repeater-new-group]').css('display')).to.equal('none');
        });

        it('should enable the "add group" button if we are not at capacity', () => {
            const $button = $repeater.find('[data-repeater-add-group]');

            $button
                .addClass('disabled')
                .attr('disabled', true);

            // need to init here to parse the maxSavedEntries
            repeaterComponent.init();
            repeaterComponent.handleCancelGroup(event);

            expect($button.hasClass('disabled')).to.be.false;
            expect($button.attr('disabled')).to.be.undefined;
        });

        it('should return focus to the element that triggered the group', () => {
            // need to init here to parse the maxSavedEntries
            repeaterComponent.init();
            repeaterComponent.handleCancelGroup(event);

            expect(focusManagementServiceStub.returnFocusToElement).to.have.been.calledOnce;
        });
    });

    describe('handleUpdateGroup', () => {
        let event;
        let $group;

        beforeEach(() => {
            event = {preventDefault: sinon.spy()};
            $group = $(`
                <div class="repeater__group" data-repeater-new-group>
                    <div data-repeater-new-group-controls>
                        <input id="input-text" type="text" data-repeater-name="input-text"/>
                        <input id="input-radio" type="radio" data-repeater-name="input-text"/>
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
            const $button = $repeater.find('[data-repeater-add-group]');

            repeaterComponent.init();
            $button
                .addClass('disabled')
                .attr('disabled', true);

            repeaterComponent.handleUpdateGroup($group[0], 666, event);

            expect($button.hasClass('disabled')).to.be.false;
            expect($button.attr('disabled')).to.be.undefined;
        });

        it('should hide the group', () => {
            repeaterComponent.handleUpdateGroup($group[0], 666, event);

            expect($group.css('display')).to.equal('none');
        });

        it('should return focus to the element that triggered the group', () => {
            repeaterComponent.handleUpdateGroup($group[0], 666, event);

            expect(focusManagementServiceStub.returnFocusToElement).to.have.been.calledOnce;
        });
    });

    describe('handleCancelGroupUpdate', () => {
        let event;
        let $group;

        beforeEach(() => {
            event = {preventDefault: sinon.spy()};
            $group = $(`
                <div class="repeater__group" data-repeater-new-group>
                    <div data-repeater-new-group-controls>
                        <input id="input-text" type="text" data-repeater-name="input-text"/>
                        <input id="input-radio" type="radio" data-repeater-name="input-radio"/>
                    </div>
                </div>
            `);
            $('body').append($group);

            repeaterComponent.state = [
                {
                    'input-text': {
                        value: [
                            {value: '', selected: true, ref: $group.find('#input-text')[0]}
                        ]
                    },
                    'input-radio': {
                        value: [
                            {value: '', selected: false, ref: $group.find('#input-radio')[0]}
                        ]
                    }
                }
            ];
        });

        afterEach(() => {
           $group.remove();
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
        });

        it('should enable the "add group" button if we are not at capacity', () => {
            const $button = $repeater.find('[data-repeater-add-group]');

            repeaterComponent.init();
            $button
                .addClass('disabled')
                .attr('disabled', true);

            repeaterComponent.handleCancelGroupUpdate($group[0], 0, event);

            expect($button.hasClass('disabled')).to.be.false;
            expect($button.attr('disabled')).to.be.undefined;
        });

        it('should update colour pickers', () => {
            repeaterComponent.handleCancelGroupUpdate($group[0], 0, event);

            expect(pulsarFormComponentStub.updateColourPicker).to.have.been.calledOnce;
        });

        it('should hide the group', () => {
            repeaterComponent.handleCancelGroupUpdate($group[0], 0, event);

            expect($group.css('display')).to.equal('none');
        });

        it('should return focus to the element that triggered the group', () => {
            repeaterComponent.handleCancelGroupUpdate($group[0], 0, event);

            expect(focusManagementServiceStub.returnFocusToElement).to.have.been.calledOnce;
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
                expect(element.getAttribute('data-repeater-name')).to.equal('foo');
            });
        });
    });
});
