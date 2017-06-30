import _ from 'lodash';

class DropZoneOptionsManager {
    constructor (Utils) {
        this.componentOptions = {};
        this.instanceOptions = [];
        this.Utils = Utils;
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
     */
    buildInstanceOptions (node) {
        const id = this.instanceOptions.length;
        const attrOptions = this.Utils.getOptionsFromAttrs(node, this.Utils.camelCaseIfy);

        this.instanceOptions[id] = _.extend({}, this.componentOptions, attrOptions);
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
