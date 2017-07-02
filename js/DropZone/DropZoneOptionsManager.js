import _ from 'lodash';

class DropZoneOptionsManager {
    constructor (utils) {
        this.componentOptions = {};
        this.instanceOptions = [];
        this.utils = utils;
    }

    /**
     * Build and store base component options
     * @param {Object} defaults
     * @param {Object} options
     */
    buildComponentOptions (defaults, options) {
        this.componentOptions = _.extend({}, defaults, options);
    }

    /**
     * Build Instance options
     * @param {Element} node
     * @param {number} id
     * @returns {Object} options
     */
    buildInstanceOptions (node, id) {
        const attrOptions = this.utils.getOptionsFromAttrs(node);
        const options = _.extend({}, this.componentOptions, attrOptions);

        this.instanceOptions[id] = options;
        return options;
    }

    /**
     * Get instance options
     * @param {number} id
     * @returns {Object}
     */
    getInstanceOptions (id) {
        return this.instanceOptions[id];
    }
}

module.exports = DropZoneOptionsManager;
