module.exports.initComplete = function () {
    let pagination = $(this).closest('.dataTables_wrapper').find('.dataTables_paginate');

    if (this.api().page.info().pages > 1) {
        pagination.wrap('<nav aria-label="Table pagination"></nav>');
    }
}
