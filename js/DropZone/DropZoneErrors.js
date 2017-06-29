class DropZoneErrors {
    /**
     * DropZoneErrors
     * @param {String} whitelist
     * @param {String} maxFiles
     * @param {String} maxSize
     * @param {String} unknown
     */
    constructor ({
        whitelist = 'Unsupported file type',
        maxFiles = 'Maximum number files exceeded',
        maxSize = 'Maximum file size exceeded',
        unknown = 'That file type is not recognized'
    } = {}) {
        this.whitelistText = whitelist;
        this.maxFilesText = maxFiles;
        this.maxSizeText = maxSize;
        this.unknownText = unknown;
    }

    /**
     * Get a file validation error object
     * @param {String} error
     * @returns {Object} error
     */
    getFileValidationError (error) {
        switch (error) {
            case 'WHITELIST':
                return {
                    valid: false,
                    code: 'WHITELIST',
                    text: this.whitelistText
                };
            case 'MAX_FILES':
                return {
                    valid: false,
                    code: 'MAX_FILES',
                    text: this.maxFilesText
                };
            case 'MAX_SIZE':
                return {
                    valid: false,
                    code: 'MAX_SIZE',
                    text: this.maxSizeText
                };
            case 'UNKNOWN':
                return {
                    valid: false,
                    code: 'UNKNOWN',
                    text: this.unknownText
                };
        }
    }
}

module.exports = DropZoneErrors;
