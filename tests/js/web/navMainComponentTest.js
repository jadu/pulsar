'use strict';

var $ = require('jquery'),
	NavMainComponent = require('../../../js/NavMainComponent');

$.fx.off = !$.fx.off

describe('NavMain component', function() {

	beforeEach(function() {
		this.$html = $('<html></html>');
		this.$body = $('<body></body>').appendTo(this.$html);
 		this.$markup = $('\
<nav class="nav-main">\
  <div class="nav-primary">\
    <a href="http://jadu.net">Jadu</a>\
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
	<div class="nav-container" data-nav="#one">\
	    <ul class="nav-items">\
	      <li class="nav-item">\
	        <a href="#one_one" class="nav-link">1.1</a>\
	      </li>\
	    </ul>\
	</div>\
\
	<div class="nav-container" data-nav="#two">\
		<ul class="nav-items">\
	      <li class="nav-item">\
	        <a href="#two_one" class="nav-link">2.1</a>\
	      </li>\
	    </ul>\
	</div>\
\
  </div>\
</nav>\
').appendTo(this.$html);

 		this.$navMain = this.$html.find('.nav-main');
 		this.$closeLink = this.$html.find('[data-nav-action="close"]');

 		this.$linkOne = this.$html.find('[href="#one"]');
 		this.$linkTwo = this.$html.find('[href="#two"]');
 		this.$linkThree = this.$html.find('[href="#three"]');
 		this.$secondaryLinkOne = this.$html.find('[href="#one_one"]');
 		this.$secondaryLinkTwo = this.$html.find('[href="#two_one"]');

		this.navMainComponent = new NavMainComponent(this.$html);

	});

	describe('clicking on the first primary nav link', function() {

		beforeEach(function() {
			this.navMainComponent.init();
			this.$linkOne.click();
		});

		it('should add the is-active class to the first link', function() {
			expect(this.$linkOne.hasClass('is-active')).to.be.true;
		});

		it('should open the secondary nav', function() {
			expect(this.$html.find('.nav-main').hasClass('is-open')).to.be.true;
		});

		it('should add the is-active class to the secondary sub navigation menu', function() {
			expect(this.$html.find('[data-nav="#one"]').hasClass('is-active')).to.be.true;
		});

		it('should not add the is-active class to the other sub navigation menus', function() {
			expect(this.$html.find('[data-nav="#two"]').hasClass('is-active')).to.be.false;
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
			expect(this.$html.find('[data-nav="#two"]').hasClass('is-active')).to.be.true;
		});

		it('should remove the is-active class from the first sub navigation menu', function() {
			expect(this.$html.find('[data-nav="#one"]').hasClass('is-active')).to.be.false;
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
			expect(this.$html.find('.nav-main').hasClass('is-open')).to.be.false;
		});
	});

	describe('clicking a primary nav link that has no sub navigation when the subnavigation is open', function() {

		beforeEach(function() {
			this.navMainComponent.init();
			this.$linkOne.click();
			this.$linkThree.click();
		});

		it('should close the secondary nav', function() {
			expect(this.$html.find('.nav-main').hasClass('nav-main--open')).to.be.false;
		});
	});

	describe('clicking the close icon, when the sub navigation is closed', function() {

		beforeEach(function() {
			this.navMainComponent.init();
			this.$closeLink.click();
		});

		it('should have no effect on the subnavigation', function() {
			expect(this.$html.find('.nav-main').hasClass('is-active')).to.be.false;
		});

	});

	describe('clicking the close icon, when the sub navigation is open', function() {

		beforeEach(function() {
			this.navMainComponent.init();
			this.$linkOne.click();
			this.$closeLink.click();
		});

		it('should close the sub navigation', function() {
			expect(this.$html.find('.nav-main').hasClass('is-open')).to.be.false;
		});

	});

});
