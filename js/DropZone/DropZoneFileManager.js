class DropZoneFileManager {
    /**
     * DropZoneFileManager
     * @param {DropZoneFileUtils} utils
     */
    constructor (utils) {
        this.utils = utils;
    }

    /**
     * A place we can do something with a file before we add it to the store.
     * @param {Object} file
     * @param {number} id
     * @param {Object} meta
     * @return {Object} file object
     */
    createFileObject (file, id, meta = {}) {
        return {
            raw: file,
            id: id,
            meta: meta,
            thumbnail: !file.mock ? this.utils.getFileThumbnail(file) : null,
            name: !file.mock ? this.utils.getFileName(file.name) : file.name,
            type: !file.mock ? this.utils.getFileType(file.type) : null,
            size: !file.mock ? this.utils.getFileSize(file.size) : null,
        };
    }
}

module.exports = DropZoneFileManager;
