'use strict';

var $ = require('jquery'),
    FlashMessageComponent = require('../../../js/FlashMessageComponent');

    $.fx.off = true;

describe('FlashMessage component', function() {

    beforeEach(function() {
        this.$html = $('<html></html>');
        this.$body = $('<body></body>').appendTo(this.$html);
        this.$markup = $('<div class="js-flash-container"></div>').appendTo(this.$html);
        this.$flashElement = $('<div class="flash flash--default"><button class="close" data-dismiss="flash"><i class="icon-remove"></i></button></div>');

        $.fn.sticky = sinon.stub().returnsThis();

        this.$container = this.$html.find('.js-flash-container');

        this.flash = new FlashMessageComponent(this.$html);

    });

    describe('The init method', function() {

        it('should return true if the container is found', function() {
            expect(
                this.flash.init()
            ).to.be.true;
        });

        it('should throw an error if the container is not found', function() {
            this.flashWithIncompleteDom = new FlashMessageComponent($());
            expect(function () {
                this.flashWithIncompleteDom.init();
            }.bind(this)).to.throw(Error);
        });

    });

    describe('The success method', function() {

        beforeEach(function() {
            this.flash.init();
            this.flash.success();
        });

        it('should populate the container with the flash element', function() {
            var $flashElement = this.$container.find('.flash');
            expect($flashElement).to.not.equal(0);
        });

        it('should remove the default class from the flash element', function() {
            var $flashElement = this.$container.find('.flash');
            expect($flashElement.hasClass('flash--default')).to.be.false;
        });

        it('should add the success class to the flash element', function() {
            var $flashElement = this.$container.find('.flash');
            expect($flashElement.hasClass('flash--success')).to.be.true;
        });

        it('should add the ok icon to the flash element', function() {
            var $flashElement = this.$container.find('.flash'),
                $flashIcon = $flashElement.find('i');
            expect($flashIcon.hasClass('icon-ok')).to.be.true;
        });

    });

    describe('The error method', function() {

        beforeEach(function() {
            this.flash.init();
            this.flash.error();
        });

        it('should populate the container with the flash element', function() {
            // console.log(this.$container.prop('outerHTML'));
            var $flashElement = this.$container.find('.flash');
            expect($flashElement).to.not.equal(0);
        });

        it('should remove the default class from the flash element', function() {
            var $flashElement = this.$container.find('.flash');
            expect($flashElement.hasClass('flash--default')).to.be.false;
        });

        it('should add the error class to the flash element', function() {
            var $flashElement = this.$container.find('.flash');
            expect($flashElement.hasClass('flash--error')).to.be.true;
        });

        it('should add the warning-sign icon to the flash element', function() {
            var $flashElement = this.$container.find('.flash'),
                $flashIcon = $flashElement.find('i');
            expect($flashIcon.hasClass('icon-warning-sign')).to.be.true;
        });

    });

    describe('The warning method', function() {

        beforeEach(function() {
            this.flash.init();
            this.flash.warning();
        });

        it('should populate the container with the flash element', function() {
            // console.log(this.$container.prop('outerHTML'));
            var $flashElement = this.$container.find('.flash');
            expect($flashElement).to.not.equal(0);
        });

        it('should remove the default class from the flash element', function() {
            var $flashElement = this.$container.find('.flash');
            expect($flashElement.hasClass('flash--default')).to.be.false;
        });

        it('should add the warning class to the flash element', function() {
            var $flashElement = this.$container.find('.flash');
            expect($flashElement.hasClass('flash--warning')).to.be.true;
        });

        it('should add the warning-sign icon to the flash element', function() {
            var $flashElement = this.$container.find('.flash'),
                $flashIcon = $flashElement.find('i');
            expect($flashIcon.hasClass('icon-warning-sign')).to.be.true;
        });

    });

    describe('The info method', function() {

        beforeEach(function() {
            this.flash.init();
            this.flash.info();
        });

        it('should populate the container with the flash element', function() {
            // console.log(this.$container.prop('outerHTML'));
            var $flashElement = this.$container.find('.flash');
            expect($flashElement).to.not.equal(0);
        });

        it('should remove the default class from the flash element', function() {
            var $flashElement = this.$container.find('.flash');
            expect($flashElement.hasClass('flash--default')).to.be.false;
        });

        it('should add the info class to the flash element', function() {
            var $flashElement = this.$container.find('.flash');
            expect($flashElement.hasClass('flash--info')).to.be.true;
        });

        it('should add the info-sign icon to the flash element', function() {
            var $flashElement = this.$container.find('.flash'),
                $flashIcon = $flashElement.find('i');
            expect($flashIcon.hasClass('icon-info-sign')).to.be.true;
        });

    });

    describe('The render method', function() {

        beforeEach(function() {
            this.flash.init();
            this.flash.render('foo');
        });

        it('should use the success type by default', function() {
            var $flashElement = this.$container.find('.flash');
            expect($flashElement.hasClass('flash--success')).to.be.true;
        });

        it('should use the info icon by default', function() {
            var $flashElement = this.$container.find('.flash'),
                $flashIcon = $flashElement.find('i');
            expect($flashIcon.hasClass('icon-info-sign')).to.be.true;
        });

    });

    describe('The dismiss button', function() {

        beforeEach(function() {
            this.flash.init();
            this.flash.success();
        });

        it('should call the dismiss method', function() {
            sinon.spy(this.flash, 'dismiss');

            var $dismissButton = this.$container.find('[data-dismiss]');
            $dismissButton.click();

            expect(this.flash.dismiss).to.have.been.called;
        });

        it('should remove the flash message', function() {
            var $dismissButton = this.$container.find('[data-dismiss]');
            $dismissButton.click();

            expect(this.$container.find('.flash').length).to.equal(0);
        });

    });

    describe('Flash messages that exist in the DOM on load', function() {

        beforeEach(function() {
            this.$flashElement.appendTo(this.$html);
            this.flash.init();
        });

        it('should call the dismiss method', function() {
            sinon.spy(this.flash, 'dismiss');

            var $dismissButton = this.$html.find('[data-dismiss]');
            $dismissButton.click();

            expect(this.flash.dismiss).to.have.been.called;
        });

        it('should remove the flash message', function() {
            var $dismissButton = this.$html.find('[data-dismiss]');
            $dismissButton.click();

            expect(this.$html.find('.flash').length).to.equal(0);
        });

    });

});
