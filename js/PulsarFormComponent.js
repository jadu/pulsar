var $ = require('jquery'),
    select2 = require('../libs/select2/dist/js/select2.min');

function PulsarFormComponent(html) {

    this.$html = html;

};

PulsarFormComponent.prototype.init = function () {

    var component = this;

    component.$select2 = this.$html.find('.js-select2');

    component.$select2.each(function() {

        var $this = $(this);

        if ($this.data('html')) {

            function formatOption(data) {
                return $('<span>' + data.text + '</span>');
            };

            $this.select2({
                templateResult: formatOption,
                templateSelection: formatOption
            });

        } else {
            $this.select2();
        }
    });

    // Block styled checkboxes and radios
    var choiceBlock = component.$html.find(".choice--block, .choice--bubbles");

    // set up choice block states on load
    $.each(choiceBlock, function() {
        component.initSelectionButtons($(this));
    });

    // choice block click behaviour
    choiceBlock.on('change', '.controls input[type="checkbox"], .controls input[type="radio"]', component.selectionButtons);

};

PulsarFormComponent.prototype.initSelectionButtons = function(e) {

    e.find('input[type="checkbox"]:checked, input[type="radio"]:checked')
        .closest('.control__label')
        .addClass('is-selected');

};

PulsarFormComponent.prototype.selectionButtons = function() {

    var $target = $(this);

    var $controls = $target.closest('.controls');

    $controls.find('input[type="checkbox"]:not(:checked), input[type="radio"]:not(:checked)')
        .closest('.control__label')
        .removeClass('is-selected');

    if ($target.is(':checked')) {
        $target.closest('.control__label').addClass('is-selected');
    } else {
        $target.closest('.control__label').removeClass('is-selected');
    }

};

module.exports = PulsarFormComponent;
