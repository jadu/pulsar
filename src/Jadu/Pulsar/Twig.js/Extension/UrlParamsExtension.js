var _ = require('lodash');

function UrlParamsExtension(parameters) {
    this.parameters = {};
    _.extend(this.parameters, parameters);
}

UrlParamsExtension.prototype.getName = function () {
    return 'url_params_extension';
};

UrlParamsExtension.prototype.getActiveTab = function () {
    return this.parameters.tab ? this.parameters.tab : null;
};

UrlParamsExtension.prototype.getView = function () {
    return this.parameters.view ? this.parameters.view : null;
};

UrlParamsExtension.prototype.getGlobals = function () {
    return {
        'active_tab': this.getActiveTab(),
        'view': this.getView()
    };
};

UrlParamsExtension.prototype.install = function (Twig) {
};

module.exports = UrlParamsExtension;
