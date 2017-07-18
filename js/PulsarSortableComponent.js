'use strict';

/* jshint: global e, ui */

var $ = require('jquery');

require('../libs/jquery-ui/jquery-ui.min');

function PulsarSortableComponent(html, window) {
    this.$html = html;
    this.window = window;
}

PulsarSortableComponent.prototype.init = function () {
    var component = this;

    component.initTables();
};

PulsarSortableComponent.prototype.initTables = function () {
    /* istanbul ignore next: difficult to test jQueryUI sortable behaviour */
    var component = this,
        fakeUi = {},
        currentRow,
        linkContainer,
        moveLinks,
        update = function (e, ui, $sortableElement) {
            var $item = $(ui.item);

            $item.removeClass('is-dragging').addClass('has-success fade', function() {
                setTimeout(function() {
                    $item.removeClass('has-success fade');
                }, 2500);
            });

            component.updateOrder();

        };

    /* istanbul ignore next: difficult to test jQueryUI sortable behaviour */
    this.$html.find('.table.is-sortable tbody').sortable({
        placeholder: 'is-sorting',
        helper: component.fixHelper,
        opacity: 0.9,
        create: function(e, ui) {
            component.addOrder();
        },
        start: function(e, ui) {
            $(ui.helper).addClass('is-dragging');
        }
    }).disableSelection();

     // Trigger update() on sortupdate event
     /* istanbul ignore next: difficult to test jQueryUI sortable behaviour */
    this.$html.find('.table.is-sortable tbody').on('sortupdate', function (e, ui) {
        var $sortableElement = $(this);

        update(e, ui, $sortableElement);
    });

    // Show arrows when row is tabbed to focus
    this.$html.find('[data-move]').on('focus', function () {

        // Using keydown instead of keyup as it means that the up/down controls
        // are displayed if the tab key is being held down until the right
        // element comes into focus
        $(component.window).keydown(function (e) {
            var code = (e.keyCode ? e.keyCode : e.which),
                $parentElement = $(e.target.parentElement);

            // If tab key has been pressed
            if (code === 9) {
                if ($(e.target).hasClass('hide')) {
                    $parentElement
                        .width($parentElement.width() + 40);

                    $parentElement.closest('.table.is-sortable')
                        .find('[data-move]')
                        .removeClass('hide');
                }
            }
        });
    });

    // Reorder via arrows
    this.$html.find('[data-move]').on('click keypress', function () {
        var $this = $(this),
            currentRow = $this.closest('tr'),
            linkContainer = $this.closest('td'),
            moveLinks = linkContainer.find('a');

        moveLinks.addClass('hide');
        linkContainer.addClass('u-text-align-center').append('<span class="js-sortable-moved u-no-wrap"><i class="icon-ok-sign icon--success"></i></span>');

        if ($this.attr('data-move') === 'up') {
            currentRow.prev().before(currentRow);
        }
        if ($this.attr('data-move') === 'down') {
            currentRow.next().after(currentRow);
        }

        setTimeout(function() {
            linkContainer
                .removeClass('u-text-align-center')
                .find('.js-sortable-moved')
                .remove();

            moveLinks.removeClass('hide');
        }, 1500);

        // Fake the UI object created by sortable drag and drop
        fakeUi.item = currentRow;

        // Trigger sortupdate and pass the updated row
        component.$html.find('.table.is-sortable tbody').trigger('sortupdate', [fakeUi]);
    });
};

/* istanbul ignore next: difficult to test jQueryUI sortable behaviour */
PulsarSortableComponent.prototype.fixHelper = function(e, ui) {
    ui.children().each(function() {
        $(this).width($(this).width());
    });

    return ui;
};

PulsarSortableComponent.prototype.addOrder = function() {
    var component = this;

    component.$html.find('.table.is-sortable tr > td:first-of-type').each(function(i) {
        var $this = $(this),
            label = $this.text(),
            count = i + 1;

        $this.html('<span class="sortable__count js-sortable-count">' + (count) + '</span> ' + label);
    });
};

PulsarSortableComponent.prototype.updateOrder = function() {
    var component = this;

    component.$html.find('.table.is-sortable .js-sortable-count').each(function(i) {
        $(this).text(i + 1);
    });
};

module.exports = PulsarSortableComponent;
