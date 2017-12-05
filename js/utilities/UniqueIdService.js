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
}

module.exports = UniqueIdService;
