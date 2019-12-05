class UniqueIdService {
    /**
     * UniqueIDService
     * @param hashService {HashService}
     */
    constructor (hashService) {
        this.hashService = hashService;
    }

    /**
     * Find elements within a scope that have a "for" attribute, then find corresponding
     * element with ID, then replace both attributes with a unique-ish ID
     * @param root {HTMLElement}
     */
    uniquifyFors (root) {
        [].slice.call(root.querySelectorAll('[for]'))
            .forEach(forElement => {
                const forAttribute = forElement.getAttribute('for');
                const target = root.querySelector(`#${forAttribute}`);
                const hash = this.hashService.generate(forAttribute);

                if (target) {
                    forElement.setAttribute('for', hash);
                    target.setAttribute('id', hash);
                }
            });
    }

    /**
     * Find elements within a scope and replace their ID attribute
     * with a unique-ish representation
     * @param root {HTMLElement}
     */
    uniquifyIds (root) {
        [].slice.call(root.querySelectorAll('[id]'))
            .forEach(element => {
                const id = element.getAttribute('id');
                const hash = this.hashService.generate(id);

                element.setAttribute('id', hash);
            });
    }

    /**
     * Update selectWoo child elements with unique IDs
     * @param group {HTMLElement}
     */
    uniquifySelectWoo (group) {
        const orginalSelect = group.querySelector('select.js-select2');
        const orginalSelectId = orginalSelect.getAttribute('id');

        [].slice.call(group.querySelectorAll('.select2-container'))
            .forEach(select2Container => {
                if (select2Container.querySelector('.select2-selection--multiple')) {
                    const selectWooSummary = select2Container.querySelector('.select2-selections');
                    const selectWooSearch = select2Container.querySelector('.select2-search__field');
                    const newSelectWooSummaryId = 'select2-' + orginalSelectId + '-summary';

                    selectWooSummary.setAttribute('id', newSelectWooSummaryId);
                    selectWooSearch.setAttribute('aria-describedby', newSelectWooSummaryId);
                }

                if (select2Container.querySelector('.select2-selection--single')) {
                    const selectWooSingleSelection = select2Container.querySelector('.select2-selection--single');
                    const selectWooSingleSelectionRendered = select2Container.querySelector('.select2-selection__rendered');
                    const newSelectWooSingleSelectionRenderedId = 'select2-' + orginalSelectId + '-container';

                    selectWooSingleSelectionRendered.setAttribute('id', newSelectWooSingleSelectionRenderedId);
                    selectWooSingleSelection.setAttribute('aria-controls', newSelectWooSingleSelectionRenderedId)
                    selectWooSingleSelection.setAttribute('aria-owns', newSelectWooSingleSelectionRenderedId)
                }
            });
    }
}

module.exports = UniqueIdService;
