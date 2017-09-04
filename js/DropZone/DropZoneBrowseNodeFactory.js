import DropZoneBrowseNodeManager from './DropZoneBrowseNodeManager';

class DropZoneBrowseNodeFactory {
    /**
     * Create a Browse Node manager instance
     * @param {Element} node
     * @returns {DropZoneBrowseNodeManager}
     */
    static create (node) {
        return new DropZoneBrowseNodeManager(node);
    }
}

module.exports = DropZoneBrowseNodeFactory;
