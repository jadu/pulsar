var _ = require('lodash'),
    moment = require('moment');

function RelativeTimeExtension() {
}

RelativeTimeExtension.prototype.getName = function () {
    return 'relative_time_extension';
};

RelativeTimeExtension.prototype.timeAgo = function (time_from) {
    if (!time_from) {
        return false;
    }

    return moment.unix(time_from).fromNow();
};

module.exports = RelativeTimeExtension;
