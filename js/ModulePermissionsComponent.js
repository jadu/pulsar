'use strict';

var $ = require('jquery');

function ModulePermissionsComponent(html) {
    this.$html = html;
};

ModulePermissionsComponent.prototype.init = function () {

    var component = this;

    component.$html.on('click', '.js-module-toggle', component.toggleModuleVisibility);
    component.$html.on('click', '.js-refine-toggle', component.toggleModulePagesVisibility);

    // Module-master
    component.$html.find('.module')
        .on('click', '[data-toggle="module-master"]', component.toggleModuleMasterState)
        .on('pulsar:crud:update', '[data-toggle="module-master"]', component.setModuleMasterState)

    // Module-row
    component.$html.find('.module')
        .on('click', '[data-toggle="module-row"]', component.toggleModuleRowState)
        .on('pulsar:crud:update', '[data-toggle="module-row"]', component.setModuleRowState)

    // Module-crud 'headers'
    component.$html.find('.module')
        .on('click', '[data-toggle="module-crud"]', component.toggleModule)
        .on('pulsar:crud:update', '[data-toggle="module-crud"]', component.setModuleState);

    // Module-page
    component.$html.find('.module-page')
        .on('click', '[data-toggle="page"]', component.togglePage)
        .on('pulsar:crud:update', '[data-toggle="page"]', component.setPageState);

    // Module-subpage
    component.$html.find('.module-subpage')
        .on('click', '[data-toggle="subpage"]', component.toggleSubPage)
        .on('pulsar:crud:update', '[data-toggle="subpage"]', component.setPageState);

    // Set up indeterminate checkboxes on page load
    component.$html.find('.checkbox[indeterminate]').prop('indeterminate', true);

};

