/*jshint multistr: true */

'use strict';

var $ = require('jquery'),
    PulsarFormComponent = require('../../../js/PulsarFormComponent');

describe('PulsarFormComponent', function() {

    beforeEach(function() {
        this.$html = $('<div id="html"></div>').appendTo('html');
        this.$body = $('<div id="body"></div>').appendTo(this.$html);
        this.$markup = $(`
            <div id="tab-foo">\
                <form class="form">\
                    <select class="js-select2">
                        <option>foo</option>
                        <option>bar</option>
                        <option>baz</option>
                    </select>
                    <select class="js-select2" data-html="true">
                        <option>foo</option>
                        <option>bar</option>
                        <option>baz</option>
                    </select>

                    <div class="form__group form-choice choice--block">
                        <label class="control__label">Radio Test</label>
                        <div class="controls">
                            <label class="control__label">
                                <input value="foo" name="foo" type="radio" class="form__control qa-foo radio">Foo</label>
                            <label class="control__label">
                                <input value="bar" name="foo" type="radio" class="form__control radio">Bar</label>
                            <label class="control__label">
                                <input value="baz" name="foo" type="radio" class="form__control radio" checked>Baz</label>
                        </div>
                    </div>

                    <div class="form__group form-choice choice--block">
                        <label class="control__label">Checkbox Test</label>
                        <div class="controls">
                            <label class="control__label">
                                <input value="foo" name="foo" type="checkbox" class="form__control qa-foo checkbox">Foo</label>
                            <label class="control__label">
                                <input value="bar" name="foo" type="checkbox" class="form__control checkbox">Bar</label>
                            <label class="control__label">
                                <input value="baz" name="foo" type="checkbox" class="form__control checkbox" checked>Baz</label>
                        </div>
                    </div>

                    <div class="form__group">
                        <label class="control__label">Time picker test</label>
                        <div class="controls">
                            <input value="foo" name="foo" type="text" data-timepicker="true" class="form__control qa-foo" />
                        </div>
                    </div>

                    <div class="form__group">
                        <label class="control__label">Hardcoded Date Picker Test</label>
                        <div class="controls">
                            <input value="foo" name="foo" type="text" data-datepicker="true" class="form__control qa-foo" />
                        </div>
                    </div>

                    <div class="form__group">
                        <label class="control__label">Date Picker - Default Date Format Test</label>
                        <div class="controls">
                            <input value="foo" name="foo" type="text" data-datepicker="true" data-format="default" class="form__control qa-foo" />
                        </div>
                    </div>

                    <div class="form__group">
                        <label class="control__label">Date Picker - US Date Format Test</label>
                        <div class="controls">
                            <input value="foo" name="foo" type="text" data-datepicker="true" data-format="US" class="form__control qa-foo" />
                        </div>
                    </div>

                    <div class="form__group">
                        <label class="control__label">Date Picker - Reverse Date Format Test</label>
                        <div class="controls">
                            <input value="foo" name="foo" type="text" data-datepicker="true" data-format="reverse" class="form__control qa-foo" />
                        </div>
                    </div>
                </form>
            </div>
            <a href="#tab-foo" data-toggle="tab">tab</a>
            <a href="#modal-foo" data-toggle="modal">modal</a>
            <div class="modal" id="modal-foo">
                <select class="js-select2">
                    <option>foo</option>
                    <option>bar</option>
                    <option>baz</option>
                </select>
            </div>
        `).appendTo(this.$body);

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

        this.$datepicker = this.$html.find('[data-datepicker]');
        this.$datepickerDefault = this.$html.find('[data-format=default]');
        this.$datepickerUS = this.$html.find('[data-format=US]');
        this.$datepickerReverse = this.$html.find('[data-format=reverse]');
        this.$tabToggle = this.$html.find('[data-toggle="tab"]');
        this.$modalToggle = this.$html.find('[data-toggle="modal"]');
        this.$modal = this.$html.find('#modal-foo');
        this.$timepicker = this.$html.find('[data-timepicker="true"]');

        this.pulsarForm = new PulsarFormComponent(this.$html);

        $.fn.select2 = sinon.stub();
        $.fn.timepicker = sinon.stub();
        $.fn.spectrum = sinon.stub();
        $.fn.pikaday = sinon.stub();
    });

    afterEach(function() {
        delete $.fn.select2;
        delete $.fn.timepicker;
        delete $.fn.spectrum;
        delete $.fn.pikaday;
        this.$html.remove();
    });

    describe('Basic select2 elements', function() {

        beforeEach(function() {
            this.pulsarForm.initSelect2 = sinon.stub();
            this.pulsarForm.init();
        });

        it('should call the select2 plugin', function() {
            expect(this.pulsarForm.initSelect2).to.have.been.called;
        });

    });

    describe('Select2 elements with HTML', function() {

        beforeEach(function() {
            this.pulsarForm.initSelect2 = sinon.stub();
            this.pulsarForm.init();

        });

        it('should call the select2 plugin', function() {
            expect(this.pulsarForm.initSelect2).to.have.been.called;
        });

    });

    describe('Changing to a tab that contains select2 elements', function() {

        beforeEach(function() {
            this.pulsarForm.init();
            this.pulsarForm.initSelect2 = sinon.stub();
            this.$tabToggle.trigger('shown.bs.tab');
        });

        it('Should trigger the select2 init method', function() {
            expect(this.pulsarForm.initSelect2).to.have.been.called;
        });
    });

    describe('Opening a modal that contains select2 elements', function() {

        beforeEach(function() {
            this.pulsarForm.init();
            this.pulsarForm.initSelect2 = sinon.stub();
            this.$modalToggle.click();
            this.$modal.trigger('shown.bs.modal');
        });

        it('Should trigger the select2 init method', function(done) {
            setTimeout(() => {
                expect(this.pulsarForm.initSelect2).to.have.been.called;
                done();
            }, 500);
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

    describe('Datepickers', function() {

        beforeEach(function() {
            this.pulsarForm.init();
        });

        it('should have the pikaday plugin attached', function() {
            expect($.fn.pikaday).to.have.been.called;
        });

        it('should get "DD/MM/YYYY" when data-datepicker is hardcoded', function() {
            expect($.fn.pikaday).to.have.been.calledWith({ format: 'DD/MM/YYYY' });
        });

        it('should get "DD/MM/YYYY" when date-format attribute = "default"', function() {
            expect($.fn.pikaday).to.have.been.calledWith({ format: 'DD/MM/YYYY' });
            expect(this.$datepickerDefault.attr('data-format') === 'default').to.be.true;
        });

        it('should get "MM/DD/YYYY" when date-format attribute is "US"', function() {
            expect($.fn.pikaday).to.have.been.calledWith({ format: 'MM/DD/YYYY' });
            expect(this.$datepickerUS.attr('data-format') === 'US').to.be.true;
        });

        it('should get "YYYY/MM/DD" when date-format attribute is "reverse"', function() {
            expect($.fn.pikaday).to.have.been.calledWith({ format: 'YYYY/MM/DD' });
            expect(this.$datepickerReverse.attr('data-format') === 'reverse').to.be.true;
        });

    });

    describe('Timepickers', function() {

        beforeEach(function() {
            this.pulsarForm.timePickerComponent.init = sinon.stub();
            this.pulsarForm.init();
        });

        it('should call the timePickerComponents init method', function() {
            expect(this.pulsarForm.timePickerComponent.init).to.have.been.called;
        });
    });

    describe('refresh', function () {
        beforeEach(function () {
            this.$html.append('<div class="js-colorpicker"></div>');
        });

        it('should initiate the colour pickers', function () {
            this.pulsarForm.refresh();

            expect($.fn.spectrum).to.have.been.calledOnce;
        });

        it('should initiate the date pickers', function () {
            this.pulsarForm.refresh();

            expect($.fn.pikaday).to.have.been.called4times;
        });

        it('should initiate time pickers', function () {
            this.pulsarForm.refresh();

            expect($.fn.timepicker).to.have.been.calledOnce;
        });
    });
});
