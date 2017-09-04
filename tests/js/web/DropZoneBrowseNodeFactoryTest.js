import DropZoneBrowseNodeFactory from '../../../js/DropZone/DropZoneBrowseNodeFactory';
import DropZoneBrowseNodeManager from '../../../js/DropZone/DropZoneBrowseNodeManager';

describe('DropZoneBrowseNodeFactory', () => {
    describe('create', () => {
        it('should return a browse node manager instance', () => {
            expect(DropZoneBrowseNodeFactory.create({
                addEventListener: () => {}
            })).to.be.instanceOf(DropZoneBrowseNodeManager);
        });
    });
});
