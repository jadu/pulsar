'use strict'

var $ = require('jquery'),
    ModulePermissionsComponent = require('../../js/ModulePermissionsComponent');

describe('Module permissions component', function() {

    beforeEach(function() {
        this.$html = $('<div id="html"></div>').appendTo('html');
        this.$body = $('<div id="body"></div>').appendTo(this.$html);
        this.$code = $('\
<div class="module-permissions">\
    <div class="module module-row">\
\
        <div class="module__titles">\
            <div class="crud">\
                <label class="crud__label">\
                    <span>View</span>\
                </label>\
                <label class="crud__label">\
                    <span>Create</span>\
                </label>\
                <label class="crud__label">\
                    <span>Update</span>\
                </label>\
                <label class="crud__label">\
                    <span>Delete</span>\
                </label>\
            </div>\
        </div>\
\
        <label class="control__label">\
            <input type="checkbox" class="form__control checkbox" data-toggle="module-master">\
                Publishing\
        </label>\
        <a class="js-module-toggle" href="#"><i class="icon-caret-up"></i></a>\
\
        <div class="crud">\
            <label class="crud__permission">\
                <input type="checkbox" class="form__control checkbox" data-toggle="module-crud" data-crud="view">\
                <span>View</span>\
            </label>\
            <label class="crud__permission">\
                <input type="checkbox" class="form__control checkbox" data-toggle="module-crud" data-crud="create">\
                <span>Create</span>\
            </label>\
            <label class="crud__permission">\
                <input type="checkbox" class="form__control checkbox" data-toggle="module-crud" data-crud="update">\
                <span>Update</span>\
            </label>\
            <label class="crud__permission">\
                <input type="checkbox" class="form__control checkbox" data-toggle="module-crud" data-crud="delete">\
                <span>Delete</span>\
            </label>\
        </div>\
\
        <div class="module-row module-page">\
            <label class="control__label">\
                <input type="checkbox" class="form__control checkbox" data-toggle="module-row">\
                    Address &amp; Contacts\
            </label>\
            <a class="js-refine-toggle" href="#">refine</a>\
\
            <div class="crud">\
                <label class="crud__permission">\
                    <input type="checkbox" class="form__control checkbox" data-toggle="page" data-crud="view">\
                    <span>View</span>\
                </label>\
                <label class="crud__permission">\
                    <input type="checkbox" class="form__control checkbox" data-toggle="page" data-crud="create">\
                    <span>Create</span>\
                </label>\
                <label class="crud__permission">\
                    <input type="checkbox" class="form__control checkbox" data-toggle="page" data-crud="update">\
                    <span>Update</span>\
                </label>\
                <label class="crud__permission">\
                    <input type="checkbox" class="form__control checkbox" data-toggle="page" data-crud="delete">\
                    <span>Delete</span>\
                </label>\
            </div>\
\
            <div class="module-row module-subpage">\
                <label class="control__label"><input data-toggle="module-row" type="checkbox" class="form__control checkbox"><span class="label">tab</span> One\
                </label>\
                <div class="crud">\
                    <label class="crud__permission">\
                        <input type="checkbox" class="form__control checkbox" data-toggle="subpage" data-crud="view">\
                        <span>View</span>\
                    </label>\
                    <label class="crud__permission">\
                        <input type="checkbox" class="form__control checkbox" data-toggle="subpage" data-crud="create">\
                        <span>Create</span>\
                    </label>\
                    <label class="crud__permission">\
                        <input type="checkbox" class="form__control checkbox" data-toggle="subpage" data-crud="update">\
                        <span>Update</span>\
                    </label>\
                    <label class="crud__permission">\
                        <input type="checkbox" class="form__control checkbox" data-toggle="subpage" data-crud="delete">\
                        <span>Delete</span>\
                    </label>\
                </div>\
            </div>\
            <div class="module-row module-subpage">\
                <label class="control__label"><input data-toggle="module-row" type="checkbox" class="form__control checkbox"><span class="label">tab</span> Two\
                </label>\
                <div class="crud">\
                    <label class="crud__permission">\
                        <input type="checkbox" class="form__control checkbox" data-toggle="subpage" data-crud="view">\
                        <span>View</span>\
                    </label>\
                    <label class="crud__permission">\
                        <input type="checkbox" class="form__control checkbox" data-toggle="subpage" data-crud="create">\
                        <span>Create</span>\
                    </label>\
                    <label class="crud__permission">\
                        <input type="checkbox" class="form__control checkbox" data-toggle="subpage" data-crud="update">\
                        <span>Update</span>\
                    </label>\
                    <label class="crud__permission">\
                        <input type="checkbox" class="form__control checkbox" data-toggle="subpage" data-crud="delete">\
                        <span>Delete</span>\
                    </label>\
                </div>\
            </div>\
        </div>\
    </div>\
</div>\
').appendTo(this.$body);

        this.$moduleToggle = this.$html.find('.js-module-toggle');
        this.$module = this.$moduleToggle.closest('.module');

        this.$refineToggle = this.$html.find('.js-refine-toggle');
        this.$modulePage = this.$refineToggle.closest('.module-page');

        this.$moduleSubpage = this.$module.find('.module-subpage');
        this.$moduleSubpageRowToggle = this.$moduleSubpage.find('[data-toggle="module-row"]');
        this.$moduleSubpageCheckboxes = this.$moduleSubpage.find('[data-crud]');
        this.$moduleSubpageView = this.$moduleSubpage.find('[data-crud="view"]').first();

        this.$moduleMasterToggle = this.$html.find('[data-toggle="module-master"]');
        this.$moduleAllCrudCheckboxes = this.$module.find('[data-crud]');
        this.$moduleAllRowCheckboxes = this.$module.find('[data-toggle="module-row"]');

        this.modulePermissions = new ModulePermissionsComponent(this.$html);
    });

    describe('clicking a module toggle', function() {

        beforeEach(function() {
            this.modulePermissions.init();
            this.$moduleToggle.click();
        });

        it('should add the .is-open class to it’s parent module', function() {
            expect(this.$module.hasClass('is-open')).to.be.true;
        });

        it('should replace the down caret with an up caret', function() {
            expect(this.$moduleToggle.find('i').hasClass('icon-caret-up')).to.be.true;
        });
    });

    describe('clicking a module toggle twice', function() {

        beforeEach(function() {
            this.modulePermissions.init();
            this.$moduleToggle.click();
            this.$moduleToggle.click();
        });

        it('should remove the .is-open class', function() {
            expect(this.$module.hasClass('is-open')).to.be.false;
        });

        it('should replace the up caret with a down caret', function() {
            expect(this.$moduleToggle.find('i').hasClass('icon-caret-down')).to.be.true;
        });
    });

    describe('clicking a refine toggle', function() {

        beforeEach(function() {
            this.modulePermissions.init();
            this.$refineToggle.click();
        });

        it('should add the .is-open class to it’s parent module page', function() {
            expect(this.$modulePage.hasClass('is-open')).to.be.true;
        });

        it('should change the refine toggle label to ‘close’', function() {
            expect(this.$refineToggle.text()).to.equal('close');
        });
    });

    describe('clicking a refine toggle twice', function() {

        beforeEach(function() {
            this.modulePermissions.init();
            this.$refineToggle.click();
            this.$refineToggle.click();
        });

        it('should remove the .is-open class to it’s parent module page', function() {
            expect(this.$modulePage.hasClass('is-open')).to.be.false;
        });

        it('should change the refine toggle label to refine’', function() {
            expect(this.$refineToggle.text()).to.equal('refine');
        });
    });

    describe('checking a module master toggle', function() {

        beforeEach(function() {
            this.modulePermissions.init();
            this.$moduleMasterToggle.click();
        });

        it('should check the control', function() {
            expect(this.$moduleMasterToggle.prop('checked')).to.be.true;
        });

        it('should check all crud checkboxes within the same module', function() {
            expect(this.$moduleAllCrudCheckboxes.length).to.equal(this.$module.find('[data-crud]:checked').length);
        });

        it('should check all row toggle checkboxes within the same module', function() {
            expect(this.$moduleAllRowCheckboxes.length).to.equal(this.$module.find('[data-toggle="module-row"]:checked').length);
        });

        it('should not disable the View checkbox', function() {
            expect(this.$module.find('[data-crud="view"]').prop('disabled')).to.be.false;
        });

        it('should not disable the Create checkbox', function() {
            expect(this.$module.find('[data-crud="create"]').prop('disabled')).to.be.false;
        });

        it('should not disable the Update checkbox', function() {
            expect(this.$module.find('[data-crud="update"]').prop('disabled')).to.be.false;
        });

        it('should not disable the Delete checkbox', function() {
            expect(this.$module.find('[data-crud="delete"]').prop('disabled')).to.be.false;
        });
    });

    describe('unchecking a module master toggle', function() {

        beforeEach(function() {
            this.modulePermissions.init();
            this.$moduleMasterToggle.click();
            this.$moduleMasterToggle.click();
        });

        it('should uncheck the control', function() {
            expect(this.$moduleMasterToggle.prop('checked')).to.be.false;
        });

        it('should uncheck all checkboxes within the same module', function() {
            expect(this.$module.find('[data-crud]:checked').length).to.equal(0);
        });

        it('should uncheck all row toggle checkboxes within the same module', function() {
            expect(this.$module.find('[data-toggle="module-row"]:checked').length).to.equal(0);
        });

        it('should not disable the View checkbox', function() {
            expect(this.$module.find('[data-crud="view"]').prop('disabled')).to.be.false;
        });

        it('should disable the Create checkbox', function() {
            expect(this.$module.find('[data-crud="create"]').prop('disabled')).to.be.true;
        });

        it('should disable the Update checkbox', function() {
            expect(this.$module.find('[data-crud="update"]').prop('disabled')).to.be.true;
        });

        it('should disable the Delete checkbox', function() {
            expect(this.$module.find('[data-crud="delete"]').prop('disabled')).to.be.true;
        });
    });

    describe('checking a module-subpage row toggle', function() {

        beforeEach(function() {
            this.modulePermissions.init();
            this.$moduleSubpageRowToggle.click();
        });

        it('should check the control', function() {
            expect(this.$moduleSubpageRowToggle.prop('checked')).to.be.true;
        });

        it('should check all checkboxes within the same row', function() {
            expect(this.$moduleSubpageCheckboxes.length).to.equal(this.$moduleSubpage.find('[data-crud]:checked').length);
        });

        it('should not disable the View checkbox', function() {
            expect(this.$moduleSubpage.find('[data-crud="view"]').prop('disabled')).to.be.false;
        });

        it('should enable the Create checkbox', function() {
            expect(this.$moduleSubpage.find('[data-crud="create"]').prop('disabled')).to.be.false;
        });

        it('should enable the Update checkbox', function() {
            expect(this.$moduleSubpage.find('[data-crud="update"]').prop('disabled')).to.be.false;
        });

        it('should enable the Delete checkbox', function() {
            expect(this.$moduleSubpage.find('[data-crud="delete"]').prop('disabled')).to.be.false;
        });
    });

    describe('unchecking a module-subpage row toggle', function() {

        beforeEach(function() {
            this.modulePermissions.init();
            this.$moduleSubpageRowToggle.click();
            this.$moduleSubpageRowToggle.click();
        });

        it('should uncheck the control', function() {
            expect(this.$moduleSubpageRowToggle.prop('checked')).to.be.false;
        });

        it('should uncheck all checkboxes within the same row', function() {
            expect(this.$moduleSubpage.find('[data-crud]:checked').length).to.equal(0);
        });

        it('should not disable the View checkbox', function() {
            expect(this.$moduleSubpage.find('[data-crud="view"]').prop('disabled')).to.be.false;
        });

        it('should disable the Create checkbox', function() {
            expect(this.$moduleSubpage.find('[data-crud="create"]').prop('disabled')).to.be.true;
        });

        it('should disable the Update checkbox', function() {
            expect(this.$moduleSubpage.find('[data-crud="update"]').prop('disabled')).to.be.true;
        });

        it('should disable the Delete checkbox', function() {
            expect(this.$moduleSubpage.find('[data-crud="delete"]').prop('disabled')).to.be.true;
        });
    });

    describe('checking a module-subpage view CRUD toggle', function() {

        beforeEach(function() {
            this.modulePermissions.init();
            this.$moduleSubpageView.click();
        });

        it('should check the control', function() {
            expect(this.$moduleSubpageView.prop('checked')).to.be.true;
        });

        it('should not disable the Create checkbox', function() {
            expect(this.$moduleSubpage.find('[data-crud="create"]').prop('disabled')).to.be.false;
        });

        it('should not disable the Update checkbox', function() {
            expect(this.$moduleSubpage.find('[data-crud="update"]').prop('disabled')).to.be.false;
        });

        it('should not disable the Delete checkbox', function() {
            expect(this.$moduleSubpage.find('[data-crud="delete"]').prop('disabled')).to.be.false;
        });

        it('should set the module-page view toggle to indeterminate', function() {
            expect(this.$modulePage.find('[data-toggle="page"][data-crud="view"]').prop('indeterminate')).to.be.true;
        });

    });

    describe('unchecking a module-subpage view CRUD toggle', function() {

        beforeEach(function() {
            this.modulePermissions.init();
            this.$moduleSubpageView.click();
            this.$moduleSubpageView.click();
        });

        it('should check the control', function() {
            expect(this.$moduleSubpageView.prop('checked')).to.be.false;
        });

        it('should disable the Create checkbox', function() {
            expect(this.$moduleSubpage.find('[data-crud="create"]').prop('disabled')).to.be.true;
        });

        it('should disable the Update checkbox', function() {
            expect(this.$moduleSubpage.find('[data-crud="update"]').prop('disabled')).to.be.true;
        });

        it('should disable the Delete checkbox', function() {
            expect(this.$moduleSubpage.find('[data-crud="delete"]').prop('disabled')).to.be.true;
        });
    });

});

