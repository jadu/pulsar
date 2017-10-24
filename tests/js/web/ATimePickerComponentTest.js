import $ from 'jquery';
import TimePickerComponent from '../../../js/TimePickerComponent';

describe('TimePickerComponent', () => {
	let $element;
	let timePickerComponent;

	beforeEach(() => {
		$element = $('<input type="text"/>');

		$.fn.timepicker = sinon.stub().returnsThis();

		timePickerComponent = new TimePickerComponent();
	});

	afterEach(() => {
        delete $.fn.timepicker;
    });

    describe('bindTimePicker()', () => {

		it('should throw an error if $element isn’t passed to the component', () => {
			expect(() => {
                timePickerComponent.bindTimePicker();
            }).to.throw('$element must be passed to TimePickerComponent');
		});

		it('should initialize a timepicker on the $element', () => {
			timePickerComponent.bindTimePicker($element);
			
			expect($.fn.timepicker).to.have.been.called;
		});
	});
});
