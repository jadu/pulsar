/**
 * Pulsar
 *
 * Core UI components that should always be present.
 *
 * Jadu Ltd.
 */

// Fixes issue with dependencies that expect both $ and jQuery to be set
window.jQuery = window.$ = require('jquery');

require('babel-polyfill');

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
    jqueryui  = require('../libs/jquery-ui/jquery-ui.min'),
    countdown = require('../libs/jquery.countdown/dist/jquery.countdown.min'),
    pikaday   = require('../libs/pikaday/plugins/pikaday.jquery'),
    svgeezy   = require('../libs/svgeezy/svgeezy.min'),
    select2   = require('../libs/select2/dist/js/select2.min'),
    tinycon   = require('../libs/tinyicon/tinycon.min'),

    dt            = require('datatables.net'),
    dt_buttons    = require('datatables.net-buttons'),
    dt_responsive = require('datatables.net-responsive'),
    dt_select     = require('datatables.net-select'),

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
    TableDetailComponent = require('./TableDetailComponent'),
    DropZoneComponentFactory = require('./DropZone/DropZoneComponentFactory'),
    RepeaterManagerComponent = require('./Repeater/RepeaterManagerComponent'),
    repeaterComponentFactory = require('./Repeater/repeaterComponentFactory'),
    FaviconEditor = require('./Notifications/FaviconEditor');

require('jstree');
require('../libs/history.js/scripts/bundled/html5/jquery.history');

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
    TableDetailComponent,
    history,
    svgeezy,
    RepeaterManagerComponent,
    repeaterComponentFactory,
    FaviconEditor
};
