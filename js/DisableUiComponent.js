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

    component.disable(component.$html.find('[data-disable-ui="true"]'));
};

DisableUiComponent.prototype.disable = function (target) {
    var FORM_ELEMENTS = 'button:not(.disabled), input:not(.disabled), select:not(.disabled)',
        LINK_ELEMENTS = 'a:not(.disabled)',
        LABEL_ELEMENTS = 'label';

    target.each(function() {
        var $this = $(this);

        // Disable form elements
        $this.find(FORM_ELEMENTS)
            .on('click', preventDefaultAndStopPropagation)
            .addClass('disabled')
            .prop('disabled', true);

        // Disable labels
        $this.find(LABEL_ELEMENTS).addClass('u-cursor-not-allowed');

        // Disable links (uses .js-disable as any existing disabled)
        $this.find(LINK_ELEMENTS)
            .on('click', preventDefaultAndStopPropagation)
            .addClass('js-disabled u-cursor-not-allowed')
            .prop('aria-disabled', 'true');

        // Wrap with disabled wrapper to visually disable
        $this.wrap('<div class="u-ui-disabled" aria-disabled="true"></div>');
    });
};

DisableUiComponent.prototype.enable = function (target) {
    var FORM_ELEMENTS = 'button.disabled, input.disabled, select.disabled',
        LINK_ELEMENTS = 'a.js-disabled',
        LABEL_ELEMENTS = 'label';

    target.each(function() {
        var $this = $(this);

        // Remove attribute used to disable a UI on load
        $this.removeAttr('data-disable-ui aria-disabled');

        // Enable form elements
        $this.find(FORM_ELEMENTS)
            .off('click', preventDefaultAndStopPropagation)
            .removeClass('disabled')
            .prop('disabled', false);

        // Enable labels
        $this.find(LABEL_ELEMENTS).removeClass('u-cursor-not-allowed');

        // Enable links
        $this.find(LINK_ELEMENTS)
            .off('click', preventDefaultAndStopPropagation)
            .removeClass('js-disabled u-cursor-not-allowed')
            .removeProp('aria-disabled');

        // Remove wrapper which provides visually disabled styling
        if ($this.parent().hasClass('u-ui-disabled')) {
            $this.unwrap();
        }
    });
};

module.exports = DisableUiComponent;
