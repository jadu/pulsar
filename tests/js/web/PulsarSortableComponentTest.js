/*jshint multistr: true */

'use strict';

var $ = require('jquery'),
    PulsarSortableComponent = require('../../../js/PulsarSortableComponent');

describe('PulsarSortableComponent', function() {

    beforeEach(function() {

        this.$html = $('<html></html>');
        this.$body = $('<body></body>').appendTo(this.$html);
        this.$markup = $('\
<table class="table is-sortable">\
    <tbody>\
        <tr class="qa-row-one">\
            <td>foo</td>\
            <td><a data-move="up" class=""></a><a data-move="down" class=""></a></td>\
        </tr>\
        <tr class="qa-row-two">\
            <td>foo</td>\
            <td><a data-move="up" class=""></a><a data-move="down" class=""></a></td>\
        </tr>\
    </tbody>\
</table>\
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

});
