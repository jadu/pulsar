import RepeaterComponent from '../../../../js/Repeater/RepeaterComponent';
import $ from 'jquery';

describe('RepeaterComponent', () => {
    let repeaterComponent;
    let $html;
    let $repeater;
    let windowMock;

    beforeEach(() => {
        $html = $(`
            <div id="html">
                <div class="repeater">
                    <div class="repeater__saved-data"></div>
                    <table class="table table--full repeatable__table">
                        <thead class="repeater__preview-headings">
                            <tr>
                                <th data-repeater-for-name="input-text">input text</th>
                            </tr>
                        </thead>
                        <tbody class="repeater__preview-data">
                            <tr class="repeater__empty-placeholder">
                                <td colspan="2" class="muted">Empty</td>
                            </tr>
                        </tbody>
                    </table>
                    <div class="repeater__group">
                        <input id="input-text" type="text" name="input-text"/>
                        <a href="#" class="repeater__save-group">save</a>
                    </div>
                    <div class="repeater__group-actions">
                        <a href="#" class="repeater__add-group">Add</a>
                        <a href="#" class="repeater__cancel-group">cancel</a>
                    </div>
                </div>
            </div>
        `);
        windowMock = { getComputedStyle: sinon.stub() };
        $repeater = $html.find('.repeater');
        repeaterComponent = new RepeaterComponent(windowMock);
    });

    describe('getQueryReference', () => {
        beforeEach(() => {
            repeaterComponent.init($repeater[0]);
        });

        it('should return a reference to a node', () => {
            const query = repeaterComponent.getQueryReference({ query: '.repeater__group' });

            expect($repeater.find('.repeater__group')[0]).to.equal(query);
        });
    });

    describe('removeGroupInputNames', () => {
        beforeEach(() => {
            repeaterComponent.init($repeater[0]);
        });

        it('should remove name attributes and replace with data attributes', () => {
            const $input = $repeater.find('#input-text');

            expect($input.attr('name')).to.be.falsy;
            expect($input.attr('data-repeater-name')).to.equal('input-text');
        });
    });

    describe('handleAddGroup', () => {
        let event;
        let $repeaterGroup;

        beforeEach(() => {
            repeaterComponent.init($repeater[0]);
            event = { preventDefault: sinon.spy() };
            $repeaterGroup = $repeater.find('.repeater__group');
            windowMock.getComputedStyle.returns({ display: 'none' });
        });

        afterEach(() => {
            windowMock.getComputedStyle.reset();
        });

        it('should prevent the default behaviour of the add button', () => {
            repeaterComponent.handleAddGroup(event);

            expect(event.preventDefault).to.have.been.calledOnce;
        });


        it('should display the repeater new group fields', () => {
            repeaterComponent.handleAddGroup(event);



            expect($repeaterGroup.css('display')).to.not.equal('none');
        });
    });

    // describe('handleSaveGroup', () => {
    //     let event;
    //     let $repeaterGroup;
    //
    //     beforeEach(() => {
    //         event = { preventDefault: sinon.spy() };
    //         $repeaterGroup = $repeater.find('.repeater__group');
    //     });
    //
    //     it('should prevent the default behaviour of the add button', () => {
    //         repeaterComponent.handleSaveGroup(event);
    //
    //         expect(event.preventDefault).to.have.been.calledOnce;
    //     });
    // });

    describe('saveGroupAsEntry', () => {
        let event;
        let $repeaterGroup;
        let $groupInputClones;

        beforeEach(() => {
            repeaterComponent.init($repeater[0]);
            event = { preventDefault: sinon.spy() };
            $repeaterGroup = $repeater.find('.repeater__group');
        });

        it('should create a new repeater entry in the repeater entry root', () => {
            const $entryRoot = $repeater.find('.repeater__saved-data');
            const value = 'test_value';
            let $entry;

            // add a value to one of the inputs
            $repeaterGroup.find(':input').filter('#input-text').val(value);
            // clone repeater group inputs so we can compare
            $groupInputClones = $repeaterGroup.find(':input').clone();
            // save repeater group
            repeaterComponent.saveGroupAsEntry();
            // get saved data
            $entry = $entryRoot.children('.repeater__entry-data').first();

            $groupInputClones.each((index, child) => {
                // expect each clone's data-repeater-name attr to be converted to a regular name attr
                expect($(child).attr('data-repeater-name')).to.equal($entry.children().eq(index).attr('name'));
                // expect the cloned input value to match the saved data input
                expect($(child).prop('value')).to.equal(value);
                expect($entry.children().eq(index).prop('value')).to.equal(value);
            });
            // expect a new repeater entry to be given a zero indexed ID
            expect($entry.attr('data-repeater-entry-id')).to.equal('0');
        });
    });

    describe('createPreviewDataElement', () => {
        it('should create a data preview element', () => {
            const getAttr = sinon.stub().withArgs('data-repeater-for-name').returns('test_name');
            const data = [{ name: 'test_name', value: 'test_value' }];
            const element = { getAttribute: getAttr };
            const [ actual ] = repeaterComponent.createPreviewDataElement(data, [], element);

           expect(actual.textContent).to.equal('test_value');
        });
    });

    describe('createEntryPreview', () => {
        let $input;
        let $entryRoot;

        beforeEach(() => {
            repeaterComponent.init($repeater[0]);
            $entryRoot = $repeater.find('.repeater__preview-data');
            $input = $repeater.find('#input-text');
            $input.val('test_input');
        });

        it('should create an entry preview for a saved group', () => {
            let entryData;

            entryData = repeaterComponent.saveGroupAsEntry();
            repeaterComponent.createEntryPreview(entryData);

            // expect there to be a corresponding element for each data object
            entryData.forEach((entry, index) => {
                expect($entryRoot.find('td').eq(index)).to.have.length.of(1);
            });
        });
    });

    describe('removePlaceholder, addPlaceholder', () => {
        let $previewRoot;

        beforeEach(() => {
            repeaterComponent.init($repeater[0]);
            $previewRoot = $repeater.find('.repeater__preview-data');
        });

        it('should remove the placeholder element', () => {
            expect($previewRoot.find('.repeater__empty-placeholder')).to.have.length.of(1);

            repeaterComponent.removePlaceholder();

            expect($previewRoot.find('.repeater__empty-placeholder')).to.have.length.of(0);

            repeaterComponent.addPlaceholder();

            expect($previewRoot.find('.repeater__empty-placeholder')).to.have.length.of(1);
        });
    });

    describe('resetGroupFields', () => {
        let $input;
        let $group;

        beforeEach(() => {
            repeaterComponent.init($repeater[0]);
            $group = $repeater.find('.repeater__group');
            $input = $repeater.find('#input-text');
            $input.val('test_input');
        });

        it('should reset all input inside the group', () => {
            repeaterComponent.resetGroupFields();

            expect($input.val()).to.equal('');
        });
    });
});
