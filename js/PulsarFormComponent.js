'use strict';

var $ = require('jquery'),
    TimePickerComponent = require('./TimePickerComponent');

require('../node_modules/pikaday/plugins/pikaday.jquery');
require('select2')();
require('spectrum-colorpicker');

function PulsarFormComponent(html) {
    this.$html = html;
    this.timePickerComponent = new TimePickerComponent();
}

PulsarFormComponent.prototype.init = function () {
    var component = this;

    // Colour picker
    component.initColourpickers();

    // Date picker
    component.initDatePickers();

    // Choice block
    component.initSelectionButtons();

    // Select2
    component.initSelect2(component.$html.find('.js-select2:not([data-init="false"])'));

    // Time picker
    component.initTimePickers();

    // reinitialise select2 items in a tab when the tab is focused to fix widths
    $('a[data-toggle="tab"]').on('shown.bs.tab', function (e) {
        var $target = $($(e.target).attr('href')),
            $select2 = $target.find('.js-select2:not([data-init="false"])');

        $.each($select2, function() {
            component.initSelect2($(this));
        });
    });

    // reinitialise select2 items when opening a modal to fix widths
    $('[data-toggle="modal"]').on('click', function (e) {
        var $target = $($(e.target).attr('href')),
            $select2 = $target.find('.js-select2:not([data-init="false"])');

        $target.on('shown.bs.modal', function() {
            $.each($select2, function() {
                component.initSelect2($(this));
            });
        });
    });
}

/**
 * Re-initialise the Form Component Services
 * I've intentionally left out Select2 here, as programmatic
 * control often requires more custom behaviour than simply re-init'ing
 */
PulsarFormComponent.prototype.refresh = function () {
    // Colour picker
    this.initColourpickers();

    // Date picker
    this.initDatePickers();

    // Choice block
    this.initSelectionButtons();

    // Time picker
    this.initTimePickers();
}

/**
 * Initiate a time picker on data-timepicker fields
 */
PulsarFormComponent.prototype.initTimePickers = function () {
    this.timePickerComponent.init(this.$html.find('[data-timepicker=true]'));
}

/**
 * Initiate a date picker on data-datepicker fields using pickaday
 */
PulsarFormComponent.prototype.initDatePickers = function () {
    // Attach basic pikaday to datepicker fields
    this.$html
        .find('[data-datepicker=true]')
        .pikaday({ format: 'DD/MM/YYYY' });
}

/**
 * Initiate colour pickers
 */
PulsarFormComponent.prototype.initColourpickers = function () {
    var component = this,
        pickers = component.$html.find('.js-colorpicker');

    pickers.each(function() {

        var $this = $(this),
            $input = $this.find('.form__control'),
            $pickerInput = $('<input data-colour-picker-input>'),
            disabledAttr = $input.attr('disabled'),
            isDisabled = false,
            existingPicker = $input.next('[data-colour-picker-input]');

        if (typeof disabledAttr !== typeof undefined && disabledAttr !== false) {
            isDisabled = true;
        }

        if (existingPicker.length) {
            // Remove existing colour picker elements,
            // frustratingly invoking the spectrum 'destroy'
            // method does not remove the sp-replacer
            $pickerInput.spectrum('destroy');
            existingPicker.remove();
            $input.siblings('.sp-replacer').remove();
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
}

/**
 * Update colour pickers within a scope
 * @param $root
 */
PulsarFormComponent.prototype.updateColourPicker = function ($root) {
    const $input = $root.find('.js-colorpicker .form__control');

    $input.each((index, element) => {
        const $input = $(element);
        const $picker = $input.next();

        $picker.spectrum('set', `#${$input.val()}`);
    });
}

/**
 * Initiate Selection Buttons
 */
PulsarFormComponent.prototype.initSelectionButtons = function () {
    const choiceblock = this.$html.find('.choice--block');

    choiceblock
        .find('input[type="checkbox"]:checked, input[type="radio"]:checked')
        .closest('.control__label')
        .addClass('is-selected');

    choiceblock
        .on('change', '.controls input[type="checkbox"], .controls input[type="radio"]', this.selectionButtons);
}

/**
 * Selection Button className logic
 */
PulsarFormComponent.prototype.selectionButtons = function () {
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
}

/**
 * Initiate Select2
 * @param target
 */
PulsarFormComponent.prototype.initSelect2 = function (target) {
    var $target = target;

    $target.each(function() {
        var $this = $(this),
            config = {};

        function formatOption(data) {
            return $('<span>' + data.text + '</span>');
        }

        if ($this.data('html')) {
            config.templateResult = formatOption;
            config.templateSelection = formatOption;
        }

        $this.select2(config);
        $this.parent().find('.select2-container').removeAttr('style');
    });
}

module.exports = PulsarFormComponent;
