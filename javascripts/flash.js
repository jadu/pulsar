require(['jquery', 'sticky'], function() {
    
    'use strict';

    $(document).ready(function() {

        // Look for any flashes and animate them in when the page loads
        $('.flash.is-sticky').delay('1000').slideDown('100', function() {
            $(this).sticky({topSpacing: 64}).sticky('update');
        });

        // Dismiss flash messages (taking into account the sticky wrapper)
        $('[data-dismiss="flash"]').on('click', function() {
            $(this).closest('.flash').parent().slideUp('100');
        });

    });

});