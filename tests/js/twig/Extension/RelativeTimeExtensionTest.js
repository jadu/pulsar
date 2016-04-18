var BaseTest = require('./helpers/BaseTest');
var RelativeTimeExtension = require('../../../../src/Jadu/Pulsar/Twig.js/Extension/RelativeTimeExtension');

function RelativeTimeExtensionTest() {
    BaseTest.call(this);
    this.testName = path.basename(module.filename, path.extname(module.filename));
    this.extension = new RelativeTimeExtension();
}

util.inherits(RelativeTimeExtensionTest, BaseTest);

var test = new RelativeTimeExtensionTest();
test.injectClass('RelativeTimeExtension', RelativeTimeExtension);
test.run();