ModulePermissionsComponent.prototype.toggleModuleVisibility = function () {
    console.log('toggle module visibility');

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

ModulePermissionsComponent.prototype.toggleModulePagesVisibility = function () {
    console.log('toggle module pages visibility');

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

ModulePermissionsComponent.prototype.setModuleMasterState = function () {
    console.log('set module master state');

    var component = this,
        $component = $(component),
        $scope = $component.closest('.module'),
        targetSelector = '[data-toggle="module-row"]',
        $targets = $scope.find(targetSelector);

    if (
        $scope.find(targetSelector + ':not(:checked):not(:indeterminate)').length == $targets.length
    ) {
        $component.prop('indeterminate', false).prop('checked', false);
    }
    else if (
        $scope.find(targetSelector + ':indeterminate').length > 0
        || (
            $scope.find(targetSelector + ':checked').length >= 1
            && $scope.find(targetSelector + ':checked').length != $targets.length
        )
    ) {
        // if at least one intermediate
        $component.prop('indeterminate', true);
    }
    else {
        $component.prop('indeterminate', false).prop('checked', true);
    }
};

ModulePermissionsComponent.prototype.setModuleRowState = function () {
    console.log('module row state');

    var component = this,
        $component = $(component),
        $scope = $component.parent().siblings('.crud'),
        $parentScope = $component.closest('.module'),
        targetSelector = '[data-crud]',
        $targets = $scope.find(targetSelector);

    if (
        $scope.find(targetSelector + ':checked').length < $targets.length
        && $scope.find(targetSelector + ':checked').length != 0
    ) {
        $component.prop('indeterminate', true);
    }
    else if ($scope.find(targetSelector + ':checked').length == $targets.length) {
        $component.prop('indeterminate', false).prop('checked', true)
    }
    else {
        $component.prop('indeterminate', false).prop('checked', false);
    }

    $('[data-toggle="module-master"]', $parentScope).trigger('pulsar:crud:update');
};

ModulePermissionsComponent.prototype.setModuleState = function () {
    console.log('module state');

    var component = this,
        $component = $(component),
        $scope = $component.closest('.module'),
        targetSelector = '[data-crud="' + $component.data('crud') + '"]:not([data-toggle="module-crud"])',
        $targets = $scope.find(targetSelector);

    if (
        $scope.find(targetSelector + ':checked').length < $targets.length
        && $scope.find(targetSelector + ':checked').length != 0
    ) {
        $component.prop('indeterminate', true)
            .parent().removeClass('is-checked').addClass('is-indeterminate');
    }
    else if ($scope.find(targetSelector + ':checked').length == $targets.length) {
        $component.prop('indeterminate', false).prop('checked', true)
            .parent().removeClass('is-indeterminate').addClass('is-checked');
    }
    else {
        $component.prop('indeterminate', false).prop('checked', false)
            .parent().removeClass('is-indeterminate');
    }

    $('[data-toggle="module-row"]', $scope).trigger('pulsar:crud:update');
};

ModulePermissionsComponent.prototype.setPageState = function () {
    console.log('set page state');

    var component = this,
        $component = $(component),
        $scope = $component.closest('.module-page'),
        targetSelector = '[data-toggle="subpage"][data-crud="' + $component.data('crud') + '"]',
        $targets = $scope.find(targetSelector);

    if (
        $scope.find(targetSelector + ':checked').length < $targets.length
        && $scope.find(targetSelector + ':checked').length != 0
    ) {
        $component.prop('indeterminate', true)
            .parent().removeClass('is-checked').addClass('is-indeterminate')
    }
    else if ($scope.find(targetSelector + ':checked').length == $targets.length) {
        $component.prop('indeterminate', false).prop('checked', true)
            .parent().removeClass('is-indeterminate').addClass('is-checked');
    }
    else {
        $component.prop('indeterminate', false).prop('checked', false)
            .parent().removeClass('is-indeterminate is-checked');
    }

    $('[data-toggle="module-crud"][data-crud="' + $component.data('crud') + '"]', $component.closest('.module')).trigger('pulsar:crud:update');
};

ModulePermissionsComponent.prototype.setSubPageState = function () {
    console.log('subpage state');

    var component = this,
        $component = $(component),
        $scope = $component.closest('.module-page'),
        targetSelector = '[data-toggle="subpage"][data-crud="' + $component.data('crud') + '"]',
        $targets = $scope.find(targetSelector);

    if (
        $scope.find(targetSelector + ':checked').length < $targets.length
        && $scope.find(targetSelector + ':checked').length != 0
    ) {
        $component.prop('indeterminate', true)
            .parent().removeClass('is-checked').addClass('is-indeterminate');
    }
    else if ($scope.find(targetSelector + ':checked').length == $targets.length) {
        $component.prop('indeterminate', false).prop('checked', true)
            .parent().removeClass('is-indeterminate').addClass('is-checked');
    }
    else {
        $component.prop('indeterminate', false).prop('checked', false)
            .parent().removeClass('is-indeterminate is-checked');
    }

    $('[data-toggle="module-crud"][data-crud="' + $component.data('crud') + '"]', $component.closest('.module')).trigger('pulsar:crud:update');
};

ModulePermissionsComponent.prototype.toggleModuleMasterState = function () {
    console.log('toggle module global');

    var component = this,
        $component = $(component),
        $scope = $component.closest('.module');

    if ($component.is(':checked')) {
        $('[data-crud]', $scope)
            .prop('indeterminate', false).prop('checked', true)
            .parent().removeClass('is-indeterminate').addClass('is-checked');
    } else {
        $('[data-crud]', $scope)
            .prop('indeterminate', false).prop('checked', false)
            .parent().removeClass('is-indeterminate is-checked');
    }

    $('[data-toggle="module-row"]', $scope).trigger('pulsar:crud:update');
};

ModulePermissionsComponent.prototype.toggleModuleRowState = function () {
    console.log('toggle module row state');

    var component = this,
        $component = $(component),
        $scope = $component.closest('.module-row');

    if ($component.is(':checked')) {
        $('[data-crud]', $scope)
            .prop('indeterminate', false).prop('checked', true)
            .parent().removeClass('is-indeterminate').addClass('is-checked');
    } else {
        $('[data-crud]', $scope)
            .prop('indeterminate', false).prop('checked', false)
            .parent().removeClass('is-indeterminate is-checked');
    }

    $('[data-toggle="module-crud"]', $component.closest('.module')).trigger('pulsar:crud:update');

    // $('[data-toggle="module-crud"][data-crud="' + $component.data('crud') + '"]', $component.closest('.module')).trigger('pulsar:crud:update');
};

ModulePermissionsComponent.prototype.toggleModule = function () {
    console.log('toggle module');

    var component = this,
        $component = $(component),
        $scope = $component.closest('.module');

    if ($component.is(':checked')) {
        $('[data-crud="' + $component.data('crud') + '"]:not([data-toggle="module-crud"])', $scope)
            .prop('indeterminate', false).prop('checked', true)
            .parent().removeClass('is-indeterminate').addClass('is-checked');

            $component.parent().removeClass('is-indeterminate').addClass('is-checked');
    } else {
        $('[data-crud="' + $component.data('crud') + '"]:not([data-toggle="module-crud"])', $scope)
            .prop('indeterminate', false).prop('checked', false)
            .parent().removeClass('is-checked is-indeterminate');

            $component.parent().removeClass('is-checked is-indeterminate');
    }

    $('[data-toggle="module-row"]', $scope).trigger('pulsar:crud:update');
};

ModulePermissionsComponent.prototype.togglePage = function () {
    console.log('toggle page');

    var component = this,
        $component = $(component),
        $scope = $component.closest('.module-page');

    if ($component.is(':checked')) {

        $('[data-toggle="subpage"][data-crud="' + $component.data('crud') + '"]', $scope).prop('checked', true)
            .parent().removeClass('is-indeterminate').addClass('is-checked');

        $component.parent().removeClass('is-indeterminate').addClass('is-checked');
    } else {
        $('[data-toggle="subpage"][data-crud="' + $component.data('crud') + '"]', $scope).prop('checked', false)
            .parent().removeClass('is-indeterminate is-checked');

        $component.parent().removeClass('is-checked').addClass('is-indeterminate');
    }

    $('[data-toggle="module-crud"][data-crud="' + $component.data('crud') + '"]', $component.closest('.module')).trigger('pulsar:crud:update');
};

ModulePermissionsComponent.prototype.toggleSubPage = function () {
    console.log('toggle subpage');

    var component = this,
        $component = $(component),
        $scope = $component.closest('.module-subpage'),
        $parentScope = $scope.closest('.module-page');

    if ($component.is(':checked')) {
        $component.parent().addClass('is-checked');
    } else {
        $component.parent().removeClass('is-checked');
    }

    $('[data-toggle="page"][data-crud="' + $component.data('crud') + '"]', $parentScope).trigger('pulsar:crud:update');
};

module.exports = ModulePermissionsComponent;
