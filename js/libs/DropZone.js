import _ from 'lodash';

export const defaults = {
    // HTML node that will become DropZone
    node: null,
    // limit of files within store
    maxFiles: 5,
    // limit total size of files (3e+8 === 300mb)
    maxSize: 3e+8,
    // a whitelist of file types to validate against
    whitelist: [],
    // file enters window
    windowEnter: function () {},
    // file leaves window
    windowLeave: function () {},
    // drop on the window outside of the DropZone
    windowDrop: function () {},
    // drop on the DropZone
    dropZoneDrop: function () {},
    dropZoneEnter: function () {},
    // dragged files left DropZone
    dropZoneLeave: function () {},
    // reject files
    filesRejected: function () {},
    // removed file
    fileRemoved: function () {}
};

export default class DropZone {
    constructor (options, validator) {
        this.validator = validator;
        this.options = DropZone.createOptions(defaults, options);
        // ensure we've got integers here, there is a chance these will come
        // in as strings from a DOM node's attributes
        this.options.maxFiles = parseInt(this.options.maxFiles);
        this.options.maxSize = parseInt(this.options.maxSize);
        // cache methods with context
        this.handleDropWithContext = this.handleDrop.bind(this);
        this.handleWindowEnterWithContext = this.handleWindowEnter.bind(this);
        this.handleWindowLeaveWithContext = this.handleWindowLeave.bind(this);
        // a place to be used externally as a instance based cache
        this.data = {};
        this.setup();
    }

    setup () {
        this.node = DropZone.getVanillaNode(window, this.options.node);

        if (!this.node) {
            throw new Error('DropZone requires a DOM node');
        }

        this.eventPool = [];
        this.files = [];
        this.eventTracker = { node: {}, window: {} };
        this.size = 0;
        this.windowActive = false;
        this.dropZoneActive = false;

        this.registerEvents();
        this.attachMultipleListeners(
            [window],
            'drag dragstart dragend dragover dragenter dragleave drop',
            this.preventer
        );
    }

    /**
     * Register drag & drop events
     */
    registerEvents () {
        // prevent defaults
        this.addEventAndStore(window, 'drag', this.preventer);
        this.addEventAndStore(window, 'dragstart', this.preventer);
        this.addEventAndStore(window, 'dragend', this.preventer);
        this.addEventAndStore(window, 'dragover', this.preventer);
        this.addEventAndStore(window, 'dragenter', this.preventer);
        this.addEventAndStore(window, 'dragleave', this.preventer);
        this.addEventAndStore(window, 'drop', this.preventer);
        // interactions
        this.addEventAndStore(window, 'dragenter', this.handleWindowEnterWithContext);
        this.addEventAndStore(window, 'dragleave', this.handleWindowLeaveWithContext);
        this.addEventAndStore(window, 'drop', this.handleDropWithContext);
    }

    /**
     * Handle drop event. Checks to see if we can add more files to the files store
     * @param  {Event} event
     */
    handleDrop (event) {
        const files = event.dataTransfer.items;
        // determine where the drop has taken place
        // dropped on the DropZone
        if (this.windowActive && this.dropZoneActive) {
            this.addFiles(files);
        // dropped on the window
        } else if (this.windowActive && !this.dropZoneActive) {
            this.createCallback(this.options.windowDrop, { files: this.files, node: this.node });
        }

        // reset DropZone state§
        this.windowActive = false;
        this.dropZoneActive = false;
        this.resetEventTracker();
    }

    /**
     * Validate and add files to the DropZone
     * @param {FileList} files
     * @param {Object} meta
     */
    addFiles (files, meta = {}) {
        const { valid, text } = this.validator.validate(files, this.files.length, this.size);

        if (valid) {
            // add a valid set of files to the file list
            [...files].forEach(file => {
                // we are assuming at this point if an item in a fileList does not have the method
                // getAsFile it is already a file object
                this.files.push(this.processFile(file.getAsFile ? file.getAsFile() : file, meta));
            });
            // fire dropped callback
            this.createCallback(this.options.dropZoneDrop, { files: this.files, node: this.node });
        } else {
            // reject a drag if it has failed validation
            this.rejectFiles(text);
        }
    }

