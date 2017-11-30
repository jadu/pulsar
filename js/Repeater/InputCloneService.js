class InputCloneService {
    /**
     * Input clone service
     * @param pulsarFormComponent
     * @param queryService {QueryService}
     */
    constructor (
        pulsarFormComponent,
        queryService
    ) {
        this.queryService = queryService;
        this.pulsarFormComponent = pulsarFormComponent;
    }

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
        const $select = $(select);
        const selectClone = select.cloneNode(true);

        if ($select.hasClass('js-select2') && $select.data('select2')) {
            select.setAttribute(this.queryService.getAttr('select2-data'), JSON.stringify($select.select2('data')));
            $select.select2('destroy');
        }

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
