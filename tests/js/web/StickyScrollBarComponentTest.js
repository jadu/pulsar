'use strict';

var $ = require('jquery'),
	StickyScrollBarComponent = require('../../../js/StickyScrollBarComponent');

describe('StickyScrollBarComponent', function () {
	beforeEach(function() {
		this.$window = $('<div></div>');
        this.$window.height(500);

        // need to append html to window?
		this.$html = $('<html></html>');
		this.$body = $('<body></body>').appendTo(this.$html);
		this.$container = $(
			'<div class="container">' +
			'	<div class="content">' +
			'		Some content' +
            '	</div>' +
			'</div>'
		).appendTo(this.$body);

		this.stickyScrollBarComponent = new StickyScrollBarComponent(this.$window, this.$html);
	});

	afterEach(function () {
        this.$html.remove(); // Detach test DOM from the real one - NEEDED?
    });

    describe('On init', function() {

		beforeEach(function() {
			this.stickyScrollBarComponent.init(this.$container);
		});

		it('should run some tests');

		// it('should throw an error if $container isn't passed to the component');
		// it('should throw an error if $window isn't passed to the component');
		// it('should throw an error if $html isn't passed to the component');

		// it('should append the sticky scroll bar to the container', function () {
		// 	expect(this.$container.find('.sticky-scrollbar')).to.have.length(1);
		// });

		// it('should not display the sticky scroll bar when the window height is larger than the container', function () {
		// 	this.$container.height(200);

		// 	expect(this.$container.find('.sticky-scrollbar').hasClass('u-display-none')).to.be.true;
		// });

		// it('should display the sticky scroll bar when the content is larger than the window height', function () {
		// 	this.$container.height(600);

		// 	expect(this.$container.find('.sticky-scrollbar').hasClass('u-display-none')).to.be.false;
		// });

	})

	// describe('When the window is scrolled', function() {

	// })

	// describe('When the window is resized', function() {
		
	// })

	// describe('When the sticky scroll bar is shown and the content is scrolled', function() {
		
	// })

	// describe('When the sticky scroll bar is shown and the sticky scroll bar is scrolled', function() {
		
	// })
});
