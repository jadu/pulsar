import DropZoneComponent from '../../../js/DropZone/DropZoneComponent';
import DropZoneOptionsManager from '../../../js/DropZone/DropZoneOptionsManager';
import DropZoneInstanceManager from '../../../js/DropZone/DropZoneInstanceManager';
import DropZoneComponentUtils from '../../../js/DropZone/DropZoneComponentUtils';
import DropZoneComponentValidation from '../../../js/DropZone/DropZoneComponentValidationManager';
import DropZoneBodyClassManager from '../../../js/DropZone/DropZoneBodyClassManager';

describe('DropZoneComponent', () => {
    let $html;
    let $fileInput;
    let $dropZone;
    let $browse;
    let $info;
    let dropZoneComponent;
    let instanceManager;
    let optionsManager;
    let utils;
    let validation;
    let classManager;

    beforeEach(() => {
        $html = $(document.documentElement);
        $fileInput = $('<input type="text" id="fileInput">').appendTo($html);
        $dropZone = $('<div data-dropzone-id="0" class="dropzone"></div>').appendTo($html);
        $info = $('<p class="info"></p>').appendTo($dropZone);
        $browse = $('<span class="browse">browse</span>').appendTo($info);

        instanceManager = sinon.createStubInstance(DropZoneInstanceManager);
        optionsManager = sinon.createStubInstance(DropZoneOptionsManager);
        utils = sinon.createStubInstance(DropZoneComponentUtils);
        validation = sinon.createStubInstance(DropZoneComponentValidation);
        classManager = sinon.createStubInstance(DropZoneBodyClassManager);

        instanceManager.getInstance.returns({ node: $dropZone[0], info: $info[0] });
        instanceManager.getFiles.returns(['file']);
        optionsManager.getInstanceOptions.returns({
            nodeClasses: {
                wrapper: 'wrapper',
                browse: 'browse'
            }
        });
        utils.createFileNode.returns('<div class="file"></div>');

        dropZoneComponent = new DropZoneComponent(
            $html,
            '.dropzone',
            instanceManager,
            optionsManager,
            utils,
            validation,
            classManager
        );
    });

    afterEach(() => {
        $html.html('');
    });

    describe('init()', () => {
        let inputStub;
        let browseStub;

        beforeEach(() => {
            $('<div class="dropzone test"></div>').appendTo($html);
            $('<div class="dropzone test"></div>').appendTo($html);
            $('<div class="dropzone test"></div>').appendTo($html);
            $('<div class="dropzone test"></div>').appendTo($html);

            inputStub = sinon.stub(dropZoneComponent, 'processInputNode');
            browseStub = sinon.stub(dropZoneComponent, 'processBrowseNode');
            instanceManager.getInstance.returns([
                { id: 0 },
                { id: 1, input: {}, options: {}, browse: {} }
            ]);
        });

        afterEach(() => {
            $html.find('.dropzone.test').remove();
            inputStub.reset();
            browseStub.reset();
        });

        it('should build the base component options', () => {
            dropZoneComponent.init();
            expect(optionsManager.buildComponentOptions).to.have.been.calledOnce;
        });

        it('should create an instance for each node matching the selector', () => {
            dropZoneComponent.init();
            expect(instanceManager.addInstance).to.have.callCount(5);
        });

        // partial stub
        it('should process each instances input node', () => {
            dropZoneComponent.init();
            expect(inputStub).to.have.been.calledOnce;
        });

        // partial stub
        it('should process each instances browse node', () => {
            dropZoneComponent.init();
            expect(browseStub).to.have.been.calledOnce;
        });
    });

    describe('processInputNode()', () => {
        const options = { showInputNode: false, inputNodeId: 'fileInput' };

        it('should hide the input if specified in options', () => {
            dropZoneComponent.processInputNode($fileInput[0], 0, options.showInputNode);
            expect($fileInput.css('display')).to.equal('none');
        });

        it('should invoke the addFiles method on the file manager on change', /*() => {
            const change = new Event('change');

            dropZoneComponent.processInputNode($fileInput[0], 0, options.showInputNode);
            $fileInput[0].dispatchEvent(change);

            expect(instanceManager.addFiles).to.have.been.calledOnce;
            expect(instanceManager.calledWith(0, { persist: true })).to.be.true;
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

    describe('updateInfoState()', () => {
        let browseStub;

        beforeEach(() => {
            browseStub = sinon.stub(dropZoneComponent, 'processBrowseNode');
        });

        afterEach(() => {
            browseStub.reset();
        });

        it('should update the info node', () => {
            dropZoneComponent.updateInfoState(0, 'foo');
            expect($info.html()).to.equal('foo');
        });

        // partial stub
        it('should re-attach the Browse Files handler', () => {
            dropZoneComponent.updateInfoState(0, '<span class="browse"></span>');
            expect(browseStub).to.have.been.calledOnce;
        });
    });

    describe('updateDropZoneFiles()', () => {
        it('should create a file wrapper if one does not exist', () => {
            dropZoneComponent.updateDropZoneFiles(0);
            expect($dropZone.find('.wrapper').length).to.equal(1);
        });

        it('should remove any validation messages', () => {
            dropZoneComponent.updateDropZoneFiles(0);
            expect(validation.clear).to.have.been.calledOnce;
        });

        it('should remove the wrapper if there are no files', () => {
            $('<div class="wrapper"></div>').appendTo($dropZone);
            instanceManager.getFiles.returns([]);
            dropZoneComponent.updateDropZoneFiles(0);
            expect($dropZone.find('.wrapper').length).to.equal(0);
        });

        it('should update the wrapper html with the files', () => {
            dropZoneComponent.updateDropZoneFiles(0);
            expect($dropZone.find('.wrapper').html()).to.equal('<div class="file"></div>');
        });

        it('should add the remove file handler to the files');
    });

    describe('throwValidationError()', () => {
        let partialStub;

        beforeEach(() => {
            partialStub = sinon.stub(dropZoneComponent, 'updateInfoState');
        });

        afterEach(() => {
            partialStub.reset();
        });

        it('should update the validation', () => {
            instanceManager.getInstance.returns({
                node: $dropZone[0],
                info: $info[0]
            });

            optionsManager.getInstanceOptions.returns({
                passive: 'passive',
                nodeClasses: {
                    validation: 'validation',
                    error: 'error'
                }
            });

            dropZoneComponent.throwValidationError('foo', 0);
            expect(validation.update).to.have.been.calledOnce;
            expect(validation.update.calledWith(
                'foo',
                $dropZone[0],
                $info[0],
                'validation',
                'error',
                'passive'
            )).to.be.true;
        });

        // partial stub
        it('should update info node with the idleHtml option', () => {
            optionsManager.getInstanceOptions.returns({
                idleHtml: 'foo',
                nodeClasses: {}
            });
            dropZoneComponent.throwValidationError('foo', 0);
            expect(partialStub).to.have.been.calledOnce;
            partialStub.reset();
        });
    });

    describe('removeFile()', () => {
        let event;
        let $file;
        let $wrapper;
        let updateStub;

        beforeEach(() => {
            updateStub = sinon.stub(dropZoneComponent, 'updateDropZoneFiles');
            instanceManager.getFiles.returns([]);
            $wrapper = $('<div class="wrapper"></div>').appendTo($dropZone);
            $file = $('<div data-dropzone-file="0" class="file"></div>').appendTo($wrapper);
            event = { target: $file[0] };
            utils.getEventPath.returns([ $file[0], $dropZone[0] ]);
        });

        afterEach(() => {
            updateStub.reset();
        });

        it('should call remove file on the instance manager', () => {
            dropZoneComponent.removeFile(event);
            expect(instanceManager.removeFile).to.have.been.calledOnce;
        });

        // partial stub
         it('should update the DropZoneComponent files html', () => {
            dropZoneComponent.removeFile(event);
            expect(updateStub).to.have.been.calledOnce;
        });
    });

    describe('handleWindowEnter()', () => {
        let infoStub;
        let throwStub;

        beforeEach(() => {
            infoStub = sinon.stub(dropZoneComponent, 'updateInfoState');
            throwStub = sinon.stub(dropZoneComponent, 'throwValidationError');
        });

        afterEach(() => {
            infoStub.reset();
            throwStub.reset();
        });

        describe('valid', () => {
            const args = {
                valid: true,
                text: 'foo',
                instance: {
                    options: {
                        interactionClasses: {}
                    },
                    getDropZoneId: () => 0
                }
            };

            // partial stub
            it('should update info state for valid files', () => {
                dropZoneComponent.handleWindowEnter(args);
                expect(infoStub).to.have.been.calledOnce;
            });

            it('should call the class manager for valid files', () => {
                dropZoneComponent.handleWindowEnter(args);
                expect(classManager.update).to.have.been.calledOnce;
            });
        });

        describe('invalid', () => {
            const args = {
                valid: false,
                text: 'foo',
                instance: {
                    options: {
                        interactionClasses: {}
                    },
                    getDropZoneId: () => 0
                }
            };

            // partial stub
            it('should throw a validation error for invalid files', () => {
                dropZoneComponent.handleWindowEnter(args);
                expect(throwStub).to.have.been.calledOnce;
            });

            it('should call the class manager for valid files', () => {
                dropZoneComponent.handleWindowEnter(args);
                expect(classManager.update).to.have.been.calledOnce;
            });
        });

        it('should call the custom callback if passed in', () => {
            const args = {
                valid: false,
                text: 'foo',
                instance: {
                    options: {
                        interactionClasses: {},
                        customWindowEnter: sinon.spy()
                    },
                    getDropZoneId: () => 0
                }
            };

            dropZoneComponent.handleWindowEnter(args);
            expect(args.instance.options.customWindowEnter).to.have.been.calledOnce;
        });
    });

    describe('handleWindowLeave()', () => {
        let infoStub;

        beforeEach(() => {
            infoStub = sinon.stub(dropZoneComponent, 'updateInfoState');
        });

        afterEach(() => {
            infoStub.reset();
        });

        const args = {
            instance: {
                options: {
                    interactionClasses: {},
                    nodeClasses: {}
                },
                getDropZoneId: () => 0
            }
        };

        // partial stub
        it('should update info state for valid files', () => {
            dropZoneComponent.handleWindowLeave(args);
            expect(infoStub).to.have.been.calledOnce;
        });

        it('should call the class manager for valid files', () => {
            dropZoneComponent.handleWindowLeave(args);
            expect(classManager.update).to.have.been.calledOnce;
        });

        it('should call the custom callback if passed in', () => {
            const args = {
                instance: {
                    options: {
                        interactionClasses: {},
                        nodeClasses: {},
                        customWindowLeave: sinon.spy()
                    },
                    getDropZoneId: () => 0
                }
            };

            dropZoneComponent.handleWindowLeave(args);
            expect(args.instance.options.customWindowLeave).to.have.been.calledOnce;
        });
    });

    describe('handleDropZoneEnter()', () => {
        let infoStub;
        let throwStub;

        beforeEach(() => {
            infoStub = sinon.stub(dropZoneComponent, 'updateInfoState');
            throwStub = sinon.stub(dropZoneComponent, 'throwValidationError');
        });

        afterEach(() => {
            infoStub.reset();
            throwStub.reset();
        });

        describe('valid', () => {
            const args = {
                valid: true,
                text: 'foo',
                instance: {
                    options: {
                        interactionClasses: {}
                    },
                    getDropZoneId: () => 0
                }
            };

            // partial stub
            it('should update info state for valid files', () => {
                dropZoneComponent.handleDropZoneEnter(args);
                expect(infoStub).to.have.been.calledOnce;
            });

            it('should call the class manager for valid files', () => {
                dropZoneComponent.handleDropZoneEnter(args);
                expect(classManager.update).to.have.been.calledOnce;
            });
        });

        describe('invalid', () => {
            const args = {
                valid: false,
                text: 'foo',
                instance: {
                    options: {
                        interactionClasses: {}
                    },
                    getDropZoneId: () => 0
                }
            };

            // partial stub
            it('should throw a validation error for invalid files', () => {
                dropZoneComponent.handleDropZoneEnter(args);
                expect(throwStub).to.have.been.calledOnce;
            });

            it('should call the class manager for valid files', () => {
                dropZoneComponent.handleDropZoneEnter(args);
                expect(classManager.update).to.have.been.calledOnce;
            });
        });

        it('should call the custom callback if passed in', () => {
            const args = {
                valid: false,
                text: 'foo',
                instance: {
                    options: {
                        interactionClasses: {},
                        customDropZoneEnter: sinon.spy()
                    },
                    getDropZoneId: () => 0
                }
            };

            dropZoneComponent.handleDropZoneEnter(args);
            expect(args.instance.options.customDropZoneEnter).to.have.been.calledOnce;
        });
    });

    describe('handleDropzoneLeave()', () => {
        let infoStub;
        let throwStub;

        beforeEach(() => {
            infoStub = sinon.stub(dropZoneComponent, 'updateInfoState');
            throwStub = sinon.stub(dropZoneComponent, 'throwValidationError');
        });

        afterEach(() => {
            infoStub.reset();
            throwStub.reset();
        });

        describe('valid', () => {
            const args = {
                valid: true,
                text: 'foo',
                instance: {
                    options: {
                        interactionClasses: {}
                    },
                    getDropZoneId: () => 0
                }
            };

            // partial stub
            it('should update info state for valid files', () => {
                dropZoneComponent.handleDropzoneLeave(args);
                expect(infoStub).to.have.been.calledOnce;
            });

            it('should call the class manager for valid files', () => {
                dropZoneComponent.handleDropzoneLeave(args);
                expect(classManager.update).to.have.been.calledOnce;
            });
        });

        describe('invalid', () => {
            const args = {
                valid: false,
                text: 'foo',
                instance: {
                    options: {
                        interactionClasses: {}
                    },
                    getDropZoneId: () => 0
                }
            };

            // partial stub
            it('should throw a validation error for invalid files', () => {
                dropZoneComponent.handleDropzoneLeave(args);
                expect(throwStub).to.have.been.calledOnce;
            });

            it('should call the class manager for valid files', () => {
                dropZoneComponent.handleDropzoneLeave(args);
                expect(classManager.update).to.have.been.calledOnce;
            });
        });

        it('should call the custom callback if passed in', () => {
            const args = {
                valid: false,
                text: 'foo',
                instance: {
                    options: {
                        interactionClasses: {},
                        customDropZoneLeave: sinon.spy()
                    },
                    getDropZoneId: () => 0
                }
            };

            dropZoneComponent.handleDropzoneLeave(args);
            expect(args.instance.options.customDropZoneLeave).to.have.been.calledOnce;
        });
    });

    describe('handleDropZoneDrop()', () => {
        let infoStub;
        let throwStub;
        let updateFilesStub;

        beforeEach(() => {
            infoStub = sinon.stub(dropZoneComponent, 'updateInfoState');
            throwStub = sinon.stub(dropZoneComponent, 'throwValidationError');
            updateFilesStub = sinon.stub(dropZoneComponent, 'updateDropZoneFiles');
        });

        afterEach(() => {
            infoStub.reset();
            throwStub.reset();
            updateFilesStub.reset();
        });

        describe('valid', () => {
            const args = {
                files: [],
                valid: true,
                text: 'foo',
                instance: {
                    options: {
                        interactionClasses: {}
                    },
                    getDropZoneId: () => 0
                }
            };

            // partial stub
            it('should update files for valid files', () => {
                dropZoneComponent.handleDropZoneDrop(args);
                expect(updateFilesStub).to.have.been.calledOnce;
            });

            it('should call the class manager for valid files', () => {
                dropZoneComponent.handleDropZoneDrop(args);
                expect(classManager.update).to.have.been.calledOnce;
            });
        });

        describe('invalid', () => {
            const args = {
                files: [],
                valid: false,
                text: 'foo',
                instance: {
                    options: {
                        interactionClasses: {}
                    },
                    getDropZoneId: () => 0,
                    getSupportsDataTransfer: () => false
                }
            };

            // partial stub
            it('should throw a validation error if dataTransfer is not supported', () => {
                dropZoneComponent.handleDropZoneDrop(args);
                expect(throwStub).to.have.been.calledOnce;
            });

            it('should throw a validation error if we have files that have a persist prop', () => {
                const args = {
                    files: [{ meta: { persist: true } }],
                    valid: false,
                    text: 'foo',
                    instance: {
                        options: {
                            interactionClasses: {}
                        },
                        getDropZoneId: () => 0,
                        getSupportsDataTransfer: () => true
                    }
                };

                dropZoneComponent.handleDropZoneDrop(args);
                expect(throwStub).to.have.been.calledOnce;
            });

            it('should clear validation if we are not persisting', () => {
                const args = {
                    files: [],
                    valid: false,
                    text: 'foo',
                    instance: {
                        options: {
                            interactionClasses: {},
                            nodeClasses: {}
                        },
                        getDropZoneId: () => 0,
                        getSupportsDataTransfer: () => true
                    }
                };

                dropZoneComponent.handleDropZoneDrop(args);
                expect(validation.clear).to.have.been.calledOnce;
            });

            it('should call the class manager for valid files', () => {
                dropZoneComponent.handleDropZoneDrop(args);
                expect(classManager.update).to.have.been.calledOnce;
            });

        });

        it('should update info state for valid files', () => {
            const args = {
                files: [],
                valid: false,
                text: 'foo',
                instance: {
                    options: {
                        interactionClasses: {},
                        nodeClasses: {}
                    },
                    getDropZoneId: () => 0,
                    getSupportsDataTransfer: () => true
                }
            };

            dropZoneComponent.handleDropZoneDrop(args);
            expect(infoStub).to.have.been.calledOnce;
        });

        it('should call the custom callback if passed in', () => {
            const args = {
                files: [],
                valid: false,
                text: 'foo',
                instance: {
                    options: {
                        interactionClasses: {},
                        nodeClasses: {},
                        customDropZoneDrop: sinon.spy()
                    },
                    getDropZoneId: () => 0,
                    getSupportsDataTransfer: () => true
                }
            };

            dropZoneComponent.handleDropZoneDrop(args);
            expect(args.instance.options.customDropZoneDrop).to.have.been.calledOnce;
        });
    });

    describe('handleWindowDrop()', () => {
        let infoStub;
        let throwStub;
        let updateFilesStub;

        const args = {
            instance: {
                options: {
                    interactionClasses: {},
                    nodeClasses: {}
                },
                getDropZoneId: () => 0,
                getSupportsDataTransfer: () => true
            }
        };

        beforeEach(() => {
            infoStub = sinon.stub(dropZoneComponent, 'updateInfoState');
            throwStub = sinon.stub(dropZoneComponent, 'throwValidationError');
            updateFilesStub = sinon.stub(dropZoneComponent, 'updateDropZoneFiles');
        });

        afterEach(() => {
            infoStub.reset();
            throwStub.reset();
            updateFilesStub.reset();
        });

        it('should call the class manager for valid files', () => {
            dropZoneComponent.handleWindowDrop(args);
            expect(classManager.update).to.have.been.calledOnce;
        });

        // partial stub
        it('should update files for valid files', () => {
            dropZoneComponent.handleWindowDrop(args);
            expect(updateFilesStub).to.have.been.calledOnce;
        });

        // partial stub
        it('should update info state for valid files', () => {
            dropZoneComponent.handleWindowDrop(args);
            expect(infoStub).to.have.been.calledOnce;
        });

        it('should clear validation if we are not persisting', () => {
            dropZoneComponent.handleWindowDrop(args);
            expect(validation.clear).to.have.been.calledOnce;
        });

        it('should call the custom callback if passed in', () => {
            const args = {
                instance: {
                    options: {
                        interactionClasses: {},
                        nodeClasses: {},
                        customWindowDrop: sinon.spy()
                    },
                    getDropZoneId: () => 0,
                    getSupportsDataTransfer: () => true
                }
            };

            dropZoneComponent.handleWindowDrop(args);
            expect(args.instance.options.customWindowDrop).to.have.been.calledOnce;
        });

    });

    describe('handleFileRemoved()', () => {
        const args = {
            instance: {
                options: {}
            }
        };

        it('should call the class manager for valid files', () => {
            dropZoneComponent.handleFileRemoved(args);
            expect(classManager.update).to.have.been.calledOnce;
        });

        it('should call the custom callback if passed in', () => {
            const args = {
                instance: {
                    options: {
                        customFileRemoved: sinon.spy()
                    }
                }
            };

            dropZoneComponent.handleFileRemoved(args);
            expect(args.instance.options.customFileRemoved).to.have.been.calledOnce;
        });
    });

    describe('validateFiles()', () => {
        it('should call the validation manager', () => {
            dropZoneComponent.validateFiles([], 0);
            expect(instanceManager.validateFiles).to.have.been.calledOnce;
            expect(instanceManager.validateFiles.calledWith([], 0)).to.be.true;
        });

        it('should return a validation object', () => {
            instanceManager.validateFiles.returns('foo');
            expect(dropZoneComponent.validateFiles([], 0)).to.equal('foo');
        });
    });

    describe('reset()', () => {
        let updateStub;
        let filesStub;

        beforeEach(() => {
            instanceManager.getInstance.returns([{ id: 0 }, { id: 1 }]);
            updateStub = sinon.stub(dropZoneComponent, 'updateDropZoneFiles');
            filesStub = sinon.stub(dropZoneComponent, 'updateInfoState');
        });

        afterEach(() => {
            updateStub.reset();
            filesStub.reset();
        });

        // partial stub
        it('should reset a single instance if an ID is passed in', () => {
            dropZoneComponent.reset(1);
            expect(instanceManager.resetInstance).to.have.been.calledOnce;
            expect(instanceManager.resetInstance.calledWith(1)).to.be.true;
            expect(updateStub).to.have.been.calledOnce;
            expect(filesStub).to.have.been.calledOnce;
        });

        // partial stub
        it('should reset all instances if no ID is passed in', () => {

        });
    });

    describe('addFileToDropZone()', () => {
        it('should call add files on the instance manager', () => {
            dropZoneComponent.addFilesToDropZone([], 0);
            expect(instanceManager.addFiles).to.have.been.calledOnce;
        });
    });

    describe('getFilesFromDropZone()', () => {
        it('should call get files on the instance manager', () => {
            dropZoneComponent.getFilesFromDropZone(0, 0);
            expect(instanceManager.getFiles).to.have.been.calledOnce;
        });
    });

    describe('getInstanceIdleHtml()', () => {
        it('should get idleHtml from options manager', () => {
            dropZoneComponent.getInstanceIdleHtml(0);
            expect(optionsManager.getInstanceOption).to.have.been.calledOnce;
            expect(optionsManager.getInstanceOption.calledWith(0, 'idleHtml')).to.be.true;
        });
    });

    describe('getInstanceWindowEnterHtml()', () => {
        it('should get idleHtml from options manager', () => {
            dropZoneComponent.getInstanceWindowEnterHtml(0);
            expect(optionsManager.getInstanceOption).to.have.been.calledOnce;
            expect(optionsManager.getInstanceOption.calledWith(0, 'windowEnterHtml')).to.be.true;
        });
    });

    describe('getInstanceDropZoneEnterHtml()', () => {
        it('should get idleHtml from options manager', () => {
            dropZoneComponent.getInstanceDropZoneEnterHtml(0);
            expect(optionsManager.getInstanceOption).to.have.been.calledOnce;
            expect(optionsManager.getInstanceOption.calledWith(0, 'dropZoneEnterHtml')).to.be.true;
        });
    });

    describe('getSupportsDataTransferItems()', () => {
        it('should get data support from instance manager', () => {
            dropZoneComponent.getSupportsDataTransferItems(0);
            expect(instanceManager.getSupportsDataTransfer).to.have.been.calledOnce;
        });
    });
});
