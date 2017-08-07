/*jshint multistr: true */

'use strict';

var $ = require('jquery'),
    PulsarSortableComponent = require('../../../js/PulsarSortableComponent');

describe('PulsarSortableComponent', function() {
    beforeEach(function() {

        this.$html = $('<html></html>');
        this.$body = $('<body></body>').appendTo(this.$html);
        this.$markup = $('\
<div class="has-badges">\
    <div class="btn__group dropdown">\
        <button data-toggle="dropdown" class="btn dropdown__toggle">\
            Actions&nbsp;\
            <span class="caret"></span>\
        </button>\
        <ul class="dropdown__menu pull-left">\
            <li><a href="#" data-ui="show-filter-bar"><i aria-hidden="true" class="icon-filter"></i>&nbsp;New Filter</a></li>\
        </ul>\
    </div>\
    <table class="table is-sortable">\
        <tbody>\
            <tr class="qa-row-one">\
                <td>foo</td>\
                <td><a data-move="up" class=""></a><a data-move="down" class=""></a></td>\
                <td><input type="checkbox" class="form__control checkbox"></td>\
            </tr>\
            <tr class="qa-row-two">\
                <td>foo</td>\
                <td><a data-move="up" class=""></a><a data-move="down" class=""></a></td>\
            </tr>\
        </tbody>\
    </table>\
</div>\
').appendTo(this.$html);

        this.$table = this.$html.find('.table');
        this.$rowOne = this.$html.find('.qa-row-one');
        this.$rowTwo = this.$html.find('.qa-row-two');
        this.$moveUp = this.$html.find('[data-move="up"]');
        this.$moveDown = this.$html.find('[data-move="down"]');

        this.pulsarSortable = new PulsarSortableComponent(this.$html);
    });

    describe('The sortable table', function() {
        beforeEach(function() {
            this.pulsarSortable.init();
        });

        it('show have row one at index 0', function() {
            expect(this.$html.find('.qa-row-one').index()).to.equal(0);
        });

        it('should have row two at index 1', function() {
            expect(this.$html.find('.qa-row-two').index()).to.equal(1);
        });
    });

    describe('clicking a move control in row one', function() {
        beforeEach(function() {
            this.pulsarSortable.init();
            this.$moveUp.click();
        });

        it('should hide the move links', function() {
            expect(this.$html.find('.qa-row-one [data-move="up"]').hasClass('hide')).to.be.true;
        });

        it('should add the success icon', function() {
            expect(this.$html.find('.qa-row-one [data-move="up"]').parent().find('.icon-ok-sign').length).to.equal(1);
        });

        it('should remove the success icon after a delay', function() {
            setTimeout(function(){
                expect(this.$html.find('.qa-row-one [data-move="up"]').parent().find('.js-sortable-moved').length).to.equal(0);
            }, 1000);
        });

        it('should show the move links after a delay', function() {
            setTimeout(function(){
                expect(this.$html.find('.qa-row-one [data-move="up"]').hasClass('hide')).to.be.false;
            }, 2250);
        });
    });

    describe('clicking the move down control on row one', function() {
        beforeEach(function() {
            this.pulsarSortable.init();
            this.$rowOne.find('[data-move="down"]').click();
        });

        it('should move the row down one position', function() {
            expect(this.$html.find('.qa-row-one').index()).to.equal(1);
        });

        it('should move the other row up one position', function() {
            expect(this.$html.find('.qa-row-two').index()).to.equal(0);
        });
    });

    describe('clicking the move up control on row one', function() {
        beforeEach(function() {
            this.pulsarSortable.init();
            this.$rowOne.find('[data-move="up"]').click();
        });

        it('should move the row up one position', function() {
            expect(this.$html.find('.qa-row-one').index()).to.equal(0);
        });

        it('should move the other row down one position', function() {
            expect(this.$html.find('.qa-row-two').index()).to.equal(1);
        });
    });

    describe('selecting a table row', function() {
        beforeEach(function() {
            this.actionsBadgeStub = sinon.stub(this.pulsarSortable, 'actionsBadge');
            this.pulsarSortable.init();
            this.$rowOne.click();
        });

        afterEach(function () {
            this.actionsBadgeStub.restore();
        });

        it('should add class "is-selected"', function() {
            expect(this.$rowOne.hasClass('is-selected')).to.be.true;
        });

        it('should toggle the row\'s checkbox', function() {
            expect(this.$rowOne.find('.checkbox').first().prop('checked')).to.be.true;
        });

        it('should update "Actions" dropdown badge', function() {
            expect(this.actionsBadgeStub).to.have.been.called;
            expect(this.$html.find('.has-badges .dropdown__toggle span.badge').length).to.equal(1);
        });
    });

    describe('deselecting a table row', function() {
        beforeEach(function() {
            this.actionsBadgeStub = sinon.stub(this.pulsarSortable, 'actionsBadge');
            this.pulsarSortable.init();
            this.$rowOne.addClass('is-selected');
            this.$rowOne.find('.checkbox').first().prop('checked', true);
            this.$rowOne.click();
        });

        it('should add class "is-selected"', function() {
            expect(this.$rowOne.hasClass('is-selected')).to.be.false;
        });

        it('should toggle the row\'s checkbox', function() {
            expect(this.$rowOne.find('.checkbox').first().prop('checked')).to.be.false;
        });

        it('should update "Actions" dropdown badge', function() {
            expect(this.actionsBadgeStub).to.have.been.called;
            expect(this.$html.find('.has-badges .dropdown__toggle span.badge').length).to.equal(0);
        });
    });
});
