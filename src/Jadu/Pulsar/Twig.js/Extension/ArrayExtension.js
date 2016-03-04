var _ = require('lodash');

function ArrayExtension() {
}

ArrayExtension.prototype.getName = function () {
    return 'array_extension';
};

ArrayExtension.prototype.excludeFromArray = function (arr, exclude) {
    arr = _.fromPairs(_.toPairs(arr));

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

    exclude = _.map(exclude, function (value) {
        return value.toLowerCase();
    });

    var omitted = _.filter(_.keys(arr), function (value, key) {
        return !_.includes(exclude, value);
    });

    return _.pick(arr,omitted);
};

ArrayExtension.prototype.onlyFromArray = function (arr, only) {
    arr = _.fromPairs(_.toPairs(arr));

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

    only = _.map(only, function (value) {
        return value.toLowerCase();
    });

    return _.pick(arr, only);
};

module.exports = ArrayExtension;
