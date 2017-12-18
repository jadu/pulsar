const $ = require('jquery');
const _ = require('lodash');

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
        formFieldResetService
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

        this.repeater = repeater;
        this.repeaterEntries = 0;
        this.savedEntries = 0;
        this.state = [];
    }

    /**
     * Initialise
     */
    init () {
        // Preview UI HTML that is dynamically added to preview rows
        this.previewUiHTML = `           
            <a ${this.queryService.getAttr('edit-group')} ${this.queryService.getAttr('preview-ui')} href="#edit" class="remove__control alt-link margin-right">
                <i class="icon-pencil"><span class="hide">Edit</span></i>
            </a>
            <a ${this.queryService.getAttr('delete-group')} ${this.queryService.getAttr('preview-ui')} href="#delete" class="remove__control alt-link">
                <i class="icon-remove-sign"><span class="hide">Delete</span></i>
            </a>
        `;

        const maxItemsAttr = this.repeater.getAttribute(this.queryService.getAttr('max-saved-groups'));

        // Store max repeater groups as an integer
        this.maxSavedGroups = maxItemsAttr === 'false' ? Infinity : parseInt(maxItemsAttr, 10);

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
    }

    /**
     * Handle the add group action
     * @param event
     */
    handleAddGroup (event) {
        event.preventDefault();
        $(this.queryService.get('add-group-form')).show();
        $(this.queryService.get('add-group-button')).addClass('disabled');
    }

    /**
     * Handle the save group action
     * @param event
     */
    handleSaveGroup (event) {
        const colspan = parseInt(this.repeater.getAttribute(this.queryService.getAttr('preview-colspan')), 10);
        const previewUi = document.createElement('td');

        event.preventDefault();

        // Create state object from the current form
        this.state[this.repeaterEntries] = this.createState(this.queryService.get('add-group-form'));

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

        // Create saved data
        this.repeaterDataService.create(this.queryService.get('add-group-form'), this.repeaterEntries);

        // Create the edit form
        this.createEditEntryGroup(this.queryService.get('add-group-form'));

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
            $(this.queryService.get('add-group-button')).removeClass('disabled');

            // Update add new group text
            this.queryService.get('add-group-button')
                .innerText = this.repeater.getAttribute(this.queryService.getAttr('add-another-group-text'));
        }

        // Re-initialise select2 instances in the "edit" and "new group" form
        this.pulsarFormComponent.initSelect2($(this.queryService.get('add-group-form')).find('.js-select2'));

        // Hide new repeater group form
        $(this.queryService.get('add-group-form')).hide();
    }

    /**
     * Convert the "create new repeater group" to a state object
     * @param group {HTMLElement}
     * @returns {Object.<string, {value: {string}, selected: {boolean}, ref: {HTMLElement}}[]>}
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
     * @param group {HTMLElement}
     */
    createEditEntryGroup (group) {
        const preview = this.repeater.querySelector(
            `[${this.queryService.getAttr('preview-id')}="${this.repeaterEntries}"]`
        );
        const clone = group.cloneNode(true);
        const clonedControls = clone.querySelector(this.queryService.getQuery('add-group-controls'));
        const inputsWithState = $(group)
            .find(this.queryService.getQuery('name'))
            .toArray()
            .map(input => this.inputCloneService.clone(input));

        // Add repeater ID to the group
        clone.setAttribute(this.queryService.getAttr('edit-id'), this.repeaterEntries);

        // Remove the new group attr
        clone.removeAttribute(this.queryService.getAttr('add-group-form'));

        // Remove group input name attrs
        this.removeGroupInputNames(clone);

        // Add cloned group after preview, this will act as the edit group
        $(preview).after(clone);

        // Append our "deep" cloned inputs
        inputsWithState.forEach(input => {
            const name = input.getAttribute(this.queryService.getAttr('name'));
            // Replace inputs in clone with "deep" cloned inputs
            this.inputReplacementService.replace(
                [].slice.call(clonedControls.querySelectorAll(`[${this.queryService.getAttr('name')}="${name}"]`)),
                input
            );
        });

        // create unique for/id
        this.uniqueIdService.uniquifyFors(preview.nextElementSibling);

        // Refresh radio state
        this.pseudoRadioInputService.refresh();

        // Refresh the PulsarFormComponent services
        this.pulsarFormComponent.refresh();

        // Hide edit form
        $(clone).hide();

        // Add events to the save / cancel UI within the group
        clone.querySelector(this.queryService.getQuery('save-group-button'))
            .addEventListener('click', this.handleUpdateGroup.bind(this, clone, this.repeaterEntries));
        clone.querySelector(this.queryService.getQuery('cancel-save-group-button'))
            .addEventListener('click', this.handleCancelGroupUpdate.bind(this, clone, this.repeaterEntries));
    }

    /**
     * Handle edit group action
     * @param repeaterId {number}
     * @param event
     */
    handleEditGroup (repeaterId, event) {
        const edit = this.queryService.get('preview-root')
            .querySelector(`[${this.queryService.getAttr('edit-id')}="${repeaterId}"]`)

        event.preventDefault();
        this.repeaterPreviewService.toggleUi();
        $(this.queryService.get('add-group-button')).addClass('disabled');
        $(edit).show();
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

        event.preventDefault();

        // Remove DOM
        preview.remove();
        edit.remove();
        saved.remove();

        // Update state
        this.savedEntries--;

        // Enable "add group" button if we have not exceeded max saved entries
        if (this.savedEntries < this.maxSavedGroups) {
            $(this.queryService.get('add-group-button')).removeClass('disabled');
        }

        // Update "add group" button text and add placeholder if we have removed all entries
        if (this.savedEntries <= 0) {
            this.queryService.get('add-group-button').innerText =
                this.repeater.getAttribute(this.queryService.getAttr('add-new-group-text'));

            // Add "empty" placeholder
            this.repeaterPlaceholderService.add();
        }
    }

    /**
     * Handle the cancel interaction when adding a new group
     * @param event
     */
    handleCancelGroup (event) {
        if (this.savedEntries < this.maxSavedGroups) {
            $(this.queryService.get('add-group-button')).removeClass('disabled');
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
            $(this.queryService.get('add-group-button')).removeClass('disabled');
        }

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
        this.pseudoRadioInputService.setState(this.state[repeaterId])

        // Enable preview UI
        this.repeaterPreviewService.toggleUi();

        // Enable "add group" button if we have not exceeded max saved entries
        if (this.savedEntries < this.maxSavedGroups) {
            $(this.queryService.get('add-group-button')).removeClass('disabled');
        }

        // Update any colour pickers that might exist
        this.pulsarFormComponent.updateColourPicker($(group));

        // Hide edit group
        $(group).hide();
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
