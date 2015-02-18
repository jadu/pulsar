(function () {

  // Set up a Jadu global, if we don't already have one
  if (!window.jadu) {
    window.jadu = {};
  }

  // Set RequireJS path (used by main.js)
  if (!window.jadu.requireJsPath) {
      window.jadu.requireJsPath = '/permanent/pulsar/';
  }

}());
