$(document).ready(function() {
    var resizer = $('<div class="resizer"><div class="indicator"></div></div>');
    var resizerLeft = $('<div class="resizer resizer__left"></div>');
    $('.widget').append(resizer, resizerLeft);

    var dragging = false;
    var resizing = false;
    var rowDragging = false;
    var originalX = 0;
    var currentX = 0;
    var originalY = 0;
    var currentY = 0;
    var columnsResized = 0;
    var alreadyResized = false;
    var columnCount = 12;

    function manipulateOffset(operator, direction) {
        if(!(operator.is('[class*=offset]')) && direction == 'right') {
            operator.addClass('offset-1');
        }
        else if(direction == 'right') {
            var operatingOffset = parseInt(operator.attr('class').split('offset-')[1].split(' ')[0]);
            var oldOffset = 'offset-' + operatingOffset;
            operatingOffset += 1;
            var newOffset = 'offset-' + operatingOffset;
            operator.removeClass(oldOffset).addClass(newOffset)
        }
        else if(direction == 'left') {
            console.log('left');
            var operatingOffset = parseInt(operator.attr('class').split('offset-')[1].split(' ')[0]);
            var oldOffset = 'offset-' + operatingOffset;
            operatingOffset -= 1;
            if(operatingOffset == 0) {
                operator.removeClass(oldOffset);
            }
            else {
                var newOffset = 'offset-' + operatingOffset;
                operator.removeClass(oldOffset).addClass(newOffset)
            }
        }
    }

    $('.widget').on('mousedown', function(e){
        e.preventDefault();
        resizing = false;
        dragging = true;
        originalX = e.pageX;
        $(this).addClass('operating');
    });

    $('.row-handler').on('mousedown', function(e){
        e.stopPropagation();
        e.preventDefault();
        rowDragging = true;
        originalY = e.pageY;
        $(this).parent().addClass('operating-row');
    });

    $('.resizer').on('mousedown', function(e){
        e.stopPropagation();
        e.preventDefault();
        resizing = true;
        originalX = e.pageX;
        $(this).parent().addClass('operating');
    }).on('mouseup', function(e){
        e.preventDefault();
    });

    $('body').on('mousemove', function(e){
        if(dragging) {
            var operator = $('.operating');
            currentX = e.pageX;
            var diffX = currentX - originalX;
            if(diffX > 60) {
                if(operator.next().length) {
                    operator.next().after(operator);
                    diffX = 0;
                    originalX = e.pageX;
                }
                else if(diffX > 90) {
                    manipulateOffset(operator, 'right');
                    diffX = 0;
                    originalX = e.pageX;
                }
            }
            else if(diffX < -60) {
                if(!operator.is('[class*=offset]') && operator.prev('.widget').length) {
                    operator.prev('.widget').before(operator);
                    diffX = 0;
                    originalX = e.pageX;
                }
                else if(diffX < -90) {
                    manipulateOffset(operator, 'left');
                    diffX = 0;
                    originalX = e.pageX;
                }
            }
        }
        if(rowDragging) {
            var operatingRow = $('.operating-row');
            currentY = e.pageY;
            var diffY = currentY - originalY;
            console.log(diffY);
            if(diffY < -100) {
                if(operatingRow.prev('.widget-row').length) {
                    operatingRow.prev('.widget-row').before(operatingRow);
                    diffY = 0;
                    originalY = e.pageY;
                }
            }
            else if(diffY > 100) {
                if(operatingRow.next('.widget-row').length) {
                    operatingRow.next('.widget-row').after(operatingRow);
                    diffY = 0;
                    originalY = e.pageY;
                }
            }
        }
        if(resizing) {
            var columnWidth = parseInt($('.grid-span-1').outerWidth());
            var columnMargin = parseInt($('.grid-span-1').css('margin-right')) + 1;
            columnWidth += columnMargin;
            currentX = e.pageX;
            var diffX = currentX - originalX;
            if(diffX > 60) {
                var operatingSpan = parseInt($('.operating').attr('class').split('grid-span-')[1].split(' ')[0]);
                var oldSpan = 'grid-span-' + operatingSpan;
                operatingSpan += columnsResized;
                if(operatingSpan < columnCount) {
                    columnsResized += 1;
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
        if(rowDragging) {
            rowDragging = false;
            $('.operating-row').removeClass('operating-row');
        }
    });

    $('.focus').on('click', function(e){
        console.log('hello');
        $('#top, footer').slideToggle();
        $('.grid-master').fadeToggle();
    });

});