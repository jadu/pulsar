class DropZoneValidationUtils {
    /**
     * Validate a file type against a whitelist
     * @param {String} type
     * @param {Array} whitelist
     * @returns {boolean} valid
     */
    validateType (type, whitelist) {
        let valid;

        // in the absence of a whitelist, everything is valid
        if (!whitelist.length) {
            valid = true;
        }

        whitelist.forEach(mime => {
            if (!valid) {
                if (mime.search('/') >= 0) {
                    if (mime === type) {
                        // if the user has specified a full mime e.g. 'image/png'
                        // we will check that against the type
                        valid = true;
                    } else if (mime.indexOf('*') >= 0) {
                        // if the user has specified a wildcard mime e.g. 'image/*'
                        // we will create a wildcard expression and test against it
                        const re = new RegExp(mime.replace('*', '[\W\w]*'));

                        valid = !!(re.exec(type));
                    } else {
                        valid = false;
                    }
                } else {
                    // if the user has specified a part mime e.g. 'png'
                    // we'll split the type and check against the right hand side
                    // the equivalent of '*/png'
                    valid = type.split('/')[1] === mime;
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
