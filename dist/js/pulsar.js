/**
 * Set up Pulsar's UI environment
 */

define(['jquery'], function() {

    $(document).ready(function() {

        // Set up Pulsar's UI environment
        require(['tooltip', 'sticky', 'zeroclipboard', 'datagrid'], function() {      

            // tooltips (js/tooltip.js)
            $('[data-toggle="tooltips"]').tooltips();

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

            // Don't allow disabled links to be clicked
            $('a.disabled').on('click', function(e) {
                e.preventDefault();
                e.stopPropagation();
            });

            $('[data-toggle*=button]').on('click', function(e) {
                $(this).toggleClass('active');
            })

        });


// To clean up -----------------

        require(['pikaday'], function(Pikaday)
        {
            var picker = new Pikaday(
            {
                field: $('[data-datepicker=true]')[0],
                firstDay: 1,
                minDate: new Date('2000-01-01'),
                maxDate: new Date('2020-12-31'),
                yearRange: [2000,2020]
            });
        });

        // TODO: Move this to the dashboard view
        require(['dashboard'], function() {
            $('.dashboard').dashboard();
        });

        // Look for any flashes and animate them in when the page loads
        $('.flash.is-sticky').delay('1000').slideDown('100', function() {
            $(this).sticky({topSpacing: 44}).sticky('update');
        });

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

        // Switch a given element within the same data-group
        $('[data-switch]').on('click', function(e) {
            var $this = $(this);

            if ($this.hasClass('active')) {
                return false;
            } else {
                $this.siblings().removeClass('active');
            }

            $($this.data('group')).hide();
            $this.addClass('active');
            $($this.data('switch')).show();
        });

        $('[data-hide]').on('click', function(e) {
            $($(this).data('hide')).hide();
        });

        $('[data-show]').on('click', function(e) {
            $($(this).data('show')).show();
        });

    });
});


