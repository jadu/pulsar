'use strict';

var $ = require('jquery');

function MasterSwitchComponent(html) {

    this.$html = html;

};

MasterSwitchComponent.prototype.init = function () {

    var component = this;

    component.$container = this.$html.find('.masterswitch');

    component.$container.each(function() {

        var $this = $(this);

        this.$control = $this.find('.masterswitch-control input');
        this.$content = $this.find('.masterswitch-content');

        if (!this.$control.prop('checked')) {
            component.disableElements(this.$content);
        } else {
            component.switchOn(this.$control);
            component.enableElements(this.$content);
        }

        this.$control.on('click change', function (e, active) {
            if ($(this).prop('checked')) {
                component.switchOn(e.target);
            } else {
                component.switchOff(e.target);
            }
        });
    });
};

MasterSwitchComponent.prototype.switchOn = function (target) {

    var component = this;

    component.$target = $(target).closest('.masterswitch').find('.masterswitch-content');

    component.$target.removeClass('is-disabled');
    component.enableElements(component.$target);
};

MasterSwitchComponent.prototype.switchOff = function (target) {

    var component = this;

    component.$target = $(target).closest('.masterswitch').find('.masterswitch-content');

    component.$target.addClass('is-disabled');
    component.disableElements(component.$target);
};

MasterSwitchComponent.prototype.disableElements = function (target) {

    var component = this,
        CLICKABLES_SELECTOR = 'a:not(.is-disabled), button:not(.is-disabled), input:not(.is-disabled), select:not(.is-disabled)';

    $(target)
        .on('click', CLICKABLES_SELECTOR, preventDefault)
        .find(CLICKABLES_SELECTOR)
            .addClass('disabled')
            .attr('disabled', 'disabled');
};

MasterSwitchComponent.prototype.enableElements = function (target) {

    var component = this,
        CLICKABLES_SELECTOR = 'a:not(.is-disabled), button:not(.is-disabled), input:not(.is-disabled), select:not(.is-disabled)';

    $(target)
        .off('click', CLICKABLES_SELECTOR, preventDefault)
        .find(CLICKABLES_SELECTOR)
            .removeClass('disabled')
            .removeAttr('disabled');
};

function preventDefault(e) {
    e.preventDefault();
}

module.exports = MasterSwitchComponent;
