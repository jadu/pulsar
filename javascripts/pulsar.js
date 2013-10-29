/**
 * Set up Pulsar's UI environment
 */

require(['jquery'], function() {

    $(document).ready(function() {
    
        // Stick the Jadu toolbar to the top of the window
        require(['sticky'], function() {
            $('.toolbar').sticky({topSpacing: 0});
        });

        // Init tooltips
        require(['tooltip'], function() {
            $('[data-toggle="tooltip"]').tooltip();
        });

        // Trigger syntax highlighting
        if (!$('html.ie7').size()) { // IE8 and up only
            require(['highlightjs'], function() {
                var aCodes = document.getElementsByTagName('pre');
                for (var i=0; i < aCodes.length; i++) {
                    hljs.highlightBlock(aCodes[i]);
                }
            });
        }

        // Show summary panels based on their data-tab value
        require(['tab'], function() {
            $('a[data-toggle="tab"]').on('shown.bs.tab', function (e) {
                e.target // activated tab
                e.relatedTarget // previous tab
                $('.summary .open').removeClass('open').hide();

                var $container = $('.summary');
                var $summary = $('.summary-' + $(e.target).attr('href').substring(1)).parent();

                if ($summary.length) {
                    $container.show();
                    $summary.show().addClass('open');
                } else {
                    $container.hide();
                    $summary.hide();
                }
            });
        });

        require(['jquery'], function() {
            // Subnavigation collapse (copied from daux.io, should be made nicerer)
            $('.aj-nav').click(function(e) {
                e.preventDefault();
                $(this).parent().siblings().find('ul').slideUp().parent().removeClass('is-active');
                $(this).parent().addClass('is-active');
                $(this).next().slideToggle('fast');
            });
        });

        require(['jquery'], function() {
            $('.tabs__list [data-toggle="tab"]').click(function(e) {
                e.preventDefault();
                $(this).parent().siblings().find('ul').slideUp('fast').parent().removeClass('is-active');
                $('.tabs__list', $(this).parent()).slideToggle('fast'); 
            });
        });

        require(['daterange'], function() {
            $('[data-daterange]').daterangepicker(
                {
                  ranges: {
                     'Today': [moment(), moment()],
                     'Yesterday': [moment().subtract('days', 1), moment().subtract('days', 1)],
                     'Last 7 Days': [moment().subtract('days', 6), moment()],
                     'Last 30 Days': [moment().subtract('days', 29), moment()],
                     'This Month': [moment().startOf('month'), moment().endOf('month')],
                     'Last Month': [moment().subtract('month', 1).startOf('month'), moment().subtract('month', 1).endOf('month')]
                  },
                  startDate: moment().subtract('days', 29),
                  endDate: moment()
                },
                function(start, end) {
                    $('#reportrange span').html(start.format('MMMM D, YYYY') + ' - ' + end.format('MMMM D, YYYY'));
                }
            );
        });

    });
});


