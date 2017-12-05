const HashService = require('../../../../js/utilities/HashService');

describe('HashService', () => {
    let hashService;

    beforeEach(() => {
        hashService = new HashService();
    });

    describe('generate', () => {
        it('should return a truthy string value', () => {
            expect(hashService.generate('foo')).to.be.truthy;
            expect(hashService.generate('foo')).to.be.a('string');
        });

        it('should return unique hashes within the instance lifetime', () => {
            const nowStub = sinon.stub(Date, 'now');

            nowStub.returns(666);

            expect(hashService.generate('test')).to.equal('test_666');
            expect(hashService.generate('test')).to.equal('test_667');
            expect(hashService.generate('test')).to.equal('test_668');
        });
    });
});
