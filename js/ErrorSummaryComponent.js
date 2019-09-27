'use strict';

class ErrorSummaryComponent {

    /**
     * Initialise
     * @param {jQuery} $html - jQuery wrapper of the html node
     */
    init ($html) {
        let $errorSummary;

        if (typeof $html === 'undefined' || !$html.length) {
            throw new Error('$html must be passed to ErrorSummaryComponent init()');
        }

        $errorSummary = $html.find('[data-error-summary]');

        if (!$errorSummary.length) {
            return;
        }

        if ($errorSummary.length > 1) {
            throw new Error('Only one error summary may be present on a page');
        }

        $errorSummary.focus();
    }
}

module.exports = ErrorSummaryComponent;
