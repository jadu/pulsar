var path = '';

// Set by /public_html/jadu/assets/js/config.js
if (window.jadu.requireJsPath) {
    var path = window.jadu.requireJsPath;
}

requirejs.config({
    paths: {
        'console-js'        : path + '/libs/console-js/console',
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
        'jquery'            : path + '/libs/jquery/jquery',
        'jquery-ui'         : path + '/libs/jquery.ui/dist/jquery-ui.min',
        'jquery-ui-touch'   : path + '/libs/jqueryui-touch-punch/jquery.ui.touch-punch.min',
        'jquery-mousewheel' : path + '/libs/jquery-mousewheel/jquery.mousewheel',
        'modal'             : path + '/js/modal',
        'moment'            : path + '/libs/moment/moment',
        'navigation'        : path + '/js/navigation',
        'order'             : path + '/libs/order/index',
        'popover'           : path + '/js/popover',
        'pulsar'            : path + '/js/pulsar',
        'sticky'            : path + '/libs/sticky/jquery.sticky',
        'store-js'          : path + '/libs/store.js/store',
        'tab'               : path + '/js/tab',
        'tooltip'           : path + '/js/tooltip',
        'tray'              : path + '/js/tray',
        'vague'             : path + '/libs/Vague.js/Vague'
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
    'modal',
    'navigation',
    'popover',
    'tab',
    'tooltip',
    'pulsar'
], function($) {
    'use strict';
    // $();
});
