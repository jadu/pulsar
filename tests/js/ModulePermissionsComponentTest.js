'use strict'

var $ = require('jquery'),
    ModulePermissionsComponent = require('../../js/ModulePermissionsComponent');

describe('Module permissions component', function() {

    beforeEach(function() {
        this.$html = $('<html></html>');
        this.$body = $('<body></body>').appendTo(this.$html);
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
            <input type="checkbox" class="form__control checkbox qa-module-master" data-toggle="module-master">\
                Publishing\
        </label>\
        <a class="js-module-toggle" href="#"><i class="icon-caret-up"></i></a>\
\
        <div class="crud">\
            <label class="crud__permission">\
                <input type="checkbox" class="form__control checkbox qa-view-header" data-toggle="module-crud" data-crud="view">\
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
                    <input type="checkbox" class="form__control checkbox qa-view-control" data-toggle="page" data-crud="view">\
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
                <label class="control__label"><input type="checkbox" class="form__control checkbox"><span class="label">tab</span> Address\
                </label>\
                <div class="crud">\
                    <label class="crud__permission">\
                        <input type="checkbox" class="form__control checkbox qa-view-control" data-toggle="subpage" data-crud="view">\
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

        this.$moduleSelectAll = this.$html.find('[data-toggle="module-master"]');
        this.$moduleAllCheckboxes = this.$module.find('.checkbox');

        this.modulePermissions = new ModulePermissionsComponent(this.$html);
    });

    describe('clicking a module toggle', function() {

        beforeEach(function() {
            this.modulePermissions.init();

            var clickEvent = $.Event('click');
            this.$moduleToggle.trigger(clickEvent);
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

            var clickEvent = $.Event('click');
            this.$moduleToggle.trigger(clickEvent);
            this.$moduleToggle.trigger(clickEvent);
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

            var clickEvent = $.Event('click');
            this.$refineToggle.trigger(clickEvent);
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

            var clickEvent = $.Event('click');
            this.$refineToggle.trigger(clickEvent);
            this.$refineToggle.trigger(clickEvent);
        });

        it('should remove the .is-open class to it’s parent module page', function() {
            expect(this.$modulePage.hasClass('is-open')).to.be.false;
        });

        it('should change the refine toggle label to refine’', function() {
            expect(this.$refineToggle.text()).to.equal('refine');
        });
    });

    describe('clicking the main module selection control', function() {

        beforeEach(function() {
            this.modulePermissions.init();
            console.log('!');
            console.log(this.$html.find('[data-toggle="module-master"]').length);

            var clickEvent = $.Event('click');
            this.$html.find('[data-toggle="module-master"]').trigger(clickEvent);
        });

        it('should check all checkboxes within this module', function() {

            var checkboxes = this.$html.find('.module .checkbox'),
                checked = $(':checked', checkboxes);

            expect(checked.length).to.equal(checkboxes.length);

        });

        // it('should uncheck all checkboxes within this module if clicked again', function() {

        //     var clickEvent = $.Event('click');
        //     this.$moduleSelectAll.trigger(clickEvent);


        //     expect($(':checked', this.$moduleAllCheckboxes).length).to.equal(0);
        // });

    });

});

