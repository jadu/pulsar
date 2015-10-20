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
</form>\
').appendTo(this.$html);

		this.$form = this.$html.find('.form');
		this.$select2 = this.$form.find('.js-select2');

		this.pulsarForm = new PulsarFormComponent(this.$html);

	});

	describe('Select2 elements', function() {

		beforeEach(function() {
			sinon.spy($.fn, 'select2');
			this.pulsarForm.init();
		});

		it('should have called the select2 plugin', function() {
			expect($.fn.select2).to.have.been.called;
		});

	});

});
