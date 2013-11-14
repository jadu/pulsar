requirejs.config({
    paths: {
        'daterange'         : '/libs/bootstrap-daterangepicker/daterangepicker',
        'deck'              : '/javascripts/deck',
        'dropdown'          : '/javascripts/dropdown',
        'flash'             : '/javascripts/flash',
        'highcharts'        : '/libs/highcharts/highcharts',
        'highcharts-mono'   : '/javascripts/highcharts-mono',
        'highcharts-theme'  : '/javascripts/highcharts-theme',
        'highlightjs'       : '/libs/highlightjs/highlight.pack',
        'jquery'            : '/libs/jquery/jquery',
        'jquery-ui'         : '/libs/jquery.ui/dist/jquery-ui.min',
        'jquery-ui-touch'   : '/libs/jqueryui-touch-punch/jquery.ui.touch-punch.min',
        'jquery-mousewheel' : '/libs/jquery-mousewheel/jquery.mousewheel',
        'modal'             : '/javascripts/modal',
        'moment'            : '/libs/moment/moment',
        'navigation'        : '/javascripts/navigation',
        'order'             : '/libs/order/index',
        'popover'           : '/javascripts/popover',
        'pulsar'            : '/javascripts/pulsar',
        'sparkline'         : '/libs/sparkline/index',
        'sticky'            : '/libs/sticky/jquery.sticky',
        'tab'               : '/javascripts/tab',
        'tooltip'           : '/javascripts/tooltip',
        'vague'             : '/libs/Vague.js/Vague'
    },
    shim: {
        'daterange': {
            deps: ['jquery', 'moment'],
            exports: 'daterange'
        },
        'sparkline': {
            deps: ['jquery']
        },
        'highcharts': {
            deps: ['jquery']
        },
        'highcharts-mono': {
            deps: ['jquery', 'highcharts']
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
