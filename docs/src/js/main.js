(function ($) {

    // Protect IE8 from any erroneous console.log uses which would break everything
    if (!window.console) {
        console = { log: function() {} }
    };

    var $html = $('html'),
        lt10 = $html.hasClass('lt-ie10');

    $html.removeClass('no-js');

    pulsar.accordion = new pulsar.AccordionComponent($html);

    $(function () {
        console.log(pulsar);
        pulsar.accordion.init();
    });

}(jQuery));
