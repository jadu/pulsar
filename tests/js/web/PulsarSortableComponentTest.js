/*jshint multistr: true, unused: false*/

'use strict';

var $ = require('jquery'),
    PulsarSortableComponent = require('../../../js/PulsarSortableComponent');

$.fx.off = !$.fx.off;

describe('Sortable component', function() {

    beforeEach(function() {
        this.$html = $('<div class="fake-html"></div>').appendTo('html');
        this.$body = $('<div class="fake-body"></div>').appendTo(this.$html);
        this.$markup = $('\
<table class="table is-sortable table--full">\
<tbody>\
    <tr><td>foo</td></tr>\
</tbody>\
</table>\
').appendTo(this.$html);

        this.$table = this.$html.find('.table');

        this.pulsarSortableComponent = new PulsarSortableComponent(this.$html);
    });

    describe('Initialising the sortable component with a sortable table', function() {

        beforeEach(function() {
            sinon.spy($.fn, 'sortable');
            this.pulsarSortableComponent.init();
        });

        it('should call the sortable plugin', function() {
            expect($.fn.sortable).to.have.been.called;
        });

    });

});
