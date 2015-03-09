'use strict';

var $ = require('jquery'),
	vide = require('../../../libs/vide/dist/jquery.vide.min');

function SignInComponent(html) {
	this.$html = html;
}

SignInComponent.prototype.initialize = function () {

	var component = this;

	component.$container = this.$html.find('.signin'),
	component.$signinInner = this.$html.find('.signin__inner'),
	component.$errorPane = this.$html.find('.signin-error'),
	component.$usernameField = this.$html.find('[name="username"]'),
	component.$passwordField = this.$html.find('[name="password"]'),
	component.$signInButton = this.$html.find('[name="signin-submit"]'),
	component.$resetEmailField = this.$html.find('[name="reset-email"]'),
	component.$info = this.$html.find('.signin-form .signin__info'),
	component.$hint = $('<i class="signin__hint icon-hand-right"></i>'),
	component.infoText = component.$info.text(),
	component.signInButtonValue = component.$signInButton.html(),
	component.animationEnd = 'webkitAnimationEnd oanimationend oAnimationEnd msAnimationEnd animationend';
	component.transitionEnd = 'webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend';

	// Full screen video background
	this.$html.find('body').vide('../../../images/video/galaxy.mp4');

	// Forgotten password
	this.$html.find('[href="#forgot"]').on('click', function (e) {
		e.preventDefault();

		component.$container.removeClass('signin--error');

		component.$container
			.addClass('active-reset')
			.one(component.transitionEnd, function () {
				component.$resetEmailField.focus();
			});

		$('.signin__input, .signin__submit, .signin__link', $('.signin-reset'))
			.prop('tabindex', '');
	});

	// Cancel forgotten password
	this.$html.find('[href="#signin"]').on('click', function (e) {
		e.preventDefault();
		e.stopPropagation();
		component.reset();
	});

	// Escape key resets the UI back to the login pane
	$(document).on('keyup', function (e) {
		if (e.keyCode == 27) {
			component.reset();
		};
	});

	this.$html.find('[name="signin-submit"]').on('click', function(e) {
		e.preventDefault();

		var infoText = 'Enter your username and password';

		if (!component.$usernameField.val() || !component.$passwordField.val()) {
			component.$container
				.addClass('shake')
				.one(component.animationEnd, function () {
					$(this).removeClass('shake');
				});

			if (component.$usernameField.val() && !component.$passwordField.val()) {
				infoText = 'Enter your password';
				component.$passwordField
					.focus()
					.before(component.$hint);
			} else if (!component.$usernameField.val() && component.$passwordField.val()) {
				infoText = 'Enter your username';
				component.$usernameField
					.focus()
					.before(component.$hint);
			} else {
				component.$usernameField
					.focus()
					.before(component.$hint);
			}

			component.$info.animate({
				opacity: 0
			}, 150, function() {
				$(this)
					.html(infoText)
					.animate({
						opacity: 1
					}, 150);
			});

		} else {
			// fake incorrect login
			component.loginFail();
		}

	});

};

SignInComponent.prototype.reset = function () {

	var component = this;

	component.$container
		.removeClass('signin--error')
		.find('.signin__hint').remove();

	this.$html.find('input:not([name="username"])').blur();

	$('.signin__input, .signin__submit, .signin__link', $('.signin-reset'))
		.prop('tabindex', '-1');

	if (component.$info.text() != component.infoText) {
		component.$info.animate({
			opacity: 0
		}, 150, function() {
			$(this)
				.text(component.infoText)
				.animate({
					opacity: 1
				}, 150);
		});
	}

	if (component.$signInButton.html() != component.signInButtonValue) {
		component.$signInButton.animate({
			opacity: 0
		}, 150, function() {
			$(this)
				.text(component.signInButtonValue)
				.animate({
					opacity: 1
				}, 150);
		});
	};

	component.$container
		.removeClass('active-reset')
		.one(component.transitionEnd, function () {
			component.$usernameField.focus();
		});
}

SignInComponent.prototype.loginFail = function () {

	var component = this;

	component.$container.find('.signin__hint').remove();

	if (component.$container.hasClass('signin--error')) {
		return false;
	}

	component.$container.addClass('signin--error');
	component.$usernameField.focus();

	component.$info.animate({
		opacity: 0
	}, 150, function() {
		$(this)
			.text('Your username and/or password was incorrect')
			.animate({
				opacity: 1
			}, 150);
	});

	component.$signInButton.animate({
		opacity: 0
	}, 150, function() {
		$(this)
			.html('Try Again')
			.animate({
				opacity: 1
			}, 150);
	});

	// return false here so that focus() can be correctly assigned
	return false;

}

module.exports = SignInComponent;
