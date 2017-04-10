import _ from 'lodash';

export default class MimeTyper {
    constructor () {
        // this will be returned in the event we cannot match the MIME type
        this.default = 'file-o';
        // MIME type map {MIME type}: {class name}
        this.mimes = {
            // code
            'text/css': 'file-code-o',
            'text/html': 'file-code-o',
            'application/javascript': 'file-code-o',
            'application/ecmascript': 'file-code-o',
            'text/xml': 'file-code-o',
            // text
            'text/plain': 'file-text-o',
            'application/plain': 'file-text-o',
            'text/richtext': 'file-text-o',
            'application/rtf': 'file-text-o',
            // document
            'application/msword': 'file-word-o',
            'application/vnd.openxmlformats-officedocument.wordprocessingml.document': 'file-word-o',
            // powerpoint
            'application/vnd.ms-powerpoint': 'file-powerpoint-o',
            'application/mspowerpoint': 'file-powerpoint-o',
            'application/powerpoint': 'file-powerpoint-o',
            // spreadsheet
            'application/excel': 'file-excel-o',
            'application/vnd.ms-excel': 'file-excel-o',
            'application/x-excel': 'file-excel-o',
            'application/x-msexcel': 'file-excel-o',
            'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet': 'file-excel-o',
            // office
            'application/vnd.ms-office': 'file-o',
            // pdf
            'application/pdf': 'file-pdf-o',
            // image
            'image/jpeg': 'file-image-o',
            'image/png': 'file-image-o',
            'image/svg': 'file-image-o',
            'image/svg+xml': 'file-image-o',
            'image/gif': 'file-image-o',
            // zip
            'application/x-compressed': 'file-zip-o',
            'application/x-gzip': 'file-zip-o',
            'application/zip': 'file-zip-o',
            'application/x-zip': 'file-zip-o',
            // video
            'video/mpeg': 'file-movie-o',
            'video/quicktime': 'file-movie-o',
            'video/mp4': 'file-movie-o',
            // audio
            'audio/mpeg': 'file-audio-o',
            'audio/midi': 'file-audio-o',
            'audio/wav': 'file-audio-o',
            'audio/x-wav': 'file-audio-o'
        };
    }

    /**
     * Search MIME keys and return corrosponding class name.
     * If we can't find the type, return the default class name.
     * @param  {String} userMime
     * @return {String}
     */
    getIconClass (userMime) {
        let match;

        if (Array.prototype.find) {
            match = Object.keys(this.mimes).find(mime => mime === userMime);
        } else {
            match = _.find(Object.keys(this.mimes), mime => mime === userMime);
        }

        if (match) {
            return this.mimes[match];
        } else {
            return this.default;
        }
    }
}
