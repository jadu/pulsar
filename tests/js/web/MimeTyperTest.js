"use strict";

import MimeTyper from '../../../js/libs/MimeTyper';

describe('MimeTyper', () => {
    describe('constructor()', () => {
        it('should have a default class', () => {
            const mime = new MimeTyper();

            expect(mime.default.length).to.be.above(0);
        });
    });

    describe('getIconClass()', () => {
        it('should return the expected mime type class', () => {
            const mime = new MimeTyper();
            const type = 'image/jpeg';

            expect(mime.getIconClass(type)).to.equal(mime.mimes[type]);
        });

        it('should return the default class', () => {
            const mime = new MimeTyper();

            expect(mime.getIconClass('foo')).to.equal(mime.default);
        });
    });
});
