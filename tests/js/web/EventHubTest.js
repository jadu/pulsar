"use strict";

require('jsdom-global')();

const EventHub = require('../../../js/libs/EventHub').default;
const sinon = require('sinon');
const { expect } = require('chai');
const { describe, it, beforeEach, afterEach } = require('mocha');

describe('EventHub', () => {
    let hub;
    let event;
    let flag = false;
    let handler;
    let sandbox;

    beforeEach(() => {
        handler = () => flag = true;
        event = document.createEvent('Event');
        event.initEvent('click', true, true);
        document.body.innerHTML = '<div id="sandbox"><div id="dropzone"></div></div>';
        sandbox = document.getElementById('sandbox');
    });

    afterEach(() => {
        document.body.innerHTML = '';
        flag = false;
    });

    describe('addEvent()', () => {
        beforeEach(() => {
            hub = new EventHub();
        });

        it('should add an event to the pool', () => {
            hub.pool = [];
            hub.addEvent(sandbox, 'click', handler);
            expect(hub.pool.length).to.equal(1);
        });

        it('should add an event listener to the node', () => {
            hub.addEvent(sandbox, 'click', handler);
            sandbox.dispatchEvent(event);
            expect(flag).to.be.true;
        });
    });

    describe('initiateTracker()', () => {
        beforeEach(() => {
            hub = new EventHub();
        });

        it('should initiate a zero tracker value for each node', () => {
            const body = document.body;
            const node = document.getElementById('dropzone');

            hub.initiateTracker(['click', 'foo'], [body, node]);
            expect(hub.tracker).to.deep.equal({
                body: {
                    click: 0,
                    foo: 0
                },
                dropzone: {
                    click: 0,
                    foo: 0
                }
            });
        });

        it('should throw an error if nodes are not uniquely identifiable', () => {
            const foo = document.createElement('div');
            const bar= document.createElement('div');

            expect(() => { hub.initiateTracker(['click'], [foo, bar]); }).to.throw(Error);
        });
    });

    describe('removeAllEvents()', () => {
        beforeEach(() => {
            hub = new EventHub();
            hub.pool.push({ node: sandbox, event: 'click', handler });
            sandbox.addEventListener('click', handler);
            hub.removeAllEvents();
        });

        it('should remove an attached event', () => {
            sandbox.dispatchEvent(event);
            expect(flag).to.be.false;
        });

        it('should empty the pool', () => {
            expect(hub.pool.length).to.equal(0);
        });
    });

    describe('addEvents()', () => {
        it('should add each event to each node')
    });
});
