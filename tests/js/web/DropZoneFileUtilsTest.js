import DropZoneFileUtils from '../../../js/DropZone/DropZoneFileUtils';

describe('DropZoneFileUtils', () => {
    let fileUtils;

    beforeEach(() => {
        fileUtils = new DropZoneFileUtils();
    });

    describe('getFileName()', () => {
        it('should remove any file path from a file name', () => {
            expect(fileUtils.getFileName('C:\\some\\file\\path\\foo.js')).to.equal('foo.js');
            expect(fileUtils.getFileName('/some/file/path/foo.js')).to.equal('foo.js');
        });
    });

    describe('getFileType()', () => {
        it('should format bytes into human readable sizes', () => {
            expect(fileUtils.getFileSize(0)).to.equal('0 Byte');
            expect(fileUtils.getFileSize(1e+3)).to.equal('1 KB');
            expect(fileUtils.getFileSize(1e+6)).to.equal('1 MB');
            expect(fileUtils.getFileSize(1e+9)).to.equal('1 GB');
        });
    });

    describe('getFileType()', () => {
        it('should return the file type', () => {
            expect(fileUtils.getFileType('foo/bar')).to.equal('foo/bar');
        });

        it('should return the default type', () => {
            expect(fileUtils.getFileType('')).to.equal('');
        });
    });

    describe('getFileThumbnail()', () => {
        let objectUrlStub;

        beforeEach(() => {
            objectUrlStub = sinon.stub(window.URL, 'createObjectURL');
        });

        afterEach(() => {
            objectUrlStub.restore();
        });

        it('should return a thumbnail if possible', () => {
            fileUtils.getFileThumbnail({ type: 'image/jpeg' });
            expect(objectUrlStub).to.have.been.calledOnce;
            expect(objectUrlStub.calledWith({ type: 'image/jpeg' })).to.be.true;
        });

        it('should return false if we cannot get a thumbnail', () => {
            expect(fileUtils.getFileThumbnail({ type: 'application/foo' })).to.be.false;
        });
    });
});
