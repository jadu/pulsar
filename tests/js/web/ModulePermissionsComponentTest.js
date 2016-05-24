// 'use strict'

// var $ = require('jquery'),
//     ModulePermissionsComponent = require('../../../js/ModulePermissionsComponent');

// describe('Module permissions component', function() {

//     beforeEach(function() {
//         this.$moduleHtml = $('<div id="html"></div>').appendTo('html');
//         this.$moduleBody = $('<div id="body"></div>').appendTo(this.$moduleHtml);
//         this.$moduleCode = $('\
// <div class="module-permissions">\
//     <div class="module module-row qa-master">\
// \
//         <div class="module__titles">\
//             <div class="crud">\
//                 <label class="crud__label">\
//                     <span>View</span>\
//                 </label>\
//                 <label class="crud__label">\
//                     <span>Create</span>\
//                 </label>\
//                 <label class="crud__label">\
//                     <span>Update</span>\
//                 </label>\
//                 <label class="crud__label">\
//                     <span>Delete</span>\
//                 </label>\
//             </div>\
//         </div>\
// \
//         <label class="control__label">\
//             <input type="checkbox" class="form__control checkbox" data-toggle="module-master">\
//                 Publishing\
//         </label>\
//         <a class="js-module-toggle" href="#"><i class="icon-caret-up"></i></a>\
// \
//         <div class="crud">\
//             <label class="crud__permission">\
//                 <input type="checkbox" class="form__control checkbox" data-toggle="module-crud" data-crud="view">\
//                 <span>View</span>\
//             </label>\
//             <label class="crud__permission">\
//                 <input type="checkbox" class="form__control checkbox" data-toggle="module-crud" data-crud="create">\
//                 <span>Create</span>\
//             </label>\
//             <label class="crud__permission">\
//                 <input type="checkbox" class="form__control checkbox" data-toggle="module-crud" data-crud="update">\
//                 <span>Update</span>\
//             </label>\
//             <label class="crud__permission">\
//                 <input type="checkbox" class="form__control checkbox" data-toggle="module-crud" data-crud="delete">\
//                 <span>Delete</span>\
//             </label>\
//         </div>\
// \
//         <div class="module-row module-page qa-parent">\
//             <label class="control__label">\
//                 <input type="checkbox" class="form__control checkbox" data-toggle="module-row">\
//                     Address &amp; Contacts\
//             </label>\
//             <a class="js-refine-toggle" href="#">refine</a>\
// \
//             <div class="crud">\
//                 <label class="crud__permission">\
//                     <input type="checkbox" class="form__control checkbox" data-toggle="page" data-crud="view">\
//                     <span>View</span>\
//                 </label>\
//                 <label class="crud__permission">\
//                     <input type="checkbox" class="form__control checkbox" data-toggle="page" data-crud="create">\
//                     <span>Create</span>\
//                 </label>\
//                 <label class="crud__permission">\
//                     <input type="checkbox" class="form__control checkbox" data-toggle="page" data-crud="update">\
//                     <span>Update</span>\
//                 </label>\
//                 <label class="crud__permission">\
//                     <input type="checkbox" class="form__control checkbox" data-toggle="page" data-crud="delete">\
//                     <span>Delete</span>\
//                 </label>\
//             </div>\
// \
//             <div class="module-row module-subpage qa-child-one">\
//                 <label class="control__label"><input data-toggle="module-row" type="checkbox" class="form__control checkbox"><span class="label">tab</span> One\
//                 </label>\
//                 <div class="crud">\
//                     <label class="crud__permission">\
//                         <input type="checkbox" class="form__control checkbox" data-toggle="subpage" data-crud="view">\
//                         <span>View</span>\
//                     </label>\
//                     <label class="crud__permission">\
//                         <input type="checkbox" class="form__control checkbox" data-toggle="subpage" data-crud="create">\
//                         <span>Create</span>\
//                     </label>\
//                     <label class="crud__permission">\
//                         <input type="checkbox" class="form__control checkbox" data-toggle="subpage" data-crud="update">\
//                         <span>Update</span>\
//                     </label>\
//                     <label class="crud__permission">\
//                         <input type="checkbox" class="form__control checkbox" data-toggle="subpage" data-crud="delete">\
//                         <span>Delete</span>\
//                     </label>\
//                 </div>\
//             </div>\
//             <div class="module-row module-subpage qa-child-two">\
//                 <label class="control__label"><input data-toggle="module-row" type="checkbox" class="form__control checkbox"><span class="label">tab</span> Two\
//                 </label>\
//                 <div class="crud">\
//                     <label class="crud__permission">\
//                         <input type="checkbox" class="form__control checkbox" data-toggle="subpage" data-crud="view">\
//                         <span>View</span>\
//                     </label>\
//                     <label class="crud__permission">\
//                         <input type="checkbox" class="form__control checkbox" data-toggle="subpage" data-crud="create">\
//                         <span>Create</span>\
//                     </label>\
//                     <label class="crud__permission">\
//                         <input type="checkbox" class="form__control checkbox" data-toggle="subpage" data-crud="update">\
//                         <span>Update</span>\
//                     </label>\
//                     <label class="crud__permission">\
//                         <input type="checkbox" class="form__control checkbox" data-toggle="subpage" data-crud="delete">\
//                         <span>Delete</span>\
//                     </label>\
//                 </div>\
//             </div>\
//         </div>\
//         <div class="module-row module-page">\
//             <label class="control__label">\
//                 <input type="checkbox" class="form__control checkbox" data-toggle="module-row">\
//                     Address &amp; Contacts\
//             </label>\
//             <a class="js-refine-toggle" href="#">refine</a>\
// \
//             <div class="crud">\
//                 <label class="crud__permission">\
//                     <input type="checkbox" class="form__control checkbox" data-toggle="page" data-crud="view">\
//                     <span>View</span>\
//                 </label>\
//                 <label class="crud__permission">\
//                     <input type="checkbox" class="form__control checkbox" data-toggle="page" data-crud="create">\
//                     <span>Create</span>\
//                 </label>\
//                 <label class="crud__permission">\
//                     <input type="checkbox" class="form__control checkbox" data-toggle="page" data-crud="update">\
//                     <span>Update</span>\
//                 </label>\
//                 <label class="crud__permission">\
//                     <input type="checkbox" class="form__control checkbox" data-toggle="page" data-crud="delete">\
//                     <span>Delete</span>\
//                 </label>\
//             </div>\
//         </div>\
//     </div>\
// </div>\
// ').appendTo(this.$moduleBody);

