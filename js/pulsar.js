/**
 * Set up Pulsar's UI environment
 */

define(['jquery'], function() {

    $(document).ready(function() {

        // Set up Pulsar's UI environment
        require([
            'actions-menu',
            'bootstrap-tour',
            'tooltip',
            'sticky',
            'datagrid',
            'tooltip',
            'highlightjs',
            'jquery-placeholder'
            ], function() {

            // tooltips (js/tooltip.js)
            //$('[data-toggle="tooltips"]').tooltip();

            // actions menu
            $('.actions-menu').actionsMenu();

            // sticky toolbar
            //$('.toolbar').sticky({topSpacing: 0});

            // tooltips (js/tooltip.js)
            $('[data-toggle="tooltips"]').tooltip();

            // datagrid
            $('.table--datagrid').each(function() {
                $(this).datagrid();
            });

            // syntax highlighting
            if (!$('html.ie7').size()) { // IE8 and up only
                var aCodes = document.getElementsByTagName('pre');
                for (var i=0; i < aCodes.length; i++) {
                    hljs.highlightBlock(aCodes[i]);
                }
            };

            // Don't allow disabled links, or links with popovers to be clicked
            $('a.disabled').on('click', function(e) {
                e.preventDefault();
                e.stopPropagation();
            });

            $('a.has-popover').on('click', function (e) {
                e.preventDefault();
                e.stopPropagation();

                $(this).addClass('active');
            });

            $('[data-toggle*=button]').on('click', function(e) {
                $(this).toggleClass('active');
            });

            // Add placholder support for browsers that don't support it
            $('input, textarea').placeholder();

            // Add placholder support for browsers that don't support it
            $('input:not([data-datepicker=true]), textarea').placeholder();

        });


// To clean up -----------------

        // date pickers
        require(['pikaday', 'sticky'], function(Pikaday) {
            $('[data-datepicker=true]').each(function() {
                new Pikaday({
                    field: this,
                    format: 'ddd DD/MM/YYYY'
                });
            });
        });

        // TODO: Move this to the dashboard view
        require(['dashboard'], function() {
            $('.dashboard').dashboard();
        });



        // Show and hide mobile-only elements
        function mobileToggle() {
            $('[data-mobile-toggle-button]').each(function() {
                var target = $(this).attr('data-toggle-target');

                if (!window.matchMedia('(min-width: 768px)').matches) {
                    $(target).each(function() {
                        if (!($(this).parents(target).length)) {
                            $(this).attr('data-mobile-togglable', '').show();
                        }
                    });

                    $(this).off('click.mobileToggle touchenter.mobileToggle').on('click.mobileToggle touchenter.mobileToggle', function(e) {
                        e.preventDefault();

                        if (target === '.tabs__list') {
                            $(target + '[data-mobile-togglable]').css({'top': ($('.toolbar').outerHeight())});
                        }

                        $(this).toggleClass('toggled');
                        $(target + '[data-mobile-togglable]').toggleClass('toggled');
                    });
                }
                else {
                    $(this).removeClass('toggled');
                    $(target + '[data-mobile-togglable]').removeAttr('data-mobile-togglable').removeClass('toggled');
                }
            });
        }
        mobileToggle();

        // Make datagrid tables look better on smaller viewports
        function mobileTables() {
            $('.table--datagrid tr td').each(function() {
                var tableCellPosition = $(this).index() + 1,
                    tableHeader = $(this).closest('table').find('th:nth-child(' + tableCellPosition + ')').text();

                $(this).attr('data-table-header', tableHeader);
            });
        }
        mobileTables();

        // Responsive actions menu positioning
        var mobileMenu = $('.actions-menu .dropdown__menu').clone()

        $('.toolbar').append(mobileMenu);
        // console.log($('.toolbar > .dropdown__menu'));
        // $('.toolbar > .dropdown__menu').addClass('mobile-actions-menu').show();

        // function actionsMenu() {
        //     if (window.matchMedia('(max-width: 767px)').matches) {
        //         var topHidden = -($('.mobile-actions-menu').outerHeight() + $('.toolbar').outerHeight()),
        //             topRevealed = $('.toolbar').outerHeight() - parseInt($('.actionsbar--left').css('marginTop'));

        //         // $('.actions-menu .dropdown__menu').hide();
        //         //if ($('.toolbar .dropdown__menu').length < 1) {
        //         //}
        //         // ({'top': topHidden}).show().parent().removeClass('open');

        //         $('.actions-menu [data-toggle=dropdown]').on('click touchenter', function() {
        //             if ((!$(this).parent().hasClass('open')) && window.matchMedia('(max-width: 767px)').matches) {
        //                 $('.mobile-actions-menu').css({'marginTop': 0});
        //             }
        //             else if (window.matchMedia('(max-width: 767px)').matches) {
        //                 $('.mobile-actions-menu').css({'marginTop': topHidden});
        //             }
        //         });
        //     }
        //     else {
        //         $('.actions-menu .dropdown__menu').removeAttr('style');
        //     }
        // }
        // actionsMenu();

        // Do these things whenever the window resizes
        $(window).resize(function() {
            mobileToggle();
            // actionsMenu();

            // Refresh positions of sticky elements
            console.log($('.is-sticky'));
            $('.is-sticky').sticky('update');

            $('.tabs__list[data-mobile-togglable]').css({'top': ($('.toolbar').outerHeight() - 3)});
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
                    var label,
                        startLabel = start.format('MMMM D, YYYY'),
                        endLabel = end.format('MMMM D, YYYY');

                    if (startLabel === endLabel) {
                        label = startLabel;
                    } else {
                        label = startLabel + ' - ' + endLabel;
                    }
                    $('[data-daterange]').html('<strong>Created:</strong> ' + label);
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


