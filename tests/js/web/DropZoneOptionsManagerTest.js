import DropZoneOptionsManager from '../../../js/DropZone/DropZoneOptionsManager';
import DropZoneComponentUtils from '../../../js/DropZone/DropZoneComponentUtils';

describe('DropZoneOptionsManager', () => {
    let optionsManager;
    let utilStub;

    beforeEach(() => {
        utilStub = sinon.stub(DropZoneComponentUtils, 'getOptionsFromAttrs', () => ({ foo: 'bar' }));
        optionsManager = new DropZoneOptionsManager(DropZoneComponentUtils);
    });

    afterEach(() => {
        utilStub.restore();
    });

    describe('buildComponentOptions()', () => {
        it('should merge and store the component defaults and options', () => {
            const defaults = { name: 'mike', age: 28 };
            const options = { name: 'dan' };

            optionsManager.buildComponentOptions(defaults, options);
            expect(optionsManager.componentOptions).to.deep.equal({ name: 'dan', age: 28 });
        });
    });

    describe('buildInstanceOptions()', () => {
        it ('should merge node attribute options with a clone of component options for a node', () => {
            const $node = $('<div></div>');

            optionsManager.componentOptions = { foo: 'foo' };
            optionsManager.buildInstanceOptions($node[0]);
            expect(optionsManager.instanceOptions[0]).to.deep.equal({ foo: 'bar' });
        });
    });

    describe('getInstanceOptions()', () => {

    });
});
