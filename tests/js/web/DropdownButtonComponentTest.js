import $ from 'jquery';
import DropdownButtonComponent from '../../../js/DropdownButtonComponent'

describe('DropdownButtonComponent', () => {
    let clickEvent;
    let escKeyDownEvent;
    let downArrowKeyDownEvent;
    let downArrowKeyDownEvent2;
    let downArrowKeyDownEvent3;
    let downArrowKeyDownEvent4;
    let upArrowKeyDownEvent;
    let tabKeyDownevent;
    let $html;
    let $body;
    let $dropdownButtonBtnGroup;
    let $dropupButtonBtnGroup;
    let dropdownButtonComponent;
    let dropdownButtonComponentWithoutHTML;
    let hiddenBsDropdownEventSpy;
    let clock;

    beforeEach(() => {
        $html = $('html');
        $body = $('<div></div>').appendTo($('body'));

        $dropdownButtonBtnGroup = $(`
            <div class="btn__group dropdown">
                <button aria-haspopup="true" aria-expanded="false" aria-controls="guid-1" data-toggle="dropdown" class="btn dropdown__toggle">Drop Down&nbsp;<span class="caret"></span></button>
                <ul id="guid-1" class="dropdown__menu pull-left">
                    <li>
                        <a href="#" id="dropdownButtonItem1" aria-disabled="true" class="is-disabled">One</a>
                    </li>
                    <li>
                        <a href="#" id="dropdownButtonItem2" class="disabled">Two</a>
                    </li>
                    <li>
                        <button type="button" id="dropdownButtonItem3" disabled="disabled">Three</button>
                    </li>
                    <li>
                        <a href="#" id="dropdownButtonItem4">Four</a>
                    </li>
                    <li>
                        <a href="#" id="dropdownButtonItem5">Five</a>
                    </li>
                    <li>
                        <a href="#" id="dropdownButtonItem6">Six</a>
                    </li>
                </ul>
            </div>
        `).appendTo($body);

        $dropupButtonBtnGroup = $(`
            <div class="btn__group dropup">
                <button aria-haspopup="true" aria-expanded="false" aria-controls="guid-2" data-toggle="dropdown" class="btn dropdown__toggle">Drop Down&nbsp;<span class="caret"></span></button>
                <ul id="guid-2" class="dropdown__menu pull-left">
                    <li>
                        <a href="#" id="dropupButtonItem1">One</a>
                    </li>
                    <li>
                        <a href="#" id="dropupButtonItem2">Two</a>
                    </li>
                    <li>
                        <a href="#" id="dropupButtonItem3">Three</a>
                    </li>
                    <li>
                        <button type="button" id="dropupButtonItem4" disabled="disabled">Four</button>
                    </li>
                    <li>
                        <a href="#" id="dropupButtonItem5" class="disabled">Five</a>
                    </li>
                    <li>
                        <a href="#" id="dropupButtonItem6" aria-disabled="true" class="is-disabled">Six</a>
                    </li>
                </ul>
            </div>
        `).appendTo($body);

        clickEvent = $.Event('click');
        escKeyDownEvent = $.Event('keydown');
        downArrowKeyDownEvent = $.Event('keydown');
        downArrowKeyDownEvent2 = $.Event('keydown');
        downArrowKeyDownEvent3 = $.Event('keydown');
        downArrowKeyDownEvent4 = $.Event('keydown');
        upArrowKeyDownEvent = $.Event('keydown');
        tabKeyDownevent = $.Event('keydown');
        hiddenBsDropdownEventSpy = sinon.spy();
        $dropdownButtonBtnGroup.on('hidden.bs.dropdown', hiddenBsDropdownEventSpy);
        $dropupButtonBtnGroup.on('hidden.bs.dropdown', hiddenBsDropdownEventSpy);
        clock = sinon.useFakeTimers();

        dropdownButtonComponent = new DropdownButtonComponent($html);
        dropdownButtonComponent.init();
    });

    afterEach(() => {
        $body.remove();
        $html.off();
        $html.find('[data-toggle="dropdown"]').off();
        $html.find('.dropdown__menu').off();
        $dropdownButtonBtnGroup.off();
        clock.restore();
    });

    describe('init()', () => {
        it('should throw an error if $html isn’t passed to the component', () => {
            dropdownButtonComponentWithoutHTML = new DropdownButtonComponent(undefined);

            expect(() => {
                dropdownButtonComponentWithoutHTML.init($html);
            }).to.throw('$html must be passed to DropdownButtonComponent');
        });

        describe('When a closed dropdown is clicked', () => {
            it('should add the `open` class to the parent `.btn__group`', () => {
                $dropdownButtonBtnGroup.find('[data-toggle="dropdown"]').trigger(clickEvent);

                expect($dropdownButtonBtnGroup.hasClass('open')).to.be.true;
            });

            it('should change `aria-expanded` to `true`', () => {
                $dropdownButtonBtnGroup.find('[data-toggle="dropdown"]').trigger(clickEvent);

                expect($dropdownButtonBtnGroup.find('[data-toggle="dropdown"]').attr('aria-expanded')).to.equal('true');
            });

            it('should remove the `open` class from currently open dropdowns', () => {
                $dropupButtonBtnGroup.find('[data-toggle="dropdown"]').trigger(clickEvent);
                $dropdownButtonBtnGroup.find('[data-toggle="dropdown"]').trigger(clickEvent);

                expect($dropupButtonBtnGroup.find('[data-toggle="dropdown"]').hasClass('open')).to.be.false;
                expect($dropupButtonBtnGroup.find('[data-toggle="dropdown"]').attr('aria-expanded')).to.equal('false');
            });

            it('should change `aria-expanded` to false on currently open dropdowns', () => {
                $dropupButtonBtnGroup.find('[data-toggle="dropdown"]').trigger(clickEvent);
                $dropdownButtonBtnGroup.find('[data-toggle="dropdown"]').trigger(clickEvent);

                expect($dropupButtonBtnGroup.find('[data-toggle="dropdown"]').attr('aria-expanded')).to.equal('false');
            });
        });

        describe('When a disabled dropdown is clicked', () => {
            it('should not add the `open` class to the parent `.btn__group` when the button has `disabled="disabled"', () => {
                $dropdownButtonBtnGroup.find('[data-toggle="dropdown"]')
                    .attr('disabled', 'disabled')
                    .trigger(clickEvent);

                expect($dropdownButtonBtnGroup.hasClass('open')).to.be.false;
            });

            it('should not add the `open` class to the parent `.btn__group` when the button has `.disabled', () => {
                $dropdownButtonBtnGroup.find('[data-toggle="dropdown"]')
                    .addClass('disabled')
                    .trigger(clickEvent);

                expect($dropdownButtonBtnGroup.hasClass('open')).to.be.false;
            });

            it('should not add the `open` class to the parent `.btn__group` when the button has `.is-disabled', () => {
                $dropdownButtonBtnGroup.find('[data-toggle="dropdown"]')
                    .addClass('is-disabled')
                    .trigger(clickEvent);

                expect($dropdownButtonBtnGroup.hasClass('open')).to.be.false;
            });

            it('should not change `aria-expanded` to `true` when the button has `disabled="disabled"', () => {
                $dropdownButtonBtnGroup.find('[data-toggle="dropdown"]')
                    .attr('disabled', 'disabled')
                    .trigger(clickEvent);

                expect($dropdownButtonBtnGroup.find('[data-toggle="dropdown"]').attr('aria-expanded')).to.equal('false');
            });

            it('should not change `aria-expanded` to `true` when the button has `.disabled', () => {
                $dropdownButtonBtnGroup.find('[data-toggle="dropdown"]')
                    .addClass('disabled')
                    .trigger(clickEvent);

                expect($dropdownButtonBtnGroup.find('[data-toggle="dropdown"]').attr('aria-expanded')).to.equal('false');
            });

            it('should not change `aria-expanded` to `true` when the button has `.is-disabled', () => {
                $dropdownButtonBtnGroup.find('[data-toggle="dropdown"]')
                    .addClass('is-disabled')
                    .trigger(clickEvent);

                expect($dropdownButtonBtnGroup.find('[data-toggle="dropdown"]').attr('aria-expanded')).to.equal('false');
            });
        });

        describe('When a dropdown is closed', () => {
            beforeEach(() => {
                $dropdownButtonBtnGroup.find('[data-toggle="dropdown"]')
                    .trigger(clickEvent)
                    .trigger(clickEvent);
            });

            it('should remove the `open` class', () => {
                expect($dropdownButtonBtnGroup.hasClass('open')).to.be.false;
            });

            it('should change `aria-expanded` to false', () => {
                expect($dropdownButtonBtnGroup.find('[data-toggle="dropdown"]').attr('aria-expanded')).to.equal('false');
            });

            it('should trigger the `hidden.bs.dropdown` event', () => {
                expect(hiddenBsDropdownEventSpy).to.to.have.been.calledOnce;
            });
        });

        describe('When a dropdown is open and the body is clicked', () => {
            beforeEach(() => {
                $dropdownButtonBtnGroup.find('[data-toggle="dropdown"]').trigger(clickEvent);
                $body.trigger(clickEvent);
            });

            it('should remove the `open` class', () => {
                expect($dropdownButtonBtnGroup.hasClass('open')).to.be.false;
            });

            it('should change `aria-expanded` to false', () => {
                expect($dropdownButtonBtnGroup.find('[data-toggle="dropdown"]').attr('aria-expanded')).to.equal('false');
            });

            it('should trigger the `hidden.bs.dropdown` event', () => {
                expect(hiddenBsDropdownEventSpy).to.to.have.been.calledOnce;
            });
        });

        describe('When a dropdown is open and the ESC key is pressed', () => {
            beforeEach(() => {
                $dropdownButtonBtnGroup.find('[data-toggle="dropdown"]').trigger(clickEvent);
                escKeyDownEvent.keyCode = 27;
                $body.trigger(escKeyDownEvent);
            });

            it('should remove the `open` class', () => {
                expect($dropdownButtonBtnGroup.hasClass('open')).to.be.false;
            });

            it('should change `aria-expanded` to false', () => {
                expect($dropdownButtonBtnGroup.find('[data-toggle="dropdown"]').attr('aria-expanded')).to.equal('false');
            });

            it('should trigger the `hidden.bs.dropdown` event', () => {
                expect(hiddenBsDropdownEventSpy).to.to.have.been.calledOnce;
            });
        });

        describe('When a dropdown button is focused and the down arrow key is pressed', () => {
            beforeEach(() => {
                $dropdownButtonBtnGroup.find('[data-toggle="dropdown"]').focus();
                downArrowKeyDownEvent.keyCode = 40;
                $dropdownButtonBtnGroup.find('[data-toggle="dropdown"]').trigger(downArrowKeyDownEvent);
            });

            it('should open the drop down menu', () => {
                expect($dropdownButtonBtnGroup.hasClass('open')).to.be.true;
            });

            it('should change `aria-expanded` to true', () => {
                expect($dropdownButtonBtnGroup.find('[data-toggle="dropdown"]').attr('aria-expanded')).to.equal('true');
            });

            it('should move focus to the first focusable element in the drop down menu', () => {
                expect($dropdownButtonBtnGroup.find('#dropdownButtonItem4').is(':focus')).to.be.true;
            });
        });

        describe('When a dropup button is focused and the up arrow key is pressed', () => {
            beforeEach(() => {
                $dropupButtonBtnGroup.find('[data-toggle="dropdown"]').focus();
                upArrowKeyDownEvent.keyCode = 38;
                $dropupButtonBtnGroup.find('[data-toggle="dropdown"]').trigger(upArrowKeyDownEvent);
            });

            it('should open the drop down menu', () => {
                expect($dropupButtonBtnGroup.hasClass('open')).to.be.true;
            });

            it('should move focus to the first focusable element in the drop down menu', () => {
                expect($dropupButtonBtnGroup.find('#dropupButtonItem3').is(':focus')).to.be.true;
            });
        });

        describe('When a dropdown is open and the first focusable element is focused', () => {
            beforeEach(() => {
                downArrowKeyDownEvent.keyCode = 40;
                downArrowKeyDownEvent2.keyCode = 40;
                downArrowKeyDownEvent3.keyCode = 40;
                downArrowKeyDownEvent4.keyCode = 40;
            });

            it('should focus the next focusable element when the down arrow is pressed', () => {
                $dropdownButtonBtnGroup.find('[data-toggle="dropdown"]').trigger(downArrowKeyDownEvent);
                $dropdownButtonBtnGroup.find('.dropdown__menu').trigger(downArrowKeyDownEvent2);

                expect($dropdownButtonBtnGroup.find('#dropdownButtonItem5').is(':focus')).to.be.true;
            });

            it('should focus the next focusable element when the down arrow is pressed again', () => {
                $dropdownButtonBtnGroup.find('[data-toggle="dropdown"]').trigger(downArrowKeyDownEvent);
                $dropdownButtonBtnGroup.find('.dropdown__menu')
                    .trigger(downArrowKeyDownEvent2)
                    .trigger(downArrowKeyDownEvent3);

                expect($dropdownButtonBtnGroup.find('#dropdownButtonItem6').is(':focus')).to.be.true;
            });

            it('should keep the focus on the last time when the down arrow is pressed again', () => {
                $dropdownButtonBtnGroup.find('[data-toggle="dropdown"]').trigger(downArrowKeyDownEvent);
                $dropdownButtonBtnGroup.find('.dropdown__menu')
                    .trigger(downArrowKeyDownEvent2)
                    .trigger(downArrowKeyDownEvent3)
                    .trigger(downArrowKeyDownEvent4);

                expect($dropdownButtonBtnGroup.find('#dropdownButtonItem6').is(':focus')).to.be.true;
            });
        });

        describe('When a dropdown is open and the last focusable element is focused', () => {
            beforeEach(() => {
                upArrowKeyDownEvent.keyCode = 38;
                $dropdownButtonBtnGroup.find('[data-toggle="dropdown"]').trigger(clickEvent);
                $dropdownButtonBtnGroup.find('#dropdownButtonItem6').focus();

            });

            it('should focus the next focusable element when the up arrow is pressed', () => {
                $dropdownButtonBtnGroup.find('.dropdown__menu').trigger(upArrowKeyDownEvent);

                expect($dropdownButtonBtnGroup.find('#dropdownButtonItem5').is(':focus')).to.be.true;;
            });
        });

        describe('When a dropdown is open and focus moves outside the btn__group ', () => {
            beforeEach(() => {
                tabKeyDownevent.keyCode = 9;
                $dropdownButtonBtnGroup.find('[data-toggle="dropdown"]').trigger(clickEvent);
                $dropdownButtonBtnGroup.find('#dropdownButtonItem6').focus();
                $dropupButtonBtnGroup.find('[data-toggle="dropdown"]').focus();
            });

            it('should close the open dropdown and remove the `open` class from the dropdown', (done) => {
                clock.tick(1);
                expect($dropdownButtonBtnGroup.hasClass('open')).to.be.false;
                done();
            })

            it('should close the open dropdown and change `aria-expanded` to false', (done) => {
                clock.tick(1);
                expect($dropdownButtonBtnGroup.find('[data-toggle="dropdown"]').attr('aria-expanded')).to.equal('false');
                done();
            })

            it('should trigger the `hidden.bs.dropdown` event', (done) => {
                clock.tick(1);
                expect(hiddenBsDropdownEventSpy).to.to.have.been.calledOnce;
                done();
            });
        });
    });
});
