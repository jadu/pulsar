import DropZoneComponentFileManeger from '../../../js/DropZone/DropZoneComponentFileManager';
import DropZone from '../../../js/DropZone/DropZone';

describe('DropZoneComponentFileManager', () => {
    let dropZoneComponentFileManager;
    let dropZoneStub;

    beforeEach(() => {
        dropZoneStub = sinon.createStubInstance(DropZone);
        dropZoneComponentFileManager = new DropZoneComponentFileManeger();
    });

    describe('addInstance()', () => {
        it('should addInstance an instance to memory', () => {
            const id = 5;

            dropZoneStub.getDropZoneId.returns(id);
            dropZoneComponentFileManager.addInstance(dropZoneStub);
            expect(dropZoneComponentFileManager.instances[id]).to.deep.equal(dropZoneStub);
        });
    });

    describe('addFiles()', () => {
        it('should invoke the addFiles method on an instance', () => {
            const id = 5;
            const files = ['file'];
            const meta = { data: 'foo' };

            dropZoneComponentFileManager.instances[id] = dropZoneStub;
            dropZoneComponentFileManager.addFiles(files, id, meta);
            expect(dropZoneStub.addFiles).to.have.been.calledOnce;
            expect(dropZoneStub.addFiles.calledWith(files, meta)).to.be.true;
        });
    });
});
