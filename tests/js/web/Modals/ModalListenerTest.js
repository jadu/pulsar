import $ from 'jquery';
import ModalListener from '../../../../js/Modals/ModalListener';
import ModalFocusService from '../../../../js/Modals/ModalFocusService';

describe('ModalListener', () => {
    let $html;
    let $body;
    let $container;
    let $myModal;
    let $modalTrigger;
    let $disabledModalLink;
    let modalFocusService;
    let modalListener;
    let clickEvent;
    let doClick;
    let doClickOnDisabledTrigger;

    beforeEach(() => {
        $html = $('<div></div>');
        $body = $(`
            <div>
                <div id="container">
                    <a id="modalLink" href="#" data-toggle="modal" data-target="myModal"></a>
                    <a id="disabledModalLink" class="disabled" href="#" data-toggle="modal" data-target="myModal"></a>
                </div>
                <div id="myModal"></div>
            </div>
        `).appendTo($html);
        $container = $html.find('#container');
        $myModal = $html.find('#myModal');
        $modalTrigger = $html.find('#modalLink');
        $disabledModalLink = $html.find('#disabledModalLink');
        modalFocusService = sinon.createStubInstance(ModalFocusService);
        modalListener = new ModalListener(modalFocusService);
    });

    afterEach(() => {
        $body.empty();
    });

    describe('listen()', () => {
        describe('when the trigger is clicked', () => {
            beforeEach(() => {
                clickEvent = $.Event('click');

                doClick = () => {
                    $modalTrigger.trigger(clickEvent);
                    $container.trigger('shown.bs.modal');
                };

                doClickOnDisabledTrigger = () => {
                    $disabledModalLink.trigger(clickEvent);
                };

                modalListener.listen($container);
            });

            it('should prevent the default behaviour of the click', () => {
                doClick();

                expect(clickEvent.isDefaultPrevented()).to.be.true;
            });

            it('should not prevent propagation of the click', () => {
                doClick();

                expect(clickEvent.isPropagationStopped()).to.be.false;
            });

            it('should trap keyboard focus inside of the modal', () => {
                doClick();

                expect(modalFocusService.trapFocus).to.have.been.calledOnce;
            });

            it('should not trap focus if the trigger is disabled', () => {
                doClickOnDisabledTrigger();

                expect(modalFocusService.trapFocus).to.have.been.notCalled;
            });

            describe('when the modal is closed', () => {
                it('should release keyboard focus', () => {
                    doClick();

                    $container.trigger('hidden.bs.modal');

                    expect(modalFocusService.releaseFocus).to.have.been.calledOnce;
                });
            });
        });
    });
});
