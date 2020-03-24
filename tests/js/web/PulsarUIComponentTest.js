/*jshint multistr: true */

'use strict'

var $ = require('jquery'),
    tab = require('../../../js/libs/tab'),
    PulsarUIComponent = require('../../../js/PulsarUIComponent');

    $.fx.off = true;

describe('Pulsar UI Component', function() {

    beforeEach(function() {
        this.$html = $('<html></html>');
        this.$body = $('<body></body>').appendTo(this.$html);
        this.$code = $('\
            <a href="#foo" class="is-disabled">test</a>\
            <table class="table qa-table"></table>\
            <table class="table--datagrid qa-datagrid"></table>\
            <table class="table datatable qa-datatable"></table>\
            <table class="table datatable qa-datatable-empty-message" data-empty-table="foo"></table>\
            <table class="table datatable qa-datatable-no-selection" data-select="false" data-page-length="20"></table>\
            <div class="table-container"><table class="table qa-table-dupe"></table></div>\
            <a href="#tab" data-toggle="tab">foo</a>\
            <a data-href="?tab=foo" href="#tab-foo" data-toggle="tab">foo</a>\
            <div class="tab__pane" id="tab"><table class="table datatable qa-tab-datatable"></table></div>\
            <span class="js-countdown qa-countdown-one" data-final-date="1665243907399" data-format="%d">Expires in 6 hours</span>\
').appendTo(this.$html);

        this.$tabLink = this.$html.find('a[href="#tab"]');
        this.$pushStateTabLink = this.$html.find('a[href="#tab-foo"]');
        this.$isDisabled = this.$html.find('a.is-disabled');
        this.$basicTable = this.$html.find('.qa-table');
        this.$datagridTable = this.$html.find('.qa-datagrid');
        this.$datatableTable = this.$html.find('.qa-datatable');
        this.$datatableWithCustomMessage = this.$html.find('.qa-datatable-empty-message');
        this.$datatableDisableSelection = this.$html.find('.qa-datatable-no-selection');
        this.$tableDupe = this.$html.find('.qa-table-dupe');
        this.$countdownOne = this.$html.find('.qa-countdown-one');

        this.history = {
            pushState: sinon.stub()
        };

        this.pulsarUIComponent = new PulsarUIComponent(this.$html, this.history);
        this.clickEvent = $.Event('click');

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
            this.pulsarUIComponent.initDisabledLinks();
        });
        
        it('should remove the href attribute', function() {
            this.$isDisabled.trigger(this.clickEvent);

            expect(this.$html.find('.is-disabled').attr('href')).to.be.undefined;
        });

        it('should move the href value to data-href', function() {
            this.$isDisabled.trigger(this.clickEvent);

            expect(this.$html.find('.is-disabled').attr('data-href')).to.equal('#foo');
        });

        it('should add the button role', function() {
            this.$isDisabled.trigger(this.clickEvent);

            expect(this.$html.find('.is-disabled').attr('role')).to.equal('button');
        });

        it('should add aria-disabled', function() {
            this.$isDisabled.trigger(this.clickEvent);

            expect(this.$html.find('.is-disabled').attr('aria-disabled')).to.equal('true');
        });

        it('should preventDefault', function() {
            this.$isDisabled.trigger(this.clickEvent);

            expect(this.clickEvent.isDefaultPrevented()).to.be.true;
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

    describe('initialising DataTables', function() {

        beforeEach(function() {
            $.fn.DataTable = sinon.stub();
        });

        afterEach(function () {
            delete $.fn.DataTable;
        });

        it('should not show the length change select by default', function() {
            this.pulsarUIComponent.init();

            expect($.fn.DataTable.args[0][0].lengthChange).to.equal(false);
        });

        it('should show the length change select if the data-length-change attribute is true', function () {
            let $tableWithLengthChangeDataAttribute = $('<table class="table datatable qa-datatable-length-change" data-length-change="true"></table>');
            $tableWithLengthChangeDataAttribute.appendTo(this.$body);

            this.pulsarUIComponent.init();

            expect($.fn.DataTable.args[0][0].lengthChange).to.equal(true);
        })

        it('should default to 25 rows pageLength', function() {
            this.pulsarUIComponent.init();

            expect($.fn.DataTable.args[0][0].pageLength).to.equal(25);
        });

        it('should change the page length to the value provided by data-page-length', function() {
            let $tableWithPageLengthDataAttribute = $(' <table class="table datatable" data-page-length="20"></table>');
            $tableWithPageLengthDataAttribute.appendTo(this.$body);

            this.pulsarUIComponent.init();

            expect($.fn.DataTable.args[0][0].pageLength).to.equal(20);
        });

        it('should initialise datatables with the default DOM option value', function() {
            this.pulsarUIComponent.init();

            expect($.fn.DataTable.args[0][0].dom).to.equal('<"dataTables_top"Birf><"dataTables_actions"T>t<"dataTables_bottom"pl>');
        });

        it('should change the DOM option value when data-select is false', function() {
            let $tableWithSelectFalseDataAttribute = $(' <table class="table datatable" data-select="false"></table>');
            $tableWithSelectFalseDataAttribute.appendTo(this.$body);

            this.pulsarUIComponent.init();

            expect($.fn.DataTable.args[0][0].dom).to.equal('<"dataTables_top"irf><"dataTables_actions"T><"dt-disable-selection"t><"dataTables_bottom"pl>');
        });
    });
});