//         this.$moduleToggle = this.$moduleHtml.find('.js-module-toggle');
//         this.$module = this.$moduleToggle.closest('.module');
//         this.$refineToggle = this.$moduleHtml.find('.js-refine-toggle').first();

//         this.$moduleCrudView = this.$moduleHtml.find('[data-toggle="module-crud"][data-crud="view"]');

//         this.$modulePage = this.$moduleHtml.find('.module-page');
//         this.$modulePageRowToggle  = this.$modulePage.find('[data-toggle="module-row"]').first();
//         this.$modulePageCheckboxes = this.$modulePage.find('[data-toggle="module-crud"]');
//         this.$modulePageCrudView = this.$moduleHtml.find('[data-toggle="page"][data-crud="view"]');

//         this.$moduleSubpages = this.$module.find('.module-subpage');
//         this.$moduleSubpage = this.$module.find('.module-subpage').first();
//         this.$moduleSubpageRowToggle = this.$moduleSubpage.find('[data-toggle="module-row"]');
//         this.$moduleSubpageCheckboxes = this.$moduleSubpage.find('[data-crud]');
//         this.$moduleSubpageView = this.$moduleSubpage.find('[data-crud="view"]').first();

//         this.$moduleMasterToggle = this.$moduleHtml.find('[data-toggle="module-master"]');
//         this.$moduleAllCrudCheckboxes = this.$module.find('[data-crud]');
//         this.$moduleAllRowCheckboxes = this.$module.find('[data-toggle="module-row"]');

