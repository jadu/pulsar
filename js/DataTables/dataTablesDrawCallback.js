module.exports.drawCallback = function () {
    let pagination = $(this).closest('.dataTables_wrapper').find('.dataTables_paginate'),
        paginationNumbers;

    // Only show pagination when needed
    pagination.toggle(this.api().page.info().pages > 1);

    // Add aria-current to current page number
    pagination.find('.paginate_button.current').attr('aria-current', 'true');

    // Remove disable links
    pagination.find('.paginate_button.disabled').addClass('u-display-none');

    // Add aria-labels to numbered links
    paginationNumbers = pagination.find('.paginate_button:not(.first, .previous, .next, .last)');
    paginationNumbers.each(function () {
        let $numberLink = $(this);
        $numberLink.attr('aria-label', 'Page ' + $numberLink.text());
    });
}
