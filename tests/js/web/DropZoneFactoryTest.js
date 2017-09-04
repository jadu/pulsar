import DropZoneFactory from '../../../js/DropZone/DropZoneFactory';
import DropZone from '../../../js/DropZone/DropZone';

describe('DropZoneFactory', () => {
    describe('create()', () => {
        it('should return a DropZone instance', () => {
            expect(DropZoneFactory.create({}, {}, {})).to.be.instanceOf(DropZone);
        });
    });
});
