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
    init () {
        // todo - fix callback refactor

        this.body = this.html.parentNode.body;
        this.$body = $(this.body);

        this.helperStateHtml = _.extend({}, {
            nodeSelector: '.dropzone__info',
            // this will be assigned when handling DropZone node
            helperNode: null,
            idleHtml: 'your files here or <a class="dropzone__browse" id="#">Browse Files</a>',
            windowEnterHtml: 'Drag your files here (max <% maxFiles %>)',
            dropZoneEnterHtml: 'Drop your files here'
        });

        this.defaults = {
            inputNodeId: '',
            showInputNode: false,
            passive: false,
            fileNodeDesc: true,
            fileNodeName: true,
            fileNodeSize: true,
            fileNodeType: true
        };

        this.callbacks = {
            windowEnter: this.handleWindowEnter.bind(this),
            windowLeave: this.handleWindowLeave.bind(this),
            dropZoneEnter: this.handleDropZoneEnter.bind(this),
            dropZoneLeave: this.handleDropzoneLeave.bind(this),
            dropZoneDrop: this.handleDropZoneDrop.bind(this),
            windowDrop: this.handleWindowDrop.bind(this),
            fileRemoved: this.handleFileRemoved.bind(this)
        };

        this.eventPool = [];
        this.removeFileHandler = this.removeFileHandler.bind(this);
        this.nodeClasses = {
            dropzone: 'dropzone',
            wrapper: 'dropzone__file-wrapper',
            validation: 'dropzone__validation',
            help: 'dropzone__help',
            browse: 'dropzone__browse',
            inner: 'dropzone__file-inner',
            close: 'dropzone__close',
            error: 'dropzone__error',
            file: 'dropzone__file',
            meta: 'dropzone__meta',
            name: 'dropzone__name',
            description: 'dropzone__description',
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
        // get all DropZone elements
        this.dropZoneInstances = [...this.html.querySelectorAll(`.${this.nodeClasses.dropzone}`)];
        // get DropZone options array
        this.options = this.buildInstanceOptions();
        // instantiate each DropZone with it's options
        this.dropZoneInstances = this.dropZoneInstances.map((node, index) => {
            // set node in options
            this.options[index].node = node;
            //set dropZone ID attr
            node.setAttribute('data-dropzone-id', index);
            // create an instance of the DropZone API
            const instance = new DropZone(
                this.options[index],
                new DropZoneValidator(DropZoneComponent.buildValidatorOptions(this.options[index]))
            );
            // if an input node selector has been passed in, add events and hide
            if (this.options[index].inputNodeId) {
                this.processInputNode(instance, this.options[index]);
            }

            // update helper state to overwrite helper Html if a custom value was passed
            // in as an option for the idlehtml
            this.updateHelperState(instance, this.options[index].idleHtml);
            // return instance
            return instance;
        });
    }

    /**
     * If an input node ID has been passed in, we'll take care of linking the DropZone
     * instance to this node
     *  - add change listener to hijack files
     *  - add click listener to `dropzone__browse` to leverage input's browse functionality
     *  - visually hide input node
     * @param {Object} instance
     * @param {Object} options
     */
    processInputNode (instance, options) {
        // todo - install the event hub here when it is complete for removing these handlers
        instance.inputNode = document.getElementById(options.inputNodeId);
        // add files to DropZone that are added to the corresponding input
        instance.inputNode.addEventListener('change', () => {
            this.addFileToDropZone(instance.inputNode.files, instance.getAttribute('data-dropzone-id'));
            // reset input node value, this will ensure our change event
            // fires each time we use the browse files functionality - even
            // if we try to add an identical value
            instance.inputNode.value = '';
        });
        // visually hide input

        if (!options.showInputNode) {
            instance.inputNode.style.display = 'none';
        }
    }

    /**
     * Adds the browse files functionality to our DropZone
     * @param {Object} instance
     */
    addBrowseFilesListener (instance) {
        instance.browseNode = instance.node.querySelector(`.${this.nodeClasses.browse}`);

        if (instance.browseNode) {
            instance.browseNode.addEventListener('click', event => {
                event.preventDefault();
                instance.inputNode.click();
            });
        }
    }

    /**
     * Update DropZone helper node innerHTML
     * has a trivial template syntax for getting variables from the DropZone instance options object
     * <% foo %> will evaluate to --> instance.options.foo
     * @param instance
     * @param htmlString
     */
    updateHelperState (instance, htmlString) {
        if (!instance.options.helperNode) {
            return;
        }

        const templateString = htmlString.match(/<%\s(\w*)\s%>/);

        if (!templateString) {
            instance.options.helperNode.innerHTML = htmlString;
        } else {
            const match = templateString[1];

            instance.options.helperNode.innerHTML = htmlString.replace(templateString[0], instance.options[match]);
        }

        // attach "browse files" listeners
        this.addBrowseFilesListener(instance);
    }

    /**
     * Create a file wrapper / update with dropped files
     * @param {Array} files
     * @param {Element} node
     * @param {Object} instance
     */
    handleDrop (files, node, instance) {
        let wrapper = node.querySelector(`.${this.nodeClasses.wrapper}`);

        // if we do not already have a wrapper, create one
        if (!wrapper) {
            wrapper = document.createElement('div');
            wrapper.className = this.nodeClasses.wrapper;
            node.appendChild(wrapper);
        }

        // update wrapper Html
        this.updateDropZoneFiles(files, instance, wrapper);
    }

    /**
     * Update DropZone Html
     * - remove validation node if we have one
     * - add / remove files Html
     * - remove wrapper if we have no files
     * @param {Array} files
     * @param {Element|boolean} wrapper
     * @param {Object} instance
     */
    updateDropZoneFiles (files, instance, wrapper = false) {
        const validation = instance.node.querySelector(`.${this.nodeClasses.validation}`);
        let fileNodeString = '';

        wrapper = wrapper ? wrapper : instance.node.querySelector(`.${this.nodeClasses.wrapper}`);

        // if we've got a drop we know we don't have any errors
        // clear any previous validation messages
        if (validation) {
            this.clearDropZoneValidation(instance.node);
        }

        // if there are no files we'll remove the wrapper
        if (!files.length) {
            if (wrapper) {
                wrapper.parentNode.removeChild(wrapper);
            }

            return;
        }

        // create file html string
        files.forEach(file => {
            fileNodeString += this.createFileNode(file, instance.options);
        });

        // update wrapper html
        wrapper.innerHTML = fileNodeString;
        [...wrapper.querySelectorAll(`.${this.nodeClasses.close}`)].forEach(file => {
            file.addEventListener('click', this.removeFileHandler);
        });
    }

    /**
     * Update DropZone validation Html
     * @param  {String} error
     * @param  {Object} instance
     */
    updateDropZoneValidation (error, instance) {
        let validationNode = instance.node.querySelector(`.${this.nodeClasses.validation}`);

        // if we are in passive mode we're handing this over to the developer installing the plugin
        // they can access validation data by using the filesRejected callback
        if (instance.options.passive) {
            return;
        }

        const errorNode = `<p class="${this.nodeClasses.error}">${error}</p>`;

        // if a validation element doesn't exist, create one
        if (!validationNode) {
            validationNode = document.createElement('div');
            validationNode.className = this.nodeClasses.validation;
            instance.node.insertBefore(validationNode, document.querySelector(`.${this.nodeClasses.help}`));
        }

        // create error message and update validation
        validationNode.innerHTML = errorNode;
    }

    /**
     * Throw a DropZone error, useful as a public method for manually triggering DropZone errors
     * example: throwing an error returned as a response from a server
     * @param {String} error
     * @param {Object} instance
     */
    throwValidationError (error, instance) {
        this.updateDropZoneValidation(error, instance);
        // update helper text
        this.updateHelperState(instance, instance.options.idleHtml);
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
                dropZone = node.getAttribute('data-dropzone-id');
            }
        });

        // remove file from DropZone instance
        const instance = this.getDropZoneById(dropZone);
        const wrapper = instance.node.querySelector(`.${this.nodeClasses.wrapper}`);

        instance.removeFile(file);
        // update Html
        this.updateDropZoneFiles(instance.getFiles(), instance, wrapper);
    }

    /**
     * Create DropZone file Html string
     * @param {Object} file
     * @param {Object} options
     * @return {String}
     */
    createFileNode (file, options) {
        const desc = file.description ? `<p class="${this.nodeClasses.description}">${file.description}</p>` : '',
            name = file.name ? `<p class="${this.nodeClasses.name}">${file.name}</p>` : '',
            size = file.size ? `<p class="${this.nodeClasses.size}">${file.size}</p>` : '',
            type = file.type ? `<p class="${this.nodeClasses.type}">${file.type}</p>` : '';

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
                        ${options.fileNodeName ? name : ''}
                        ${options.fileNodeDesc ? desc : ''}
                        ${options.fileNodeSize ? size : ''}
                        ${options.fileNodeType ? type : ''}
                    </div>                
                </div>
            </div>`.replace(/>\s+</g, '><');
    }

    /**
     * Handle DropZone windowEnter callback
     * @param {Object} data
     */
    handleWindowEnter (data) {
        if (data.valid) {
            this.updateHelperState(data.instance, data.instance.options.windowEnterHtml);
            DropZoneComponent.setDropZoneBodyClass(
                this.body,
                [this.interactionClasses.windowEnter]
            );
        } else {
            this.throwValidationError(data.text, data.instance);
            DropZoneComponent.setDropZoneBodyClass(
                this.body,
                [this.interactionClasses.windowEnter, this.interactionClasses.dropZoneError]
            );
        }

        // call any additional callbacks passed in via options
        if (this.options.windowEnter && typeof this.options.windowEnter === 'function') {
            this.options.windowEnter(data);
        }
    }

    /**
     * Handle DropZone windowLeave callback
     * @param {Object} data
     */
    handleWindowLeave (data)  {
        // reset body class
        DropZoneComponent.setDropZoneBodyClass(this.body);

        // update helper text
        this.updateHelperState(data.instance, data.instance.options.idleHtml);

        // update validation if there was any
        this.clearDropZoneValidation(data.instance.node);

        // call any additional callbacks passed in via options
        if (this.options.windowLeave && typeof this.options.windowLeave === 'function') {
            this.options.windowLeave(data);
        }
    }

    /**
     * Handle DropZone dropZoneEnter callback
     * @param {Object} data
     */
    handleDropZoneEnter (data) {
        // update helper text
        if (data.valid) {
            this.throwValidationError(data.text, data.instance);
            DropZoneComponent.setDropZoneBodyClass(
                this.body,
                [
                    this.interactionClasses.windowEnter,
                    this.interactionClasses.dropZoneEnter
                ]
            );
        } else {
            this.updateHelperState(data.instance, data.instance.options.idleHtml);
            DropZoneComponent.setDropZoneBodyClass(
                this.body,
                [
                    this.interactionClasses.windowEnter,
                    this.interactionClasses.dropZoneEnter,
                    this.interactionClasses.dropZoneError
                ]
            );
        }

        // call any additional callbacks passed in via options
        if (this.options.dropZoneEnter && typeof this.options.dropZoneEnter === 'function') {
            this.options.dropZoneEnter(data);
        }
    }

    /**
     * Handle DropZone dropZoneLeave callback
     * @param {Object} data
     */
    handleDropzoneLeave (data) {
        // update helper text
        if (data.valid) {
            this.updateHelperState(data.instance, data.instance.options.windowEnterHtml);
            DropZoneComponent.setDropZoneBodyClass(
                this.body,
                [this.interactionClasses.windowEnter]
            );
        } else {
            this.updateHelperState(data.instance, data.instance.options.idleHtml);
            DropZoneComponent.setDropZoneBodyClass(
                this.body,
                [this.interactionClasses.windowEnter, this.interactionClasses.dropZoneError]
            );
        }

        // call any additional callbacks passed in via options
        if (this.options.dropZoneLeave && typeof this.options.dropZoneLeave === 'function') {
            this.options.dropZoneLeave(data);
        }
    }

    /**
     * Handle DropZone dropZoneEnter callback
     * @param {Object} data
     */
    handleDropZoneDrop (data) {
        // handle dropped files
        this.handleDrop(data.files, data.node, data.instance);

        if (data.valid) {
            DropZoneComponent.setDropZoneBodyClass(
                this.body,
                [this.interactionClasses.dropZoneSuccess]
            );
        } else {
            DropZoneComponent.setDropZoneBodyClass(this.body);
        }

        // update helper text
        this.updateHelperState(data.instance, data.instance.options.idleHtml);

        // call any additional callbacks passed in via options
        if (this.options.dropZoneDrop && typeof this.options.dropZoneDrop === 'function') {
            this.options.dropZoneDrop(data);
        }
    }

    /**
     * Handle DropZone windowDrop callback
     * @param {Object} data
     */
    handleWindowDrop (data) {
        // reset body class
        DropZoneComponent.setDropZoneBodyClass(this.body);

        // handle dropped files
        this.handleDrop(data.files, data.node, data.instance);

        // update helper text
        this.updateHelperState(data.instance, data.instance.options.idleHtml);

        if (this.options.windowDrop && typeof this.options.windowDrop === 'function') {
            this.options.windowDrop(data);
        }
    }

    /**
     * Handle DropZone fileRemoved callback
     * @param {Object} data
     */
    handleFileRemoved (data) {
        // reset body class
        DropZoneComponent.setDropZoneBodyClass(this.body);

        // call any additional callbacks passed in via options
        if (this.options.fileRemoved && typeof this.options.fileRemoved === 'function') {
            this.options.fileRemoved(data);
        }
    }

    /**
     * Create options array from dropzone nodes
     * @return {Array}
     */
    buildInstanceOptions () {
        return this.dropZoneInstances.reduce((options, node) => {
            const dropZoneAttrs = DropZoneComponent.getDropZoneAttrs(node);
            const helperState = _.assign({}, this.helperStateHtml);

            // store reference to dropzone__helper node
            helperState.helperNode = node.querySelector(helperState.nodeSelector);
            // if we haven't got any idle Html passed in as an option
            // we'll set it to the current innerHTML of the helper node

            if (!dropZoneAttrs.idleHtml && helperState.helperNode) {
                helperState.idleHtml = helperState.helperNode.innerHTML;
            }

            // extend node attributes & defaults to build options
            options.push(_.extend({}, this.defaults, helperState, dropZoneAttrs, this.callbacks));
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
                // transform hyphen separated attr to DropZone camelCase option
                const option = name.replace(/data-dropzone-/, '');

                if (option === 'whitelist') {
                    value = value.split(' ');
                }

                // parse bools
                if (value === 'false') {
                    value = false;
                } else if (value === 'true') {
                    value = true;
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
    getDropZoneById (id) {
        return this.dropZoneInstances[id];
    }

    /**
     * Manually add files to the DropZone API
     * @param {FileList} files
     * @param {String} id
     * @param {Object} meta
     */
    addFileToDropZone (files, id, meta = {}) {
        this.getDropZoneById(id).addFiles(files, meta);
    }

    /**
     * Reset the DropZone API instance
     * @param {DropZone} instance
     */
    resetDropZoneInstance (instance) {
        instance.reset();
        this.updateDropZoneFiles(instance.getFiles(), instance);
    }

    /**
     * Validate files against a DropZone instance
     * @param {FileList} files
     * @param {String} id
     */
    validateFiles (files, id) {
        const dropZone = this.getDropZoneById(id);
        return dropZone.validator.validate(
            files,
            // we need this subtraction because the validateFiles public API method will be invoked _after_
            // a file has been dropped on the DropZone
            (dropZone.getFiles().length - files.length),
            dropZone.size
        );
    }

    /**
     * Reset all / selected DropZones
     * @param {Number|boolean} id
     */
    reset (id = null) {
        if (id === null) {
            this.dropZoneInstances.forEach(this.resetDropZoneInstance.bind(this));
        } else {
            this.resetDropZoneInstance(this.dropZoneInstances[id]);
        }

        DropZoneComponent.setDropZoneBodyClass(this.body);
    }

    /**
     * Build options object for the DropZoneValidator
     * This allows us to define the validator options in the HTML
     * @param {Object} options
     * @returns {Object} validator options
     */
    static buildValidatorOptions (options) {
        const validatorOptions = { validationText: {} };
        return Object.keys(options).reduce((validatorOptions, option) => {
            switch (option) {
                case 'validationMaxFiles':
                case 'validationWhitelist':
                case 'validationMaxSize':
                case 'validationUnknown':
                    // todo - this could do with perhaps being re-thought about, this seems overly complicated
                    // this is converting 'validationMaxFiles' -> 'maxFiles' so the validator options can be
                    // set in the html e.g. 'data-validation-max-files="Too many files"'
                    let newOption = option.replace('validation', '');
                    newOption = newOption[0].toLowerCase() + newOption.slice(1);
                    validatorOptions.validationText[newOption] = options[option];
                    break;
                case 'maxFiles':
                case 'maxSize':
                case 'whitelist':
                    validatorOptions[option] = options[option];
                    break;
            }

            return validatorOptions;
        }, validatorOptions);
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

    /**
     * Reset body dropZone classes and add new state
     * @param {Element} body
     * @param {Array} classNames
     * @return {String} new body className
     */
    static setDropZoneBodyClass (body, classNames = []) {
        const cleanBodyClass = body.className.replace(/dropzone-[a-zA-Z0-9\-]+/g, '').trim();

        body.className = classNames.length ? `${cleanBodyClass} ${classNames.join(' ')}` : cleanBodyClass;
    }
}

module.exports = DropZoneComponent;
