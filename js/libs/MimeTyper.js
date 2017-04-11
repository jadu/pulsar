import _ from 'lodash';

export default class MimeTyper {
    constructor () {
        // this will be returned in the event we cannot match the MIME type
        this.default = 'file-o';
        this.classes = {
            code: 'file-code-o',
            text: 'file-text-o',
            doc: 'file-word-o',
            powerpoint: 'file-powerpoint-o',
            excel: 'file-excel-o',
            pdf: 'file-pdf-o',
            image: 'file-image-o',
            zip: 'file-zip-o',
            video: 'file-movie-o',
            audio: 'file-audio-os'
        };
        // MIME type map {MIME type}: {class name}
        this.mimes = {
            // code
            'text/css': this.classes.code,
            'text/html': this.classes.code,
            'application/javascript': this.classes.code,
            'application/ecmascript': this.classes.code,
            'text/xml': this.classes.code,
            // text
            'text/plain': this.classes.text,
            'application/plain': this.classes.text,
            'text/richtext': this.classes.text,
            'application/rtf': this.classes.text,
            // document
            'application/msword': this.classes.doc,
            'application/vnd.openxmlformats-officedocument.wordprocessingml.document': this.classes.doc,
            // powerpoint
            'application/vnd.ms-powerpoint': this.classes.powerpoint,
            'application/mspowerpoint': this.classes.powerpoint,
            'application/powerpoint': this.classes.powerpoint,
            // spreadsheet
            'application/excel': this.classes.excel,
            'application/vnd.ms-excel': this.classes.excel,
            'application/x-excel': this.classes.excel,
            'application/x-msexcel': this.classes.excel,
            'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet': this.classes.excel,
            // pdf
            'application/pdf': this.classes.pdf,
            // image
            'image/jpeg': this.classes.image,
            'image/png': this.classes.image,
            'image/svg': this.classes.image,
            'image/svg+xml': this.classes.image,
            'image/gif': this.classes.image,
            // zip
            'application/x-compressed': this.classes.zip,
            'application/x-gzip': this.classes.zip,
            'application/zip': this.classes.zip,
            'application/x-zip': this.classes.zip,
            // video
            'video/mpeg': this.classes.video,
            'video/quicktime': this.classes.video,
            'video/mp4': this.classes.video,
            // audio
            'audio/mpeg': this.classes.audio,
            'audio/midi': this.classes.audio,
            'audio/wav': this.classes.audio,
            'audio/x-wav': this.classes.audio
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
