class QueryService {
    /**
     * Query Service
     * @param root {HTMLElement}
     * @param queries {{ [string]: string }}
     */
    constructor (
        root,
        queries
    ) {
        this.root = root;
        this.queries = this.buildQueryMatrix(queries);
    }

    /**
     * Build query matrix
     * @param queries
     * @returns {*}
     */
    buildQueryMatrix (queries) {
        return Object.keys(queries).reduce((matrix, query) => {
            matrix[query] = { query: `[${queries[query]}]`, attr: queries[query] };
            return matrix;
        }, {});
    }

    /**
     * Perform a query on the DOM with caching
     * @param query {string}
     * @param all {boolean}
     * @param fresh {boolean}
     * @returns {Element}
     */
    get (query, { all = false, fresh = false } = {}) {
        if (!this.queries[query]) {
            throw new Error(`Could not find query "${query}"`);
        }

        if (this.queries[query].ref === undefined || fresh) {
            this.queries[query].ref = all ?
                [].slice.call(this.root.querySelectorAll(this.queries[query].query)) :
                this.root.querySelector(this.queries[query].query);
        }

        return this.queries[query].ref;
    }

    /**
     * Manually update a reference, this may be necessary in situations where
     * a node has been removed from the DOM, in which case we might want to
     * store a reference to a cloned version
     * @param query
     * @param ref
     */
    updateRef (query, ref) {
        if (!this.queries[query]) {
            throw new Error(`Could not find query "${query}"`);
        }

        this.queries[query].ref = ref;
    }

    /**
     * Get a query attribute
     * @param name
     */
    getAttr (name) {
        if (this.queries[name]) {
            return this.queries[name].attr;
        } else {
            throw new Error(`Could not find query "${name}"`);
        }
    }

    /**
     * Get a query query, simple
     * @param name
     */
    getQuery (name) {
        if (this.queries[name]) {
            return this.queries[name].query;
        } else {
            throw new Error(`Could not find query "${name}"`);
        }
    }
}

module.exports = QueryService;
