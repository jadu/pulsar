import DropZoneOptionsManager from '../../../js/DropZone/DropZoneOptionsManager';
import DropZoneComponentUtils from '../../../js/DropZone/DropZoneComponentUtils';

describe('DropZoneOptionsManager', () => {
    let optionsManager;
    let utilStub;

    beforeEach(() => {
        utilStub = sinon.createStubInstance(DropZoneComponentUtils);
        utilStub.getOptionsFromAttrs.returns({ foo: 'bar' });
        optionsManager = new DropZoneOptionsManager(utilStub);
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
            optionsManager.buildInstanceOptions($node[0], 0);
            expect(optionsManager.instanceOptions[0]).to.deep.equal({ foo: 'bar', dropZoneId: 0 });
        });
    });

    describe('getInstanceOptions()', () => {
        it('should return a set of instance options', () => {
            optionsManager.instanceOptions = [{ foo: 'bar' }];
            expect(optionsManager.getInstanceOptions(0)).to.deep.equal({ foo: 'bar' });
        });
    });

    describe('getInstanceOptions()', () => {
        it('should get a property on a set ofinstance options', () => {
            optionsManager.instanceOptions = [{ foo: 'bar' }];
            expect(optionsManager.getInstanceOption(0, 'foo')).to.equal('bar');
        });
    });

    describe('buildValidatorOptions', () => {
        it('should create an options object', () => {
            const options = {
                validationMaxFiles: 'foo',
                validationWhitelist: 'foo',
                validationMaxSize: 'foo',
                validationUnknown: 'foo',
                maxFiles: 1,
                maxSize: 2,
                whitelist: ['foo']
            };

            expect(optionsManager.buildValidatorOptions(options)).to.deep.equal({
                validationText: {
                    maxFiles: 'foo',
                    maxSize: 'foo',
                    whitelist: 'foo',
                    unknown: 'foo'
                },
                maxFiles: 1,
                maxSize: 2,
                whitelist: ['foo']
            });
        });
    });
});
