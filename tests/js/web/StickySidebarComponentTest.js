import $ from 'jquery';
import StickySidebarComponent from '../../../js/StickySidebarComponent'

describe('StickySidebarComponent', () => {
	// let clickEvent;
    let $window;
    let window;
	let $html;
    let $body;
    let $layoutHTML;
    let $htmlWithoutClass;
    let $bodyWithoutClass;
    let $layoutHTMLWithoutClass;
    let stickySidebarComponent;
    let componentWithoutHTML;
    let componentWithoutWindow;
    let componentWithoutClass;

	beforeEach(() => {
		        
        $window = $('<div></div>');
        window = $window[0];

        $html = $('<html></html>').appendTo($window);
        $body = $('<body></body>').appendTo($html);

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

		stickySidebarComponent = new StickySidebarComponent($html);
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
            $window.height(50);
            $body.find('.tab__settings').height(100);
            $body.find('.tab__content').height(200);
        });

        // describe('scrolling the viewport', () => {
        //     it('should add the is-sticky class', () => {
        //         $window.scrollTo(50, 0).trigger('scroll');
        //         expect($body.find('.tab__container').hasClass('is-sticky')).to.be.true;
        //     });
        // });
    });
});
