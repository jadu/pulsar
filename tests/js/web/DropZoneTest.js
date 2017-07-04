import DropZone from '../../../js/DropZone/DropZone';
import DropZoneValidatorDispatcher from '../../../js/DropZone/DropZoneValidatorDispatcher';
import DropZoneEventManager from '../../../js/DropZone/DropZoneEventManager';
import DropZoneIdleTimer from '../../../js/DropZone/DropZoneIdleTimer';
import DropZoneFileManager from '../../../js/DropZone/DropZoneFileManager';

describe('DropZone', () => {
    let dropZone;
    let $node;
    let validatorStub;
    let eventStub;
    let timerStub;
    let options;
    let fileManagerStub;

    beforeEach(() => {
        options = {
            supported: true,
            windowDrop: sinon.spy(),
            dropZoneDrop: sinon.spy()
        };

        $node = $('<div></div>');
        validatorStub = sinon.createStubInstance(DropZoneValidatorDispatcher);
        eventStub = sinon.createStubInstance(DropZoneEventManager);
        timerStub = sinon.createStubInstance(DropZoneIdleTimer);
        fileManagerStub = sinon.createStubInstance(DropZoneFileManager);
        dropZone = new DropZone($node, options, validatorStub, eventStub, timerStub, fileManagerStub);
    });

    describe('init()', () => {
        it('should throw an error if a node is not passed in to the constructor', () => {
            dropZone = new DropZone(null, {}, validatorStub, eventStub, timerStub, fileManagerStub);
            expect(dropZone.init).to.throw;
        });

        it('should setup events if enriched features are supported', () => {
            dropZone.init();
            expect(eventStub.add).to.have.callCount(11);
            expect(eventStub.add.calledWith(window, 'drag', eventStub.preventer)).to.be.true;
            expect(eventStub.add.calledWith(window, 'dragstart', eventStub.preventer)).to.be.true;
            expect(eventStub.add.calledWith(window, 'dragend', eventStub.preventer)).to.be.true;
            expect(eventStub.add.calledWith(window, 'dragover', eventStub.preventer)).to.be.true;
            expect(eventStub.add.calledWith(window, 'dragenter', eventStub.preventer)).to.be.true;
            expect(eventStub.add.calledWith(window, 'dragleave', eventStub.preventer)).to.be.true;
            expect(eventStub.add.calledWith(window, 'drop', eventStub.preventer)).to.be.true;
            expect(eventStub.add.calledWith(window, 'dragenter', dropZone.handleWindowEnterWithContext)).to.be.true;
            expect(eventStub.add.calledWith(window, 'dragleave', dropZone.handleWindowLeaveWithContext)).to.be.true;
            expect(eventStub.add.calledWith(window, 'drop', dropZone.handleDropWithContext)).to.be.true;
            expect(eventStub.add.calledWith(document, 'mouseout')).to.be.true;
        });

        it('should not attach any events if enriched features are not supported', () => {
            dropZone = new DropZone($node, { supported: false }, validatorStub, eventStub, timerStub, fileManagerStub);
            dropZone.init();
            expect(eventStub.add).to.have.not.been.called;
        });
    });

    describe('handleDrop()', () => {
        const event = { dataTransfer: { items: [] } };
        let filesStub;
        let callbackStub;

        beforeEach(() => {
            filesStub = sinon.stub(dropZone, 'addFiles');
            callbackStub = sinon.stub(dropZone, 'createCallback');
        });

        afterEach(() => {
            filesStub.restore();
            callbackStub.restore();
        });

        // partial stub
        it('should add files if the window and DropZone are active', () => {
            dropZone.windowActive = true;
            dropZone.dropZoneActive = true;
            dropZone.handleDrop(event);
            expect(filesStub).to.have.been.calledOnce;
            expect(filesStub.calledWith([])).to.be.true;
        });

        // partial stub
        it('should create a window drop callback if the window is active but the DropZone is not', () => {
            dropZone.windowActive = true;
            dropZone.dropZoneActive = false;
            dropZone.handleDrop(event);
            expect(callbackStub).to.have.been.calledOnce;
            expect(callbackStub.calledWith(
                options.windowDrop, { files: dropZone.files, node: dropZone.node }
            )).to.be.true;
        });

        it('should set the window active property to false', () => {
            dropZone.windowActive = true;
            dropZone.handleDrop(event);
            expect(dropZone.windowActive).to.be.false;
        });

        it('should set the DropZone active property to false', () => {
            dropZone.dropZoneActive = true;
            dropZone.handleDrop(event);
            expect(dropZone.dropZoneActive).to.be.false;
        });
    });

    describe('addFiles()', () => {
        let callbackStub

        beforeEach(() => {
            validatorStub.validate.returns({ valid: true, text: '' });
            callbackStub = sinon.stub(dropZone, 'createCallback');
        });

        afterEach(() => {
            callbackStub.restore();
        });

        it('should call the validator', () => {
            dropZone.addFiles([]);
            expect(validatorStub.validate).to.have.been.calledOnce;
        });

        it('should add to the file size count', () => {
            dropZone.addFiles([{ size: 1 }, { size: 1 }]);
            expect(dropZone.size).to.equal(2);
        });

        it('should craete file objects for each file', () => {
            dropZone.addFiles([{}]);
            expect(fileManagerStub.createFileObject).to.have.been.calledOnce;
        });

        it('should concatenate the processed files with the current valid files', () => {
            fileManagerStub.createFileObject.returns({ id: 1 });
            dropZone.files = [{ id: 0 }];
            dropZone.addFiles([{ id: 1 }]);
            expect(dropZone.files).to.deep.equal([{ id: 0 }, { id: 1 }]);
        });

        it('should not add invalid files', () => {
            validatorStub.validate.returns({ valid: false, text: '' });
            fileManagerStub.createFileObject.returns({ id: 1 });
            dropZone.files = [{ id: 0 }];
            dropZone.addFiles([{ id: 1 }]);
            expect(dropZone.files).to.deep.equal([{ id: 0 }]);
        });

        // partial stub
        it('should create the DropZone drop callback', () => {
            fileManagerStub.createFileObject.returns({ id: 1 });
            dropZone.addFiles([{ id: 0 }]);
            expect(dropZone.createCallback).to.have.been.calledOnce;
            expect(dropZone.createCallback.calledWith(
                dropZone.options.dropZoneDrop,
                { files: { id: 1}, node: dropZone.node, valid: true, text: '' }
            ));
        });
    });

    describe('fileOnWindow()', () => {
        it('should return false if x & y are at 0', () => {
            expect(dropZone.fileOnWindow(0, 0)).to.be.false;
        });

        it('should true for coords on the window and an element from point', () => {
            expect(dropZone.fileOnWindow(50, 50)).to.be.true;
        });
    });
});