//         this.modulePermissions = new ModulePermissionsComponent(this.$moduleHtml);
//     });

//     describe('clicking a module toggle', function() {

//         beforeEach(function() {
//             this.modulePermissions.init();
//             this.$moduleToggle.click();
//         });

//         it('should add the .is-open class to it’s parent module', function() {
//             expect(this.$module.hasClass('is-open')).to.be.true;
//         });

//         it('should replace the down caret with an up caret', function() {
//             expect(this.$moduleToggle.find('i').hasClass('icon-caret-up')).to.be.true;
//         });
//     });

//     describe('clicking a module toggle twice', function() {

//         beforeEach(function() {
//             this.modulePermissions.init();
//             this.$moduleToggle.click();
//             this.$moduleToggle.click();
//         });

//         it('should remove the .is-open class', function() {
//             expect(this.$module.hasClass('is-open')).to.be.false;
//         });

//         it('should replace the up caret with a down caret', function() {
//             expect(this.$moduleToggle.find('i').hasClass('icon-caret-down')).to.be.true;
//         });
//     });

//     describe('clicking a refine toggle', function() {

//         beforeEach(function() {
//             this.modulePermissions.init();
//             this.$refineToggle.click();
//         });

//         it('should add the .is-open class to it’s parent module page', function() {
//             expect(this.$modulePage.hasClass('is-open')).to.be.true;
//         });

//         it('should change the refine toggle label to ‘close’', function() {
//             expect(this.$refineToggle.text()).to.equal('close');
//         });
//     });

//     describe('clicking a refine toggle twice', function() {

//         beforeEach(function() {
//             this.modulePermissions.init();
//             this.$refineToggle.click();
//             this.$refineToggle.click();
//         });

//         it('should remove the .is-open class to it’s parent module page', function() {
//             expect(this.$modulePage.hasClass('is-open')).to.be.false;
//         });

//         it('should change the refine toggle label to refine’', function() {
//             expect(this.$refineToggle.text()).to.equal('refine');
//         });
//     });

//     describe('checking a module master toggle', function() {

//         beforeEach(function() {
//             this.modulePermissions.init();
//             this.$moduleMasterToggle.click();
//         });

//         it('should check the control', function() {
//             expect(this.$moduleMasterToggle.prop('checked')).to.be.true;
//         });

//         it('should check all crud checkboxes within the same module', function() {
//             expect(this.$moduleAllCrudCheckboxes.length).to.equal(this.$module.find('[data-crud]:checked').length);
//         });

//         it('should check all row toggle checkboxes within the same module', function() {
//             expect(this.$moduleAllRowCheckboxes.length).to.equal(this.$module.find('[data-toggle="module-row"]:checked').length);
//         });

//         it('should not disable the View checkbox', function() {
//             expect(this.$module.find('[data-crud="view"]').prop('disabled')).to.be.false;
//         });

//         it('should not disable the Create checkbox', function() {
//             expect(this.$module.find('[data-crud="create"]').prop('disabled')).to.be.false;
//         });

//         it('should not disable the Update checkbox', function() {
//             expect(this.$module.find('[data-crud="update"]').prop('disabled')).to.be.false;
//         });

//         it('should not disable the Delete checkbox', function() {
//             expect(this.$module.find('[data-crud="delete"]').prop('disabled')).to.be.false;
//         });
//     });

//     describe('unchecking a module master toggle', function() {

//         beforeEach(function() {
//             this.modulePermissions.init();
//             this.$moduleMasterToggle.click();
//             this.$moduleMasterToggle.click();
//         });

//         it('should uncheck the control', function() {
//             expect(this.$moduleMasterToggle.prop('checked')).to.be.false;
//         });

