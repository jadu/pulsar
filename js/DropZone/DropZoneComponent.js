import _ from 'lodash';

class DropZoneComponent {
    /**
     * DropZoneComponent
     * @param {Element} body
     * @param {string} selector
     * @param {DropZoneInstanceManager} instanceManager
     * @param {DropZoneOptionsManager} optionsManager
     * @param {DropZoneComponentUtils} utils
     * @param {DropZoneComponentValidationManager} validationManager
     * @param {DropZoneBodyClassManager} classManager
     */
    constructor (body, selector, instanceManager, optionsManager, utils, validationManager, classManager) {
        this.body = body;
        this.selector = selector;
        this.instanceManager = instanceManager;
        this.optionsManager = optionsManager;
        this.utils = utils;
        this.validationManager = validationManager;
        this.classManager = classManager;
    }

    /**
     * Initiate DropZone component, this wraps and defines options for
     * multiple instances of DropZone
     */
    init (options = {}) {
        const defaults = {
            // values
            maxFiles: 5,
            maxSize: 3e+8, // 300mb
            idleTimerDuration: 1000,
            // helper html
            idleHtml: 'your files here or <a class="dropzone__browse" id="#">Browse Files</a>',
            windowEnterHtml: 'Drag your files here',
            dropZoneEnterHtml: 'Drop your files here',
            // passive
            passive: false,
            // support
            supported: true,
            // input
            inputNodeId: null,
            showInputNode: false,
            // file node config
            fileNodeDesc: true,
            fileNodeName: true,
            fileNodeSize: true,
            fileNodeType: true,
            // node classes
            nodeClasses: {
                info: 'dropzone__info',
                wrapper: 'dropzone__file-wrapper',
                validation: 'dropzone__validation',
                help: 'dropzone__help',
                browse: 'dropzone__browse',
                inner: 'dropzone__file-inner',
                close: 'dropzone__close',
                error: 'dropzone__error',
                file: 'dropzone__file',
                meta: 'dropzone__meta',
                name: 'dropzone__name',
                description: 'dropzone__description',
                type: 'dropzone__type',
                size: 'dropzone__size',
                thumbnail: 'dropzone__thumbnail'
            },
            // interaction classes
            interactionClasses: {
                windowEnter: 'dropzone-window-active',
                dropZoneEnter: 'dropzone-dropzone-active',
                dropZoneSuccess: 'dropzone-success',
                dropZoneError: 'dropzone-error'
            }
        };

        const callbacks = {
            windowEnter: this.handleWindowEnter.bind(this),
            windowLeave: this.handleWindowLeave.bind(this),
            dropZoneEnter: this.handleDropZoneEnter.bind(this),
            dropZoneLeave: this.handleDropzoneLeave.bind(this),
            dropZoneDrop: this.handleDropZoneDrop.bind(this),
            windowDrop: this.handleWindowDrop.bind(this),
            fileRemoved: this.handleFileRemoved.bind(this)
        };

        // get all DropZone elements
        this.dropZoneInstances = [].slice.call(this.body.querySelectorAll(this.selector));

        // build options from options passed to the constructor and the defaults
        this.optionsManager.buildComponentOptions(defaults, options, callbacks);

        // add DropZone(s) to instance manager
        this.dropZoneInstances.forEach(node => {
            // create and store DropZone instance
            this.instanceManager.addInstance(node, this.optionsManager);
        });

        // iterate over our DropZoneInstanceManagerInstances to process any input nodes & update help state
        this.instanceManager.getInstance().forEach(instance => {
            if (instance.input) {
                this.processInputNode(instance.input, instance.id, instance.options.showInputNode);

                if (instance.browse) {
                    instance.browse.addEvent('click', this.handleBrowseNodeClick.bind(this, instance.input));
                }
            }
        });

        // bind this here, so we have a ref
        this.removeFile = this.removeFile.bind(this);
    }

    /**
     * If an input node ID has been passed in, we'll take care of linking the DropZone
     * instance to this node
     * @param {Element} input
     * @param {number} id
     * @param {boolean} show
     */
    processInputNode (input, id, show) {
        // for now these handlers can stay anonymous, the likely hood of wanting to disable a DropZone
        // at some point in a session seems unlikely. famous. last. words.
        input.addEventListener('change', () => {
            const files = input.files;

            // we'll add a persist property to our file objects, this can be used to
            // persist the front-end validation, which is essential when using an
            // associated file input
            if (input.value) {
                this.instanceManager.addFiles(files, id, { persist: true });
            }

            // reset input node value, this will ensure our change event
            // fires each time we use the browse files functionality - even
            // if we try to add an identical value
            input.value = '';
            input.type = '';
            input.type = 'file';
        });

        // visually hide input - this should ideally be done in the CSS also to prevent a
        // flash on load (with some consideration for non javascript users)
        if (!show) {
            input.style.display = 'none';
        }
    }