    /**
     * Determine if a file is currently on the window
     */
    fileOnWindow (event) {
        const { clientX, clientY } = event;
        const offWindow = clientX === 0 && clientY === 0;
        return !offWindow && document.elementFromPoint(clientX, clientY);
    }

    /**
     * Handle a file dragged into the window
     */
    handleWindowEnter (event) {
        const onWindow = this.fileOnWindow(event);
        const onDropZone = this.node.contains(onWindow);

        if (onDropZone && !this.dropZoneActive) {
            this.handleEnter(event.dataTransfer.items);
        } else if (this.fileOnWindow(event) && !this.windowActive) {
            const files = event.dataTransfer.items;
            const { valid, text } = this.validator.validate(files, this.getFiles().length, this.size);

            this.createCallback(this.options.windowEnter, { valid });

            // validate files (if possible) as soon as the user has dragged them onto the screen
            if (!valid) {
                this.rejectFiles(text);
            }

            this.windowActive = true;
        }
    }

    /**
     * Handle a file being dragged off of the window
     * @param {Event} event
     */
    handleWindowLeave (event) {
        const onDropZone = this.node.contains(document.elementFromPoint(event.clientX, event.clientY));

        if (!onDropZone && this.dropZoneActive) {
            this.handleLeave(event.dataTransfer.items);
        } else if (!this.fileOnWindow(event)) {
            this.createCallback(this.options.windowLeave);
            this.windowActive = false;
            this.dropZoneActive = false;
        }
    }

    /**
     * Handle drag entering the DropZone
     * @param {DataTransferItemList} files
     */
    handleEnter (files) {
        const { valid, text } = this.validator.validate(files, this.getFiles().length, this.size);

        // validate files (if possible) as soon as the user has dragged them onto the screen
        if (!valid) {
            this.rejectFiles(text);
        }

        this.createCallback(this.options.dropZoneEnter, { valid });
        this.dropZoneActive = true;
    }

    /**
     * Handle drag leaving the DropZone
     * @param {DataTransferItemList} files
     */
    handleLeave (files) {
        const { valid, text } = this.validator.validate(files, this.getFiles().length, this.size);

        // validate files (if possible) as soon as the user has dragged them onto the screen
        if (!valid) {
            this.rejectFiles(text);
        }

        this.createCallback(this.options.dropZoneLeave, { valid });
        this.dropZoneActive = false;
    }

    /**
     * A place we can do something with a file before we add it to the store.
     * @param {Object} file
     * @param {Object} meta
     * @return {Object} file object
     */
    processFile (file, meta) {
        this.size += file.size;
        return _.extend({}, {
            file,
            thumbnail: DropZone.getFileThumbnail(file),
            id: _.uniqueId('DropZone_file_'),
            name: DropZone.getFileName(file),
            type: DropZone.getFileType(file),
            size: DropZone.getFileSize(file)
        }, meta);
    }

    /**
     * Handle a file rejection
     * @param {String} error
     */
    rejectFiles (error) {
        this.createCallback(this.options.filesRejected, { error, node: this.node });
    }

    /**
     * Return all files in the store or a file at a specified index
     * @param {Number} index
     * @return {Array}
     */
    getFiles (index = null) {
        return index === null ? this.files : this.files[index];
    }

    /**
     * Remove a file from the store using it's ID
     * @param  {String} id
     */
    removeFile (id) {
        this.files = this.files.filter(file => {
            if (file.id === id) {
                this.size -= file.file.size;
            } else {
                return file;
            }
        });

        this.createCallback(this.options.fileRemoved);
    }

