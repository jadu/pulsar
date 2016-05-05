'use strict';

var $ = require('jquery'),
    PulsarFormComponent = require('../../js/PulsarFormComponent');

describe('Pulsar Form Component - Select2 elements', function() {

    beforeEach(function() {
        this.$html = $('<div id="html"></div>').appendTo('html');
        this.$body = $('<div id="body"></div>').appendTo(this.$html);
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
\
    <div class="form__group form-choice choice--block">\
        <label class="control__label">Radio Test</label>\
        <div class="controls">\
            <label class="control__label">\
                <input value="foo" name="foo" type="radio" class="form__control qa-foo radio">Foo</label>\
            <label class="control__label">\
                <input value="bar" name="foo" type="radio" class="form__control radio">Bar</label>\
            <label class="control__label">\
                <input value="baz" name="foo" type="radio" class="form__control radio" checked>Baz</label>\
        </div>\
    </div>\
\
    <div class="form__group form-choice choice--block">\
        <label class="control__label">Checkbox Test</label>\
        <div class="controls">\
            <label class="control__label">\
                <input value="foo" name="foo" type="checkbox" class="form__control qa-foo checkbox">Foo</label>\
            <label class="control__label">\
                <input value="bar" name="foo" type="checkbox" class="form__control checkbox">Bar</label>\
            <label class="control__label">\
                <input value="baz" name="foo" type="checkbox" class="form__control checkbox" checked>Baz</label>\
        </div>\
    </div>\
</form>\
').appendTo(this.$body);

        this.$radioFoo = this.$html.find('.radio[value="foo"]');
        this.$radioBar = this.$html.find('.radio[value="bar"]');
        this.$radioBaz = this.$html.find('.radio[value="baz"]');
        this.$radioLabelFoo = this.$radioFoo.closest('.control__label');
        this.$radioLabelBaz = this.$radioBaz.closest('.control__label');

        this.$checkFoo = this.$html.find('.checkbox[value="foo"]');
        this.$checkBar = this.$html.find('.checkbox[value="bar"]');
        this.$checkBaz = this.$html.find('.checkbox[value="baz"]');
        this.$checkLabelFoo = this.$checkFoo.closest('.control__label');
        this.$checkLabelBar = this.$checkBar.closest('.control__label');
        this.$checkLabelBaz = this.$checkBaz.closest('.control__label');

        this.pulsarForm = new PulsarFormComponent(this.$html);

    });

    afterEach(function() {
        this.$html.remove();
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

    describe('Clicking a choice block radio input', function() {

        beforeEach(function() {
            this.pulsarForm.init();
        });

        it('Should add the is-selected class to the label when input clicked', function() {
            this.$radioFoo.click();
            expect(this.$radioLabelFoo.hasClass('is-selected')).to.be.true;
        });

        it('Should remove the is-selected class to the label if another option selected on click', function() {
            this.$radioFoo.click();
            this.$radioBar.click();
            expect(this.$radioLabelFoo.hasClass('is-selected')).to.be.false;
        });

    });

    describe('Clicking a choice block checkbox input', function() {

        beforeEach(function() {
            this.pulsarForm.init();
        });

        it('Should add the is-selected class to the label on click', function() {
            this.$checkFoo.click();
            expect(this.$checkLabelFoo.hasClass('is-selected')).to.be.true;
        });

        it('Should not remove the is-selected class if another option selected on click', function() {
            this.$checkFoo.click();
            this.$checkBar.click();
            expect(this.$checkLabelFoo.hasClass('is-selected')).to.be.true;
        });

        it('Should remove the is-selected class from the label if unchecked on click', function() {
            this.$checkFoo.click();
            this.$checkFoo.click();
            expect(this.$checkLabelFoo.hasClass('is-selected')).to.be.false;
        });

    });

    describe('Pre-checked choice block inputs', function() {

        beforeEach(function() {
            this.pulsarForm.init();
        });

        it('Should have the is-selected class applied (radio)', function() {
            expect(this.$radioLabelBaz.hasClass('is-selected')).to.be.true;
        });

        it('Should have the is-selected class applied (checkbox)', function() {
            expect(this.$checkLabelBaz.hasClass('is-selected')).to.be.true;
        });

    });


});
