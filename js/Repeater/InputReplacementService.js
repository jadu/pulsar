const _ = require('lodash');

class InputReplacementService {
    /**
     * Input replacement service
     * @param pulsarFormComponent
     * @param queryService
     */
    constructor (
        pulsarFormComponent,
        queryService
    ) {
        this.queryService = queryService;
        this.pulsarFormComponent = pulsarFormComponent;
    }

    /**
     * Replace an input element with another of the same type (usually a clone)
     * @param elements
     * @param replacement
     * @returns {*|jQuery}
     */
    replace (elements, replacement) {
        const type = {
            'radio': this.replaceRadioInput.bind(this),
            'select-one': this.replaceSelect.bind(this),
            'select-multiple': this.replaceSelect.bind(this)
        };

        // If the type is not defined we will use jQuery's replaceWith(...) method
        // We are expecting an element list here, as with radio Inputs we'll have
        // a chance of receiving multiple inputs with the same name
        [].slice.call(elements).forEach(element => {
            type[element.type] === undefined ?
                $(element).replaceWith(replacement) :
                type[element.type](element, replacement);
        });
    }

    /**
     * Replace radio inputs
     * @param radio
     * @param replacement
     */
    replaceRadioInput (radio, replacement) {
        const originalId = radio.getAttribute(this.queryService.getAttr('pseudo-radio-id'));
        const replacementId = replacement.getAttribute(this.queryService.getAttr('pseudo-radio-id'));

        if (originalId === replacementId) {
            $(radio).replaceWith(replacement);
        }
    }

    /**
     * We don't need to replace the select2s here, we can update the original clone
     * we'll replace regular selects with their state-full clones
     * @param select
     * @param replacement
     */
    replaceSelect (select, replacement) {
        const $select = $(select);

        if ($select.hasClass('js-select2')) {
            // Parse our dumped select2 data
            const select2Data = JSON.parse(select.getAttribute(this.queryService.getAttr('select2-data')));

            if (select2Data) {
                // Set each options's selected value based on the parsed select2 data
                [].slice.call(select.children)
                    .forEach(option => {
                        const previousState = _.find(select2Data, s2 => s2.id === option.value);

                        option.selected = previousState ? previousState.selected : false;
                    });
            }

            this.pulsarFormComponent.initSelect2($select);
        } else {
            $select.replaceWith(replacement);
        }
    }
}

module.exports = InputReplacementService;
