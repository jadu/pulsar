/*global mocha, mochaPhantomJS, sinon:true, window */
'use strict';

var $ = require('jquery'),
    chai = require('chai'),
    sinon = require('sinon'),
    sinonChai = require('sinon-chai'),
    chaiDom = require('chai-dom');

// Polyfill the DOM Level 4 API
require('dom4');

// Expose jQuery globals
window.$ = window.jQuery = $;

// Load chai extensions
chai.use(sinonChai);
chai.use(chaiDom);

mocha.timeout(2000);

// Expose tools in the global scope
window.chai = chai;
window.describe = describe;
window.expect = chai.expect;
window.it = it;
window.sinon = sinon;
