const { drawCallback } = require('../../../../js/DataTables/dataTablesDrawCallback'),
    $ = require('jquery');

describe('datatablesDrawCallback', () => {
    const infoStub = sinon.stub().returns({
        pages: 666
    });

    let $body,
        $dataTableWrapper,
        $datatable,
        $datatablePagination,
        drawCallbackWithContext;

    beforeEach(() => {
        $body = $('body');
        $dataTableWrapper = $(`<div class="dataTables_wrapper"></div>`).appendTo($body);
        $datatable = $(`<div class="fake-table"></div>`).appendTo($dataTableWrapper);
        $datatablePagination = $(`
            <div class="dataTables_paginate">
                <a class="paginate_button first disabled">First</a>
                <a class="paginate_button previous disabled">Previous</a>
                <a class="paginate_button current">1</a>
                <a class="paginate_button">2</a>
                <a class="paginate_button next">Next</a>
                <a class="paginate_button last">Last</a>
            </div>
        `).appendTo($dataTableWrapper);

        $datatable.api = sinon.stub().returns({
            page: {
                info: infoStub
            }
        });
    });

    afterEach(() => {
        $body.empty()
    });

    it('should add aria-current="true" to the current page', () => {
        drawCallbackWithContext = drawCallback.bind($datatable);
        drawCallbackWithContext();

        expect($datatablePagination.find('.paginate_button.current').attr('aria-current')).to.equal('true');
    });

    it('should hide disabled links', () => {
        drawCallbackWithContext = drawCallback.bind($datatable);
        drawCallbackWithContext();

        expect($datatablePagination.find('.paginate_button.disabled').hasClass('u-display-none')).to.be.true;
    });

    it('should add aria-labels to the numbered links', () => {
        drawCallbackWithContext = drawCallback.bind($datatable);
        drawCallbackWithContext();

        expect($datatablePagination.find('.paginate_button.current').attr('aria-label')).to.equal('Page 1');
        expect($datatablePagination.find('.paginate_button:contains("2")').attr('aria-label')).to.equal('Page 2');
    });

    describe('When there is more than 1 page of results', () => {
        it('should show pagination', () => {
            drawCallbackWithContext = drawCallback.bind($datatable);
            drawCallbackWithContext();

            expect($datatablePagination.is(':visible')).to.be.true;
        });
    });

    describe('When there is less than 2 pages of results', () => {
        it('should not show pagination', () => {
            infoStub.returns({
                pages: 1
            });

            drawCallbackWithContext = drawCallback.bind($datatable);
            drawCallbackWithContext();

            expect($datatablePagination.is(':visible')).to.be.false;
        });
    });
});
