'use strict';

const $ = require('jquery');

class ModalListener {

    /**
     * ModalListener
     * @constructor
     * @param {jQuery} $html - jQuery wrapper of the html node
     */
    constructor (modalFocusService) {
        this.modalFocusService = modalFocusService;
    }

    /**
     * Listen for modals being shown or hidden
     * @param {jQuery} $container
     */
    listen ($container) {
        let $triggeringElement;

        // Hook modal-triggering elements
        $container.find('[data-toggle="modal"]').on('click', (event) => {
            const $modalTrigger = $(event.target);

            if (!$modalTrigger.hasClass('disabled')) {
                $triggeringElement = $modalTrigger;
                event.preventDefault();
            }
        });

        $container.on('shown.bs.modal', (data) => {
            const $modal = $(data.target);
            this.modalFocusService.trapFocus($modal, $container);
        });

        $container.on('hidden.bs.modal', () => {
            // Check if click came from a [data-modal] link
            if (typeof $triggeringElement !== 'undefined') {
                this.modalFocusService.releaseFocus($triggeringElement);
            }
        });
    }
}

module.exports = ModalListener;
