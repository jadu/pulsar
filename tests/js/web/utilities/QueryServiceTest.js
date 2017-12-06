const QueryService = require('../../../../js/utilities/QueryService');

describe('QueryService', () => {
    let queryService;
    let $root;

    beforeEach(() => {
        $root = $('<div></div>');
        queryService = new QueryService($root[0], {
            foo: 'data-foo',
            bar: 'data-bar'
        });

        $root.append(`
            <div data-foo></div>
            <div data-bar></div>
            <div data-bar></div>
        `);
    });

    describe('buildQueryMatrix', () => {
        it('should build a query matrix from the config', () => {
            const config = { 'foo': 'data-foo', 'bar': 'data-bar' };

            expect(queryService.buildQueryMatrix(config)).to.deep.equal({
                foo: {
                    query: '[data-foo]',
                    attr: 'data-foo'
                },
                bar: {
                    query: '[data-bar]',
                    attr: 'data-bar'
                }
            });
        });
    });

    describe('get', () => {
        it('should throw if a query is not recognised', () => {
            expect(() => {
                queryService.get('slfdhglsfjgh');
            }).to.throw();
        });

        it('should return a single element', () => {
            const ref = queryService.get('foo');

            expect(ref).to.match('[data-foo]');
        });

        it('should return an element list as an array', () => {
            const refs = queryService.get('bar', { all: true });

            expect(refs).to.be.an('Array');

            refs.forEach(ref => {
                expect(ref).to.match('[data-bar]');
            });
        });
    });

    describe('updateRef', () => {
        it('should throw if a query name is not found', () => {
            expect(() => {
                queryService.updateRef('asdfghjkl');
            }).to.throw();
        });

        it('should update an existing reference manually', () => {
            queryService.updateRef('foo', 666);

            expect(queryService.get('foo')).to.equal(666);
        });
    });

    describe('getAttr', () => {
        it('should get the attribute value for a query', () => {
            it('should throw if a query name is not found', () => {
                expect(() => {
                    queryService.getAttr('asdfghjkl');
                }).to.throw();
            });
        });

        it('should return the attr stored against the query', () => {
            expect(queryService.getAttr('foo')).to.equal('data-foo');
        });
    });

    describe('getQuery', () => {
        it('should get the attribute value for a query', () => {
            it('should throw if a query name is not found', () => {
                expect(() => {
                    queryService.getQuery('asdfghjkl');
                }).to.throw();
            });
        });

        it('should return the query string stored against a query', () => {
            expect(queryService.getQuery('foo')).to.equal('[data-foo]');
        });
    });
});
