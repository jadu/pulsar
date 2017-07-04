import DropZoneComponentValidationManager from '../../../js/DropZone/DropZoneComponentValidationManager';

describe('DropZoneComponentValidationManager', () => {
    let $html;
    let $dropZone;
    let $validation;
    let $info;
    let componentValidation;

    beforeEach(() => {
        $html = $('<div></div>');
        $dropZone = $('<div class="dropzone"></div>').appendTo($html);
        $info = $('<div class="info"></div>').appendTo($dropZone);
        $validation = $('<div class="validation"></div>').appendTo($dropZone);
        componentValidation = new DropZoneComponentValidationManager();
    });

    afterEach(() => {
        $html.html('');
    });

    describe('clearValidation()', () => {
        it('should clear the validation node', () => {
            componentValidation.clear($html[0], 'validation');
            expect($html.find('.validation').length).to.equal(0);
        });
    });

    describe('update()', () => {
        it('should do nothing if we are in passive mode', () => {
            const expected = $dropZone.html();

            componentValidation.update('', $dropZone[0], $info[0], 'validation', 'error', true);
            expect($dropZone.html()).to.equal(expected);
        });

        it('should create a validation node if one does not exist', () => {
            $dropZone.find('.validation').remove();
            componentValidation.update('foo', $dropZone[0], $info[0], 'validation', 'error', false);
            expect($dropZone.find('.error').length).to.equal(1);
            expect($dropZone.find('.error').html()).to.equal('foo');
        });

        it('should update an existing error node', () => {
            componentValidation.update('foo', $dropZone[0], $info[0], 'validation', 'error', false);
            expect($dropZone.find('.error').length).to.equal(1);
            expect($dropZone.find('.error').html()).to.equal('foo');
        });
    });
});
