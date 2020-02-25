const $ = require("jquery");

class RepeaterPreviewService {
    /**
     * Create / Update Repeater preview elements
     * @param {HTMLElement} root
     * @param {InputValueService} inputValueService
     * @param options
     */
    constructor (
        root,
        inputValueService,
        options = {}
    ) {
        this.root = root;
        this.inputValueService = inputValueService;
        this.emptyHTML = options.empty || 'empty';
    }

    /**
     * Create a repeater preview
     * @param state
     * @param headings
     * @param id
     * @returns {HTMLElement}
     */
    create (state, headings, id) {
        const previewRow = document.createElement('tr');

        // For each heading, create a repeater preview
        headings.forEach(heading => {
            const name = heading.getAttribute('data-repeater-for-name');
            const data = state[name];
            let value = this.emptyHTML;

            if (data === undefined) {
                throw new Error(`The input "${name}" was not found in the Repeater.`);
            }

            const preview = document.createElement('td');

            preview.setAttribute('data-repeater-preview-update-id', `${name}_${id}`);

            data.value
                .filter(input => input.selected && input.value)
                .forEach(input => {
                    value = this.print(input.ref, value, input.value);
                });

            preview.textContent = value;
            previewRow.appendChild(preview);
        });

        return previewRow;
    }

    /**
     * Update a repeater preview
     * @param state
     * @param headings
     * @param root
     * @param id
     */
    update (state, headings, root, id) {
        headings.forEach(heading => {
            const name = heading.getAttribute('data-repeater-for-name');
            const data = state[name];
            let value = this.emptyHTML;

            // If our heading exists inside the state object
            if (state[name]) {
                const preview = root.querySelector(`[data-repeater-preview-update-id="${name}_${id}"]`);

                // Set the value for each input in the state
                data.value
                    .filter(input => input.selected && input.value)
                    .forEach(input => {
                        value = this.print(input.ref, value, input.value);
                    });

                preview.innerText = value;
            }
        });
    }

    /**
     * Toggle disabled state of preview UI, if a preview ID is not passed in
     * we'll disabled all preview UI elements
     * @param {string} previewId
     */
    toggleUi (previewId) {
        const $preview = $(this.root).find('[data-repeater-preview-id]');

        $preview.toArray()
            .filter(preview => {
                return previewId !== undefined ?
                    parseInt(preview.getAttribute('data-repeater-preview-id'), 10) !== previewId :
                    true;
            })
            .forEach(preview => {
                let $previewUi = $(preview).find('[data-repeater-preview-ui]');
                $previewUi.toggleClass('disabled');

                if ($previewUi.prop('disabled') !== false) {
                    $previewUi.prop('disabled', false);
                } else {
                    $previewUi.prop('disabled', true);
                }
            });
    }

    /**
     * Print a preview value, this handles sanitizing values via
     * the InputValueService as well as concatenating multiple values
     * @param input
     * @param value
     * @param newValue
     * @returns {*}
     */
    print (input, value, newValue) {
        const printedValue = this.inputValueService.printValue(input, newValue);

        if (value === this.emptyHTML) {
            return printedValue;
        } else {
            return `${value}, ${printedValue}`;
        }
    }
}

module.exports = RepeaterPreviewService;
