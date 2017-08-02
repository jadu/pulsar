import DropZoneInstanceManager from '../../../js/DropZone/DropZoneInstanceManager';
import DropZoneFactory from '../../../js/DropZone/DropZoneFactory';
import DropZoneOptionsManager from '../../../js/DropZone/DropZoneOptionsManager';
import DropZone from '../../../js/DropZone/DropZone';
import DropZoneBrowseNodeFactory from '../../../js/DropZone/DropZoneBrowseNodeFactory';
import DropZoneBrowseNodeManager from '../../../js/DropZone/DropZoneBrowseNodeManager';

describe('DropZoneInstanceManager', () => {
    let $html;
    let $dropZone;
    let $input;
    let $browse;
    let $info;
    let instanceManager;
    let optionsManagerStub;
    let factoryStub;
    let dropZoneStub;
    let browseNodeStub;
    let browseNodeFactoryStub;
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

        browseNodeStub = sinon.createStubInstance(DropZoneBrowseNodeManager);
        browseNodeFactoryStub = sinon.stub(DropZoneBrowseNodeFactory, 'create');
        browseNodeFactoryStub.returns(browseNodeStub);

        dropZoneStub = sinon.createStubInstance(DropZone);
        factoryStub = sinon.stub(DropZoneFactory, 'create');
        factoryStub.returns(dropZoneStub);

        optionsManagerStub = sinon.createStubInstance(DropZoneOptionsManager);
        optionsManagerStub.buildInstanceOptions.returns(stubOptions);
        optionsManagerStub.buildValidatorOptions.returns({});

        instanceManager = new DropZoneInstanceManager(
            document.documentElement,
            DropZoneFactory,
            DropZoneBrowseNodeFactory
        );
    });

    afterEach(() => {
        factoryStub.restore();
        browseNodeFactoryStub.restore();
        $html.html('');
    });

    describe('addInstance()', () => {
        it('should add an instance object to memory', () => {
            instanceManager.addInstance($dropZone[0], optionsManagerStub);
            expect(instanceManager.instances[0]).to.deep.equal({
                node: $dropZone[0],
                options: stubOptions,
                id: 0,
                browse: browseNodeStub,
                input: $input[0],
                info: $info[0],
                dropZone: dropZoneStub
            });
        });

        it('should add the DropZoneInstance ID as an attribute on the node', () => {
            instanceManager.addInstance($dropZone[0], optionsManagerStub);

            expect($dropZone.attr('data-dropzone-id')).to.equal('0');
        });

        it('should initialise the instance', () => {
            instanceManager.addInstance($dropZone[0], optionsManagerStub);

            expect(dropZoneStub.init).to.have.been.calledOnce;
        });
    });

    describe('getInstance()', () => {
        let mockInstances;

        beforeEach(() => {
            mockInstances = [{ id: 0 }, { id: 1 }];
        });

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
        let mockInstance;

        beforeEach(() => {
            mockInstance = {
                id: 0,
                dropZone: {
                    addFiles: sinon.spy()
                }
            };
        });

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

    describe('updateBrowseNode()', () => {
        beforeEach(() => {
            instanceManager.instances = [
                { id: 88, browse: browseNodeStub }
            ];
        });

        it('should update the browse node and enable events', () => {
            instanceManager.updateBrowseNode(88, 'node');

            expect(browseNodeStub.update).to.have.been.calledOnce;
            expect(browseNodeStub.update).to.have.been.calledWith('node');
            expect(browseNodeStub.enableEvents).to.have.been.calledOnce;
        });
    });

    describe('enableBrowseNode()', () => {
        beforeEach(() => {
            instanceManager.instances = [
                { id: 88, browse: browseNodeStub }
            ];
        });

        it('should enable events on the browse node', () => {
            instanceManager.enableBrowseNode(88);

            expect(browseNodeStub.enableEvents).to.have.been.calledOnce;
        });
    });

    describe('disableBrowseNode()', () => {
        beforeEach(() => {
            instanceManager.instances = [
                { id: 88, browse: browseNodeStub }
            ];
        });

        it('should disable events on the browse node', () => {
            instanceManager.disableBrowseNode(88);

            expect(browseNodeStub.disableEvents).to.have.been.calledOnce;
        });
    });

    describe('removeFiles()', () => {
        let mockInstance;

        beforeEach(() => {
            mockInstance = {
                id: 0,
                dropZone: {
                    removeFile: sinon.spy()
                }
            };
        });

        it('should call remove file on DropZone instance', () => {
            instanceManager.instances.push(mockInstance);
            instanceManager.removeFile(0, 0);

            expect(mockInstance.dropZone.removeFile).to.have.been.calledOnce;
            expect(mockInstance.dropZone.removeFile.calledWith(0)).to.be.true;
        });
    });

    describe('getFiles()', () => {
        let mockInstance;

        beforeEach(() => {
            mockInstance = {
                id: 0,
                dropZone: {
                    getFiles: sinon.spy()
                }
            };
        });

        it('should return files from an instance', () => {
            instanceManager.instances.push(mockInstance);
            instanceManager.getFiles(0);

            expect(mockInstance.dropZone.getFiles).to.have.been.calledOnce;
        });
    });

    describe('getFile()', () => {
        let mockInstance;

        beforeEach(() => {
            mockInstance = {
                id: 0,
                dropZone: {
                    getFile: sinon.spy()
                }
            };
        });

        it('should return a specific file from an instance', () => {
            instanceManager.instances.push(mockInstance);
            instanceManager.getFile(0, 0);

            expect(mockInstance.dropZone.getFile).to.have.been.calledOnce;
            expect(mockInstance.dropZone.getFile).to.have.been.calledWith(0);
        });
    });

    describe('getSupportsDataTransfer()', () => {
        let mockInstance;

        beforeEach(() => {
            mockInstance = {
                id: 0,
                dropZone: {
                    getSupportsDataTransfer: sinon.spy()
                }
            };
        });

        it('should get data support for instance', () => {
            instanceManager.instances.push(mockInstance);
            instanceManager.getSupportsDataTransfer(0);

            expect(mockInstance.dropZone.getSupportsDataTransfer).to.have.been.calledOnce;
        });
    });

    describe('validateFiles()', () => {
        let mockInstance;

        beforeEach(() => {
            mockInstance = {
                id: 0,
                dropZone: {
                    getFiles: () => [{}],
                    getSize: () => 1,
                    validator: {
                        validate: sinon.spy()
                    }
                }
            };
        });

        it('should call the validator on the dropZone instance', () => {
            instanceManager.instances.push(mockInstance);
            instanceManager.validateFiles([], 0);

            expect(mockInstance.dropZone.validator.validate).to.have.been.calledOnce;
        });
    });

    describe('resetInstance', () => {
        let mockInstances;

        beforeEach(() => {
            mockInstances = [
                { id: 0, dropZone: { reset: sinon.spy() } },
                { id: 1, dropZone: { reset: sinon.spy() } }
            ];
        });

        it('should reset all instances', () => {
            instanceManager.instances = mockInstances;
            instanceManager.resetInstance();

            expect(mockInstances[0].dropZone.reset).to.have.been.calledOnce;
            expect(mockInstances[1].dropZone.reset).to.have.been.calledOnce;
        });

        it('should reset a specific instance', () => {
            instanceManager.instances = mockInstances;
            instanceManager.resetInstance(1);

            expect(mockInstances[0].dropZone.reset).to.have.not.been.called;
            expect(mockInstances[1].dropZone.reset).to.have.been.calledOnce;
        });
    });

    describe('enableInstance()', () => {
        let mockInstances;

        beforeEach(() => {
            mockInstances = [
                { id: 0, dropZone: { enable: sinon.spy() } },
                { id: 1, dropZone: { enable: sinon.spy() } }
            ];
        });

        it('should call enable on an instance', () => {
            instanceManager.instances = mockInstances;
            instanceManager.enableInstance(1);

            expect(mockInstances[1].dropZone.enable).to.have.been.calledOnce;
        });
    });

    describe('disable()', () => {
        let mockInstances;

        beforeEach(() => {
            mockInstances = [
                { id: 0, dropZone: { disable: sinon.spy() } },
                { id: 1, dropZone: { disable: sinon.spy() } }
            ];
        });

        it('should call disable on an instance', () => {
            instanceManager.instances = mockInstances;
            instanceManager.disableInstance(1);

            expect(mockInstances[1].dropZone.disable).to.have.been.calledOnce;
        });
    });
});
