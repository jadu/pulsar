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

