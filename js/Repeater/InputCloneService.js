const _ = require('lodash');

class InputCloneService {
    /**
     * Dispatch input clone methods
     * returns a clone node (deep) by default
     * @param element
     * @returns {*|Node}
     */
    clone (element) {
        const type = {
            'select-one': this.cloneSelect.bind(this),
            'select-multiple': this.cloneSelect.bind(this)
        };

        // If the input type is not defined in our type list we'll just return a deep clone
        return type[element.type] === undefined ? element.cloneNode(true) : type[element.type](element)
    }

    /**
     * Clone select element and maintain selected state
     * @param select
     */
    cloneSelect (select) {
        const selectClone = select.cloneNode(true);

        // Empty out options
        selectClone.innerHTML = '';

        // Re-create each option with the state from the cloned select
        [].slice.call(select.children).forEach(option => {
            selectClone.appendChild(new Option(option.innerText, option.value, option.selected, option.selected));
        });
        return selectClone;
    }
}

module.exports = InputCloneService;
