'use strict';

var $ = require('jquery');

function MasterSwitchComponent(html, disableUi) {
    this.$html = html,
    this.disableUi = disableUi;
};

MasterSwitchComponent.prototype.init = function () {
    var component = this;

    component.$container = this.$html.find('.masterswitch');

    component.$container.each(function() {
        var $this = $(this);

        this.$control = $this.find('.masterswitch-control input');
        this.$content = $this.find('.masterswitch-content');

        if (!this.$control.prop('checked')) {
            component.switchOff(this.$control);
        } else {
            component.switchOn(this.$control);
        }

        this.$control.on('change', function (e) {
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
    component.disableUi.enable(component.$target);
};

MasterSwitchComponent.prototype.switchOff = function (target) {
    var component = this;

    component.$target = $(target).closest('.masterswitch').find('.masterswitch-content');

    component.$target.addClass('is-disabled');
    component.disableUi.disable(component.$target);
};

module.exports = MasterSwitchComponent;
