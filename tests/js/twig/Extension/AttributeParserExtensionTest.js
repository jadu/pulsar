var BaseTest = require('./helpers/BaseTest');
var AttributeParserExtension = require('../../../../src/Jadu/Pulsar/Twig.js/Extension/AttributeParserExtension');

function AttributeParserExtensionTest() {
	BaseTest.call(this);
	this.testName = path.basename(module.filename, path.extname(module.filename));
	this.extension = new AttributeParserExtension();
}

util.inherits(AttributeParserExtensionTest, BaseTest);

var test = new AttributeParserExtensionTest();
test.injectClass('AttributeParserExtension', AttributeParserExtension);
test.run();
