var BaseTest = require('./helpers/BaseTest');
var UrlParamsExtension = require('../../../../src/Jadu/Pulsar/Twig.js/Extension/UrlParamsExtension');

function UrlParamsExtensionTest() {
    BaseTest.call(this);
    this.testName = path.basename(module.filename, path.extname(module.filename));
    this.extension = new UrlParamsExtension();
}

util.inherits(UrlParamsExtensionTest, BaseTest);

var test = new UrlParamsExtensionTest();
test.injectClass('UrlParamsExtension', UrlParamsExtension);
test.run();
