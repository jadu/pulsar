var $ = require('jquery'),
    sticky = require('jquery-sticky');

function FlashMessageComponent(html) {

    this.$html = html;

};

FlashMessageComponent.prototype.init = function () {

    var component = this,
        prototype = '<div class="flash flash--default"><button class="close" data-dismiss="flash"><i class="icon-remove"></i></button></div>';

    component.$container = this.$html.find('.js-flash-container');
    component.$flashes = this.$html.find('.flash');

    if (!component.$container.length) {
        throw new Error('Missing container with class .js-flash-container');
    }

    component.$prototype = $(prototype);

    component.$flashes.on('click', '[data-dismiss=flash]', function (e) {
        component.dismiss($(this).closest('.flash'));
    });

    return true;
};

FlashMessageComponent.prototype.success = function (message) {

    var component = this,
        $flash;

    if (!message) {
        message = 'Success!';
    }

    $flash = component.render(message, 'success', 'icon-ok');

    return true;
};

FlashMessageComponent.prototype.error = function (message) {

    var component = this,
        $flash;

    if (!message) {
        message = 'There was an error, but no error message was supplied.';
    }

    $flash = component.render(message, 'error', 'icon-warning-sign');

    return true;
};

FlashMessageComponent.prototype.warning = function (message) {

    var component = this,
        $flash;

    if (!message) {
        message = 'Something kinda bad happened, but no warning message was supplied.';
    }

    $flash = component.render(message, 'warning', 'icon-warning-sign');

    return true;
};

FlashMessageComponent.prototype.info = function (message) {

    var component = this,
        $flash;

    if (!message) {
        message = 'Something happened that you should know about, but we forgot to say what it was...';
    }

    $flash = component.render(message, 'info', 'icon-info-sign');

    return true;
};

FlashMessageComponent.prototype.render = function (message, type, icon) {

    var component = this,
        $prototype = $(component.$prototype.clone());

    if (!type) {
        type = 'success';
    }

    if (!icon) {
        icon = 'icon-info-sign';
    }

    $prototype
        .append($('<i class="' + icon + '"></i> ' + message +'</span>'))
        .removeClass('flash--default')
        .addClass('flash--' + type);

    component.$container
        .append($prototype)
        .on('click', '[data-dismiss=flash]', function (e) {
            component.dismiss($(this).closest('.flash'));
        });

    return true;
};

FlashMessageComponent.prototype.dismiss = function (target) {
    $(target).slideUp('100', function() {
        $(this).remove();
    })
};

module.exports = FlashMessageComponent;