//         it('should uncheck all checkboxes within the same module', function() {
//             expect(this.$module.find('[data-crud]:checked').length).to.equal(0);
//         });

//         it('should uncheck all row toggle checkboxes within the same module', function() {
//             expect(this.$module.find('[data-toggle="module-row"]:checked').length).to.equal(0);
//         });

//         it('should not disable the View checkbox', function() {
//             expect(this.$module.find('[data-crud="view"]').prop('disabled')).to.be.false;
//         });

//         it('should disable the Create checkbox', function() {
//             expect(this.$module.find('[data-crud="create"]').prop('disabled')).to.be.true;
//         });

//         it('should disable the Update checkbox', function() {
//             expect(this.$module.find('[data-crud="update"]').prop('disabled')).to.be.true;
//         });

//         it('should disable the Delete checkbox', function() {
//             expect(this.$module.find('[data-crud="delete"]').prop('disabled')).to.be.true;
//         });
//     });

//     describe('checking a module-subpage row toggle', function() {

//         beforeEach(function() {
//             this.modulePermissions.init();
//             this.$moduleSubpageRowToggle.click();
//         });

//         it('should check the control', function() {
//             expect(this.$moduleSubpageRowToggle.prop('checked')).to.be.true;
//         });

//         it('should check all checkboxes within the same row', function() {
//             expect(this.$moduleSubpageCheckboxes.length).to.equal(this.$moduleSubpage.find('[data-crud]:checked').length);
//         });

//         it('should not disable the View checkbox', function() {
//             expect(this.$moduleSubpage.find('[data-crud="view"]').prop('disabled')).to.be.false;
//         });

//         it('should enable the Create checkbox', function() {
//             expect(this.$moduleSubpage.find('[data-crud="create"]').prop('disabled')).to.be.false;
//         });

//         it('should enable the Update checkbox', function() {
//             expect(this.$moduleSubpage.find('[data-crud="update"]').prop('disabled')).to.be.false;
//         });

//         it('should enable the Delete checkbox', function() {
//             expect(this.$moduleSubpage.find('[data-crud="delete"]').prop('disabled')).to.be.false;
//         });

//         it('should set the module-page view toggle to indeterminate', function() {
//             expect(this.$modulePage.find('[data-toggle="page"][data-crud="view"]').prop('indeterminate')).to.be.true;
//         });

//         it('should set the module-page create toggle to indeterminate', function() {
//             expect(this.$modulePage.find('[data-toggle="page"][data-crud="create"]').prop('indeterminate')).to.be.true;
//         });

//         it('should set the module-page update toggle to indeterminate', function() {
//             expect(this.$modulePage.find('[data-toggle="page"][data-crud="update"]').prop('indeterminate')).to.be.true;
//         });

//         it('should set the module-page delete toggle to indeterminate', function() {
//             expect(this.$modulePage.find('[data-toggle="page"][data-crud="delete"]').prop('indeterminate')).to.be.true;
//         });

//         it('should set the module view toggle to indeterminate', function() {
//             expect(this.$module.find('[data-toggle="module-crud"][data-crud="view"]').prop('indeterminate')).to.be.true;
//         });

//         it('should set the module create toggle to indeterminate', function() {
//             expect(this.$module.find('[data-toggle="module-crud"][data-crud="create"]').prop('indeterminate')).to.be.true;
//         });

//         it('should set the module update toggle to indeterminate', function() {
//             expect(this.$module.find('[data-toggle="module-crud"][data-crud="update"]').prop('indeterminate')).to.be.true;
//         });

//         it('should set the module delete toggle to indeterminate', function() {
//             expect(this.$module.find('[data-toggle="module-crud"][data-crud="delete"]').prop('indeterminate')).to.be.true;
//         });
//     });

//     describe('unchecking a module-subpage row toggle', function() {

