(function ($) {

  // Protect IE8 from any erroneous console.log uses which would break everything
  if (!window.console) {
      console = { log: function() {} }
  };

  var $html = $('html'),
      lt10 = $html.hasClass('lt-ie10');

  pulsar.pulsarUI = new pulsar.PulsarUIComponent($html, window.History);

  $(function () {
    pulsar.pulsarUI.init();
  });

}(jQuery));
