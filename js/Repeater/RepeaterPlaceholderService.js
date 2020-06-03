const $ = require("jquery");

class RepeaterPlaceholderService {
    /**
     * Repeater placeholder service
     * @param {HTMLElement} root
     */
    constructor (
        root
    ) {
        this.$root = $(root);
        this.$placeholder = this.$root.find('[data-repeater-preview-placeholder]');
    }

    /**
     * Prepend the preview empty placeholder
     */
    add () {
        this.$root.find('[data-repeater-preview-root]')
            .prepend(this.$placeholder);
    }

    /**
     * Remove preview placeholder and update reference
     */
    remove () {
        const $placeholder = this.$root
            .find('[data-repeater-preview-placeholder]');

        // If there is no placeholder, move along
        if ($placeholder.length === 0) {
            return;
        }

        this.$placeholder = $placeholder.clone();
        $placeholder.remove();
    }
}

module.exports = RepeaterPlaceholderService;
