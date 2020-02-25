const $ = require('jquery');

class RepeaterDataService {
    /**
     * @param {HTMLElement} root
     * @param {InputCloneService} inputCloneService
     * @param {InputValueService} inputValueService
     * @param {UniqueIdService} uniqueIdService
     */
    constructor (
        root,
        inputCloneService,
        inputValueService,
        uniqueIdService
    ) {
        this.root = root;
        this.inputCloneService = inputCloneService;
        this.inputValueService = inputValueService;
        this.uniqueIdService = uniqueIdService;
    }

    /**
     * Create repeater data group
     * @param group
     * @param savedEntryId
     */
    create (group, savedEntryId) {
        const $inputs = $(group).find('[data-repeater-name]');
        const $dataRoot = $(this.root).find('[data-repeater-saved-entries-root]');
        const savedData = document.createElement('div');

        // Add an identifier to an entry in the saved data
        savedData.setAttribute('data-repeater-saved-data-id', savedEntryId);

        // Clone each input in the group and append to the saved data
        $inputs.each((index, input) => {
            const name = input.getAttribute('data-repeater-name');
            const clone = this.inputCloneService.clone(input);
            // Add name attr to
            clone.setAttribute('name', name);
            // Remove the new group attr
            clone.removeAttribute('data-repeater-name');
            // Add cloned input to entry
            savedData.appendChild(clone);
        });

        this.uniqueIdService.uniquifyIds(savedData);

        // Append saved entry to the DOM
        $dataRoot.append(savedData);
    }

    /**
     * Update repeater data group
     */
    update (state, savedEntryId) {
        const $dataRoot = $(this.root).find('[data-repeater-saved-entries-root]');
        const $savedData = $dataRoot.find(`[data-repeater-saved-data-id="${savedEntryId}"]`);

        // Iterate each input in the saved data
        $savedData.find('[name]').each((index, element) => {
            state[element.getAttribute('name')].value
                .forEach(input => {
                    // Update the value for selected inputs
                    this.inputValueService.setValue(element, input.value, { selected: input.selected });
                });
        });
    }
}

module.exports = RepeaterDataService;
