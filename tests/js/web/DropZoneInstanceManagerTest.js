import DropZoneInstanceManager from '../../../js/DropZone/DropZoneInstanceManager';
import DropZoneFactory from '../../../js/DropZone/DropZoneFactory';

describe('DropZoneInstanceManager', () => {
    let $html;
    let $dropZone;
    let $input;
    let $browse;
    let instanceManager;

    sinon.stub(DropZoneFactory, 'create', () => 'DropZone');

    beforeEach(() => {
        $html = $(document.documentElement);
        $dropZone = $('<div class="dropzone"></div>').appendTo($html);
        $input = $('<input type="text" id="input">').appendTo($html);
        $browse = $('<p class="browse"></p>').appendTo($dropZone);

        instanceManager = new DropZoneInstanceManager(
            document.documentElement,
            DropZoneFactory
        );
    });

    describe('addInstance()', () => {
        const options = { inputNodeId: 'input' };

        it('should add an instance object to memory', () => {
            instanceManager.addInstance($dropZone[0], options, 'browse');
            expect(instanceManager.instances[0]).to.deep.equal({
                options,
                id: 0,
                browse: $browse[0],
                input: $input[0],
                dropZone: 'DropZone'
            });
        });

        it('should add the DropZoneInstance ID as an attribute on the node', () => {
            instanceManager.addInstance($dropZone[0], options, 'browse');
            expect($dropZone.attr('data-dropzone-id')).to.equal('0');
        });
    });

    describe('getInstance()', () => {
        const mockInstances = [{ id: 0 }, { id: 1 }];

        it('should return all instances if no id is supplied', () => {
            instanceManager.instances = mockInstances;
            expect(instanceManager.getInstance()).to.deep.equal(mockInstances);
        });

        it('should return an instance from an id', () => {
            instanceManager.instances = mockInstances;
            expect(instanceManager.getInstance(1)).to.deep.equal(mockInstances[1]);
        });
    });

    describe('addFiles()', () => {
        const mockInstance = {
            id: 0,
            dropZone: {
                addFiles: sinon.spy()
            }
        };

        it('should invoke the addFiles method on an instance', () => {
            const id = 0;
            const files = ['file'];
            const meta = { data: 'foo' };

            instanceManager.instances.push(mockInstance);
            instanceManager.addFiles(files, id, meta);
            expect(mockInstance.dropZone.addFiles).to.have.been.calledOnce;
            expect(mockInstance.dropZone.addFiles.calledWith(files, meta)).to.be.true;
        });
    });
});
