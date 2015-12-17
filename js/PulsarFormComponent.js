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

};

module.exports = PulsarFormComponent;
