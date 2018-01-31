// Lexicon Favicon Example

module.exports = function () {
    var $notificationCircle = $('#notification-circle'),
        $resetNotification = $('#notification-reset');

    if ($notificationCircle.length) {
        $notificationCircle.on('click', function (event) {
            event.preventDefault();
            pulsar.faviconEditor.restore();
            pulsar.faviconEditor.addCircleNotification('red');
        });

        $resetNotification.on('click', function (event) {
            event.preventDefault();
            pulsar.faviconEditor.restore();
        });
    }
};




