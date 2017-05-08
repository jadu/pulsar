"use strict";

const DropZoneValidator = require('../../../js/libs/DropZoneValidator').default;
const { expect } = require('chai');
const { describe, it, beforeEach } = require('mocha');

describe('DropZoneValidator', () => {
    let validator;
    let validFile;
    let invalidFile;
    const partFileStub = {
        kind: 'file',
        type: 'application/javascript',
        getAsFile: () => null
    };
    const fullFileStub = Object.assign({}, partFileStub, {
        getAsFile: () => ({ size: 50 })
    });

    describe('validateType()', () => {
        beforeEach(() => {
            validFile = Object.assign({}, partFileStub, { type: 'application/javascript' });
            invalidFile = Object.assign({}, partFileStub, { type: 'invalid/mime' });
            validator = new DropZoneValidator({ whitelist: ['application/javascript'] });
        });

        it('should reject a file that is not in the whitelist', () => {
            expect(validator.validateType(invalidFile.type)).to.be.false;
        });

        it('should accept a file that is in the whitelist', () => {
            expect(validator.validateType(validFile.type)).to.be.true;
        });

        it('should validate against a part mime', () => {
            const lazyValidator = new DropZoneValidator({ whitelist: ['javascript'] });

            expect(lazyValidator.validateType(validFile.type)).to.be.true;
        });
    });

    describe('validateCount()', () => {
        beforeEach(() => {
            validator = new DropZoneValidator({ maxFiles: 10 });
        });

        it('should reject a file if the count has exceeded the max', () => {
            expect(validator.validateCount(11)).to.be.false;
        });

        it('should accept a file if the count has not exceeded the max', () => {
            expect(validator.validateCount(10)).to.be.true;
        });
    });

    describe('validateSize()', () => {
        beforeEach(() => {
            validator = new DropZoneValidator({ maxSize: 150 });
        });

        it('should reject a file if the size has exceeded the max', () => {
            expect(validator.validateSize(151)).to.be.false;
        });

        it('should accept a file if the size has not exceeded the max', () => {
            expect(validator.validateSize(150)).to.be.true;
        });
    });

    describe('throwError()', () => {
        it('should return an error object', () => {
            const error = validator.throwError('WHITELIST');

            expect(error).to.be.an('object');
            expect(error.valid).to.be.false;
        });
    });

    describe('validate()', () => {
        it('should reject a group of files if 1 fails whitelist validation', () => {
            const validator = new DropZoneValidator({ whitelist: ['application/foo'] });
            const valid = Object.assign({}, partFileStub, { type: 'application/foo' });
            const invalid = Object.assign({}, partFileStub, { type: 'application/javascript' });

            expect(validator.validate([valid, invalid, valid], 99, 99).valid).to.be.false;
        });

        it('should reject a group of files if 1 fails max files validation', () => {
            const validator = new DropZoneValidator({ maxFiles: 2 });

            expect(validator.validate([partFileStub, partFileStub, partFileStub], 0, 0).valid).to.be.false;
        });

        it('should reject a group of files if 1 fails max size validation', () => {
            const validator = new DropZoneValidator({ maxSize: 125 });

            expect(validator.validate([fullFileStub, fullFileStub, fullFileStub], 0, 0).valid).to.be.false;
        });
    });
});
