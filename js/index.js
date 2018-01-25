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
    matchMediaAddListener = require('./polyfills/matchMedia.addListener'),

    clickover = require('../libs/bootstrapx-clickover/js/bootstrapx-clickover'),
    countdown = require('../libs/jquery.countdown/dist/jquery.countdown.min'),
    history   = require('../libs/history.js/scripts/bundled/html5/jquery.history'),
    jqueryui  = require('../libs/jquery-ui/jquery-ui.min'),
    pikaday   = require('../libs/pikaday/plugins/pikaday.jquery'),
    select2   = require('../libs/select2/dist/js/select2.min'),
    svgeezy   = require('../libs/svgeezy/svgeezy.min'),
    tinycon   = require('../libs/tinyicon/tinycon.min'),

    dt            = require('datatables.net')(window, $),
    dt_buttons    = require('datatables.net-buttons')(window, $),
    dt_responsive = require('datatables.net-responsive')(window, $),
    dt_select     = require('datatables.net-select')(window, $),

    ButtonComponent = require('./ButtonComponent'),
    DisableUiComponent = require('./DisableUiComponent'),
    DropZoneComponentFactory = require('./DropZone/DropZoneComponentFactory'),
    FilterBarComponent = require('./FilterBarComponent'),
    FlashMessageComponent = require('./FlashMessageComponent'),
    HelpTextComponent = require('./HelpTextComponent'),
    MasterSwitchComponent = require('./MasterSwitchComponent'),
    ModulePermissionsComponent = require('./ModulePermissionsComponent'),
    NavMainComponent = require('./NavMainComponent'),
    PasswordStrengthChecker = require('./PasswordStrengthChecker/PasswordStrengthCheckerComponent'),
    PulsarFormComponent = require('./PulsarFormComponent'),
    PulsarUIComponent = require('./PulsarUIComponent'),
    PulsarSortableComponent = require('./PulsarSortableComponent'),
    SignInComponent = require('./area/signin/signin');

    require('jstree');

module.exports = {
    ButtonComponent,
    DropZoneComponentFactory,
    DisableUiComponent,
    FilterBarComponent,
    FlashMessageComponent,
    HelpTextComponent,
    history,
    MasterSwitchComponent,
    ModulePermissionsComponent,
    NavMainComponent,
    PasswordStrengthChecker,
    PulsarFormComponent,
    PulsarUIComponent,
    PulsarSortableComponent,
    SignInComponent,
    svgeezy
};
