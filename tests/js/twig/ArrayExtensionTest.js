var BaseTest = require('./helpers/BaseTest');
var ArrayExtension = require('../../../src/Jadu/Pulsar/Twig.js/Extension/ArrayExtension');

function ArrayExtensionTest() {
	BaseTest.call(this);
	this.testName = path.basename(module.filename, path.extname(module.filename));
	this.extension = new ArrayExtension();
}

util.inherits(ArrayExtensionTest, BaseTest);

var arrayExtensionTest = new ArrayExtensionTest();
arrayExtensionTest.run();
