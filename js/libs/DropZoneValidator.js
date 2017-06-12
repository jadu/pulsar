import DropZone, { defaults } from './DropZone';
import _ from 'lodash';

const validationText = {
    whitelist: 'Unsupported file type',
    maxFiles: 'Maximum number files exceeded',
    maxSize: 'Maximum file size exceeded',
    unknown: 'That file type is not recognized'
};

export default class DropZoneValidator {
    constructor (options) {
        this.options = _.defaultsDeep({}, defaults, { validationText }, options);
    }

    /**
     * Validate files against validation options
     * @param {Array} files
     * @param {Number} totalFiles
     * @param {Number} totalSize
     * @returns {Object} error
     */
    validate (files, totalFiles, totalSize) {
        let result = { valid: true, text: '' };
        let fileCount = totalFiles;
        let sizeCount = totalSize;

        [...files].forEach(file => {
            const fileObject = file.getAsFile ? file.getAsFile() : file;

            fileCount++;

            // 1. reject items that do not have a type
            if (result.valid) {
                if (file.type === '') {
                    result = this.throwError('UNKNOWN');
                }
            }

            // 2. whitelist
            //   - check we have a whitelist
            //   - ensure our file is on the whitelist
            if (result.valid) {
                if (this.options.whitelist && this.options.whitelist.length) {
                    if (!this.validateType(file.type)) {
                        result = this.throwError('WHITELIST', file.type);
                    }
                }
            }

            // 3. max files
            //   - ensure we haven't exceeded our max files
            if (result.valid) {
                if (!this.validateCount(fileCount)) {
                    result = this.throwError('MAX_FILES');
                }
            }

            // 4. max size
            //   - ensure we haven't exceeded our maximum size, if we can get size
            //
            // check to see if we can get a file, if we can't we know we cannot
            // determine the size, so we'll pass this and handle it when we can get
            // the size
            if (result.valid && fileObject) {
                sizeCount += fileObject.size;

                if (!this.validateSize(sizeCount)) {
                    result = this.throwError('MAX_SIZE');
                }
            }
        });

        return result;
    }

    /**
     * Validate file mime type
     * @param {String} type
     * @returns {Boolean}
     */
    validateType (type) {
        let valid = false;

        this.options.whitelist.forEach(mime => {
            if (mime.includes('/')) {
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
     * Validate file count
     * @param {Number} count
     * @returns {boolean}
     */
    validateCount (count) {
        return count <= parseInt(this.options.maxFiles);
    }

    /**
     * Validate size count
     * @param {Number} count
     * @returns {Boolean}
     */
    validateSize (count) {
        return count <= parseInt(this.options.maxSize);
    }

    /**
     * Return error objects
     * @param {String} error
     * @param {String} culprit
     * @returns {Object}
     */
    throwError (error, culprit = '') {
        switch (error) {
            case 'WHITELIST':
                return {
                    valid: false,
                    code: 'WHITELIST',
                    text: `${this.options.validationText.whitelist} ${culprit}`
                };
            case 'MAX_FILES':
                return {
                    valid: false,
                    code: 'MAX_FILES',
                    text: this.options.validationText.maxFiles
                };
            case 'MAX_SIZE':
                return {
                    valid: false,
                    code: 'MAX_SIZE',
                    text: `${this.options.validationText.maxSize} (${DropZone.formatBytes(this.options.maxSize)})`
                };
            case 'UNKNOWN':
                return {
                    valid: false,
                    code: 'UNKNOWN',
                    text: this.options.validationText.unknown
                };
        }
    }
}

