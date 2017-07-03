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
        const errorOptions = optionsManager.buildValidatorOptions(options);
        const input = options.inputNodeId ? this.html.querySelector(`#${options.inputNodeId}`) : null;
        const browse = node.querySelector(`.${options.nodeClasses.browse}`);
        const info = node.querySelector(`.${options.nodeClasses.info}`);
        const dropZone = this.DropZoneFactory.create(node, options, errorOptions);

        // set DropZone ID on node
        node.setAttribute('data-dropzone-id', id);

        // store instance object
        this.instances.push({ options, node, dropZone, input, browse, info, id });
    }

    /**
     * Update an instance property, useful if we need to re-reference elements
     * @param {number} id
     * @param {string} prop
     * @param {*} value
     */
    updateInstance (id, prop, value) {
        this.instances.forEach(instance => {
            if (instance.id === id) {
                instance[prop] = value;
            }
        });
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
        }  else {
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
     * @param {number} index
     * @returns {Array}
     */
    getFiles (id, index = -1) {
        let files;

        this.instances.forEach(instance => {
            if (instance.id === id) {
                files = instance.dropZone.getFiles(index);
            }
        });

        return files;
    }

    /**
     * Get data transfer support from an instance
     * @param {number} id
     * @returns {boolean}
     */
    getSupportsDataTransfer (id) {
        let support;

        this.instances.forEach(instance => {
            if (instance.id === id) {
                support = instance.dropZone.getSupportsDataTransfer();
            }
        });

        return support;
    }

    /**
     * Validate files against an instance
     * @param {FileList} files
     * @param {number} id
     */
    validateFiles (files, id) {
        let validation;

        console.log('validating...')

        this.instances.forEach(instance => {
            if (instance.id === id) {
                const length = instance.dropZone.getFiles().length;
                const size = instance.dropZone.getSize();

                validation = instance.dropZone.validator.validate(files, length, size);
            }
        });

        return validation;
    }

    /**
     * Reset an instance
     * @param {number} id
     */
    resetInstance (id = -1) {
        if (id < 0) {
            this.instances.forEach(instance => instance.dropZone.reset());
        } else {
            this.instances.forEach(instance => {
                if (instance.id === id) {
                    instance.dropZone.reset();
                }
            });
        }
    }
}

module.exports = DropZoneInstanceManager;
