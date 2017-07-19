import DropZoneFileManager from '../../../js/DropZone/DropZoneFileManager';
import DropZoneUtilsManager from '../../../js/DropZone/DropZoneFileUtils';

describe('DropZoneFileManager', () => {
    let fileManager;
    let utilsStub;

    beforeEach(() => {
        utilsStub = sinon.createStubInstance(DropZoneUtilsManager);
        utilsStub.getFileThumbnail.returns('thumbnail');
        utilsStub.getFileName.returns('name');
        utilsStub.getFileSize.returns('size');
        utilsStub.getFileType.returns('type');

        fileManager = new DropZoneFileManager(utilsStub);
    });

    describe('createFileObject()', () => {
        it('should return a standard file object', () => {
            const file = { file: {}, name: 'foo', type: 'foo', size: 'foo' };

            expect(fileManager.createFileObject(file, 0, { meta: true })).to.deep.equal({
                raw: file,
                id: 0,
                meta: { meta: true },
                thumbnail: 'thumbnail',
                name: 'name',
                size: 'size',
                type: 'type'
            });
        });

        it('should return a mock file object', () => {
            const file = { file: {}, mock: true, name: 'foo', type: 'foo', size: 'foo' };

            expect(fileManager.createFileObject(file, 0, { meta: true })).to.deep.equal({
                raw: file,
                id: 0,
                meta: { meta: true },
                thumbnail: null,
                name: 'foo',
                size: null,
                type: null
            });
        });
    });
});
