import _ from 'lodash';

class DropZoneCallbackManager {
    /**
     * Check for a callback, if it exists, call it
     * @param {Function} callback
     * @param {Object} instance
     * @param {Object} data
     */
    create (callback, instance, data = {}) {
        data = _.extend({}, data, { instance });

        if (typeof callback === 'function') {
            callback(data);
        }
    }
}

module.exports = DropZoneCallbackManager;
