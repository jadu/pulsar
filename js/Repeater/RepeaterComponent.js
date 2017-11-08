import $ from 'jquery';
import _ from 'lodash';

class Repeater {
    /**
     * Repeater
     */
    constructor (window) {
        this.repeaterEntries = 0;
        this.window = window;

        // Merge these with options
        this.repeaterQueries = {
            newGroup: { query: '.repeater__group' },
            addGroup: { query: '.repeater__add-group' },
            cancelGroup: { query: '.repeater__cancel-group' },
            saveGroup: { query: '.repeater__save-group' },
            savedEntryRoot: { query: '.repeater__saved-data' },
            previewDataRoot: { query: '.repeater__preview-data' },
            entryData: { query: '.repeater__entry-data' },
            previewHeadings: { query: '[data-repeater-for-name]' },
            placeholder: { query: '.repeater__empty-placeholder' }
        };

        // read-only
        this.repeaterAttributes = {
            name: 'data-repeater-name',
            forName: 'data-repeater-for-name',
            entryId: 'data-repeater-entry-id'
        };
    }

    /**
     * init
     * @param repeater {HTMLElement}
     */
    init (repeater) {
        this.repeater = repeater;

        // remove repeater group input names to prevent their values being submitted
        this.removeGroupInputNames();

        this.getQueryReference(this.repeaterQueries.addGroup)
            .addEventListener('click', this.handleAddGroup.bind(this));

        this.getQueryReference(this.repeaterQueries.saveGroup)
            .addEventListener('click', this.handleSaveGroup.bind(this));

        this.getQueryReference(this.repeaterQueries.cancelGroup)
            .addEventListener('click', this.handleCancelGroup.bind(this));
    }

    /**
     * Handle the add group action
     * @param event
     */
    handleAddGroup (event) {
        event.preventDefault();
        this.toggleGroupFields();
    }

    /**
     * Handle the save group action
     * @param event
     */
    handleSaveGroup (event) {
        const entry = this.saveGroupAsEntry();

        event.preventDefault();
        this.createEntryPreview(entry);
        this.removePlaceholder();
        this.toggleGroupFields();
        this.resetGroupFields();
        this.repeaterEntries++;
    }

    handleCancelGroup (event) {
        this.resetGroupFields();
        this.toggleGroupFields();
        event.preventDefault();
    }

    toggleGroupFields () {
        const group = this.getQueryReference(this.repeaterQueries.newGroup);

        this.window.getComputedStyle(group).display === 'none' ?
            group.style.display = 'table-row' :
            group.style.display = 'none';
    }

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
        this.repeaterQueries.placeholder.ref = placeholder.cloneNode();

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
     * Create table data that acts as a preview of an entry
     * @param entryData
     */
    createEntryPreview (entryData) {
        const previewHeadings = this.getQueryReference(this.repeaterQueries.previewHeadings, { all: true });
        const previewDataRoot = this.getQueryReference(this.repeaterQueries.previewDataRoot);

        // build preview data
        const previewElements = [].slice.call(previewHeadings)
            .reduce(this.createPreviewDataElement.bind(this, entryData), []);

        // append preview data
        const entryRow = document.createElement('tr');

        previewElements.forEach(element => entryRow.appendChild(element));
        previewDataRoot.appendChild(entryRow);
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

            element.textContent = match.value;
            collection.push(element);
        }

        return collection;
    }

    /**
     * Save a group as a data entry, this will clone
     * @returns Array {Array}
     */
    saveGroupAsEntry () {
        const repeaterGroup = this.getQueryReference(this.repeaterQueries.newGroup);
        const repeaterEntryRoot = this.getQueryReference(this.repeaterQueries.savedEntryRoot);
        const $inputs = $(repeaterGroup).find(':input').not('button');
        const newEntry = document.createElement('div');
        const entry = [];

        newEntry.className = this.repeaterQueries.entryData.query.slice(1);
        newEntry.setAttribute(this.repeaterAttributes.entryId, this.repeaterEntries);

        $inputs.each((index, input) => {
            // get custom name attr from group input
            const name = input.getAttribute(this.repeaterAttributes.name);
            // create a clone from the input
            const clone = input.cloneNode(true);

            // add entry object to entries
            entry.push({ name, value: input.value });
            // set a real name attr on the cloned input
            clone.setAttribute('name', name);
            // remove the custom name attr to avoid confusion
            clone.removeAttribute(this.repeaterAttributes.name);
            // append clone to data element
            newEntry.appendChild(clone);
        });

        repeaterEntryRoot.appendChild(newEntry);

        return entry;
    }

    /**
     * Remove name attributes form each form input and set as custom attributes
     */
    removeGroupInputNames () {
        const repeaterGroup = this.getQueryReference(this.repeaterQueries.newGroup);
        const $inputs = $(repeaterGroup).find(':input').not('button');

        $inputs.each((index, input) => {
            input.setAttribute(this.repeaterAttributes.name, input.getAttribute('name'));
            input.removeAttribute('name');
        });
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
            ref = all ? this.repeater.querySelectorAll(query) : this.repeater.querySelector(query);
        }

        return ref;
    }
}

module.exports = Repeater;
