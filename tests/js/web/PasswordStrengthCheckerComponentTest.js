/*jshint multistr: true */

'use strict';

var $ = require('jquery'),
    password = require('../../../js/PasswordStrengthChecker/PasswordStrengthCheckerComponent.js');

describe('Pulsar Password Library', function() {

    beforeEach(function() {
        this.$html = $('<div id="html"></div>').appendTo('html');
        this.$body = $('<div id="body"></div>').appendTo(this.$html);
        this.$markup = $('\
    <form class="form">\
        <div class="form__group password__meter password__toggle">\
            <label for="password__metertoggle" class="control__label">Composite Password field with Meter and Toggle</label>\
            <div class="controls">\
                <div class="input-group has-btn-appended">\
                    <input id="password__metertoggle" type="password" class="form__control">\
                        <div class="password__wrapper form__control" style="display: none;">\
                            <div class="password__graybar">\
                                <div class="password__colorbar" style="background-position: 0px 0px; width: 0%;">\
                                </div>\
                            </div>\
                            <span class="password__text">Type your password</span>\
                        </div>\
                    <span class="input-group-btn"><button id="password__metertoggle__button" type="button" class="btn btn--naked"><i aria-hidden="true" class="icon-eye"></i></button></span>\
                </div>\
            </div>\
        </div>\
        <div class="form__group password__meter password__toggle">\
        <label for="password__metertoggle-2" class="control__label">Composite Password field with Meter and Toggle (Text)</label>\
            <div class="controls">\
                <div class="input-group has-btn-appended">\
                    <input id="password__metertoggle-2" type="password" class="form__control" style="border-bottom-left-radius: 4px; border-bottom-right-radius: 4px;">\
                    <div class="password__wrapper form__control" style="display: none;">\
                        <div class="password__graybar">\
                            <div class="password__colorbar" style="background-position: 0px 0px; width: 0%;"></div>\
                        </div>\
                        <span class="password__percent">0%</span>\
                        <span class="password__text">Type your password</span>\
                    </div>\
                    <div class="password__criteria">\
                        <ul>\
                            <li class="minimumLength"><span>8 characters minimum</span></li>\
                            <li class="uppercase"><span>1 UPPERCASE character</span></li>\
                            <li class="lowercase"><span>1 lowercase character</span></li>\
                            <li class="specialChar"><span>1 Special character</span></li>\
                            <li class="number"><span>1 number</span></li>\
                            <li class="commonPassword"><span>Not a common password</span></li>\
                        </ul>\
                    </div>\
                    <span class="input-group-btn"><button id="password__metertoggle__btn-2" type="button" class="btn password__texttoggle__btn btn--naked">SHOW</button></span>\
                </div>\
            </div>\
        </div>\
    </form>\
').appendTo(this.$body);

        this.$password = this.$html.find('#password__metertoggle');
        this.$eyeButton = this.$html.find('#password__metertoggle__button');
        this.$eyeIcon = this.$html.find('#password__metertoggle__button i');

        this.pulsarForm = new PulsarFormComponent(this.$html);

        $.fn.select2 = sinon.stub();
        $.fn.timepicker = sinon.stub();
    });

    /*afterEach(function() {
        delete $.fn.select2;
        delete $.fn.timepicker;
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
            sinon.spy($.fn, 'pikaday');
            this.pulsarForm.init();
        });

        it('Should have the pikaday plugin attached', function() {
            expect($.fn.pikaday).to.have.been.called;
        });

    });

    describe('Clicking the eye icon button next to the password field', function() {

        beforeEach(function() {
            this.pulsarForm.init();
        });

        it('Should change the icon class to eye-slash', function() {
            this.$eyeButton.click();
            expect(this.$eyeIcon.hasClass('icon-eye-slash')).to.be.true;
        });

        it('Should change the inputs type to text', function() {
            this.$eyeButton.click();
            expect(this.$password.attr('type') === 'text').to.be.true;
        });

    });

    describe('Clicking the eye-slash icon button next to the password field', function() {

        beforeEach(function() {
            this.pulsarForm.init();
        });

        it('Should change the icon class to eye', function() {
            this.$eyeButton.click();
            this.$eyeButton.click();
            expect(this.$eyeIcon.hasClass('icon-eye')).to.be.true;
        });

        it('Should change the inputs type to password', function() {
            this.$eyeButton.click();
            this.$eyeButton.click();
            expect(this.$password.attr('type') === 'password').to.be.true;
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
    });*/

});
