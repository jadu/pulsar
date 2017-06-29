import DropZoneErrors from '../../../../js/DropZone/DropZoneErrors'

describe('DropZoneErrors', () => {
    let dropZoneErrors;

    beforeEach(() => {
        dropZoneErrors = new DropZoneErrors();
    });

    describe('getValidationError', () => {
        it('should return a whitelist error', () => {
            expect(dropZoneErrors.getFileValidationError('WHITELIST')).to.deep.equal({
                valid: false,
                code: 'WHITELIST',
                text: 'Unsupported file type'
            });
        });

        it('should return a max files error', () => {
            expect(dropZoneErrors.getFileValidationError('MAX_FILES')).to.deep.equal({
                valid: false,
                code: 'MAX_FILES',
                text: 'Maximum number files exceeded'
            });
        });

        it('should return a max size error', () => {
            expect(dropZoneErrors.getFileValidationError('MAX_SIZE')).to.deep.equal({
                valid: false,
                code: 'MAX_SIZE',
                text: 'Maximum file size exceeded'
            });
        });

        it('should return an unknown error', () => {
            expect(dropZoneErrors.getFileValidationError('UNKNOWN')).to.deep.equal({
                valid: false,
                code: 'UNKNOWN',
                text: 'That file type is not recognized'
            });
        });
    });
});
