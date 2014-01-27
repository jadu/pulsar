/**
 * Set up Pulsar's UI environment
 */

define(['jquery'], function() {

    $(document).ready(function() {

        // Set up Pulsar's UI environment
        require(['tooltip', 'sticky', 'zeroclipboard', 'datagrid'], function() {

            // tooltips
            $('[data-toggle="tooltip"]').tooltip();

            // datagrid
            $('.table--datagrid').datagrid();

            // sticky toolbar
            $('.toolbar').sticky({topSpacing: 0});

            // syntax highlighting
            if (!$('html.ie7').size()) { // IE8 and up only
                var aCodes = document.getElementsByTagName('pre');
                for (var i=0; i < aCodes.length; i++) {
                    hljs.highlightBlock(aCodes[i]);
                }
            };

            // copy to clipboard
            $('[data-action=clipboard]').on('click', function(e) {
                console.log($(this));
                e.preventDefault();
                var clip = new ZeroClipboard($(this), {
                    moviePath: 'libs/zeroclipboard/ZeroClipboard.swf'
                });
                console.log('clip');
                clip.on('load', function(client) {
                    console.log('loaded');
                    client.on('complete', function(client, args) {
                        console.log('copied');
                    });                    
                });
            });

        });

// To clean up -----------------

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

        // $('[data-popover-content]').popover({ 
        //     html : true, 
        //     placement: 'bottom',
        //     content: function() {
        //       return $($(this).data('popoverContent'));
        //     }
        // });

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

        // toggle a given element
        $('[data-toggle]').on('click', function(e) {
            $target = $('.' + $(this).data('toggle'));
            $target.slideToggle(100);
        });

    });
});


