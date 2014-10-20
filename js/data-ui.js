(function () {

    function applyAction($source, $target, action, actionArg) {
        switch (action) {
        case 'add-class':
            $target.addClass(actionArg);
            break;
        case 'hide':
            $target.hide();
            break;
        case 'radio-class':
            $('[data-ui-group="' + $source.data('ui-group') + '"]').removeClass(actionArg);
            $target.addClass(actionArg);
            break;
        case 'set-class':
            $target.removeClass().addClass(actionArg);
            break;
        case 'show':
            $target.show();
            break;
        case 'slideToggle':
            $target.slideToggle();
            break;
        }
    }

    $('[data-ui-action]').each(function () {
        $(this).on('change click', function () {

            var $source = $(this),
                targetSelector = $source.data('ui-target');

            applyAction(
                $source,
                // If target is not specified, the source element is the target
                targetSelector ? $(targetSelector) : $source,
                $source.data('ui-action'),
                $source.data('ui-action-arg')
            );
        });
    });

    $('[data-ui-initial-action]').each(function () {
        var $source = $(this);
        applyAction(
            $source,
            $source,
            $source.data('ui-initial-action'),
            // Use default action arg if no specific initial action arg is given
            $source.data('ui-initial-action-arg') || $source.data('ui-action-arg')
        );
    });

    // Highlight the label of a radio button-ish
    (function () {
        var $selected = $();
        $('input[type="radio"] + label.btn').on('change click', function () {
            $selected.removeClass('active');
            $selected = $(this).addClass('active');
        });
    }());

    // Apply the Chosen plugin to any fields requiring it when they first become visible
    $('select[data-ui-chosen]').each(function () {
        var $field = $(this);

        function checkVisibility() {
            if ($field.is(':visible')) {
                $field.chosen();
            } else {
                window.setTimeout(checkVisibility, 100);
            }
        }

        checkVisibility();
    });

}());
