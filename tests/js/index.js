/*global mocha, mochaPhantomJS, sinon:true, window */
'use strict';

var chai = require('chai'),
    sinon = require('sinon'),
    sinonChai = require('sinon-chai');

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

// require('./tabbedLayoutTest');
// require('./signinTest');
// require('./masterSwitchComponentTest');
require('./navMainComponentTest');
// require('./buttonComponentTest');

if (typeof mochaPhantomJS !== 'undefined') {
    mochaPhantomJS.run();
} else {
    mocha.run();
}
