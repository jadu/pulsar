class HashService {
    /**
     * Hash Service
     * @param date {Date}
     */
    constructor (date) {
        this.hashCache = [];
        this.date = date;
    }

    /**
     * The most basic pseudo random hash generator, by all means
     * make this more sophisticated, just ensure the final value is a string
     * @param {string} value
     * @returns {string}
     */
    generate (value) {
        let hash = this.date.now();

        // Increment our numeric hash if it exists in the hash cache
        while (this.hashCache.indexOf(`${value}_${hash}`) !== -1) {
            hash++;
        }

        // Add our hash to the cache
        this.hashCache.push(`${value}_${hash}`);

        return `${value}_${hash}`;
    }
}

module.exports = HashService;
