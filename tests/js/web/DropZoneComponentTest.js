import DropZoneComponent from '../../../js/DropZone/DropZoneComponent';
import DropZone from '../../../js/DropZone/DropZone';
import DropZoneInstanceManager from '../../../js/DropZone/DropZoneInstanceManager';

describe('DropZoneComponent', () => {
    let $html;
    let $fileInput;
    let $dropZone;
    let $browse;
    let dropZoneComponent;
    let dropZoneStub;
    let instanceManagerStub;

    beforeEach(() => {
        $html = $(document.documentElement);
        $fileInput = $('<input type="text" id="fileInput">').appendTo($html);
        $dropZone = $('<div class="dropzone"></div>').appendTo($html);
        $browse = $('<p class="browse">browse</p>').appendTo($dropZone);

        dropZoneStub = sinon.createStubInstance(DropZone);
        instanceManagerStub = sinon.createStubInstance(DropZoneInstanceManager);
        dropZoneComponent = new DropZoneComponent(
            $html,
            instanceManagerStub
        );
    });

    describe('buildInstanceOptions()', () => {
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
});
