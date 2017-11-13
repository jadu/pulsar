import $ from 'jquery';
import _ from 'lodash';

class Repeater {
    /**
     * Repeater
     */
    constructor (window) {
        this.repeaterEntries = 0;
        this.savedEntries = 0;
        this.window = window;

        // read-only
        this.repeaterAttributes = {
            name: 'data-repeater-name',
            newGroup: 'data-repeater-new-group',
            addGroup: 'data-repeater-add-group',
            editGroup: 'data-repeater-edit-group',
            deleteGroup: 'data-repeater-delete-group',
            forName: 'data-repeater-for-name',
            entryId: 'data-repeater-entry-id',
            previewId: 'data-repeater-preview-id',
            editId: 'data-repeater-edit-id',
            saveGroup: 'data-repeater-save-group',
            cancelSave: 'data-repeater-cancel-save',
            updateId: 'data-repeater-update-id',
            savedDataId: 'data-repeater-saved-data-id',
            addNewGroupText: 'data-repeater-add-new-group-text',
            addAnotherGroupText: 'data-repeater-add-another-group-text',
            maxEntries: 'data-repeater-max-entries',
            previewUi: 'data-repeater-preview-ui'
        };

        // Merge these with options
        // TODO: These will probably be read-only
        this.repeaterQueries = {
            newGroup: { query: `[${this.repeaterAttributes.newGroup}]` },
            addGroup: { query: `[${this.repeaterAttributes.addGroup}]` },
            saveGroup: { query: `[${this.repeaterAttributes.saveGroup}]` },
            cancelSave: { query: `[${this.repeaterAttributes.cancelSave}]` },
            savedEntryRoot: { query: '.repeater__saved-data' },
            previewDataRoot: { query: '.repeater__preview-data' },
            entryData: { query: '.repeater__entry-data' },
            previewHeadings: { query: `[${this.repeaterAttributes.forName}]` },
            placeholder: { query: '.repeater__empty-placeholder' },
            editGroup: { query: `[${this.repeaterAttributes.editGroup}]` },
            deleteGroup: { query: `[${this.repeaterAttributes.deleteGroup}]` },
            preview: { query: `[${this.repeaterAttributes.previewId}]` },
            previewUi: { query: `[${this.repeaterAttributes.previewUi}]` }
        };

        // Preview UI HTML
        this.previewUiHTML = `
            <td class="table__td table__td--align-right table-row__actions">                
                <a ${this.repeaterAttributes.editGroup} ${this.repeaterAttributes.previewUi} href="#edit" class="remove__control alt-link margin-right">
                    <i class="icon-pencil"><span class="hide">Edit</span></i>
                </a>
                <a ${this.repeaterAttributes.deleteGroup} ${this.repeaterAttributes.previewUi} href="#delete" class="remove__control alt-link margin-right">
                    <i class="icon-remove-sign"><span class="hide">Delete</span></i>
                </a>
            </td>
        `;
    }

    /**
     * init
     * @param repeater {HTMLElement}
     */
    init (repeater) {
        this.repeater = repeater;

        // remove repeater group input names to prevent their values being submitted
        this.removeGroupInputNames(this.getQueryReference(this.repeaterQueries.newGroup));

        this.getQueryReference(this.repeaterQueries.addGroup)
            .addEventListener('click', this.activeHandler.bind(
                null,
                this.getQueryReference(this.repeaterQueries.addGroup),
                this.handleAddGroup.bind(this)
            ));

        this.getQueryReference(this.repeaterQueries.saveGroup)
            .addEventListener('click', this.handleSaveGroup.bind(this));

        this.getQueryReference(this.repeaterQueries.cancelSave)
            .addEventListener('click', this.handleCancelGroup.bind(this));
    }

    /**
     * Handle the add group action
     * @param event
     */
    handleAddGroup (event) {
        const newGroup = this.getQueryReference(this.repeaterQueries.newGroup);
        const addGroup = this.getQueryReference(this.repeaterQueries.addGroup);

        $(newGroup).show();
        $(addGroup).addClass('disabled');
        event.preventDefault();
    }

    /**
     * Toggle the enabled state of the preview UI
     * @param repeaterId {number}
     */
    togglePreviewUi (repeaterId) {
        this.getQueryReference(this.repeaterQueries.preview, { all: true })
            .filter(preview => parseInt(preview.getAttribute(this.repeaterAttributes.previewId), 10) !== repeaterId)
            .forEach(preview => $(preview).find(this.repeaterQueries.previewUi.query).toggleClass('disabled'));
    }

