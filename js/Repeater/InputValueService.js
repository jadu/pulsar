class InputValueService {
    /**
     * Dispatch input value get methods
     * returns the value prop by default
     * @param element
     * @returns {*}
     */
    getValue (element) {
        const type = {
            'checkbox': this.getCheckboxValue.bind(this)
        };

        return type[element.type] === undefined ? element.value : type[element.type](element);
    }

    /**
     * Dispatch input value set methods
     * will set the value prop by default
     * accepts a "state" object for inputs we control the state of
     * @param element
     * @param value
     * @param state
     * @returns {*}
     */
    setValue (element, value, state) {
        const type = {
            'checkbox': this.setCheckboxValue.bind(this),
            'file': this.setFileValue.bind(this),
            'radio': this.setRadioValue.bind(this)
        };

        return type[element.type] === undefined ? element.value = value : type[element.type](element, value, state);
    }

    /**
     * Get the selected attribute from a for input
     * if an input does not have a checked property we'll assume it is active
     * @param element
     * @returns {*}
     */
    getSelected (element) {
        const type = {
            'checkbox': this.isSelected.bind(this),
            'radio': this.isSelected.bind(this)
        }

        return type[element.type] === undefined ? true : type[element.type](element);
    }

    /**
     * Check if an element is selected
     * @param element
     */
    isSelected (element) {
        return element.checked;
    }

    /**
     * Get a checkbox value if it has been checked
     * @param checkbox
     * @returns {*}
     */
    getCheckboxValue (checkbox) {
        return checkbox.checked ? checkbox.value : '';
    }

    /**
     * Set a checkbox checked state if we have a value
     * @param checkbox
     * @param value
     */
    setCheckboxValue (checkbox, value) {
        checkbox.checked = !!value;
    }

    /**
     * Reset a file input if we attempt to set it's value
     * @param file
     */
    setFileValue (file) {
        const $input = $(file);

        $input.wrap('<form></form>').closest('form').trigger('reset');
        $input.unwrap('<form></form>');
    }

    /**
     * Set radio input value based on internally managed state (PseudoRadioService)
     * @param radio
     * @param value
     * @param state
     */
    setRadioValue (radio, value, state) {
        if (state.selected) {
            radio.value = value;
        }
    }
}

module.exports = InputValueService;
