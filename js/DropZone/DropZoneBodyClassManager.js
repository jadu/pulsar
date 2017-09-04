class DropZoneBodyClassManager {
    /**
     * Update body dropZone class state
     * @param {Element} body
     * @param {Array} classNames
     */
    update (body, classNames = []) {
        const cleanBodyClass = body.className.replace(/dropzone-[a-zA-Z0-9\-]+/g, '').trim();

        body.className = classNames.length ? `${cleanBodyClass} ${classNames.join(' ')}` : cleanBodyClass;
    }
}

module.exports = DropZoneBodyClassManager;
