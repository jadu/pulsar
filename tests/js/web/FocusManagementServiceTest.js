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
    let keyDownEvent;
    let $focusTrapContainer;

    beforeEach(() => {
        $html = $('html');
        $body = $('body');
        $link = $('<a href="#">Link</a>').appendTo($body);
        $input = $('<input type="text"/>');
        $select = $('<select><option value="one">One</option></select>');
        $textarea = $('<textarea>text</textarea>');
        $button = $('<button>Button</button>');
        $focusTrapContainer = $(`
            <div class="trap">
                <a href="#" class="trap-link-first">Link</a>
                <a href="#" class="trap-link-last">Link</a>
            </div>
        `);

        focusManagementService = new FocusManagementService();
    });

    afterEach(() => {
        $body.empty();
    });

    describe('storeElement()', () => {
        it('should store the element', () => {
            focusManagementService.storeElement($link);

            expect(focusManagementService.$element).to.equal($link)
        });
    });

    describe('returnFocusToElement()', () => {
        it('should return focus to the stored the element', () => {
            focusManagementService.storeElement($link);

            focusManagementService.returnFocusToElement();

            expect($link.is(':focus')).to.be.true;
        });
    });

    describe('hasStoredElement()', () => {
        it('should return true if an element is stored', () => {
            focusManagementService.storeElement($link);

            expect(focusManagementService.hasStoredElement()).to.be.true;
        })

        it('should return false if an element is not stored', () => {
            expect(focusManagementService.hasStoredElement()).to.be.false;
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
            const $tabIndexZeroElement = $('<a href="#" tabindex="-1">Can not focus me</a>').prependTo($body);

            focusManagementService.focusFirstFocusableElement($body);

            expect($link.is(':focus')).to.be.true;
        });

        it('should not focus the first element if it has the disabled attribute', () => {
            const $disabledInput = $('<input type="text" disabled/>').prependTo($body);

            focusManagementService.focusFirstFocusableElement($body);

            expect($link.is(':focus')).to.be.true;
        });

        it('should not focus the first element if it has type hidden', () => {
            const $hiddenInput = $('<input type="hidden"/>').prependTo($body);

            focusManagementService.focusFirstFocusableElement($body);

            expect($link.is(':focus')).to.be.true;
        });

        it('should not focus the first element if it has the aria-hidden attribute', () => {
            const $ariaHiddenlink= $('<a href="#" aria-hidden="true">Can not focus me</a>').prependTo($body);

            focusManagementService.focusFirstFocusableElement($body);

            expect($link.is(':focus')).to.be.true;
        });
    });

    describe('trapFocus()', () => {
        beforeEach(() => {
            keyDownEvent = $.Event('keydown');
            keyDownEvent.keyCode = 9;
            $focusTrapContainer.appendTo($body);
            focusManagementService.trapFocus($body.find('.trap'));
        });

        it('should focus the first interactive element in the trap, when tab is pressed on the last element', () => {
            const $trapLastLink = $focusTrapContainer.find('.trap-link-last');

            $trapLastLink.trigger('focus');
            $trapLastLink.trigger(keyDownEvent);

            expect($focusTrapContainer.find('.trap-link-first').is(':focus')).to.be.true;
        });

        it('should focus the last interactive element in the trap, when shift + tab is pressed on the first element', () => {
            const $trapFirstLink = $focusTrapContainer.find('.trap-link-first');

            keyDownEvent.shiftKey = true;
            $trapFirstLink.trigger('focus');
            $trapFirstLink.trigger(keyDownEvent);

            expect($focusTrapContainer.find('.trap-link-last').is(':focus')).to.be.true;
        });
    });
});
