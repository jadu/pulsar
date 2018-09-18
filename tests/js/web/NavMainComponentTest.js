/*jshint multistr: true, unused: false*/

'use strict';

var $ = require('jquery'),
    NavMainComponent = require('../../../js/NavMainComponent');

$.fx.off = !$.fx.off;

describe('NavMainComponent', function () {
    beforeEach(function() {
        this.$html = $('<div></div>').appendTo('html');
        this.$body = $('<body></body>').appendTo(this.$html);
        this.$window = $('<div></div>');
        this.$window.height(150);
        this.window = this.$window[0];
        this.window.matchMedia = sinon.stub();

        this.$markup = $(`
            <button class="mobile-menu-button t-mobile-menu-button" aria-expanded="false" aria-controls="aria-main-nav" aria-label="Toggle main menu">Menu</button>
            <nav class="nav-main" aria-label="Primary" id="aria-main-nav">
               <div class="nav-primary">
                   <a tabindex="1" href="http://jadu.net" class="jadu-branding">Jadu</a>
                   <ul class="nav-items">
                       <li class="nav-item">
                           <a href="#one" class="nav-link" aria-haspopup="true" aria-expanded="false" aria-controls="aria-secondary-nav">1</a>
                       </li>
                       <li class="nav-item">
                           <button data-target="#two" class="nav-link" aria-haspopup="true" aria-expanded="false" aria-controls="aria-secondary-nav">2</button>
                       </li>
                       <li class="nav-item">
                           <a href="#three" class="nav-link" aria-haspopup="true" aria-expanded="false" aria-controls="aria-secondary-nav">3</a>
                       </li>
                   </ul>
               </div>
               <div class="nav-secondary" id="aria-secondary-nav">
                   <button data-nav-action="close">x</button>
                   <form>
                       <input type="search" placeholder="search" />
                       <button>Go</button>
                   </form>
                   <div class="nav-list" data-nav="#one">
                       <ul class="nav-items">
                           <li class="nav-item">
                               <a tabindex="1" href="#one_one" class="nav-link">1.1</a>
                           </li>
                       </ul>
                   </div>
                   <div class="nav-list" data-nav="#two">
                       <ul class="nav-items">
                           <li class="nav-item">
                               <a tabindex="1" href="#two_one" class="nav-link">2.1</a>
                           </li>
                       </ul>
                   </div>
               </div>
               <div class="nav-tertiary" id="aria-tertiary-nav">
                   <button data-nav-action="close">x</button>
                   <div class="nav-list">
                       <ul class="nav-items">
                           <li class="nav-item">
                               <a tabindex="1" href="#three_one" class="nav-link" aria-haspopup="true" aria-expanded="false" aria-controls="aria-quaternary-nav">3.1</a>
                           </li>
                       </ul>
                   </div>
               </div>
               <div class="nav-quaternary" id="aria-quaternary-nav">
                   <button data-nav-action="close">x</button>
                   <div class="nav-list" data-nav="#three_one">
                       <ul class="nav-items">
                           <li class="nav-item">
                               <a tabindex="1" href="#four_one" class="nav-link">4.1</a>
                           </li>
                       </ul>
                   </div>
               </div>
            </nav>
            <div class="content-main">
                <a href="#" data-toggle="popover" data-content="foo">popover test</a>
            </div>
        `).appendTo(this.$body);

        this.$mobileMenuButton = this.$html.find('.mobile-menu-button');
        this.$navMain = this.$html.find('.nav-main');
        this.$contentMain = this.$html.find('.content-main');
        this.$navTertiary = this.$navMain.find('.nav-tertiary');
        this.$navQuaternary = this.$navMain.find('.nav-quaternary');

        this.$closeSecondaryLink = this.$html.find('.nav-secondary [data-nav-action="close"]');
        this.$closeTertiaryNavLink = this.$html.find('.nav-tertiary [data-nav-action="close"]');
        this.$closeQuaternaryNavLink = this.$html.find('.nav-quaternary [data-nav-action="close"]');

        this.$linkOne = this.$html.find('[href="#one"]');
        this.$linkTwo = this.$html.find('[data-target="#two"]');
        this.$linkThree = this.$html.find('[href="#three"]');
        this.$tertiaryLinkThree = this.$html.find('[href="#three_one"]');

        $.fn.popover = sinon.stub().returnsThis();
        this.$popoverLink = this.$html.find('[data-toggle="popover"]');

        // set height on nav items as no css in tests
        this.$html.find('.nav-item').height(20);
        this.$html.find('.more-icon').height(20);

        this.navMainComponent = new NavMainComponent(this.$html, this.window);
    });

    beforeEach(function () {
        this.window.matchMedia.returns({matches: true});
    });

    afterEach(function () {
        this.$html.remove(); // Detach test DOM from the real one
        delete $.fn.popover;
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

    describe('when component is initalised, the initial tabindex should remain', function () {
        beforeEach(function () {
            this.navMainComponent.init();
        });

        it('should maintain the initial tabindex', function () {
            expect(this.$linkOne.attr('tabindex')).to.equal('1');
        });
    });

    describe('when component is initalised in mobile mode, the initial tabindex should be changed to -1', function () {
        beforeEach(function () {
            this.window.matchMedia.returns({matches: false});
            this.navMainComponent.init();
        });

        it('should maintain the initial tabindex', function () {
            expect(this.$linkOne.attr('tabindex')).to.equal('-1');
        });
    });

    describe('when the window is resized, the initial tabindex should be changed to -1', function () {
        beforeEach(function () {
            this.navMainComponent.init();
            this.window.matchMedia.returns({matches: false});
            this.navMainComponent.manageTabIndexes();
            this.$window.trigger('resize');
        });

        it('should maintain the initial tabindex', function () {
            expect(this.$linkOne.attr('tabindex')).to.equal('-1');
        });
    });

    describe('When mobile menu button is clicked', function () {
        beforeEach(function () {
            this.navMainComponent.init();
            this.clickEvent = $.Event('click');
            this.$mobileMenuButton.trigger(this.clickEvent);
        });

        it('should stop propagation', function () {
            expect(this.clickEvent.isPropagationStopped()).to.be.true;
        });

        it('should add the open-nav class to the body', function () {
            expect(this.$body.hasClass('open-nav')).to.be.true;
        });

        it('should add the open class to the menu button', function () {
            expect(this.$mobileMenuButton.hasClass('open')).to.be.true;
        });

        it('should change the menu button text to close', function () {
            expect(this.$mobileMenuButton.text()).to.be.equal('Close');
        });

        it('should change the menu buttons aria-expanded attribute to true', function () {
            expect(this.$mobileMenuButton.attr('aria-expanded')).to.be.equal('true');
        });
    })

    describe('When mobile menu button is clicked twice', function () {
        beforeEach(function () {
            this.navMainComponent.init();
            this.$mobileMenuButton.click();
            this.$mobileMenuButton.click();
        });

        it('should add the open-nav class to the body', function () {
            expect(this.$body.hasClass('open-nav')).to.be.false;
        });

        it('should add the open class to the menu button', function () {
            expect(this.$mobileMenuButton.hasClass('open')).to.be.false;
        });

        it('should change the menu button text to close', function () {
            expect(this.$mobileMenuButton.text()).to.be.equal('Menu');
        });

        it('should change the menu buttons aria-expanded attribute to true', function () {
            expect(this.$mobileMenuButton.attr('aria-expanded')).to.be.equal('false');
        });
    })

    describe('clicking on the first primary nav link', function () {
        beforeEach(function () {
            this.navMainComponent.init();
            this.clickEvent = $.Event('click');
            this.$linkOne.trigger(this.clickEvent);
        });

        it('should prevent the default bahavior', function () {
            expect(this.clickEvent.isDefaultPrevented()).to.be.true;
        });

        it('should add the is-active class to the first link', function () {
            expect(this.$linkOne.hasClass('is-active')).to.be.true;
        });

        it('should open the secondary nav', function () {
            expect(this.$html.find('.nav-main').hasClass('is-open')).to.be.true;
        });

        it('should change aria-expanded false to true on the clicked link', function () {
            expect(this.$linkOne.attr('aria-expanded')).to.be.equal('true');
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
            this.$closeSecondaryLink.click();
        });

        it('should have no effect on the subnavigation', function () {
            expect(this.$html.find('.nav-main').hasClass('is-active')).to.be.false;
        });
    });

    describe('clicking the close icon, when the sub navigation is open', function () {
        beforeEach(function() {
            this.navMainComponent.init();
            this.$linkOne.click();
            this.$closeSecondaryLink.click();
        });

        it('should close the sub navigation', function () {
            expect(this.$html.find('.nav-main div').hasClass('is-open')).to.be.false;
        });

        it('should remove the is-open class from the main nav', function () {
            expect(this.$html.find('.nav-main').hasClass('is-open')).to.be.false;
        });

        it('should change aria-expanded true to false on the link', function () {
            expect(this.$linkOne.attr('aria-expanded')).to.be.equal('false');
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

        it('should close all sub navigations', function () {
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

    describe('when the more link is clicked', function () {
        beforeEach(function() {
            this.navMainComponent.init();
            this.$window.height(200);
            this.$window.resize();
            this.$moreIconLink = this.$html.find('.more-icon > .nav-link');
            this.clickEvent = $.Event('click');
            this.clickEvent2 = $.Event('click');
        });

        it('should prevent the default bahavior', function () {
            this.$moreIconLink.trigger(this.clickEvent);

            expect(this.clickEvent.isDefaultPrevented()).to.be.true;
        });

        it('should close the secondary nav when open', function () {
            this.$html.find('.nav-secondary').addClass('is-open');
            
            this.$moreIconLink.trigger(this.clickEvent);

            expect(this.$html.find('.nav-secondary').hasClass('is-open')).to.be.false;
        });

        it('should open the sliding tertiary nav', function () {
            this.$moreIconLink.trigger(this.clickEvent);

            expect(this.$html.find('.nav-tertiary').hasClass('is-open')).to.be.true;
        });

        it('should add the is-active class to nav-tertiary nav-list', function () {
            this.$moreIconLink.trigger(this.clickEvent);

            expect(this.$html.find('.nav-tertiary .nav-list').hasClass('is-active')).to.be.true;
        });

        it('should close the tertiary nav if it is already open', function () {
            this.$moreIconLink.trigger(this.clickEvent);
            this.$moreIconLink.trigger(this.clickEvent2);

            expect(this.$html.find('.nav-tertiary').hasClass('is-open')).to.be.false;
        });  

        it('should remove the is-active class from the tertiary navs active nav-list if its already open', function () {
            this.$moreIconLink.trigger(this.clickEvent);
            this.$moreIconLink.trigger(this.clickEvent2);

            expect(this.$html.find('.nav-tertiary .nav-list').hasClass('is-active')).to.be.false;
        });  

        it('should change more button aria-expanded attribute to false if the tertiary nav was already open', function () {
            this.$moreIconLink.trigger(this.clickEvent);
            this.$moreIconLink.trigger(this.clickEvent2);

            expect(this.$moreIconLink.attr('aria-expanded')).to.be.equal('false');
        });

        describe('when a tertiary nav link is clicked', function () {
            beforeEach(function() {
                this.$tertiaryLinkThree.trigger(this.clickEvent);
            });

            it('should prevent the default bahavior', function () {
                expect(this.clickEvent.isDefaultPrevented()).to.be.true;
            });

            it('should open the quaternary nav', function () {
                expect(this.$html.find('.nav-quaternary').hasClass('is-open')).to.be.true;
            });

            it('should add the is-active class to the quaternary nav nav-list', function () {
                expect(this.$html.find('.nav-quaternary .nav-list').hasClass('is-active')).to.be.true;
            });

            it('should change the clicked links aria-expanded to true', function () {
                expect(this.$tertiaryLinkThree.attr('aria-expanded')).to.be.equal('true');
            })
        });

        describe('when the close tertiary nav link is clicked', function () {
            beforeEach(function() {
                this.$moreIconLink.trigger(this.clickEvent);
                this.$closeTertiaryNavLink.trigger(this.clickEvent2);
            });

            it('should prevent the default bahavior', function () {
                expect(this.clickEvent2.isDefaultPrevented()).to.be.true;
            });

            it('should close the tertiary sub navigation', function () {
                expect(this.$html.find('.nav-tertiary').hasClass('is-open')).to.be.false;
            });

            it('should remove the is-active class from the tertiary nav-list', function () {
                expect(this.$html.find('.nav-quaternary .nav-list').hasClass('is-active')).to.be.false;
            });

            it('should remove the is-active class from the more button', function () {
                expect(this.$moreIconLink.hasClass('is-active')).to.be.false;
            });

            it('should change more button aria-expanded attribute to false', function () {
                expect(this.$moreIconLink.attr('aria-expanded')).to.be.equal('false');
            });
        });

        describe('When the quaternary nav is open and the quaternary close button is clicked', function () {
            beforeEach(function() {
                this.$tertiaryLinkThree.trigger(this.clickEvent);
                this.$closeQuaternaryNavLink.trigger(this.clickEvent2);
            });

            it('should prevent the default bahavior', function () {
                expect(this.clickEvent2.isDefaultPrevented()).to.be.true;
            });

            it('should close the quaternary sub navigation', function () {
                expect(this.$html.find('.nav-quaternary').hasClass('is-open')).to.be.false;
            });

            it('should remove the is-active class from the quaternary nav-list', function () {
                expect(this.$html.find('.nav-quaternary .nav-list').hasClass('is-active')).to.be.false;
            });

            it('should change the nav tertiary link previously expanded to aria-expanded="false"', function () {
                expect(this.$tertiaryLinkThree.attr('aria-expanded')).to.be.equal('false');
            })
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

    describe('opening the secondary nav when a popover is open', function () {
        beforeEach(function () {
            this.navMainComponent.init();
            this.clickEvent = $.Event('click');
            this.$linkOne.trigger(this.clickEvent);
            this.$popoverLink.trigger(this.clickEvent);
        });

        it('should trigger a popover', function () {
			expect($.fn.popover).to.have.been.called;
		});

        it('should be hidden when opening the secondary navigation', function () {
            expect($.fn.popover).to.have.been.calledWith('hide');            
        })
    });
});
