/**
 * Pulsar
 *
 * Core UI components that should always be present.
 *
 * Jadu Ltd.
 */

// Fixes issue with dependencies that expect both $ and jQuery to be set
window.jQuery = window.$ = require('jquery');

// Global UI components
var $         = require('jquery'),
    deck      = require('./deck'),
    dropdown  = require('./dropdown'),
    modal     = require('./modal'),
    tab       = require('./tab'),
    popover   = require('./popover'),
    tooltip   = require('./tooltip'),

    clickover = require('../libs/bootstrapx-clickover/js/bootstrapx-clickover'),
    svgeezy   = require('../libs/svgeezy/svgeezy.min'),
    select2   = require('../libs/select2/dist/js/select2.min'),
    toggles   = require('../libs/jquery-toggles/toggles.min'),

    ButtonComponent = require('./ButtonComponent'),
    FlashMessageComponent = require('./FlashMessageComponent'),
    MasterSwitchComponent = require('./MasterSwitchComponent'),
    SignInComponent = require('./area/signin/signin');

module.exports = {
    ButtonComponent: ButtonComponent,
    FlashMessageComponent: FlashMessageComponent,
    MasterSwitchComponent: MasterSwitchComponent,
    SignInComponent: SignInComponent,
    svgeezy: svgeezy
};