    /**
     * Handle the save group action
     * @param event
     */
    handleSaveGroup (event) {
        const newGroup = this.getQueryReference(this.repeaterQueries.newGroup);
        const { data, clone } = this.saveGroupAsEntry();
        const preview = this.createEntryPreview(data);
        const addGroup = this.getQueryReference(this.repeaterQueries.addGroup);
        const maxItems = this.repeater.getAttribute(this.repeaterAttributes.maxEntries);
        const parsedMaxItems = maxItems === 'false' ? Infinity : parseInt(maxItems, 10);

        event.preventDefault();
        this.createEntryPreviewUi(preview);
        this.createEditEntryGroup(clone, preview);
        this.createEntryGroupData(clone);
        this.removePlaceholder();
        this.resetGroupFields();
        this.repeaterEntries++;
        this.savedEntries++;

        if (this.savedEntries < parsedMaxItems) {
            $(addGroup).removeClass('disabled');
        }

        addGroup.innerText = this.repeater.getAttribute(this.repeaterAttributes.addAnotherGroupText);
        $(newGroup).hide();
        $(clone).hide();
    }

    /**
     * Clone the new group inputs and save to the DOM
     * @param group {HTMLElement|Node}
     */
    createEntryGroupData (group) {
        const $inputs = $(group).find(':input').not('button');
        const dataRoot = this.getQueryReference(this.repeaterQueries.savedEntryRoot);
        const savedData = document.createElement('div');

        // Add an identifier to an entry in the saved data
        savedData.setAttribute(this.repeaterAttributes.savedDataId, this.repeaterEntries);
        // Clone each input in the group and append to the saved data
        $inputs.each((index, input) => {
            const name = input.getAttribute(this.repeaterAttributes.name);
            const clone = input.cloneNode(true);
            // Add name attr to
            clone.setAttribute('name', name);
            // Remove the new group attr
            clone.removeAttribute(this.repeaterAttributes.name);
            // Add cloned input to entry
            savedData.appendChild(clone);
        });
        // Append saved entry to the DOM
        dataRoot.appendChild(savedData);
    }

    /**
     * Add edit / delete UI elements to a group preview
     * @param previewElement {HTMLElement}
     */
    createEntryPreviewUi (previewElement) {
        let edit;
        let remove;

        $(previewElement).append(this.previewUiHTML);
        edit = previewElement.querySelector(this.repeaterQueries.editGroup.query);
        remove = previewElement.querySelector(this.repeaterQueries.deleteGroup.query);

        edit.addEventListener('click', this.activeHandler.bind(
            null,
            edit,
            this.handleEditGroup.bind(this, this.repeaterEntries)
        ));

        remove.addEventListener('click', this.activeHandler.bind(
            null,
            remove,
            this.handleDeleteGroup.bind(this, this.repeaterEntries)
        ));
    }

    /**
     * Handle edit group action
     * @param repeaterId {number}
     * @param event
     */
    handleEditGroup (repeaterId, event) {
        const previewDataRoot = this.getQueryReference(this.repeaterQueries.previewDataRoot);
        const editGroup = previewDataRoot.querySelector(`[${this.repeaterAttributes.editId}="${repeaterId}"]`);
        const addGroup = this.getQueryReference(this.repeaterQueries.addGroup);

        this.togglePreviewUi(repeaterId);
        $(addGroup).addClass('disabled');
        $(editGroup).show();
        event.preventDefault();
    }

    /**
     * Handle delete group action
     * @param repeaterId {number}
     * @param event
     */
    handleDeleteGroup (repeaterId, event) {
        const addGroup = this.getQueryReference(this.repeaterQueries.addGroup);
        const maxItems = this.repeater.getAttribute(this.repeaterAttributes.maxEntries);
        const parsedMaxItems = maxItems === 'false' ? Infinity : parseInt(maxItems, 10);
        // remove preview-id
        const preview = this.getQueryReference(this.repeaterQueries.previewDataRoot)
            .querySelector(`[${this.repeaterAttributes.previewId}="${repeaterId}"]`);
        // remove edit-id
        const edit = this.getQueryReference(this.repeaterQueries.previewDataRoot)
            .querySelector(`[${this.repeaterAttributes.editId}="${repeaterId}"]`);
        // remove saved-data-id
        const saved = this.getQueryReference(this.repeaterQueries.savedEntryRoot)
            .querySelector(`[${this.repeaterAttributes.savedDataId}="${repeaterId}"]`);

        event.preventDefault();
        preview.remove();
        edit.remove();
        saved.remove();
        this.savedEntries--;

        if (this.savedEntries < parsedMaxItems) {
            $(addGroup).removeClass('disabled');
        }

        if (!this.savedEntries) {
            addGroup.innerText = this.repeater.getAttribute(this.repeaterAttributes.addNewGroupText);
            this.addPlaceholder();
        }
    }

