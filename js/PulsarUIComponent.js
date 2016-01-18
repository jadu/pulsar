var $ = require('jquery');

function PulsarUIComponent(html) {

    this.$html = html;

};

PulsarUIComponent.prototype.init = function () {

    var component = this;

    // Stop disabled links from being interactive
    this.$html.on('click', 'a[disabled]', function(e) {
        e.preventDefault();
    });

};

module.exports = PulsarUIComponent;
