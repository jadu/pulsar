import $ from 'jquery';
import StickyScrollBarComponent from '../../../js/StickyScrollBarComponent'

describe('StickyScrollBarComponent', () => {
	let $window;
	let $stylesheet;
	let $body;
	let $container;
	let $content;
	let stickyScrollBarComponent;
	let stickyScrollBarComponentWithoutWindow;
	let stickyScrollBarComponentWithoutHtml;
	let stickyScrollBarComponentWithoutContainer;

	beforeEach(() => {
		$window = $('<div></div>');
        $window.height(500);
		$stylesheet = $(`
<style type="text/css">
    #fakeBody {
        width: 1000px;
        height: 800px;
    }

    #fakeBody .container {
        width: 500px;
        height: 600px;
        overflow: auto;
    }

    #fakeBody .content {
        width: 1000px;
        height: 200px;
    }

    #fakeBody .sticky-scrollbar {
    	bottom: 0;
    	height: 30px;
    	overflow-x: auto;
    	overflow-y: hidden;
    	position: fixed;
    	z-index: 9999;
	}

	#fakeBody .sticky-scrollbar__inner {
    	border: 1px solid #fff;
    	opacity: .01;
	}

	#fakeBody .footer {
		bottom: 37px;
		height: 37px;
		position: fixed;
	}
</style>
`).appendTo('head');

		$body = $('<div id="fakeBody"><div class="container"><div class="content">some content</div></div></div>').appendTo('body');
		$container = $body.find('.container');
		$content = $body.find('.content');

		stickyScrollBarComponent = new StickyScrollBarComponent($window, $body);
	});

	afterEach(() => {
        $stylesheet.remove();
        $body.remove();
    });

    describe('init()', () => {

		it('should throw an error if $window isn’t passed to the component', () => {
			stickyScrollBarComponentWithoutWindow = new StickyScrollBarComponent(undefined, $body);

			expect(() => {
                stickyScrollBarComponentWithoutWindow.init($container);
            }).to.throw('window must be passed to StickyScrollBarComponent');
		});

		it('should throw an error if $html isn’t passed to the component', () => {
			stickyScrollBarComponentWithoutHtml = new StickyScrollBarComponent($window, undefined);

			expect(() => {
                stickyScrollBarComponentWithoutHtml.init($container);
            }).to.throw('$html must be passed to StickyScrollBarComponent');
		});

		it('should throw an error if $container isn’t passed to the component', () => {
			stickyScrollBarComponentWithoutContainer = new StickyScrollBarComponent($window, $body);
		
			expect(() => {
                stickyScrollBarComponentWithoutContainer.init();
            }).to.throw('an element to add the scroller to must be passed to StickyScrollBarComponent');
		});

		it('should append the sticky scroll bar to the container', () => {
			stickyScrollBarComponent.init($container);

			expect($container.find('.sticky-scrollbar')).to.have.length(1);
		});

		it('should not display the sticky scroll bar when the window height is larger than the container', () => {
			$container.height(300);

			stickyScrollBarComponent.init($container);

			expect($container.find('.sticky-scrollbar').hasClass('u-display-none')).to.be.true;
		});

		it('should display the sticky scroll bar when the content is larger than the window height', () => {
			$container.height(600);

			stickyScrollBarComponent.init($container);

			expect($container.find('.sticky-scrollbar').hasClass('u-display-none')).to.be.false;
		});
	});

	describe('When the container with the sticky scroll bar is scrolled', () => {
	
		it('should update the sticky scroll bar position to match the scroll position of the content', () => {
			stickyScrollBarComponent.init($container);

			$container.scrollLeft(50).trigger('scroll');

			expect($container.find('.sticky-scrollbar').scrollLeft()).to.equal(50);
		});
	})

	describe('When the sticky scroll bar is scrolled', () => {
		
		it('should update the content scroll position to match the scroll position of the sticky scroll bar', () => {
			stickyScrollBarComponent.init($container);

			$container.find('.sticky-scrollbar').scrollLeft(50).trigger('scroll');

			expect($container.scrollLeft()).to.equal(50);
		});
	})

	describe('When a footer is displayed', () => {
	
		it('should allow for the footer height', () => {
			$('<div class="footer">footer</footer>').appendTo($body);
			$body.height(500);
			$container.height(500);
			$content.height(500);

			stickyScrollBarComponent.init($container);

			expect($container.find('.sticky-scrollbar').hasClass('u-display-none')).to.be.false;
		});
	})
});
