import DropZoneValidationUtils from './DropZoneValidationUtils';
import DropZoneErrors from './DropZoneErrors';
import DropZoneValidator from './DropZoneValidator';
import DropZone from './DropZone';

class DropZoneFactory {
    /**
     * Create an instance of a DropZone with it's options and dependencies
     * @param {Element} node
     * @param {Object} options
     * @returns {DropZone}
     */
    static create (node, options, errorOptions) {
        return new DropZone(
            node,
            options,
            new DropZoneValidator(
                new DropZoneValidationUtils(),
                new DropZoneErrors(errorOptions),
                options.whitelist,
                options.maxFiles,
                options.maxSize
            )
        );
    }
}

module.exports = DropZoneFactory;
