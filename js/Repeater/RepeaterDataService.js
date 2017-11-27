const $ = require('jquery');

class RepeaterDataService {
    /**
     *
     * @param queryService {QueryService}
     * @param inputCloneService {InputCloneService}
     * @param inputValueService {InputValueService}
     */
    constructor (
        queryService,
        inputCloneService,
        inputValueService
    ) {
        this.queryService = queryService;
        this.inputCloneService = inputCloneService;
        this.inputValueService = inputValueService;
    }

    /**
     * Create repeater data group
     * @param group
     * @param savedEntryId
     */
    create (group, savedEntryId) {
        const $inputs = $(group).find(this.queryService.getQuery('name'));
        const dataRoot = this.queryService.get('saved-entries-root');
        const savedData = document.createElement('div');

        // Add an identifier to an entry in the saved data
        savedData.setAttribute(this.queryService.getAttr('saved-entry-id'), savedEntryId);

        // Clone each input in the group and append to the saved data
        $inputs.each((index, input) => {
            const name = input.getAttribute(this.queryService.getAttr('name'));
            const clone = this.inputCloneService.clone(input);

            // Add name attr to
            clone.setAttribute('name', name);
            // Remove the new group attr
            clone.removeAttribute(this.queryService.getAttr('name'));
            // Add cloned input to entry
            savedData.appendChild(clone);
        });

        // Append saved entry to the DOM
        dataRoot.appendChild(savedData);
    }

    /**
     * Update repeater data group
     */
    update (state, savedEntryId) {
        const dataRoot = this.queryService.get('saved-entries-root');
        const savedData = dataRoot.querySelector(`[${this.queryService.getAttr('saved-entry-id')}="${savedEntryId}"]`);

        // Iterate each input in the saved data
        $(savedData).find('[name]').each((index, element) => {
            state[element.getAttribute('name')]
                .forEach(input => {
                    // Update the value for selected inputs
                    this.inputValueService.setValue(element, input.value, { selected: input.selected });
                });
        });
    }
}

module.exports = RepeaterDataService;
