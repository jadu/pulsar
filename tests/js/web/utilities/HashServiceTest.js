const HashService = require('../../../../js/utilities/HashService');

describe('HashService', () => {
    let hashService;
    let dateStub;

    beforeEach(() => {
        dateStub = { now: () => 666 };
        hashService = new HashService(dateStub);
    });

    describe('generate', () => {
        it('should return a truthy string value', () => {
            expect(hashService.generate('foo')).to.be.truthy;
            expect(hashService.generate('foo')).to.be.a('string');
        });

        it('should return unique hashes within the instance lifetime', () => {
            expect(hashService.generate('test')).to.equal('test_666');
            expect(hashService.generate('test')).to.equal('test_667');
            expect(hashService.generate('test')).to.equal('test_668');
        });
    });
});
