var _ = require('lodash');

function htmlEntities(str) {
    return String(str).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}

function AttributeParserExtension() {
}

AttributeParserExtension.prototype.getName = function () {
    return 'attribute_parser_extension';
};

AttributeParserExtension.prototype.parseAttributes = function (attributes, args) {
    if (!attributes || Object.keys(attributes).length === 0) {
        return '';
    }

    var classes = attributes['class'];
    if (classes) {
        classes = classes.split(' ');
    } else {
        classes = [];
    }

    delete attributes['class'];

    var html = [''];

    var addDisabledClass = false;

    _.forEach(attributes, function (value, key) {
        if (value && !_.isArray(value)) {
            if (typeof(value) === 'boolean') {
                switch (key) {
                    case 'required':
                        html.push('aria-required="true"');
                        break;
                    case 'disabled':
                        html.push('aria-disabled="true"');
                        html.push(key);
                        addDisabledClass = true;
                        break;
                    default:
                        html.push(key);
                        break;
                }
            }
            else {
                html.push(key + '="' + htmlEntities(value) + '"');
            }
        }
    });

    if (addDisabledClass) {
        classes.push('is-disabled');
    }

    classes = _.uniq(classes);

    if (classes.length > 0) {
        html.push('class="' + classes.join(' ') + '"');
    }

    return html.join(' ');
};

AttributeParserExtension.prototype.defaultAttributes = function (attributes, defaults) {
    if (attributes === undefined || attributes === null) {
        attributes = [];
    }

    if (defaults.length !== 1) {
        throw new Error('Defaults not in expected format');
    }

    defaults = defaults.pop();

    //Clean up twig.js special feature
    delete defaults._keys;

    //Every attribute should come through, with only their values replaced with defaults.
    var out = {};

    _.each(attributes, function (value, key) {
        out[key] = value;
    });

    _.each(defaults, function (value, key) {
        if (attributes[key]) {
            out[key] = value + ' ' + attributes[key];
        } else {
            out[key] = value;
        }
    });

    return out;
};

AttributeParserExtension.prototype.install = function (Twig) {
    Twig.extendFilter('defaults', this.defaultAttributes);
    Twig.extendFunction('attributes', this.parseAttributes);
};

module.exports = AttributeParserExtension;
