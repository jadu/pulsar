import _ from 'lodash';

export const defaults = {
    // HTML node that will become DropZone
    node: document.body,
    // limit of files within store
    maxFiles: 5,
    // limit total size of files (314572800 === 300mb)
    maxSize: 314572800,
    // prevent drag & drop default on window
    preventWindowDefault: true,
    // file enters window
    windowEnter: function () {},
    // file leaves window
    windowLeave: function () {},
    // dropped callback
    dropped: function () {},
    // dragged files enter DropZone
    dropZoneEnter: function () {},
    // dragged files left DropZone
    dropZoneLeave: function () {},
    // reject files
    filesRejected: function () {}
};

export default class DropZone {
    constructor (options) {
        this.options = DropZone.createOptions(defaults, options);
        // TODO: test this
        this.node = window.$ && this.options.node instanceof window.$ ? this.options.node[0] : this.options.node;

        // cache methods with context
        this.handleDrop = this.handleDrop.bind(this);
        this.handleEnter = this.handleEnter.bind(this);
        this.handleLeave = this.handleLeave.bind(this);
        this.handleWindowEnter = this.handleWindowEnter.bind(this);
        this.handleWindowLeave = this.handleWindowLeave.bind(this);
        this.updateEventTracker = this.updateEventTracker.bind(this);
        this.initiate();
    }

    initiate () {
        this.eventPool = [];
        this.files = [];
        this.eventTracker = { node: {}, window: {} };
        this.size = 0;
        this.windowActive = false;
        this.dropZoneActive = false;

        this.trackEvents('dragenter dragleave');
        this.attachMultipleListeners('drag dragstart dragend dragover dragenter dragleave drop', this.preventer);
        this.registerEvents();
    }

    /**
     * Register drag & drop events
     */
    registerEvents () {
        this.addEventAndStore(this.node, 'drop', this.handleDrop);
        this.addEventAndStore(this.node, 'dragenter', this.handleEnter);
        this.addEventAndStore(this.node, 'dragleave', this.handleLeave);
        this.addEventAndStore(window, 'dragenter', this.handleWindowEnter);
        this.addEventAndStore(window, 'dragleave', this.handleWindowLeave);
    }

    /**
     * Track multiple events on the winow and DropZone
     * @param  {String} events
     */
    trackEvents (events) {
        events.split(' ').forEach(event => {
            const updateWindow = this.updateEventTracker.bind(this, 'window', event),
                updateNode = this.updateEventTracker.bind(this, 'node', event);

            // initaite event trackers with 0
            this.eventTracker.window[event] = 0;
            this.eventTracker.node[event] = 0;

            // add window events to pool and attach handler
            this.addEventToPool(window, event, updateWindow);
            this.addEventAndStore(window, event, updateWindow);
            // add DropZone node events to pool and attach handler
            this.addEventToPool(this.node, event, updateNode);
            this.addEventAndStore(this.node, event, updateNode);
        });
    }

    /**
     * Update a tracked event
     * @param  {String} id
     * @param  {String} event
     */
    updateEventTracker (id, event) {
        this.eventTracker[id][event]++;
    }

    /**
     * Handle drop event. Checks to see if we can add more files to the files store
     * @param  {Event} event
     */
    handleDrop (event) {
        const { files } = event.dataTransfer,
            dataLength = files ? files.length : 0;

        // reset active states
        this.windowActive = false;
        this.dropZoneActive = false;

        // determine if we can add files to the DropZone, exceptions are handled
        // inside canAcceptFiles
        if (this.canAcceptFiles(files)) {
            for (let index = 0; index < dataLength; index++) {
                this.files.push(this.processFile(files[index]));
            }

            this.createCallback(this.options.dropped, this.getFiles());
        }
    }

    /**
     * Determine if a file is currently on the window
     */
    fileOnWindow () {
        const { dragenter, dragleave } = this.eventTracker.window;
        return dragenter > dragleave;
    }

    /**
     * Determin eif a file is in the DropZone
     */
    fileOnDropZone () {
        const { dragenter, dragleave } = this.eventTracker.node;
        return dragenter > dragleave;
    }

    /**
     * Handle a file dragged into the window
     */
    handleWindowEnter () {
        if (this.fileOnWindow() && !this.windowActive) {
            this.createCallback(this.options.windowEnter);
            this.windowActive = true;
        }
    }

    /**
     * Handle a file being dragged off of the window
     */
    handleWindowLeave () {
        if (!this.fileOnWindow() && this.windowActive && !this.dropZoneActive) {
            this.createCallback(this.options.windowLeave);
            this.windowActive = false;
        }
    }

    /**
     * Handle drag entering the DropZone
     */
    handleEnter () {
        if (this.fileOnDropZone() && !this.dropZoneActive) {
            this.createCallback(this.options.dropZoneEnter);
            this.dropZoneActive = true;
        }
    }

    /**
     * Handle drag leaving the DropZone
     */
    handleLeave () {
        if (!this.fileOnDropZone() && this.dropZoneActive) {
            this.createCallback(this.options.dropZoneLeave);
            this.dropZoneActive = false;
        }
    }

    /**
     * Determine if the DropZone can accept files
     * @param  {FileList} files
     * @return {Boolean}
     */
    canAcceptFiles (files) {
        const newSize = [...files].reduce((total, file) => total += file.size, 0);

        if (this.getFiles().length + files.length > this.options.maxFiles) {
            this.rejectFiles(0);
            return false;
        } else if (this.size + newSize > this.options.maxSize) {
            this.rejectFiles(1);
            return false;
        } else {
            return true;
        }
    }

    /**
     * A place we can do something with a file before we add it to the store.
     * @param  {Object} file
     * @return {Object}
     */
    processFile (file) {
        this.size += file.size;
        return {
            file,
            id: _.uniqueId('DropZone_'),
            name: DropZone.getFileName(file),
            type: DropZone.getFileType(file),
            size: DropZone.getFileSize(file)
        };
    }

    /**
     * Handle a file rejection with error codes
     * - 0 = the maximum number of files has been exceeded
     * - 1 = the combined size of all files exceeds the maximum file size
     */
    rejectFiles (status) {
        let text;

        switch (status) {
            case 0:
                text = 'Maximum number of files exceeded';
                break;
            case 1:
                text = 'Maximum combined file size exceeded';
                break;
        }

        this.createCallback(this.options.filesRejected, { status, text });
    }

    /**
     * Return all files in the store
     * @return {Array}
     */
    getFiles () {
        return this.files;
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
    }

    /**
     * Check for a callback, if it exists, call it
     * @param  {Function} callback
     * @param  {Object}   data
     */
    createCallback (callback, data = null) {
        if (typeof callback === 'function') {
            callback.call(this, data);
        }
    }

    /**
     * Attach multiple events
     * @param  {String} events
     * @param  {Function} handler
     */
    attachMultipleListeners (events, handler) {
        events.split(' ').forEach(event => {
            this.addEventAndStore(this.node, event, handler);

            if (this.options.preventWindowDefault) {
                this.addEventAndStore(window, event, handler);
            }
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
     * - re-intialise default values, and event handlers
     */
    reset () {
        this.removeAllEvents();
        this.initiate();
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
        return file.type;
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
     * Merge defaults with options
     * @param  {Object} options
     * @return {Object}
     */
    static createOptions (defaults, options) {
        if (typeof Object.assign !== 'function') {
            return _.extend({}, defaults, options);
        } else {
            return Object.assign({}, defaults, options);
        }
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

module.exports = DropZone;
