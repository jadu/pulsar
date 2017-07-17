export default class DropZone {
    /**
     * DropZone
     * @param {Element} node
     * @param {Object} options
     * @param {DropZoneValidatorDispatcher} validator
     * @param {DropZoneEventManager} eventManager
     * @param {DropZoneIdleTimer} idleTimer
     * @param {DropZoneFileManager} fileManager
     * @param {DropZoneCallbackManager} callbackManager
     */
    constructor (node, options, validator, eventManager, idleTimer, fileManager, callbackManager) {
        this.validator = validator;
        this.eventManager = eventManager;
        this.idleTimer = idleTimer;
        this.fileManager = fileManager;
        this.callbackManager = callbackManager;
        this.node = window.$ && node instanceof window.$ ? node[0] : node;
        this.options = options;
        this.id = this.options.dropZoneId;
        // cache methods with context
        this.handleDropWithContext = this.handleDrop.bind(this);
        this.handleWindowEnterWithContext = this.handleWindowEnter.bind(this);
        this.handleWindowLeaveWithContext = this.handleWindowLeave.bind(this);
        // a flag for determining support
        this.supportsDataTransfer = true;
        // setup files and size storage
        this.files = [];
        this.size = 0;
        this.enabled = true;
    }

    /**
     * Initialise plugin
     */
    init () {
        // prevent this for all environments as the default behaviour can be frustrating
        this.eventManager.add(window, 'drop', this.eventManager.preventer);
        // add events for environments that support data transfer items
        if (this.options.supported) {
            this.windowActive = false;
            this.dropZoneActive = false;
            // prevent
            this.eventManager.add(window, 'drag', this.eventManager.preventer);
            this.eventManager.add(window, 'dragstart', this.eventManager.preventer);
            this.eventManager.add(window, 'dragend', this.eventManager.preventer);
            this.eventManager.add(window, 'dragover', this.eventManager.preventer);
            this.eventManager.add(window, 'dragenter', this.eventManager.preventer);
            this.eventManager.add(window, 'dragleave', this.eventManager.preventer);
            // interactions
            this.eventManager.add(window, 'dragenter', this.handleWindowEnterWithContext);
            this.eventManager.add(window, 'dragleave', this.handleWindowLeaveWithContext);
            this.eventManager.add(window, 'drop', this.handleDropWithContext);

            // attempt to handle missed callbacks
            // mouseout has proven to be more reliable than dragleave
            this.eventManager.add(document, 'mouseout', this.idleTimer.start.bind(this, this.forceWindowLeave.bind(this)));
        }
    }

    /**
     * Handle drop event
     * @param  {Event} event
     */
    handleDrop (event) {
        const files = event.dataTransfer.items || event.dataTransfer.files;

        if (this.enabled) {
            // determine where the drop has taken place
            // dropped on the DropZone
            if (this.windowActive && this.dropZoneActive) {
                this.addFiles(files);
            // dropped on the window
            } else if (this.windowActive && !this.dropZoneActive) {
                this.callbackManager.create(
                    this.options.windowDrop,
                    this,
                    { files: this.files }
                );
            }

            // reset DropZone state
            this.windowActive = false;
            this.dropZoneActive = false;
        }
    }

    /**
     * Validate and add files to the DropZone
     * @param {Array} files
     * @param {Object} meta
     */
    addFiles (files, meta = {}) {
        const { valid, text } = this.validator.validate(files, this.files.length, this.size);
        const processedFiles = [];

        for (let i = 0; i < files.length; i++) {
            const file = files[i].getAsFile ? files[i].getAsFile() : files[i];
            const id = this.files.length + i;

            // increment size store
            this.size += file.size;
            // process file
            processedFiles.push(
                this.fileManager.createFileObject(file, id, meta)
            );
        }

        if (valid) {
            // add processed files to file store
            this.files = [...this.files, ...processedFiles];
        }

        // fire dropped callback
        this.callbackManager.create(
            this.options.dropZoneDrop,
            this,
            { files: processedFiles, valid, text }
        );
    }

    /**
     * Determine if file is on window
     * @param {number} x
     * @param {number} y
     * @returns {boolean|Element}
     */
    fileOnWindow (x, y) {
        const offWindow = x === 0 && y === 0;
        return !offWindow && document.elementFromPoint(x, y);
    }

    /**
     * Force window leave
     * @param {Event} event
     */
    forceWindowLeave (event) {
        const active = this.windowActive || this.dropZoneActive;

        if (active && !this.fileOnWindow(event.clientX, event.clientY)) {
            this.handleWindowLeave(event, true);
        }
    }

    /**
     * Handle a file dragged into the window
     * @param {Event} event
     */
    handleWindowEnter (event) {
        const onWindow = this.fileOnWindow(event.clientX, event.clientY);
        const onDropZone = this.node.contains(onWindow);
        const files = event.dataTransfer.items || event.dataTransfer.files;

        // clear idle timer
        this.idleTimer.clear();

        // if we are unable to get a length from the files we know data transfer
        // isn't supported, so we'll set this flag to use later
        if (!files.length) {
            this.supportsDataTransfer = false;
        }

        if (onWindow && !this.windowActive && this.enabled) {
            // handle files on window
            const {valid, text} = this.validator.validate(files, this.files.length, this.size);

            this.windowActive = true;
            this.callbackManager.create(
                this.options.windowEnter,
                this,
                {valid, text}
            );
        }

        if (onDropZone && !this.dropZoneActive && this.enabled) {
            // handle files on DropZone
            this.handleDropZoneEnter(files);
        }
    }

    /**
     * Handle a file being dragged off of the window
     * @param {Event} event
     * @param {Boolean} force
     */
    handleWindowLeave (event, force = false) {
        const onDropZone = this.node.contains(document.elementFromPoint(event.clientX, event.clientY));
        const onWindow = this.fileOnWindow(event.clientX, event.clientY);
        let files = null;

        // if we are forcing this method, there is a good chance we do not have dataTransfer items
        if (!force) {
            files = event.dataTransfer.items || event.dataTransfer.files;
        }

        if (force || !onWindow) {
            this.windowActive = false;
            this.dropZoneActive = false;
            this.idleTimer.clear();
            this.callbackManager.create(this.options.windowLeave, this);
        } else if (!onDropZone && this.dropZoneActive) {
            this.handleDropZoneLeave(files);
        }
    }

    /**
     * Handle drag entering the DropZone
     * @param {Array} files
     */
    handleDropZoneEnter (files) {
        const { valid, text } = this.validator.validate(files, this.files.length, this.size);

        this.idleTimer.clear();
        this.dropZoneActive = true;
        this.callbackManager.create(
            this.options.dropZoneEnter,
            this,
            { valid, text }
        );
    }

    /**
     * Handle drag leaving the DropZone
     * @param {Array} files
     */
    handleDropZoneLeave (files) {
        const { valid, text } = this.validator.validate(files, this.files.length, this.size);

        this.idleTimer.clear();
        this.dropZoneActive = false;
        this.callbackManager.create(
            this.options.dropZoneLeave,
            this,
            { valid, text }
        );
    }

    /**
     * Return all files in the store or a file at a specified index
     * @return {Array} files
     */
    getFiles () {
        return this.files;
    }

    /**
     * Return a file at an index
     * @param {number} index
     * @returns {Object} file
     */
    getFile (index) {
        return this.files[index];
    }

    /**
     * Return total size of files on the DropZone
     * @return {Number}
     */
    getSize () {
        return this.size;
    }

    /**
     * Remove a file from the store using it's ID
     * @param {number} id
     */
    removeFile (id) {
        this.files = this.files.filter(file => {
            if (file.id === id) {
                this.size -= file.raw.size;
            } else {
                return file;
            }
        });

        this.callbackManager.create(this.options.fileRemoved, this);
    }

    /**
     * Reset
     * - Remove any events attached by DropZone
     * - re-initialise default values, and event handlers
     */
    reset () {
        this.files = [];
        this.size = 0;
        this.eventManager.removeAll();
        this.init();
    }

    /**
     * Get DropZone ID
     * @returns {number}
     */
    getDropZoneId () {
        return this.id;
    }

    /**
     * Get dataTransfer support
     * @returns {boolean}
     */
    getSupportsDataTransfer () {
        return this.supportsDataTransfer;
    }

    /**
     * Enable DropZoneComponent
     */
    enable () {
        this.enabled = true;
    }

    /**
     * Disable DropZoneComponent
     */
    disable () {
        this.enabled = false;
    }
}
