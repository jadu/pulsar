var $ = require('jquery'),
    pikaday  = require('../libs/pikaday/plugins/pikaday.jquery'),
    select2  = require('../libs/select2/dist/js/select2.min');

    require('spectrum-colorpicker');

function PulsarFormComponent(html) {

    this.$html = html;

};

PulsarFormComponent.prototype.init = function () {

    var component = this;

    // Colourpickers
    component.initColourpickers();

    // Attach basic pikaday to datepicker fields
    this.$html.find('[data-datepicker=true]').pikaday({
        format: 'DD/MM/YYYY'
    });

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

    console.log('init colourpickers');

    var component = this,
        pickers = component.$html.find('.js-colourpicker');

    // Create a shadow input to hold the colour value from the picker
    component.$pickerInput = $($.parseHTML('<input>'));

    pickers.each(function(e) {

        var $this = $(this),
            $input = $this.find('.form__control');

        component.$pickerInput.insertAfter($input);

        component.$pickerInput.spectrum({
            color: '#' + $input.val(),
            showInput: false,
            preferredFormat: 'hex',
            replacerClassName: 'btn',
            change: function (color) {
                $input.val(('' + color).substring(1));
                $input.onChange();
            }
        });

        $input.on('change', function () {
            console.log($this.val());
            component.$pickerInput.spectrum('set', '#' + $this.val());

            $this.onChange();
        });
    });
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
