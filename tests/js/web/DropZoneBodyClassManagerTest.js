import DropZoneBodyClassManager from '../../../js/DropZone/DropZoneBodyClassManager';

describe('DropZoneBodyClassManager', () => {
    let $body;
    let classManager;

    beforeEach(() => {
        $body = $('<div class="foo"></div>');
        classManager = new DropZoneBodyClassManager();
    });

    describe('update()', () => {
        it('should update the body class with the new state', () => {
            classManager.update($body[0], ['bar', 'baz']);

            expect($body.attr('class')).to.equal('foo bar baz');
        });

        it('should reset the state if no modifiers passed in', () => {
            classManager.update($body[0]);

            expect($body.attr('class')).to.equal('foo');
        });
    });
});
