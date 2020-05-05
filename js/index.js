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
    modal                 = require('./libs/modal'),
    tab                   = require('./libs/tab'),
    popover               = require('./libs/popover'),
    tooltip               = require('./libs/tooltip'),
    matchMedia            = require('./polyfills/matchMedia'),
    matchMediaAddListener = require('./polyfills/matchMedia.addListener'),

    dt            = require('datatables.net')(window, $),
    dt_buttons    = require('datatables.net-buttons')(window, $),
    dt_responsive = require('datatables.net-responsive')(window, $),
    dt_select     = require('datatables.net-select')(window, $),

    ButtonComponent = require('./ButtonComponent'),
    DropdownButtonComponent = require('./DropdownButtonComponent'),
    DisableUiComponent = require('./DisableUiComponent'),
    ErrorSummaryComponent = require('./ErrorSummaryComponent'),
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
    StickySidebarComponent = require('./StickySidebarComponent'),
    TableDetailComponent = require('./TableDetailComponent'),
    DropZoneComponentFactory = require('./DropZone/DropZoneComponentFactory'),
    RepeaterManagerComponent = require('./Repeater/RepeaterManagerComponent'),
    repeaterComponentFactory = require('./Repeater/repeaterComponentFactory'),
    FaviconEditor = require('./Notifications/FaviconEditor'),
    tooltipFactory = require('./Tooltips/tooltipsFactory'),
    ModalFocusService = require('./Modals/ModalFocusService'),
    ModalListener = require('./Modals/ModalListener'),

    datePicker = require('pulsar-date-picker');

require('jstree');

module.exports = {
    ButtonComponent,
    DropdownButtonComponent,
    DropZoneComponentFactory,
    DisableUiComponent,
    ErrorSummaryComponent,
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
    StickySidebarComponent,
    TableDetailComponent,
    RepeaterManagerComponent,
    repeaterComponentFactory,
    FaviconEditor,
    tooltipFactory,
    ModalFocusService,
    ModalListener,

    datePicker
};
