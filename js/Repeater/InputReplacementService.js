const $ = require('jquery');

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
        if (radio.getAttribute('data-pseudo-radio-id') === replacement.getAttribute('data-pseudo-radio-id')) {
            $(radio).replaceWith(replacement);
        }
    }

    /**
     * Replace select inputs, select2 needs some manual intervention
     * @param select
     * @param replacement
     */
    replaceSelect (select, replacement) {
        const $select = $(select);

        if ($select.hasClass('js-select2')) {
            const select2Data = JSON.parse(select.getAttribute(this.queryService.getAttr('select2-data')));

            this.pulsarFormComponent.initSelect2($select);

            // TODO: programmatically select the selected options here using select2Data
        }
    }
}

module.exports = InputReplacementService;
