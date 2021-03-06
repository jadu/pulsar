/*jshint multistr: true */

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
        this.$tabPane = $('<div class="tab__pane is-active"></div>').appendTo(this.$tabsContent);
        this.$tabContainer = $('<div class="tab__container"></div>').appendTo(this.$tabPane)
        this.$tabContent = $('<div class="tab__content"></div>').appendTo(this.$tabContainer);
        this.$tabContentLink = $('<a href="#">link outside of sidebar</a>').appendTo(this.$tabContent);
        this.$tabSidebar = $('<div class="tab__sidebar">Some help text <a href="#">link</a></div>').appendTo(this.$tabContainer);

        this.helpTextComponent = new HelpTextComponent(this.$html, this.window, this.$document[0]);
    });

    describe('When the page loads on mobile', function() {

        beforeEach(function () {
            this.window.matchMedia.returns({matches: false});
            this.helpTextComponent.init();
            this.helpTextComponent.updateHelpSidebar();
        });

        it('should add the hide class to the tab-help-container', function () {
            expect(this.$tabHelpContainer.hasClass('hide')).to.be.true;
        });

        it('should add aria-hidden tab-help-container', function () {
            expect(this.$tabHelpContainer.attr('aria-hidden')).to.equal('true');
        });

        it('should copy the active tabs sidebar contents to the tab-help container', function() {
            expect(this.$tabHelp.html()).to.equal('<button type="button" class="close-page-help js-close-page-help" tabindex="-1"><i class="icon-remove-sign" aria-hidden="true"></i><span class="hide">Close on-page help</span></button>Some help text <a href="#" tabindex="-1">link</a>');
        });

        it('should add the help-close button to the tab-help container', function() {
            expect(this.$tabHelp.find('.js-close-page-help').length).to.equal(1);
        });

        it('should add the help toggle button to .tab__content', function() {
            expect(this.$tabContent.find('.js-show-page-help').length).to.equal(1);
        });

        it('should add tabindex="-1" to all links and buttons', function () {
            expect(this.$tabHelp.find('a').attr('tabindex')).to.equal('-1')
        });
    });

    describe('When the side help is closed and the help button is pressed', function() {

        beforeEach(function () {
            this.window.matchMedia.returns({matches: false});
            this.helpTextComponent.init();
            this.helpTextComponent.updateHelpSidebar();
            this.clickEvent = $.Event('click');
            this.focusEvent = $.Event('focus');
        });

        it('should prevent the default behaviour', function () {
            this.$tabContent.find('.js-show-page-help').trigger(this.clickEvent);

            expect(this.clickEvent.isDefaultPrevented()).to.be.true;
        });

        it('should stop propagation of the click event', function () {
            this.$tabContent.find('.js-show-page-help').trigger(this.clickEvent);

            expect(this.clickEvent.isPropagationStopped()).to.be.true;
        });

        it('should open the side menu', function () {
            this.$tabContent.find('.js-show-page-help').trigger(this.clickEvent);

            expect(this.$html.hasClass('open-help')).to.be.true;
        });

        it('should add the is-open class to the button ', function () {
            this.$tabContent.find('.js-show-page-help').trigger(this.clickEvent);

            expect(this.$tabContent.find('.js-show-page-help').hasClass('is-open')).to.be.true;
        });

        it('should remove the aria-hidden attribute from the tab-help-container', function () {
            this.$tabContent.find('.js-show-page-help').trigger(this.clickEvent);

            expect(this.$tabHelpContainer.attr('aria-hidden')).to.be.undefined;
        });

        it('move focus to the close button', function () {
            sinon.spy(this.helpTextComponent, 'toggleHelpSidebar');
            this.$tabContent.find('.js-show-page-help').trigger(this.clickEvent);
            this.$tabHelpContainer.trigger('transitionend');

            expect(this.helpTextComponent.toggleHelpSidebar).to.have.been.called;
        });

        it('should remove tabindex="-1" from all links and buttons', function () {
            this.$tabContent.find('.js-show-page-help').trigger(this.clickEvent);

            expect(this.$tabHelp.find('a').attr('tabindex')).to.be.undefined;
        });
    });

    describe('When the side help is open and the help button is pressed', function() {

        beforeEach(function () {
            this.window.matchMedia.returns({matches: false});
            this.helpTextComponent.init();
            this.helpTextComponent.updateHelpSidebar();
            this.clickEvent = $.Event('click');
            this.$html.addClass('open-help');
            this.$tabContent.find('.js-show-page-help').addClass('is-open');
        });

        it('should close the side menu', function () {
            this.$tabContent.find('.js-show-page-help').trigger(this.clickEvent);

            expect(this.$html.hasClass('open-help')).to.be.false;
        });

        it('should remove the is-open class from the help button', function () {
            this.$tabContent.find('.js-show-page-help').trigger(this.clickEvent);

            expect(this.$tabContent.find('.js-show-page-help').hasClass('is-open')).to.be.false;
        });

        it('should add the hide class to the tab-help-container', function () {
            this.$tabContent.find('.js-show-page-help').trigger(this.clickEvent);
            this.$tabHelpContainer.trigger('transitionend');
            expect(this.$tabHelpContainer.hasClass('hide')).to.be.true;
        });

        it('should add aria-hidden attribute to the tab-help-container', function () {
            this.$tabContent.find('.js-show-page-help').trigger(this.clickEvent);
            this.$tabHelpContainer.trigger('transitionend');
            expect(this.$tabHelpContainer.attr('aria-hidden')).to.equal('true');
        });

        it('should add the hide class to the tab-help-container if lt-ie10', function () {
            this.$html.addClass('lt-ie10');
            this.$tabContent.find('.js-show-page-help').trigger(this.clickEvent);

            expect(this.$tabHelpContainer.hasClass('hide')).to.be.true;
        });

        it('should add aria-hidden attribute to the tab-help-container', function () {
            this.$html.addClass('lt-ie10');
            this.$tabContent.find('.js-show-page-help').trigger(this.clickEvent);

            expect(this.$tabHelpContainer.attr('aria-hidden')).to.equal('true');
        });

        it('should add tabindex="-1" to all links and buttons', function () {
            expect(this.$tabHelp.find('a').attr('tabindex')).to.equal('-1')
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
            this.$tabContent.find('.js-show-page-help').trigger(this.clickEvent);

            expect(this.clickEvent.isPropagationStopped()).to.be.true;
        });

        it('should close the side menu', function () {
            this.$html.addClass('open-help');

            this.$tabHelp.find('.js-close-page-help').trigger(this.clickEvent);

            expect(this.$html.hasClass('open-help')).to.be.false;
        });

        it('should remove the is-open class from the help button', function () {
            this.$tabContent.find('.js-show-page-help').addClass('is-open');

            this.$tabHelp.find('.js-close-page-help').trigger(this.clickEvent);

            expect(this.$tabContent.find('.js-show-page-help').hasClass('is-open')).to.be.false;
        });

        it('should add the hide class from the tab-help-container', function () {
            expect(this.$tabHelpContainer.hasClass('hide')).to.be.true;
        });

        it('should add the aria-hidden attribute to the tab-help-container', function () {
            expect(this.$tabHelpContainer.attr('aria-hidden')).to.equal('true');
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
            this.$tabContent.find('.js-show-page-help').addClass('is-open');
        });

        it('should close the help side bar', function () {
            this.$tabContentLink.trigger(this.clickEvent);

            expect(this.$html.hasClass('open-help')).to.be.false;
        });

        it('should remove the is-open class from the mobile help button', function () {
            this.$tabContentLink.trigger(this.clickEvent);

            expect(this.$tabContent.find('.js-show-page-help').hasClass('is-open')).to.be.false;
        });

        it('should add the hide class from the tab-help-container', function () {
            expect(this.$tabHelpContainer.hasClass('hide')).to.be.true;
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
            expect(this.$tabHelp.html()).to.equal('<button type="button" class="close-page-help js-close-page-help" tabindex="-1"><i class="icon-remove-sign" aria-hidden="true"></i><span class="hide">Close on-page help</span></button>Some help text <a href="#" tabindex="-1">link</a>');
        });

        it('should add the help-close button to the tab-help container', function() {
            expect(this.$tabHelp.find('.js-close-page-help').length).to.equal(1);
        });

    });

    describe('The handleFocusOut method', function() {
        beforeEach(function () {
            this.helpTextComponent.init();
            this.$html.addClass('open-help');
            sinon.spy(this.helpTextComponent, 'toggleHelpSidebar');
            this.helpTextComponent.handleFocusOut();
        });

        it('should call the update help sidebar method', function () {
            this.$body.find(this.$tabHelpContainer).trigger('focusout');
            setTimeout(() => {
                expect(this.helpTextComponent.toggleHelpSidebar).to.have.been.called;
            }, 1.2);
        });
    });
});
