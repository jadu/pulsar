/*jshint multistr: true */

'use strict'

var $ = require('jquery');

require('../../../js/libs/popover');

$.fx.off = !$.fx.off;

describe('Test extra functionality added to Bootstrap popovers', function() {

    beforeEach(function() {
        this.$html = $('<div id="html"></div>').appendTo('html');
        this.$body = $('<div id="body"></div>').appendTo(this.$html);
        this.$code = $(`
            <button class="qa-alpha" data-toggle="popover" data-autoclose="true" title="Foo" data-content="Bar">Alpha</button>
            <button class="qa-bravo" rel="clickover" title="Foo" data-content="Bar">Bravo</button>
        `).appendTo(this.$body);

        this.$domTarget = this.$html.find('#body');
        this.$autoclosingPopover = this.$html.find('.qa-alpha');
        this.$legacyClickover = this.$html.find('.qa-bravo');

        $.fn.popover = sinon.stub().returnsThis();
    });

    afterEach(function() {
        this.$html.remove();
        delete $.fn.popover;
    });

    describe('Legacy clickovers', function() {

        beforeEach(function() {
            this.clickEvent = $.Event('click');
            this.$legacyClickover.trigger(this.clickEvent);
        });

        it('should trigger a popover', function() {
            expect($.fn.popover).to.have.been.called;
        });

        it('should hide the popover when clicked anywhere in the DOM', function (done) {
            this.$domTarget.trigger(this.clickEvent);

            setTimeout(() => {
                expect($.fn.popover).to.have.been.calledWith('hide');
                done();
            }, 500);
        });
    });

    describe('Autoclosing popovers', function() {

        beforeEach(function() {
            this.clickEvent = $.Event('click');
            this.$autoclosingPopover.trigger(this.clickEvent);
        });

        it('should trigger a popover', function() {
            expect($.fn.popover).to.have.been.called;
        });

        it('should hide the popover when clicked anywhere in the DOM', function (done) {
            this.$domTarget.trigger(this.clickEvent);

            setTimeout(() => {
                expect($.fn.popover).to.have.been.calledWith('hide');
                done();
            }, 500);
        });
    });

});