//         beforeEach(function() {
//             this.modulePermissions.init();
//             this.$moduleSubpageRowToggle.click();
//             this.$moduleSubpageRowToggle.click();
//         });

//         it('should uncheck the control', function() {
//             expect(this.$moduleSubpageRowToggle.prop('checked')).to.be.false;
//         });

//         it('should uncheck all checkboxes within the same row', function() {
//             expect(this.$moduleSubpage.find('[data-crud]:checked').length).to.equal(0);
//         });

//         it('should not disable the View checkbox', function() {
//             expect(this.$moduleSubpage.find('[data-crud="view"]').prop('disabled')).to.be.false;
//         });

//         it('should disable the Create checkbox', function() {
//             expect(this.$moduleSubpage.find('[data-crud="create"]').prop('disabled')).to.be.true;
//         });

//         it('should disable the Update checkbox', function() {
//             expect(this.$moduleSubpage.find('[data-crud="update"]').prop('disabled')).to.be.true;
//         });

//         it('should disable the Delete checkbox', function() {
//             expect(this.$moduleSubpage.find('[data-crud="delete"]').prop('disabled')).to.be.true;
//         });

//         it('should set the module-page view toggle to unchecked', function() {
//             expect(this.$modulePage.find('[data-toggle="page"][data-crud="view"]').prop('checked')).to.be.false;
//         });

//         it('should set the module-page create toggle to unchecked', function() {
//             expect(this.$modulePage.find('[data-toggle="page"][data-crud="create"]').prop('checked')).to.be.false;
//         });

//         it('should set the module-page update toggle to unchecked', function() {
//             expect(this.$modulePage.find('[data-toggle="page"][data-crud="update"]').prop('checked')).to.be.false;
//         });

//         it('should set the module-page delete toggle to unchecked', function() {
//             expect(this.$modulePage.find('[data-toggle="page"][data-crud="delete"]').prop('checked')).to.be.false;
//         });

//         it('should set the module view toggle to unchecked', function() {
//             expect(this.$module.find('[data-toggle="module-crud"][data-crud="view"]').prop('checked')).to.be.false;
//         });

//         it('should set the module create toggle to unchecked', function() {
//             expect(this.$module.find('[data-toggle="module-crud"][data-crud="create"]').prop('checked')).to.be.false;
//         });

//         it('should set the module update toggle to unchecked', function() {
//             expect(this.$module.find('[data-toggle="module-crud"][data-crud="update"]').prop('checked')).to.be.false;
//         });

//         it('should set the module delete toggle to unchecked', function() {
//             expect(this.$module.find('[data-toggle="module-crud"][data-crud="delete"]').prop('checked')).to.be.false;
//         });
//     });

//     describe('checking a module-subpage view CRUD toggle', function() {

//         beforeEach(function() {
//             this.modulePermissions.init();
//             this.$moduleHtml.find('.qa-child-one > .crud [data-crud="view"]').click();
//         });

//         it('should check the control', function() {
//             expect(this.$moduleSubpageView.prop('checked')).to.be.true;
//         });

//         it('should set the row toggle to indeterminate', function() {
//             setTimeout(function(){
//                 expect(this.$moduleHtml.find('.qa-child-one [data-toggle="module-row"]:indeterminate').length).to.equal(1);
//             }, 1000);
//         });

//         it('should set the parent row toggle to indeterminate', function() {
//             setTimeout(function(){
//                 expect(this.$moduleHtml.find('.qa-parent > label [data-toggle="module-row"]:indeterminate').length).to.equal(1);
//             }, 1000);
//         });

//         it('should set the master row toggle to indeterminate', function() {
//             setTimeout(function(){
//                 expect(this.$moduleHtml.find('[data-toggle="module-master"]:indeterminate').length).to.equal(1);
//             }, 1000);
//         });


//         it('should not disable the Create checkbox', function() {
//             expect(this.$moduleSubpage.find('[data-crud="create"]').prop('disabled')).to.be.false;
//         });

