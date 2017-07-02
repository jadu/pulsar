class DropZoneInstanceManager {
    constructor (html, DropZoneFactory, optionsManager) {
        this.html = html;
        this.instances = [];
        this.DropZoneFactory = DropZoneFactory;
        this.optionsManager = optionsManager;
    }

    /**
     * Add DropZone instance to the manager
     * @param {Element} node
     * @param {DropZoneOptionsManager} optionsManager
     */
    addInstance (node, optionsManager) {
        const id = this.instances.length;
        const options = optionsManager.buildInstanceOptions(node, id);
        const input = options.inputNodeId ? this.html.querySelector(`#${options.inputNodeId}`) : null;
        const browse = node.querySelector(`.${options.nodeClasses.browse}`);
        const info = node.querySelector(`.${options.nodeClasses.info}`);
        const dropZone = this.DropZoneFactory.create(node, options);

        // set DropZone ID on node
        node.setAttribute('data-dropzone-id', id);

        // store instance object
        this.instances.push({ options, node, dropZone, input, browse, info, id });
    }

    /**
     * Get a DropZone instance object, will return all instances if no id arg supplied
     * @param {number} id
     * @returns {Object|Array}
     */
    getInstance (id = -1) {
        let result;

        if (id < 0) {
            result = this.instances;
        } else if (Array.prototype.find) {
            result = this.instances.find(i => i.id === id);
        } else {
            this.instances.forEach(instance => {
                if (instance.id === id) {
                    result = instance;
                }
            });
        }

        return result;
    }

    /**
     * Add files to an instance
     * @param {FileList} files
     * @param {number} id
     * @param {Object} meta
     */
    addFiles (files, id, meta = {}) {
        this.instances.forEach(instance => {
            if (instance.id === id) {
                instance.dropZone.addFiles(files, meta);
            }
        });
    }

    /**
     * Remove file from an instance
     * @param {number} dropZoneId
     * @param {number} fileId
     */
    removeFile (dropZoneId, fileId) {
        this.instances.forEach(instance => {
            if (instance.id === dropZoneId) {
                instance.dropZone.removeFile(fileId);
            }
        });
    }

    /**
     * Get Files from an instance
     * @param {number} id
     * @returns {Array}
     */
    getFiles (id) {
        let files;

        if (Array.prototype.find) {
            files = this.instances.find(i => i.id === id).dropZone.getFiles();
        } else {
            this.instances.forEach(instance => {
                if (instance.id === id) {
                    files = instance.dropZone.getFiles();
                }
            });
        }

        return files;
    }
}

module.exports = DropZoneInstanceManager;
