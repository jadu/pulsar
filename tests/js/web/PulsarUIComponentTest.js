'use strict'

var $ = require('jquery'),
    tab = require('../../../js/libs/tab'),
    PulsarUIComponent = require('../../../js/PulsarUIComponent');

describe('Pulsar UI Component', function() {

    beforeEach(function() {
        this.$html = $('<html></html>');
        this.$body = $('<body></body>').appendTo(this.$html);
        this.$code = $('\
            <a href="#foo" disabled class="is-disabled" aria-disabled="true">\
            <table class="table qa-table"></table>\
            <table class="table--datagrid qa-datagrid"></table>\
            <table class="table datatable qa-datatable"></table>\
            <table class="table datatable qa-datatable-empty-message" data-empty-table="foo"></table>\
            <table class="table datatable qa-datatable-no-selection" data-select="false"></table>\
            <div class="table-container"><table class="table qa-table-dupe"></table></div>\
            <a href="#tab" data-toggle="tab">foo</a>\
            <div class="tab__pane" id="tab">\
                <table class="table datatable qa-tab-datatable"></table>\
            </div>\
            <span class="js-countdown qa-countdown-one" data-final-date="1665243907399" data-format="%d">Expires in 6 hours</span>\
').appendTo(this.$html);

        this.$tabLink = this.$html.find('a[data-toggle="tab"]');
        this.$isDisabled = this.$html.find('a[disabled]');
        this.$basicTable = this.$html.find('.qa-table');
        this.$datagridTable = this.$html.find('.qa-datagrid');
        this.$datatableTable = this.$html.find('.qa-datatable');
        this.$datatableWithCustomMessage = this.$html.find('.qa-datatable-empty-message');
        this.$datatableDisableSelection = this.$html.find('.qa-datatable-no-selection');
        this.$tableDupe = this.$html.find('.qa-table-dupe');
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

