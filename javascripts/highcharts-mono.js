require(['jquery', 'highcharts'], function() {

  var width= $(window).width();

  Highcharts.theme = {
   
    colors: ['#333333', '#666666', '#99999'],
    chart: {
      backgroundColor: '#FFF',
      plotBackgroundColor: null,
      plotShadow: false,
      plotBorderWidth: 0
    }

  };

  Highcharts.setOptions(Highcharts.theme);

});