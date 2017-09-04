import DropZoneBrowseNodeManager from '../../../js/DropZone/DropZoneBrowseNodeManager';

describe('DropZoneBrowseNodeManager', () => {
    let manager;
    let nodeStub;

    beforeEach(() => {
        nodeStub = {
            addEventListener: sinon.spy(),
            removeEventListener: sinon.spy()
        };
        manager = new DropZoneBrowseNodeManager(nodeStub);
    });

    describe('constructor()', () => {
        it('should return a manager object', () => {
            expect(manager).to.deep.equal({
                node: nodeStub,
                events: []
            });
        });

        it('should add a click event to the node if we have one', () => {
            expect(nodeStub.addEventListener).to.have.been.calledOnce;
            expect(nodeStub.addEventListener).to.have.been.calledWith('click');
        });

        it('should not add a click event to the node if we do not have one', () => {
            nodeStub.addEventListener.reset();
            manager = new DropZoneBrowseNodeManager();

            expect(nodeStub.addEventListener).to.have.not.been.called;
        });

        it('should prevent the default behaviour of the click', () => {
            const node = document.createElement('div');
            const click = new Event('click');

            sinon.stub(click, 'preventDefault');
            manager = new DropZoneBrowseNodeManager(node);
            node.dispatchEvent(click);

            expect(click.preventDefault).to.have.been.calledOnce;
        });
    });

    describe('update()', () => {
        it('should update the existing node reference', () => {
            const newRef = document.createElement('span');

            manager.update(newRef);

            expect(manager.node).to.deep.equal(newRef);
        });

        it('should prevent the default behaviour of the click', () => {
            const node = document.createElement('div');
            const click = new Event('click');

            sinon.stub(click, 'preventDefault');
            manager.update(node);
            node.dispatchEvent(click);

            expect(click.preventDefault).to.have.been.calledOnce;
        });
    });

    describe('getNode()', () => {
        it('should return browseNode ref', () => {
            expect(manager.getNode()).to.deep.equal(nodeStub);
        });
    });

    describe('addEvent()', () => {
        it('should store the event', () => {
            manager.addEvent('click', 'handler');

            expect(manager.events).to.deep.equal([{
                event: 'click',
                handler: 'handler',
                active: true
            }]);
        });

        it('should attach an event', () => {
            manager.addEvent('click', 'handler');

            expect(nodeStub.addEventListener).to.have.been.calledWith('click', 'handler');
        });
    });

    describe('disableEvents()', () => {
        beforeEach(() => {
            manager.events = [
                { event: 'click', handler: 'foo', active: true },
                { event: 'punch', handler: 'bar', active: true }
            ];
        });

        it('should remove active events and update events state', () => {
            manager.disableEvents();

            expect(nodeStub.removeEventListener).to.have.been.calledTwice;
            expect(nodeStub.removeEventListener).to.have.been.calledWith('click', 'foo');
            expect(nodeStub.removeEventListener).to.have.been.calledWith('punch', 'bar');
            expect(manager.events).to.deep.equal([
                { event: 'click', handler: 'foo', active: false },
                { event: 'punch', handler: 'bar', active: false }
            ]);
        });
    });

    describe('enableEvents()', () => {
        beforeEach(() => {
            manager.events = [
                { event: 'click', handler: 'foo', active: false },
                { event: 'punch', handler: 'bar', active: false }
            ];
        });

        it('should attach active events and update events state', () => {
            manager.enableEvents();

            // called 3 times here to account for the initial preventDefault handler
            expect(nodeStub.addEventListener).to.have.been.calledThrice;
            expect(nodeStub.addEventListener).to.have.been.calledWith('click', 'foo');
            expect(nodeStub.addEventListener).to.have.been.calledWith('punch', 'bar');
            expect(manager.events).to.deep.equal([
                { event: 'click', handler: 'foo', active: true },
                { event: 'punch', handler: 'bar', active: true }
            ]);
        });
    });
});
