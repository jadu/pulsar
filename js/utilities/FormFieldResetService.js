const $ = require('jquery');

class FormFieldResetService {
    /**
     * A "catch-all" method for resetting form fields
     * wrap the root element in a form and trigger a reset event
     * this should catch a lot of inconsistency with IE & file inputs
     * @param root
     */
    reset (root) {
        const $root = $(root);
        const $tempFormWrapper = $root
            .wrap('<form></form>').closest('form');

        $tempFormWrapper.trigger('reset');
        $root.unwrap($tempFormWrapper);
    }
}

module.exports = FormFieldResetService;
