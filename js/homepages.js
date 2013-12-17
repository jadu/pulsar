/**
 * Jadu Homepages
 *
 * The UI for the new Homepages
 */
define([
  'jquery',
  'jquery-ui',
  'jquery-ui-touch'
], function() {
    (function ($, window, document, undefined) {

        var dragging = false,
            resizing = false,
            rowDragging = false,
            originalX = 0,
            currentX = 0,
            originalY = 0,
            currentY = 0,
            columnsResized = 0,
            alreadyResized = false,
            columnCount = 12,
            widgetPath = '/var/widgets/',
            homepagePath = '/var/homepages/',
            currentVersion = 0,
            homepageHtml,
            versions = [];

        function createHomepageObject(homepageElement) {
            var homepageObject = [];
            var i = 0;
            console.log(homepageElement.html());
            $(homepageElement).children('.widget-row').each(function(){
                console.log("Loop");
                var row = [];
                var thisRow = $(this);
                thisRow.children('.homepage-widget').each(function(){
                    var thisWidget = $(this);
                    var widget = {};
                    var widgetClass = thisWidget.attr('class');
                    var widgetGuid = thisWidget.data('widget-guid');
                    var widgetVersion = thisWidget.data('widget-version');
                    widget = { classes: widgetClass, guid: widgetGuid, version: widgetVersion};
                    row.push(widget);
                });
                homepageObject.push(row);
            });
            return homepageObject;
        }

        function attachEvents(element) {
            $(element).on('mousedown', '.homepage-widget', function(e){
                e.preventDefault();
                resizing = false;
                dragging = true;
                originalX = e.pageX;
                $(this).addClass('operating');
            });

            $(element).on('mousedown', '.row-handler', function(e){
                e.stopPropagation();
                e.preventDefault();
                rowDragging = true;
                originalY = e.pageY;
                $(this).parent().addClass('operating-row');
            });

            $(element).on('mousedown', '.resizer', function(e){
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
                        if(!operator.is('[class*=offset]') && operator.prev('.homepage-widget').length) {
                            operator.prev('.homepage-widget').before(operator);
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
                    if(diffX > columnWidth) {
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
                    else if(diffX < -columnWidth) {
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
                    newVersion();
                }
                if(dragging) {
                    dragging = false;
                    $('.operating').removeClass('operating');
                    newVersion();
                }
                if(rowDragging) {
                    rowDragging = false;
                    $('.operating-row').removeClass('operating-row');
                    newVersion();
                }
            });

            $(element).on('click', '.remove-widget', function(e){
                e.preventDefault();
                e.stopPropagation();
                if($(this).parent().parent().children().length == 2){ // then it's the last widget in the row
                    $(this).parent().parent().remove();
                }
                else {
                    $(this).parent().remove();
                }
                newVersion();
            });

            $(element).on('click', '.remove-row', function(e){
                e.preventDefault();
                e.stopPropagation();
                $(this).parent().parent().remove();
                newVersion();
            });

            function newVersion() {
                var elementHtml = $('.homepage-item').html();
                elementHtml = $(elementHtml);
                console.log(elementHtml);
                versions[currentVersion + 1] = elementHtml;
                currentVersion += 1;
            }

            function undo(element) {
                if(currentVersion > 0) {
                    element.empty();
                    var undoHtml = versions[currentVersion - 1];
                    element.append(undoHtml);
                    currentVersion -= 1;
                }
            }

            function redo(element) {
                if(currentVersion < versions.length - 1) {
                    element.empty();
                    var redoHtml = versions[currentVersion + 1];
                    element.append(redoHtml);
                    currentVersion += 1;
                }
            }

            $(window).keydown(function(e){
                if(e.metaKey && e.shiftKey &&  e.keyCode == 90) { // Mac Redo CMD + SHIFT + Z
                    e.preventDefault();
                    redo($('.homepage-item'));
                }
                else if(e.metaKey && e.keyCode == 90) { // Mac Undo CMD + Z
                    e.preventDefault();
                    undo($('.homepage-item'));
                }
                else if(e.ctrlKey && e.keyCode == 89) { // Win Redo CMD + Y
                    e.preventDefault();
                    redo($('.homepage-item'));
                }
                else if(e.ctrlKey && e.keyCode == 90) { // Win Undo CMD + Z
                    e.preventDefault();
                    undo($('.homepage-item'));
                }
            });

            $('.focus').on('click', function(e){
                e.preventDefault();
                $('#top, footer').slideToggle();
                $('.grid-master').fadeToggle();
            });

            $('[data-action="undo"]').on('click', function(e){
                e.preventDefault();
                undo($('.homepage-item'));
            });

            $('[data-action="redo"]').on('click', function(e){
                e.preventDefault();
                redo($('.homepage-item'));
            });
        }

        function paintHomepage(element, homepage) {
            var homepageDOM = $('<div class="homepage-item"></div>');
            var resizer = '<div class="resizer"><div class="indicator"></div></div>';
            var resizerLeft = $('<div class="resizer resizer__left"></div>');
            homepage.forEach(function(homepageRow, index){
                var rowDOM = $('<div class="grid-container widget-row"></div>');
                var rowHandler = $('<div class="row-handler column grid-span-12"><a class="icon-remove remove-row></a></div>');
                var rowNo = parseInt(index) + 1;
                var rowTitle = 'Row ' + rowNo;
                rowHandler.append(rowTitle);
                rowDOM.append(rowHandler);
                var widgetCount = homepageRow.length;
                function ajaxLoop(widgetIndex, rowArray) {
                    var widget = rowArray[widgetIndex];
                    var guid = widget.guid;
                    var version = widget.version;
                    var classes = widget.classes;
                    var loadingSpinner = $('<div><i class="icon-spinner"></i><a class="remove-widget icon-remove"></a></div>');
                    loadingSpinner.addClass(classes).append(resizer);
                    rowDOM.append(loadingSpinner);
                    $.ajax({
                      url: widgetPath + guid + '/' + version + '/index.php',
                      success: function (data) {
                            var dataElement = $(data);
                            var newIndex = widgetIndex + 1;
                            loadingSpinner.remove('h2').append(dataElement);
                            if(newIndex < widgetCount) {
                                var widget = rowArray[widgetIndex + 1];
                                ajaxLoop(newIndex, rowArray);
                            }
                            else {
                                homepageDOM.append(rowDOM);
                            }
                        }
                    });
                }
                ajaxLoop(0, homepageRow);
            });
            element.append(homepageDOM);
            versions[0] = homepageDOM;
        }

        function loadHomepageObject(json, element) {
            var homepageLiteral = $.parseJSON(json);
            paintHomepage(element, homepageLiteral);
        }

        function fetchHomepage(guid, element, eventParent) {
            $.ajax({
                url: homepagePath + '/' + guid + '.json'
            }).done(function (data) {
                loadHomepageObject(data, element);
            });
            attachEvents(element, eventParent);
        }

        var homepageContainer = $('.homepage-content');
        var homepageItem = $('.homepage-item');
        fetchHomepage('fillmurray', homepageContainer, homepageItem);

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

    })(jQuery, window, document);
});
