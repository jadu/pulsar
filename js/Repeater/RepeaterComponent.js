const $ = require('jquery');

class Repeater {
    /**
     * Repeater
     * @param repeater {HTMLElement}
     * @param pulsarFormComponent {PulsarFormComponent}
     * @param queryService {QueryService}
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
        queryService,
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
        this.queryService = queryService;
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
            <button ${this.queryService.getAttr('edit-group')} ${this.queryService.getAttr('preview-ui')} class="btn btn--outline btn--inverse">
                Edit
            </button>
            <button ${this.queryService.getAttr('delete-group')} ${this.queryService.getAttr('preview-ui')} class="btn btn--outline btn--inverse">
                Delete
            </button>
        `;

        const maxItemsAttr = this.repeater.getAttribute(this.queryService.getAttr('max-saved-groups'));

        // Store max repeater groups as an integer
        this.maxSavedGroups = maxItemsAttr === null ? Infinity : parseInt(maxItemsAttr, 10);

        // Initiate pseudo radio service to polyfill radio inputs without name attrs
        this.pseudoRadioInputService.init();

        // Remove repeater group input names to prevent their values being submitted
        this.removeGroupInputNames(this.queryService.get('add-group-form'));

        // Attach the "add new group" handler
        this.queryService.get('add-group-button')
            .addEventListener(
                'click',
                this.activeFunctionService.wrap.bind(
                    this.activeFunctionService,
                    this.queryService.get('add-group-button'),
                    this.handleAddGroup.bind(this)
                )
            );

        // Attach the "save new group" handler
        this.queryService.get('save-group-button')
            .addEventListener(
                'click',
                this.handleSaveGroup.bind(this)
            );

        // Attach the "cancel new group" handler
        this.queryService.get('cancel-save-group-button')
            .addEventListener(
                'click',
                this.handleCancelGroup.bind(this)
            );

        if (initialState.length > 0) {
            this.parseInitialState(initialState);
        }
    }

    parseInitialState (initialState) {
        initialState.forEach(state => {
            state.forEach(({ name, value }) => {
                $(this.repeater).find(`[data-repeater-name="${name}"]`).val(value);
            });

            this.handleSaveGroup();
        });
    }

    /**
     * Handle the add group action
     * @param event
     */
    handleAddGroup (event) {
        const $addGroupForm = $(this.queryService.get('add-group-form'));

        event.preventDefault();
        $addGroupForm.show();
        $(this.queryService.get('add-group-button'))
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
        const colspan = parseInt(this.repeater.getAttribute(this.queryService.getAttr('preview-colspan')), 10);
        const previewUi = document.createElement('td');

        if (event !== null) {
            event.preventDefault();
        }

        // Create state object from the current form
        this.state[this.repeaterEntries] = state !== null ?
            state :
            this.createState(this.queryService.get('add-group-form'));

        // Create preview HTML
        const preview = this.repeaterPreviewService.create(
            this.state[this.repeaterEntries],
            this.queryService.get('preview-heading', { all: true }),
            this.repeaterEntries
        );

        // Set preview attributes and append to the DOM
        preview.setAttribute('colspan', colspan);
        preview.setAttribute(this.queryService.getAttr('preview-id'), this.repeaterEntries);

        // Attach preview element to the DOM
        this.queryService.get('preview-root').appendChild(preview);

        // Attach preview UI to preview row
        previewUi.innerHTML = this.previewUiHTML;
        preview.appendChild(previewUi);

        // Attach preview "edit group" handler
        preview.querySelector(this.queryService.getQuery('edit-group')).addEventListener(
            'click',
            this.activeFunctionService.wrap.bind(
                this.activeFunctionService,
                preview.querySelector(this.queryService.getQuery('edit-group')),
                this.handleEditGroup.bind(this, this.repeaterEntries)
            )
        );

        // Attach preview "edit group" handler
        preview.querySelector(this.queryService.getQuery('delete-group')).addEventListener(
            'click',
            this.activeFunctionService.wrap.bind(
                this.activeFunctionService,
                preview.querySelector(this.queryService.getQuery('edit-group')),
                this.handleDeleteGroup.bind(this, this.repeaterEntries)
            )
        );

        // Create saved data if this is not the initial parse
        if (state === null) {
            this.saveData(this.queryService.get('add-group-form'));
        }

        // Create the edit form
        this.addGroupToRepeater(this.createEditEntryGroup());

        // Remove "empty" placeholder
        this.repeaterPlaceholderService.remove();

        // Reset new repeater group form
        this.formFieldResetService.reset(this.queryService.get('add-group-form'));

        // Reset Pulsar colour pickers
        this.pulsarFormComponent.updateColourPicker($(this.queryService.get('add-group-form')));

        // Update internal state
        this.repeaterEntries++;
        this.savedEntries++;

        if (this.savedEntries < this.maxSavedGroups) {
            $(this.queryService.get('add-group-button'))
                .removeClass('disabled')
                .removeAttr('disabled');

            // Update add new group text
            this.queryService.get('add-group-button')
                .innerText = this.repeater.getAttribute(this.queryService.getAttr('add-another-group-text'));

            // Return focus to triggering element, if one exists
            if (this.focusManagementService.hasStoredElement()) {
                this.focusManagementService.returnFocusToElement();
            }
        } else {
            // If at max entries, focus the edit button of the new row
            $(preview.querySelector(this.queryService.getQuery('edit-group'))).focus();
        }

        // Re-initialise select2 instances in the "edit" and "new group" form
        this.pulsarFormComponent.initSelect2($(this.queryService.get('add-group-form')).find('.js-select2'));

        // Hide new repeater group form
        $(this.queryService.get('add-group-form')).hide();
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
        const $inputs = $(group).find(this.queryService.getQuery('name'));
        const name = this.queryService.getAttr('name');

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
        const clone = this.queryService.get('add-group-form').cloneNode(true);

        // Add repeater ID to the group
        clone.setAttribute(this.queryService.getAttr('edit-id'), this.repeaterEntries);

        // Remove the new group attr
        clone.removeAttribute(this.queryService.getAttr('add-group-form'));

        // Remove group input name attrs
        this.removeGroupInputNames(clone);

        return clone;
    }

