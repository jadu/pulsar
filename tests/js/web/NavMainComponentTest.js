/*jshint multistr: true, unused: false*/

'use strict';

var $ = require('jquery'),
    NavMainComponent = require('../../../js/NavMainComponent');

$.fx.off = !$.fx.off;

describe('NavMainComponent', function () {
    beforeEach(function() {
        this.$html = $('<div class="fake-html"></div>').appendTo('html');
        this.$body = $('<div class="fake-body"></div>').appendTo(this.$html);
        this.$window = $('<div></div>');
        this.$window.height(150);
        this.window = this.$window[0];

        this.$markup = $('\
<nav class="nav-main">\
  <div class="nav-primary">\
    <a href="http://jadu.net" class="jadu-branding">Jadu</a>\
\
    <ul class="nav-items">\
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
--><div class="nav-secondary">\
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
  </div><!--\
\
--><div class="nav-tertiary">\
\
    <a href="#close" data-nav-action="close">x</a>\
\
        <ul class="nav-items">\
            <li class="nav-item">\
                <a href="#three_one" class="nav-link">3.1</a>\
            </li>\
        </ul>\
    </div><!-- \
  --><div class="nav-quaternary">\
  \
    <a href="#close" data-nav-action="close">x</a>\
    \
        <ul class="nav-items">\
          <li class="nav-item">\
            <a href="#four_one" class="nav-link">4.1</a>\
          </li>\
        </ul>\
    </div>\
</nav>\
<div class="content-main"></div>\
').appendTo(this.$body);

        this.$navMain = this.$html.find('.nav-main');
        this.$closeLink = this.$html.find('[data-nav-action="close"]');
        this.$contentMain = this.$html.find('.content-main');
        this.$navPrimary = this.$html.find('.nav-primary');
        this.$navTertiary = this.$navMain.find('.nav-tertiary');
        this.$navQuaternary = this.$navMain.find('.nav-quaternary');

        this.$linkOne = this.$html.find('[href="#one"]');
        this.$linkTwo = this.$html.find('[href="#two"]');
        this.$linkThree = this.$html.find('[href="#three"]');
        this.$secondaryLinkOne = this.$html.find('[href="#one_one"]');
        this.$secondaryLinkTwo = this.$html.find('[href="#two_one"]');
        this.$secondaryLinkThree = this.$html.find('[href="#three_one"]');
        this.$secondaryLinkFour = this.$html.find('[href="#four_one"]');

        // set height on nav items as no css in tests
        this.$html.find('.nav-item').height(20);
        this.$html.find('.more-icon').height(20);

        this.navMainComponent = new NavMainComponent(this.$html, this.window);
    });

    afterEach(function () {
        this.$html.remove(); // Detach test DOM from the real one
    });

    describe('when component is initalised, if html arguement is missing', function () {
        it('should throw the error \'html must be passed to NavMainComponent\' ', function () {
            this.navMainComponentWithoutHtmlArg = new NavMainComponent({}, this.window);

            expect(() => {
                this.navMainComponentWithoutHtmlArg.init();
            }).to.throw('html must be passed to NavMainComponent');
        })
    });

    describe('when component is initalised, if window arguement is missing', function () {
        it('should throw the error \'window must be passed to NavMainComponent\' ', function () {
            this.navMainComponentWithoutWindowArg = new NavMainComponent(this.$html, undefined);

            expect(() => {
                this.navMainComponentWithoutWindowArg.init();
            }).to.throw('window must be passed to NavMainComponent');
        })
    });

    describe('clicking on the first primary nav link', function () {
        beforeEach(function () {
            this.navMainComponent.init();
            this.$linkOne.click();
        });

        it('should add the is-active class to the first link', function () {
            expect(this.$linkOne.hasClass('is-active')).to.be.true;
        });

        it('should open the secondary nav', function () {
            expect(this.$html.find('.nav-main').hasClass('is-open')).to.be.true;
        });

        it('should add the is-active class to the secondary sub navigation menu', function () {
            expect(this.$html.find('[data-nav="#one"]').hasClass('is-active')).to.be.true;
        });

        it('should not add the is-active class to the other sub navigation menus', function () {
            expect(this.$html.find('[data-nav="#two"]').hasClass('is-active')).to.be.false;
        });
    });

    describe('clicking the first, then the second primary nav link', function () {
        beforeEach(function() {
            this.navMainComponent.init();
            this.$linkOne.click();
            this.$linkTwo.click();
        });

        it('should add the is-active class to the second link', function () {
            expect(this.$linkTwo.hasClass('is-active')).to.be.true;
        });

        it('should remove the is-active class from the first link', function () {
            expect(this.$linkOne.hasClass('is-active')).to.be.false;
        });

        it('should add the is-active class to the second sub navigation menu', function () {
            expect(this.$html.find('[data-nav="#two"]').hasClass('is-active')).to.be.true;
        });

        it('should remove the is-active class from the first sub navigation menu', function () {
            expect(this.$html.find('[data-nav="#one"]').hasClass('is-active')).to.be.false;
        });
    });

    describe('clicking a secondary nav link', function() {
        beforeEach(function() {
            this.navMainComponent.init();
            this.$linkOne.click();
            this.$secondaryLinkOne.click();
        });

        it('should add the is-active class to the clicked link', function () {
            expect(this.$secondaryLinkOne.hasClass('is-active')).to.be.true;
        });
    });

    describe('clicking a second secondary nav link', function () {
        beforeEach(function() {
            this.navMainComponent.init();
            this.$linkOne.click();
            this.$secondaryLinkOne.click();
            this.$secondaryLinkTwo.click();
        });

        it('should add the is-active class to the clicked link', function () {
            expect(this.$secondaryLinkTwo.hasClass('is-active')).to.be.true;
        });
    });

    describe('clicking a primary nav link that has no sub navigation', function () {
        beforeEach(function() {
            this.navMainComponent.init();
            this.$linkThree.click();
        });

        it('should not open the secondary nav', function () {
            expect(this.$html.find('.nav-main').hasClass('is-open')).to.be.false;
        });
    });

    describe('clicking a primary nav link that has no sub navigation when the subnavigation is open', function () {
        beforeEach(function() {
            this.navMainComponent.init();
            this.$linkOne.click();
            this.$linkThree.click();
        });

        it('should close the secondary nav', function () {
            expect(this.$html.find('.nav-main').hasClass('nav-main--open')).to.be.false;
        });
    });

    describe('clicking the close icon, when the sub navigation is closed', function () {
        beforeEach(function() {
            this.navMainComponent.init();
            this.$closeLink.click();
        });

        it('should have no effect on the subnavigation', function () {
            expect(this.$html.find('.nav-main').hasClass('is-active')).to.be.false;
        });
    });

    describe('clicking the close icon, when the sub navigation is open', function () {
        beforeEach(function() {
            this.navMainComponent.init();
            this.$linkOne.click();
            this.$closeLink.click();
        });

        it('should close the sub navigation', function () {
            expect(this.$html.find('.nav-main div').hasClass('is-open')).to.be.false;
        });

        it('should remove the highlight from that sections primary nav item', function () {
            expect(this.$html.find('.nav-primary .nav-link').hasClass('is-active')).to.be.false;
        });
    });

    describe('clicking outside of the navigation, when the sub navigation is open', function () {
        beforeEach(function() {
            this.navMainComponent.init();
            this.$linkOne.click();
            this.$contentMain.click();
        });

        it('should close the sub navigation', function () {
            expect(this.$html.find('.nav-main div').hasClass('is-open')).to.be.false;
        });
    });

    describe("when the window is too short for the whole primary navigation to be displayed", function () {
        beforeEach(function() {
            this.navMainComponent.init();
        });

        it('should show the more icon link', function () {
            expect(this.$html.find('.nav-primary .nav-items .more-icon').is(':visible')).to.be.true;
        });
    });

    /*describe('when the more link is clicked', function () {
        beforeEach(function() {
            this.$moreIconLink = this.$html.find('.more-icon > .nav-link');
            this.$moreIconLink.click();
        });

        it('should open the sliding main nav if it is closed', function () {
            expect(this.$navTertiary.hasClass('is-open')).to.be.true;
        });
    });*/

    describe('clicking the close icon, when the tertiary sub navigation is open', function () {
        beforeEach(function () {
            this.navMainComponent.init();
            this.$secondaryLinkThree.click();
            this.$closeLink.click();
        });

        it('should close the tertiary sub navigation', function () {
            expect(this.$html.find('.nav-tertiary').hasClass('is-open')).to.be.false;
        });
    });

    describe('clicking the close icon, when the quaternary sub navigation is open', function () {
        beforeEach(function() {
            this.navMainComponent.init();
            this.$secondaryLinkFour.click();
            this.$closeLink.click();
        });

        it('should close the quaternary sub navigation', function () {
            expect(this.$html.find('.nav-quaternary').hasClass('is-open')).to.be.false;
        });
    });

    describe("When the window is resized from very short to large enough to fit nav", function () {
        beforeEach(function () {
            this.navMainComponent.init();
            this.$window.height(200);
            this.$window.resize();
        });

        it('should show extra nav items', function () {
            expect(this.$html.find('.nav-primary .nav-items li:not(.more-icon)').is(':visible')).to.be.true;
        });
    });

    describe("When nav-items is bigger than the window and More Item exists", function () {
        beforeEach(function () {
            this.navMainComponent.init();
            this.$window.resize();
        });

        it('should show the More link', function () {
            expect(this.$html.find('.nav-primary .nav-items .more-icon').is(':visible')).to.be.true;
        });
    });

    describe('When the window is resized', function () {
        beforeEach(function () {
            this.adjustNavStub = sinon.stub(this.navMainComponent, 'adjustNavItems');
        });

        it('should call adjustNavItems()', function () {
            this.navMainComponent.init();
            this.navMainComponent.$window.trigger('resize');

            expect(this.adjustNavStub).to.have.been.called;
        });
    });

    describe('When "More" nav item is getting hidden and tertiary and quaternary nav is already open', function () {
        beforeEach(function () {
            this.navMainComponent.init();
            this.$window.height(200);
            this.$window.resize();
            this.$moreIconLink = this.$navMain.find('.more-icon > .nav-link');
            this.$moreIconLink.click();
            this.$window.height(1000);
            this.$window.resize();
            this.$window.resize();
        });

        it('should hide the open tertiary or quaternary nav', function () {
            expect(this.$navTertiary.hasClass('is-open')).to.be.false;
            expect(this.$navQuaternary.hasClass('is-open')).to.be.false;
        });
    });
});