    /**
     * Handle the cancel interaction when adding a new group
     * @param event
     */
    handleCancelGroup (event) {
        const newGroup = this.getQueryReference(this.repeaterQueries.newGroup);
        const addGroup = this.getQueryReference(this.repeaterQueries.addGroup);
        const maxItems = this.repeater.getAttribute(this.repeaterAttributes.maxEntries);
        const parsedMaxItems = maxItems === 'false' ? Infinity : parseInt(maxItems, 10);

        if (this.savedEntries < parsedMaxItems) {
            $(addGroup).removeClass('disabled');
        }

        this.resetGroupFields();
        $(newGroup).hide();
        event.preventDefault();
    }

    /**
     * Reset each of the new group fields
     */
    resetGroupFields () {
        const group = this.getQueryReference(this.repeaterQueries.newGroup);
        const $tempFormWrapper = $(group).wrap('<form></form>').closest('form');

        // A catch-all brute-force input reset, wrap the elements in a temporary
        // form element and trigger that form to reset
        $tempFormWrapper.trigger('reset');
        $(group).unwrap($tempFormWrapper);
    }

    /**
     * Cache a reference to, and remove the empty placeholder
     */
    removePlaceholder () {
        // remove placeholder
        const placeholder = this.getQueryReference(this.repeaterQueries.placeholder);

        // add a manual cached reference here, as the remove method will lob the original
        // ref in the bin
        this.repeaterQueries.placeholder.ref = placeholder.cloneNode(true);

        // remove the placeholder from the DOM
        placeholder.remove();
    }

    /**
     * Add empty placeholder to data preview
     */
    addPlaceholder () {
        const placeholder = this.getQueryReference(this.repeaterQueries.placeholder);
        const preview = this.getQueryReference(this.repeaterQueries.previewDataRoot);

        $(preview).prepend(placeholder);
    }

    /**
     * Create an inline edit form beneath each preview row
     * @param group {HTMLElement}
     * @param preview {HTMLElement}
     */
    createEditEntryGroup (group, preview) {
        // Add repeater ID to the group
        group.setAttribute(this.repeaterAttributes.editId, this.repeaterEntries);
        // Remove the new group attr
        group.removeAttribute(this.repeaterAttributes.newGroup);
        // Remove group input name attrs
        this.removeGroupInputNames(group);
        // Insert the group after the preview row
        $(preview).after(group);
        // Add events to the save / cancel UI within the group
        group.querySelector(this.repeaterQueries.saveGroup.query)
            .addEventListener('click', this.handleUpdateGroup.bind(this, group, this.repeaterEntries));
        group.querySelector(this.repeaterQueries.cancelSave.query)
            .addEventListener('click', this.handleCancelGroupUpdate.bind(this, group, this.repeaterEntries));
    }

    /**
     * Handle an edit / update save
     * @param group {HTMLElement}
     * @param repeaterId {number}
     * @param event
     */
    handleUpdateGroup (group, repeaterId, event) {
        const $inputs = $(group).find(':input').not('button');
        const preview = this.getQueryReference(this.repeaterQueries.previewDataRoot);
        const addGroup = this.getQueryReference(this.repeaterQueries.addGroup);
        const savedData = this.getQueryReference(this.repeaterQueries.savedEntryRoot)
            .querySelector(`[${this.repeaterAttributes.savedDataId}="${repeaterId}"]`);

        $inputs.each((index, input) => {
            const updateIdAttr = this.repeaterAttributes.updateId;
            const name = input.getAttribute(this.repeaterAttributes.name);
            const query = `[${updateIdAttr}="${name}_${repeaterId}"]`;
            // Set preview text value to value of the updated input
            preview.querySelector(query).innerText = input.value;
            // Update the saved representation of the input
            savedData.querySelector(`[name="${name}"]`).value = input.value;
        });

        this.togglePreviewUi(repeaterId);
        $(addGroup).removeClass('disabled');
        $(group).hide();
        event.preventDefault();
    }

