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
        const $select2 = $root.find('.js-select2');
        const $tempFormWrapper = $root
            .wrap('<form></form>').closest('form');

        $tempFormWrapper.trigger('reset');
        $root.unwrap($tempFormWrapper);

        // Trigger a change for select2 enabled inputs
        if ($select2.length) {
            $select2.each((index, element) => {
                $(element).change();
            });
        }
    }
}

module.exports = FormFieldResetService;
