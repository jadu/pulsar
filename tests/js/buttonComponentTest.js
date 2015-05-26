'use strict'

var $ = require('jquery'),
	ButtonComponent = require('../../js/ButtonComponent');

describe('Button component', function() {

	beforeEach(function() {
		this.$html = $('<html></html>');
		this.$body = $('<body></body>').appendTo(this.$html);
		this.$code = $('\
			<input type="submit" class="js-submit-disable" value="disable me">\
			<input type="submit" class="js-submit-disable is-disabled" disabled="disabled" value="disabled">\
			<button class="js-submit-enable">enable me</button>\
').appendTo(this.$html);

		this.$submitDisable = this.$html.find('.js-submit-disable:not(.is-disabled)');
		this.$isDisabled = this.$html.find('.js-submit-disable.is-disabled');
		this.$submitEnable = this.$html.find('.js-submit-enable');

		this.ButtonComponent = new ButtonComponent(this.$html);

	});

	describe('the default state of submit buttons', function() {

		beforeEach(function() {
			this.ButtonComponent.init();
		});

		it('should have a js-submit-disable class', function() {
			expect(this.$submitDisable.hasClass('js-submit-disable')).to.be.true;
		});

		it('should not have the is-disabled class', function() {
			expect(this.$submitDisable.hasClass('is-disabled')).to.be.false;
		});

		it('should not have the disabled attribute', function() {
			expect(this.$submitDisable.attr('disabled')).to.be.undefined;
		});

	});

	describe('clicking a button with the js-submit-disable class', function() {

		beforeEach(function() {
			this.ButtonComponent.init();
		});

		it('should add the disabled class on click', function() {
			var clickEvent = $.Event('click');

			this.$submitDisable.trigger(clickEvent);

			expect(this.$submitDisable.hasClass('is-disabled')).to.be.true;
		});

		it('should add the disabled attributes on click', function() {
			var clickEvent = $.Event('click');

			this.$submitDisable.trigger(clickEvent);

			expect(this.$submitDisable.attr('disabled')).to.equal('disabled');
		});

	});

	describe('clicking a button with the js-submit-enable class', function() {

		beforeEach(function() {
			this.ButtonComponent.init();
		});

		it('should have a js-submit-disable class', function() {
			var clickEvent = $.Event('click');
			this.$submitEnable.trigger(clickEvent);
			expect(this.$isDisabled.hasClass('js-submit-disable')).to.be.true;
		});

		it('should not have the is-disabled class', function() {
			var clickEvent = $.Event('click');
			this.$submitEnable.trigger(clickEvent);
			expect(this.$isDisabled.hasClass('is-disabled')).to.be.false;
		});

		it('should not have the disabled attribute', function() {
			var clickEvent = $.Event('click');
			this.$submitEnable.trigger(clickEvent);
			expect(this.$isDisabled.attr('disabled')).to.be.undefined;
		});

	});

	describe('after calling the submitEnable method, the disabled button', function() {

		beforeEach(function() {
			this.ButtonComponent.init();
			this.$submitDisable.trigger($.Event('click'));
			this.ButtonComponent.submitEnable();
		});

		it('should have a js-submit-disable class', function() {
			expect(this.$submitDisable.hasClass('js-submit-disable')).to.be.true;
		});

		it('should not have the is-disabled class', function() {
			expect(this.$submitDisable.hasClass('is-disabled')).to.be.false;
		});

		it('should not have the disabled attribute', function() {
			expect(this.$submitDisable.attr('disabled')).to.be.undefined;
		});

	});

});

