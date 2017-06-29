class DropZoneValidationUtils {
    /**
     * Validate a file type against a whitelist
     * @param {String} type
     * @param {Array} whitelist
     * @returns {boolean} valid
     */
    validateType (type, whitelist) {
        let valid = false;

        whitelist.forEach(mime => {
            if (mime.search('/')) {
                if (mime === type) {
                    // if the user has specified a full mime e.g. 'image/png'
                    // we will check that against the type
                    valid = true;
                } else if (mime.indexOf('*')) {
                    // if the user has specified a wildcard mime e.g. 'image/*'
                    // we will create a wildcard expression and test against it
                    const re = new RegExp(mime.replace('*', '[\W\w]*'));

                    if (re.exec(type)) {
                        valid = true;
                    }
                }
            } else {
                // if the user has specified a part mime e.g. 'png'
                // we'll split the type and check against the right hand side
                // the equivalent of '*/png'
                if (type.split('/')[1] === mime) {
                    valid = true;
                }
            }
        });

        return valid;
    }

    /**
     * Validate against max file count
     * @param {number} count
     * @param {number} max
     * @returns {boolean} valid
     */
    validateCount (count, max) {
        return count <= max;
    }

    /**
     * Validate against max file size
     * @param {number} count
     * @param {number} max
     * @returns {boolean} valid
     */
    validateSize (count, max) {
        return count <= max;
    }
}

module.exports = DropZoneValidationUtils;
