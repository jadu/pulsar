/**
 * A higher order function responsible for creating file extension
 * filter functions based on inclusion
 * @param inclusive
 * @returns {function(Array<string>, string)}
 */
function filterByFileExtensionFactory (inclusive) {
    return (list, ext) => {
        const file = ext.split('.');

        // extensions that are not files, you shall not pass
        if (file.length < 2) {
            return false;
        }

        // strip query strings from our extension
        const re = new RegExp(/^[a-z0-9\-]+/);
        // test against the last '.(ext)'
        const test = re.exec(file.pop());
        const fileExt = test[0];

        // return false for anything we deem not to be a file
        if (fileExt === undefined) {
            return false;
        }

        // return a boolean based on presence in the list
        // and the inclusion/exclusion option
        return (list.indexOf(fileExt) !== -1) === inclusive;
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
    const fileFilter = filterByFileExtensionFactory(inclusive);
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
    return filterByFileExtensionFactory(inclusive)(extension.split(' '), file);
}

module.exports = {
    filterFileExtensionList,
    filterFileExtension
};
