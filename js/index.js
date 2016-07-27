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
    dropdown              = require('./libs/dropdown'),
    modal                 = require('./libs/modal'),
    tab                   = require('./libs/tab'),
    popover               = require('./libs/popover'),
    tooltip               = require('./libs/tooltip'),
    matchMedia            = require('./polyfills/matchMedia'),
    matchMediaAddListener = require('./polyfills/matchMedia.addListener');

    chartist   = require('../libs/chartist/dist/chartist.min'),
    clickover  = require('../libs/bootstrapx-clickover/js/bootstrapx-clickover'),
    countdown  = require('../libs/jquery.countdown/dist/jquery.countdown.min'),
    daterangepicker = require('../libs/bootstrap-daterangepicker/daterangepicker'),
    svgeezy    = require('../libs/svgeezy/svgeezy.min'),
    select2    = require('../libs/select2/dist/js/select2.min'),

    dt            = require('datatables.net')(window, $),
    dt_buttons    = require('datatables.net-buttons')(window, $),
    dt_responsive = require('datatables.net-responsive')(window, $),
    dt_select     = require('datatables.net-select')(window, $),

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
