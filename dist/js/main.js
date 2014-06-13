// The default path used by the Grunfile
var path = '';

// Set by /public_html/jadu/assets/js/config.js
if (window.jadu.requireJsPath) {
    path = window.jadu.requireJsPath;
}

requirejs.config({
    paths: {
        'actions-menu'      : path + '/js/actions-menu',
        'console-js'        : path + '/libs/console-js/console',
        'datagrid'          : path + '/js/datagrid',
        'daterange'         : path + '/libs/bootstrap-daterangepicker/daterangepicker',
        'deck'              : path + '/js/deck',
        'dashboard'         : path + '/js/dashboard',
        'dropdown'          : path + '/js/dropdown',
        'flash'             : path + '/js/flash',
        'highcharts'        : path + '/libs/highcharts/highcharts',
        'highcharts-more'   : path + '/libs/highcharts/highcharts-more',
        'highcharts-mono'   : path + '/js/highcharts-mono',
        'highcharts-theme'  : path + '/js/highcharts-theme',
        'highlightjs'       : path + '/libs/highlightjs/highlight.pack',
        'homepages'         : path + '/js/homepages',
        'jquery'            : path + '/libs/jquery/dist/jquery.min',
        'jquery-ui'         : path + '/libs/jqueryui/js/jquery-ui-1.10.4.custom.min',
        'jquery-ui-touch'   : path + '/libs/jqueryui-touch-punch/jquery.ui.touch-punch.min',
        'jquery-mousewheel' : path + '/libs/jquery-mousewheel/jquery.mousewheel',
        'jquery-placeholder': path + '/libs/jquery-placeholder/jquery.placeholder',
        'modal'             : path + '/js/modal',
        'moment'            : path + '/libs/moment/moment',
        'navigation'        : path + '/js/navigation',
        'order'             : path + '/libs/order/index',
        'pikaday'           : path + '/libs/pikaday/pikaday',
        'popover'           : path + '/js/popover',
        'pulsar'            : path + '/js/pulsar',
        'sticky'            : path + '/libs/sticky/jquery.sticky',
        'store-js'          : path + '/libs/store.js/store',
        'tab'               : path + '/js/tab',
        'tooltip'           : path + '/js/tooltip',
        'tray'              : path + '/js/tray',
        'vague'             : path + '/libs/Vague.js/Vague',
        'zeroclipboard'     : path + '/libs/zeroclipboard/dist/ZeroClipboard.min'
    },
    shim: {
        'daterange': {
            deps: ['jquery', 'moment'],
            exports: 'daterange'
        },
        'highcharts': {
            deps: ['jquery']
        },
        'highcharts-more': {
            deps: ['jquery', 'highcharts']
        },
        'jquery-ui': {
            deps: ['jquery']
        },
        'pikaday': {
            deps: ['moment']
        }
    }
});

require([
    'console-js',
    'jquery',
    'dashboard',
    'deck',
    'dropdown',
    'flash',
    'homepages',
    'modal',
    'navigation',
    'tab',
    'popover',
    'tooltip',
    'pulsar'
], function($) {
    'use strict';
    // $();
});
