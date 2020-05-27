const $ = require('jquery');

class RepeaterDataService {
    /**
     *
     * @param queryService {QueryService}
     * @param inputCloneService {InputCloneService}
     * @param inputValueService {InputValueService}
     * @param uniqueIdService {UniqueIdService}
     */
    constructor (
        queryService,
        inputCloneService,
        inputValueService,
        uniqueIdService
    ) {
        this.queryService = queryService;
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
        const $formGroups = $(group).find('.form__group');
        const dataRoot = this.queryService.get('saved-entries-root');
        const savedData = document.createElement('div');

        // Add an identifier to an entry in the saved data
        savedData.setAttribute(this.queryService.getAttr('saved-entry-id'), savedEntryId);

        $formGroups.each((index, group) => {
            // Get the label
            const labelText = $(group).find('.control__label:first-child').text();

            // Clone the input
            const $input = $(group).find(this.queryService.getQuery('name'));
            const name = $input[0].getAttribute(this.queryService.getAttr('name'));
            const clone = this.inputCloneService.clone($input[0]);

            // Add name attr to clone
            clone.setAttribute('name', name);

            // Remove the new group attr
            clone.removeAttribute(this.queryService.getAttr('name'));

            // Hide clone from SRs
            clone.classList.add('u-display-none');

            // Add hidden label to cloned input to stop a11y tools complaining
            clone.setAttribute('aria-label', labelText);

            // Add cloned input to entry
            savedData.appendChild(clone);
        });

        this.uniqueIdService.uniquifyIds(savedData);

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
            state[element.getAttribute('name')].value
                .forEach(input => {
                    // Update the value for selected inputs
                    this.inputValueService.setValue(element, input.value, { selected: input.selected });
                });
        });
    }
}

module.exports = RepeaterDataService;
