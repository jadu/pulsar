import $ from 'jquery';
import StickySidebarComponent from '../../../js/StickySidebarComponent'

describe('StickySidebarComponent', () => {
	// let clickEvent;
    let $window;
    let window;
	let $html;
    let $body;
    let $layoutHTML;
    let stickySidebarComponent;
    let componentWithoutHTML;
    let componentWithoutWindow;

	beforeEach(() => {
		        
        $window = $('<div></div>');
        window = $window[0];
        
        // $html = $('html');
        $body = $('body');
        
		$layoutHTML = $(
            '<div class="tab__container has-settings">' +
			'	<div class="tab__inner">' +
			'		<section class="tab__settings">' +
			'   	</section>' +
			'	    <main class="tab__content">' +
			'		</main>' +
			'	</div>' +
			'</div>'
		).appendTo($body);
	});

	afterEach(() => {
        $body.empty();
    });

    describe('init()', () => {
		it('should throw an error if $html isn’t passed to the component', () => {
			componentWithoutHTML = new StickySidebarComponent(undefined);

			expect(() => {
                componentWithoutHTML.init($body);
            }).to.throw('$html must be passed to StickySidebarComponent');
        });
        
        it('should throw an error if window isn’t passed to the component', () => {
			componentWithoutWindow = new StickySidebarComponent($body, undefined);

			expect(() => {
                componentWithoutWindow.init($body);
            }).to.throw('window must be passed to StickySidebarComponent');
        });
    });
    
    describe('when content is taller than settings', () => {
        beforeEach(function() {    
            $body.find('.tab__settings').outerHeight(100);
            $body.find('.tab__content').outerHeight(200);
            stickySidebarComponent = new StickySidebarComponent($body, window);
        });

        it('should not add the is-sticky class if the viewport hasn’t been scrolled', () => {
            stickySidebarComponent.sticky();
            expect($body.find('.tab__inner').hasClass('is-sticky')).to.be.false;
        });

        it('should add the is-sticky class when triggered', () => {
            $body.find('.tab__inner').offset({'top': -10});
            stickySidebarComponent.sticky();
            expect($body.find('.tab__inner').hasClass('is-sticky')).to.be.true;
        });

        it('should add the is-sticky class on scroll', () => {
            stickySidebarComponent.init();
            $body.find('.tab__inner').offset({'top': -10});
            $($window[0]).trigger('scroll');
            expect($body.find('.tab__inner').hasClass('is-sticky')).to.be.true;
        });
    });
});
