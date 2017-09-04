import DropZoneValidatorDispatcher from '../../../js/DropZone/DropZoneValidatorDispatcher';
import DropZoneValidationUtils from '../../../js/DropZone/DropZoneValidationUtils';
import DropZoneErrors from '../../../js/DropZone/DropZoneErrors';

describe('DropZoneValidatorDispatcher', () => {
    let dropZoneValidatorDispatcher;
    let validResponse = { valid: true, text: '' };
    let dropZoneErrorStub;
    let dropZoneUtilStub;

    beforeEach(() => {
        const whitelist = ['image/png'];
        const maxFiles = 1;
        const maxSize = 1;

        dropZoneErrorStub = sinon.createStubInstance(DropZoneErrors);
        dropZoneErrorStub.getFileValidationError.returns('error');

        dropZoneUtilStub = sinon.createStubInstance(DropZoneValidationUtils);

        dropZoneValidatorDispatcher = new DropZoneValidatorDispatcher(
            dropZoneUtilStub,
            dropZoneErrorStub,
            whitelist,
            maxFiles,
            maxSize
        );
    });

    describe('validate()', () => {
        it('should return a valid object if we cannot determine the length of the files', () => {
            expect(dropZoneValidatorDispatcher.validate([], 1, 0)).to.deep.equal(validResponse);
        });

        it('should use the file API if it can when getting file objects', () => {
            const fileMock = { getAsFile: sinon.spy() };

            dropZoneValidatorDispatcher.validate([fileMock], 1, 0);
            expect(fileMock.getAsFile).to.have.been.calledOnce;
        });

        describe('empty', () => {
            it('should return an invalid object if the file size is zero', () => {
                expect(dropZoneValidatorDispatcher.validate([{ size: 0 }], 1, 0)).to.equal('error');
                expect(dropZoneErrorStub.getFileValidationError.calledWith('EMPTY')).to.be.true;
            });
        });

        describe('whitelist', () => {
            it('should return an invalid object if the file is not on the whitelist', () => {
                expect(dropZoneValidatorDispatcher.validate([{type: 'foo/bar' }], 1, 0)).to.equal('error');
                expect(dropZoneErrorStub.getFileValidationError).to.have.been.calledOnce;
                expect(dropZoneErrorStub.getFileValidationError).to.have.been.calledWith('WHITELIST');
            });

            it('should return a valid object if the file is on the whitelist', () => {
                dropZoneUtilStub.validateType.returns(true);
                dropZoneUtilStub.validateCount.returns(true);
                dropZoneUtilStub.validateSize.returns(true);
                expect(dropZoneValidatorDispatcher.validate([{ type: 'image/png' }], 1, 1)).to.deep.equal(validResponse);
            });
        });

        describe('max files', () => {
            it('should return an invalid object if we have reached the max files limit', () => {
                dropZoneUtilStub.validateType.returns(true);
                expect(dropZoneValidatorDispatcher.validate([{ type: 'image/png' }], 0, 0)).to.equal('error');
                expect(dropZoneErrorStub.getFileValidationError.calledWith('MAX_FILES')).to.be.true;
            });

            it('should return a valid object if we have not reached the max files limit', () => {
                dropZoneUtilStub.validateType.returns(true);
                dropZoneUtilStub.validateCount.returns(true);
                dropZoneUtilStub.validateSize.returns(true);
                expect(dropZoneValidatorDispatcher.validate([{ type: 'image/png' }], 0, 0)).to.deep.equal(validResponse);
            });
        });

        describe('max size', () => {
            it('should return an invalid object if we have reached the max size limit', () => {
                dropZoneUtilStub.validateType.returns(true);
                dropZoneUtilStub.validateCount.returns(true);
                expect(dropZoneValidatorDispatcher.validate([{ type: 'image/png', size: 10 }], 0, 0)).to.equal('error');
                expect(dropZoneErrorStub.getFileValidationError.calledWith('MAX_SIZE')).to.be.true;
            });

            it('should return an invalid object if we have reached the max size limit', () => {
                dropZoneUtilStub.validateType.returns(true);
                dropZoneUtilStub.validateCount.returns(true);
                dropZoneUtilStub.validateSize.returns(true);
                expect(dropZoneValidatorDispatcher.validate([{ type: 'image/png', size: 10 }], 0, 0)).to.deep.equal(validResponse);
            });
        });

        describe('retry', () => {
            it('should increment the file count if we are not in retry mode', () => {
                dropZoneUtilStub.validateType.returns(true);
                dropZoneValidatorDispatcher.validate([{ type: 'image/png', size: 1 }], 1, 1, false);
                expect(dropZoneUtilStub.validateCount).to.have.been.calledOnce;
                expect(dropZoneUtilStub.validateCount).to.have.been.calledWith(2, 1);
            });

            it('should not increment the file count if we are in retry mode', () => {
                dropZoneUtilStub.validateType.returns(true);
                dropZoneValidatorDispatcher.validate([{ type: 'image/png', size: 1 }], 1, 1, true);
                expect(dropZoneUtilStub.validateCount).to.have.been.calledOnce;
                expect(dropZoneUtilStub.validateCount).to.have.been.calledWith(1, 1);
            });

            it('should increment the file size count if we are not in retry mode', () => {
                dropZoneUtilStub.validateType.returns(true);
                dropZoneUtilStub.validateCount.returns(true);
                dropZoneValidatorDispatcher.validate([{ type: 'image/png', size: 1 }], 1, 1, false);
                expect(dropZoneUtilStub.validateSize).to.have.been.calledOnce;
                expect(dropZoneUtilStub.validateSize).to.have.been.calledWith(2, 1);
            });

            it('should not increment the file size count if we are in retry mode', () => {
                dropZoneUtilStub.validateType.returns(true);
                dropZoneUtilStub.validateCount.returns(true);
                dropZoneValidatorDispatcher.validate([{ type: 'image/png', size: 1 }], 1, 1, true);
                expect(dropZoneUtilStub.validateSize).to.have.been.calledOnce;
                expect(dropZoneUtilStub.validateSize).to.have.been.calledWith(1, 1);
            });
        });
    });
});
