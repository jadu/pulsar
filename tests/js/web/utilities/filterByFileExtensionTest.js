const filterFileExtension = require('../../../../js/utilities/filterByFileExtension');

describe('filterByFileExtension', () => {
    it('should filter files by inclusion', () => {
        const files = [
            'file.js?v1=true',
            'file.html',
            'file.css',
            'bar.js'
        ];

        expect(filterFileExtension(files, 'js')).to.deep.equal([
            'file.js?v1=true',
            'bar.js'
        ]);
    });

    it('should filter files by exclusion', () => {
        const files = [
            'file.js',
            'file.html',
            'file.css',
            'bar.js'
        ];

        expect(filterFileExtension(files, 'js', false)).to.deep.equal([
            'file.html',
            'file.css'
        ]);
    });

    it('should filter out strings that are not files', () => {
        const files = [
            'file',
            'file.html',
            'bar',
            'bar.js'
        ];

        expect(filterFileExtension(files, 'js')).to.deep.equal([
            'bar.js'
        ]);
    });
});
