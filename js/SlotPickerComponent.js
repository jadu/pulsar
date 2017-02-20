'use strict';

var $ = require('jquery'),
    moment = require('../libs/moment/moment');

require('../libs/pikaday/plugins/pikaday.jquery');

function SlotPickerComponent(html) {

    this.$html = html;

}

SlotPickerComponent.prototype.init = function () {

    var component = this;

    var enabledDates = ['2017-02-09', '2017-02-10', '2017-02-13', '2017-02-14', '2017-02-15', '2017-02-16', '2017-02-17', '2017-02-25'];

    var amSlots = {
        '11:00 am - 11:20 am': false,
        '11:20 am - 11:40 am': false
    }
    var pmSlots = {
        '04:00 pm - 04:20 pm': false,
        '04:20 pm - 04:40 pm': true
    };

    $('.js-slotpicker-value').pikaday({
        format: 'DD/MM/YYYY',
        bound: false,
        container: $('.js-slotpicker-calendar')[0],
        events: ['Thu Feb 09 2017'],
        firstDay: 1,
        disableDayFn: function (date) {
            if ($.inArray(moment(date).format("YYYY-MM-DD"), enabledDates) === -1) {
                return date;
            }
        },
        onSelect: function(date) {
            $('.slotpicker-slots__heading').html('Available slots on ' + moment(date).format("ddd Do MMM"));
            component.updateSlots(amSlots, pmSlots)
        }
    });
};

SlotPickerComponent.prototype.updateSlots = function (amSlots, pmSlots) {

    var component = this,
        amSlotsList = '',
        pmSlotsList = '';

        $.each(amSlots, function(slot, booked) {

            if (booked) {
                amSlotsList += '<li class="slotpicker-slots__slot">' + slot + ' <span class="label label--success pull-right"><i aria-hidden="true" class="icon-ok"></i> Booked</span></li>';
            }
            else {
                amSlotsList += '<li class="slotpicker-slots__slot">' + slot + ' <button class="btn pull-right btn--small btn--outline">Choose</button></li>';
            }
        });

        $.each(pmSlots, function(slot, booked) {

            if (booked) {
                pmSlotsList += '<li class="slotpicker-slots__slot">' + slot + ' <span class="label label--success pull-right"><i aria-hidden="true" class="icon-ok"></i> Booked</span></li>';
            }
            else {
                pmSlotsList += '<li class="slotpicker-slots__slot">' + slot + ' <button class="btn pull-right btn--small btn--outline">Choose</button></li>';
            }
        });

        $($('.slotpicker-slots__list')[0]).html(amSlotsList);
        $($('.slotpicker-slots__list')[1]).html(pmSlotsList);

};

module.exports = SlotPickerComponent;
