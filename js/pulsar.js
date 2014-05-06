/**
 * Set up Pulsar's UI environment
 */

define(['jquery'], function() {

    $(document).ready(function() {

        // Set up Pulsar's UI environment
        require([
            'actions-menu',
            'tooltip',
            'sticky',
            'datagrid',
            'tooltip',
            'highlightjs'
            ], function() {

            // tooltips (js/tooltip.js)
            //$('[data-toggle="tooltips"]').tooltip();

            // actions menu
            $('.actions-menu').actionsMenu();

            // sticky toolbar
            $('.toolbar').sticky({topSpacing: 0});


            // datagrid
            $('.table--datagrid').each(function() {
                $(this).datagrid();
            });

            // sticky toolbar
            $('.toolbar').sticky({topSpacing: 0});

            // syntax highlighting
            if (!$('html.ie7').size()) { // IE8 and up only
                var aCodes = document.getElementsByTagName('pre');
                for (var i=0; i < aCodes.length; i++) {
                    hljs.highlightBlock(aCodes[i]);
                }
            };

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

        // date pickers
        require(['pikaday', 'sticky'], function(Pikaday) {
            $('[data-datepicker=true]').each(function() {
                new PikadayPikaday({
                    field: this,
                    format: 'ddd DD/MM/YYYY'
                });
            });
        });

        // TODO: Move this to the dashboard view
        require(['dashboard'], function() {
            $('.dashboard').dashboard();
        });

        // Look for any flashes and animate them in when the page loads
        $('.flash.is-sticky').delay('1000').slideDown('100', function() {
            $(this).sticky({topSpacing: 64}).sticky('update');
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

    // Quantum Control Centre Protoype UI

    require(['popover', 'vague'], function() {

        var filterTour = $('.table--datagrid .filters > th small');

        // show filter bar, show popover introducing the feature
        $('[data-show=#new-tab]').on('click', function() {

            $('.table--datagrid .filters.is-collapsed th')
                .css({
                    'border-bottom': '1px solid #ccc'
                })
                .animate({
                    paddingTop: '7px'
                }, 250, function () {
                    $('.table--datagrid .filters').removeClass('is-collapsed');
                    $('[data-show=#new-tab]').fadeOut();
                    $('.table--datagrid .filters > th small').popover('show');
                });

            $('.table--datagrid .filters.is-collapsed div')
                .animate({
                    height: '31px'
                }, 250);

        });

        function hideFilters () {
            $('.table--datagrid .filters:not(.is-collapsed) th')
                .css({
                    'border-bottom': 'none'
                })
                .animate({
                    paddingTop: '0'
                }, 250, function () {
                    $('.table--datagrid .filters').addClass('is-collapsed');
                    $('[data-show=#new-tab]').fadeIn();
                });

            $('.table--datagrid .filters:not(.is-collapsed) div')
                .animate({
                    height: '0'
                }, 250);
        }

        $('[data-filter-action=done]').on('click', function() {
            filterTour.popover('hide');
            hideFilters();
        });

        // close filter intro when a filter or an action is clicked
        $('.table--datagrid .filters .label').on('click', function () {
            filterTour.popover('hide');
        });


        $('[data-popover-content-source]').on('click', function() {
            $(this).popover({ 
                content: $('[data-popover-content=' + $(this).data('popover-content-source') + ']').html() ,
                html: true,
                placement: 'bottom'
            }).show();
        });

        $('[data-filter-action=save-as]').on('click', function() {
            var input = $('[data-filter-action=save]'),
                oldVal = input.val();

            filterTour.popover('hide');

            var vague = $('.tabs__content').Vague({
                intensity: 2
            });
            vague.blur();

            input.parent().slideDown(250);
            input.popover('show').val(oldVal).select();

        });

        $('.tabs__list').on('click', '[data-filter-action=dismiss-save-as]', function() {
            $('[data-filter-action=save]').popover('hide').parent().slideUp(250);
            filterTour.popover('hide');
            hideFilters();
            $('[data-show=#new-tab]').fadeIn();

            var vague = $('.tabs__content').Vague({
                intensity: 2
            });
            vague.destroy();
        });
    });

});


