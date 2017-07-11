import DropZoneErrors from '../../../js/DropZone/DropZoneErrors';

describe('DropZoneErrors', () => {
    const config = {
        whitelist: 'whitelist',
        maxFiles: 'maxFiles',
        maxSize: 'maxSize',
        unknown: 'unknown',
        empty: 'empty'
    };
    let dropZoneErrors;

    beforeEach(() => {
        dropZoneErrors = new DropZoneErrors(config);
    });

    describe('getValidationError', () => {
        it('should return a whitelist error', () => {
            expect(dropZoneErrors.getFileValidationError('WHITELIST')).to.deep.equal({
                valid: false,
                code: 'WHITELIST',
                text: config.whitelist
            });
        });

        it('should return a max files error', () => {
            expect(dropZoneErrors.getFileValidationError('MAX_FILES')).to.deep.equal({
                valid: false,
                code: 'MAX_FILES',
                text: config.maxFiles
            });
        });

        it('should return a max size error', () => {
            expect(dropZoneErrors.getFileValidationError('MAX_SIZE')).to.deep.equal({
                valid: false,
                code: 'MAX_SIZE',
                text: config.maxSize
            });
        });

        it('should return an unknown error', () => {
            expect(dropZoneErrors.getFileValidationError('UNKNOWN')).to.deep.equal({
                valid: false,
                code: 'UNKNOWN',
                text: config.unknown
            });
        });

        it('should return an empty error', () => {
            expect(dropZoneErrors.getFileValidationError('EMPTY')).to.deep.equal({
                valid: false,
                code: 'EMPTY',
                text: config.empty
            });
        });
    });
});
