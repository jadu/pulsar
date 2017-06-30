class DropZoneComponentFileManager {
    constructor () {
        this.instances = [];
    }

    /**
     * Add DropZone instance to the File Manager
     * @param {DropZone} instance
     */
    addInstance (instance) {
        this.instances[instance.getDropZoneId()] = instance;
    }

    /**
     * Add files to a DropZone
     * @param files
     * @param id
     * @param meta
     */
    addFiles (files, id, meta = {}) {
        this.instances[id].addFiles(files, meta);
    }
}

module.exports = DropZoneComponentFileManager;
