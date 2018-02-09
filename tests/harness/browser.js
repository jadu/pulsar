'use strict';

mocha.ui('bdd');

require('./browser.common');

window.addEventListener('load', function () {
    mocha.run();
});
