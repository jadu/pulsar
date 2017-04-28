export default class EventHub {
    constructor () {
        this.pool = [];
        this.tracker = {};
    }

    /**
     * Track events
     * @param {Array} events
     * @param {Array} nodes
     */
    initiateTracker (events, nodes) {
        nodes.forEach(node => {
            const updateHandler = () => {};
            const nodeName = node.id !== '' ? node.id : node.localName;

            if (this.tracker[nodeName]) {
                throw new Error('A node with that name already exists in the tracker, consider adding an ID.');
            } else {
                this.tracker[nodeName] = {};
            }

            events.forEach(event => {
                // add update tracker event to node
                this.addEvent(node, event, updateHandler);
                // start event count at zero
                this.tracker[nodeName][event] = 0;
            });
        });
    }

    /**
     * Add an event listener and store in the pool
     * @param {Element} node
     * @param {String} event
     * @param {Function} handler
     */
    addEvent (node, event, handler) {
        this.pool.push({ node, event, handler });
        node.addEventListener(event, handler);
    }

    /**
     * Attach the same handler to multiple events to a list of nodes
     * useful for preventing default on a group of events on a group of nodes
     * @param {String} events
     * @param {Array} nodes
     * @param {Function} handler
     */
    addEvents (events, nodes, handler) {
        nodes.forEach(node => events.split(' ').forEach(event => this.addEvent(node, event, handler)));
    }

    updateEventTracker () {

    }

    /**
     * Remove any events that have been attached using the hub
     */
    removeAllEvents () {
        // remove each event
        this.pool.forEach(item => {
            console.log(item.node, item.event, item.handler);
            item.node.removeEventListener(item.event, item.handler);
        });
        // empty pool
        this.pool = [];
    }
}
