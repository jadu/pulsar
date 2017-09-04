class DropZoneComponentValidation {
    /**
     * Remove validation node
     * @param {Element} node
     * @param {String} selector
     */
    clear (node, selector) {
        const validation = node.querySelector(`.${selector}`);

        if (validation) {
            validation.parentNode.removeChild(validation);
        }
    }

    /**
     * Update validation node
     * @param {String} error
     * @param {Element} node
     * @param {Element} info
     * @param {String} validationClass
     * @param {String} errorClass
     * @param {boolean} passive
     */
    update (error, node, info, validationClass, errorClass, passive) {
        let validation = node.querySelector(`.${validationClass}`);

        // if we are in passive mode we're handing this over to the developer installing the plugin
        // they can access validation data by using the filesRejected callback
        if (passive) {
            return;
        }

        const errorNode = `<p class="${errorClass}">${error}</p>`;

        // if a validation element doesn't exist, create one
        if (!validation) {
            validation = document.createElement('div');
            validation.className = validationClass;
            info.parentNode.insertBefore(validation, info);
        }

        // create error message and update validation
        validation.innerHTML = errorNode;
    }
}

module.exports = DropZoneComponentValidation;
