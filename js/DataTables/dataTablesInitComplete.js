module.exports.initComplete = function () {
    let pagination = $(this).closest('.dataTables_wrapper').find('.dataTables_paginate');

    pagination.wrap('<nav aria-label="Table pagination"></nav>');
}