//         it('should not disable the Update checkbox', function() {
//             expect(this.$moduleSubpage.find('[data-crud="update"]').prop('disabled')).to.be.false;
//         });

//         it('should not disable the Delete checkbox', function() {
//             expect(this.$moduleSubpage.find('[data-crud="delete"]').prop('disabled')).to.be.false;
//         });

//         it('should set the module-page view toggle to indeterminate', function() {
//             expect(this.$modulePage.find('[data-toggle="page"][data-crud="view"]').prop('indeterminate')).to.be.true;
//         });

//         it('should set the module view toggle to indeterminate', function() {
//             expect(this.$module.find('[data-toggle="module-crud"][data-crud="view"]').prop('indeterminate')).to.be.true;
//         });

//     });

//     describe('unchecking a module-subpage view CRUD toggle', function() {

//         beforeEach(function() {
//             this.modulePermissions.init();
//             this.$moduleSubpageView.click();
//             this.$moduleSubpageView.click();
//         });

//         it('should check the control', function() {
//             expect(this.$moduleSubpageView.prop('checked')).to.be.false;
//         });

//         it('should disable the Create checkbox', function() {
//             expect(this.$moduleSubpage.find('[data-crud="create"]').prop('disabled')).to.be.true;
//         });

//         it('should disable the Update checkbox', function() {
//             expect(this.$moduleSubpage.find('[data-crud="update"]').prop('disabled')).to.be.true;
//         });

//         it('should disable the Delete checkbox', function() {
//             expect(this.$moduleSubpage.find('[data-crud="delete"]').prop('disabled')).to.be.true;
//         });

//         it('should set the module-page view toggle to checked', function() {
//             expect(this.$modulePage.find('[data-toggle="page"][data-crud="view"]').prop('checked')).to.be.false;
//         });

//         it('should set the module view toggle to checked', function() {
//             expect(this.$module.find('[data-toggle="module-crud"][data-crud="view"]').prop('checked')).to.be.false;
//         });
//     });

//     describe('checking a module-page row toggle', function() {

//         beforeEach(function() {
//             this.modulePermissions.init();
//             this.$modulePageRowToggle.click();
//         });

//         it('should check the control', function() {
//             expect(this.$modulePageRowToggle.prop('checked')).to.be.true;
//         });

//         it('should check all checkboxes within the same row', function() {
//             expect(this.$modulePage.find('[data-toggle="page"]:checked').length).to.equal(4);
//         });

//         it('should enable the module page CRUD toggles', function() {
//             expect(this.$modulePage.find('[data-toggle="page"]:disabled').length).to.equal(0);
//         });

//         it('should check the module page CRUD toggles', function() {
//             expect(this.$modulePage.find('[data-toggle="page"]:checked').length).to.equal(4);
//         });

//         it('should enable the module page CRUD toggles', function() {
//             expect(this.$modulePage.find('[data-toggle="subpage"]:disabled').length).to.equal(0);
//         });

//         it('should set the module CRUD toggles to indeterminate', function() {
//             expect(this.$moduleHtml.find('[data-toggle="module-crud"]:indeterminate').length).to.equal(4);
//         });

//         it('should check the module subpage CRUD toggles', function() {
//             expect(this.$modulePage.find('[data-toggle="subpage"]:checked').length).to.equal(8);
//         });

//         it('should check the module page row toggles', function() {
//             expect(this.$moduleHtml.find('.module-page > label > [data-toggle="module-row"]:checked').length).to.equal(1);
//         });

//         it('should check the module subpage row toggles', function() {
//             expect(this.$modulePage.find('.module-subpage [data-toggle="module-row"]:checked').length).to.equal(2);
//         });

//     });

//     describe('unchecking a module-page row toggle', function() {

//         beforeEach(function() {
//             this.modulePermissions.init();
//             this.$modulePageRowToggle.click();
//             this.$modulePageRowToggle.click();
//         });

