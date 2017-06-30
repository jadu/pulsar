class DropZoneComponentUtils {
    /**
     * Build an options object from a node's attributes
     * @param {Element} node
     * @param {Function} camelCaseIfy
     */
    static getOptionsFromAttrs (node, camelCaseIfy) {
        return [].slice.call(node.attributes).reduce((attrs, attr) => {
            const { name } = attr;
            let { value } = attr;
            // grab value from attributes matching data-dropzone-{option}={value}
            if (name.match(/dropzone/)) {
                // transform hyphen separated attr to DropZone camelCase option
                const option = name.replace(/data-dropzone-/, '');

                // split the space separated whitelist into an array
                if (option === 'whitelist') {
                    value = value.split(' ');
                }

                // parse bools
                if (value === 'false') {
                    value = false;
                } else if (value === 'true') {
                    value = true;
                }

                attrs[camelCaseIfy(option)] = value;
            }

            return attrs;
        }, {});
    }

    /**
     * Transform a hyphen separated string to camel case
     * @param  {String} string
     * @return {String}
     */
    static camelCaseIfy (string) {
        return string.split('-').map((word, index) => {
            return index ? word[0].toUpperCase() + word.slice(1) : word;
        }).join('');
    }
}

module.exports = DropZoneComponentUtils;
