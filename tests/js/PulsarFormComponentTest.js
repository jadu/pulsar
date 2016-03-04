'use strict';

var $ = require('jquery'),
	PulsarFormComponent = require('../../js/PulsarFormComponent');

describe('Pulsar Form Component', function() {

	beforeEach(function() {
		this.$html = $('<html></html>');
		this.$body = $('<body></body>').appendTo(this.$html);
		this.$markup = $('\
<form class="form">\
	<select class="js-select2">\
		<option>foo</option>\
		<option>bar</option>\
		<option>baz</option>\
	</select>\
	<select class="js-select2" data-html="true">\
		<option>foo</option>\
		<option>bar</option>\
		<option>baz</option>\
	</select>\
</form>\
').appendTo(this.$html);

		this.pulsarForm = new PulsarFormComponent(this.$html);

	});

	describe('Basic select2 elements', function() {

		beforeEach(function() {
			sinon.spy($.fn, 'select2');
			this.pulsarForm.init();
		});

		it('should call the select2 plugin', function() {
			expect($.fn.select2).to.have.been.called;
		});

	});

	describe('Select2 elements with HTML', function() {

		beforeEach(function() {
			this.pulsarForm.init();
		});

		it('should call the select2 plugin', function() {
			expect($.fn.select2).to.have.been.called;
		});

	});

});
