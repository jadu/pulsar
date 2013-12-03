$(document).ready(function() {
  var resizer = $('<div class="resizer"><div class="indicator"></div></div>');
  var resizerLeft = $('<div class="resizer resizer__left"></div>');
  $('.widget').append(resizer, resizerLeft);

  var dragging = false;
  var resizing = false;
  var originalX = 0;
  var currentX = 0;
  var columnsResized = 0;
  var alreadyResized = false;
  var columnCount = 12;

  $('.resizer').on('mousedown', function(e){
    e.preventDefault();
    resizing = true;
    originalX = e.pageX;
    $(this).parent().addClass('operating');
    $('body').css({cursor:'none'});
  }).on('mouseup', function(e){
    e.preventDefault();
  });

  $('body').on('mousemove', function(e){
    if(resizing) {
      var columnWidth = parseInt($('.grid-span-1').outerWidth());
      var columnMargin = parseInt($('.grid-span-1').css('margin-right')) + 1;
      columnWidth += columnMargin;
      console.log(columnWidth);
      currentX = e.pageX;
      var diffX = currentX - originalX;
      if(diffX > 60) {
        var operatingSpan = parseInt($('.operating').attr('class').split('grid-span-')[1].split(' ')[0]);
        var oldSpan = 'grid-span-' + operatingSpan;
        operatingSpan += columnsResized;
        if(operatingSpan < columnCount) {
          columnsResized += 1;
          console.log(columnsResized + ' vs ' + columnCount);
          var indicatorWidth = parseInt($('.operating .resizer .indicator').outerWidth());
          indicatorWidth += columnWidth;
          $('.operating .resizer .indicator').css({ width : indicatorWidth + 'px', right : '-' + indicatorWidth + 'px'});
          diffX = 0;
          originalX = e.pageX;
        }
      }
      else if(diffX < -60) {
        var indicatorWidth = parseInt($('.operating .resizer .indicator').outerWidth());
        indicatorWidth -= columnWidth;
        $('.operating .resizer .indicator').css({ width : indicatorWidth + 'px', right : '-' + indicatorWidth + 'px'});
        diffX = 0;
        originalX = e.pageX;
        columnsResized -= 1;
        if(columnsResized < 0) {
          var operatingSpan = parseInt($('.operating').attr('class').split('grid-span-')[1].split(' ')[0]);
          var oldSpan = 'grid-span-' + operatingSpan;
          operatingSpan += columnsResized;
          if(operatingSpan < 1) {
            operatingSpan = 1;
          }
          else if(operatingSpan > 12) {
            operatingSpan = 12;
          }
          var newSpan = 'grid-span-' + operatingSpan;
          $('.operating').removeClass(oldSpan).addClass(newSpan);
          $('.operating .resizer .indicator').css({width : '0', right : '0' });
          columnsResized = 0; 
        }
      }
    }
    if(dragging) {

    }
  }).on('mouseup', function(e){
    if(resizing) {
      if(!alreadyResized) {
        var operatingSpan = parseInt($('.operating').attr('class').split('grid-span-')[1].split(' ')[0]);
        var oldSpan = 'grid-span-' + operatingSpan;
        operatingSpan += columnsResized;
        if(operatingSpan < 1) {
          operatingSpan = 1;
        }
        else if(operatingSpan > 12) {
          operatingSpan = 12;
        }
        var newSpan = 'grid-span-' + operatingSpan;
        $('.operating').removeClass(oldSpan).addClass(newSpan);
        $('.operating .resizer .indicator').css({width : '0', right : '0' });
        $('.operating').removeClass('operating');
      }
      columnsResized = 0;
      resizing = false;
    }
    if(dragging) {
      dragging = false;
      $('.operating').removeClass('operating');
    }
  });

});