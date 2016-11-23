var $ = require('jquery');

function PulsarSortableComponent(html) {

    this.$html = html;

};

PulsarSortableComponent.prototype.init = function () {

    var component = this;

    this.initTables();
};

PulsarSortableComponent.prototype.initTables = function () {

    var component = this;

    this.$html.find('.table.is-sortable tbody').sortable({
        placeholder: 'is-sorting',
        helper: component.fixHelper,
        opacity: 0.9,
        create: function(e, ui) {
            component.addOrder();
        },
        start: function(e, ui) {
            $(ui.helper).addClass('is-dragging');
        },
        update: function(e, ui) {
            var $item = $(ui.item);

            $item.addClass('has-success fade', function() {
                setTimeout(function() {
                    $item.removeClass('has-success fade');
                }, 2500);
            });

            component.updateOrder();

        }
    }).disableSelection();
};

PulsarSortableComponent.prototype.fixHelper = function(e, ui) {

    ui.children().each(function() {
        $(this).width($(this).width());
    });

    return ui;
};

PulsarSortableComponent.prototype.addOrder = function(e, ui) {

    var component = this;

    component.$html.find('.table.is-sortable tr > td:first-of-type').each(function(i) {
        var $this = $(this),
            label = $(this).text();

        i++;

        $this.html('<span class="sortable__count js-sortable-count">' + i + '</span> ' + label);
    });
};

PulsarSortableComponent.prototype.updateOrder = function(e, ui) {

    this.$html.find('.table.is-sortable .js-sortable-count').each(function(i) {
        var $this = $(this),
            label = $(this).text();

        i++;

        $this.text(i);
    });
};

module.exports = PulsarSortableComponent;
