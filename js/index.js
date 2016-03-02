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
var $                     = require('jquery'),
    deck                  = require('./deck'),
    dropdown              = require('./dropdown'),
    modal                 = require('./modal'),
    tab                   = require('./tab'),
    popover               = require('./popover'),
    tooltip               = require('./tooltip'),
    matchMedia            = require('./polyfills/matchMedia'),
    matchMediaAddListener = require('./polyfills/matchMedia.addListener');

    clickover  = require('../libs/bootstrapx-clickover/js/bootstrapx-clickover'),
    svgeezy    = require('../libs/svgeezy/svgeezy.min'),
    select2    = require('../libs/select2/dist/js/select2.min'),
    toggles    = require('../libs/jquery-toggles/toggles.min'),

    dt            = require('datatables.net')(window, $),
    dt_responsive = require('datatables.net-responsive')(window, $),

    ButtonComponent = require('./ButtonComponent'),
    HelpTextComponent = require('./HelpTextComponent'),
    FlashMessageComponent = require('./FlashMessageComponent'),
    MasterSwitchComponent = require('./MasterSwitchComponent'),
    ModulePermissionsComponent = require('./ModulePermissionsComponent'),
    NavMainComponent = require('./NavMainComponent'),
    PulsarFormComponent = require('./PulsarFormComponent'),
    PulsarUIComponent = require('./PulsarUIComponent'),
    SignInComponent = require('./area/signin/signin');

module.exports = {
    ButtonComponent: ButtonComponent,
    HelpTextComponent: HelpTextComponent,
    FlashMessageComponent: FlashMessageComponent,
    MasterSwitchComponent: MasterSwitchComponent,
    ModulePermissionsComponent: ModulePermissionsComponent,
    NavMainComponent: NavMainComponent,
    PulsarFormComponent: PulsarFormComponent,
    PulsarUIComponent: PulsarUIComponent,
    SignInComponent: SignInComponent,
    svgeezy: svgeezy
};
