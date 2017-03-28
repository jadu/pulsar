'use strict';

var $ = require('jquery');

function DisableUiComponent(html) {
    this.$html = html;
}

function preventDefaultAndStopPropagation(e) {
    e.preventDefault();
    e.stopPropagation();
}

DisableUiComponent.prototype.init = function () {
    var component = this;

    component.$container = this.$html.find('[data-disable-ui="true"]');

    component.$container.each(function() {

        var $this = $(this),
            FORM_ELEMENTS = 'button:not(.disabled), input:not(.disabled), select:not(.disabled)',
            LINK_ELEMENTS = 'a:not(.disabled)',
            LABEL_ELEMENTS = 'label';

        // // Disable form elements
        $this.find(FORM_ELEMENTS)
            .on('click', preventDefaultAndStopPropagation)
            .addClass('disabled')
            .attr('disabled', 'disabled');

        // Disable labels
        $this.find(LABEL_ELEMENTS).addClass('u-cursor-not-allowed');

        // // Disable links
        $this.find(LINK_ELEMENTS)
            .on('click', preventDefaultAndStopPropagation)
            .addClass('u-cursor-not-allowed');

        // Wrap with disabled wrapper to visually disable
        // Check if masterswitch as we don't want to add 2 overlays
        if ($this.hasClass('masterswitch')) {
            // If the master switch is enabled, wrap in disabled overlay
            if ($this.find('.form__control.toggle-switch').is(':checked')) {
                $this.wrap('<div class="u-ui-disabled"></div>');
            } else {
                // If not, only wrap the control and let the master switch add the overlay
                $this.find('.masterswitch-control').wrap('<div class="u-ui-disabled"></div>');
            }
        } else {
            $this.wrap('<div class="u-ui-disabled"></div>');
        }
    });
};

module.exports = DisableUiComponent;
