const { filterFileExtensionList, filterFileExtension } = require('../../../../js/utilities/filterByFileExtension');

describe('filterByFileExtension', () => {
    const files = [
        'file.js?v1=true',
        'file.html',
        'file.css',
        'bar.js',
        'not a file'
    ];

    describe('filterFileExtensionList', () => {
        it('should filter files by inclusion', () => {
            expect(filterFileExtensionList(files, 'js')).to.deep.equal([
                'file.js?v1=true',
                'bar.js'
            ]);
        });

        it('should filter files by exclusion', () => {
            expect(filterFileExtensionList(files, 'js', false)).to.deep.equal([
                'file.html',
                'file.css'
            ]);
        });

        it('should filter out strings that are not files', () => {
            expect(filterFileExtensionList(files, 'js')).to.deep.equal([
                'file.js?v1=true',
                'bar.js'
            ]);
        });

        it('should support multiple extensions', () => {
            expect(filterFileExtensionList(files, 'js html')).to.deep.equal([
                'file.js?v1=true',
                'file.html',
                'bar.js'
            ]);
        });
    });

    describe('filterFileExtension', () => {
        it('should filter a file by inclusion', () => {
            expect(filterFileExtension('foo.js', 'js')).to.be.true;
        });

        it('should filter a file by exclusion', () => {
            expect(filterFileExtension('foo.js', 'js', false)).to.be.false;
        });

        it('should return false for things we think are not files', () => {
            expect(filterFileExtension('not a file', 'js')).to.be.false;
        });

        it('should support multiple file extensions', () => {
            expect(filterFileExtension('index.html', 'js html')).to.be.true;
        });
    });
});
