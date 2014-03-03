requirejs.config({
    paths: {
        'daterange'         : '/libs/bootstrap-daterangepicker/daterangepicker',
        'deck'              : '/js/deck',
        'dropdown'          : '/js/dropdown',
        'flash'             : '/js/flash',
        'highcharts'        : '/libs/highcharts/highcharts',
        'highcharts-mono'   : '/js/highcharts-mono',
        'highcharts-theme'  : '/js/highcharts-theme',
        'highlightjs'       : '/libs/highlightjs/highlight.pack',
        'jquery'            : '/libs/jquery/jquery',
        'jquery-mousewheel' : '/libs/jquery-mousewheel/jquery.mousewheel',
        'modal'             : '/js/modal',
        'moment'            : '/libs/moment/moment',
        'navigation'        : '/js/navigation',
        'order'             : '/libs/order/index',
        'popover'           : '/js/popover',
        'pulsar'            : '/js/pulsar',
        'sparkline'         : '/libs/sparkline/index',
        'sticky'            : '/libs/sticky/jquery.sticky',
        'tab'               : '/js/tab',
        'tooltip'           : '/js/tooltip',
        'vague'             : '/libs/Vague.js/Vague'
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
    $();
});
