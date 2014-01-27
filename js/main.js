var path = '';

// Set by /public_html/jadu/assets/js/config.js
if (window.jadu.requireJsPath) {
    var path = window.jadu.requireJsPath;
}

requirejs.config({
    paths: {
        'daterange'         : path + '/libs/bootstrap-daterangepicker/daterangepicker',
        'deck'              : path + '/js/deck',
        'dropdown'          : path + '/js/dropdown',
        'flash'             : path + '/js/flash',
        'highcharts'        : path + '/libs/highcharts/highcharts',
        'highcharts-mono'   : path + '/js/highcharts-mono',
        'highcharts-theme'  : path + '/js/highcharts-theme',
        'highlightjs'       : path + '/libs/highlightjs/highlight.pack',
        'jquery'            : path + '/libs/jquery/jquery',
        'jquery-mousewheel' : path + '/libs/jquery-mousewheel/jquery.mousewheel',
        'modal'             : path + '/js/modal',
        'moment'            : path + '/libs/moment/moment',
        'navigation'        : path + '/js/navigation',
        'order'             : path + '/libs/order/index',
        'popover'           : path + '/js/popover',
        'pulsar'            : path + '/js/pulsar',
        'sparkline'         : path + '/libs/sparkline/index',
        'sticky'            : path + '/libs/sticky/jquery.sticky',
        'store-js'          : path + '/libs/store.js/store',
        'tab'               : path + '/js/tab',
        'tooltip'           : path + '/js/tooltip',
        'vague'             : path + '/libs/Vague.js/Vague'
    },
    shim: {
        'daterange': {
            deps: ['jquery', 'moment'],
            exports: 'daterange'
        }
    }
});
 
require([
    'jquery',
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
});
