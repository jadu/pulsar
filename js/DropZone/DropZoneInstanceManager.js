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
     * @param {Object} options
     * @param {String} browseClass | "Browse Files" node class
     */
    addInstance (node, options, browseClass = '') {
        const id = this.instances.length;
        const input = options.inputNodeId ? this.html.querySelector(`#${options.inputNodeId}`) : null;
        const browse = browseClass ? node.querySelector(`.${browseClass}`) : null;
        const dropZone = this.DropZoneFactory.create(node, options);

        // set DropZone ID on node
        node.setAttribute('data-dropzone-id', id);

        // store instance object
        this.instances.push({ options, dropZone, input, browse, id });
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
}

module.exports = DropZoneInstanceManager;
