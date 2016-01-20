/*global mocha, mochaPhantomJS, sinon:true, window */
'use strict';

var chai = require('chai'),
    sinon = require('sinon'),
    sinonChai = require('sinon-chai'),
    toggles = require('../../libs/jquery-toggles/toggles.min');

// Load Sinon-Chai
chai.use(sinonChai);

mocha.ui('bdd');
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
require('./PulsarUIComponentTest.js');
// require('./signinTest');
//require('./MasterSwitchComponentTest');

if (typeof mochaPhantomJS !== 'undefined') {
    mochaPhantomJS.run();
} else {
    mocha.run();
}
