'use strict';

var $ = require('jquery'),
	toggles = require('../libs/jquery-toggles/toggles.min');

function MasterSwitchComponent(html) {
	this.$html = html;
};

MasterSwitchComponent.prototype.init = function () {

	var component = this;

	component.$container = this.$html.find('.masterswitch');

	component.$container.each(function() {

		var $this = $(this);

		masterswitch.$control = $this.find('.masterswitch-control input');
		masterswitch.$content = $this.find('.masterswitch-content');
		masterswitch.$toggle = $this.find('.toggle');

		masterswitch.$toggle.toggles({
			checkbox: masterswitch.$control,
			on: masterswitch.$control.prop('checked'),
			text: {
				on: '',
				off: ''
			}
		});

		if (!masterswitch.$control.prop('checked')) {
			component.disableElements(component.$container);
		} else {
			component.switchOn(masterswitch.$control);
		}

		masterswitch.$toggle.on('toggle', function (e, active) {
			if (active) {
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
		CLICKABLES_SELECTOR = 'a, button, input, select';

	$(target)
		.on('click', CLICKABLES_SELECTOR, preventDefault)
		.find(CLICKABLES_SELECTOR)
			.addClass('disabled')
			.attr('disabled', 'disabled');

};

MasterSwitchComponent.prototype.enableElements = function (target) {

	var component = this,
		CLICKABLES_SELECTOR = 'a, button, input, select';

	$(target)
		.off('click', CLICKABLES_SELECTOR, preventDefault)
		.find(CLICKABLES_SELECTOR)
			.removeClass('disabled')
			.removeAttr('disabled')

};

function preventDefault(e) {
    e.preventDefault();
}

module.exports = MasterSwitchComponent;