    /**
     * Handle browse node click
     * @param {Element} input
     */
    handleBrowseNodeClick (input) {
        // trigger a synthetic click on the input node which will activate the
        // native Browse Files interaction
        input.click();
    }

    /**
     * Update DropZone info node innerHTML
     * @param {number} id
     * @param {String} string
     */
    updateInfoState (id, string) {
        const { info, node } = this.instanceManager.getInstance(id);
        const options = this.optionsManager.getInstanceOptions(id);

        if (info) {
            info.innerHTML = string;

            const browse = node.querySelector(`.${options.nodeClasses.browse}`);

            if (browse) {
                this.instanceManager.updateBrowseNode(id, browse);
            }
        }
    }

    /**
     * Update DropZone Html
     * - remove validation node if we have one
     * - add / remove files Html
     * - remove wrapper if we have no files
     * @param {number} id
     */
    updateDropZoneFiles (id) {
        const { node } = this.instanceManager.getInstance(id);
        const options = this.optionsManager.getInstanceOptions(id);
        const files = this.instanceManager.getFiles(id);
        let wrapper = node.querySelector(`.${options.nodeClasses.wrapper}`);
        let fileNodeString = '';

        // if we've got a drop we know we don't have any errors
        // clear any previous validation messages
        this.validationManager.clear(node, options.nodeClasses.validation);

        // if there are no files we'll remove the wrapper
        if (!files.length) {
            if (wrapper) {
                wrapper.parentNode.removeChild(wrapper);
            }

            return;
        }

        // if we do not already have a wrapper, create one
        if (!wrapper) {
            wrapper = document.createElement('div');
            wrapper.className = options.nodeClasses.wrapper;
            node.appendChild(wrapper);
        }

        // create file html string
        files.forEach(file => {
            fileNodeString += this.utils.createFileNode(file, options);
        });

        // update wrapper html
        wrapper.innerHTML = fileNodeString;
        [].slice.call(wrapper.querySelectorAll(`.${options.nodeClasses.close}`)).forEach(closeButton => {
            closeButton.addEventListener('click', this.removeFile);
        });
    }

    /**
     * Throw a DropZone error, useful as a public method for manually triggering DropZone errors
     * example: throwing an error returned as a response from a server
     * @param {String} error
     * @param {number} id
     */
    throwValidationError (error, id) {
        const { node, info } = this.instanceManager.getInstance(parseInt(id));
        const options = this.optionsManager.getInstanceOptions(id);

        this.validationManager.update(
            error,
            node,
            info,
            options.nodeClasses.validation,
            options.nodeClasses.error,
            options.passive
        );

        this.updateInfoState(id, options.idleHtml);
    }

    /**
     * Remove files from DropZone instances
     * @param  {Event} event
     */
    removeFile (event) {
        let file = null;
        let dropZone = null;
        const path = this.utils.getEventPath(event.target);

        event.preventDefault();

        // grab the file id and DropZone id, this is necessary in the
        // albeit unlikely event we have multiple DropZone instances
        path.forEach(node => {
            if (file === null) {
                const attr = node.getAttribute('data-dropzone-file');

                file = attr ? parseInt(attr) : null;
            }

            if (dropZone === null) {
                const attr = node.getAttribute('data-dropzone-id');

                dropZone = attr ? parseInt(attr) : null;
            }
        });

        if (dropZone !== null && file !== null) {
            this.instanceManager.removeFile(dropZone, file);
            this.updateDropZoneFiles(dropZone);
        }
    }

    /**
     * Handle DropZone windowEnter callback
     * @param {Boolean} valid
     * @param {String} text
     * @param {DropZone} instance
     */
    handleWindowEnter ({ valid, text, instance }) {
        const id = instance.getDropZoneId();

        if (valid) {
            this.updateInfoState(id, instance.options.windowEnterHtml);
            this.classManager.update(this.body, [instance.options.interactionClasses.windowEnter]);
        } else {
            this.throwValidationError(text, id);
            this.classManager.update(
                this.body,
                [
                    instance.options.interactionClasses.windowEnter,
                    instance.options.interactionClasses.dropZoneError
                ]
            );
        }

        if (instance.options.customWindowEnter && typeof instance.options.customWindowEnter === 'function') {
            instance.options.customWindowEnter.apply(this, [].slice.call(arguments));
        }
    }

