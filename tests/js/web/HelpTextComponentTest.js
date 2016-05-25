'use strict'

var $ = require('jquery'),
    HelpTextComponent = require('../../../js/HelpTextComponent');

describe('HelpTextComponent', function() {

    beforeEach(function() {
        this.$window = $('<div></div>');
        this.window = this.$window[0];
        this.window.matchMedia = sinon.stub();
        this.$document = $('<div></div>').appendTo(this.$window);
        this.$html = $('<html></html>').appendTo(this.$document);
        this.$body = $('<body></body>').appendTo(this.$html);
        this.$tabHelpContainer = $('<div class="tab-help-container"></div>').appendTo(this.$body);
        this.$tabHelp = $('<div class="tab-help"></div>').appendTo(this.$tabHelpContainer);
        this.$contentMain = $('<div class="content-main"></div>').appendTo(this.$body);
        this.$tabsContent = $('<div class="tabs__content"></div>').appendTo(this.$contentMain);
        this.$tabLink = $('<a href="#" data-toggle="tab">tab</a>').appendTo(this.$tabsContent);
        this.$mainTitle = $('<h1 class="main-title">Main title</h1>').appendTo(this.$tabsContent);
        this.$tabPane = $('<div class="tab__pane is-active"></div>').appendTo(this.$tabsContent);
        this.$tabContainer = $('<div class="tab__container"></div>').appendTo(this.$tabPane)
        this.$tabContent = $('<div class="tab__content"></div>').appendTo(this.$tabContainer);
        this.$tabContentLink = $('<a href="#">link outside of sidebar</a>').appendTo(this.$tabContent);
        this.$tabSidebar = $('<div class="tab__sidebar">Some help text</div>').appendTo(this.$tabContainer);

        this.helpTextComponent = new HelpTextComponent(this.$html, this.window, this.$document[0]);
    });

    describe('When the page loads on mobile', function() {

        beforeEach(function () {
            this.window.matchMedia.returns({matches: false});
            this.helpTextComponent.init();
            this.helpTextComponent.updateHelpSidebar();
        });

        it('should add the visibility-hidden class to the tab-help-container', function () {
            expect(this.$tabHelpContainer.hasClass('visibility-hidden')).to.be.true;
        });

        it('should copy the active tabs sidebar contents to the tab-help container', function() {
            expect(this.$tabHelp.html()).to.equal('<a href="#" class="close-page-help js-close-page-help"><i class="icon-remove-sign"></i></a>Some help text');
        });

        it('should add the help-close button to the tab-help container', function() {
            expect(this.$tabHelp.find('.js-close-page-help').length).to.equal(1);
        });

        it('should add the help toggle button to the first heading', function() {
            expect(this.$mainTitle.find('.js-show-page-help').length).to.equal(1);
        });
    });

    describe('When the side help is closed and the help button is pressed', function() {

        beforeEach(function () {
            this.window.matchMedia.returns({matches: false});
            this.helpTextComponent.init();
            this.helpTextComponent.updateHelpSidebar();
            this.clickEvent = $.Event('click');
        });

        it('should prevent the default behaviour', function () {
            this.$mainTitle.find('.js-show-page-help').trigger(this.clickEvent);

            expect(this.clickEvent.isDefaultPrevented()).to.be.true;
        });

        it('should stop propagation of the click event', function () {
            this.$mainTitle.find('.js-show-page-help').trigger(this.clickEvent);

            expect(this.clickEvent.isPropagationStopped()).to.be.true;
        });

        it('should open the side menu', function () {
            this.$mainTitle.find('.js-show-page-help').trigger(this.clickEvent);

            expect(this.$html.hasClass('open-help')).to.be.true;
        });

        it('should add the is-open class to the button ', function () {
            this.$mainTitle.find('.js-show-page-help').trigger(this.clickEvent);

            expect(this.$mainTitle.find('.js-show-page-help').hasClass('is-open')).to.be.true;
        });
    });

    describe('When the side help is open and the help button is pressed', function() {

        beforeEach(function () {
            this.window.matchMedia.returns({matches: false});
            this.helpTextComponent.init();
            this.helpTextComponent.updateHelpSidebar();
            this.clickEvent = $.Event('click');
            this.$html.addClass('open-help');
            this.$mainTitle.find('.js-show-page-help').addClass('is-open');
        });

        it('should close the side menu', function () {
            this.$mainTitle.find('.js-show-page-help').trigger(this.clickEvent);

            expect(this.$html.hasClass('open-help')).to.be.false;
        });

        it('should remove the is-open class from the help button', function () {
            this.$mainTitle.find('.js-show-page-help').trigger(this.clickEvent);

            expect(this.$mainTitle.find('.js-show-page-help').hasClass('is-open')).to.be.false;
        });

        it('should add the visibility-hidden class to the tab-help-container', function () {
            this.$mainTitle.find('.js-show-page-help').trigger(this.clickEvent);
            this.$tabHelpContainer.trigger('transitionend');
            expect(this.$tabHelpContainer.hasClass('visibility-hidden')).to.be.true;
        });

        it('should add the visibility-hidden class to the tab-help-container if lt-ie10', function () {
            this.$html.addClass('lt-ie10');
            this.$mainTitle.find('.js-show-page-help').trigger(this.clickEvent);

            expect(this.$tabHelpContainer.hasClass('visibility-hidden')).to.be.true;
        });
    });

    describe('When the close help button is pressed', function() {

        beforeEach(function () {
            this.window.matchMedia.returns({matches: false});
            this.helpTextComponent.init();
            this.helpTextComponent.updateHelpSidebar();
            this.clickEvent = $.Event('click');
        });

        it('should prevent the default behaviour', function () {
            this.$tabHelp.find('.js-close-page-help').trigger(this.clickEvent);

            expect(this.clickEvent.isDefaultPrevented()).to.be.true;
        });

        it('should stop propagation of the click event', function () {
            this.$mainTitle.find('.js-show-page-help').trigger(this.clickEvent);

            expect(this.clickEvent.isPropagationStopped()).to.be.true;
        });

        it('should close the side menu', function () {
            this.$html.addClass('open-help');

            this.$tabHelp.find('.js-close-page-help').trigger(this.clickEvent);

            expect(this.$html.hasClass('open-help')).to.be.false;
        });

        it('should remove the is-open class from the help button', function () {
            this.$mainTitle.find('.js-show-page-help').addClass('is-open');

            this.$tabHelp.find('.js-close-page-help').trigger(this.clickEvent);

            expect(this.$mainTitle.find('.js-show-page-help').hasClass('is-open')).to.be.false;
        });

        it('should add the visibility-hidden class from the tab-help-container', function () {
            expect(this.$tabHelpContainer.hasClass('visibility-hidden')).to.be.true;
        });
    });

    describe('If the help sidebar content does not exist', function() {

        beforeEach(function () {
            this.window.matchMedia.returns({matches: false});
            this.$tabSidebar.empty();
            this.helpTextComponent.init();
            this.helpTextComponent.updateHelpSidebar();
        });

        it('should remove the has-sidebar class from the tab container', function () {
            expect(this.$tabContainer.hasClass('has-sidebar')).to.be.false;
        });
    });

    describe('If the help sidebar does not exists', function() {

        beforeEach(function () {
            this.$tabSidebar.remove();
            this.window.matchMedia.returns({matches: false});
            this.helpTextComponent.init();
            this.helpTextComponent.updateHelpSidebar();
        });

        it('should remove the has-sidebar class from the tab container', function () {
            expect(this.$tabContainer.hasClass('has-sidebar')).to.be.false;
        });
    });

    describe('When the help sidebar is open and outside of the sidebar is clicked', function() {

        beforeEach(function () {
            this.window.matchMedia.returns({matches: false});
            this.helpTextComponent.init();
            this.helpTextComponent.updateHelpSidebar();
            this.clickEvent = $.Event('click');
            this.$html.addClass('open-help');
            this.$mainTitle.find('.js-show-page-help').addClass('is-open');
        });

        it('should close the help side bar', function () {
            this.$tabContentLink.trigger(this.clickEvent);

            expect(this.$html.hasClass('open-help')).to.be.false;
        });

        it('should remove the is-open class from the mobile help button', function () {
            this.$tabContentLink.trigger(this.clickEvent);

            expect(this.$mainTitle.find('.js-show-page-help').hasClass('is-open')).to.be.false;
        });

        it('should add the visibility-hidden class from the tab-help-container', function () {
            expect(this.$tabHelpContainer.hasClass('visibility-hidden')).to.be.true;
        });
    });

    describe('When the active tab is changed', function() {

        beforeEach(function () {
            this.window.matchMedia.returns({matches: false});
            this.helpTextComponent.init();
            this.helpTextComponent.updateHelpSidebar();
            sinon.spy(this.helpTextComponent, 'updateHelpSidebar');
            this.$tabLink.trigger('shown.bs.tab');
        });

        it('should call the update help sidebar method', function () {
            expect(this.helpTextComponent.updateHelpSidebar).to.have.been.called;
        });
    });

    describe('When the window is resized', function() {

        beforeEach(function () {
            this.window.matchMedia.returns({matches: false});
            this.helpTextComponent.init();
            this.helpTextComponent.updateHelpSidebar();
            this.$window.trigger('resize');
        });

        it('should copy the active tabs sidebar contents to the tab-help container', function() {
            expect(this.$tabHelp.html()).to.equal('<a href="#" class="close-page-help js-close-page-help"><i class="icon-remove-sign"></i></a>Some help text');
        });

        it('should add the help-close button to the tab-help container', function() {
            expect(this.$tabHelp.find('.js-close-page-help').length).to.equal(1);
        });

    });
});
