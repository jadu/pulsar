class DropZoneIdleTimer {
    /**
     * DropZoneIdleTimer
     * @param {number} duration
     */
    constructor (duration) {
        this.timer = null;
        this.duration = duration;
    }

    /**
     * Start timer
     * @param {Function} callback
     */
    start (callback) {
        this.timer = setTimeout(() => {
            // clear reference to timeout
            this.timer = null;
            // invoke callback
            callback();
        }, this.duration);
    }

    /**
     * Clear current timeout
     */
    clear () {
        if (this.timer !== null) {
            clearTimeout(this.timer);
        }
    }
}

module.exports = DropZoneIdleTimer;
