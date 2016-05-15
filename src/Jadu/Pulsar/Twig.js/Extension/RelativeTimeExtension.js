var _ = require('lodash'),
    moment = require('moment');

function RelativeTimeExtension() {
    moment.updateLocale('en', {
        relativeTime : {
            future: "in %s",
            past:   "%s ago",
            s:  function (number, withoutSuffix, key, isFuture) {
                var plural = (number < 2) ? " second" : " seconds";
                return number + plural;
            },
            m:  "%d minute",
            mm: "%d minutes",
            h:  "%d hour",
            hh: "%d hours",
            d:  "%d day",
            dd: "%d days",
            M:  "%d month",
            MM: "%d months",
            y:  "%d year",
            yy: "%d years"
        }
    });
}

RelativeTimeExtension.prototype.getName = function () {
    return 'relative_time_extension';
};

RelativeTimeExtension.prototype.timeAgo = function (time_from) {
    if (time_from === undefined || time_from === null) {
        return false;
    }

    if (_.isDate(time_from)) {
        time_from = time_from.getTime()/1000;
    }

    var time_now = new Date().getTime()/1000;

    if ((time_from-time_now) === 0) {
        return 'just now';
    }

    return moment.unix(time_from).fromNow();
};

RelativeTimeExtension.prototype.install = function (Twig) {
    Twig.extendFilter('time_ago', this.timeAgo);
};

module.exports = RelativeTimeExtension;
