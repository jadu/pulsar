import DropZoneInstanceManager from '../../../js/DropZone/DropZoneInstanceManager';
import DropZoneFactory from '../../../js/DropZone/DropZoneFactory';
import DropZoneOptionsManager from '../../../js/DropZone/DropZoneOptionsManager';
import DropZone from '../../../js/DropZone/DropZone';

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

        dropZoneStub = sinon.createStubInstance(DropZone);
        factoryStub = sinon.stub(DropZoneFactory, 'create');
        factoryStub.returns(dropZoneStub);
        optionsManagerStub = sinon.createStubInstance(DropZoneOptionsManager);
        optionsManagerStub.buildInstanceOptions.returns(stubOptions);
        optionsManagerStub.buildValidatorOptions.returns({});

        instanceManager = new DropZoneInstanceManager(
            document.documentElement,
            DropZoneFactory
        );
    });

    afterEach(() => {
        factoryStub.restore();
        $html.html('');
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

    describe('updateInstance()', () => {
        it('should update a property on an instance', () => {
            instanceManager.instances = [{ id: 0, foo: 'bar' }];
            instanceManager.updateInstance(0, 'foo', 'foo');

            expect(instanceManager.instances[0].foo).to.equal('foo');
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
});
