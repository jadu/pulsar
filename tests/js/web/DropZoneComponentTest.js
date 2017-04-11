"use strict";

require('babel-polyfill');

import DropZoneComponent from '../../../js/DropZoneComponent';
import $ from 'jquery';

describe('DropZoneComponent', () => {
    const $html = $('<div></div>');
    const dropZoneNode = `<input data-dropzone-max-size="10" class="dropzone" id="dropzone_1"/>`;
    const file = [{ id: '1', type: 'foo', name: 'foo', size: 123, thumbnail: 'url://image' }];
    const files = [
        { id: '1', name: 'foo', type: 'foo' },
        { id: '1', name: 'foo', type: 'foo' },
        { id: '1', name: 'foo', type: 'foo' }
    ];

    $html.append('<div id="head"></div>');
    $html.append('<div id="body"></div>');
    $html.children('#body').append(dropZoneNode);

    afterEach(() => {
        $html.children('#body').empty();
        $html.children('#body').append(dropZoneNode);
    });

    describe('init()', () => {
        it('should create a DropZone instance', () => {
            const DZC = new DropZoneComponent($html);

            DZC.init();
            expect(DZC.dropzones.length).to.equal(1);
        });

        it('should create multiple DropZone instances', () => {
            $html.children('#body').append('<input class="dropzone" id="dropzone_2"/>');

            const DZC = new DropZoneComponent($html);

            DZC.init();
            expect(DZC.dropzones.length).to.equal(2);
        });
    });

    describe('mount()', () => {
        it('should retain id once mounted', () => {
            const DZC = new DropZoneComponent($html);
            const node = $('<div id="foo"></div>');

            DZC.mount(node[0]);
            expect(node.attr('id')).to.equal('foo');
        });

        it('should retain DropZone attribute options once mounted', () => {
            const DZC = new DropZoneComponent($html);
            const node = $('<div data-dropzone-foo="foo"></div>');

            DZC.mount(node[0]);
            expect(node.attr('data-dropzone-foo')).to.equal('foo');
        });

        it('should return a DOM node', () => {
            const DZC = new DropZoneComponent($html);
            const parent = $('<div></div>');
            const node = $('<div id="child"></div>');

            parent.append(node);

            const returnedNode = DZC.mount(parent.children('#child')[0]);

            expect(returnedNode.nodeName).to.equal('DIV');
        });
    });

    describe('handleDropZoneDrop()', () => {
        it('should create a wrapper node', () => {
            const DZC = new DropZoneComponent($html);

            DZC.init();

            const node = $html.find('#dropzone_1')[0];

            DZC.handleDropZoneDrop(file, node);
            expect($html.find(`.${DZC.nodeClasses.wrapper}`).length).to.equal(1);
        });

        it('should call updateDropZoneFiles', () => {
            const DZC = new DropZoneComponent($html);
            const spy = sinon.spy(DropZoneComponent.prototype, 'updateDropZoneFiles');

            DZC.init();

            const node = $html.find('#dropzone_1')[0];

            DZC.handleDropZoneDrop(file, node);
            expect(spy).to.have.been.calledOnce;
            spy.restore();
        });
    });

    describe('updateDropZoneFiles()', () => {
        it('should clear any validation HTML', () => {
            const DZC = new DropZoneComponent($html);

            DZC.init();

            const node = $html.find('#dropzone_1')[0];

            $(node).append(`<div class="${DZC.nodeClasses.wrapper}"></div>`);

            const wrapper = node.querySelector(`.${DZC.nodeClasses.wrapper}`);

            $(node).append(`<div class="${DZC.nodeClasses.validation}"></div>`);
            DZC.updateDropZoneFiles(file, node, wrapper);
            expect($(node).find(`.${DZC.nodeClasses.validation}`).length).to.equal(0);
        });

        it('should remove the wrapper node if we have no files', () => {
            const DZC = new DropZoneComponent($html);

            DZC.init();

            const node = $html.find('#dropzone_1')[0];

            $(node).append(`<div class="${DZC.nodeClasses.wrapper}"></div>`);

            const wrapper = node.querySelector(`.${DZC.nodeClasses.wrapper}`);

            DZC.updateDropZoneFiles([], node, wrapper);
            expect($(node).find(`.${DZC.nodeClasses.wrapper}`).length).to.equal(0);
        });

        it('should update wrapper node if we have files', () => {
            const DZC = new DropZoneComponent($html);

            DZC.init();

            const node = $html.find('#dropzone_1')[0];

            $(node).append(`<div class="${DZC.nodeClasses.wrapper}"></div>`);

            const wrapper = node.querySelector(`.${DZC.nodeClasses.wrapper}`);

            DZC.updateDropZoneFiles(files, node, wrapper);
            expect($(node).find(`.${DZC.nodeClasses.file}`).length).to.equal(3);
        });

        it('should add click handlers to each file node', () => {
            const DZC = new DropZoneComponent($html);
            const click = new Event('click');
            const stub = sinon.stub(DropZoneComponent.prototype,'removeFileHandler');

            DZC.init();

            const node = $html.find('#dropzone_1')[0];

            $(node).append(`<div class="${DZC.nodeClasses.wrapper}"></div>`);

            const wrapper = node.querySelector(`.${DZC.nodeClasses.wrapper}`);

            DZC.updateDropZoneFiles(files, node, wrapper);

            [...node.querySelectorAll(`.${DZC.nodeClasses.file}`)].forEach(file => {
                file.dispatchEvent(click);
            });

            expect(stub).to.have.been.calledThrice;
            stub.restore();
        });
    });

    describe('updateDropZoneValidation()', () => {
        it('should create a validation node if we do not have one', () => {
            const DZC = new DropZoneComponent($html);

            DZC.init();

            const node = $html.find('#dropzone_1')[0];

            DZC.updateDropZoneValidation('error', node);
            expect($(node).find(`.${DZC.nodeClasses.validation}`).length).to.equal(1);
        });

        it('should update validation node with error', () => {
            const DZC = new DropZoneComponent($html);

            DZC.init();

            const node = $html.find('#dropzone_1')[0];

            DZC.updateDropZoneValidation('error', node);
            expect($(node).find(`.${DZC.nodeClasses.error}`).length).to.equal(1);
        });
    });

    describe('removeFileHandler()', () => {
        it('should remove file from DropZone instance', () => {
            const DZC = new DropZoneComponent($html);

            DZC.init();

            const node = $html.find('#dropzone_1')[0];

            $(node).append(`<div class="${DZC.nodeClasses.wrapper}"></div>`);

            const wrapper = node.querySelector(`.${DZC.nodeClasses.wrapper}`);

            $(wrapper).append(`<div data-dropzone-file="1" class="${DZC.nodeClasses.file}"</div>`);

            const file = node.querySelector(`.${DZC.nodeClasses.file}`);
            const event = { path: [file, node] };

            DZC.getDropZoneInstance('dropzone_1').files.push({ id: "1", file: { size: 123 } });
            DZC.removeFileHandler(event);
            expect(DZC.getDropZoneInstance('dropzone_1').getFiles().length).to.equal(0);
        });

        it('should call updateDropZoneFiles', () => {
            const DZC = new DropZoneComponent($html);
            const spy = sinon.spy(DropZoneComponent.prototype, 'updateDropZoneFiles');

            DZC.init();

            const node = $html.find('#dropzone_1')[0];

            $(node).append(`<div class="${DZC.nodeClasses.wrapper}"></div>`);

            const wrapper = node.querySelector(`.${DZC.nodeClasses.wrapper}`);

            $(wrapper).append(`<div data-dropzone-file="1" class="${DZC.nodeClasses.file}"</div>`);

            const file = node.querySelector(`.${DZC.nodeClasses.file}`);
            const event = { path: [file, node] };

            DZC.removeFileHandler(event);
            expect(spy).to.have.been.calledOnce;
            spy.restore();
        });
    });

    describe('ceateFileNode()', () => {
        it('should create a file node with a thumbnail', () => {
            const DZC = new DropZoneComponent($html);

            file[0].thumbnail = 'foo';
            DZC.init();

            const fileHTML = DZC.createFileNode(file[0]);
            const actual = fileHTML.search(/background-image\: url\(foo\)/g);

            expect(actual).to.be.above(0);
        });

        it('should create a file node without a thumbnail', () => {
            const DZC = new DropZoneComponent($html);

            file[0].thumbnail = false;
            DZC.init();

            const fileHTML = DZC.createFileNode(file[0]);
            const actual = fileHTML.search(/background-image/g);

            expect(actual).to.equal(-1);
        });
    });

    describe('resetBodyClass()', () => {
        it('should reset any classes applied by DropZoneComponent', () => {
            const DZC = new DropZoneComponent($html);

            DZC.init();
            DZC.$body.addClass('foo');
            Object.keys(DZC.interactionClasses).forEach(className => {
                DZC.$body.addClass(DZC.interactionClasses[className]);
            });

            DZC.resetBodyClass();
            expect(DZC.$body.attr('class')).to.equal('foo');
        });
    });

    describe('buildOptsFromAttrs()', () => {
        it('should return an options object merged with defaults', () => {
            const DZC = new DropZoneComponent($html);
            const expected = [{ maxSize: '10', foo: 'bar' }];

            DZC.defaults = { foo: 'bar' };
            DZC.dropzones = [...$html[0].querySelectorAll(`.dropzone`)];
            expect(DZC.buildOptsFromAttrs()).to.deep.equal(expected);
        });
    });

    describe('getDropZoneAttrs()', () => {
        it('should return an object of options from node attributes', () => {
            const node = $('<div data-dropzone-foo="foo" data-dropzone-bar="bar"></div>');
            const expected = { foo: 'foo', bar: 'bar' };

            expect(DropZoneComponent.getDropZoneAttrs(node[0])).to.deep.equal(expected);
        });
    });

    describe('getDropZoneInstance()', () => {
        it('should return a DropZone instance from it\'s id', () => {
            const DZC = new DropZoneComponent($html);
            const node = $html.find('#dropzone_1');

            DZC.init();
            expect(DZC.getDropZoneInstance('dropzone_1').node.id).to.equal(node.attr('id'));
        });
    });

    describe('camelCaseIfy()', () => {
        it('should return a camel case string from a hyphen seperated string', () => {
            const actual = DropZoneComponent.camelCaseIfy('foo-bar-baz');
            const expected = 'fooBarBaz';

            expect(actual).to.equal(expected);
        });

        it('should handle no hyphens', () => {
            const actual = DropZoneComponent.camelCaseIfy('foo');
            const expected = 'foo';

            expect(actual).to.equal(expected);
        });
    });
});
