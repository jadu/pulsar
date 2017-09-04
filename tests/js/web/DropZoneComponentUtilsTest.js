import DropZoneComponentUtils from '../../../js/DropZone/DropZoneComponentUtils';
import MimeTyper from '../../../js/libs/MimeTyper';

describe('DropZoneComponentUtils', () => {
    let utils;
    let mimeStub;

    beforeEach(() => {
        mimeStub = sinon.createStubInstance(MimeTyper);
        mimeStub.getIconClass.returns('foo');
        utils = new DropZoneComponentUtils(mimeStub);
    });

    describe('getOptionsFromAttrs()', () => {
        it('should parse data-dropzone attributes', () => {
            const $node = $('<div data-dropzone-foo="bar" data-foo="bar"></div>');

            expect(utils.getOptionsFromAttrs($node[0]))
                .to.deep.equal({ foo: 'bar' });
        });

        it('should covert the whitelist option to an array', () => {
            const $node = $('<div data-dropzone-whitelist="image/* jpeg"></div>');

            expect(utils.getOptionsFromAttrs($node[0]))
                .to.deep.equal({ whitelist: ['image/*', 'jpeg'] });
        });

        it('should parse bools', () => {
            const $node = $('<div data-dropzone-foo="true" data-dropzone-bar="false"></div>');

            expect(utils.getOptionsFromAttrs($node[0]))
                .to.deep.equal({ foo: true, bar: false });
        });

        it('should parse numbers', () => {
            const $node = $('<div data-dropzone-max-files="10"></div>');

            expect(utils.getOptionsFromAttrs($node[0]))
                .to.deep.equal({ maxFiles: 10 });
        });
    });

    describe('camelCasify()', () => {
        it('should transform a hyphen serrated string to camel case', () => {
            expect(utils.camelCaseIfy('foo-bar-baz')).to.equal('fooBarBaz');
        });
    });

    describe('createFileNode()', () => {
        let options;

        beforeEach(() => {
            options = {
                fileNodeName: true,
                fileNodeDesc: true,
                fileNodeSize: true,
                fileNodeType: true,
                nodeClasses: {
                    description: 'description',
                    name: 'name',
                    size: 'size',
                    type: 'type',
                    thumbnail: 'thumbnail',
                    file: 'file',
                    inner: 'inner',
                    close: 'close',
                    meta: 'meta'
                }
            };
        });

        it('should add a thumbnail if we have one', () => {
            const file = {
                id: 'foo',
                thumbnail: 'foo',
                type: 'foo',
                size: 'foo',
                name: 'foo',
                meta: {
                    description: 'foo',
                }
            };
            const expected = '<div data-dropzone-file="foo" class="file">' +
                '<div class="inner">' +
                '<a class="close" href="#"><i class="icon icon-times-circle"></i></a>' +
                '<div class="thumbnail thumbnail--image" style="background-image: url(foo);"></div>' +
                '<div class="meta">' +
                '<p class="name">foo</p>' +
                '<p class="description">foo</p>' +
                '<p class="size">foo</p>' +
                '<p class="type">foo</p>' +
                '</div></div></div>';

            expect(utils.createFileNode(file, options).trim()).to.equal(expected);
        });

        it('should handle no description', () => {
            const file = {
                id: 'foo',
                thumbnail: 'foo',
                type: 'foo',
                size: 'foo',
                name: 'foo',
                meta: {}
            };
            const expected = '<div data-dropzone-file="foo" class="file">' +
                '<div class="inner">' +
                '<a class="close" href="#"><i class="icon icon-times-circle"></i></a>' +
                '<div class="thumbnail thumbnail--image" style="background-image: url(foo);"></div>' +
                '<div class="meta">' +
                '<p class="name">foo</p>' +
                '<p class="size">foo</p>' +
                '<p class="type">foo</p>' +
                '</div></div></div>';

            expect(utils.createFileNode(file, options).trim()).to.equal(expected);
        });

        it('should handle no name', () => {
            const file = {
                id: 'foo',
                thumbnail: 'foo',
                type: 'foo',
                size: 'foo',
                meta: {
                    description: 'foo',
                }
            };
            const expected = '<div data-dropzone-file="foo" class="file">' +
                '<div class="inner">' +
                '<a class="close" href="#"><i class="icon icon-times-circle"></i></a>' +
                '<div class="thumbnail thumbnail--image" style="background-image: url(foo);"></div>' +
                '<div class="meta">' +
                '<p class="description">foo</p>' +
                '<p class="size">foo</p>' +
                '<p class="type">foo</p>' +
                '</div></div></div>';

            expect(utils.createFileNode(file, options).trim()).to.equal(expected);
        });

        it('should handle no size', () => {
            const file = {
                name: 'foo',
                id: 'foo',
                thumbnail: 'foo',
                type: 'foo',
                meta: {
                    description: 'foo',
                }
            };
            const expected = '<div data-dropzone-file="foo" class="file">' +
                '<div class="inner">' +
                '<a class="close" href="#"><i class="icon icon-times-circle"></i></a>' +
                '<div class="thumbnail thumbnail--image" style="background-image: url(foo);"></div>' +
                '<div class="meta">' +
                '<p class="name">foo</p>' +
                '<p class="description">foo</p>' +
                '<p class="type">foo</p>' +
                '</div></div></div>';

            expect(utils.createFileNode(file, options).trim()).to.equal(expected);
        });

        it('should handle no type', () => {
            const file = {
                name: 'foo',
                id: 'foo',
                thumbnail: 'foo',
                size: 'foo',
                meta: {
                    description: 'foo',
                }
            };
            const expected = '<div data-dropzone-file="foo" class="file">' +
                '<div class="inner">' +
                '<a class="close" href="#"><i class="icon icon-times-circle"></i></a>' +
                '<div class="thumbnail thumbnail--image" style="background-image: url(foo);"></div>' +
                '<div class="meta">' +
                '<p class="name">foo</p>' +
                '<p class="description">foo</p>' +
                '<p class="size">foo</p>' +
                '</div></div></div>';

            expect(utils.createFileNode(file, options).trim()).to.equal(expected);
        });

        it('should add an icon if we do not have a thumbnail', () => {
            const file = {
                id: 'foo',
                thumbnail: false,
                type: 'foo',
                size: 'foo',
                name: 'foo',
                meta: {
                    description: 'foo',
                }
            };
            const expected = '<div data-dropzone-file="foo" class="file">' +
                '<div class="inner">' +
                '<a class="close" href="#"><i class="icon icon-times-circle"></i></a>' +
                '<div class="thumbnail"><i class="dropzone__file-icon icon icon-foo"></i></div>' +
                '<div class="meta">' +
                '<p class="name">foo</p>' +
                '<p class="description">foo</p>' +
                '<p class="size">foo</p>' +
                '<p class="type">foo</p>' +
                '</div></div></div>';

            expect(utils.createFileNode(file, options).trim()).to.equal(expected);
        });
    });

    describe('getEventPath()', () => {
        const $body = $('<div></div>');
        const $grandparent = $('<div class="gp"></div>').appendTo($body);
        const $parent = $('<div class="p"></div>').appendTo($grandparent);
        const $child = $('<div class="c"></div>').appendTo($parent);
        const $target = $('<div class="t"></div>').appendTo($child);

        it('should return an array of nodes simulating an event path', () => {
            expect(utils.getEventPath($target[0])).to.deep.equal([
                $target[0],
                $child[0],
                $parent[0],
                $grandparent[0],
                $body[0]
            ]);
        });
    });
});
