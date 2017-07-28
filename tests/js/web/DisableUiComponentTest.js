/*jshint multistr: true */

'use strict';

var $ = require('jquery'),
	DisableUiComponent = require('../../../js/DisableUiComponent');

describe('DisableUi component', function() {

	beforeEach(function() {
		this.$html = $('<html></html>');
		this.$body = $('<body></body>').appendTo(this.$html);
		this.$standardForm = $(
			'<div class="qa-container" data-disable-ui="true">' +
			'	<label for="inputText" class="control__label text-label">Text input</label>' +
			'	<input id="inputText" type="text" class="form__control">' +
			'	<a href="http://google.com">External link</a>' +
			'	<select><option>foo</option></select>' +
			'	<button class="btn btn--primary" >Save Changes</button>' +
	        '</div>'
        ).appendTo(this.$body);

		this.$target = this.$body.find('.qa-container');
		this.$link = this.$body.find('a');
		this.$label = this.$body.find('.text-label');
		this.$button = this.$body.find('.btn--primary');
		this.$textInput = this.$body.find('input');
		this.$select = this.$body.find('select');
		this.disableUi = new DisableUiComponent(this.$html);
	});

	describe('on init', function() {

		beforeEach(function() {
			sinon.spy(this.disableUi, 'disable');
		});

		it('should call the disable method', function() {
			this.disableUi.init();
			expect(this.disableUi.disable).to.have.been.calledOnce;
		});
	});

	describe('the ‘enable’ method', function() {

		beforeEach(function() {
			this.disableUi.init();
			this.disableUi.enable(this.$target);
		});

		it('should unwrap the div.u-ui-disabled from the container', function() {
			expect(this.$standardForm.parent().hasClass('u-ui-disabled')).to.be.false;
		});

		it('should remove the u-cursor-not-allowed class from form labels', function() {
			expect(this.$label.hasClass('u-cursor-not-allowed')).to.be.false;
		});

		it('should remove the disabled attribute from buttons', function() {
			expect(this.$button.attr('disabled')).to.be.undefined;
		});

		it('should remove the disabled attribute from inputs', function() {
			expect(this.$textInput.attr('disabled')).to.be.undefined;
		});

		it('should remove the disabled attribute from selects', function() {
			expect(this.$select.attr('disabled')).to.be.undefined;
		});

		it('should remove the disabled class from form inputs', function() {
			expect(this.$textInput.hasClass('disabled')).to.be.false;
		});
	});

	describe('the ‘disable’ method', function() {

		beforeEach(function() {
			this.disableUi.init();
			this.disableUi.disable(this.$target);
		});

		it('should prevent default on links', function() {
			var clickEvent = $.Event('click');

			this.$link.trigger(clickEvent);

			expect(clickEvent.isDefaultPrevented()).to.be.true;
		});

		it('should stop propagation of the click event', function() {
			var clickEvent = $.Event('click');

			this.$link.trigger(clickEvent);

			expect(clickEvent.isPropagationStopped()).to.be.true;
		});

		it('should add the u-cursor-not-allowed class to the link', function () {
			var clickEvent = $.Event('click');

			this.$link.trigger(clickEvent);

			expect(this.$link.hasClass('u-cursor-not-allowed')).to.be.true;
		});

		it('should add the u-cursor-not-allowed class to form labels', function () {
			expect(this.$label.hasClass('u-cursor-not-allowed')).to.be.true;
		});

		it('should add the disabled attribute to buttons', function() {
			expect(this.$button.attr('disabled')).to.equal('disabled');
		});

		it('should add the disabled attribute to inputs', function() {
			expect(this.$textInput.attr('disabled')).to.equal('disabled');
		});

		it('should add the disabled attribute to selects', function() {
			expect(this.$select.attr('disabled')).to.equal('disabled');
		});

		it('should add the disabled class to form inputs', function() {
			expect(this.$textInput.hasClass('disabled')).to.be.true;
		});

		it('should wrap the container in a div with the .u-ui-disabled class', function() {
			expect(this.$standardForm.parent().hasClass('u-ui-disabled')).to.be.true;
		});
	});

});
