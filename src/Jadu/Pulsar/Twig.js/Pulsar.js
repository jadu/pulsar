var _ = require('lodash');

var ArrayExtension = require('./Extension/ArrayExtension');
var AttributeParserExtension = require('./Extension/AttributeParserExtension');
var RelativeTimeExtension = require('./Extension/RelativeTimeExtension');
var TabsExtension = require('./Extension/TabsExtension');
var UrlParamsExtension = require('./Extension/UrlParamsExtension');

var TwigModule;

var Pulsar = function () {
    this.extensions = {
        'Array': new ArrayExtension(),
        'AttributeParser': new AttributeParserExtension(),
        'RelativeTime': new RelativeTimeExtension(),
        'Tabs': new TabsExtension(),
        'UrlParams': new UrlParamsExtension()
    };
};

Pulsar.prototype.installExtensions = function () {
    _.each(this.extensions, function (extension) {
        extension.install(TwigModule);
    });
};

module.exports = function (Twig) {
    TwigModule = Twig;
    return new Pulsar();
};
