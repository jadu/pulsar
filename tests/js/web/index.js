/*global mocha, mochaPhantomJS, sinon:true, window */
'use strict';

var $ = require('jquery'),
    chai = require('chai'),
    sinon = require('sinon'),
    sinonChai = require('sinon-chai');

// Expose jQuery globals
window.$ = window.jQuery = $;

// Load Sinon-Chai
chai.use(sinonChai);

mocha.timeout(2000);

// Expose tools in the global scope
window.chai = chai;
window.describe = describe;
window.expect = chai.expect;
window.it = it;
window.sinon = sinon;
