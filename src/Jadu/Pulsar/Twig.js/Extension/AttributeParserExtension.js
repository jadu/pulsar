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
    attributes = _.fromPairs(_.toPairs(attributes));

    if (Object.keys(attributes).length === 0) {
        return false;
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

module.exports = AttributeParserExtension;
