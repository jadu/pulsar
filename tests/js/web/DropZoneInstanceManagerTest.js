import DropZoneInstanceManager from '../../../js/DropZone/DropZoneInstanceManager';
import DropZoneFactory from '../../../js/DropZone/DropZoneFactory';
import DropZoneOptionsManager from '../../../js/DropZone/DropZoneOptionsManager';

describe('DropZoneInstanceManager', () => {
    let $html;
    let $dropZone;
    let $input;
    let $browse;
    let $info;
    let instanceManager;
    let optionsManagerStub;
    let stubOptions = {
        inputNodeId: 'input',
        nodeClasses: {
            browse: 'browse',
            info: 'info'
        }
    };

    beforeEach(() => {
        $html = $(document.documentElement);
        $dropZone = $('<div class="dropzone"></div>').appendTo($html);
        $input = $('<input type="text" id="input">').appendTo($html);
        $browse = $('<p class="browse"></p>').appendTo($dropZone);
        $info = $('<p class="info"></p>').appendTo($dropZone);

        sinon.stub(DropZoneFactory, 'create', () => 'DropZone');
        optionsManagerStub = sinon.createStubInstance(DropZoneOptionsManager);
        optionsManagerStub.buildInstanceOptions.returns(stubOptions);

        instanceManager = new DropZoneInstanceManager(
            document.documentElement,
            DropZoneFactory
        );
    });

    afterEach(() => {
        DropZoneFactory.create.restore();
    });

    describe('addInstance()', () => {
        it('should add an instance object to memory', () => {
            instanceManager.addInstance($dropZone[0], optionsManagerStub);
            expect(instanceManager.instances[0]).to.deep.equal({
                node: $dropZone[0],
                options: stubOptions,
                id: 0,
                browse: $browse[0],
                input: $input[0],
                info: $info[0],
                dropZone: 'DropZone'
            });
        });

        it('should add the DropZoneInstance ID as an attribute on the node', () => {
            instanceManager.addInstance($dropZone[0], optionsManagerStub);
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

    describe('removeFiles()', () => {
        const mockInstance = {
            id: 0,
            dropZone: {
                removeFile: sinon.spy()
            }
        };

        it('should call remove file on DropZone instance', () => {
            instanceManager.instances.push(mockInstance);
            instanceManager.removeFile(0, 0);
            expect(mockInstance.dropZone.removeFile).to.have.been.calledOnce;
            expect(mockInstance.dropZone.removeFile.calledWith(0)).to.be.true;
        });
    });

    describe('getFiles()', () => {
        const mockInstance = {
            id: 0,
            dropZone: {
                getFiles: sinon.spy()
            }
        };

        it('should return files from an instance', () => {
            instanceManager.instances.push(mockInstance);
            instanceManager.getFiles(0);
            expect(mockInstance.dropZone.getFiles).to.have.been.calledOnce;
        });
    });
});
