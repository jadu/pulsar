/**
 * Get a file extension from a string
 * @param file {string}
 * @returns {boolean}
 */
function getFileExtension (file) {
    const ext = file.split('.');

    // extensions that are not files, you shall not pass. (unless you are a data encoded URL)
    if (ext.length < 2) {
        // extract mime from data encoded string
        const re = new RegExp(/^data:image\/([a-z\-]+)/, 'i');
        const test = re.exec(file);

        return test !== null && test[1] !== undefined ? test[1] : false;
    }

    // strip query strings from our extension
    const re = new RegExp(/^[a-z0-9\-]+/, 'i');
    const test = re.exec(ext.pop());
    const fileExt = test[0];

    // return false for anything we deem not to be a file
    return fileExt !== undefined ? fileExt : false;
}

/**
 * A higher order function responsible for creating file extension
 * filter functions based on inclusion
 * @param inclusive {boolean}
 * @param getExt {function}
 * @returns {function}
 */
function filterByFileExtensionFactory (inclusive, getExt) {
    return (list, file) => {
        const ext = getExt(file);

        // Return a falsy value if we do not have a file
        if (!ext) {
            return false;
        }

        // return a boolean based on presence in the list
        // and the inclusion/exclusion option
        return (list.indexOf(getExt(file)) !== -1) === inclusive;
    }
}

/**
 * A higher order function to create a filter
 * to identify data encoded images
 * @param inclusive {boolean}
 * @returns {function}
 */
function filterByDataEncodedURIFactory (inclusive) {
    return (str) => {
        // check for strings starting with 'data:'
        const re = new RegExp(/^data:/);
        const test = re.exec(str);

        // return a boolean based on inclusion
        return (test !== null && test[0] !== undefined) === inclusive;
    }
}

/**
 * Filter a file list by extensions
 * @param list {Array<string>}
 * @param extension {string} a space separated extension list
 * @param inclusive? {boolean}
 * @returns {Array<string>}
 */
const filterFileExtensionList = (list, extension, inclusive = true) => {
    // create filter function
    const fileFilter = filterByFileExtensionFactory(inclusive, getFileExtension);
    // split extension list argument and filter
    return list.filter(fileFilter.bind(null, extension.split(' ')));
}

/**
 * Filter a single file string by extensions
 * @param file {string}
 * @param extension {string} a space separated extension list
 * @param inclusive? {boolean}
 * @returns {boolean}
 */
const filterFileExtension = (file, extension, inclusive = true) => {
    return filterByFileExtensionFactory(inclusive, getFileExtension)(extension.split(' '), file);
}

/**
 * Filter a list of strings by data URI images
 * @param list {Array<string>}
 * @param inclusive {boolean}
 * @returns {Array<string>}
 */
const filterDataEncodedURIList = (list, inclusive = true) => {
    return list.filter(filterByDataEncodedURIFactory(inclusive));
}

/**
 * Filter a list of strings by data URI images
 * @param str {string}
 * @param inclusive {boolean}
 * @returns {boolean}
 */
const filterDataEncodedURI = (str, inclusive = true) => {
    return filterByDataEncodedURIFactory(inclusive)(str);
}

module.exports = {
    filterFileExtensionList,
    filterFileExtension,
    filterDataEncodedURIList,
    filterDataEncodedURI,
    getFileExtension
};
