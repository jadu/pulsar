var $ = require('jquery'),
	placeholder = require('jquery-placeholder/jquery.placeholder'),
	vide = require('vide/dist/jquery.vide.min');

function SignInComponent(html) {
	this.$html = html;
}

SignInComponent.prototype.init = function () {

	var component = this;

	component.$container = this.$html.find('.signin'),
	component.$signinInner = this.$html.find('.signin__inner'),

	component.$errorPane = this.$html.find('.signin-error'),
	component.$signInPane = this.$html.find('.signin-form'),
	component.$resetPane = this.$html.find('.signin-reset'),
	component.$twoStepPane = this.$html.find('.signin-twostep'),

	component.$usernameField = this.$html.find('[name="username"]'),
	component.$passwordField = this.$html.find('[name="password"]'),
	component.$signInButton = this.$html.find('[name="signin-submit"]'),
	component.$signInTwoStep = this.$html.find('[name="signin-twostep"]'),
	component.$resetEmailField = this.$html.find('[name="reset-email"]'),
	component.$resetSubmit = this.$html.find('[name="reset-submit"]'),
	component.$twoStepOne = this.$html.find('[name="twoStepOne"]'),
	component.$twoStepTwo = this.$html.find('[name="twoStepTwo"]'),

	component.$info = this.$html.find('.signin-form .signin__info'),
	component.$twoStepInfo = this.$html.find('.signin-twostep .signin__info'),

	component.$alert = $('.alert');
	component.successMessage = 'Signed in successfully';
	component.signInFailMessage = 'Your username and/or password was incorrect';

	component.hint = '<i class="signin__hint"></i>',
	component.infoText = component.$info.text(),
	component.signInButtonValue = component.$signInButton.html(),
	component.animationEnd = 'webkitAnimationEnd oanimationend oAnimationEnd msAnimationEnd animationend';
	component.transitionEnd = 'webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend',
	component.twoStepAttempt = 0;

	// Polyfill placeholder behaviour in oldIE
	this.$html.find('input').placeholder();

	// Forgotten password
	this.$html.find('[href="#forgot-password"]').on('click', function (e) {
		e.preventDefault();

		component.switchPanel('.signin-reset');

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

	// Forgotten username
	this.$html.find('[href="#forgot-username"]').on('click', function (e) {
		e.preventDefault();

		component.switchPanel('.signin-forgot');

		component.$container.removeClass('signin--error');

		component.$container
			.addClass('active-forgot')
			.one(component.transitionEnd, function () {
				component.$resetEmailField.focus();
			});

		$('.signin__input, .signin__submit, .signin__link', $('.signin-reset'))
			.prop('tabindex', '');
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

				component.$passwordField.focus();

				if (!component.$passwordField.prev('.signin__hint').length) {

					component.$passwordField
						.before(component.hint)
						.on('keyup', function() {
							if ($(this).val().length > 0) {
								$(this).prev('.signin__hint').fadeOut(150);
							} else {
								$(this).prev('.signin__hint').fadeIn(150);
							}
						});
				};
			} else if (!component.$usernameField.val() && component.$passwordField.val()) {
				infoText = 'Enter your username';
				component.$usernameField.focus();

				if (!component.$usernameField.prev('.signin__hint').length) {
					component.$usernameField.before(component.hint)
						.on('keyup', function() {
							if ($(this).val().length > 0) {
								$(this).prev('.signin__hint').fadeOut(150);
							} else {
								$(this).prev('.signin__hint').fadeIn(150);
							}
						});
				};
			} else {
				component.$usernameField.focus();

				if (!component.$usernameField.prev('.signin__hint').length) {
					component.$usernameField.before(component.hint)
						.on('keyup', function() {
							if ($(this).val().length > 0) {
								$(this).prev('.signin__hint').fadeOut(150);
							} else {
								$(this).prev('.signin__hint').fadeIn(150);
							}
						});
				};
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

			// PRETEND WE'VE AUTHED AND GO TO 2FA SCREEN
			component.twoStep();
		}

	});

	this.$html.find('[name="reset-submit"]').on('click', function(e) {
		e.preventDefault();

		if (!component.$resetEmailField.val()) {

			component.$container
				.addClass('shake')
				.one(component.animationEnd, function () {
					$(this).removeClass('shake');
				});

			component.$resetEmailField
				.focus()
				.before(component.hint)
				.on('keyup', function() {
					if ($(this).val().length > 0) {
						$(this).prev('.signin__hint').fadeOut(150);
					} else {
						$(this).prev('.signin__hint').fadeIn(150);
					}
				});
		}
	});

};


SignInComponent.prototype.reset = function () {

	var component = this;

	component.switchPanel('.signin-form');

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
		.removeClass('active-reset active-forgot active-twostep')
		.one(component.transitionEnd, function () {
			component.$usernameField.focus();
		});
}

SignInComponent.prototype.signinFail = function () {

	var component = this;

	component.$container.find('.signin__hint').remove();

	component.$info.animate({
		opacity: 0
	}, 150, function() {
		$(this)
			.html('')
			.append(component.signInFailMessage)
			.animate({
				opacity: 1
			}, 150);
	});

	if (component.$container.hasClass('signin--error')) {
		return false;
	}

	component.$container.addClass('signin--error');
	component.$usernameField.focus();

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

SignInComponent.prototype.switchPanel = function (panelClass) {

	var component = this,
		newPanel = component.$container.find(panelClass),
		oldPanel = component.$container.find('.signin__panel:not(' + panelClass + ')'),
		tabIndex = 1;

	component.$container.removeClass('signin--error');

	// This panel
	newPanel
		.attr('aria-hidden', 'false')
		.find('[tabindex]')
		.removeAttr('disabled')
		.each(function() {
			$(this).attr('tabindex', tabIndex);
			tabIndex++;
		});

	// Other panels
	oldPanel
		.attr('aria-hidden', 'true')
		.find('[tabindex]')
		.attr('disabled', 'disabled')
		.each(function() {
			$(this).attr('tabindex', '-1');
		});


}

SignInComponent.prototype.twoStep = function() {

	var component = this;

	component.switchPanel('.signin-twostep');

	component.$container
		.addClass('active-twostep')
		.one(component.transitionEnd, function () {
			component.$twoStepOne.focus();
		});

	component.$twoStepOne.on('keyup', function () {
		var $stepOneField = $(this);

		if ($stepOneField.val().length === parseInt($stepOneField.attr('maxlength'))) {
			component.$twoStepTwo.focus();
		}
	});

	component.$twoStepTwo.on('keyup', function () {
		if($(this).val().length === 0) {
			component.$twoStepOne.focus();
		}
	});

	this.$html.find('[name="signin-twostep"]').on('click', function(e) {
		e.preventDefault();

		if (!component.$twoStepOne.val() || !component.$twoStepTwo.val()) {

			component.$container
				.addClass('shake')
				.one(component.animationEnd, function () {
					$(this).removeClass('shake');
				});

			// replace contents of info element so screenreader announces it
			var twoStepInfo = component.$twoStepPane.find('.signin__info').html();
			component.$twoStepInfo
				.html('')
				.append(twoStepInfo);
		}

		if (component.$twoStepOne.val().length < 3) {

			component.$twoStepOne.focus();

			if (!component.$twoStepOne.prev('.signin__hint').length) {
				component.$twoStepOne
					.before(component.hint)
					.on('keyup', function() {
						if ($(this).val().length > 0) {
							$(this).prev('.signin__hint').fadeOut(150);
						} else {
							$(this).prev('.signin__hint').fadeIn(150);
						}
					});
			};
		}
		else if (component.$twoStepOne.val().length == 3 && component.$twoStepTwo.val().length < 3) {

			component.$twoStepTwo.focus();

			if (!component.$twoStepTwo.next('.signin__hint').length) {

				component.$twoStepTwo
					.after(component.hint)
					.on('keyup', function() {
						if ($(this).val().length > 0) {
							$(this).prev('.signin__hint').fadeOut(150);
						} else {
							$(this).prev('.signin__hint').fadeIn(150);
						}
					});
			};
		}
		else {
			component.success();
		}

	});


};

SignInComponent.prototype.twoStepFail = function() {

	var component = this;

	if (component.twoStepAttempt >= 1) {
		component.$twoStepInfo.animate({
			opacity: 0
		}, 150, function() {
			$(this)
				.html('<i class="icon-question-sign"></i> Having trouble?<br />check our <a href="#">two-step help page</a>')
				.animate({
					opacity: 1
				}, 150);
		});
	};

	if (!component.$container.hasClass('signin--error')) {
		component.$container.addClass('signin--error');
		component.$twoStepOne.focus();

		component.$signInTwoStep.animate({
			opacity: 0
		}, 150, function() {
			$(this)
				.html('Try Again')
				.animate({
					opacity: 1
				}, 150);
		});
	}

	component.twoStepAttempt++;

};


SignInComponent.prototype.success = function () {

	var component = this;

	component.$alert.append(document.createTextNode(component.successMessage));
	component.$container.addClass('active-success');

}

module.exports = SignInComponent;
