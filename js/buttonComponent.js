function ButtonComponent(html) {
	this.$html = html;
};

ButtonComponent.prototype.init = function () {

	var component = this;

	component.$html.on('click', '.js-submit-disable', component.submitDisable);

	component.$html.on('click', '.js-submit-enable', function(e) {
		component.submitEnable();
	});
};

/**
 * Disable a button when clicked
 *
 * Form submit buttons use this behaviour by default to prevent accidental
 * re-submissions.
 */
ButtonComponent.prototype.submitDisable = function () {

	$(this)
		.addClass('is-disabled')
		.attr('disabled', 'disabled');
};

/**
 * Enables any button containing class="js-disable-submit is-disabled"
 *
 * Used by XHR methods to re-enable a form's actions after a success/failed call
 */
ButtonComponent.prototype.submitEnable = function () {

	var component = this;

	component.$html.find('.js-submit-disable.is-disabled')
		.removeClass('is-disabled')
		.removeAttr('disabled');
};

module.exports = ButtonComponent;
