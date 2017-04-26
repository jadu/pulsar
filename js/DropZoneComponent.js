import DropZone from './libs/DropZone';
import MimeTyper from './libs/MimeTyper';
import _ from 'lodash';
import $ from 'jquery';

class DropZoneComponent {
    constructor (html) {
        this.html = window.$ && html instanceof window.$ ? html[0] : html;
        this.mimeTyper = new MimeTyper();        this.defaults = {
            // files have entered the window
            windowEnter: () => {
                this.$body.addClass(this.interactionClasses.windowEnter);
            },
            // files have left the window
            windowLeave: () => {
                this.$body.removeClass(this.interactionClasses.windowEnter);
            },
            // files have entered the dropzone
            dropZoneEnter: () => {
                this.$body.addClass(this.interactionClasses.dropZoneEnter);
            },
            // files have left the dropzone
            dropZoneLeave: () => {
                this.$body.removeClass(this.interactionClasses.dropZoneEnter);
            },
            // files have been dropped on the dropzone
            dropZoneDrop: ({ files, node }) => {
                this.handleDropZoneDrop(files, node);
                this.resetBodyClass();
            },
            // files have been dropped on the window, but not the dropzone
            windowDrop: () => {
                this.resetBodyClass();
            },
            // files have been rejected
            filesRejected: ({ status, error, node }) => {
                this.updateDropZoneValidation(error, node);
                this.resetBodyClass();
            }
        };
    }

    /**
     * Initiate DropZone component, this wraps and defines options for
     * multiple instances of DropZone
     */
    init (options) {
        this.body = [...this.html.children].slice(1);
        this.$body = $(this.body);
        this.options = _.extend({}, this.defaults, options);
        this.eventPool = [];
        this.removeFileHandler = this.removeFileHandler.bind(this);
        this.nodeClasses = {
            dropzone: 'dropzone',
            wrapper: 'dropzone__file-wrapper',
            validation: 'dropzone__validation',
            error: 'dropzone__error',
            file: 'dropzone__file',
            name: 'dropzone__name',
            type: 'dropzone__type',
            size: 'dropzone__size',
            thumbnail: 'dropzone__thumbnail'
        };
        this.interactionClasses = {
            windowEnter: 'dropzone-window-active',
            dropZoneEnter: 'dropzone-dropzone-active',
        };

        // get all dropzone elements
        this.dropzones = [...this.html.querySelectorAll(`.${this.nodeClasses.dropzone}`)];
        // get dropzone options array
        this.options = this.buildOptsFromAttrs();
        // instantiate each dropzone with it's options
        this.dropzones = this.dropzones.map((node, index) => {
            // mount our dropzone instance
            // this.options[index].node = this.mount(node);
            this.options[index].node = node;
            return new DropZone(this.options[index]);
        });
    }

    /**
     * Mount a dropzone instance to the DOM
     * @param  {Element} dropzone
     * @return {Element}
     */
    mount (dropzone) {
        const node = document.createElement('div');
        // dropzone innerHTML
        const inner = `<p>dropzone</p>`.replace(/>\s+</g, '><');

        [...dropzone.attributes].forEach(attr => {
            const { name, value } = attr;

            if (name.match(/(id|data-dropzone)/)) {
                node.setAttribute(name, value);
            }
        });

        node.className = 'dropzone';
        node.innerHTML = inner;
        dropzone.parentNode.replaceChild(node, dropzone);
        return node;
    }

    /**
     * Create a file wrapper / update with dropped files
     * @param {Array} files
     * @param {Element} node
     */
    handleDropZoneDrop (files, node) {
        let wrapper = node.querySelector(`.${this.nodeClasses.wrapper}`);

        // if we do not already have a wrapper, create one
        if (!wrapper) {
            wrapper = document.createElement('div');
            wrapper.className = this.nodeClasses.wrapper;
            node.appendChild(wrapper);
        }

        // update wrapper HTML
        this.updateDropZoneFiles(files, node, wrapper);
    }

    /**
     * Update dropzone HTML
     * - remove validation node if we have one
     * - add / remove files HTML
     * - remove wrapper if we have no files
     * @param  {Array} files
     * @param  {Element} node
     * @param  {Element} wrapper
     */
    updateDropZoneFiles (files, node, wrapper) {
        const validation = node.querySelector(`.${this.nodeClasses.validation}`);
        let fileNodeString = '';

        // if we've got a drop we know we don't have any errors
        // clear any previous validation messages
        if (validation) {
            validation.parentNode.removeChild(validation);
        }

        // if there are no files we'll remove the wrapper
        if (!files.length && wrapper) {
            wrapper.parentNode.removeChild(wrapper);
            return;
        }

        // create file html string
        files.forEach(file => {
            fileNodeString += this.createFileNode(file);
        });

        // update wrapper html
        wrapper.innerHTML = fileNodeString;
        [...wrapper.querySelectorAll(`.${this.nodeClasses.file}`)].forEach(file => {
            file.addEventListener('click', this.removeFileHandler);
        });
    }

