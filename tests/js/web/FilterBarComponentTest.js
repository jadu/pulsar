'use strict';

var $ = require('jquery'),
	FilterBarComponent = require('../../../js/FilterBarComponent');

describe('FilterBarComponent', function () {
	beforeEach(function() {
		this.$html = $('html');
		this.$body = $('body');
		this.$showFilterBarLink = $('<a href="#" data-ui="show-filter-bar">Add filter</a>').appendTo(this.$body);
		this.$container = $(
			'<div class="filter-bar u-display-none">' +
			'	<form method="POST" enctype="application/x-www-form-urlencoded" class="form">' +
			'		<fieldset>' +
			'			<legend class="legend">Filter by</legend>' +
			'			<div class="form__group">' +
			'				<label for="colour" class="control__label">Colour</label>' +
			'				<div class="controls">' +
			'					<select id="colour" multiple="" data-placeholder="Choose one or more" class="form__control select js-select2">' +
			'						<option value="colour_red">Red</option>' +
			'						<option value="colour_blue">Blue</option>' +
			'					</select>' +
			'				</div>' +
			'			</div>' +
			'			<div class="form__group">' +
			'				<label for="size" class="control__label">Size</label>' +
			'				<div class="controls">' +
			'					<select id="size" data-placeholder="Choose one" class="form__control select js-select2">' +
			'						<option value="">Choose one</option>' +
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
		this.$body.empty();
    });

    describe('On init', function() {

		beforeEach(function() {
			this.filterBar.init();
		});

		it('should hide all form__group', function () {
			expect(this.$container.find('.form__group:not(.u-display-none)')).to.have.length(0);
		});

		it('should hide the forms form__actions', function () {
			expect(this.$container.find('.form__actions:not(.u-display-none)')).to.have.length(0);
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

			expect(this.$container.hasClass('u-display-none')).to.be.false;
		});

		it('should show the add button if it was previously hidden', function () {
			this.$showFilterListButton.addClass('u-display-none');

			this.$showFilterBarLink.trigger(this.clickEvent);

			expect(this.$showFilterListButton.hasClass('u-display-none')).to.be.false;
		});

		it('should focus the filter bar add button', function () {
			this.$showFilterBarLink.trigger(this.clickEvent);

			expect(this.$showFilterListButton.is(':focus')).to.be.true;
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

		it('should set aria-expanded to true', function () {
			this.$showFilterListButton.trigger(this.clickEvent);

			expect(this.$showFilterListButton.attr('aria-expanded')).to.be.equal('true');
		});

		it('should set aria-expanded to false if clicked twice', function () {
			this.$showFilterListButton.trigger(this.clickEvent);
			this.$showFilterListButton.trigger(this.clickEvent);

			expect(this.$showFilterListButton.attr('aria-expanded')).to.be.equal('false');
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
			this.$popoverFilterLink = this.$container.find('.filter-bar__list [data-filter-id="colour"]');
			this.$popoverFilterLink.trigger(this.clickEvent);

			expect(this.clickEvent.isDefaultPrevented()).to.be.true;
		});

		it('should hide the link parent in the filter list', function () {
			this.$popoverFilterLink = this.$container.find('.filter-bar__list [data-filter-id="colour"]');
			this.$popoverFilterLink.trigger(this.clickEvent);

			var addFilterButtonList = this.$showFilterListButton.attr('data-content'),
				$addFilterButtonList = $(addFilterButtonList),
				$filterItem = $addFilterButtonList.find('[data-filter-id="colour"]'),
				$filterItemParent = $filterItem.parent();

			expect($filterItemParent.hasClass('u-display-none')).to.be.true;
		});

		describe('If the filter field type is a checkbox', function() {

			beforeEach(function() {
		        this.$popoverFilterLink = this.$container.find('.filter-bar__list [data-filter-id="inStock"]');
			});

			it('should add a label to the filter bar for the clicked filter', function () {
				this.$popoverFilterLink.trigger(this.clickEvent);

				expect(this.$container.find('span.label--inverse[data-filter-id="inStock"]')).to.have.length(1);
			});

			it('should add the correct data-filter-id to the label', function () {
				this.$popoverFilterLink.trigger(this.clickEvent);

				expect(this.$container.find('span[data-filter-id="inStock"]')).to.have.length(1);
			});

			it('should close the filter list popover', function () {
				this.$popoverFilterLink.trigger(this.clickEvent);

				expect($.fn.popover).to.have.been.calledWith('hide');
			});

			it('should check the checkbox', function () {
				this.$popoverFilterLink.trigger(this.clickEvent);

				expect(this.$container.find('input#inStock').prop('checked')).to.be.true;
			});

			it('should add the remove button to the label', function () {
				this.$popoverFilterLink.trigger(this.clickEvent);

				expect(this.$container.find('span[data-filter-id="inStock"] button[data-ui="filter-cancel"]')).to.have.length(1);
			});

			it('should the correct accessible text to the label remove button', function () {
				this.$popoverFilterLink.trigger(this.clickEvent);

				var $removeButton = this.$container.find('span[data-filter-id="inStock"] button[data-ui="filter-cancel"]');

				expect($removeButton.find('.hide').text()).to.be.equal('Remove In Stock filter');
			});

			it('should focus the add button, if it is visible', function () {
				this.$popoverFilterLink.trigger(this.clickEvent);

				expect(this.$container.find('[data-ui="show-filter-list"]').is(':focus')).to.be.true;
			});

			it('should focus the save button, if there are no more filter options', function () {
				var addFilterButtonList = this.$showFilterListButton.attr('data-content'),
				$addFilterButtonList = $(addFilterButtonList),
				$filterItemParents = $addFilterButtonList.find('li');
				$filterItemParents.addClass('u-display-none');
				this.$showFilterListButton.attr('data-content', $addFilterButtonList[0].outerHTML);

				this.$popoverFilterLink.trigger(this.clickEvent);

				expect(this.$container.find('.form__actions .btn--primary').is(':focus')).to.be.true;
			});
		});

		describe('If the filter field type not a checkbox', function() {

			beforeEach(function() {
		        this.$popoverFilterLink = this.$container.find('.filter-bar__list [data-filter-id="colour"]');
				this.$popoverFilterLink.trigger(this.clickEvent);
			});

			it('should add a label to the filter bar for the clicked filter', function () {
				expect(this.$container.find('span.label--primary[data-filter-id="colour"]')).to.have.length(1);
			});

			it('should add the correct data-filter-id to the label', function () {
				expect(this.$container.find('span.label--primary[data-filter-id="colour"]')).to.have.length(1);
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
				$filterItemParents.addClass('u-display-none');
				this.$showFilterListButton.attr('data-content', $addFilterButtonList[0].outerHTML);

				this.$popoverFilterLink = this.$container.find('.filter-bar__list [data-filter-id="colour"]');
				this.$popoverFilterLink.trigger(this.clickEvent);

				expect(this.$showFilterListButton.hasClass('u-display-none')).to.be.true;
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
				'<span class="label label--large label--inverse label--removable" data-filter-id="foo" data-original-title="" title="">' +
				'	<span class="label__text">Text field example <span class="chosen-filter">: something</span></span>'+
				'	<button type="button" data-ui="filter-cancel" class="btn remove-button" data-filter-id="foo">' +
				'		<i class="icon-remove-sign"></i>' +
				'	</button>' +
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
				this.$filterItemParent.addClass('u-display-none');

				this.$removeFilterButton.trigger(this.clickEvent);

				this.$addFilterButtonList = $(this.$showFilterListButton.attr('data-content'));
				this.$filterItem = this.$addFilterButtonList.find('[data-filter-id="foo"]');
				this.$filterItemParent = this.$filterItem.parent();

				expect(this.$filterItemParent.hasClass('u-display-none')).to.be.false;
			});

			it('should display the filter list button', function () {
				this.$removeFilterButton.trigger(this.clickEvent);

				expect(this.$showFilterListButton.hasClass('u-display-none')).to.be.false;
			});

			it('should show form actions', function () {
				this.$removeFilterButton.trigger(this.clickEvent);

				expect(this.$container.find('.form__actions').hasClass('.u-display-none')).to.be.false;
			});

			it('should display the form actions if other labels exist', function () {
				this.$exampleAddedLabel2 = $(
					'<span class="label label--large label--inverse label--removable" data-filter-id="colour" data-original-title="" title="">' +
					'	<span class="label__text"> Colour <span class="chosen-filter">: something</span></span>'+
					'	<button type="button" data-ui="filter-cancel" class="btn remove-button" data-filter-id="colour">' +
					'		<i class="icon-remove-sign"></i>' +
					'	</button>' +
					'</span>'
				).appendTo(this.$filterBarLabelsWrapper);
				this.$removeFilterButton2 = this.$exampleAddedLabel2.find('[data-ui="filter-cancel"]');

				this.$removeFilterButton2.trigger(this.clickEvent);

				expect(this.$container.find('.form__actions:not(.u-display-none)')).to.have.length(1);
			});

			it('should focus the add button', function () {
				this.$removeFilterButton.trigger(this.clickEvent);

				expect(this.$container.find('[data-ui="show-filter-list"]').is(':focus')).to.be.true;
			});
		});

		describe('from within a popover', function() {

			it('should remove the corresponding label', function () {
				this.$removeFilterButtonInPopover.trigger(this.clickEvent2);

				expect(this.$container.find('span[data-filter-id="foo"]')).to.have.length(0);
			});

			it('should unhide the filter in the filter list', function () {
				this.$filterItemParent.addClass('u-display-none');

				this.$removeFilterButtonInPopover.trigger(this.clickEvent2);

				this.$addFilterButtonList = $(this.$showFilterListButton.attr('data-content'));
				this.$filterItem = this.$addFilterButtonList.find('[data-filter-id="foo"]');
				this.$filterItemParent = this.$filterItem.parent();

				expect(this.$filterItemParent.hasClass('u-display-none')).to.be.false;
			});

			it('should display the filter list button', function () {
				this.$removeFilterButtonInPopover.trigger(this.clickEvent2);

				expect(this.$showFilterListButton.hasClass('u-display-none')).to.be.false;
			});

			it('should show form actions', function () {
				this.$removeFilterButtonInPopover.trigger(this.clickEvent2);

				expect(this.$container.find('.form__actions').hasClass('.u-display-none')).to.be.false;
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
					'<span class="label label--large label--inverse label--removable" data-filter-id="inStock">'+
					'	<span class="label__text">In stock <span class="chosen-filter"></span></span>'+
					'	<button type="button" data-ui="filter-cancel" class="btn remove-button" data-filter-id="inStock">' +
					'		<i class="icon-remove-sign"></i>' +
					'	</button>' +
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
				'<span class="label label--large label--inverse label--removable" data-filter-id="foo" data-original-title="" title="">' +
				'	<span class="label__text">Text field example <span class="chosen-filter">: something</span></span>'+
				'	<button type="button" data-ui="filter-cancel" class="btn remove-button" data-filter-id="foo">' +
				'		<i class="icon-remove-sign"></i>' +
				'	</button>' +
				'</span>'
			).appendTo(this.$filterBarLabelsWrapper);

			this.$clearAllFiltersButton = this.$container.find('[data-ui="clear-all-filters"]');
			this.$clearAllFiltersButton.trigger(this.clickEvent2);
		});

		it('should remove all labels', function () {
			expect(this.$container.find('.label')).to.have.length(0);
		});

		it('should hide the filter bar', function () {
			expect(this.$container.hasClass('u-display-none')).to.be.true;
		});

		it('should hide the form actions', function () {
			expect(this.$container.find('.form__actions').hasClass('u-display-none')).to.be.true;
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
		});

		it('should add a label to the filterbar for text inputs', function () {
			this.filterBar.init();

			expect(this.$container.find('span[data-filter-id="foo"]')).to.have.length(1);
		});

		it('should add a label to the filterbar for checkbox inputs', function () {
			this.filterBar.init();

			expect(this.$container.find('span[data-filter-id="inStock"]')).to.have.length(1);
		});

		it('should add a label to the filterbar for select inputs', function () {
			this.filterBar.init();

			expect(this.$container.find('span[data-filter-id="size"]')).to.have.length(1);
			expect(this.$container.find('span[data-filter-id="size"] .label__text').text()).to.be.equal('Size: Medium');
		});

		it('should add a comma separated label to the filterbar for select inputs with the multiple attribute', function () {
			this.$container.find('#colour').val(['colour_red', 'colour_blue']);

			this.filterBar.init();

			expect(this.$container.find('span[data-filter-id="colour"]')).to.have.length(1);
			expect(this.$container.find('span[data-filter-id="colour"] .label__text').text()).to.be.equal('Colour: Red, Blue');
		});

		it('should the correct accessible text to the label remove button for checkbox fields', function () {
			this.filterBar.init();

			var $checkboxLabelRemoveButtonA11yText = this.$container.find('span[data-filter-id="inStock"] .remove-button .hide').text();

			expect($checkboxLabelRemoveButtonA11yText).to.be.equal('Remove In stock filter');
		});

		it('should the correct accessible text to the label remove button for other fields', function () {
			this.filterBar.init();

			var $textInputLabelRemoveButtonA11yText = this.$container.find('span[data-filter-id="foo"] .remove-button .hide').text();

			expect($textInputLabelRemoveButtonA11yText).to.be.equal('Remove Text field example filter');
		});

		it('should hide the add filter button if all filters have been used', function () {
			this.$container.find('#colour').val(['colour_red', 'colour_blue']);

			this.filterBar.init();

			expect(this.$container.find('[data-ui="show-filter-list"]').hasClass('u-display-none')).to.be.true;
		});

		it('should show the clear button', function () {
			this.filterBar.init();

			expect(this.$container.find('.form__actions').hasClass('u-display-none')).to.be.false;
		});

		it('should hide the save button', function () {
			this.filterBar.init();

			expect(this.$container.find('.form__actions .btn--primary').hasClass('u-display-none')).to.be.true;
		});

		it('should show the form actions when a change has been made', function () {
			this.clickEvent = $.Event('click');

			this.filterBar.init();
			this.$container.find('span[data-filter-id="inStock"] .remove-button').trigger(this.clickEvent);

			expect(this.$container.find('.form__actions').hasClass('u-display-none')).to.be.false;
			expect(this.$container.find('.form__actions .btn--primary').hasClass('u-display-none')).to.be.false;
		});

		it('should show the save button when all filters have been removed', function () {
			this.clickEvent = $.Event('click');

			this.filterBar.init();
			this.$container.find('span[data-filter-id="foo"] .remove-button').trigger(this.clickEvent);
			this.$container.find('span[data-filter-id="inStock"] .remove-button').trigger(this.clickEvent);
			this.$container.find('span[data-filter-id="size"] .remove-button').trigger(this.clickEvent);

			expect(this.$container.find('.form__actions').hasClass('u-display-none')).to.be.false;
			expect(this.$container.find('.form__actions .btn--primary').hasClass('u-display-none')).to.be.false;
		});
	});
});