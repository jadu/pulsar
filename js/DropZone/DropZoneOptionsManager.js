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

    /**
     * Get a property from an instance options
     * @param {number} id
     * @param {string} prop
     * @returns {*}
     */
    getInstanceOption (id, prop) {
        return this.instanceOptions[id][prop];
    }

    /**
     * Build options object for the DropZoneValidator
     * This allows us to define the validator options in the HTML
     * @param {Object} options
     * @returns {Object} validator options
     */
    buildValidatorOptions (options) {
        const validatorOptions = { validationText: {} };
        return Object.keys(options).reduce((validatorOptions, option) => {
            switch (option) {
                case 'validationMaxFiles':
                case 'validationWhitelist':
                case 'validationMaxSize':
                case 'validationUnknown':
                    // todo - this could do with perhaps being re-thought about, this seems overly complicated
                    // this is converting 'validationMaxFiles' -> 'maxFiles' so the validator options can be
                    // set in the html e.g. 'data-validation-max-files="Too many files"'
                    let newOption = option.replace('validation', '');

                    newOption = newOption[0].toLowerCase() + newOption.slice(1);
                    validatorOptions.validationText[newOption] = options[option];
                    break;
                case 'maxFiles':
                case 'maxSize':
                case 'whitelist':
                    validatorOptions[option] = options[option];
                    break;
            }

            return validatorOptions;
        }, validatorOptions);
    }
}

module.exports = DropZoneOptionsManager;
