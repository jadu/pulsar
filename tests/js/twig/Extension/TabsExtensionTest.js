var BaseTest = require('./helpers/BaseTest');
var TabsExtension = require('../../../../src/Jadu/Pulsar/Twig.js/Extension/TabsExtension');

function TabsExtensionTest() {
    BaseTest.call(this);
    this.testName = path.basename(module.filename, path.extname(module.filename));
    this.extension = new TabsExtension();
}

util.inherits(TabsExtensionTest, BaseTest);

var test = new TabsExtensionTest();
test.injectClass('TabsExtension', TabsExtension);
test.run();
