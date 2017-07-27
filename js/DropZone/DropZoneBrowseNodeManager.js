class DropZoneBrowseNodeManager {
    constructor (node) {
        this.node = node;
        this.events = [];
        // We always want to prevent default whether the node is enabled or not
        if (node) {
            this.node.addEventListener('click', event => {
                event.preventDefault();
            });
        }
    }

    /**
     * Update node reference
     * @param {Element} node
     */
    update (node) {
        this.node = node;
        this.node.addEventListener('click', event => {
            event.preventDefault();
        });
    }

    /**
     * Return node
     * @returns {Element}
     */
    getNode () {
        return this.node;
    }

    /**
     * Add an event listener to node
     * @param {String} event
     * @param {Function} handler
     */
    addEvent (event, handler) {
        this.events.push({ event, handler, active: true });
        this.node.addEventListener(event, handler);
    }

    /**
     * Remove attached events
     */
    disableEvents () {
        this.events = this.events.map(event => {
            this.node.removeEventListener(event.event, event.handler);
            return { event: event.event, handler: event.handler, active: false };
        });
    }

    /**
     * Re-attach events
     */
    enableEvents () {
        this.events = this.events.map(event => {
            this.node.addEventListener(event.event, event.handler);
            return { event: event.event, handler: event.handler, active: true };
        });
    }
}

module.exports = DropZoneBrowseNodeManager;
