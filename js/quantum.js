/**
 * All of this is to be removed or merged into Pulsar proper (Stanton)
 */

define(['jquery'], function() {

    $(document).ready(function() {

        // Quantum evidence bundle download prototype UI

        require(['popover'], function() {

            $('.js-evidence-download').popover({
                html : true,
                content: function() {
                    return $('#popover_content_wrapper').html();
                }
            });

        });

        // Quantum filtering protoype UI

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

});
