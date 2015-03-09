'use strict';

var $ = require('jquery'),
	SignInComponent = require('../../js/area/signin/signin');

describe('Sign-in module', function() {

	beforeEach(function() {
		this.$html = $('<html></html>');
		this.$body = $('<body></body').appendTo(this.$html);
		this.$module = $(
			'\
<div class="signin">\
	<div class="signin__inner">\
		<form class="signin__panel signin-form">\
			<span class="signin__info">Site Name</span>\
			<input class="signin__input" name="username" type="text" placeholder="username" autofocus />\
\
			<div class="signin__group">\
				<input class="signin__input" name="password" type="password" placeholder="password" />\
			</div>\
\
			<div class="signin__actions">\
				<button class="btn btn--primary signin__submit" name="signin-submit" type="submit">Sign In</button>\
			</div>\
\
			<a class="signin__link" href="#forgot">Forgotten password?</a>\
		</form>\
\
		<form class="signin__panel signin-reset">\
			<i class="icon-envelope-alt signin__icon"></i>\
			<span class="signin__help">Enter the email address you use for your Jadu account and we’ll send you a link to reset your password</span>\
			<input class="signin__input" name="reset-email" type="text" placeholder="Email address" tabindex="-1" />\
			<div class="signin__actions">\
				<button class="btn btn--primary signin__submit" name="reset-submit" type="submit" tabindex="-1">Email Me</button>\
			</div>\
			<a class="signin__link" href="#" tabindex="-1">Don’t know your email address?</a><br />\
			<a class="signin__link" href="#signin" tabindex="-1">Cancel</a>\
		</form>\
	</div>\
</div>').appendTo(this.$html);

		$.fn.vide = sinon.stub().returnsThis();

		this.$container = this.$html.find('.signin');
		this.$signInPane = this.$html.find('.signin-form');
		this.$innerPane = this.$html.find('.signin__inner');
		this.$forgotLink = this.$html.find('[href="#forgot"]');
		this.$signInLink = this.$html.find('[href="#signin"]');
		this.$usernameField = this.$html.find('[name="username"]');
		this.$passwordField = this.$html.find('[name="password"]');
		this.$emailField = this.$html.find('[name="reset-email"]');
		this.$signInButton = this.$html.find('[name="signin-submit"]');
		this.$info = this.$html.find('.signin-form .signin__info'),

		this.signIn = new SignInComponent(this.$html);

	});

	afterEach(function () {
		delete $.fn.vide;
	});

	describe('the default state of the sign in dialog', function() {

		beforeEach(function() {
			sinon.spy($.fn, 'focus');
			this.signIn.initialize();
		});

		afterEach(function () {
			$.fn.focus.restore();
		});

		it('should call the Vide plugin once', function () {
			expect($.fn.vide).to.have.been.calledOnce;
		});

		it('should call the Vide plugin on the body element', function () {
			expect($.fn.vide).to.have.been.calledOn(sinon.match(function ($collection) {
				return $($collection).is(this.$html.find('body'));
			}.bind(this)));
		});

		it('should have the autofocus property on the username field', function() {
			expect(this.$usernameField.prop('autofocus')).to.be.true;
		});

		it('not allow elements in the reset pane to be tabbed to', function() {
			expect(this.$emailField.prop('tabindex')).to.equal(-1);
		});
	});

	describe('clicking the forgotten password link', function() {

		beforeEach(function() {
			sinon.spy($.fn, 'focus');
			this.signIn.initialize();
			this.$forgotLink.click();
		});

		afterEach(function () {
			$.fn.focus.restore();
		});

		it('should not focus anything before transition', function() {
			expect($.fn.focus).not.to.have.been.called;
		});

		it('should add the active-reset class to the container', function() {
			expect(this.$container.hasClass('active-reset')).to.be.true;
		});

		it('should not autofocus the email address field before transition', function() {
			expect(this.$emailField.prop('autofocus')).to.be.false;
		});

		it('should focus something after transition', function() {
			this.$innerPane.trigger('transitionend');
			expect($.fn.focus).to.have.been.calledOnce;
		});

		it('should focus the email address field after transition', function() {
			this.$innerPane.trigger('transitionend');
			expect($.fn.focus).to.have.been.calledOn(sinon.match(function ($collection) {
				return $($collection).is(this.$emailField);
			}.bind(this)));
		});

		it('should not have any incomplete field hints', function() {
			this.$innerPane.trigger('transitionend');
			expect(this.$html.find('.signin__hint').length).to.equal(0);
		});
	});

	describe('resetting the UI state', function() {

		beforeEach(function() {
			sinon.spy($.fn, 'focus');
			this.signIn.initialize();
		});

		afterEach(function () {
			$.fn.focus.restore();
		});

		it('should not have any incomplete field hints', function() {
			this.$signInButton.click();
			this.$innerPane.trigger('transitionend');
			this.$forgotLink.click();
			this.$innerPane.trigger('transitionend');
			this.signIn.reset();
			expect(this.$html.find('.signin__hint').length).to.equal(0);
		});

	});

	describe('clicking the cancel link on the forgotten password pane', function() {

		beforeEach(function() {
			sinon.spy($.fn, 'focus');
			this.signIn.initialize();
			this.$forgotLink.click();
		});

		afterEach(function () {
			$.fn.focus.restore();
		});

		it('should only have the default class on the container', function() {
			this.$signInLink.click();
			this.$innerPane.trigger('transitionend');
			expect(this.$container.attr('class')).to.equal('signin');
		});

		it('should focus the username field after transition', function() {
			this.$signInLink.click();
			this.$innerPane.trigger('transitionend');
			expect($.fn.focus).to.have.been.calledOn(sinon.match(function ($collection) {
				return $($collection).is(this.$usernameField);
			}.bind(this)));
		});
	});

	describe('pressing escape on the forgotten password pane', function() {

		beforeEach(function() {
			sinon.spy($.fn, 'focus');
			this.signIn.initialize();
			this.$forgotLink.click();
		});

		afterEach(function () {
			$.fn.focus.restore();
		});

		it('should cause the inner pane to only have the default class', function() {
			this.$innerPane.trigger('transitionend');

			var keyupEvent = $.Event('keyup', { keyCode: 27 });
			$(document).trigger(keyupEvent);

			this.$innerPane.trigger('transitionend');

			expect(this.$innerPane.attr('class')).to.equal('signin__inner');
		});
	});

	describe('attempting to reset my password without providing an email address', function() {
		//TODO
	});

	describe('attempting to sign in with no details', function() {

		beforeEach(function() {
			sinon.spy($.fn, 'focus');
			this.signIn.initialize();
			this.$signInButton.click();
		});

		afterEach(function () {
			$.fn.focus.restore();
		});

		it('should add the shake class to the main container', function() {
			expect(this.$container.hasClass('shake')).to.be.true;
		});

		it('should remove the shake class after the animation completes', function() {
			this.$innerPane.trigger('animationend');
			expect(this.$container.hasClass('shake')).to.be.false;
		});

		it('should replace the info string with details of what went wrong', function() {
			this.$info.finish();
			expect(this.$info.text()).to.equal('Enter your username and password');
		});

		it('should focus the username field', function() {
			this.$innerPane.trigger('animationend');
			expect($.fn.focus).to.have.been.calledOn(sinon.match(function ($collection) {
				return $($collection).is(this.$usernameField);
			}.bind(this)));
		});
	});


	describe('attempting to sign in a username, but no password', function() {

		beforeEach(function() {
			sinon.spy($.fn, 'focus');
			this.signIn.initialize();
			this.$usernameField.val('username');
			this.$signInButton.click();
		});

		afterEach(function () {
			$.fn.focus.restore();
		});

		it('should add the shake class to the main container', function() {
			expect(this.$container.hasClass('shake')).to.be.true;
		});

		it('should remove the shake class after the animation completes', function() {
			this.$innerPane.trigger('animationend');
			expect(this.$container.hasClass('shake')).to.be.false;
		});

		it('should replace the info string with details of what went wrong', function() {
			this.$info.finish();
			expect(this.$info.text()).to.equal('Enter your password');
		});

		it('should focus the password field', function() {
			this.$innerPane.trigger('animationend');
			expect($.fn.focus).to.have.been.calledOn(sinon.match(function ($collection) {
				return $($collection).is(this.$passwordField);
			}.bind(this)));
		});
	});

	describe('attempting to sign in with a password, but no username', function() {

		beforeEach(function() {
			sinon.spy($.fn, 'focus');
			this.signIn.initialize();
			this.$passwordField.val('password');
			this.$signInButton.click();
		});

		afterEach(function () {
			$.fn.focus.restore();
		});

		it('should add the shake class to the main container', function() {
			expect(this.$container.hasClass('shake')).to.be.true;
		});

		it('should remove the shake class after the animation completes', function() {
			this.$innerPane.trigger('animationend');
			expect(this.$container.hasClass('shake')).to.be.false;
		});

		it('should replace the info string with details of what went wrong', function() {
			this.$info.finish();
			expect(this.$info.text()).to.equal('Enter your username');
		});

		it('should focus the username field', function() {
			this.$innerPane.trigger('animationend');
			expect($.fn.focus).to.have.been.calledOn(sinon.match(function ($collection) {
				return $($collection).is(this.$usernameField);
			}.bind(this)));
		});
	});

	describe('an invalid login', function() {

		beforeEach(function() {
			sinon.spy($.fn, 'focus');
			this.signIn.initialize();
			this.signIn.loginFail();
		});

		afterEach(function () {
			$.fn.focus.restore();
		});

		it('should add the ‘signin-error’ class to the container', function() {
			expect(this.$container.hasClass('signin--error')).to.be.true;
		});

		it('should replace the info string with details of what went wrong', function() {
			this.$info.finish();
			expect(this.$info.text()).to.equal('Your username and/or password was incorrect');
		});

		it('should replace the sign-in button value with ‘Try Again’', function() {
			this.$signInButton.finish();
			expect(this.$signInButton.html()).to.equal('Try Again');
		});

		it('should focus the username field', function() {
			expect($.fn.focus).to.have.been.calledOn(sinon.match(function ($collection) {
				return $($collection).is(this.$usernameField);
			}.bind(this)));
		});
	});

	describe('pressing escape after an invalid login', function() {

		beforeEach(function() {
			sinon.spy($.fn, 'focus');
			this.signIn.initialize();
			this.signIn.loginFail();
			this.$container.finish();

			var keyupEvent = $.Event('keyup', { keyCode: 27 });
			$(document).trigger(keyupEvent);

			this.$container.finish();
		});

		afterEach(function () {
			$.fn.focus.restore();
		});

		it('should cause the container to only have the default class', function() {
			expect(this.$container.attr('class')).to.equal('signin');
		});

		it('should replace the original value of the info string', function() {
			expect(this.$info.text()).to.equal('Site Name');
		});

		it('should focus the username field', function() {
			expect($.fn.focus).to.have.been.calledOn(sinon.match(function ($collection) {
				return $($collection).is(this.$usernameField);
			}.bind(this)));
		});
	});
});
