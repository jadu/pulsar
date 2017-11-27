class RepeaterPreviewService {
    /**
     * Create / Update Repeater preview elements
     * @param queryService {QueryService}
     * @param activeFunctionService {ActiveFunctionService}
     * @param options
     */
    constructor (
        queryService,
        activeFunctionService,
        options = {}
    ) {
        this.queryService = queryService;
        this.activeFunctionService = activeFunctionService;
        this.emptyHTML = options.empty || 'empty';
    }

    /**
     * Create a repeater preview
     * @param state
     * @param headings
     * @returns {HTMLElement}
     */
    create (state, headings) {
        const previewRow = document.createElement('tr');

        // For each heading, create a repeater preview
        headings.forEach(heading => {
            const name = heading.getAttribute(this.queryService.getAttr('preview-heading'));
            const data = state[name];
            let value = this.emptyHTML;

            // If our heading exists inside the state object
            if (state[name]) {
                const preview = document.createElement('td');

                // Set the value for each input in the state
                data.forEach(input => {
                    preview.setAttribute(this.queryService.getAttr('preview-update-id'), name);

                    if (input.selected && input.value) {
                        value = value === this.emptyHTML ? input.value : `${value}, ${input.value}`;
                    }
                });

                preview.textContent = value;
                previewRow.appendChild(preview);
            }
        });

        return previewRow;
    }

    /**
     * Update a repeater preview
     * @param state
     * @param headings
     * @param root
     */
    update (state, headings, root) {
        headings.forEach(heading => {
            const name = heading.getAttribute('data-repeater-for-name');
            const data = state[name];
            let value = this.emptyHTML;

            // If our heading exists inside the state object
            if (state[name]) {
                const preview = root.querySelector(`[${this.queryService.getAttr('preview-update-id')}="${name}"]`);

                // Set the value for each input in the state
                data.forEach(input => {
                    if (input.selected && input.value) {
                        value = value === this.emptyHTML ? input.value : `${value}, ${input.value}`;
                    }
                });

                preview.textContent = value;
            }
        });
    }

    /**
     * Toggle disabled state of preview UI, if a preview ID is not passed in
     * we'll disabled all preview UI elements
     * @param previewId
     */
    toggleUi (previewId) {
        this.queryService.get('preview-element', { all: true })
            .filter(preview => {
                return previewId !== undefined ?
                    parseInt(preview.getAttribute(this.queryService.getAttr('preview-id')), 10) !== previewId :
                    true;
            })
            .forEach(preview => {
                $(preview).find(this.queryService.getQuery('preview-ui')).toggleClass('disabled');
            });
    }
}

module.exports = RepeaterPreviewService;
