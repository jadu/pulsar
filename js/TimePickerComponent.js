import 'timepicker';

class TimePickerComponent {

    /**
     * Bind timepicker to element
     * @param {jQuery} $element - jQuery object of the element that requires a time picker
     * @param {Object} options - Options for the date picker, see https://github.com/jonthornton/jquery-timepicker
     */
    bindTimePicker ($element, options) {
        if (typeof $element === 'undefined' || !$element) {
            throw new Error('$element must be passed to TimePickerComponent');
        }

        $element.timepicker(options);
    }
}

module.exports = TimePickerComponent;
