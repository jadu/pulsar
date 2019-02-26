import $ from 'jquery';
import TableDetailComponent from '../../../js/TableDetailComponent'

describe('TableDetailComponent', () => {
	let clickEvent;
	let keyDownEvent = $.Event('keydown');
	let tabKeyDownEvent = $.Event('keydown');
	let $html;
	let $body;
	let $tableHTML;
	let tableDetailComponent;
	let tableDetailComponentWithoutHTML;

	beforeEach(() => {
		$html = $('html');
		$body = $('body');

		$tableHTML = $(
			'<table data-table-detail-table>' +
			'	<thead>' +
			'		<th>Actions</th>' +
			'	</thead>' +
			'	<tbody>' +
			'		<tr data-table-detail-content="<p>content</p><form><button>button</button></form>" data-table-detail-panel-custom-title="custom panel title">' +
			'			<td><a href="#" data-table-detail-view-detail="true">Details</a></td>' +
			'		</tr>' +
			'	</tbody>' +
			'</table>'
		).appendTo($body);

		clickEvent = $.Event('click');

		tableDetailComponent = new TableDetailComponent($html);
	});

	afterEach(() => {
        $body.empty();

        $html.off('keydown');
    });

    describe('init()', () => {
		it('should throw an error if $html isn’t passed to the component', () => {
			tableDetailComponentWithoutHTML = new TableDetailComponent(undefined);

			expect(() => {
                tableDetailComponentWithoutHTML.init($body);
            }).to.throw('$html must be passed to TableDetailComponent');
		});

		it('should add the detail panel to the body if no main elements are present', () => {
			tableDetailComponent.init($body);

			expect($body.find('.table-detail')).to.have.length(1);
		});

		it('should add the backdrop to the body if no main elements are present', () => {
			tableDetailComponent.init($body);

			expect($body.find('.table-detail-backdrop')).to.have.length(1);
		});

		it('should append the panel to the <main> element if one is present', () => {
			$body.find('[data-table-detail-table]').wrap('<main></main>');

			tableDetailComponent.init($body);

			expect($body.find('main [data-table-detail-panel]')).to.have.length(1);
		});

		it('should append the backdrop to the <main> element if one is present', () => {
			$body.find('[data-table-detail-table]').wrap('<main></main>');

			tableDetailComponent.init($body);

			expect($body.find('main .table-detail-backdrop')).to.have.length(1);
		});

		it('should append the panel to the element with role="main" if one is present', () => {
			$body.find('[data-table-detail-table]').wrap('<div role="main"></div>');

			tableDetailComponent.init($body);

			expect($body.find('[role="main"] [data-table-detail-panel]')).to.have.length(1);
		});

		it('should append the backdrop to the element with role="main" if one is present', () => {
			$body.find('[data-table-detail-table]').wrap('<div role="main"></div>');

			tableDetailComponent.init($body);

			expect($body.find('[role="main"] .table-detail-backdrop')).to.have.length(1);
		});
	});

	describe('When the panel is added', () => {
		it('should have the role="dialog" attribute', () => {
			tableDetailComponent.init($body);

			expect($body.find('.table-detail[role="dialog"]')).to.have.length(1);
		});

		it('should have the aria-modal="true" attribute', () => {
			tableDetailComponent.init($body);

			expect($body.find('.table-detail[aria-modal="true"]')).to.have.length(1);
		});

		it('should have the aria-hidden="true" attribute', () => {
			tableDetailComponent.init($body);

			expect($body.find('.table-detail[aria-hidden="true"]')).to.have.length(1);
		});

		it('should have the tabindex attribute on the close button', () => {
			tableDetailComponent.init($body);

			expect($body.find('.table-detail__header-close[tabindex="-1"]')).to.have.length(1);
		});
	});

	describe('When the view panel link is clicked', () => {
		it('should prevent the default behaviour of the click', () => {
			tableDetailComponent.init($body);

			$body.find('[data-table-detail-view-detail]').trigger(clickEvent);

			expect(clickEvent.isDefaultPrevented()).to.be.true;
		});

		it('should set a custom panel title if one is set', () => {
			tableDetailComponent.init($body);

			$body.find('[data-table-detail-view-detail]').trigger(clickEvent);

			expect($body.find('[data-table-detail-panel-title]').text()).to.equal('custom panel title');
		});

		it('should empty the panel body and replace the content', () => {
			tableDetailComponent.init($body);
			$body.find('[data-table-detail-panel-body]').append('some content to be removed');

			$body.find('[data-table-detail-view-detail]').trigger(clickEvent);

			expect($body.find('[data-table-detail-panel-body]').html()).to.equal('<p>content</p><form><button>button</button></form>');
		});

		it('should add the "in" class to the backdrop to show it', () => {
			tableDetailComponent.init($body);

			$body.find('[data-table-detail-view-detail]').trigger(clickEvent);

			expect($body.find('.table-detail-backdrop').hasClass('in')).to.be.true;
		});

		it('should add the "table-detail--open" class to the panel to open it', () => {
			tableDetailComponent.init($body);

			$body.find('[data-table-detail-view-detail]').trigger(clickEvent);

			expect($body.find('[data-table-detail-panel]').hasClass('table-detail--open')).to.be.true;
		});

		it('should focus the close button if there is no other focusable element in the panel', () => {
			tableDetailComponent.init($body);
			$body.find('[data-table-detail-content]').attr('data-table-detail-content', '<p>Content</p>')

			$body.find('[data-table-detail-view-detail]').trigger(clickEvent);

			expect($body.find('[data-table-detail-close-panel]').is(':focus')).to.be.true;
		});

		it('should focus the first focusable element if one is present ', () => {
			tableDetailComponent.init($body);

			$body.find('[data-table-detail-view-detail]').trigger(clickEvent);

			expect($body.find('[data-table-detail-panel-body] form button').is(':focus')).to.be.true;
		});
	});

	describe('when the panel is open and tab is pressed', () => {
		beforeEach(() => {
			tabKeyDownEvent.keyCode = 9;
			tableDetailComponent.init($body);
			$body.find('[data-table-detail-view-detail="true"]').trigger(clickEvent);
		});

		it('should focus the first element, when the last element was previously focused', () => {
			$body.find('.table-detail--open .table-detail__body form button').focus();

			$html.trigger(tabKeyDownEvent);

			expect($body.find('.table-detail--open .table-detail__header-close').is(':focus')).to.be.true;
		});
	});

	describe('when the panel is open and shift + tab is pressed', () => {
		beforeEach(() => {
			tabKeyDownEvent.keyCode = 9;
			tabKeyDownEvent.shiftKey = true;
			tableDetailComponent.init($body);
			$body.find('[data-table-detail-view-detail="true"]').trigger(clickEvent);
		});

		it('should focus the last element, when the first element was previously focused', () => {
			$body.find('.table-detail--open .table-detail__header-close').focus();

			$html.trigger(tabKeyDownEvent);

			expect($body.find('.table-detail--open .table-detail__body form button').is(':focus')).to.be.true;
		});
	});

	describe('When the close panel button is clicked', () => {
		it('should remove the "in" class from the backdrop to hide it', () => {
			tableDetailComponent.init($body);

			$body.find('[data-table-detail-view-detail]').trigger(clickEvent);
			$body.find('[data-table-detail-close-panel]').trigger(clickEvent);

			expect($body.find('.table-detail-backdrop').hasClass('in')).to.be.false;
		});

		it('should remove the "table-detail--open" class from the panel', () => {
			tableDetailComponent.init($body);

			$body.find('[data-table-detail-view-detail]').trigger(clickEvent);
			$body.find('[data-table-detail-close-panel]').trigger(clickEvent);

			expect($body.find('[data-table-detail-panel]').hasClass('table-detail--open')).to.be.false;
		});

		it('should add tabindex="-1" to all focusable elements', () => {
			tableDetailComponent.init($body);

			$body.find('[data-table-detail-view-detail]').trigger(clickEvent);
			$body.find('[data-table-detail-close-panel]').trigger(clickEvent);

			expect($body.find('[data-table-detail-panel-body] button').attr('tabindex')).to.equal('-1');
			expect($body.find('[data-table-detail-close-panel]').attr('tabindex')).to.equal('-1');
		});
	});

	describe('When the panel is opened and closed', () => {
		it('should not be possible to focus elements in the panel', () => {
			tableDetailComponent.init($body);

			$body.find('[data-table-detail-view-detail]').trigger(clickEvent);
			$body.find('[data-table-detail-close-panel]').trigger(clickEvent);

			expect($body.find('[data-table-detail-panel-body] button').attr('tabindex')).to.equal('-1');
			expect($body.find('[data-table-detail-close-panel]').attr('tabindex')).to.equal('-1');
		});

		it('should add the aria-hidden="true" attribute to the panel', () => {
			tableDetailComponent.init($body);

			$body.find('[data-table-detail-view-detail]').trigger(clickEvent);
			$body.find('[data-table-detail-close-panel]').trigger(clickEvent);

			expect($body.find('.table-detail[aria-hidden="true"]')).to.have.length(1);
		});
	});

	describe('When the ESC key is pressed', () => {
		beforeEach(() => {
			keyDownEvent.keyCode = 27;
			tableDetailComponent.init($body);
			$body.find('table [data-table-detail-view-detail="true"]').trigger(clickEvent);
			$html.trigger(keyDownEvent);
		});

		it('should remove the "in" class from the backdrop to hide it', () => {
			expect($body.find('.table-detail-backdrop').hasClass('in')).to.be.false;
		});

		it('remove the "table-detail--open" class to the panel to close it', () => {
			expect($body.find('[data-table-detail-panel]').hasClass('table-detail--open')).to.be.false;
		});
	});

	describe('When the backdrop overlay is clicked', () => {
		it('should remove the "in" class from the backdrop to hide it', () => {
			tableDetailComponent.init($body);

			$body.find('[data-table-detail-view-detail]').trigger(clickEvent);
			expect($body.find('.table-detail-backdrop').hasClass('in')).to.be.true;

			$body.find('.table-detail-backdrop').trigger(clickEvent);
			expect($body.find('.table-detail-backdrop').hasClass('in')).to.be.false;
		});

		it('should remove the "table-detail--open" class from the panel to close it', () => {
			tableDetailComponent.init($body);

			$body.find('[data-table-detail-view-detail]').trigger(clickEvent);
			expect($body.find('[data-table-detail-panel]').hasClass('table-detail--open')).to.be.true;

			$body.find('.table-detail-backdrop').trigger(clickEvent);
			expect($body.find('[data-table-detail-panel]').hasClass('table-detail--open')).to.be.false;
		});
	});
});
