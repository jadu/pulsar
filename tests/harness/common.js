'use strict';

var $ = require('jquery'),
    chai = require('chai'),
    sinon = require('sinon'),
    sinonChai = require('sinon-chai'),
    chaiDom = require('chai-dom');

require('babel-polyfill');

// Expose jQuery globals
window.$ = window.jQuery = $;

console.log($.fn.jquery);

// Load chai extensions
chai.use(sinonChai);
chai.use(chaiDom);

// Expose tools in the global scope
window.chai = chai;
window.describe = describe;
window.expect = chai.expect;
window.it = it;
window.sinon = sinon;
