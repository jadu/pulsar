const $ = require('jquery');

class Repeater {
    /**
     * Repeater
     * @param repeater {HTMLElement}
     * @param pulsarFormComponent {PulsarFormComponent}
     * @param activeFunctionService {ActiveFunctionService}
     * @param inputCloneService {InputCloneService}
     * @param inputValueService {InputValueService}
     * @param inputReplacementService {InputReplacementService}
     * @param uniqueIdService {UniqueIdService}
     * @param repeaterPreviewService {RepeaterPreviewService}
     * @param pseudoRadioInputService {PseudoRadioInputService}
     * @param repeaterDataService {RepeaterDataService}
     * @param repeaterPlaceholderService {RepeaterPlaceholderService}
     * @param formFieldResetService {FormFieldResetService}
     * @param focusManagementService {FocusManagementService}
     */
    constructor (
        repeater,
        pulsarFormComponent,
        activeFunctionService,
        inputCloneService,
        inputValueService,
        inputReplacementService,
        uniqueIdService,
        repeaterPreviewService,
        pseudoRadioInputService,
        repeaterDataService,
        repeaterPlaceholderService,
        formFieldResetService,
        focusManagementService
    ) {
        this.pulsarFormComponent = pulsarFormComponent;
        this.activeFunctionService = activeFunctionService;
        this.inputCloneService = inputCloneService;
        this.inputValueService = inputValueService;
        this.inputReplacementService = inputReplacementService;
        this.uniqueIdService = uniqueIdService;
        this.repeaterPreviewService = repeaterPreviewService;
        this.pseudoRadioInputService = pseudoRadioInputService;
        this.repeaterDataService = repeaterDataService;
        this.repeaterPlaceholderService = repeaterPlaceholderService;
        this.formFieldResetService = formFieldResetService;
        this.focusManagementService = focusManagementService;

        this.repeater = repeater;
        this.repeaterEntries = 0;
        this.savedEntries = 0;
        this.state = [];
    }

    /**
     * Initialise
     * @param {array} initialState
     */
    init (initialState = []) {
        // Preview UI HTML that is dynamically added to preview rows
        this.previewUiHTML = `
            <button data-repeater-edit-group data-repeater-preview-ui class="btn btn--outline btn--inverse">
                Edit
            </button>
            <button data-repeater-delete-group data-repeater-preview-ui class="btn btn--outline btn--inverse">
                Delete
            </button>
        `;

        const maxItemsAttr = this.repeater.getAttribute('data-repeater-max-entries');

        // Store max repeater groups as an integer
        this.maxSavedGroups = maxItemsAttr === null ? Infinity : parseInt(maxItemsAttr, 10);

        // Initiate pseudo radio service to polyfill radio inputs without name attrs
        this.pseudoRadioInputService.init();

        const $repeater = $(this.repeater);

        // Remove repeater group input names to prevent their values being submitted
        this.removeGroupInputNames($repeater.find('[data-repeater-new-group]')[0]);

        // Attach the "add new group" handler
        const $addGroupButton = $repeater.find('[data-repeater-add-group]');

        $addGroupButton.on('click', this.activeFunctionService.wrap.bind(
            this.activeFunctionService,
            $addGroupButton[0],
            this.handleAddGroup.bind(this)
        ));

        const $saveGroup = $repeater.find('[data-repeater-save-group]');

        // Attach the "save new group" handler
        $saveGroup.on('click', this.handleSaveGroup.bind(this));

        // Attach the "cancel new group" handler
        $saveGroup.on('click', this.handleCancelGroup.bind(this));

        if (initialState.length > 0) {
            this.parseInitialState(initialState);
        }
    }

    /**
     * @param initialState
     */
    parseInitialState (initialState) {
        initialState.forEach((state, index) => {
            state.forEach(({ name, value }) => {
                // Grab the input from the "add new group" form
                let $input = $(this.repeater)
                    .find(`[data-repeater-name="${name}"]`);

                // If we get multiple inputs we are parsing multiple state
                // entries, therefore we need to ensure we're getting the
                // input at the correct index as there will be multiple inputs
                // with the same data-repeater-name at this point
                if ($input.length > 1) {
                    $input = $input.eq(index);
                }

                $input.val(value);
            });

            this.handleSaveGroup();
        });
    }

