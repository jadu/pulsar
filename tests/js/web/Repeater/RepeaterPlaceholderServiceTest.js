const RepeaterPlaceholderService = require('../../../../js/Repeater/RepeaterPlaceholderService');

describe('RepeaterPlaceholderService', () => {
    let repeaterPlaceholderService;
    let $placeholder;
    let $html;

    beforeEach(() => {
        $html = $(`
            <div id="html">
                <div data-repeater-preview-root id="preview-root">
                    <div data-repeater-preview-placeholder></div>
                    <div id="preview-actions"></div>
                </div>
            </div>
        `);
        $placeholder = $html.find('[data-repeater-preview-placeholder]');
        repeaterPlaceholderService = new RepeaterPlaceholderService($html);
    });

    afterEach(() => {
        $html.empty();
    });

    describe('add', () => {
        it('should insert the placeholder as the first child element of the preview root', () => {
            repeaterPlaceholderService.add();

            expect($html.find('[data-repeater-preview-placeholder]')).to.have.length.of(1);
        });
    });

    describe('remove', () => {
        it('should remove the preview element from the DOM and update the reference with a clone', () => {
            repeaterPlaceholderService.remove();

            expect($html.find('[data-repeater-preview-placeholder]')).to.have.length.of(0);
        });
    });
});
