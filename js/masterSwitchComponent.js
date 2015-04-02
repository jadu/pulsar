function MasterSwitchComponent(html) {

	this.$html = html;

};

MasterSwitchComponent.prototype.init = function () {

	var component = this;

	component.$control = this.$html.find('.masterswitch-control input');
	component.$content = this.$html.find('.masterswitch-content');

	component.disableElements();

	component.$control.on('click', function(e) {
		if (component.$control.prop('checked') == true) {
			component.switchOn();
		} else {
			component.switchOff();
		}
	});

};

MasterSwitchComponent.prototype.switchOn = function () {

	var component = this;

	component.$content.removeClass('is-disabled');
	component.enableElements();
};

MasterSwitchComponent.prototype.switchOff = function () {

	var component = this;

	component.$content.addClass('is-disabled');
	component.disableElements();

};

MasterSwitchComponent.prototype.disableElements = function () {

	var component = this,
		CLICKABLES_SELECTOR = 'a, button, input, select';

	component.$content
		.on('click', CLICKABLES_SELECTOR, preventDefault)
		.find(CLICKABLES_SELECTOR)
			.addClass('disabled')
			.attr('disabled', 'disabled');

};

MasterSwitchComponent.prototype.enableElements = function () {

	var component = this,
		CLICKABLES_SELECTOR = 'a, button, input, select';

	component.$content
		.off('click', CLICKABLES_SELECTOR, preventDefault)
		.find(CLICKABLES_SELECTOR)
			.removeClass('disabled')
			.removeAttr('disabled')

};

function preventDefault(e) {
    e.preventDefault();
}

module.exports = MasterSwitchComponent;