    /**
     * Handle the add group action
     * @param event
     */
    handleAddGroup (event) {
        const $repeater = $(this.repeater);
        const $addGroupForm = $repeater.find('[data-repeater-new-group]');

        event.preventDefault();
        $addGroupForm.show();
        $repeater.find('[data-repeater-add-group]')
            .addClass('disabled')
            .attr('disabled', true);

        // Shift focus to the first focusable element in the form
        this.focusManagementService.focusFirstFocusableElement($addGroupForm);

        // Capture triggering element so we can return focus when closed
        this.focusManagementService.storeElement($(event.target));
    }

    /**
     * Handle the save group action
     * @param event
     * @param state
     */
    handleSaveGroup (event = null, state = null) {
        const $repeater = $(this.repeater);
        const colspan = parseInt(this.repeater.getAttribute('data-repeater-preview-colspan'), 10);
        const previewUi = document.createElement('td');

        if (event !== null) {
            event.preventDefault();
        }

        const $addGroupForm = $repeater.find('[data-repeater-new-group]');

        // Create state object from the current form
        this.state[this.repeaterEntries] = state !== null ?
            state :
            this.createState($addGroupForm[0]);

        // Create preview HTML
        const preview = this.repeaterPreviewService.create(
            this.state[this.repeaterEntries],
            $repeater.find('[data-repeater-for-name]').toArray(),
            this.repeaterEntries
        );

        // Set preview attributes and append to the DOM
        preview.setAttribute('colspan', colspan);
        preview.setAttribute('data-repeater-preview-id', this.repeaterEntries);

        // Attach preview element to the DOM
        $repeater.find('[data-repeater-preview-root]').append(preview);

        // Attach preview UI to preview row
        previewUi.innerHTML = this.previewUiHTML;
        preview.appendChild(previewUi);

        const editGroup = preview.querySelector('[data-repeater-edit-group]');
        // Attach preview "edit group" handler
        editGroup.addEventListener(
            'click',
            this.activeFunctionService.wrap.bind(
                this.activeFunctionService,
                editGroup,
                this.handleEditGroup.bind(this, this.repeaterEntries)
            )
        );

        const deleteGroup = preview.querySelector('[data-repeater-delete-group]');
        // Attach preview "edit group" handler
        deleteGroup.addEventListener(
            'click',
            this.activeFunctionService.wrap.bind(
                this.activeFunctionService,
                deleteGroup,
                this.handleDeleteGroup.bind(this, this.repeaterEntries)
            )
        );

        // Create saved data if this is not the initial parse
        if (state === null) {
            this.saveData($addGroupForm[0]);
        }

        // Create the edit form
        this.addGroupToRepeater(this.createEditEntryGroup());

        // Remove "empty" placeholder
        this.repeaterPlaceholderService.remove();

        // Reset new repeater group form
        this.formFieldResetService.reset($addGroupForm[0]);

        // Reset Pulsar colour pickers
        this.pulsarFormComponent.updateColourPicker($addGroupForm);

        // Update internal state
        this.repeaterEntries++;
        this.savedEntries++;

        const $addGroupButton = $repeater.find('[data-repeater-add-group]');

        if (this.savedEntries < this.maxSavedGroups) {
            $addGroupButton
                .removeClass('disabled')
                .removeAttr('disabled');

            // Update add new group text
            $addGroupButton.text(
                this.repeater.getAttribute('data-repeater-add-another-group-text')
            );
        } else {
            $addGroupButton
                .addClass('disabled')
                .attr('disabled', true);
        }

        // Re-initialise select2 instances in the "edit" and "new group" form
        this.pulsarFormComponent.initSelect2($addGroupForm.find('.js-select2'));

        // Hide new repeater group form
        $addGroupForm.hide();
    }

    /**
     * Save repeater state to the DOM
     * @param group
     */
    saveData(group) {
        this.repeaterDataService.create(group, this.repeaterEntries);
    }