    /**
     * Handle DropZone windowLeave callback
     * @param {DropZone} instance
     */
    handleWindowLeave ({ instance })  {
        const id = instance.getDropZoneId();

        // update helper text
        this.updateInfoState(id, instance.options.idleHtml);

        // reset body class
        this.classManager.update(this.body);

        // update validation if there was any
        this.validationManager.clear(instance.node, instance.options.nodeClasses.validation);

        // call any additional callbacks passed in via options
        if (instance.options.customWindowLeave && typeof instance.options.customWindowLeave === 'function') {
            instance.options.customWindowLeave.apply(this, [].slice.call(arguments));
        }
    }

    /**
     * Handle DropZone dropZoneEnter callback
     * @param {Boolean} valid
     * @param {String} text
     * @param {DropZone} instance
     */
    handleDropZoneEnter ({ valid, text, instance }) {
        const id = instance.getDropZoneId();

        // update helper text
        if (valid) {
            this.updateInfoState(id, instance.options.dropZoneEnterHtml);
            this.classManager.update(this.body, [
                instance.options.interactionClasses.windowEnter,
                instance.options.interactionClasses.dropZoneEnter
            ]);
        } else {
            this.throwValidationError(text, id);
            this.classManager.update(this.body, [
                instance.options.interactionClasses.windowEnter,
                instance.options.interactionClasses.dropZoneEnter,
                instance.options.interactionClasses.dropZoneError
            ]);
        }

        // call any additional callbacks passed in via options
        if (instance.options.customDropZoneEnter && typeof instance.options.customDropZoneEnter === 'function') {
            instance.options.customDropZoneEnter.apply(this, [].slice.call(arguments));
        }
    }

    /**
     * Handle DropZone dropZoneLeave callback
     * @param {Boolean} valid
     * @param {String} text
     * @param {DropZone} instance
     */
    handleDropzoneLeave ({ valid, text, instance }) {
        const id = instance.getDropZoneId();

        // update helper text
        if (valid) {
            this.updateInfoState(id, instance.options.windowEnterHtml);
            this.classManager.update(this.body, [instance.options.interactionClasses.windowEnter]);
        } else {
            this.throwValidationError(text, id);
            this.classManager.update(this.body, [
                instance.options.interactionClasses.windowEnter,
                instance.options.interactionClasses.dropZoneError
            ]);
        }

        // call any additional callbacks passed in via options
        if (instance.options.customDropZoneLeave && typeof instance.options.customDropZoneLeave === 'function') {
            instance.options.customDropZoneLeave.apply(this, [].slice.call(arguments));
        }
    }

    /**
     * Handle DropZone dropZoneEnter callback
     * @param {Array} files
     * @param {Boolean} valid
     * @param {String} text
     * @param {DropZone} instance
     */
    handleDropZoneDrop ({ files, valid, text, instance }) {
        const id = instance.getDropZoneId();

        if (valid) {
            this.updateDropZoneFiles(id);
            this.classManager.update(this.body, [instance.options.interactionClasses.dropZoneSuccess]);
        } else {
            // If a persist property has been set on the file, we will throw a
            // validation error which will persist once the file is dropped, this
            // helps us out when we need to throw an error when a user uses an associated
            // native file input's "browse files"
            const persist = _.find(files, file => file.meta.persist);

            if (!instance.getSupportsDataTransfer() || persist) {
                this.throwValidationError(text, id);
            } else {
                // if we are not persisting validation messages, clear any that are present
                this.validationManager.clear(instance.node, instance.options.nodeClasses.validation);
            }

            this.classManager.update(this.body);
        }

        // update helper text
        this.updateInfoState(id, instance.options.idleHtml);

        // call any additional callbacks passed in via options
        if (instance.options.customDropZoneDrop && typeof instance.options.customDropZoneDrop === 'function') {
            instance.options.customDropZoneDrop.apply(this, [].slice.call(arguments));
        }
    }

