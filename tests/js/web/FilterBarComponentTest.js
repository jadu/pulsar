'use strict';

var $ = require('jquery'),
	FilterBarComponent = require('../../../js/FilterBarComponent');

describe('FilterBar component', function () {
	beforeEach(function() {
		this.$html = $('<html></html>');
		this.$body = $('<body></body>').appendTo(this.$html);
		this.$showFilterBarLink = $('<a href="#" data-ui="show-filter-bar">Add filter</a>').appendTo(this.$body);
		this.$container = $(
			'<div class="filter-bar display--none">' +
			'	<form method="POST" enctype="application/x-www-form-urlencoded" class="form">' +
			'		<fieldset>' +
			'			<legend class="legend">Filter by</legend>' +
			'			<div class="form__group">' +
			'				<label for="colour" class="control__label">Colour</label>' +
			'				<div class="controls">' +
			'					<select id="colour" multiple="" placeholder="Choose one or more" class="form__control js-select2">' +
			'						<option value="colour_red">Red</option>' +
			'						<option value="colour_blue">Blue</option>' +
			'					</select>' +
			'				</div>' +
			'			</div>' +
			'			<div class="form__group">' +
			'				<label for="size" class="control__label">Size</label>' +
			'				<div class="controls">' +
			'					<select id="size" placeholder="Choose one" class="form__control select  js-select2">' +
			'						<option value=""></option>' +
			'						<option value="small">Small</option>' +
			'						<option value="medium">Medium</option>' +
			'						<option value="large">Large</option>' +
			'					</select>' +
			'				</div>' +
			'			</div>' +
			'			<div class="form__group">' +
			'				<label for="foo" class="control__label">Text field example</label>' +
			'				<div class="controls">' +
			'					<input id="foo" type="text" class="form__control">' +
			'				</div>' +
			'			</div>' +
			'			<div class="form__group form-checkbox">' +
			'				<label for="inStock" class="control__label">In stock</label>' +
			'				<div class="controls">' +
			'					<input id="inStock" type="checkbox" class="form__control checkbox">' +
			'				</div>' +
			'			</div>' +
            '		</fieldset>' +
            '		<div class="form__actions">' +
            '			<button type="submit" class="btn btn--primary js-submit-disable">Save</button>' +
            '			<a href="#" class="btn btn--naked" data-ui="clear-all-filters">Clear</a>' +
            '		</div>' +
       		'	</form>' +
			'</div>'
		).appendTo(this.$body);

		$.fn.select2 = sinon.stub();
		$.fn.popover = sinon.stub().returnsThis();

		this.filterBar = new FilterBarComponent(this.$html);
	});

	afterEach(function () {
        delete $.fn.select2;
        delete $.fn.popover;
    });

    describe('On init', function() {

		beforeEach(function() {
			this.filterBar.init();
		});

		it('should hide all form__group', function () {
			expect(this.$container.find('.form__group:not(.display--none)')).to.have.length(0);
		});

		it('should hide the forms form__actions', function () {
			expect(this.$container.find('.form__actions:not(.display--none)')).to.have.length(0);
		});

		it('should add the filter-bar__labels div to the fieldset', function () {
			expect(this.$container.find('fieldset > .filter-bar__labels')).to.have.length(1);
		});

		it('should append the filter add button to .filter-bar__labels', function () {
			expect(this.$container.find('.filter-bar__labels > .filter-bar__add')).to.have.length(1);
		});

		it('should initialize a popover on the add filter list button', function () {
			expect($.fn.popover).to.have.been.called;
		});

		it('should move the form actions inside the fieldset', function () {
			expect(this.$container.find('fieldset > .form__actions')).to.have.length(1);
		});
	});

	describe('When the filter list button is added', function() {

		beforeEach(function() {
			this.filterBar.init();
			this.$showFilterListButton = this.$container.find('[data-ui="show-filter-list"]');
			this.addFilterList = this.$showFilterListButton.attr('data-content');
			this.$addFilterList = $(this.addFilterList);
		});

		it('should add a list of form fields to the data-content attribute of the add button', function () {
			expect(this.$addFilterList.hasClass('filter-bar__list')).to.be.true;
		});

		it('should add a li and link for each form field to the add button filter bar list', function () {
			expect(this.$addFilterList.find('li a.filter-bar__list-item')).to.have.length(4);
		});

		it('should add the form field ID as the data-filter-id on each link', function () {
			expect(this.$addFilterList.find('[data-ui="filter-item"][data-filter-id="colour"]')).to.have.length(1);
			expect(this.$addFilterList.find('[data-ui="filter-item"][data-filter-id="size"]')).to.have.length(1);
			expect(this.$addFilterList.find('[data-ui="filter-item"][data-filter-id="foo"]')).to.have.length(1);
			expect(this.$addFilterList.find('[data-ui="filter-item"][data-filter-id="inStock"]')).to.have.length(1);
		});

		it('should add the form control label text as the data-filter-title on each link', function () {
			expect(this.$addFilterList.find('[data-ui="filter-item"][data-filter-title="Colour"]')).to.have.length(1);
			expect(this.$addFilterList.find('[data-ui="filter-item"][data-filter-title="Size"]')).to.have.length(1);
			expect(this.$addFilterList.find('[data-ui="filter-item"][data-filter-title="Text field example"]')).to.have.length(1);
			expect(this.$addFilterList.find('[data-ui="filter-item"][data-filter-title="In stock"]')).to.have.length(1);
		});
	});

	describe('When show filter bar is clicked', function() {

		beforeEach(function() {
			this.clickEvent = $.Event('click');
			this.filterBar.init();
			this.$showFilterListButton = this.$container.find('[data-ui="show-filter-list"]');
		});

		it('should prevent the default bahavior', function () {
			this.$showFilterBarLink.trigger(this.clickEvent);

			expect(this.clickEvent.isDefaultPrevented()).to.be.true;
		});

		it('should show the filter bar', function () {
			this.$showFilterBarLink.trigger(this.clickEvent);

			expect(this.$container.hasClass('display--none')).to.be.false;
		});

		it('should show the add button if it was previously hidden', function () {
			this.$showFilterListButton.addClass('display--none');

			this.$showFilterBarLink.trigger(this.clickEvent);

			expect(this.$showFilterListButton.hasClass('display--none')).to.be.false;
		});
	});

	describe('When filter list button is clicked', function() {

		beforeEach(function() {
			this.clickEvent = $.Event('click');
			this.filterBar.init();
			this.$showFilterListButton = this.$container.find('[data-ui="show-filter-list"]');
		});

		it('should prevent the default bahavior', function () {
			this.$showFilterListButton.trigger(this.clickEvent);

			expect(this.clickEvent.isDefaultPrevented()).to.be.true;
		});

		it('should trigger a popover', function () {
			this.$showFilterListButton.trigger(this.clickEvent);

			expect($.fn.popover).to.have.been.called;
		});
	});

	describe('When an item from the filter list is clicked', function() {

		beforeEach(function() {
			this.clickEvent = $.Event('click');
			this.filterBar.init();

			this.$container.append(
	            '<div class="popover">' +
	            '	<ul class="filter-bar__list">' +
	            '		<li>' +
	            '    		<a href="#" class="filter-bar__list-item" data-ui="filter-item" data-filter-id="inStock" data-filter-title="In Stock">In Stock</a>' +
	            '		</li>' +
	            '		<li>' +
	            '    		<a href="#" class="filter-bar__list-item" data-ui="filter-item" data-filter-id="colour" data-filter-title="Colour">Colour</a>' +
	            '		</li>' +
	            '	</ul>' +
	            '</div>'
	        );

	        this.$showFilterListButton = this.$container.find('[data-ui="show-filter-list"]');
		});

		it('should prevent the default behavior', function () {
			this.$popoverFilterLink = this.$container.find('[data-filter-id="colour"]');
			this.$popoverFilterLink.trigger(this.clickEvent);

			expect(this.clickEvent.isDefaultPrevented()).to.be.true;
		});

		it('should hide the link parent in the filter list', function () {
			this.$popoverFilterLink = this.$container.find('[data-filter-id="colour"]');
			this.$popoverFilterLink.trigger(this.clickEvent);

			var addFilterButtonList = this.$showFilterListButton.attr('data-content'),
				$addFilterButtonList = $(addFilterButtonList),
				$filterItem = $addFilterButtonList.find('[data-filter-id="colour"]'),
				$filterItemParent = $filterItem.parent();

			expect($filterItemParent.hasClass('display--none')).to.be.true;
		});

		describe('If the filter field type is a checkbox', function() {

			beforeEach(function() {
		        this.$popoverFilterLink = this.$container.find('[data-filter-id="inStock"]');
				this.$popoverFilterLink.trigger(this.clickEvent);
			});

			it('should add a label to the filter bar for the clicked filter', function () {
				expect(this.$container.find('span.label--inverse')).to.have.length(1);
			});

			it('should add the correct data-filter-id to the label', function () {
				expect(this.$container.find('span[data-filter-id="inStock"]')).to.have.length(1);
			});

			it('should close the filter list popover', function () {
				expect($.fn.popover).to.have.been.calledWith('hide');
			});

			it('should check the checkbox', function () {
				expect(this.$container.find('input#inStock').prop('checked')).to.be.true;
			});

			it('should add the remove button to the label', function () {
				expect(this.$container.find('span[data-filter-id="inStock"] a[data-ui="filter-cancel"]')).to.have.length(1);
			});
		});

		describe('If the filter field type not a checkbox', function() {

			beforeEach(function() {
		        this.$popoverFilterLink = this.$container.find('[data-filter-id="colour"]');
				this.$popoverFilterLink.trigger(this.clickEvent);
			});

			it('should add a label to the filter bar for the clicked filter', function () {
				expect(this.$container.find('span.label--primary')).to.have.length(1);
			});

			it('should add the correct data-filter-id to the label', function () {
				expect(this.$container.find('span[data-filter-id="colour"]')).to.have.length(1);
			});

			it('should add the is-disabled class to the filter list button', function () {
				expect(this.$showFilterListButton.hasClass('is-disabled')).to.be.true;
			});

			it('should close the filter list popover', function () {
				expect($.fn.popover).to.have.been.calledWith('hide');
			});

			it('should open the filter field popover', function () {
				expect($.fn.popover).to.have.been.calledWith('show');
			});

			it('should disable the filter list button', function () {
				expect(this.$showFilterListButton.prop('disabled')).to.be.true;
			});
		});

		describe('If there are no more filters available to add', function() {

			it('should hide the show filter list button', function () {
				var addFilterButtonList = this.$showFilterListButton.attr('data-content'),
				$addFilterButtonList = $(addFilterButtonList),
				$filterItemParents = $addFilterButtonList.find('li');
				$filterItemParents.addClass('display--none');
				this.$showFilterListButton.attr('data-content', $addFilterButtonList[0].outerHTML);

				this.$popoverFilterLink = this.$container.find('[data-filter-id="colour"]');
				this.$popoverFilterLink.trigger(this.clickEvent);

				expect(this.$showFilterListButton.hasClass('display--none')).to.be.true;
			});
		});
	});

	describe('When remove filter is clicked', function() {
		beforeEach(function() {
			this.clickEvent = $.Event('click');
			this.clickEvent2 = $.Event('click');
			this.filterBar.init();
			this.$showFilterListButton = this.$container.find('[data-ui="show-filter-list"]');
			this.$filterBarLabelsWrapper = this.$container.find('.filter-bar__labels');
			this.$exampleAddedLabel = $(
				'<span class="label label--large label--inverse" data-filter-id="foo" data-original-title="" title="">Text field example' +
				'	<span class="chosen-filter">: something</span>'+
				'	<a data-ui="filter-cancel" class="btn remove-button" data-filter-id="foo">' +
				'		<i class="icon-remove-sign"></i>' +
				'	</a>' +
				'</span>'
			).appendTo(this.$filterBarLabelsWrapper);

			this.$exampleAddedPopover = $(
				'<div class="popover">' +
				'	<a data-ui="filter-cancel" class="btn remove-button" data-filter-id="foo">' +
				'		<i class="icon-remove-sign"></i>' +
				'	</a>' +
				'</div>'
			).appendTo(this.$filterBarLabelsWrapper);

			this.$removeFilterButton = this.$exampleAddedLabel.find('[data-ui="filter-cancel"]');
			this.$removeFilterButtonInPopover = this.$exampleAddedPopover.find('[data-ui="filter-cancel"]');

			this.$addFilterButtonList = $(this.$showFilterListButton.attr('data-content'));
			this.$filterItem = this.$addFilterButtonList.find('[data-filter-id="foo"]');
			this.$filterItemParent = this.$filterItem.parent();
		});

		describe('from within a label', function() {

			it('should remove the corresponding label', function () {
				this.$removeFilterButton.trigger(this.clickEvent);

				expect(this.$container.find('span[data-filter-id="foo"]')).to.have.length(0);
			});

			it('should unhide the filter in the filter list', function () {
				this.$filterItemParent.addClass('display--none');

				this.$removeFilterButton.trigger(this.clickEvent);

				this.$addFilterButtonList = $(this.$showFilterListButton.attr('data-content'));
				this.$filterItem = this.$addFilterButtonList.find('[data-filter-id="foo"]');
				this.$filterItemParent = this.$filterItem.parent();

				expect(this.$filterItemParent.hasClass('display--none')).to.be.false;
			});

			it('should display the filter list button', function () {
				this.$removeFilterButton.trigger(this.clickEvent);

				expect(this.$showFilterListButton.hasClass('display--none')).to.be.false;
			});

			it('should not display the form actions if no other labels exist', function () {
				this.$removeFilterButton.trigger(this.clickEvent);

				expect(this.$container.find('.form__actions:not(.display--none)')).to.have.length(0);
			});

			it('should display the form actions if other labels exist', function () {
				this.$exampleAddedLabel2 = $(
					'<span class="label label--large label--inverse" data-filter-id="colour" data-original-title="" title="">Colour' +
					'	<span class="chosen-filter">: something</span>'+
					'	<a data-ui="filter-cancel" class="btn remove-button" data-filter-id="colour">' +
					'		<i class="icon-remove-sign"></i>' +
					'	</a>' +
					'</span>'
				).appendTo(this.$filterBarLabelsWrapper);
				this.$removeFilterButton2 = this.$exampleAddedLabel2.find('[data-ui="filter-cancel"]');

				this.$removeFilterButton2.trigger(this.clickEvent);

				expect(this.$container.find('.form__actions:not(.display--none)')).to.have.length(1);
			});
		});

		describe('from within a popover', function() {

			it('should remove the corresponding label', function () {
				this.$removeFilterButtonInPopover.trigger(this.clickEvent2);

				expect(this.$container.find('span[data-filter-id="foo"]')).to.have.length(0);
			});

			it('should unhide the filter in the filter list', function () {
				this.$filterItemParent.addClass('display--none');

				this.$removeFilterButtonInPopover.trigger(this.clickEvent2);

				this.$addFilterButtonList = $(this.$showFilterListButton.attr('data-content'));
				this.$filterItem = this.$addFilterButtonList.find('[data-filter-id="foo"]');
				this.$filterItemParent = this.$filterItem.parent();

				expect(this.$filterItemParent.hasClass('display--none')).to.be.false;
			});

			it('should display the filter list button', function () {
				this.$removeFilterButtonInPopover.trigger(this.clickEvent2);

				expect(this.$showFilterListButton.hasClass('display--none')).to.be.false;
			});

			it('should not display the form actions if no other labels exist', function () {
				this.$removeFilterButtonInPopover.trigger(this.clickEvent2);

				expect(this.$container.find('.form__actions:not(.display--none)')).to.have.length(0);
			});
		});

		describe('when the filter field is a text field', function() {
			it('should clear the value of the filter field', function () {
				this.$container.find('#foo').val('some value');

				this.$removeFilterButton.trigger(this.clickEvent);

				expect(this.$container.find('#foo').val()).to.be.empty;
			});
		});

		describe('when the filter field is a checkbox', function() {
			beforeEach(function() {
				this.$exampleAddedLabelForCheckboxFilter = $(
					'<span class="label label--large label--inverse" data-filter-id="inStock">In stock' +
					'	<span class="chosen-filter"></span>'+
					'	<a data-ui="filter-cancel" class="btn remove-button" data-filter-id="inStock">' +
					'		<i class="icon-remove-sign"></i>' +
					'	</a>' +
					'</span>'
				).appendTo(this.$filterBarLabelsWrapper);

				this.$removeFilterButtonForCheckbox = this.$exampleAddedLabelForCheckboxFilter.find('[data-ui="filter-cancel"]');
			});

			it('should clear the value of the filter field', function () {
				this.$container.find('#inStock').prop('checked', true);

				this.$removeFilterButtonForCheckbox.trigger(this.clickEvent);

				expect(this.$container.find('#inStock').prop('checked')).to.be.false;
			});
		});
	});

	describe('When clear filters is clicked', function() {
		beforeEach(function() {
			this.clickEvent = $.Event('click');
			this.clickEvent2 = $.Event('click');
			this.resetForm = sinon.spy();
			this.$form = this.$container.find('form');
        	this.$form[0].reset = this.resetForm;

			this.filterBar.init();

			this.$showFilterListButton = this.$container.find('[data-ui="show-filter-list"]');
			this.$showFilterBarLink.trigger(this.clickEvent);

			this.$filterBarLabelsWrapper = this.$container.find('.filter-bar__labels');
			this.$exampleAddedLabel = $(
				'<span class="label label--large label--inverse" data-filter-id="foo" data-original-title="" title="">Text field example' +
				'	<span class="chosen-filter">: something</span>'+
				'	<a data-ui="filter-cancel" class="btn remove-button" data-filter-id="foo">' +
				'		<i class="icon-remove-sign"></i>' +
				'	</a>' +
				'</span>'
			).appendTo(this.$filterBarLabelsWrapper);

			this.$clearAllFiltersButton = this.$container.find('[data-ui="clear-all-filters"]');
			this.$clearAllFiltersButton.trigger(this.clickEvent2);
		});

		it('should remove all labels', function () {
			expect(this.$container.find('.label')).to.have.length(0);
		});

		it('should hide the filter bar', function () {
			expect(this.$container.hasClass('display--none')).to.be.true;
		});

		it('should hide the form actions', function () {
			expect(this.$container.find('.form__actions').hasClass('display--none')).to.be.true;
		});

		it('should reset the form', function () {
			expect(this.resetForm).to.have.been.called;
		});
	});

	describe('when a filter form has a value on page load', function() {
		beforeEach(function() {
			this.$container.find('#foo').val('some value');
			this.$container.find('#inStock').prop('checked', 'checked');
			this.$container.find('#size').val('medium');

			this.filterBar.init();

		});

		it('should add a label to the filterbar for text inputs', function () {
			expect(this.$container.find('span[data-filter-id="foo"]')).to.have.length(1);
		});

		it('should add a label to the filterbar for checkbox inputs', function () {
			expect(this.$container.find('span[data-filter-id="inStock"]')).to.have.length(1);
		});

		it('should add a label to the filterbar for select inputs', function () {
			expect(this.$container.find('span[data-filter-id="size"]')).to.have.length(1);
		});
	});
});