    /**
     * Convert the "create new repeater group" to a state object
     * @param group {HTMLElement}
     * @returns {Object.<string, { value: { value: {string}, selected: {boolean}, ref: {HTMLElement} }[] }>}
     */
    createState (group) {
        const name = 'data-repeater-name';
        const $inputs = $(group).find(`[${name}]`);

        return $inputs.toArray().reduce((state, input) => {
            const value = this.inputValueService.getValue(input);
            const valueArray = Array.isArray(value) ? value : [value];

            // Add a reference to the element
            valueArray.forEach(value => value.ref = input);

            if (state[input.getAttribute(name)] === undefined) {
                state[input.getAttribute(name)] = {};
            }

            if (!Array.isArray(state[input.getAttribute(name)].value)) {
                state[input.getAttribute(name)].value = valueArray;
            } else {
                valueArray.forEach(value => state[input.getAttribute(name)].value.push(value));
            }

            return state;
        }, {});
    }

    /**
     * Create an inline edit form beneath each preview row
     */
    createEditEntryGroup () {
        const clone = $(this.repeater).find('[data-repeater-new-group]')[0]
            .cloneNode(true);

        // Add repeater ID to the group
        clone.setAttribute('data-repeater-edit-id', this.repeaterEntries);

        // Remove the new group attr
        clone.removeAttribute('data-repeater-new-group');

        // Remove group input name attrs
        this.removeGroupInputNames(clone);

        return clone;
    }

    addGroupToRepeater (group) {
        const clonedControls = group.querySelector('[data-repeater-new-group-controls]');
        const preview = this.repeater.querySelector(
                `[data-repeater-preview-id="${this.repeaterEntries}"]`
        );
        const inputsWithState = $(group)
            .find('[data-repeater-name]')
            .toArray()
            .map(input => this.inputCloneService.clone(input));

        // Add cloned group after preview, this will act as the edit group
        $(preview).after(group);

        // Append our "deep" cloned inputs
        inputsWithState.forEach(input => {
            const name = input.getAttribute('data-repeater-name');
            // Replace inputs in clone with "deep" cloned inputs
            this.inputReplacementService.replace(
                [].slice.call(clonedControls.querySelectorAll(`[data-repeater-name="${name}"]`)),
                input
            );
        });

        // Create unique for/id
        this.uniqueIdService.uniquifyFors(preview.nextElementSibling);

        // Create unique IDs for selectWoo elements
        this.uniqueIdService.uniquifySelectWoo(group);

        // Refresh radio state
        this.pseudoRadioInputService.refresh();

        // Refresh the PulsarFormComponent services
        this.pulsarFormComponent.refresh();

        // Hide edit form
        $(group).hide();

        // Add events to the save / cancel UI within the group
        group.querySelector('[data-repeater-save-group]')
            .addEventListener('click', this.handleUpdateGroup.bind(this, group, this.repeaterEntries));
        group.querySelector('[data-repeater-cancel-save]')
            .addEventListener('click', this.handleCancelGroupUpdate.bind(this, group, this.repeaterEntries));
    }

    /**
     * Handle edit group action
     * @param repeaterId {number}
     * @param event
     */
    handleEditGroup (repeaterId, event) {
        const $repeater = $(this.repeater);
        const $edit = $repeater.find('[data-repeater-preview-root]')
            .find(`[data-repeater-edit-id=${repeaterId}]`);

        event.preventDefault();
        this.repeaterPreviewService.toggleUi();
        $repeater.find('[data-repeater-add-group]')
            .addClass('disabled')
            .attr('disabled', true);
        $edit.show();

        // Shift focus to the first focusable element in the form
        this.focusManagementService.focusFirstFocusableElement($edit);

        // Capture triggering element so we can return focus when closed
        this.focusManagementService.storeElement($(event.target));
    }

    /**
     * Handle delete group action
     * @param repeaterId {number}
     * @param event
     */
    handleDeleteGroup (repeaterId, event) {
        const $repeater = $(this.repeater);
        const $previewRoot = $repeater.find('[data-repeater-preview-root]');
        const $preview = $previewRoot.find(`[data-repeater-preview-id="${repeaterId}"]`);
        const $edit = $repeater.find(`[data-repeater-edit-id="${repeaterId}"]`);
        const $saved = $repeater.find(`[data-repeater-saved-data-id="${repeaterId}"]`);

        event.preventDefault();

        // Remove DOM
        $preview.remove();
        $edit.remove();
        $saved.remove();

        // Update state
        this.savedEntries--;

        const $addGroupButton = $repeater.find('[data-repeater-add-group]');

        // Enable "add group" button if we have not exceeded max saved entries
        if (this.savedEntries < this.maxSavedGroups) {
            $addGroupButton
                .removeClass('disabled')
                .removeAttr('disabled');
        }

        // Update "add group" button text and add placeholder if we have removed all entries
        if (this.savedEntries <= 0) {
            $addGroupButton.text(
                this.repeater.getAttribute('data-repeater-add-new-group-text')
            );

            // Add "empty" placeholder
            this.repeaterPlaceholderService.add();
        }
    }

