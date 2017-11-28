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
            'radio': this.setRadioValue.bind(this)
        };

        return type[element.type] === undefined ? element.value = value : type[element.type](element, value, state);
    }

    /**
     * Dispatch print methods for values, by default
     * we will simply return the input's value
     * @param element
     * @param value
     * @param state
     * @returns {*}
     */
    printValue (element, value, state) {
        const type = {
            'password': this.printPassword.bind(this),
            'select-one': this.printSelect.bind(this)
        };

        return type[element.type] === undefined ? element.value : type[element.type](element, value, state);
    }

    /**
     * Print passwords in a hidden state
     * @param element
     */
    printPassword (element) {
        return element.value.replace(
            new RegExp(/./g),
            '*'
        );
    }

    /**
     * Get the text content of selected options when printing select values
     * @param element
     */
    printSelect (element) {
        return [].slice.call(element.children)
            .filter(option => option.selected)
            .map(option => option.textContent)
            .join(', ')
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
     * Set radio input value based on internally managed state (PseudoRadioService)
     * @param radio
     * @param value
     * @param state
     */
    setRadioValue (radio, value, state) {
        // We only need to make this fairly destructive change if the input has a name
        // attr. Once this value is set, the input values in a set of radios will be set
        // to the selected value – which will render them useless (apart from our use case)
        // which is to simply submit the correct value
        if (state.selected && radio.hasAttribute('name')) {
            radio.value = value;
        }
    }
}

module.exports = InputValueService;
