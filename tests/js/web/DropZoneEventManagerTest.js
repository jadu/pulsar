import DropZoneEventManager from '../../../js/DropZone/DropZoneEventManager';

describe('DropZoneEventManager', () => {
    let eventManager;
    let $node;

    beforeEach(() => {
        $node = $('<div></div>');
        eventManager = new DropZoneEventManager();
    });

    describe('add()', () => {
        it('should add an event object to the pool', () => {
            const handler = sinon.spy();

            eventManager.pool = [];
            eventManager.add($node[0], 'foo', handler);
            expect(eventManager.pool).to.deep.equal([{
                node: $node[0],
                event: 'foo',
                handler: handler
            }]);
        });
    });

    describe('removeAll()', () => {
        it('should empty the pool', () => {
            eventManager.pool = [{ node: $node[0] }, { node: $node[0] }, { node: $node[0] }];
            eventManager.removeAll();
            expect(eventManager.pool.length).to.equal(0);
        });
    });

    describe('preventer()', () => {
        it('should call prevent default on an event', () => {
            const event = { preventDefault: sinon.spy() };

            eventManager.preventer(event);
            expect(event.preventDefault).to.have.been.calledOnce;
        });
    });
});
