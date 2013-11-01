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

                $('.summary.open').removeClass('open').hide();
                
                var $summary = '';

                if ($(e.target).parent().has('.is-active').length != 0) {
                    var $pane = $($('.is-active > a', $(e.target).parent()).attr('href'));
                    if ($pane.attr('data-summary') != 'undefined') {
                        $summary = $('[data-tab="' + $pane.attr('data-summary') + '"]');
                    }
                } else {
                    $summary = $($(e.target).attr('data-summary'));
                }

                if ($summary.length) {
                    $summary.show().addClass('open');
                } else {
                    $summary.hide();
                }
            });
        });
    

        if ($('[data-summary]').hasClass('is-active')) {
            $('[data-tab="' + $('[data-summary]').attr('href') + '"]').show();
        }

    });
});


