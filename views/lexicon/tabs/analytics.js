require(['jquery', 'highcharts'], function() {

  $(document).ready(function() {

    var $container = $('<div>').appendTo($('#container'));

    var analyticsChart = new Highcharts.Chart({
        chart: {
          className: 'chart summary-tab_9',
          renderTo: $container[0],
          type: 'areaspline'
        },
        title: {
            text: ''
        },
        xAxis: {
            categories: ['Week 1', 'Week 2', 'Week 3', 'Week 4', 'Week 5', 'Week 6', 'Week 7', 'Week 8']
        },
        credits: {
            enabled: false
        },
        series: [{
            name: 'Email',
            data: [5, 8, 4, 9, 2, 6, 4, 8]
        }, {
            name: 'Twitter',
            data: [3, -2, -3, 2, -1, 3, -1, 6]
        }, {
            name: 'Facebook',
            data: [-2, 3, 6, -2, 6, -3, 2, 3]
        }]
    });
  });

});
