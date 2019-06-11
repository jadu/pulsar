const { initComplete } = require('../../../../js/DataTables/dataTablesInitComplete'),
    $ = require('jquery');

describe('datatablesInitComplete', () => {
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

        initCompleteWithContext = initComplete.bind($datatable);
        initCompleteWithContext();
    });

    afterEach(() => {
        $body.empty()
    });

    it('should wrap the datatable pagination in a nav element', () => {
        expect($datatablePagination.parent().is('nav')).to.be.true;
    });

    it('should add an accessible name to the wrapping nav element', () => {
        expect($datatablePagination.parent().attr('aria-label')).to.equal('Table pagination');
    });
});
