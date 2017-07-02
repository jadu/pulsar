import DropZoneComponent from '../../../js/DropZone/DropZoneComponent';
import DropZoneOptionsManager from '../../../js/DropZone/DropZoneOptionsManager';
import DropZoneInstanceManager from '../../../js/DropZone/DropZoneInstanceManager';
import DropZoneComponentUtils from '../../../js/DropZone/DropZoneComponentUtils';
import DropZoneComponentValidation from '../../../js/DropZone/DropZoneComponentValidationManager';

describe('DropZoneComponent', () => {
    let $html;
    let $fileInput;
    let $dropZone;
    let $browse;
    let $info;
    let dropZoneComponent;
    let instanceManager;
    let optionsManager;
    let utils;
    let validation;

    beforeEach(() => {
        $html = $(document.documentElement);
        $fileInput = $('<input type="text" id="fileInput">').appendTo($html);
        $dropZone = $('<div class="dropzone"></div>').appendTo($html);
        $info = $('<p class="info"></p>').appendTo($dropZone);
        $browse = $('<span class="browse">browse</span>').appendTo($info);

        instanceManager = sinon.createStubInstance(DropZoneInstanceManager);
        optionsManager = sinon.createStubInstance(DropZoneOptionsManager);
        utils = sinon.createStubInstance(DropZoneComponentUtils);
        validation = sinon.createStubInstance(DropZoneComponentValidation);

        instanceManager.getInstance.returns({ node: $dropZone[0], info: $info[0] });
        instanceManager.getFiles.returns(['file']);
        optionsManager.getInstanceOptions.returns({
            nodeClasses: {
                wrapper: 'wrapper'
            }
        });
        utils.createFileNode.returns('<div class="file"></div>');

        dropZoneComponent = new DropZoneComponent(
            $html,
            '.dropzone',
            instanceManager,
            optionsManager,
            utils,
            validation
        );
    });

    describe('init()', () => {
        it('write init tests');
    });

    describe('processInputNode()', () => {
        it('should hide the input if specified in options', () => {
            const options = { showInputNode: false, inputNodeId: 'fileInput' };

            dropZoneComponent.processInputNode($fileInput[0], 0, options.showInputNode);
            expect($fileInput.css('display')).to.equal('none');
        });

        it('should invoke the addFiles method on the file manager on change', /*() => {


            dropZoneComponent.processInputNode(dropZoneStub, options);
            $fileInput.trigger('change');

            expect(fileManagerStub.addFiles).to.have.been.calledOnce;
            expect(fileManagerStub.calledWith(dropZoneStub, { persist: true })).to.be.true;

        }*/);

        it('should clear the input node value on change', /*() => {
            const change = $.Event('change');

            dropZoneComponent.processInputNode(dropZoneStub, options);
            $fileInput.val('foo');
            $fileInput.trigger(change);
            expect($fileInput.val()).to.equal('');
        }*/);

        it('should not hide the input if specified in options', () => {
            const options = { showInputNode: true, inputNodeId: 'fileInput' };
            const display = $fileInput.css('display');

            dropZoneComponent.processInputNode($fileInput[0], 0, options.showInputNode);
            expect($fileInput.css('display')).to.equal(display);
        });
    });

    describe('processBrowseNode()', () => {
        it('should trigger a click on the corresponding input node', /*() => {
            const clickSpy = sinon.spy();
            const click = $.Event('click');

            $fileInput.on('click', clickSpy);
            dropZoneComponent.processBrowseNode($browse[0], $fileInput[0]);
            $browse.trigger(click);
            expect(clickSpy).to.have.been.calledOnce;
        }*/);

        it('should prevent the default behaviour of the event', /*() => {
            const click = $.Event('click');

            dropZoneComponent.processBrowseNode($browse[0], $fileInput[0]);
            $browse.trigger(click);
            expect(click.isDefaultPrevented()).to.be.true;
        }*/);
    });

    describe('updateInfoState()', () => {
        it('should update the info node', () => {
            instanceManager.getInstance.returns({ info: $info[0] });
            dropZoneComponent.updateInfoState(0, 'foo');
            expect($info.html()).to.equal('foo');
        });

        it('should re-attach the Browse Files handler');
    });

    describe('updateDropZoneFiles()', () => {
        it('should create a file wrapper if one does not exist', () => {
            dropZoneComponent.updateDropZoneFiles(0);
            expect($dropZone.find('.wrapper').length).to.equal(1);
        });

        it('should remove any validation messages', () => {
            dropZoneComponent.updateDropZoneFiles(0);
            expect(validation.clear).to.have.been.calledOnce;
        });

        it('should remove the wrapper if there are no files', () => {
            $('<div class="wrapper"></div>').appendTo($dropZone);
            instanceManager.getFiles.returns([]);
            dropZoneComponent.updateDropZoneFiles(0);
            expect($dropZone.find('.wrapper').length).to.equal(0);
        });

        it('should update the wrapper html with the files', () => {
            dropZoneComponent.updateDropZoneFiles(0);
            expect($dropZone.find('.wrapper').html()).to.equal('<div class="file"></div>');
        });

        it('should add the remove file handler to the files');
    });

    describe('throwValidationError()', () => {
        let partialStub;

        beforeEach(() => {
            partialStub = sinon.stub(dropZoneComponent, 'updateInfoState');
        });

        afterEach(() => {
            partialStub.reset();
        });

        it('should update the validation', () => {
            dropZoneComponent.throwValidationError('foo', 0);
            expect(validation.update).to.have.been.calledOnce;
        });

        // partial stub
        it('should update info node with the idleHtml option', () => {
            optionsManager.getInstanceOptions.returns({
                idleHtml: 'foo',
                nodeClasses: {}
            });
            dropZoneComponent.throwValidationError('foo', 0);
            expect(partialStub).to.have.been.calledOnce;
            partialStub.reset();
        });
    });

    describe('removeFile()', () => {
        let event;
        let $file;
        let $wrapper;

        beforeEach(() => {
            instanceManager.getFiles.returns([]);
            $wrapper = $('<div class="wrapper"></div>').appendTo($dropZone);
            $file = $('<div data-dropzone-file="0" class="file"></div>').appendTo($wrapper);
            event = { path: [$file[0], $dropZone[0]] };
        });

        it('should call remove file on the instance manager', () => {
            dropZoneComponent.removeFile(event);
            expect(instanceManager.removeFile).to.have.been.calledOnce;
        });

        it('should update the DropZoneComponent files html', () => {
            dropZoneComponent.removeFile(event);
            expect($dropZone.find('.wrapper').length).to.equal(0);
        });
    });

    describe('handleWindowEnter()', () => {
        it('should ')
    });
});
