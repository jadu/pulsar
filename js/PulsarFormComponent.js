'use strict';

var $ = require('jquery');

require('../libs/pikaday/plugins/pikaday.jquery');
require('../libs/select2/dist/js/select2.min');
require('../libs/spectrum/spectrum');
var moment = require('../libs/moment/moment');

function PulsarFormComponent(html) {
    this.$html = html;
}

PulsarFormComponent.prototype.init = function () {
    var component = this;

    // Colourpickers
    component.initColourpickers();

    // Attach basic pikaday to datepicker fields
    this.$html.find('[data-datepicker=true]').pikaday({
        format: 'DD/MM/YYYY'
    });

    component.$select2 = this.$html.find('.js-select2:not([data-init="false"])');

    component.$select2.each(function() {
        var $this = $(this);

        function formatOption(data) {
            return $('<span>' + data.text + '</span>');
        }

        if ($this.data('html')) {
            $this.select2({
                templateResult: formatOption,
                templateSelection: formatOption
            });

        } else {
            $this.select2();
        }
    });

    // Block styled checkboxes and radios
    var choiceBlock = component.$html.find(".choice--block");

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

PulsarFormComponent.prototype.initColourpickers = function() {
    var component = this,
        pickers = component.$html.find('.js-colorpicker');

    pickers.each(function() {

        var $this = $(this),
            $input = $this.find('.form__control'),
            $pickerInput = $($.parseHTML('<input>')),
            disabledAttr = $input.attr('disabled'),
            isDisabled = false;

        if (typeof disabledAttr !== typeof undefined && disabledAttr !== false) {
            isDisabled = true;
        }

        $pickerInput.insertAfter($input);

        // changing the picker should update the input
        $pickerInput.spectrum({
            color: '#' + $input.val(),
            disabled: isDisabled,
            showInput: false,
            preferredFormat: 'hex',
            replacerClassName: 'btn',
            change: function (color) {
                if (!$input.attr('disabled')) {
                    $input.val(('' + color).substring(1));
                    $input.trigger('change');
                }
            }
        });

        // changing the input should update the picker
        $input.on('change', function () {
            $pickerInput.spectrum('set', '#' + $input.val());
        });
    });

};

PulsarFormComponent.prototype.selectionButtons = function() {
    var $target = $(this),
        $controls = $target.closest('.controls');

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
