var $ = require('jquery'),
    countdown  = require('../libs/jquery.countdown/dist/jquery.countdown.min');

function PulsarUIComponent(html) {

    this.$html = html;

};

PulsarUIComponent.prototype.init = function () {

    var component = this;

    // Stop disabled links from being interactive
    this.$html.on('click', 'a[disabled]', function(e) {
        e.preventDefault();
    });

    // Initial basic implementation of https://github.com/hilios/jQuery.countdown
    this.$html.find('.js-countdown').each(function() {
        var $this = $(this),
            format = '%ww %dd %Hh %Mm %S';

        if (typeof $this.data('format') !== 'undefined') {
            format = $this.data('format');
        }

        $this.countdown($this.data('final-date'), function(event) {
            $(this).html(event.strftime(format));
        });
    });

};

module.exports = PulsarUIComponent;
