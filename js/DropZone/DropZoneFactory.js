import DropZoneValidationUtils from './DropZoneValidationUtils';
import DropZoneErrors from './DropZoneErrors';
import DropZoneValidatorDisatcher from './DropZoneValidatorDispatcher';
import DropZoneEventManager from './DropZoneEventManager';
import DropZoneIdleTimer from './DropZoneIdleTimer';
import DropZoneFileManager from './DropZoneFileManager';
import DropZoneFileUtils from './DropZoneFileUtils';
import DropZoneCallbackManager from './DropZoneCallbackManager';
import DropZone from './DropZone';

class DropZoneFactory {
    /**
     * Create an instance of a DropZone with it's options and dependencies
     * @param {Element} node
     * @param {Object} options
     * @param {Object} errorOptions
     * @returns {DropZone}
     */
    static create (node, options, errorOptions) {
        return new DropZone(
            node,
            options,
            new DropZoneValidatorDisatcher(
                new DropZoneValidationUtils(),
                new DropZoneErrors(errorOptions.validationText),
                errorOptions.whitelist,
                errorOptions.maxFiles,
                errorOptions.maxSize
            ),
            new DropZoneEventManager(),
            new DropZoneIdleTimer(options.idleTimerDuration),
            new DropZoneFileManager(new DropZoneFileUtils()),
            new DropZoneCallbackManager()
        );
    }
}

module.exports = DropZoneFactory;
