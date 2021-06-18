import $ from 'jquery';
import ModalFocusService from '../../../../js/Modals/ModalFocusService';

describe('ModalFocusService', () => {
    let $body;
    let $wrapper;
    let $link;
    let $actionsMenu;
    let $actionsMenuChildLink;
    let $modal;
    let $closeButton;
    let $inputButton;
    let $cancelButton;
    let keyDownEvent;
    let service;

    beforeEach(() => {
        $body = $('body');
        $wrapper = $('<div class="wrapper"></div>');
        $link = $('<a href="#">focus trap test link</a>');
        $actionsMenu = $(`
            <div class="btn__group dropdown">
                <button data-toggle="dropdown" class="btn dropdown__toggle">Actions</button>
                <ul class="dropdown__menu">
                    <li><a href="#">focus trap test link 2</a></li>
                </ul>
            </div>
        `);
        $actionsMenuChildLink = $actionsMenu.find('a');
        $modal = $(`
            <div class="modal">
                <div class="modal__content">
                    <form>
                        <div class="test-wrapper">
                            <div class="modal__header">
                                <button class="close" type="button" data-dismiss="modal">×</button>
                                <h4>Assign to</h4>
                            </div>

                            <div class="modal__body">
                                <input class="input2" type="text" aria-hidden="true"/>
                                <input class="input3" type="text" disabled="disabled"/>
                                <input class="input4" type="button"/>
                                <button class="input5">button</button>
                                <input class="input6" type="text"/>
                            </div>
                            <div class="modal__footer">
                                <button class="input7" type="submit">Save</button>
                                <button class="input8" type="button" data-dismiss="modal">Cancel</button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        `);

        $wrapper.append($link);
        $wrapper.append($actionsMenu);
        $wrapper.append($modal);
        $body.append($wrapper);

        $closeButton = $modal.find('.close');
        $inputButton = $modal.find('.input4');
        $cancelButton = $modal.find('.input8');
        keyDownEvent = $.Event('keydown');

        service = new ModalFocusService();
    });

    afterEach(() => {
        $body.find('.wrapper').remove();
    });

    describe('trapFocus()', () => {

        describe('When focusable elements are present', () => {
            it('should focus the first non disabled, non button, non aria-hidden input', () => {
                service.trapFocus($modal, $body);

                expect($inputButton.is(':focus')).to.be.true;
            });
        });

        describe('When there are no focusable elements', () => {
            it('should focus the close X button', () => {
                $body.find('.modal__body').empty();

                service.trapFocus($modal, $body);

                expect($closeButton.is(':focus')).to.be.true;
            });
        });

        describe('When there are no focusable elements and no close X button ', () => {
            it('should focus the close button', () => {
                $body.find('.modal__body').empty();
                $body.find('.modal__header .close').remove();

                service.trapFocus($modal, $body);

                expect($cancelButton.is(':focus')).to.be.true;
            });
        });

        describe('when tab is pressed', () => {
            it('should focus the first element, when the last element was previously focused', () => {
                service.trapFocus($modal, $body);

                $cancelButton.focus();
                keyDownEvent.keyCode = 9;
                $body.trigger(keyDownEvent);

                expect($closeButton.is(':focus')).to.be.true;
            });
        });

        describe('when shift + tab is pressed', () => {
            it('should focus the last element, when the first element was previously focused', () => {
                service.trapFocus($modal, $body);

                $closeButton.focus();
                keyDownEvent.keyCode = 9;
                keyDownEvent.shiftKey = true;
                $body.trigger(keyDownEvent);

                expect($cancelButton.is(':focus')).to.be.true;
            });
        });
    });

    describe('releaseFocus()', () => {
        it('should focus on the passed element', () => {
            service.releaseFocus($link);

            expect($link.is(':focus')).to.be.true;
        });

        it('should focus on parent dropdown__toggle if link is in actions menu', () => {
            service.releaseFocus($actionsMenuChildLink);

            expect($actionsMenu.find('.btn.dropdown__toggle').is(':focus')).to.be.true;
        });
    });
});
