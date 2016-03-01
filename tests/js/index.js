/*global mocha, mochaPhantomJS, sinon:true, window */
'use strict';

var $ = require('jquery'),
    chai = require('chai'),
    sinon = require('sinon'),
    sinonChai = require('sinon-chai'),
    toggles;

// Expose jQuery globals
window.$ = window.jQuery = $;

toggles = require('../../libs/jquery-toggles/toggles.min');

// Load Sinon-Chai
chai.use(sinonChai);

mocha.timeout(2000);

// Expose tools in the global scope
window.chai = chai;
window.describe = describe;
window.expect = chai.expect;
window.it = it;
window.sinon = sinon;

require('./tabbedLayoutTest');
require('./ButtonComponentTest.js');
require('./FlashMessageComponentTest.js');
require('./PulsarFormComponentTest.js');
require('./HelpTextComponentTest.js');
require('./PulsarUIComponentTest.js');

if (typeof mochaPhantomJS !== 'undefined') {
    mochaPhantomJS.run();
} else {
    mocha.run();
}
