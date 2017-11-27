const $ = require('jquery');

class InputReplacementService {
    /**
     * Replace an input element with another of the same type (usually a clone)
     * @param elements
     * @param replacement
     * @returns {*|jQuery}
     */
    replace (elements, replacement) {
        const type = {
            'radio': this.replaceRadioInput.bind(this)
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

    replaceRadioInput (radio, replacement) {
        if (radio.getAttribute('data-pseudo-radio-id') === replacement.getAttribute('data-pseudo-radio-id')) {
            $(radio).replaceWith(replacement);
        }
    }
}

module.exports = InputReplacementService;
