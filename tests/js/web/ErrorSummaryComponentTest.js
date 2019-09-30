'use strict'

const $ = require('jquery'),
	ErrorSummaryComponent = require('../../../js/ErrorSummaryComponent');

describe('ErrorSummaryComponent', () => {
	let $body,
		$errorSummary,
        $errorSummary2,
		errorSummaryComponent;

	beforeEach(() => {
		$body = $('body');
		$errorSummary = $(`
			<section aria-labelledby="error-summary-title" data-error-summary="true" tabindex="-1" class="error-summary">
				<h2 class="error-summary__title" id="error-summary-title">There is a problem</h2>
				<ul class="error-summary__list">
					<li class="error-summary__list-item">
						<a class="error-summary__list-link" href="#first-name">Enter your first name</a>
					</li>
					<li class="error-summary__list-item">
						<a class="error-summary__list-link" href="#last-name">Enter your last name</a>
					</li>
				</ul>
			</section>
		`).appendTo($body);

		errorSummaryComponent = new ErrorSummaryComponent();
	});

	afterEach(() => {
        $errorSummary.remove();
    });

	describe('init()', function() {
		it('should throw an error if $html is not passed to init()', () => {
        	expect(() => {
                errorSummaryComponent.init();
            }).to.throw('$html must be passed to ErrorSummaryComponent init()');
    	});

		it('focus the error summary container', () => {
			errorSummaryComponent.init($body);

        	expect($errorSummary.is(document.activeElement)).to.be.true;
    	});

		it('should throw an error if there is more than one error summary on the page', () => {
			$errorSummary2 = $('<div data-error-summary="true"></div>').appendTo($body);

			expect(() => {
                errorSummaryComponent.init($body);
            }).to.throw('Only one error summary may be present on a page');
    	});
	});
});
