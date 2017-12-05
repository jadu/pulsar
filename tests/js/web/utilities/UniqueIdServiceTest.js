const UniqueIdService = require('../../../../js/utilities/UniqueIdService');
const HashService = require('../../../../js/utilities/HashService');

describe('UniqueIdService', () => {
    let uniqueIdServive;
    let $root;
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
});