    /**
     * Check for a callback, if it exists, call it
     * @param  {Function} callback
     * @param  {Object}   data
     */
    createCallback (callback, data = {}) {
        data = _.extend({}, data, { instance: this });

        if (typeof callback === 'function') {
            callback(data);
        }
    }

    /**
     * Attach multiple events
     * @param {Array} nodes
     * @param {String} events
     * @param {Function} handler
     */
    attachMultipleListeners (nodes, events, handler) {
        nodes.forEach(node => {
            events.split(' ').forEach(event => {
                this.addEventAndStore(node, event, handler);
            });
        });
    }

    /**
     * Add event to event pool, the event pool is used to keep track of
     * bound events to allow us to properly remove them if needed
     * @param {HTMLElement} node
     * @param {Event} event
     * @param {Function} handler
     */
    addEventToPool (node, event, handler) {
        this.eventPool.push({ node, event, handler });
    }

    /**
     * Attach an event listener to a node and store in eventPool
     * @param {HTMLElement} node
     * @param {String} event
     * @param {Function} handler
     */
    addEventAndStore (node, event, handler) {
        this.addEventToPool(node, event, handler);
        node.addEventListener(event, handler);
    }

    /**
     * Remove any events that have been attached by DropZone
     */
    removeAllEvents () {
        this.eventPool = this.eventPool.reduce((pool, item) => {
            const { node, event, handler } = item;

            node.removeEventListener(event, handler);
            return pool;
        }, []);
    }

    /**
     * Prevent default event behaviour & propagation
     * @param  {Event} event
     */
    preventer (event) {
        event.preventDefault();
    }

    /**
     * Reset
     * - Remove any events attached by DropZone
     * - re-initialise default values, and event handlers
     */
    reset () {
        this.removeAllEvents();
        this.setup();
    }

    /**
     * Reset event tracker counters
     */
    resetEventTracker () {
        Object.keys(this.eventTracker).forEach(node => {
            Object.keys(this.eventTracker[node]).forEach(event => {
                this.eventTracker[node][event] = 0;
            });
        });
    }

    /**
     * Return a vanilla node from a jQuery
     * @param {Object} window
     * @param {Element} node
     * @returns {Element}
     */
    static getVanillaNode (window, node) {
        return window.$ && node instanceof window.$ ? node[0] : node;
    }

    /**
     * Format filename for printing
     * @param  {Object} file
     * @return {String}
     */
    static getFileName (file) {
        // strip out any directory path in our filename
        return file.name.replace(/.*[\\\/]/, '');
    }

    /**
     * Format type for printing
     * @param  {Object} file
     * @return {String}
     */
    static getFileType (file) {
        if (file.type.length) {
            return file.type;
        } else {
            return 'application/file';
        }
    }

    /**
     * Format size for printing
     * @param  {Object} file
     * @return {String}
     */
    static getFileSize (file) {
        return DropZone.formatBytes(file.size);
    }

    /**
     * Create url for image preview
     * @param  {Object} file
     * @return {String|Boolean}
     */
    static getFileThumbnail (file) {
        if (file.type.match(/\/(gif|jpeg|png|svg+xml|svg)/) && URL.createObjectURL) {
            return URL.createObjectURL(file);
        } else {
            return false;
        }
    }

    /**
     * Merge defaults with options
     * @param {Object} defaults
     * @param {Object} options
     * @return {Object}
     */
    static createOptions (defaults, options) {
        return _.extend({}, defaults, options);
    }

    /**
     * Format bytes as unit relative to amount of bytes
     * @param  {Number} bytes
     * @param  {Number} decimal
     * @return {String}
     */
    static formatBytes (bytes, decimal = 1) {
        if (!bytes) {
            return '0 Byte';
        }

        const kb = 1000,
            sizes = ['Bytes', 'KB', 'MB', 'GB'],
            i = Math.floor(Math.log(bytes) / Math.log(kb));
        return `${parseFloat((bytes / Math.pow(kb, i)).toFixed(decimal))} ${sizes[i]}`;
    }
}
