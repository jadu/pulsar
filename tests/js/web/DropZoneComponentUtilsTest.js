import DropZoneComponentUtils from '../../../js/DropZone/DropZoneComponentUtils';

describe('DropZoneComponentUtils', () => {
    describe('getOptionsFromAttrs()', () => {
        it('should parse data-dropzone attributes', () => {
            const $node = $('<div data-dropzone-foo="bar" data-foo="bar"></div>');

            expect(DropZoneComponentUtils.getOptionsFromAttrs($node[0], DropZoneComponentUtils.camelCaseIfy))
                .to.deep.equal({ foo: 'bar' });
        });

        it('should covert the whitelist option to an array', () => {
            const $node = $('<div data-dropzone-whitelist="image/* jpeg"></div>');

            expect(DropZoneComponentUtils.getOptionsFromAttrs($node[0], DropZoneComponentUtils.camelCaseIfy))
                .to.deep.equal({ whitelist: ['image/*', 'jpeg'] });
        });

        it('should parse bools', () => {
            const $node = $('<div data-dropzone-foo="true"></div>');

            expect(DropZoneComponentUtils.getOptionsFromAttrs($node[0], DropZoneComponentUtils.camelCaseIfy))
                .to.deep.equal({ foo: true });
        });
    });

    describe('camelCasify()', () => {
        it('should transform a hyphen serrated string to camel case', () => {
            expect(DropZoneComponentUtils.camelCaseIfy('foo-bar-baz')).to.equal('fooBarBaz');
        });
    });
});
