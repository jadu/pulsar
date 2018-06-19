/*jshint multistr: true */

'use strict'

var $ = require('jquery'),
    history = require('../../../libs/history.js/scripts/bundled/html5/jquery.history'),
    tab = require('../../../js/libs/tab'),
    dropdown = require('../../../js/libs/dropdown'),
    PulsarUIComponent = require('../../../js/PulsarUIComponent');

    $.fx.off = !$.fx.off;

describe('Pulsar UI Component', function() {

    beforeEach(function() {
        this.$html = $('<div class="html"></div>');
        this.$body = $('<div class="body"></div>').appendTo(this.$html);
        this.$code = $(`
            <a href="#foo" disabled class="is-disabled">
            <table class="table qa-table"></table>
            <table class="table--datagrid qa-datagrid"></table>
            <table class="table datatable qa-datatable"></table>
            <table class="table datatable table--horizontal qa-datatable-actions">
                <thead>
                    <tr>
                        <th>foo</th>
                        <th>bar</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td></td>
                        <td>
                            <div class="btn__group dropdown">
                                <button data-toggle="dropdown" class="btn dropdown__toggle row-actions">
                                    <i class="icon-ellipsis-h"><span class="hide">Actions</span></i>
                                </button>
                                <ul class="dropdown__menu pull-left">
                                    <li><a href="#action">action</a></li>
                                </ul>
                            </div>
                        </td>
                    </tr>
                </tbody>
            </table>
            <table class="table datatable qa-datatable-empty-message" data-empty-table="foo"></table>
            <table class="table datatable qa-datatable-no-selection" data-select="false"></table>
            <div class="table-container"><table class="table qa-table-dupe"></table></div>
            <a href="#tab" data-toggle="tab">foo</a>
            <a data-href="?tab=foo" href="#tab-foo" data-toggle="tab">foo</a>
            <div class="tab__pane" id="tab"><table class="table datatable qa-tab-datatable"></table></div>
            <span class="js-countdown qa-countdown-one" data-final-date="1665243907399" data-format="%d">Expires in 6 hours</span>\
`).appendTo(this.$html);

        this.$tabLink = this.$html.find('a[href="#tab"]');
        this.$pushStateTabLink = this.$html.find('a[href="#tab-foo"]');
        this.$isDisabled = this.$html.find('a[disabled]');
        this.$basicTable = this.$html.find('.qa-table');
        this.$datagridTable = this.$html.find('.qa-datagrid');
        this.$datatableTable = this.$html.find('.qa-datatable');
        this.$datatableWithCustomMessage = this.$html.find('.qa-datatable-empty-message');
        this.$datatableDisableSelection = this.$html.find('.qa-datatable-no-selection');
        this.$tableDupe = this.$html.find('.qa-table-dupe');
        this.$countdownOne = this.$html.find('.qa-countdown-one');
        this.$datatableActions = this.$html.find('.qa-datatable-actions');

        this.$rowActions = this.$html.find('.row-actions');
        this.$rowActionsParent = this.$rowActions.parent();;

        this.history = {
            pushState: sinon.stub()
        };

        this.pulsarUIComponent = new PulsarUIComponent(this.$html, this.history);

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

    describe('initialising tables', function() {

        beforeEach(function() {
            this.pulsarUIComponent.init();
        });

        it('should wrap basic tables with the container', function() {
            expect(this.$basicTable.parent().hasClass('table-container')).to.be.true;
        });

        it('should wrap datagrid tables with the container', function() {
            expect(this.$datagridTable.parent().hasClass('table-container')).to.be.true;
        });

        it('should NOT wrap datatable tables with the container', function() {
            expect(this.$datatableTable.parent().hasClass('table-container')).to.be.false;
        });

        it('should NOT wrap tables which already have the container', function() {
            expect(this.$tableDupe.parent().parent().hasClass('table-container')).to.be.false;
        });

        it('should show the default empty table message', function() {
            expect(this.$datatableTable.find('.dataTables_empty').text()).to.equal('There are currently no items to display');
        });

        it('should allow the empty table message to be overridden', function() {
            expect(this.$datatableWithCustomMessage.find('.dataTables_empty').text()).to.equal('foo');
        });

        it('should wrap the table with the disable class when the data-select attribute is false', function() {
            expect(this.$datatableDisableSelection.parent().hasClass('dt-disable-selection')).to.be.true;
        });
    });

    describe('Table row-actions', function() {

        beforeEach(function() {
            sinon.spy(this.pulsarUIComponent, 'closeRowActions');
            this.pulsarUIComponent.init();
        });

        it('should be opened when clicked', function(done) {
            this.$rowActions.click();
            setTimeout(function(){
                expect(this.$rowActionsParent.hasClass('open')).to.be.true;
                done();
            }, 1000);
        });

        it('should be closed when clicked again', function(done) {
            this.$rowActions.click();
            this.$rowActions.click();
            setTimeout(function(){
                expect(this.$rowActionsParent.hasClass('open')).to.be.false;
                done();
            }, 1000);
        });

        it('should call the closeRowActions method when window resized', function(done) {
            this.$rowActions.click();
            this.$html.trigger('resize');
            setTimeout(function(){
                expect(this.closeRowActions).to.have.been.called;
                done();
            }, 1000);
        });

        it('should call the closeRowActions method when table scrolled', function(done) {
            this.$rowActions.click();
            this.$datatableActions.trigger('scroll');
            setTimeout(function(){
                expect(this.closeRowActions).to.have.been.called;
                done();
            }, 1000);
        });

        it('should be closed when the window resized', function() {
            this.$rowActions.click();
            this.$html.trigger('resize');
            expect(this.$rowActionsParent.hasClass('open')).to.be.false;
        });

        it('should be closed when the table is scrolled resized', function() {
            this.$rowActions.click();
            this.$datatableActions.trigger('scroll');
            expect(this.$rowActionsParent.hasClass('open')).to.be.false;
        });

    });

    describe('Clicking a tab toggle with the data-href attribute', function() {

        beforeEach(function() {
            this.pulsarUIComponent.init();
        });

        it('should call the history plugin', function() {
            this.$pushStateTabLink.click();
            expect(this.history.pushState).to.have.been.calledOnce;
        });

        it('should push the correct state object onto the history stack', function () {
            this.$pushStateTabLink.click();
            expect(this.history.pushState).to.have.been.calledWith({state: 1});
        });

        it('should push the correct href onto the history stack', function () {
            this.$pushStateTabLink.click();
            expect(this.history.pushState).to.have.been.calledWith(sinon.match.any, '?tab=foo', '?tab=foo');
        });
    });

    describe('clicking a tab toggle', function() {

        beforeEach(function() {

            this.recalc = sinon.stub();

            $.fn.dataTable = {
                tables: sinon.stub()
            };

            $.fn.DataTable = sinon.stub().returns({
                columns: {
                    adjust: sinon.stub().returns({
                        responsive: {
                            recalc: this.recalc
                        }
                    })
                }
            });

            this.pulsarUIComponent.init();
            this.$tabLink.click();
            this.$tabLink.trigger('shown.bs.tab');

        });

        afterEach(function () {
            delete $.fn.dataTable;
            delete $.fn.DataTable;
        });

        it('should recalculate the table', function() {
            expect(this.recalc).to.have.been.calledOnce;
        });

    });
});
