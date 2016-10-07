'use strict';

var $ = require('jquery'),
jqueryui  = require('../../../libs/jquery-ui/jquery-ui.min'),
NavMainComponent = require('../../../js/NavMainComponent');

describe('NavMain component', function() {

    beforeEach(function() {
        this.$html = $('<div id="html"></div>').appendTo('html');
        this.$body = $('<div id="body"></div>').appendTo(this.$html);
        this.$markup = $('\
<nav class="nav-main">\
    <div class="nav-primary">\
        <a href="http://jadu.net">Jadu</a>\
\
        <ul class="nav-items">\
            <li class="nav-item">\
                <a href="#quickstart" class="nav-link">quickstart</a>\
            </li>\
            <li class="nav-item">\
                <a href="#one" class="nav-link">1</a>\
            </li>\
            <li class="nav-item">\
                <a href="#two" class="nav-link">2</a>\
            </li>\
            <li class="nav-item">\
                <a href="#three" class="nav-link">3</a>\
            </li>\
        </ul>\
    </div><!--\
\
    --><div class="nav-secondary" data-ui="nav-container">\
\
        <a href="#close" data-nav-action="close">x</a>\
\
        <form>\
            <input type="search" placeholder="search" />\
            <button>Go</button>\
        </form>\
\
        <div class="nav-list" data-nav="#one">\
            <ul class="nav-items">\
                <li class="nav-item">\
                    <a href="#one_one" class="nav-link">1.1</a>\
                </li>\
            </ul>\
        </div>\
\
        <div class="nav-list" data-nav="#two">\
            <ul class="nav-items">\
                <li class="nav-item">\
                    <a href="#two_one" class="nav-link">2.1</a>\
                </li>\
            </ul>\
        </div>\
\
    </div>\
\
    <div data-nav="#quickstart" data-ui="nav-container">\
        <a href="#close" data-nav-action="close">x</a>\
        <div data-nav="#quickstart-main">\
            <a href="#" data-nav-action="quickstart-manage">manage</a>\
            <span class="visually-hidden" data-nav-action="quickstart-save">save</span>\
            <span class="visually-hidden" data-ui="quickstart-hint">hint</span>\
            <ul class="nav-items">\
            </ul>\
        </div>\
        <div data-nav="#quickstart-additional">\
            <a href="#" data-nav-action="quickstart-manage">manage</a>\
            <span class="visually-hidden" data-ui="quickstart-hint">hint</span>\
            <ul class="nav-items">\
            </ul>\
        </div>\
    </div>\
\
</nav>\
').appendTo(this.$body);

        this.$navMain = this.$html.find('.nav-main');
        this.$navSecondary = this.$html.find('.nav-secondary');
        this.$closeLink = this.$navMain.find('[data-nav-action="close"]');

        this.$linkOne = this.$navMain.find('[href="#one"]');
        this.$linkTwo = this.$navMain.find('[href="#two"]');
        this.$linkThree = this.$navMain.find('[href="#three"]');
        this.$secondaryLinkOne = this.$navMain.find('[href="#one_one"]');
        this.$secondaryLinkTwo = this.$navMain.find('[href="#two_one"]');
        this.$quickstartLink = this.$navMain.find('[href="#quickstart"]');
        this.$quickstartManageLink = this.$navMain.find('[data-nav-action="quickstart-manage"]');
        this.$quickstartSaveLink = this.$navMain.find('[data-nav-action="quickstart-save"]');

        this.$quickstartContainer = this.$navMain.find('[data-nav="#quickstart"]');
        this.$quickstartMainContainer = this.$navMain.find('[data-nav="#quickstart-main"]');
        this.$quickstartAdditionalContainer = this.$navMain.find('[data-nav="#quickstart-additional"]');
        this.$quickstartMainHint = this.$navMain.find('[data-nav="#quickstart-main"] [data-ui="quickstart-hint"]');
        this.$quickstartAdditionalHint = this.$navMain.find('[data-nav="#quickstart-additional"] [data-ui="quickstart-hint"]');
        this.$quickstartMainList = this.$navMain.find('[data-nav="#quickstart-main"] .nav-items');
        this.$quickstartAdditionalList = this.$navMain.find('[data-nav="#quickstart-additional"] .nav-items');

        this.navMainComponent = new NavMainComponent(this.$html);

    });

    describe('clicking on the first primary nav link', function() {

        beforeEach(function() {
            this.navMainComponent.init();
        });

        it('should add the is-active class to the first link', function() {
            this.$linkOne.click();
            expect(this.$linkOne.hasClass('is-active')).to.be.true;
        });

        it('should open the secondary nav', function() {
            this.$linkOne.click();
            expect(this.$navSecondary.hasClass('is-open')).to.be.true;
        });

        it('should add the is-active class to the secondary sub navigation menu', function() {
            this.$linkOne.click();
            expect(this.$navMain.find('[data-nav="#one"]').hasClass('is-active')).to.be.true;
        });

        it('should not add the is-active class to the other sub navigation menus', function() {
            this.$linkOne.click();
            expect(this.$navMain.find('[data-nav="#two"]').hasClass('is-active')).to.be.false;
        });

    });

    describe('clicking the first, then the second primary nav link', function() {

        beforeEach(function() {
            this.navMainComponent.init();
            this.$linkOne.click();
            this.$linkTwo.click();
        });

        it('should add the is-active class to the second link', function() {
            expect(this.$linkTwo.hasClass('is-active')).to.be.true;
        });

        it('should remove the is-active class from the first link', function() {
            expect(this.$linkOne.hasClass('is-active')).to.be.false;
        });

        it('should add the is-active class to the second sub navigation menu', function() {
            expect(this.$navMain.find('[data-nav="#two"]').hasClass('is-active')).to.be.true;
        });

        it('should remove the is-active class from the first sub navigation menu', function() {
            expect(this.$navMain.find('[data-nav="#one"]').hasClass('is-active')).to.be.false;
        });

    });

    describe('clicking a secondary nav link', function() {

        beforeEach(function() {
            this.navMainComponent.init();
            this.$linkOne.click();
            this.$secondaryLinkOne.click();
        });

        it('should add the is-active class to the clicked link', function() {
            expect(this.$secondaryLinkOne.hasClass('is-active')).to.be.true;
        });

    });

    describe('clicking a second secondary nav link', function() {

        beforeEach(function() {
            this.navMainComponent.init();
            this.$linkOne.click();
            this.$secondaryLinkOne.click();
            this.$secondaryLinkTwo.click();
        });

        it('should add the is-active class to the clicked link', function() {
            expect(this.$secondaryLinkTwo.hasClass('is-active')).to.be.true;
        });

    });

    describe('clicking a primary nav link that has no sub navigation', function() {

        beforeEach(function() {
            this.navMainComponent.init();
            this.$linkThree.click();
        });

        it('should not open the secondary nav', function() {
            expect(this.$navMain.hasClass('is-open')).to.be.false;
        });
    });

    describe('clicking a primary nav link that has no sub navigation when the subnavigation is open', function() {

        beforeEach(function() {
            this.navMainComponent.init();
            this.$linkOne.click();
            this.$linkThree.click();
        });

        it('should close the secondary nav', function() {
            expect(this.$navMain.find('.nav-main').hasClass('nav-main--open')).to.be.false;
        });
    });

    describe('clicking the close icon, when the sub navigation is closed', function() {

        beforeEach(function() {
            this.navMainComponent.init();
            this.$closeLink.click();
        });

        it('should have no effect on the subnavigation', function() {
            expect(this.$navMain.find('.nav-main').hasClass('is-active')).to.be.false;
        });

    });

    describe('clicking the close icon, when the sub navigation is open', function() {

        beforeEach(function() {
            this.navMainComponent.init();
            this.$linkOne.click();
            this.$closeLink.click();
        });

        it('should close the sub navigation', function() {
            expect(this.$navMain.find('.nav-main').hasClass('is-open')).to.be.false;
        });

    });

    describe('clicking the quickstart link', function() {

        beforeEach(function() {
            jQuery.fx.off = true;
            this.navMainComponent.init();
            this.$quickstartLink.click();
        });

        it('should open the quickstart menu', function() {
            expect(this.$quickstartContainer.hasClass('is-open')).to.be.true;
        });

        it('should show the manage link', function() {
            expect(this.$quickstartManageLink.hasClass('visually-hidden')).to.be.false;
        });

        it('should not show the save link', function() {
            expect(this.$quickstartSaveLink.hasClass('visually-hidden')).to.be.true;
        });

        it('should not show the main hint', function() {
            expect(this.$quickstartMainHint.hasClass('visually-hidden')).to.be.true;
        });

        it('should not have a sortable main nav list', function() {
            expect(this.$quickstartMainList.hasClass('is-sortable')).to.be.false;
        });

        it('should not call the sortable plugin', function() {
            sinon.spy($.fn, 'sortable');
            expect($.fn.sortable).to.not.have.been.called;
            $.fn.sortable.restore();
        });

    });

    describe('clicking the manage quickstart link', function() {

        beforeEach(function() {
            jQuery.fx.off = true;
            sinon.spy($.fn, 'sortable');
            this.navMainComponent.init();
            this.$quickstartLink.click();
            this.$quickstartManageLink.click();
        });

        afterEach(function() {
            $.fn.sortable.restore();
        });

        it('should hide the manage link', function() {
            expect(this.$quickstartManageLink.attr('style')).to.eq('display: none;');
        });

        it('should show the save link', function() {
            expect(this.$quickstartSaveLink.hasClass('visually-hidden')).to.be.false;
        });

        it('should show the main hint', function() {
            expect(this.$quickstartMainHint.attr('style')).to.eq('display: inline-block;');
        });

        it('should show the additional hint', function() {
            expect(this.$quickstartAdditionalHint.attr('style')).to.eq('display: inline-block;');
        });

        it('should add the sortable class to the main quickstart nav list', function() {
            expect(this.$quickstartMainList.hasClass('is-sortable')).to.be.true;
        });

        it('should add the sortable class to the additional quickstart nav list', function() {
            expect(this.$quickstartAdditionalList.hasClass('is-sortable')).to.be.true;
        });

        it('should call the sortable plugin twice', function() {
            expect($.fn.sortable).to.have.been.called.twice;
        });

    });

    describe('clicking the quickstart save link', function() {

        beforeEach(function() {
            jQuery.fx.off = true;
            sinon.spy($.fn, 'sortable');
            this.navMainComponent.init();
            this.$quickstartLink.click();
            this.$quickstartSaveLink.click();
        });

        afterEach(function() {
            $.fn.sortable.restore();
        });

        it('should show the manage link', function() {
            expect(this.$quickstartManageLink.hasClass('visually-hidden')).to.be.false;
        });

        it('should hide the save link', function() {
            expect(this.$quickstartSaveLink.hasClass('visually-hidden')).to.be.true;
        });

        it('should hide the main hint', function() {
            expect(this.$quickstartMainHint.hasClass('visually-hidden')).to.be.true;
        });

        it('should hide the additional hint', function() {
            expect(this.$quickstartAdditionalHint.hasClass('visually-hidden')).to.be.true;
        });

        it('should remove the sortable class from the main nav list', function() {
            expect(this.$quickstartMainList.hasClass('is-sortable')).to.be.false;
        });

        it('should remove the sortable class from the additional nav list', function() {
            expect(this.$quickstartAdditionalList.hasClass('is-sortable')).to.be.false;
        });

    });

});
