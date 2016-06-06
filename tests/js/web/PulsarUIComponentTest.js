'use strict'

var $ = require('jquery'),
    PulsarUIComponent = require('../../../js/PulsarUIComponent');

describe('Pulsar UI Component', function() {

    beforeEach(function() {
        this.$html = $('<html></html>');
        this.$body = $('<body></body>').appendTo(this.$html);
        this.$code = $('\
            <a href="#foo" disabled class="is-disabled" aria-disabled="true">\
').appendTo(this.$html);

        this.$isDisabled = this.$html.find('a[disabled]');

        this.pulsarUIComponent = new PulsarUIComponent(this.$html);

    });

    describe('disabled links', function() {

        beforeEach(function() {
            this.pulsarUIComponent.init();
        });

        it('should preventDefault', function() {
            var clickEvent = $.Event('click');
            this.$isDisabled.trigger(clickEvent);
            expect(clickEvent.isDefaultPrevented()).to.be.true;
        });

    });

});

describe('Countdown plugin', function() {

    beforeEach(function() {
        this.$html = $('<html></html>');
        this.$body = $('<body></body>').appendTo(this.$html);
        this.$code = $('\
            <span class="js-countdown qa-countdown-one" data-final-date="1665243907399" data-format="%d">Expires in 6 hours</span>\
').appendTo(this.$html);

        this.$countdownOne = this.$html.find('.qa-countdown-one');
        this.pulsarUIComponent = new PulsarUIComponent(this.$html);
    });

    describe('A countdown element', function() {

        beforeEach(function() {
            sinon.spy($.fn, 'countdown');
            this.pulsarUIComponent.init();
        });

        it('should call the countdown plugin', function() {
            expect($.fn.countdown).to.have.been.called;
        });
    });
});
