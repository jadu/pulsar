const UniqueIdService = require('../../../../js/utilities/UniqueIdService');
const HashService = require('../../../../js/utilities/HashService');

describe('UniqueIdService', () => {
    let uniqueIdServive;
    let $root;
    let $groupMultiSelect;
    let $groupSingleSelect
    let hashServiceStub;

    beforeEach(() => {
        $root = $(`
            <div id="root">
                <label for="foo">foo</label>
                <input id="foo">

                <label for="foo">foo</label>
                <input id="foo">

                <label for="bar">bar</label>
                <input id="bar">

                <label for="no_id_on_page">baz</label>
            </div>
        `);

        $groupMultiSelect = $(`
            <div id="group-multi-select">
                <select class="js-select2" id="example-select" multiple>
                    <option>one</option>
                    <option>two</option>
                </select>
                <span class="select2 select2-container">
                    <span class="select2-selection select2-selection--multiple">
                        <input class="select2-search__field" type="text" aria-describedby="select2-example-select-summary">
                    </span>
                    <span id="select2-example-select-summary" class="select2-selections"></span>
                </span>
            </div>
        `);

        $groupSingleSelect = $(`
            <div id="group-single-select">
                <select class="js-select2" id="example-select">
                    <option>one</option>
                    <option>two</option>
                </select>
                <span class="select2 select2-container">
                    <span class="select2-selection select2-selection--single" aria-controls="select2-example-select-container" aria-owns="select2-example-select-container">
                        <span class="select2-selection__rendered" id="select2-example-select-container">one</span>
                    </span>
                </span>
            </div>
        `);

        hashServiceStub = sinon.createStubInstance(HashService);
        uniqueIdServive = new UniqueIdService(hashServiceStub);
    });

    describe('uniquifyFors', () => {
        beforeEach(() => {
            hashServiceStub.generate.onFirstCall().returns('foo_100');
            hashServiceStub.generate.onSecondCall().returns('foo_101');
            hashServiceStub.generate.onThirdCall().returns('foo_102');
        });

        it('should create unique IDs for each for/id pair', () => {
            uniqueIdServive.uniquifyFors($root[0]);

            expect($root.find('[for="foo_100"]')).to.have.length.of(1);
            expect($root.find('[id="foo_100"]')).to.have.length.of(1);

            expect($root.find('[for="foo_101"]')).to.have.length.of(1);
            expect($root.find('[id="foo_101"]')).to.have.length.of(1);

            expect($root.find('[for="foo_102"]')).to.have.length.of(1);
            expect($root.find('[id="foo_102"]')).to.have.length.of(1);
        });

        it('should ignore for elements that do not have corresponding IDs', () => {
            uniqueIdServive.uniquifyFors($root[0]);

            expect($root.find('[for="no_id_on_page"]')).to.have.length.of(1);
        });
    });

    describe('uniquifyIds', () => {
        beforeEach(() => {
            hashServiceStub.generate.onFirstCall().returns('foo_100');
            hashServiceStub.generate.onSecondCall().returns('foo_101');
            hashServiceStub.generate.onThirdCall().returns('foo_102');
        });

        it('should create unique IDs for each for/id pair', () => {
            uniqueIdServive.uniquifyIds($root[0]);

            expect($root.find('[id="foo_100"]')).to.have.length.of(1);
            expect($root.find('[id="foo_101"]')).to.have.length.of(1);
            expect($root.find('[id="foo_102"]')).to.have.length.of(1);
        });
    });

    describe('uniquifySelectWoo', () => {
        beforeEach(() => {
            hashServiceStub.generate.onFirstCall().returns('foo_100');
        });

        it('should update the select woo selection summary with a unique ID when type is multiple', () => {
            uniqueIdServive.uniquifyIds($groupMultiSelect[0]);
            uniqueIdServive.uniquifySelectWoo($groupMultiSelect[0]);

            expect($groupMultiSelect.find('.select2-selections').attr('id')).to.equal('select2-foo_100-summary');
        });

        it('should update the select woo selection search input aria-describedby ID when type is multiple', () => {
            uniqueIdServive.uniquifyIds($groupMultiSelect[0]);
            uniqueIdServive.uniquifySelectWoo($groupMultiSelect[0]);

            expect($groupMultiSelect.find('.select2-search__field').attr('aria-describedby')).to.equal('select2-foo_100-summary');
        });

        it('should update the select woo selection rendered with a unique ID when type is single', () => {
            uniqueIdServive.uniquifyIds($groupSingleSelect[0]);
            uniqueIdServive.uniquifySelectWoo($groupSingleSelect[0]);

            expect($groupSingleSelect.find('.select2-selection__rendered').attr('id')).to.equal('select2-foo_100-container');
        });

        it('should update the select woo selection rendered container aria-controls ID when type is single', () => {
            uniqueIdServive.uniquifyIds($groupSingleSelect[0]);
            uniqueIdServive.uniquifySelectWoo($groupSingleSelect[0]);

            expect($groupSingleSelect.find('.select2-selection--single').attr('aria-controls')).to.equal('select2-foo_100-container');
        });

        it('should update the select woo selection rendered container aria-owns ID when type is single', () => {
            uniqueIdServive.uniquifyIds($groupSingleSelect[0]);
            uniqueIdServive.uniquifySelectWoo($groupSingleSelect[0]);

            expect($groupSingleSelect.find('.select2-selection--single').attr('aria-owns')).to.equal('select2-foo_100-container');
        });
    });
});
