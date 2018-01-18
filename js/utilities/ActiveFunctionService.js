const $ = require('jquery');

class ActiveFunctionService {
    constructor ({
        disabled = 'disabled'
    } = {}) {
        this.disabled = disabled;
    }

    /**
     * Conditionally invoke a function if an element is active
     * @param element
     * @param func
     * @param event
     */
    wrap (element, func, event) {
        if (!$(element).hasClass(this.disabled)) {
            func(event);
        }
    }
}

module.exports = ActiveFunctionService;
