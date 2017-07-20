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
    history   = require('../libs/history.js/scripts/bundled/html5/jquery.history'),
    jqueryui  = require('../libs/jquery-ui/jquery-ui.min'),
    countdown = require('../libs/jquery.countdown/dist/jquery.countdown.min'),
    pikaday   = require('../libs/pikaday/plugins/pikaday.jquery'),
    svgeezy   = require('../libs/svgeezy/svgeezy.min'),
    select2   = require('../libs/select2/dist/js/select2.min'),
    tinycon   = require('../libs/tinyicon/tinycon.min'),

    dt            = require('datatables.net')(window, $),
    dt_buttons    = require('datatables.net-buttons')(window, $),
    dt_responsive = require('datatables.net-responsive')(window, $),
    dt_select     = require('datatables.net-select')(window, $),

    ButtonComponent = require('./ButtonComponent'),
    DisableUiComponent = require('./DisableUiComponent'),
    HelpTextComponent = require('./HelpTextComponent'),
    FilterBarComponent = require('./FilterBarComponent'),
    FlashMessageComponent = require('./FlashMessageComponent'),
    MasterSwitchComponent = require('./MasterSwitchComponent'),
    ModulePermissionsComponent = require('./ModulePermissionsComponent'),
    NavMainComponent = require('./NavMainComponent'),
    PulsarFormComponent = require('./PulsarFormComponent'),
    PulsarUIComponent = require('./PulsarUIComponent'),
    PulsarSortableComponent = require('./PulsarSortableComponent'),
    SignInComponent = require('./area/signin/signin'),
    DropZoneComponentFactory = require('./DropZone/DropZoneComponentFactory');

    require('jstree');

module.exports = {
    ButtonComponent,
    DropZoneComponentFactory,
    DisableUiComponent,
    HelpTextComponent,
    FilterBarComponent,
    FlashMessageComponent,
    MasterSwitchComponent,
    ModulePermissionsComponent,
    NavMainComponent,
    PulsarFormComponent,
    PulsarUIComponent,
    PulsarSortableComponent,
    SignInComponent,
    history,
    svgeezy
};
