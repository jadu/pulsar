import DropZoneValidationUtils from '../../../js/DropZone/DropZoneValidationUtils';

describe('DropZoneValidationUtils', () => {
    let utils;

    beforeEach(() => {
        utils = new DropZoneValidationUtils();
    });

    describe('validateType()', () => {
        it('should return true if we do not have a whitelist', () => {
            expect(utils.validateType('foo', [])).to.be.true;
        });

        it('should return true for a file in the whitelist', () => {
            expect(utils.validateType('image/png', ['image/png'])).to.be.true;
        });

        it('should return false for a valid not in the whitelist', () => {
            expect(utils.validateType('image/png', ['image/jpeg'])).to.be.false;
        });

        it('should handle a simplified mime', () => {
            expect(utils.validateType('image/png', ['png'])).to.be.true;
        });

        it('should handle a wildcard suffix', () => {
            expect(utils.validateType('image/png', ['image/*'])).to.be.true;
        });

        it('should return valid files in a whitelist that has valid and invalid files', () => {
            expect(utils.validateType('image/png', ['image/*', 'foo/bar'])).to.be.true;
        });
    });

    describe('validateCount()', () => {
        it('should return true if the current file count is less than or equal to the max files', () => {
            expect(utils.validateCount(0, 1)).to.be.true;
        });

        it('should return false if the current file count is greater than the max files', () => {
            expect(utils.validateCount(2, 1)).to.be.false;
        });
    });

    describe('validateSize()', () => {
        it('should return true if the current file count is less than or equal to the max files', () => {
            expect(utils.validateSize(0, 1)).to.be.true;
        });

        it('should return false if the current file count is greater than the max files', () => {
            expect(utils.validateSize(2, 1)).to.be.false;
        });
    });
});