    /**
     * Handle the cancel interaction when adding a new group
     * @param event
     */
    handleCancelGroup (event) {
        const $repeater = $(this.repeater);

        if (this.savedEntries < this.maxSavedGroups) {
            $repeater.find('[data-repeater-add-group]')
                .removeClass('disabled')
                .removeAttr('disabled');

            // Return focus to triggering element
            this.focusManagementService.returnFocusToElement();
        }

        event.preventDefault();

        const $addGroupForm = $repeater.find('[data-repeater-new-group]');

        // Reset new repeater group form
        this.formFieldResetService.reset($addGroupForm[0]);

        // Reset Pulsar colour pickers
        this.pulsarFormComponent.updateColourPicker($addGroupForm);

        // Hide the "add group" form
        $addGroupForm.hide();
    }

    /**
     * Handle an edit / update save
     * @param group {HTMLElement}
     * @param repeaterId {number}
     * @param event
     */
    handleUpdateGroup (group, repeaterId, event) {
        event.preventDefault();

        const $repeater = $(this.repeater);

        // Update state
        this.state[repeaterId] = this.createState(group);

        // Update preview elements
        this.repeaterPreviewService.update(
            this.state[repeaterId],
            $repeater.find('[data-repeater-for-name]').toArray(),
            $repeater.find('[data-repeater-preview-root]')[0],
            repeaterId
        );

        // Update saved data
        this.repeaterDataService.update(this.state[repeaterId], repeaterId);

        // Enable preview UI
        this.repeaterPreviewService.toggleUi();

        // Enable "add group" button if we have not exceeded max saved entries
        if (this.savedEntries < this.maxSavedGroups) {
            $repeater.find('[data-repeater-add-group]')
                .removeClass('disabled')
                .removeAttr('disabled');
        }

        // Return focus to triggering element
        this.focusManagementService.returnFocusToElement();

        // Hide edit group form
        $(group).hide();
    }

    /**
     * Handle an update cancel, inputs will be restored to their un-edited state
     * @param group {HTMLElement|Node}
     * @param repeaterId {number}
     * @param event
     */
    handleCancelGroupUpdate (group, repeaterId, event) {
        event.preventDefault();

        const $group = $(group);
        const $repeater = $(this.repeater);

        // Reset input values to pre-edited state
        $group.find('[data-repeater-name]').each((index, element) => {
            this.state[repeaterId][element.getAttribute('data-repeater-name')].value
                .forEach(input => {
                    // Update the value for selected inputs
                    this.inputValueService.setValue(element, input.value, { selected: input.selected });
                });
        });

        // Revert radio inputs to pre-edited values
        this.pseudoRadioInputService.setState(this.state[repeaterId]);

        // Enable preview UI
        this.repeaterPreviewService.toggleUi();

        // Enable "add group" button if we have not exceeded max saved entries
        if (this.savedEntries < this.maxSavedGroups) {
            $repeater.find('[data-repeater-add-group]')
                .removeClass('disabled')
                .removeAttr('disabled');
        }

        // Update any colour pickers that might exist
        this.pulsarFormComponent.updateColourPicker($(group));

        // Hide edit group
        $group.hide();

        // Return focus to triggering element
        this.focusManagementService.returnFocusToElement();
    }

    /**
     * Remove name attribute and add custom name attribute, this will
     * omit the input's data from requests
     * @param group {HTMLElement|Node}
     */
    removeGroupInputNames (group) {
        const $inputs = $(group).find('[name]');

        $inputs.each((index, input) => {
            const name = input.getAttribute('name');
            // set name attr on cloned group
            input.setAttribute('data-repeater-name', name);
            // remove custom name attr on group
            input.removeAttribute('name');
        });
    }
}

module.exports = Repeater;
