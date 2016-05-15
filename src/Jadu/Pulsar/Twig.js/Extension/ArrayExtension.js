var _ = require('lodash');

function ArrayExtension() {
}

ArrayExtension.prototype.getName = function () {
    return 'array_extension';
};

ArrayExtension.prototype.excludeFromArray = function (arr, exclude) {
    if (arr === undefined) {
        return [];
    }

    if (typeof(arr) !== 'object') {
        return arr;
    }

    if (exclude === false || exclude === null || exclude === '') {
        return arr;
    }

    if (typeof(exclude) === 'string') {
        exclude = exclude.split(' ');
    }

    if (exclude.length === 0) {
        return arr;
    }

    //Cleanup twig.js special key
    delete arr._keys;

    exclude = _.flatten(_.map(exclude, function (value) {
        if (value.indexOf(' ') >= 0) {
            return _.map(value.split(' '), function (splitValue) {
                return splitValue.toLowerCase();
            });
        }

        return value.toLowerCase();
    }));

    var omitted = _.filter(_.keys(arr), function (value, key) {
        return !_.includes(exclude, value);
    });

    return _.pick(arr, omitted);
};

ArrayExtension.prototype.onlyFromArray = function (arr, only) {
    if (typeof(arr) !== 'object') {
        return arr;
    }

    if (only === false || only === null || only === '') {
        return {};
    }

    if (typeof(only) === 'string') {
        only = only.split(' ');
    }

    if (only.length === 0) {
        return {};
    }

    //Cleanup twig.js special key
    delete arr._keys;

    only = _.flatten(_.map(only, function (value) {
        if (value.indexOf(' ') >= 0) {
            return _.map(value.split(' '), function (splitValue) {
                return splitValue.toLowerCase();
            });
        }

        return value.toLowerCase();
    }));

    return _.pick(arr, only);
};

ArrayExtension.prototype.install = function (Twig) {
    Twig.extendFilter('exclude', this.excludeFromArray);
    Twig.extendFilter('only', this.onlyFromArray);
};

module.exports = ArrayExtension;