    /**
     * Handle DropZone windowDrop callback
     * @param {Array} files
     * @param {DropZone} instance
     */
    handleWindowDrop ({ files, instance }) {
        const id = instance.getDropZoneId();

        // reset body class
        this.classManager.update(this.body);

        // handle dropped files
        this.updateDropZoneFiles(id);

        // update helper text
        this.updateInfoState(id, instance.options.idleHtml);

        if (instance.getSupportsDataTransfer()) {
            // clear validation
            this.validationManager.clear(instance.node, instance.options.nodeClasses.validation);
        }

        if (instance.options.customWindowDrop && typeof instance.options.customWindowDrop === 'function') {
            instance.options.customWindowDrop.apply(this, [].slice.call(arguments));
        }
    }

    /**
     * Handle DropZone fileRemoved callback
     * @param {DropZone} instance
     */
    handleFileRemoved ({ instance }) {
        // reset body class
        this.classManager.update(this.body);

        // call any additional callbacks passed in via options
        if (instance.options.customFileRemoved && typeof instance.options.customFileRemoved === 'function') {
            instance.options.customFileRemoved.apply(this, [].slice.call(arguments));
        }
    }

    /**
     * Validate files against a DropZone instance
     * @param {FileList} files
     * @param {number} id
     * @returns {Object} validation object
     */
    validateFiles (files, id) {
        return this.instanceManager.validateFiles(files, id);
    }

    /**
     * Reset all / selected DropZones
     * @param {number} id
     */
    reset (id = -1) {
        if (id < 0) {
            this.instanceManager.getInstance().forEach(instance => {
                this.instanceManager.resetInstance(instance.id);
                this.updateDropZoneFiles(instance.id);
                this.updateInfoState(instance.id, this.optionsManager.getInstanceOption(instance.id, 'idleHtml'));
            });
        } else {
            this.instanceManager.resetInstance(id);
            this.updateDropZoneFiles(id);
            this.updateInfoState(id, this.optionsManager.getInstanceOption(id, 'idleHtml'));
        }

        this.classManager.update(this.body);
    }

    /**
     * Add files to DropZone instance
     * @param {FileList|Array} files
     * @param {number} id
     * @param {Object} meta
     */
    addFilesToDropZone (files, id, meta = {}) {
        this.instanceManager.addFiles(files, id, meta);
    }

    /**
     * Get all files from DropZone instances
     * @param {number} id
     * @returns {{valid: Boolean, text: String, files: Array}}
     */
    getFilesFromDropZone (id) {
        const files = this.instanceManager.getFiles(id);
        const { valid, text } = this.instanceManager.validateFiles(files.map(file => file.raw), id, true);

        // throw an internal validation error
        if (!valid) {
            this.throwValidationError(text, id);
        }

        // return a files collection object
        return { valid, text, files };
    }

    /**
     * Get instance idleHtml
     * @param {number} id
     * @returns {string}
     */
    getInstanceIdleHtml (id) {
        return this.optionsManager.getInstanceOption(id, 'idleHtml');
    }

    /**
     * Get instance windowEnterHtml
     * @param {number} id
     * @returns {string}
     */
    getInstanceWindowEnterHtml (id) {
        return this.optionsManager.getInstanceOption(id, 'windowEnterHtml');
    }

    /**
     * Get instance dropZoneEnterHtml
     * @param {number} id
     * @returns {string}
     */
    getInstanceDropZoneEnterHtml (id) {
        return this.optionsManager.getInstanceOption(id, 'dropZoneEnterHtml');
    }

    /**
     * Get instance support
     * @param {number} id
     * @returns {boolean}
     */
    getSupportsDataTransferItems (id) {
        return this.instanceManager.getSupportsDataTransfer(id);
    }

    /**
     * Enable DropZoneComponent
     * @param {Number} id
     */
    enable (id) {
        this.instanceManager.enableInstance(id);
    }

    /**
     * Disable DropZoneComponent
     * @param {Number} id
     */
    disable (id) {
        this.instanceManager.disableInstance(id);
    }

    /**
     * Get instance Browse Files node
     * @param {Number} id
     */
    getBrowseNode (id) {
        const { browse } = this.instanceManager.getInstance(id);

        return browse.getNode();
    }

    /**
     * Disable browse node functionality
     * @param {Number} id
     */
    disableBrowseNode (id) {
        this.instanceManager.disableBrowseNode(id);
    }

    /**
     * Enable browse node functionality
     * @param {Number} id
     */
    enableBrowseNode (id) {
        this.instanceManager.enableBrowseNode(id);
    }
}

module.exports = DropZoneComponent;
