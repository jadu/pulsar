const {
    filterFileExtensionList,
    filterFileExtension,
    filterDataEncodedURIList,
    filterDataEncodedURI,
    getFileExtension
} = require('../../../../js/utilities/fileUtilities');

describe('fileUtilities', () => {
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

    describe('filterDataEncodedURIList', () => {
        const list = [
            'data:image/png;base64;SOME_IMAGE',
            'not a data encoded URI'
        ];

        it('should filter a list by inclusion', () => {
            expect(filterDataEncodedURIList(list)).to.deep.equal([
                'data:image/png;base64;SOME_IMAGE'
            ]);
        });

        it('should filter a list by exclusion', () => {
            expect(filterDataEncodedURIList(list, false)).to.deep.equal([
                'not a data encoded URI'
            ]);
        });
    });

    describe('filterDataEncodedURI', () => {
        it('should filter a list by inclusion', () => {
            expect(filterDataEncodedURI('data:image/png')).to.be.true;
        });

        it('should filter a list by exclusion', () => {
            expect(filterDataEncodedURI('data:image/png', false)).to.be.false;
        });
    });

    describe('getFileExtension', () => {
        it('should return a file extension', () => {
            expect(getFileExtension('foo.js')).to.equal('js');
        });

        it('should return null for non files', () => {
            expect(getFileExtension('not a file')).to.be.false;
        });

        it('should handle files with query params', () => {
            expect(getFileExtension('foo.js?ver=666')).to.equal('js');
        });
    });
});
