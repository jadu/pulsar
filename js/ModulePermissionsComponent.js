'use strict';

var $ = require('jquery');

function ModulePermissionsComponent(html) {
    this.$html = html;
};

ModulePermissionsComponent.prototype.init = function () {

    var component = this;

    component.$html.on('click', '.js-module-toggle', component.toggleModuleVisibility);
    component.$html.on('click', '.js-refine-toggle', component.toggleModulePagesVisibility);

    // // Module-master
    component.$html.find('.module').on('click', '[data-toggle="module-master"]', function () {
        component.toggleModuleMasterState(this);
    });

    component.$html.find('.module').on('click', '[data-toggle="module-row"]', function() {
        component.toggleModuleRowState(this);
    });

    component.$html.find('.module').on('click', '[data-crud]', function() {
        component.toggleCrudState(this);
    });

    component.$html.find('.module').on('click', '[data-toggle="module-crud"]', function() {
        component.toggleModuleState(this);
    });

    component.$html.find('.module').on('click', '[data-toggle="page"]', function() {
        component.togglePageState(this);
    });

    // Set up indeterminate checkboxes on page load
    component.$html.find('.checkbox[indeterminate]').prop('indeterminate', true);

};

ModulePermissionsComponent.prototype.toggleModuleVisibility = function () {

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

ModulePermissionsComponent.prototype.toggleModuleMasterState = function (target) {

    var component = this,
        $this = $(target),
        $scope = $this.closest('.module'),
        $rowToggles = $('[data-toggle="module-row"]', $scope),
        $crud = $('[data-crud]', $scope),
        $r = $('[data-crud="view"]', $scope),
        $cud = $('[data-crud="create"], [data-crud="update"], [data-crud="delete"]', $scope);

    if ($this.is(':checked')) {
        component.setChecked($.merge($rowToggles, $crud));
    } else if ($this.is(':not(:checked)')) {
        component.setUnchecked($.merge($rowToggles, $r));
        component.setDisabled($cud);
    }
};

ModulePermissionsComponent.prototype.toggleModuleRowState = function (target) {

    var component = this,
        $this = $(target),
        $scope = $this.closest('.module-row'),
        $moduleScope = $this.closest('.module'),
        $rowToggles = $('[data-toggle="module-row"]', $scope),
        $crud = $('[data-crud]', $scope),
        $r = $('[data-crud="view"]', $scope),
        $cud = $('[data-crud="create"], [data-crud="update"], [data-crud="delete"]', $scope);

    if ($this.is(':checked')) {
        if ($scope.has('.module-subpage').length) {
            component.setChecked($.merge($rowToggles, $crud));
        } else {
            component.setChecked($crud);
        }
    } else if ($this.is(':not(:checked)')) {
        if ($scope.has('.module-subpage').length) {
            component.setUnchecked($.merge($rowToggles, $r));
        } else {
            component.setUnchecked($r);
        }
        component.setDisabled($cud);
    }

    component.toggleModulePageCrud($('[data-toggle="page"][data-crud="view"]', $this.closest('.module-page')));
    component.toggleModulePageCrud($('[data-toggle="page"][data-crud="create"]', $this.closest('.module-page')));
    component.toggleModulePageCrud($('[data-toggle="page"][data-crud="update"]', $this.closest('.module-page')));
    component.toggleModulePageCrud($('[data-toggle="page"][data-crud="delete"]', $this.closest('.module-page')));

    component.toggleModuleCrud($('[data-toggle="module-crud"][data-crud="view"]', $this.closest('.module')));
    component.toggleModuleCrud($('[data-toggle="module-crud"][data-crud="create"]', $this.closest('.module')));
    component.toggleModuleCrud($('[data-toggle="module-crud"][data-crud="update"]', $this.closest('.module')));
    component.toggleModuleCrud($('[data-toggle="module-crud"][data-crud="delete"]', $this.closest('.module')));
};

ModulePermissionsComponent.prototype.toggleCrudState = function(target) {

    var component = this,
        $this = $(target),
        $scope = $this.closest('.module-row'),
        $pageScope = $this.closest('.module-page'),
        $moduleScope = $this.closest('.module'),
        $moduleCrudToggle = $('[data-toggle="module-crud"][data-crud="' + $this.data('crud') + '"]', $moduleScope),
        $cud = $('[data-crud]:not([data-crud="view"])', $scope);

    if ($this.data('crud') == 'view') {
        if ($this.prop('checked')) {
            component.setEnabled($cud);
        } else {
            component.setDisabled($cud);
        }
    }

    if ($this.prop('checked')) {
        component.setChecked($this);
    } else {
        component.setUnchecked($this);
    }

    if ($this.data('toggle') == 'subpage') {

        var subpageCrudSelector = '[data-toggle="subpage"][data-crud="' + $this.data('crud') + '"]',
            $pageCrudToggle = $('[data-toggle="page"][data-crud="' + $this.data('crud') + '"]', $pageScope);

        if ($(subpageCrudSelector + ':checked', $pageScope).length == 0) {
           component.setUnchecked($pageCrudToggle);
        } else if (
            $(subpageCrudSelector + ':checked', $pageScope).length ==
            $(subpageCrudSelector, $pageScope).length
        ) {
            component.setChecked($pageCrudToggle);
        } else {
            component.setIndeterminate($pageCrudToggle);
        }

        component.toggleModuleCrud($moduleCrudToggle);
    }

    setTimeout(function() {
        component.updateRowToggles($moduleScope);
    }, 0);

};

ModulePermissionsComponent.prototype.updateRowToggles = function (scope) {

    var component = this,
        $rows = $('.module-row', scope);

    $rows.each(function() {
        var $this = $(this),
            $rowToggle = $('> .control__label > .checkbox', $this),
            numCheckboxes = $('[data-crud]', $this).length,
            numChecked = $('[data-crud]:checked', $this).length;

        if (numChecked == 0) {
            component.setUnchecked($rowToggle);
        } else if (numChecked === numCheckboxes) {
            component.setChecked($rowToggle);
        } else {
            component.setIndeterminate($rowToggle);
        }

        if ($this.has('.module-subpage').length && !$this.hasClass('module-subpage')) {
            component.toggleModulePageCrud($('[data-toggle="page"][data-crud="view"]', $this.closest('.module-page')));
            component.toggleModulePageCrud($('[data-toggle="page"][data-crud="create"]', $this.closest('.module-page')));
            component.toggleModulePageCrud($('[data-toggle="page"][data-crud="update"]', $this.closest('.module-page')));
            component.toggleModulePageCrud($('[data-toggle="page"][data-crud="delete"]', $this.closest('.module-page')));
        }

        component.toggleModuleCrud($('[data-toggle="module-crud"][data-crud="view"]', $this.closest('.module')));
        component.toggleModuleCrud($('[data-toggle="module-crud"][data-crud="create"]', $this.closest('.module')));
        component.toggleModuleCrud($('[data-toggle="module-crud"][data-crud="update"]', $this.closest('.module')));
        component.toggleModuleCrud($('[data-toggle="module-crud"][data-crud="delete"]', $this.closest('.module')));

    });
}

ModulePermissionsComponent.prototype.toggleModuleCrud = function (target) {

    var component = this,
        $this = $(target),
        $scope = $this.closest('.module'),
        crudSelector = '[data-crud="' + $this.data('crud') + '"]:not([data-toggle="module-crud"])',
        $moduleMasterToggle = $('[data-toggle="module-master"]', $scope),
        moduleCrudSelector = '[data-toggle="module-crud"]',
        $moduleCrudToggle = $('[data-toggle="module-crud"][data-crud="' + $this.data('crud') + '"]', $scope);

    if ($(crudSelector + ':checked', $scope).length == 0) {
        component.setUnchecked($moduleCrudToggle);
    } else if (
        $(crudSelector, $scope).length ==
        $(crudSelector + ':checked', $scope).length
    ) {
        component.setChecked($moduleCrudToggle);
    } else {
        component.setIndeterminate($moduleCrudToggle);
    }

    if ($(moduleCrudSelector + ':checked', $scope).length === 0 && $(moduleCrudSelector + ':indeterminate', $scope).length === 0) {
        component.setUnchecked($moduleMasterToggle);
    } else if ($(moduleCrudSelector, $scope).length === $(moduleCrudSelector + ':checked', $scope).length) {
        component.setChecked($moduleMasterToggle);
    } else if ($(moduleCrudSelector, $scope).length > $(moduleCrudSelector + ':checked', $scope).length) {
        component.setIndeterminate($moduleMasterToggle);
    }
};

ModulePermissionsComponent.prototype.toggleModulePageCrud = function (target) {

    var component = this,
        $this = $(target),
        $scope = $this.closest('.module-page'),
        crudSelector = '[data-crud="' + $this.data('crud') + '"]:not([data-toggle="page"])',
        $modulePageCrudToggle = $('[data-toggle="page"][data-crud="' + $this.data('crud') + '"]', $scope);

    if ($(crudSelector + ':checked', $scope).length == 0) {
        if (!$modulePageCrudToggle.prop('disabled')) {
            component.setUnchecked($modulePageCrudToggle);
        }
    } else if (
        $(crudSelector, $scope).length ==
        $(crudSelector + ':checked', $scope).length
    ) {
        component.setChecked($modulePageCrudToggle);
    } else {
        component.setIndeterminate($modulePageCrudToggle);
    }
};

ModulePermissionsComponent.prototype.togglePageState = function (target) {

    var component = this,
        $this = $(target),
        $scope = $this.closest('.module-page'),
        $moduleScope = $this.closest('.module'),
        crudSelector = '[data-crud="' + $this.data('crud') + '"]:not([data-toggle="page"])',
        $crudEnabledToggles = $(crudSelector + ':not(:disabled)', $scope),
        $crudCheckedToggles = $(crudSelector + ':checked', $scope),
        $crudDisabledToggles = $(crudSelector + ':disabled', $scope),
        $moduleCrudToggle = $('[data-toggle="module-crud"][data-crud="' + $this.data('crud') + '"]', $moduleScope);

    if ($crudEnabledToggles.length) {
        if ($this.prop('checked')) {
            component.setChecked($crudEnabledToggles);
        } else {
            component.setUnchecked($crudEnabledToggles);
        }
    }

    // if ($($crudDisabledToggles.selector, $scope).length > 0) {
    //     console.log('1');
    //     component.setIndeterminate($this);
    // } else
    if (
            $($crudEnabledToggles.selector, $scope).length ===
            $($crudCheckedToggles.selector, $scope).length
    ) {
        //console.log('2');
        // if ($this.data('toggle') != 'page') {
        //     console.log('2a');
        //     component.setChecked($this);
        // }
    } else {
        //console.log('3');
        component.setUnchecked($this);
    }

    component.toggleModuleCrud($moduleCrudToggle);
};

ModulePermissionsComponent.prototype.toggleModuleState = function (target) {

    var component = this,
        $this = $(target),
        $scope = $this.closest('.module'),
        crudSelector = '[data-crud="' + $this.data('crud') + '"]:not([data-toggle="module-crud"])',
        $crudEnabledToggles = $(crudSelector + ':not(:disabled)', $scope),
        $crudCheckedToggles = $(crudSelector + ':checked', $scope),
        $crudDisabledToggles = $(crudSelector + ':disabled', $scope);

    if ($this.prop('checked')) {
        component.setChecked($crudEnabledToggles);
    } else {
        component.setUnchecked($crudEnabledToggles);
    }

    if ($($crudDisabledToggles.selector, $scope).length > 0) {
        component.setIndeterminate($this);
    } else if (
        $($crudEnabledToggles.selector, $scope).length ===
        $($crudCheckedToggles.selector, $scope).length
    ) {
        component.setChecked($this);
    } else {
        component.setUnchecked($this);

        component.toggleModuleCrud($('[data-toggle="module-crud"][data-crud="view"]', $this.closest('.module')));
        component.toggleModuleCrud($('[data-toggle="module-crud"][data-crud="create"]', $this.closest('.module')));
        component.toggleModuleCrud($('[data-toggle="module-crud"][data-crud="update"]', $this.closest('.module')));
        component.toggleModuleCrud($('[data-toggle="module-crud"][data-crud="delete"]', $this.closest('.module')));

    }
};

ModulePermissionsComponent.prototype.setChecked = function (target) {
    target
        .prop('indeterminate', false)
        .prop('disabled', false)
        .prop('checked', true)
        .parent()
        .removeClass('is-disabled is-indeterminate')
        .addClass('is-checked');
};

ModulePermissionsComponent.prototype.setUnchecked = function (target) {
    target
        .prop('checked', false)
        .prop('indeterminate', false)
        .prop('disabled', false)
        .parent()
        .removeClass('is-checked is-disabled is-indeterminate');
};

ModulePermissionsComponent.prototype.setIndeterminate = function (target) {
    target
        .prop('checked', false)
        .prop('disabled', false)
        .prop('indeterminate', true)
        .parent()
        .removeClass('is-checked is-disabled')
        .addClass('is-indeterminate');
};

ModulePermissionsComponent.prototype.setDisabled = function (target) {
    target
        .prop('checked', false)
        .prop('indeterminate', false)
        .prop('disabled', true)
        .parent()
        .removeClass('is-checked is-indeterminate')
        .addClass('is-disabled');
};

ModulePermissionsComponent.prototype.setEnabled = function (target) {
    target
        .prop('disabled', false)
        .parent()
        .removeClass('is-disabled');
};

module.exports = ModulePermissionsComponent;
