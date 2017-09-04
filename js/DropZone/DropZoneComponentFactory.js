import DropZoneComponent from './DropZoneComponent';
import DropZoneInstanceManager from './DropZoneInstanceManager';
import DropZoneFactory from './DropZoneFactory';
import DropZoneOptionsManager from './DropZoneOptionsManager';
import DropZoneComponentUtils from './DropZoneComponentUtils';
import DropZoneComponentValidationManager from './DropZoneComponentValidationManager';
import DropZoneBodyClassManager from './DropZoneBodyClassManager';
import MimeTyper from '../libs/MimeTyper';
import DropZoneBrowseNodeFactory from './DropZoneBrowseNodeFactory';

class DropZoneComponentFactory {
    /**
     * Create an instance of the DropZoneComponent with it's dependencies
     * @param {Element} html
     * @param {String} selector
     * @returns {DropZoneComponent}
     */
    static create (html, selector) {
        const mimeTyper = new MimeTyper(),
            utilsManager = new DropZoneComponentUtils(mimeTyper);

        return new DropZoneComponent(
            html,
            selector,
            new DropZoneInstanceManager(html, DropZoneFactory, DropZoneBrowseNodeFactory),
            new DropZoneOptionsManager(utilsManager),
            utilsManager,
            new DropZoneComponentValidationManager(),
            new DropZoneBodyClassManager()
        );
    }
}

module.exports = DropZoneComponentFactory;
