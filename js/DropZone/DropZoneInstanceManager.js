import _ from 'lodash';

class DropZoneInstanceManager {
    constructor (html, DropZoneFactory, BrowseNodeFactory) {
        this.html = html;
        this.instances = [];
        this.DropZoneFactory = DropZoneFactory;
        this.BrowseNodeFactory = BrowseNodeFactory;
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
        const browse = this.BrowseNodeFactory.create(node.querySelector(`.${options.nodeClasses.browse}`));
        const info = node.querySelector(`.${options.nodeClasses.info}`);
        const dropZone = this.DropZoneFactory.create(node, options, errorOptions);

        // initiate dropZone
        dropZone.init();

        // set DropZone ID on node
        node.setAttribute('data-dropzone-id', id);

        // store instance object
        this.instances.push({ options, node, dropZone, input, browse, info, id });
    }

    /**
     * Update ref to browse node and re-attach events
     * @param {Number} id
     * @param {Element} node
     */
    updateBrowseNode (id, node) {
        const instance = _.find(this.instances, i => i.id === id);

        instance.browse.update(node);
        instance.browse.enableEvents();
    }

    /**
     * Enable browse node events
     * @param {Number} id
     */
    enableBrowseNode (id) {
        const instance = _.find(this.instances, i => i.id === id);

        instance.browse.enableEvents();
    }

    /**
     * Disable browse node events
     * @param {Number} id
     */
    disableBrowseNode (id) {
        const instance = _.find(this.instances, i => i.id === id);

        instance.browse.disableEvents();
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
            result = _.find(this.instances, i => i.id === id);
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
        _.find(this.instances, i => i.id === id).dropZone.addFiles(files, meta);
    }

    /**
     * Remove file from an instance
     * @param {number} id
     * @param {number} fileId
     */
    removeFile (id, fileId) {
        _.find(this.instances, i => i.id === id).dropZone.removeFile(fileId);
    }

    /**
     * Get all files from an instance
     * @param {number} id
     * @returns {Array} files
     */
    getFiles (id) {
        return _.find(this.instances, i => i.id === id).dropZone.getFiles();
    }

    /**
     * Get a specific file from an instance
     * @param {number} id
     * @param {number} index
     * @returns {Object} file
     */
    getFile (id, index) {
         return _.find(this.instances, i => i.id === id).dropZone.getFile(index);
    }

    /**
     * Get data transfer support from an instance
     * @param {number} id
     * @returns {boolean}
     */
    getSupportsDataTransfer (id) {
        return _.find(this.instances, i => i.id === id).dropZone.getSupportsDataTransfer();
    }

    /**
     * Validate files against an instance
     * @param {FileList} files
     * @param {number} id
     * @param {Boolean} retry
     */
    validateFiles (files, id, retry = false) {
        const instance = _.find(this.instances, i => i.id === id);

        return instance.dropZone.validator.validate(
            files,
            instance.dropZone.getFiles().length,
            instance.dropZone.getSize(),
            retry
        );
    }

    /**
     * Reset an instance
     * @param {number} id
     */
    resetInstance (id = -1) {
        if (id < 0) {
            this.instances.forEach(instance => instance.dropZone.reset());
        } else {
            _.find(this.instances, i => i.id === id).dropZone.reset();
        }
    }

    /**
     * Disable DropZone instance
     * @param {Number} id
     */
    disableInstance (id) {
        const instance = _.find(this.instances, i => i.id === id);

        instance.dropZone.disable();
    }

    /**
     * Enable DropZone instance
     * @param {Number} id
     */
    enableInstance (id) {
        const instance = _.find(this.instances, i => i.id === id);

        instance.dropZone.enable();
    }
}

module.exports = DropZoneInstanceManager;
