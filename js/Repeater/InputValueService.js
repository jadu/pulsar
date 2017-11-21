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
     * @param element
     * @param value
     * @returns {*}
     */
    setValue (element, value) {
        const type = {
            'checkbox': this.setCheckboxValue.bind(this)
        };

        return type[element.type] === undefined ? element.value = value : type[element.type](element, value);
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

}

module.exports = InputValueService;