//         it('should uncheck the control', function() {
//             expect(this.$modulePageRowToggle.prop('checked')).to.be.false;
//         });

//         it('should uncheck all checkboxes within the same row', function() {
//             expect(this.$modulePage.find('[data-toggle="page"]:checked').length).to.equal(0);
//         });

//         it('should disable the module page CRUD toggles', function() {
//             expect(this.$modulePage.find('[data-toggle="page"]:disabled').length).to.equal(3);
//         });

//         it('should uncheck the module page CRUD toggles', function() {
//             expect(this.$modulePage.find('[data-toggle="page"]:checked').length).to.equal(0);
//         });

//         it('should disable the module page CRUD toggles', function() {
//             expect(this.$modulePage.find('[data-toggle="subpage"]:disabled').length).to.equal(6);
//         });

//         it('should uncheck the module CRUD toggles', function() {
//             expect(this.$moduleHtml.find('[data-toggle="module-crud"]:checked').length).to.equal(0);
//         });

//         it('should uncheck the module subpage CRUD toggles', function() {
//             expect(this.$modulePage.find('[data-toggle="subpage"]:checked').length).to.equal(0);
//         });

//         it('should uncheck the module page row toggles', function() {
//             expect(this.$moduleHtml.find('.module-page > label > [data-toggle="module-row"]:checked').length).to.equal(0);
//         });

//         it('should uncheck the module subpage row toggles', function() {
//             expect(this.$modulePage.find('.module-subpage [data-toggle="module-row"]:checked').length).to.equal(0);
//         });

//     });

//     describe('checking the view module-crud toggle', function() {

//         beforeEach(function() {
//             this.modulePermissions.init();
//             this.$moduleCrudView.click();
//         });

//         it('should check the control', function() {
//             expect(this.$moduleCrudView.prop('checked')).to.be.true;
//         });

//         it('should check all view [page] toggles', function() {
//             expect(this.$moduleHtml.find('[data-toggle="page"][data-crud="view"]:checked').length).to.equal(2);
//         });

//         it('should not check other [page] toggles', function() {
//             expect(this.$moduleHtml.find('[data-toggle="page"]:not([data-crud="view"]):checked').length).to.equal(0);
//         });

//         it('should check all view [subpage] toggles', function() {
//             expect(this.$moduleHtml.find('[data-toggle="subpage"][data-crud="view"]:checked').length).to.equal(2);
//         });

//         it('should not check other [subpage] toggles', function() {
//             expect(this.$moduleHtml.find('[data-toggle="subpage"]:not([data-crud="view"]):checked').length).to.equal(0);
//         });

//     });

//     describe('un checking the view module-crud toggle', function() {

//         beforeEach(function() {
//             this.modulePermissions.init();
//             this.$moduleCrudView.click();
//             this.$moduleCrudView.click();
//         });

//         it('should uncheck the control', function() {
//             expect(this.$moduleCrudView.prop('checked')).to.be.false;
//         });

//         it('should uncheck all view [page] toggles', function() {
//             expect(this.$moduleHtml.find('[data-toggle="page"][data-crud="view"]:checked').length).to.equal(0);
//         });

//         it('should uncheck all view [subpage] toggles', function() {
//             expect(this.$moduleHtml.find('[data-toggle="subpage"][data-crud="view"]:checked').length).to.equal(0);
//         });

//     });

//     describe('clicking an indeterminate view [module-crud] toggle', function() {

//         beforeEach(function() {

//             this.modulePermissions.init();
//             this.$moduleCrudView.click();
//             this.$moduleHtml.find('.qa-child-two > .crud [data-crud="view"]').click();
//             this.$moduleCrudView.click();
//         });

//         it('should check the control', function() {
//             setTimeout(function(){
//                 expect(this.$moduleHtml.find('[data-toggle="module-crud"][data-crud="view"]').prop('checked')).to.be.true;
//             }, 1000);
//         });