    /**
     * Handle an update cancel, inputs will be restored to their un-edited state
     * @param group {HTMLElement|Node}
     * @param repeaterId {number}
     * @param event
     */
    handleCancelGroupUpdate (group, repeaterId, event) {
        const $inputs = $(group).find(':input').not('button');
        const addGroup = this.getQueryReference(this.repeaterQueries.addGroup);
        const savedData = this.getQueryReference(this.repeaterQueries.savedEntryRoot)
            .querySelector(`[${this.repeaterAttributes.savedDataId}="${repeaterId}"]`);

        // Restore un-saved changes to edit group
        // TODO file inputs break this, they just need to be reset
        $inputs.each((index, input) => {
            input.value = savedData
                .querySelector(`[name="${input.getAttribute(this.repeaterAttributes.name)}"]`).value;
        });

        this.togglePreviewUi(repeaterId);
        $(addGroup).removeClass('disabled');
        $(group).hide();
        event.preventDefault();
    }

    /**
     * Create table data that acts as a preview of an entry and add to DOM
     * @param entryData {Array}
     * @returns HTMLElement
     */
    createEntryPreview (entryData) {
        const previewHeadings = this.getQueryReference(this.repeaterQueries.previewHeadings, { all: true });
        const previewDataRoot = this.getQueryReference(this.repeaterQueries.previewDataRoot);

        // build preview data
        const previewElements = previewHeadings
            .reduce(this.createPreviewDataElement.bind(this, entryData), []);

        // append preview data
        const entryRow = document.createElement('tr');

        entryRow.setAttribute(this.repeaterAttributes.previewId, this.repeaterEntries);
        previewElements.forEach(element => entryRow.appendChild(element));
        previewDataRoot.appendChild(entryRow);

        return entryRow;
    }

    /**
     * Create each data preview element
     * @param entryData {Array}
     * @param collection {Array}
     * @param headingElement {HTMLElement}
     * @returns {Array}
     */
    createPreviewDataElement (entryData, collection, headingElement) {
        const name = headingElement.getAttribute(this.repeaterAttributes.forName);
        const match = _.find(entryData, entry => entry.name === name);

        // create UI and attach events
        if (match) {
            const element = document.createElement('td');

            element.setAttribute(this.repeaterAttributes.updateId, `${match.name}_${this.repeaterEntries}`);
            element.textContent = match.value;
            collection.push(element);
        }

        return collection;
    }

    /**
     * Remove custom name attr and add real name attr, this will enable
     * the input's data to be sent in a request
     * @param group {HTMLElement|Node}
     */
    addGroupInputNames (group) {
        const $inputs = $(group).find(':input').not('button');

        $inputs.each((index, input) => {
            const name = input.getAttribute(this.repeaterAttributes.name);
            // set name attr on cloned group
            input.setAttribute('name', name);
            // remove custom name attr on group
            input.removeAttribute(this.repeaterAttributes.name);
        });
    }

    /**
     * Remove name attribute and add custom name attribute, this will
     * omit the input's data from requests
     * @param group {HTMLElement|Node}
     */
    removeGroupInputNames (group) {
        const $inputs = $(group).find(':input').not('button');

        $inputs.each((index, input) => {
            const name = input.getAttribute('name');
            // set name attr on cloned group
            input.setAttribute(this.repeaterAttributes.name, name);
            // remove custom name attr on group
            input.removeAttribute('name');
        });
    }

    /**
     * Save a group as a data entry, this will clone the new group form
     * @returns {{ data: Array, clone: HTMLElement|Node }}
     */
    saveGroupAsEntry () {
        const repeaterGroup = this.getQueryReference(this.repeaterQueries.newGroup);
        const clonedGroup = repeaterGroup.cloneNode(true);
        const $clonedInputs = $(clonedGroup).find(':input').not('button');
        const entry = { data: [], clone: clonedGroup, id: this.repeaterEntries };

        $clonedInputs.each((index, input) => {
            entry.data.push({
                name: input.getAttribute(this.repeaterAttributes.name),
                value: input.value
            });
        });

        this.addGroupInputNames(clonedGroup);

        return entry;
    }

    /**
     * Perform a query on the DOM with caching
     * @param query {string}
     * @param ref? {HTMLElement}
     * @param all {boolean}
     * @param fresh {boolean}
     * @returns {Element}
     */
    getQueryReference ({ query, ref }, { all = false, fresh = false } = {}) {
        if (ref === undefined || fresh) {
            ref = all ? [].slice.call(this.repeater.querySelectorAll(query)) : this.repeater.querySelector(query);
        }

        return ref;
    }

    /**
     * Wrap event handlers with enabled/disabled logic, to conditionally invoke handlers
     * @param element {HTMLElement}
     * @param handler {function}
     * @param event
     */
    activeHandler(element, handler, event) {
        if (!$(element).hasClass('disabled')) {
            handler(event);
        }
    }
}

module.exports = Repeater;