    /**
     * Update dropzone validation HTML
     * @param  {String} error
     * @param  {Element} node
     */
    updateDropZoneValidation (error, node) {
        let validationNode = node.querySelector(`.${this.nodeClasses.validation}`);
        let errorNode = node.querySelector(`.${this.nodeClasses.error}`);
        const wrapper = node.querySelector(`.${this.nodeClasses.wrapper}`);

        // if a validation element doesn't exist, create one
        if (!validationNode) {
            validationNode = document.createElement('div');
            validationNode.className = this.nodeClasses.validation;
            // if we do not have a file wrapper just append the validation
            // to the dropzone node, otherwise insert before the file wrapper
            if (!wrapper) {
                node.appendChild(validationNode);
            } else {
                node.insertBefore(validationNode, wrapper);
            }
        }

        // create error message and update validation
        errorNode = `<p class="${this.nodeClasses.error}">${error}</p>`;
        validationNode.innerHTML = errorNode;
    }

    /**
     * Remove files from DropZone instances
     * @param  {Event} event
     */
    removeFileHandler (event) {
        let file;
        let dropZone;
        const path = event.path ? event.path : DropZoneComponent.getEventPath(event.target);

        // grab the file id and dropzone id, this is neccessary in the
        // albeit unlikely event we have multiple dropzone instances
        path.forEach(node => {
            if (!file) {
                file = node.getAttribute('data-dropzone-file');
            }

            if (!dropZone) {
                dropZone = node.id;
            }
        });

        // remove file from DropZone instance
        const instance = this.getDropZoneInstance(dropZone);
        const wrapper = instance.node.querySelector(`.${this.nodeClasses.wrapper}`);

        instance.removeFile(file);
        // update HTML
        this.updateDropZoneFiles(instance.getFiles(), instance.node, wrapper);
    }

    /**
     * Create dropzone file HTML string
     * @param  {Object} file
     * @return {String}
     */
    createFileNode ({ name, size, type, id, thumbnail }) {
        let thumb = `<div class="${this.nodeClasses.thumbnail}`;

        if (thumbnail) {
            // add a thumbnail if DropZone has returned one
            thumb += `" style="background-image: url(${thumbnail});"`;
        } else {
            // add icon class if we cannot get a file preview
            thumb += ` icon-${this.mimeTyper.getIconClass(type)}"`;
        }

        thumb += '></div>';

        return `
            <div data-dropzone-file="${id}" class="${this.nodeClasses.file}">
                ${thumb}
                <p class="${this.nodeClasses.name}">${name}</p>
                <p class="${this.nodeClasses.size}">${size}</p>
                <p class="${this.nodeClasses.type}">${type}</p>
            </div>`.replace(/>\s+</g, '><');
    }

    /**
     * Remove any classes that were added as part of dropzone
     */
    resetBodyClass () {
        const handlers = Object.keys(this.interactionClasses);
        // create a string of classes that might need to be removed
        const classes = handlers.reduce((classList, handler) => {
            classList += `${this.interactionClasses[handler]} `;
             return classList;
        }, '').trim();

        this.$body.removeClass(classes);
    }

    /**
     * Create options array from dropzone nodes
     * @return {Array}
     */
    buildOptsFromAttrs () {
        return this.dropzones.reduce((options, node) => {
            const dropZoneAttrs = DropZoneComponent.getDropZoneAttrs(node);
            // extend node attributes & defaults to build options
            options.push(_.extend({}, dropZoneAttrs, this.defaults));
            return options;
        }, []);
    }

    /**
     * Derive dropzone options object from it's data-dropzone attributes,
     * attributes are hyphenated and will be came-case-ified
     * @param  {Element} node
     * @return {Object}
     */
   static getDropZoneAttrs (node) {
        return [...node.attributes].reduce((attrs, attr) => {
            const { name } = attr;
            let { value } = attr;
            // grab value from attributes matching data-dropzone-{option}={value}
            if (name.match(/dropzone/)) {
                // transform hyphen seperated attr to DropZone camelCase option
                const option = name.replace(/data-dropzone-/, '');

                if (option === 'whitelist') {
                    value = value.split(' ');
                }

                attrs[DropZoneComponent.camelCaseIfy(option)] = value;
            }

            return attrs;
        }, {});
    }

    /**
     * Return a DropZone instance by the id attribute of the node
     * @param  {String} id
     * @return {Object} DropZone
     */
    getDropZoneInstance (id) {
        if (Array.prototype.find) {
            return this.dropzones.find(dz => dz.node.id === id);
        } else {
            return _.find(this.dropzones, dz => dz.node.id === id);
        }
    }

    /**
     * Transform a hyphen seperated string to camel case
     * @param  {String} string
     * @return {String}
     */
    static camelCaseIfy (string) {
        return string.split('-').map((word, index) => {
            if (index) {
                return word[0].toUpperCase() + word.slice(1);
            } else {
                return word;
            }
        }).join('');
    }

    /**
     * Polyfill the lack of an event.path for some browsers
     * @param  {Element} target
     * @return {Array}
     */
    static getEventPath (target) {
        const eventPath = [target];
        let node = target;
        // ensure we have an element we can query an attribute on
        while (node.parentNode && node.parentNode.getAttribute) {
            eventPath.push(node.parentNode);
            node = node.parentNode;
        }

        return eventPath;
    }
}

module.exports = DropZoneComponent;
