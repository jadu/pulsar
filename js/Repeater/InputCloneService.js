import _ from 'lodash';

class InputCloneService {
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
        const originalOptions = [].slice.call(select.children);

        [].slice.call(selectClone.children).forEach(option => {
            const opt = _.find(originalOptions, o => o.value === option.value);

            option.selected = opt.selected;
        });

        return selectClone;
    }
}

module.exports = InputCloneService;
