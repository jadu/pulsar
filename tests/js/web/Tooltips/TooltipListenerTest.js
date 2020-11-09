import $ from 'jquery';
import TooltipListener from '../../../../js/Tooltips/TooltipListener'

describe('TooltipListener', () => {
    let $html;
    let $body;
    let tooltipListener;
    let $button;
    let tippyStub;
    let hideAllStub;
    let keyDownEvent = $.Event('keydown');

    beforeEach(() => {
        $html = $('<div></div>');
        $body = $('<div></div>').appendTo($html);
        $button = $('<button id="button-1" data-tippy-content="Tooltip content">Button</button>').appendTo($body);

        tippyStub = sinon.stub();
        hideAllStub = sinon.stub();

        tooltipListener = new TooltipListener($html, tippyStub, hideAllStub);
    });

    afterEach(() => {
        $body.empty();
    });

    describe('init()', () => {
        beforeEach(() => {
            tooltipListener.init();
        });

        it('should initialise tippy', () => {
            expect(tippyStub).to.have.been.called;
        });

        it('should call tippy on an elements with data-tippy-content using the listener config', () => {
            expect(tippyStub).to.have.been.calledWith('[data-tippy-content]', tooltipListener.tippyConfig);
        });

        describe('When the ESC key is pressed', () => {
            beforeEach(() => {
                keyDownEvent.keyCode = 27;
                $html.trigger(keyDownEvent);
            });

            it('should close all open tooltips', () => {
                expect(hideAllStub).to.have.been.called;
            });
        });
    });

    describe('listen()', () => {
        it('should create a new tippy, if element was not already a tippy instance', () => {
            tippyStub.returns([]);
            tooltipListener.init();

            tippyStub.returns('tippy');
            tooltipListener.listen($html);

            expect(tooltipListener.tippys[0]).to.equal('tippy');

            expect(tippyStub).to.have.been.calledWith('[data-tippy-content]', tooltipListener.tippyConfig);
        });

        it('should not push a new tippy instance, if element is already a tippy instance', () => {
            const existingTippyElement = $button[0];
            const existingTippyElementObject = { reference: existingTippyElement };

            tippyStub.returns([existingTippyElementObject]);
            tooltipListener.init();
            tooltipListener.listen($html);

            expect(tooltipListener.tippys).to.have.length(1);
        });
    });

    describe('getInstance()', () => {
        it('should return the tippy instance for an element, if one exists', () => {
            const existingTippyElement = $button[0];
            const existingTippyElementObject = { reference: existingTippyElement };

            tippyStub.returns([existingTippyElementObject]);
            tooltipListener.init();

            expect(tooltipListener.getInstance($button[0])).to.equal(existingTippyElementObject)
        });

        it('should return null, if no tippy instance for an element exists', () => {
            const existingTippyElement = $button[0];
            const existingTippyElementObject = { reference: existingTippyElement };

            tippyStub.returns([existingTippyElementObject]);
            tooltipListener.init();

            expect(tooltipListener.getInstance('something')).to.be.null;
        });

    });

    describe('onCreate()', () => {
        it('should remove the added aria-expanded attribute', () => {
            let instance = {'reference': $body.find('#button-1')[0]};
            $body.find('#button-1').attr('aria-expanded', 'false');

            tooltipListener.onCreate(instance);

            expect($body.find('#button-1[aria-expanded="false"]')).to.have.length(0);
        });
    });

    describe('onMount()', () => {
        it('should add the aria-describedby attribute to the element', () => {
            let instance = {
                'id': 1,
                'reference': $body.find('#button-1')[0]
            };

            tooltipListener.onMount(instance);

            expect($body.find('#button-1[aria-describedby="tippy-1"]')).to.have.length(1);
        });

        it('should add the aria-describedby attribute to the element and keep existing describedby values', () => {
            let instance = {
                'id': 1,
                'reference': $body.find('#button-1')[0]
            };

            $body.find('#button-1').attr('aria-describedby', 'example');
            tooltipListener.onMount(instance);

            expect($body.find('#button-1[aria-describedby="tippy-1 example"]')).to.have.length(1);
        });

        it('should remove the added aria-expanded attribute', () => {
            let instance = {
                'id': 1,
                'reference': $body.find('#button-1')[0]
            };

            $body.find('#button-1').attr('aria-expanded', 'false');
            tooltipListener.onMount(instance);

            expect($body.find('#button-1[aria-expanded="false"]')).to.have.length(0);
        });
    });

    describe('onHide()', () => {
        it('should remove the aria-describedby attribute from the element if no other describedby values exist', () => {
            let instance = {
                'id': 1,
                'reference': $body.find('#button-1')[0]
            };

            $body.find('#button-1').attr('aria-describedby', 'tippy-1');
            tooltipListener.onHide(instance);

            expect($body.find('#button-1[aria-describedby="tippy-1"]')).to.have.length(0);
        });

        it('should remove the aria-describedby reference from the element and keep other values', () => {
            let instance = {
                'id': 1,
                'reference': $body.find('#button-1')[0]
            };

            $body.find('#button-1').attr('aria-describedby', 'tippy-1 example');
            tooltipListener.onHide(instance);

            expect($body.find('#button-1[aria-describedby="tippy-1"]')).to.have.length(0);
        });
    });

    describe('onHidden()', () => {
        it('should remove the added aria-expanded attribute', () => {
            let instance = {'reference': $body.find('#button-1')[0]};

            $body.find('#button-1').attr('aria-expanded', 'false');
            tooltipListener.onHidden(instance);

            expect($body.find('#button-1[aria-expanded="false"]')).to.have.length(0);
        });
    });
});
