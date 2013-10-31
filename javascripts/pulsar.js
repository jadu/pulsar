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

    });
});


