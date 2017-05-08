import DropZone from './libs/DropZone';
import DropZoneValidator from './libs/DropZoneValidator';
import _ from 'lodash';
import $ from 'jquery';

class DropZoneComponent {
    constructor (html, mimeTyper) {
        this.html = window.$ && html instanceof window.$ ? html[0] : html;
        this.mimeTyper = mimeTyper;
    }

    /**
     * Initiate DropZone component, this wraps and defines options for
     * multiple instances of DropZone
     */
    init (options = {}) {
        this.body = [...this.html.children].slice(1);
        this.$body = $(this.body);

        this.helperStateHTML = _.extend({}, {
            nodeSelector: '.dropzone__helper',
            // this will be assigned when handling dropzone node
            node: null,
            // we set the idle HTML when dropzone options are derived from node attributes
            idleHTML: null,
            windowEnterHTML: 'Drag your files here (max <% maxFiles %>)',
            dropZoneEnterHTML: 'Drop your files here'
        }, options);

        this.defaults = {
            passive: false
        };

        this.callbacks = {
            // files have entered the window
            windowEnter: (opts) => {
                // remove any state classes
                this.resetBodyClass();

                // add window enter class
                window.requestAnimationFrame(() => {
                    if (opts.valid) {
                        this.$body.addClass(this.interactionClasses.windowEnter);
                    } else {
                        this.$body.addClass(this.interactionClasses.dropZoneError);
                    }
                });

                // update helper text
                if (opts.valid) {
                    this.updateHelperState(opts.instance, this.helperStateHTML.windowEnterHTML);
                } else {
                    this.updateHelperState(opts.instance, this.helperStateHTML.idleHTML);
                }

                // call any additional callbacks passed in via options
                if (options.windowEnter && typeof options.windowEnter === 'function') {
                    options.windowEnter(this, opts);
                }
            },
            // files have left the window
            windowLeave: (opts) => {
                // remove any state classes
                this.resetBodyClass();

                // update helper text
                this.updateHelperState(opts.instance, this.helperStateHTML.idleHTML);

                // update validation if there was any
                this.clearDropZoneValidation(opts.instance.node);

                // call any additional callbacks passed in via options
                if (options.windowLeave && typeof options.windowLeave === 'function') {
                    options.windowLeave(this, opts);
                }
            },
            // files have entered the DropZone
            dropZoneEnter: (opts) => {
                // remove any state classes
                this.resetBodyClass();

                // add DropZone enter class
                window.requestAnimationFrame(() => {
                    if (opts.valid) {
                        this.$body.addClass(this.interactionClasses.dropZoneEnter);
                    } else {
                        this.$body.addClass(this.interactionClasses.dropZoneError);
                    }
                });

                // update helper text
                if (opts.valid) {
                    this.updateHelperState(opts.instance, this.helperStateHTML.dropZoneEnterHTML);
                } else {
                    this.updateHelperState(opts.instance, this.helperStateHTML.idleHTML);
                }

                // call any additional callbacks passed in via options
                if (options.dropZoneEnter && typeof options.dropZoneEnter === 'function') {
                    options.dropZoneEnter(this, opts);
                }
            },
            // files have left the DropZone
            dropZoneLeave: (opts) => {
                // remove any state classes
                this.resetBodyClass();

                // add DropZone enter class
                if (!opts.valid) {
                    window.requestAnimationFrame(() => {
                        this.$body.addClass(this.interactionClasses.dropZoneError);
                    });
                }

                // update helper text
                if (opts.valid) {
                    this.updateHelperState(opts.instance, this.helperStateHTML.windowEnterHTML);
                } else {
                    this.updateHelperState(opts.instance, this.helperStateHTML.idleHTML);
                }

                // call any additional callbacks passed in via options
                if (options.dropZoneLeave && typeof options.dropZoneLeave === 'function') {
                    options.dropZoneLeave(this, opts);
                }
            },
            // files have been dropped on the dropzone
            dropZoneDrop: (opts) => {
                // handle dropped files
                this.handleDropZoneDrop(opts.files, opts.node);

                // remove any state classes
                this.resetBodyClass();

                // add DropZone drop class
                window.requestAnimationFrame(() => {
                    this.$body.addClass(this.interactionClasses.dropZoneSuccess);
                });

                // update helper text
                this.updateHelperState(opts.instance, this.helperStateHTML.idleHTML);

                // call any additional callbacks passed in via options
                if (options.dropZoneDrop && typeof options.dropZoneDrop === 'function') {
                    options.dropZoneDrop();
                }
            },
            // files have been dropped on the window, but not the DropZone
            windowDrop: (opts) => {
                this.resetBodyClass();
                this.updateHelperState(opts.instance, this.helperStateHTML.idleHTML);
                if (options.windowDrop && typeof options.windowDrop === 'function') {
                    options.windowDrop();
                }
            },
            // files have been rejected
            filesRejected: (opts) => {
                // update validation
                this.updateDropZoneValidation(opts.error, opts.node);

                // remove any state classes
                this.resetBodyClass();

                // update helper text
                this.updateHelperState(opts.instance, this.helperStateHTML.idleHTML);

                // add error class
                window.requestAnimationFrame(() => {
                    this.$body.addClass(this.interactionClasses.dropZoneError);
                });

                // call any additional callbacks passed in via options
                if (options.filesRejected && typeof options.filesRejected === 'function') {
                    options.filesRejected();
                }
            }
        };
        this.eventPool = [];
        this.removeFileHandler = this.removeFileHandler.bind(this);
        this.nodeClasses = {
            dropzone: 'dropzone',
            wrapper: 'dropzone__file-wrapper',
            validation: 'dropzone__validation',
            inner: 'dropzone__inner',
            close: 'dropzone__close',
            error: 'dropzone__error',
            file: 'dropzone__file',
            meta: 'dropzone__meta',
            name: 'dropzone__name',
            type: 'dropzone__type',
            size: 'dropzone__size',
            thumbnail: 'dropzone__thumbnail'
        };
        this.interactionClasses = {
            windowEnter: 'dropzone-window-active',
            dropZoneEnter: 'dropzone-dropzone-active',
            dropZoneSuccess: 'dropzone-success',
            dropZoneError: 'dropzone-error'
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
            return new DropZone(this.options[index], new DropZoneValidator(this.options[index]));
        });
    }

    /**
     * Update dropzone helper node innerHTML
     * has a trivial template syntax for getting variables from the dropzone instance options object
     * <% foo %> will evaluate to --> instance.options.foo
     * @param instance
     * @param htmlString
     */
    updateHelperState (instance, htmlString) {
        const templateString = htmlString.match(/<%\s(\w*)\s%>/);

        if (!templateString) {
            this.helperStateHTML.node.innerHTML = htmlString;
        } else {
            const match = templateString[1];
            this.helperStateHTML.node.innerHTML = htmlString.replace(templateString[0], instance.options[match]);
        }
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
            this.clearDropZoneValidation(node);
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
        [...wrapper.querySelectorAll(`.${this.nodeClasses.close}`)].forEach(file => {
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
        const wrapper = node.querySelector(`.${this.nodeClasses.wrapper}`);
        const errorNode = `<p class="${this.nodeClasses.error}">${error}</p>`;

        // if a validation element doesn't exist, create one
        if (!validationNode) {
            validationNode = document.createElement('div');
            validationNode.className = this.nodeClasses.validation;
            // if we do not have a file wrapper just append the validation
            // to the DropZone node, otherwise insert before the file wrapper
            if (!wrapper) {
                node.appendChild(validationNode);
            } else {
                node.insertBefore(validationNode, wrapper);
            }
        }

        // create error message and update validation
        validationNode.innerHTML = errorNode;
    }

    /**
     * Clear validation text
     * @param node
     */
    clearDropZoneValidation (node) {
        const wrapper = node.querySelector(`.${this.nodeClasses.validation}`);

        wrapper && wrapper.parentNode.removeChild(wrapper);
    }

    /**
     * Remove files from DropZone instances
     * @param  {Event} event
     */
    removeFileHandler (event) {
        let file = null;
        let dropZone = null;
        const path = event.path ? event.path : DropZoneComponent.getEventPath(event.target);

        // grab the file id and DropZone id, this is neccessary in the
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
     * Create DropZone file HTML string
     * @param  {Object} file
     * @return {String}
     */
    createFileNode (file) {
        let thumb = `<div class="${this.nodeClasses.thumbnail}`;

        if (file.thumbnail) {
            // add a thumbnail if DropZone has returned one
            thumb += ` ${this.nodeClasses.thumbnail}--image" style="background-image: url(${file.thumbnail});"`;
        } else {
            // add icon class if we cannot get a file preview
            thumb += `"><i class="dropzone__file-icon icon icon-${this.mimeTyper.getIconClass(file.type)}"></i`;
        }

        thumb += '></div>';

        return `
            <div data-dropzone-file="${file.id}" class="${this.nodeClasses.file}">
                <div class="${this.nodeClasses.inner}">
                    <i class="${this.nodeClasses.close} icon icon-times-circle"></i>
                    ${thumb}
                    <div class="${this.nodeClasses.meta}">
                        <p class="${this.nodeClasses.name}">${file.name}</p>
                        <p class="${this.nodeClasses.size}">${file.size}</p>
                        <p class="${this.nodeClasses.type}">${file.type}</p>
                    </div>                
                </div>
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

            // store reference to dropzone__helper node
            this.helperStateHTML.node = node.querySelector(this.helperStateHTML.nodeSelector);
            this.helperStateHTML.idleHTML = this.helperStateHTML.node.innerHTML;

            // extend node attributes & defaults to build options
            options.push(_.extend({}, dropZoneAttrs, this.callbacks, this.defaults));
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
