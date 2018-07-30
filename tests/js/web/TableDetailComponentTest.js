import $ from 'jquery';
import TableDetailComponent from '../../../js/TableDetailComponent'

describe('TableDetailComponent', () => {
	const clickEvent = $.Event('click');
	let $html;
	let $body;
	let $tableHTML;
	let tableDetailComponent;
	let tableDetailComponentWithoutHTML;

	beforeEach(() => {
		$html = $('<div></div>');
		$body = $('<body></body>').appendTo($html);

		$tableHTML = $(
			'<table data-table-detail-table>' +
			'	<thead>' +
			'		<th>Actions</th>' +
			'	</thead>' +
			'	<tbody>' +
			'		<tr data-table-detail-content="<p>content</p>" data-table-detail-panel-custom-title="custom panel title">' +
			'			<td><a href="#" data-table-detail-view-detail="true">Details</a></td>' +
			'		</tr>' +
			'	</tbody>' +
			'</table>'
		).appendTo($body);

		tableDetailComponent = new TableDetailComponent($html);
	});

	afterEach(() => {
        $body.empty();
    });

    describe('init()', () => {
		it('should throw an error if $html isn’t passed to the component', () => {
			tableDetailComponentWithoutHTML = new TableDetailComponent(undefined);

			expect(() => {
                tableDetailComponentWithoutHTML.init($body);
            }).to.throw('$html must be passed to TableDetailComponent');
		});

		it('should add the detail panel to the DOM', () => {
			tableDetailComponent.init($body);

			expect($body.find('.table-detail')).to.have.length(1);
		});

		it('should add the backdrop to the body', () => {
			tableDetailComponent.init($body);

			expect($body.find('.table-detail-backdrop')).to.have.length(1);
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

			expect($body.find('[data-table-detail-panel-body]').html()).to.equal('<p>content</p>');
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
	})

	describe('When the close panel button is clicked', () => {
		it('should remove the "in" class from the backdrop to hide it', () => {
			tableDetailComponent.init($body);

			$body.find('[data-table-detail-close-panel]').trigger(clickEvent);

			expect($body.find('.table-detail-backdrop').hasClass('in')).to.be.false;
		});

		it('remove the "table-detail--open" class to the panel to open it', () => {
			tableDetailComponent.init($body);

			$body.find('[data-table-detail-close-panel]').trigger(clickEvent);

			expect($body.find('[data-table-detail-panel]').hasClass('table-detail--open')).to.be.false;
		});
	})

	describe('When the backdrop overlay is clicked', () => {
		it('should remove the "in" class from the backdrop to hide it', () => {
			tableDetailComponent.init($body);

			$body.find('.table-detail-backdrop').trigger(clickEvent);

			expect($body.find('.table-detail-backdrop').hasClass('in')).to.be.false;
		});

		it('remove the "table-detail--open" class to the panel to open it', () => {
			tableDetailComponent.init($body);

			$body.find('.table-detail-backdrop').trigger(clickEvent);

			expect($body.find('[data-table-detail-panel]').hasClass('table-detail--open')).to.be.false;
		});
	})
});
