import DropZoneCallbackManager from '../../../js/DropZone/DropZoneCallbackManager';

describe('DropZoneCallbackManager', () => {
    let callbackManager;
    let callbackSpy;
    let dropZoneSpy;

    beforeEach(() => {
        callbackManager = new DropZoneCallbackManager();
        callbackSpy = sinon.spy();
        dropZoneSpy = sinon.spy();
    });

    describe('create()', () => {
        it('should merge the data with a reference to the instance', () => {
            callbackManager.create(callbackSpy, dropZoneSpy, { foo: 'bar' });
            expect(callbackSpy).to.have.been.calledOnce;
            expect(callbackSpy.calledWith({ foo: 'bar', instance: dropZoneSpy })).to.be.true;
        });

        it('should invoke the callback if it is a function');
    });
});
