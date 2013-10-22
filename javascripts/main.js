requirejs.config({
    paths: {
        'deck'              : '/javascripts/deck',
        'dropdown'          : '/javascripts/dropdown',
        'flash'             : '/javascripts/flash',
        'highcharts'        : '/libs/highcharts/highcharts',
        'highcharts-theme'  : '/javascripts/highcharts-theme',
        'highlightjs'       : '/libs/highlightjs/highlight.pack',
        'jquery'            : '/libs/jquery/jquery',
        'jquery-mousewheel' : '/libs/jquery-mousewheel/jquery.mousewheel',
        'modal'             : '/javascripts/modal',
        'navigation'        : '/javascripts/navigation',
        'order'             : '/libs/order/index',
        'pulsar'            : '/javascripts/pulsar',
        'sticky'            : '/libs/sticky/jquery.sticky',
        'tab'               : '/javascripts/tab',
        'tooltip'           : '/javascripts/tooltip',
        'vague'             : '/libs/Vague.js/Vague'
    }
});
 
require([
    'jquery',
    'deck',
    'dropdown',
    'flash',
    'modal',
    'navigation',
    'tab',
    'tooltip',
    'pulsar'
], function($) {
    'use strict';
    $();
});