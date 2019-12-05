import $ from 'jquery';
import FocusManagementService from '../../../js/FocusManagementService'

describe('FocusManagementService', () => {
    let $html;
    let $body;
    let $link;
    let $input;
    let $select;
    let $textarea;
    let $button;
    let focusManagementService;

    beforeEach(() => {
        $html = $('html');
        $body = $('body');
        $link = $('<a href="#">Link</a>').appendTo($body);
        $input = $('<input type="text"/>');
        $select = $('<select><option value="one">One</option></select>');
        $textarea = $('<textarea>text</textarea>');
        $button = $('<button>Button</button>');

        focusManagementService = new FocusManagementService();
    });

    afterEach(() => {
        $body.empty();
    });

    describe('storeElement()', () => {
        it('should store the element', () => {
            focusManagementService.storeElement($link);

            expect(focusManagementService.$element === $link).to.be.true;
        });
    });

    describe('returnFocusToElement()', () => {
        it('should return focus to the stored the element', () => {
            focusManagementService.storeElement($link);

            focusManagementService.returnFocusToElement();

            expect($link.is(':focus')).to.be.true;
        });
    });

    describe('focusFirstFocusableElement()', () => {
        it('should focus the first focusable element, if the element is a link ', () => {
            focusManagementService.focusFirstFocusableElement($body);

            expect($link.is(':focus')).to.be.true;
        });

        it('should focus the first focusable element, if the element is a input ', () => {
            $input.prependTo($body);

            focusManagementService.focusFirstFocusableElement($body);

            expect($input.is(':focus')).to.be.true;
        });

        it('should focus the first focusable element, if the element is a select ', () => {
            $select.prependTo($body);

            focusManagementService.focusFirstFocusableElement($body);

            expect($select.is(':focus')).to.be.true;
        });

        it('should focus the first focusable element, if the element is a textarea ', () => {
            $textarea.prependTo($body);

            focusManagementService.focusFirstFocusableElement($body);

            expect($textarea.is(':focus')).to.be.true;
        });

        it('should focus the first focusable element, if the element is a button ', () => {
            $button.prependTo($body);

            focusManagementService.focusFirstFocusableElement($body);

            expect($button.is(':focus')).to.be.true;
        });

        it('should not focus the first element if it has tabindex="-1"', () => {
            let $tabIndexZeroElement = $('<a href="#" tabindex="-1">Can not focus me</a>').prependTo($body);

            focusManagementService.focusFirstFocusableElement($body);

            expect($link.is(':focus')).to.be.true;
        });

        it('should not focus the first element if it has the disabled attribute', () => {
            let $disabledInput = $('<input type="text" disabled/>').prependTo($body);

            focusManagementService.focusFirstFocusableElement($body);

            expect($link.is(':focus')).to.be.true;
        });

        it('should not focus the first element if it has type hidden', () => {
            let $hiddenInput = $('<input type="hidden"/>').prependTo($body);

            focusManagementService.focusFirstFocusableElement($body);

            expect($link.is(':focus')).to.be.true;
        });

        it('should not focus the first element if it has the aria-hidden attribute', () => {
            let $ariaHiddenlink= $('<a href="#" aria-hidden="true">Can not focus me</a>').prependTo($body);

            focusManagementService.focusFirstFocusableElement($body);

            expect($link.is(':focus')).to.be.true;
        });
    });
});
