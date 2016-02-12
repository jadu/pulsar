'use strict'

var $ = require('jquery'),
    ModulePermissionsComponent = require('../../js/ModulePermissionsComponent');

describe('Module permissions component', function() {

    beforeEach(function() {
        this.$html = $('<html></html>');
        this.$body = $('<body></body>').appendTo(this.$html);
        this.$code = $('\
<div class="module-permissions">\
    <div class="module">\
\
        <div class="module__titles">\
            <div class="crud"><!--\
             --><label class="crud__label">\
                    <span>View</span>\
                </label><!--\
             --><label class="crud__label">\
                    <span>Create</span>\
                </label><!--\
             --><label class="crud__label">\
                    <span>Update</span>\
                </label><!--\
             --><label class="crud__label">\
                    <span>Delete</span>\
                </label><!--\
         --></div>\
        </div>\
\
        <label class="control__label"><input type="checkbox" class="form__control checkbox" data-select="all">Publishing</label>\
        <a class="js-module-toggle" href="#"><i class="icon-caret-up"></i></a>\
\
        <div class="crud"><!--\
         --><label class="crud__permission">\
                <input type="checkbox" class="form__control checkbox" data-select="view">\
                <span>View</span>\
            </label><!--\
         --><label class="crud__permission">\
                <input type="checkbox" class="form__control checkbox" data-select="create">\
                <span>Create</span>\
            </label><!--\
         --><label class="crud__permission">\
                <input type="checkbox" class="form__control checkbox" data-select="update">\
                <span>Update</span>\
            </label><!--\
         --><label class="crud__permission">\
                <input type="checkbox" class="form__control checkbox" data-select="delete">\
                <span>Delete</span>\
            </label><!--\
     --></div>\
\
        <div class="module-page">\
            <label class="control__label"><input type="checkbox" class="form__control checkbox">Address &amp; Contacts</label>\
            <a class="js-refine-toggle" href="#">refine</a>\
\
            <div class="crud"><!--\
             --><label class="crud__permission">\
                    <input type="checkbox" class="form__control checkbox" data-crud="view">\
                    <span>View</span>\
                </label><!--\
             --><label class="crud__permission">\
                    <input type="checkbox" class="form__control checkbox" data-crud="create">\
                    <span>Create</span>\
                </label><!--\
             --><label class="crud__permission">\
                    <input type="checkbox" class="form__control checkbox" data-crud="update">\
                    <span>Update</span>\
                </label><!--\
             --><label class="crud__permission">\
                    <input type="checkbox" class="form__control checkbox" data-crud="delete">\
                    <span>Delete</span>\
                </label><!--\
         --></div>\
\
            <div class="module-subpage">\
                <label class="control__label"><input type="checkbox" class="form__control checkbox"><span class="label">tab</span> Address</label>\
                <div class="crud"><!--\
                 --><label class="crud__permission">\
                        <input type="checkbox" class="form__control checkbox" data-crud="view">\
                        <span>View</span>\
                    </label><!--\
                 --><label class="crud__permission">\
                        <input type="checkbox" class="form__control checkbox" data-crud="create">\
                        <span>Create</span>\
                    </label><!--\
                 --><label class="crud__permission">\
                        <input type="checkbox" class="form__control checkbox" data-crud="update">\
                        <span>Update</span>\
                    </label><!--\
                 --><label class="crud__permission">\
                        <input type="checkbox" class="form__control checkbox" data-crud="delete">\
                        <span>Delete</span>\
                    </label><!--\
             --></div>\
\
        </div>\
    </div>\
</div>\
').appendTo(this.$html);

        this.$moduleToggle = this.$html.find('.js-module-toggle');
        this.$module = this.$moduleToggle.closest('.module');

        this.$refineToggle = this.$html.find('.js-refine-toggle');
        this.$modulePage = this.$refineToggle.closest('.module-page');

        this.$moduleSelectAll = this.$module.find('[data-select="all"]');
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

    describe('clicking the main module selection control', function() {

        beforeEach(function() {
            this.modulePermissions.init();

            var clickEvent = $.Event('click');
            this.$moduleSelectAll.trigger(clickEvent);
        });

        it('should check all checkboxes within this module', function() {
            expect(this.$moduleAllCheckboxes.length).to.equal(this.$moduleAllCheckboxes.length);
        });

        it('should uncheck all checkboxes within this module if clicked again', function() {
            var clickEvent = $.Event('click');
            this.$moduleSelectAll.trigger(clickEvent);

            expect($(':checked', this.$moduleAllCheckboxes).length).to.equal(0);
        });

    });

    describe('selecting a crud control', function() {
        beforeEach(function() {
            this.modulePermissions.init();

            var changeEvent = $.Event('change');
            this.$module.find('[data-crud="view"]').trigger(changeEvent);
        });

        it('should make the main module selection indeterminate', function() {
            expect(this.$moduleSelectAll.prop('indeterminate')).to.be.true;
        });

        it('should make the crud type header indeterminate', function() {
            expect(this.$module.find('[data-select="view"]').prop('indeterminate')).to.be.true;
        });
    });

});

