'use strict';

var $ = require('jquery'),
    tab = require('../../js/tab');

describe('tabbedLayout', function() {

    beforeEach(function() {
        this.$tabs = $(
            '\
<div class="tabs">\
    <ul class="tabs__list">\
        <li class="is-active">\
            <a href="#one" data-toggle="tab" id="test">one</a>\
        </li>\
        <li>\
            <a href="#two" data-toggle="tab">two</a>\
        </li>\
    </ul>\
    <div class="tabs__content">\
        <div class="tab__pane is-active" id="one">\
            <!-- ONE -->\
        </div>\
        <div class="tab__pane" id="two">\
            <!-- TWO -->\
        </div>\
    </div>\
</div>');

        this.$tabLink1 = this.$tabs.find('[href="#one"]');
        this.$tabLink2 = this.$tabs.find('[href="#two"]');
        this.$tabPane1 = this.$tabs.find('#one');
        this.$tabPane2 = this.$tabs.find('#two');

    });

    describe('before any tabs are clicked', function() {

        it('should show the first tab link as active', function() {
            expect(this.$tabLink1.parent().hasClass('is-active')).to.be.true;
        });

        it('should not show the second tab as active', function() {
            expect(this.$tabLink2.parent().hasClass('is-active')).to.be.false;
        });

        it('should show the first tab pane as active', function() {
            expect(this.$tabPane1.hasClass('is-active')).to.be.true;
        });

        it('should not show the second tab pane as active', function() {
            expect(this.$tabPane2.hasClass('is-active')).to.be.false;
        });

    });

    // describe('clicking the second tab link', function() {

    //     beforeEach(function() {
    //         event = $.Event('click');
    //         this.$tabLink2.trigger(event);
    //     })

    //     it('should show the second tab link as active', function() {
    //         expect(this.$tabLink2.parent().hasClass('is-active')).to.be.true;
    //     });

    //     it('should not show the first tab as active', function() {
    //         expect(this.$tabLink1.parent().hasClass('is-active')).to.be.false;
    //     });

    //     it('should show the second tab pane as active', function() {
    //         expect(this.$tabPane2.hasClass('is-active')).to.be.true;
    //     });

    //     it('should not show the first tab pane as active', function() {
    //         expect(this.$tabPane1.hasClass('is-active')).to.be.false;
    //     });

    // });

});
