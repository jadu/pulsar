import DropZone from '../../../js/DropZone/DropZone';
import DropZoneValidatorDispatcher from '../../../js/DropZone/DropZoneValidatorDispatcher';
import DropZoneEventManager from '../../../js/DropZone/DropZoneEventManager';
import DropZoneIdleTimer from '../../../js/DropZone/DropZoneIdleTimer';
import DropZoneFileManager from '../../../js/DropZone/DropZoneFileManager';
import DropZoneCallbackManager from '../../../js/DropZone/DropZoneCallbackManager';

describe('DropZone', () => {
    let dropZone;
    let $node;
    let validatorStub;
    let eventStub;
    let timerStub;
    let options;
    let fileManagerStub;
    let callbackStub;

    beforeEach(() => {
        options = {
            supported: true,
            windowDrop: sinon.spy(),
            dropZoneDrop: sinon.spy(),
            windowEnter: sinon.spy(),
            windowLeave: sinon.spy(),
            dropZoneEnter: sinon.spy(),
            dropZoneLeave: sinon.spy(),
            fileRemoved: sinon.spy()
        };

        $node = $('<div></div>');
        validatorStub = sinon.createStubInstance(DropZoneValidatorDispatcher);
        eventStub = sinon.createStubInstance(DropZoneEventManager);
        timerStub = sinon.createStubInstance(DropZoneIdleTimer);
        fileManagerStub = sinon.createStubInstance(DropZoneFileManager);
        callbackStub = sinon.createStubInstance(DropZoneCallbackManager);
        dropZone = new DropZone(
            $node,
            options,
            validatorStub,
            eventStub,
            timerStub,
            fileManagerStub,
            callbackStub
        );
    });

    describe('init()', () => {
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

        it('should only prevent drop if enriched features are not supported', () => {
            dropZone = new DropZone(
                $node,
                { supported: false },
                validatorStub,
                eventStub,
                timerStub,
                fileManagerStub,
                callbackStub
            );
            dropZone.init();
            expect(eventStub.add).to.have.been.calledOnce;
            expect(eventStub.add).to.have.been.calledWith(window, 'drop', eventStub.preventer);
        });
    });

    describe('handleDrop()', () => {
        const event = { dataTransfer: { items: [] } };
        let filesStub;

        beforeEach(() => {
            filesStub = sinon.stub(dropZone, 'addFiles');
        });

        afterEach(() => {
            filesStub.restore();
        });

        // partial stub
        it('should add files if the window and DropZone are active', () => {
            dropZone.windowActive = true;
            dropZone.dropZoneActive = true;
            dropZone.handleDrop(event);
            expect(filesStub).to.have.been.calledOnce;
            expect(filesStub.calledWith([])).to.be.true;
        });

        it('should create a window drop callback if the window is active but the DropZone is not', () => {
            dropZone.windowActive = true;
            dropZone.dropZoneActive = false;
            dropZone.handleDrop(event);
            expect(callbackStub.create).to.have.been.calledOnce;
            expect(callbackStub.create.calledWith(
                options.windowDrop,
                dropZone,
                { files: dropZone.files }
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
        beforeEach(() => {
            validatorStub.validate.returns({ valid: true, text: '' });
        });

        it('should call the validator', () => {
            dropZone.addFiles([]);
            expect(validatorStub.validate).to.have.been.calledOnce;
        });

        it('should add to the file size count', () => {
            dropZone.addFiles([{ size: 1 }, { size: 1 }]);
            expect(dropZone.size).to.equal(2);
        });

        it('should create file objects for each file', () => {
            dropZone.addFiles([{}]);
            expect(fileManagerStub.createFileObject).to.have.been.calledOnce;
        });

        it('should create file objects with unique IDs', () => {
            dropZone.addFiles([{}, {}, {}]);
            expect(fileManagerStub.createFileObject).to.have.been.calledThrice;
            expect(fileManagerStub.createFileObject).to.have.been.calledWith({}, 0, {});
            expect(fileManagerStub.createFileObject).to.have.been.calledWith({}, 1, {});
            expect(fileManagerStub.createFileObject).to.have.been.calledWith({}, 2, {});
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

        it('should create the DropZone drop callback', () => {
            fileManagerStub.createFileObject.returns({ id: 1 });
            dropZone.addFiles([{ id: 0 }]);
            expect(callbackStub.create).to.have.been.calledOnce;
            expect(callbackStub.create.calledWith(
                dropZone.options.dropZoneDrop,
                dropZone,
                { files: { id: 1}, valid: true, text: '' }
            ));
        });
    });

    describe('fileOnWindow()', () => {
        it('should return false if x & y are at 0', () => {
            expect(dropZone.fileOnWindow(0, 0)).to.be.false;
        });

        it('should true for coords on the window and an element from point', () => {
            expect(dropZone.fileOnWindow(50, 50)).to.equal(document.documentElement);
        });
    });

    describe('forceWindowLeave()', () => {
        let windowLeaveStub;
        let onWindowStub;

        beforeEach(() => {
            windowLeaveStub = sinon.stub(dropZone, 'handleWindowLeave');
            onWindowStub = sinon.stub(dropZone, 'fileOnWindow');
        });

        afterEach(() => {
            windowLeaveStub.restore();
            onWindowStub.restore();
        });

        // partial stub
        it('should call handleWindowLeave with the force argument', () => {
            const event = {};

            dropZone.windowActive = true;
            dropZone.dropZoneActive = true;
            onWindowStub.returns(null);
            dropZone.forceWindowLeave(event);
            expect(windowLeaveStub).to.have.been.calledOnce;
            expect(windowLeaveStub).to.have.been.calledWith(event, true);
        });
    });

    describe('handleWindowEnter()', () => {
        const event = { dataTransfer: { files: [] } };
        let dropZoneEnterStub;
        let containsStub;
        let onWindowStub;

        beforeEach(() => {
            onWindowStub = sinon.stub(dropZone, 'fileOnWindow');
            containsStub = sinon.stub(dropZone.node, 'contains');
            validatorStub.validate.returns({ valid: true, text: '' });
            dropZoneEnterStub = sinon.stub(dropZone, 'handleDropZoneEnter');
        });

        afterEach(() => {
            onWindowStub.restore();
            containsStub.restore();
            dropZoneEnterStub.restore();
        });

        it('should clear the idle timer', () => {
            dropZone.handleWindowEnter(event);
            expect(timerStub.clear).to.have.been.calledOnce;
        });

        it('set the data transfer flag to false if we cannot get a length', () => {
            dropZone.supportsDataTransfer = true;
            dropZone.handleWindowEnter(event);
            expect(dropZone.supportsDataTransfer).to.equal.false;
        });

        // partial stub
        it('should call handle enter if we are on the dropZone and it is not active', () => {
            containsStub.returns(true);
            dropZone.dropZoneActive = false;
            dropZone.handleWindowEnter(event);
            expect(dropZoneEnterStub).to.have.been.calledOnce;
        });

        it('should call the validator if we are on window and it is not active', () => {
            dropZone.windowActive = false;
            onWindowStub.returns(true);
            dropZone.handleWindowEnter(event);
            expect(validatorStub.validate).to.have.been.calledOnce;
        });

        it('should create a callback for window enter', () => {
            dropZone.windowActive = false;
            onWindowStub.returns(true);
            dropZone.handleWindowEnter(event);
            expect(callbackStub.create).to.have.been.calledOnce;
            expect(callbackStub.create.calledWith(
                dropZone.options.windowEnter,
                dropZone,
                { valid: true, text: '' })
            ).to.be.true;
        });

        it('should set the window active flag to true', () => {
            dropZone.windowActive = false;
            onWindowStub.returns(true);
            dropZone.handleWindowEnter(event);
            expect(dropZone.windowActive).to.be.true;
        });
    });

    describe('handleWindowLeave()', () => {
        const event = { dataTransfer: { files: [] } };
        let dropZoneLeaveStub;
        let onDropZoneStub;
        let onWindowStub;

        beforeEach(() => {
            dropZoneLeaveStub = sinon.stub(dropZone, 'handleDropZoneLeave');
            onDropZoneStub = sinon.stub(dropZone.node, 'contains');
            onWindowStub = sinon.stub(dropZone, 'fileOnWindow');
        });

        afterEach(() => {
            dropZoneLeaveStub.restore();
            onDropZoneStub.restore();
            onWindowStub.restore();
        });

        it('should set window and DropZone to false if the force flag is set', () => {
            onWindowStub.returns(true);
            dropZone.windowActive = true;
            dropZone.dropZoneActive = true;
            dropZone.handleWindowLeave(event, true);
            expect(dropZone.windowActive).to.be.false;
            expect(dropZone.dropZoneActive).to.be.false;
        });

        it('should set window and DropZone to false if the file is not on the window', () => {
            onWindowStub.returns(false);
            dropZone.windowActive = true;
            dropZone.dropZoneActive = true;
            dropZone.handleWindowLeave(event);
            expect(dropZone.windowActive).to.be.false;
            expect(dropZone.dropZoneActive).to.be.false;
        });

        it('should clear timer if force flag is set', () => {
            onWindowStub.returns(true);
            dropZone.handleWindowLeave(event, true);
            expect(timerStub.clear).to.have.been.calledOnce;
        });

        it('should clear timer if file is not on the window', () => {
            onWindowStub.returns(false);
            dropZone.handleWindowLeave(event);
            expect(timerStub.clear).to.have.been.calledOnce;
        });

        it('should create a callback if the force flag is set', () => {
            onWindowStub.returns(true);
            dropZone.handleWindowLeave(event, true);
            expect(callbackStub.create).to.have.been.calledOnce;
            expect(callbackStub.create.calledWith(dropZone.options.windowLeave)).to.be.true;
        });

        it('should create a callback if the file is not on the window', () => {
            onWindowStub.returns(false);
            dropZone.handleWindowLeave(event);
            expect(callbackStub.create).to.have.been.calledOnce;
            expect(callbackStub.create.calledWith(dropZone.options.windowLeave)).to.be.true;
        });

        // partial stub
        it('should call handleDropZoneLeave if the file is on the window', () => {
            onWindowStub.returns(true);
            onDropZoneStub.returns(false);
            dropZone.dropZoneActive = true;
            dropZone.handleWindowLeave(event);
            expect(dropZoneLeaveStub).to.have.been.calledOnce;
        });
    });

    describe('handleDropZoneEnter()', () => {
        beforeEach(() => {
            validatorStub.validate.returns({ valid: true, text: '' });
        });

        it('should clear idle timer', () => {
            dropZone.handleDropZoneEnter([]);
            expect(timerStub.clear).to.have.been.calledOnce;
        });

        it('should create dropZoneEnter callback', () => {
            dropZone.handleDropZoneEnter([]);
            expect(callbackStub.create).to.have.been.calledOnce;
            expect(callbackStub.create.calledWith(
                dropZone.options.dropZoneEnter,
                dropZone,
                { valid: true, text: '' })
            ).to.be.true;
        });

        it('should set the dropZoneActive flag to true', () => {
            dropZone.dropZoneActive = false;
            dropZone.handleDropZoneEnter([]);
            expect(dropZone.dropZoneActive).to.be.true;
        });
    });

    describe('handleDropZoneLeave()', () => {
        beforeEach(() => {
            validatorStub.validate.returns({ valid: true, text: '' });
        });

        it('should clear idle timer', () => {
            dropZone.handleDropZoneLeave([]);
            expect(timerStub.clear).to.have.been.calledOnce;
        });

        it('should create dropZoneEnter callback', () => {
            dropZone.handleDropZoneLeave([]);
            expect(callbackStub.create).to.have.been.calledOnce;
            expect(callbackStub.create.calledWith(
                dropZone.options.dropZoneLeave,
                dropZone,
                { valid: true, text: '' }
            )).to.be.true;
        });

        it('should set the dropZoneActive flag to false', () => {
            dropZone.dropZoneActive = true;
            dropZone.handleDropZoneLeave([]);
            expect(dropZone.dropZoneActive).to.be.false;
        });
    });

    describe('getFiles()', () => {
        it('should return all files', () => {
            dropZone.files = [{ id: 0 }, { id: 1 }];
            expect(dropZone.getFiles()).to.deep.equal([{ id: 0 }, { id: 1 }]);
        });
    });

    describe('getFile()', () => {
        it('should return a single file', () => {
            dropZone.files = [{ id: 0 }, { id: 1 }];
            expect(dropZone.getFile(1)).to.deep.equal({ id: 1 });
        });
    });

    describe('getSize()', () => {
        it('should return the size count', () => {
            dropZone.size = 999;
            expect(dropZone.getSize()).to.equal(999);
        });
    });

    describe('removeFile()', () => {
        it('should remove the file from the files store', () => {
            dropZone.files = [{ id: 0, raw: { size: 50 } }, { id: 1, raw: { size: 50 } }];
            dropZone.removeFile(1);
            expect(dropZone.files).to.deep.equal([{ id: 0, raw: { size: 50 } }]);
        });

        it('should deduct the file size from the size store', () => {
            dropZone.files = [{ id: 0, raw: { size: 50 } }, { id: 1, raw: { size: 50 } }];
            dropZone.size = 100;
            dropZone.removeFile(1);
            expect(dropZone.size).to.equal(50);
        });

        it('should create fileRemoved callback', () => {
            dropZone.removeFile(1);
            expect(callbackStub.create).to.have.been.calledOnce;
            expect(callbackStub.create.calledWith(
                dropZone.options.fileRemoved,
                dropZone
            )).to.be.true;
        });
    });

    describe('reset()', () => {
        let initStub;

        beforeEach(() => {
            initStub = sinon.stub(dropZone, 'init');
        });

        afterEach(() => {
            initStub.restore();
        });

        it('should clear the file store', () => {
            dropZone.files = [{ id: 0 }];
            dropZone.reset();
            expect(dropZone.files).to.deep.equal([]);
        });

        it('should reset the size count to 0', () => {
            dropZone.size = 999;
            dropZone.reset();
            expect(dropZone.size).to.equal(0);
        });

        it('should remove all events', () => {
            dropZone.reset();
            expect(eventStub.removeAll).to.have.been.calledOnce;
        });

        // partial stub
        it('should invoke the init method to re-attach event handlers', () => {
            dropZone.reset();
            expect(initStub).to.have.been.calledOnce;
        });
    });

    describe('getDropZoneId()', () => {
        it('should return the instance id', () => {
            dropZone.id = 5;
            expect(dropZone.getDropZoneId()).to.equal(5);
        });
    });

    describe('getSupportsDataTransfer()', () => {
        it('should return the data transfer support flag', () => {
            dropZone.supportsDataTransfer = true;
            expect(dropZone.getSupportsDataTransfer()).to.be.true;
        });
    });

    describe('enable()', () => {
        it('should enable the DropZone', () => {
            dropZone.enabled = false;

            dropZone.enable();

            expect(dropZone.enabled).to.be.true;
        });
    });

    describe('disable()', () => {
        it('should disable the DropZone', () => {
            dropZone.enabled = true;

            dropZone.disable();

            expect(dropZone.enabled).to.be.false;
        });
    });
});