//         it('should check all view [page] toggles', function() {
//             setTimeout(function(){
//                 expect(this.$moduleHtml.find('[data-toggle="page"][data-crud="view"]:checked').length).to.equal(2);
//             }, 1000);
//         });

//         it('should not check other [page] toggles', function() {
//             setTimeout(function(){
//                 expect(this.$moduleHtml.find('[data-toggle="page"]:not([data-crud="view"]):checked').length).to.equal(
//                     0);
//             }, 1000);
//         });

//         it('should check all view [subpage] toggles', function() {
//             setTimeout(function(){
//                 expect(this.$moduleHtml.find('[data-toggle="subpage"][data-crud="view"]:checked').length).to.equal(2);
//             }, 1000);
//         });

//         it('should not check other [subpage] toggles', function() {
//             setTimeout(function(){
//                 expect(this.$moduleHtml.find('[data-toggle="subpage"]:not([data-crud="view"]):checked').length).to.equal(0);
//             }, 1000);
//         });

//     });

//     describe('checking the view module-page toggle', function() {

//         beforeEach(function() {
//             this.modulePermissions.init();
//             this.$modulePageCrudView.click();
//         });

//         it('should check the control', function() {
//             expect(this.$modulePageCrudView.prop('checked')).to.be.true;
//         });

//         it('should check all view [subpage] toggles', function() {
//             expect(this.$moduleHtml.find('[data-toggle="subpage"][data-crud="view"]:checked').length).to.equal(2);
//         });

//         it('should not check other [subpage] toggles', function() {
//             expect(this.$moduleHtml.find('[data-toggle="subpage"]:not([data-crud="view"]):checked').length).to.equal(0);
//         });

//     });

//     describe('unchecking the view module-page toggle', function() {

//         beforeEach(function() {
//             this.modulePermissions.init();
//             this.$modulePageCrudView.click();
//             this.$modulePageCrudView.click();
//         });

//         it('should uncheck the control', function() {
//             expect(this.$modulePageCrudView.prop('checked')).to.be.false;
//         });

//         it('should uncheck all view [subpage] toggles', function() {
//             expect(this.$moduleHtml.find('[data-toggle="subpage"][data-crud="view"]:checked').length).to.equal(0);
//         });

//         it('should not check other [subpage] toggles', function() {
//             expect(this.$moduleHtml.find('[data-toggle="subpage"]:not([data-crud="view"]):checked').length).to.equal(0);
//         });

//     });

//     describe('checking a [page] toggle with a disabled [subpage]', function() {

//         beforeEach(function() {
//             this.modulePermissions.init();
//             this.$moduleHtml.find('.qa-parent > .crud [data-toggle="page"][data-crud="view"]').click();
//             this.$moduleHtml.find('.qa-child-two > .crud [data-crud="view"]').click();
//         });

//         it('should disable the CUD controls', function() {
//             expect(this.$moduleHtml.find('.qa-child-one [data-crud]:not([data-crud="view"])').length).to.equal(3);
//         });

//         it('should set the READ toggle to indeterminate', function() {
//             expect(this.$moduleHtml.find('.qa-parent > .crud [data-toggle="page"][data-crud="view"]:indeterminate').length).to.equal(1);
//         });

//         it('should set the master READ toggle to indeterminate', function() {
//             expect(this.$moduleHtml.find('.qa-master [data-toggle="module-crud"][data-crud="view"]:indeterminate').length).to.equal(1);
//         });

//     });

//     describe('checking a [subpage] toggle with an indeterminate [page]', function() {

//         beforeEach(function() {
//             this.modulePermissions.init();
//             this.$moduleHtml.find('.qa-child-one > .crud [data-crud="view"]').click();
//             this.$moduleHtml.find('.qa-child-two > .crud [data-crud="view"]').click();
//         });

//         it('should check the [page] view control', function() {
//             expect(this.$moduleHtml.find('.qa-parent > .crud [data-crud="view"]:checked').length).to.equal(1);
//         });
//     });
// });