    addGroupToRepeater (group) {
        const clonedControls = group.querySelector(this.queryService.getQuery('add-group-controls'));
        const preview = this.repeater.querySelector(
            `[${this.queryService.getAttr('preview-id')}="${this.repeaterEntries}"]`
        );
        const inputsWithState = $(group)
            .find(this.queryService.getQuery('name'))
            .toArray()
            .map(input => this.inputCloneService.clone(input));

        // Add cloned group after preview, this will act as the edit group
        $(preview).after(group);

        // Append our "deep" cloned inputs
        inputsWithState.forEach(input => {
            const name = input.getAttribute(this.queryService.getAttr('name'));
            // Replace inputs in clone with "deep" cloned inputs
            this.inputReplacementService.replace(
                [].slice.call(clonedControls.querySelectorAll(`[${this.queryService.getAttr('name')}="${name}"]`)),
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
        group.querySelector(this.queryService.getQuery('save-group-button'))
            .addEventListener('click', this.handleUpdateGroup.bind(this, group, this.repeaterEntries));
        group.querySelector(this.queryService.getQuery('cancel-save-group-button'))
            .addEventListener('click', this.handleCancelGroupUpdate.bind(this, group, this.repeaterEntries));
    }

    /**
     * Handle edit group action
     * @param repeaterId {number}
     * @param event
     */
    handleEditGroup (repeaterId, event) {
        const $edit = $(this.queryService.get('preview-root').querySelector(`[${this.queryService.getAttr('edit-id')}="${repeaterId}"]`));

        event.preventDefault();
        this.repeaterPreviewService.toggleUi();
        $(this.queryService.get('add-group-button'))
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
        // remove preview
        const preview = this.queryService.get('preview-root')
            .querySelector(`[${this.queryService.getAttr('preview-id')}="${repeaterId}"]`);

        // remove edit form
        const edit = this.queryService.get('preview-root')
            .querySelector(`[${this.queryService.getAttr('edit-id')}="${repeaterId}"]`);

        // remove saved data
        const saved = this.queryService.get('saved-entries-root')
            .querySelector(`[${this.queryService.getAttr('saved-entry-id')}="${repeaterId}"]`);

        // previous row to focus
        const $previousRow = $(this.queryService.get('preview-root')
            .querySelector(`[${this.queryService.getAttr('preview-id')}="${repeaterId - 1}"]`));

        event.preventDefault();

        // Remove DOM
        $(preview).remove();
        $(edit).remove();
        $(saved).remove();

        // Update state
        this.savedEntries--;

        // Enable "add group" button if we have not exceeded max saved entries
        if (this.savedEntries < this.maxSavedGroups) {
            $(this.queryService.get('add-group-button'))
                .removeClass('disabled')
                .removeAttr('disabled');
        }

        // Update "add group" button text and add placeholder if we have removed all entries
        if (this.savedEntries <= 0) {
            this.queryService.get('add-group-button').innerText =
                this.repeater.getAttribute(this.queryService.getAttr('add-new-group-text'));

            // Add "empty" placeholder
            this.repeaterPlaceholderService.add();
        }

        // Focus either previous row delete button of add button if no previous
        if ($previousRow.length) {
            $previousRow.find('[data-repeater-delete-group]').focus();
        } else {
            $(this.queryService.get('add-group-button')).focus();
        }
    }

    /**
     * Handle the cancel interaction when adding a new group
     * @param event
     */
    handleCancelGroup (event) {
        if (this.savedEntries < this.maxSavedGroups) {
            $(this.queryService.get('add-group-button'))
                .removeClass('disabled')
                .removeAttr('disabled');

            // Return focus to triggering element
            this.focusManagementService.returnFocusToElement();
        }

        event.preventDefault();

        // Reset new repeater group form
        this.formFieldResetService.reset(this.queryService.get('add-group-form'));

        // Reset Pulsar colour pickers
        this.pulsarFormComponent.updateColourPicker($(this.queryService.get('add-group-form')));

        // Hide the "add group" form
        $(this.queryService.get('add-group-form')).hide();
    }

    /**
     * Handle an edit / update save
     * @param group {HTMLElement}
     * @param repeaterId {number}
     * @param event
     */
    handleUpdateGroup (group, repeaterId, event) {
        event.preventDefault();

        // Update state
        this.state[repeaterId] = this.createState(group);

        // Update preview elements
        this.repeaterPreviewService.update(
            this.state[repeaterId],
            this.queryService.get('preview-heading'),
            this.queryService.get('preview-root'),
            repeaterId
        );

        // Update saved data
        this.repeaterDataService.update(this.state[repeaterId], repeaterId);

        // Enable preview UI
        this.repeaterPreviewService.toggleUi();

        // Enable "add group" button if we have not exceeded max saved entries
        if (this.savedEntries < this.maxSavedGroups) {
            $(this.queryService.get('add-group-button'))
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

        // Reset input values to pre-edited state
        $(group).find(this.queryService.getQuery('name')).each((index, element) => {
            this.state[repeaterId][element.getAttribute(this.queryService.getAttr('name'))].value
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
            $(this.queryService.get('add-group-button'))
                .removeClass('disabled')
                .removeAttr('disabled');
        }

        // Update any colour pickers that might exist
        this.pulsarFormComponent.updateColourPicker($(group));

        // Hide edit group
        $(group).hide();

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
            input.setAttribute(this.queryService.getAttr('name'), name);
            // remove custom name attr on group
            input.removeAttribute('name');
        });
    }
}

module.exports = Repeater;
