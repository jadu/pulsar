const RepeaterPlaceholderService = require('../../../../js/Repeater/RepeaterPlaceholderService');

describe('RepeaterPlaceholderService', () => {
    let repeaterPlaceholderService;

    beforeEach(() => {
        repeaterPlaceholderService = new RepeaterPlaceholderService();
    });

    describe('add', () => {
        let $html;
        let $placeholder;

        beforeEach(() => {
            $html = $(`
                <div id="html">
                    <div id="preview-root">
                        <div id="preview-actions"></div>
                    </div>
                </div>
            `);
            $placeholder = $('<div id="placeholder"></div>');
        });

        it('should insert the placeholder as the first child element of the preview root', () => {
            repeaterPlaceholderService.add();

            expect($html.find('#preview-root')[0].firstChild.id).to.equal('placeholder');
        });
    });

    describe('remove', () => {
        let $html;

        beforeEach(() => {
            $html = $(`
                <div id="html">
                    <div id="preview-root">
                        <div id="placeholder"></div>
                        <div id="preview-actions"></div>
                    </div>
                </div>
            `);
            queryServiceStub.get.withArgs('preview-placeholder').returns($html.find('#placeholder')[0]);
        });

        it('should remove the preview element from the DOM and update the reference with a clone', () => {
            repeaterPlaceholderService.remove();

            expect($html.find('#placeholder')).to.have.length.of(0);
            expect(queryServiceStub.updateRef).to.have.been.calledOnce;
        });
    });
});
