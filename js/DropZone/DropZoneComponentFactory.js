import DropZoneComponent from './DropZoneComponent';
import DropZoneInstanceManager from './DropZoneInstanceManager';
import DropZoneFactory from './DropZoneFactory';
import DropZoneOptionsManager from './DropZoneOptionsManager';
import DropZoneComponentUtils from './DropZoneComponentUtils';
import DropZoneComponentValidationManager from './DropZoneComponentValidationManager';
import DropZoneBodyClassManager from './DropZoneBodyClassManager';
import MimeTyper from '../libs/MimeTyper';

class DropZoneComonentFactory {
    /**
     * Create an instance of the DropZoneComponent with it's dependencies
     * @param {Element} html
     * @param {String} selector
     * @returns {DropZoneComponent}
     */
    static create (html, selector) {
        return new DropZoneComponent(
            html,
            selector,
            new DropZoneInstanceManager(
                html,
                DropZoneFactory
            ),
            new DropZoneOptionsManager(
                new DropZoneComponentUtils(
                    new MimeTyper()
                )
            ),
            new DropZoneComponentUtils(
                new DropZoneComponentUtils(
                    new MimeTyper()
                )
            ),
            new DropZoneComponentValidationManager(),
            new DropZoneBodyClassManager()
        );
    }
}

module.exports = DropZoneComonentFactory;
