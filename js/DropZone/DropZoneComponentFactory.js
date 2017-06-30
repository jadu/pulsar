import DropZoneComponent from './DropZoneComponent';
import DropZoneInstanceManager from './DropZoneInstanceManager';
import DropZoneFactory from './DropZoneFactory';
import DropZoneOptionsManager from './DropZoneOptionsManager';
import DropZoneComponentUtils from './DropZoneComponentUtils';

class DropZoneComonentFactory {
    /**
     * Create an instance of the DropZoneComponent with it's dependencies
     * @param {Element} html
     * @returns {DropZoneComponent}
     */
    static create (html) {
        return new DropZoneComponent(
            html,
            new DropZoneInstanceManager(
                html,
                DropZoneFactory,
            ),
            new DropZoneOptionsManager(
                DropZoneComponentUtils
            )
        );
    }
}

module.exports = DropZoneComonentFactory;
