const { initComplete } = require('../../../../js/DataTables/dataTablesInitComplete'),
    $ = require('jquery');

describe('dataTablesInitComplete', () => {
    let $body,
        $dataTableWrapper,
        $datatable,
        $datatablePagination,
        initCompleteWithContext;

    beforeEach(() => {
        $body = $('body');
        $dataTableWrapper = $(`<div class="dataTables_wrapper"></div>`).appendTo($body);
        $datatable = $(`<div class="fake-table"></div>`).appendTo($dataTableWrapper);
        $datatablePagination = $(`<div class="dataTables_paginate"></div>`).appendTo($dataTableWrapper);
    });

    afterEach(() => {
        $body.empty()
    });

    describe('When the datatable has more than one page', () => {
        beforeEach (() => {
            const infoStub = sinon.stub().returns({
                pages: 666
            });

            $datatable.api = sinon.stub().returns({
                page: {
                    info: infoStub
                }
            });

            initCompleteWithContext = initComplete.bind($datatable);
            initCompleteWithContext();
        });

        it('should wrap the datatable pagination in a nav element if there are pages', () => {
            expect($datatablePagination.parent().is('nav')).to.be.true;
        });

        it('should add an accessible name to the wrapping nav element if there are pages', () => {
            expect($datatablePagination.parent().attr('aria-label')).to.equal('Table pagination');
        });
    });

    describe('When the datatable has less one or fewer pages', () => {
        beforeEach (() => {
            const infoStub = sinon.stub().returns({
                pages: 0
            });

            $datatable.api = sinon.stub().returns({
                page: {
                    info: infoStub
                }
            });

            initCompleteWithContext = initComplete.bind($datatable);
            initCompleteWithContext();
        });

        it('should not wrap the datatable pagination in a nav element if there are no pages', () => {
            expect($datatablePagination.parent().is('nav')).to.be.false;
        });
    });
});
