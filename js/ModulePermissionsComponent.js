'use strict';

var $ = require('jquery');

function ModulePermissionsComponent(html) {
    this.$html = html;
};

ModulePermissionsComponent.prototype.init = function () {

    var component = this;

    component.$html.on('click', '.js-module-toggle', component.toggleModule);
    component.$html.on('click', '.js-refine-toggle', component.toggleModulePages);

};

ModulePermissionsComponent.prototype.toggleModule = function() {

    var $toggle = $(this),
        $target = $toggle.closest('.module');

    if ($target.hasClass('is-open')) {
        $target.removeClass('is-open');
        $toggle.html('<i class="icon-caret-down"></i>');
    }
    else {
        $target.addClass('is-open');
        $toggle.html('<i class="icon-caret-up"></i>');
    }

};

ModulePermissionsComponent.prototype.toggleModulePages = function() {

    var $toggle = $(this),
        $target = $toggle.closest('.module-page');

    if ($target.hasClass('is-open')) {
        $target.removeClass('is-open');
        $toggle.text('refine');
    }
    else {
        $target.addClass('is-open');
        $toggle.text('close');
    }
};

module.exports = ModulePermissionsComponent;
