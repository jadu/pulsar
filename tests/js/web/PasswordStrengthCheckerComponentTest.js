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

});
