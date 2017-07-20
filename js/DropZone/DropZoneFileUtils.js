class DropZoneFileUtils {
    /**
     * Format filename for printing
     * @param  {String} filename
     * @return {String}
     */
    getFileName (filename) {
        return filename.replace(/.*[\\\/]/, '');
    }

    /**
     * Format type for printing
     * @param  {String} type
     * @return {String}
     */
    getFileType (type) {
        if (type.length) {
            return type;
        } else {
            return '';
        }
    }

    /**
     * Format size for printing
     * @param  {number} size
     * @param  {number} decimal
     * @return {String}
     */
    getFileSize (size, decimal = 1) {
        const kb = 1000,
            sizes = ['Bytes', 'KB', 'MB', 'GB'],
            i = Math.floor(Math.log(size) / Math.log(kb));

        if (!size) {
            return '0 Byte';
        } else {
            return `${parseFloat((size / Math.pow(kb, i)).toFixed(decimal))} ${sizes[i]}`;
        }
    }

    /**
     * Create url for image preview
     * @param {Object} file
     * @return {String|Boolean}
     */
    getFileThumbnail (file) {
        if (file.type.match(/\/(gif|jpeg|png|svg+xml|svg)/) && window.URL.createObjectURL) {
            return window.URL.createObjectURL(file);
        } else {
            return false;
        }
    }
}

module.exports = DropZoneFileUtils;
