/**
 * Jadu Homepages
 *
 * The UI for the new Homepages
 */
define([
    'jquery',
    'jquery-ui',
    'jquery-ui-touch',
    'tray'
], function() {
    (function ($, window, document, undefined) {

        var dragging = false,
            resizing = false,
            rowDragging = false,
            newRow,
            newRowPresent = false,
            originalX = 0,
            currentX = 0,
            originalY = 0,
            currentY = 0,
            columnsResized = 0,
            alreadyResized = false,
            columnCount = 12,
            widgetPath = '/var/widgets/',
            homepagePath = '/var/homepages/',
            versions = [],
            fetchRetryTimeout = 50,
            fetchRetryLimit = 5,
            rowMarkup = '<div class="row-handler column grid-span-12"><a class="icon-remove remove-row"></a></div>',
            trayContainer = '.tray',
            widgetConfig,
            widgetData,
            widgetClass = '.widget',
            widgetDataContainer = '#widget__data',
            widgetPath = '/var/widgets/',
            widgetSpan = 4,
            widgetRemoveAttribute = '[data-widget-action=remove]';
            currentVersion = 0,
            homepageHtml = '',
            versions = [],
            changed = false;

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

        function newVersion() {
            var elementHtml = $('.homepage-item').html();
            elementHtml = $(elementHtml);
            console.log('versions: ' + versions.length);
            for(var i = currentVersion + 1; i < versions.length; i++) {
                console.log('i' + i);
                delete versions[i];
            }
            versions[currentVersion + 1] = elementHtml;
            currentVersion += 1;
        }

        function attachEvents(element) {
            $(element).on('mousedown', '.homepage-widget', function(e){
                e.preventDefault();
                resizing = false;
                dragging = true;
                originalX = e.pageX;
                $(this).addClass('operating');
                $(this).parent().addClass('operating-on-child');
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
                $(this).children('.indicator').show();
                $(this).parent().addClass('operating');
                $(this).parent().parent().addClass('operating-on-child');
            }).on('mouseup', function(e){
                e.preventDefault();
            });

            $('body').on('mousemove', function(e){
                if(dragging) {

                    // add a new empty drop target when dragging starts
                    if (!newRowPresent) {
                        createNewRow();
                    }

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
                        $('.operating-on-child').removeClass('operating-on-child');
                        if(columnsResized != 0) {
                            newVersion();
                        }
                    }
                    $('.indicator').hide();
                    columnsResized = 0;
                    resizing = false;
                }
                if(dragging) {
                    dragging = false;
                    $('.operating').removeClass('operating');

                    // check whether we need to keep or remove our new drop target
                    if (newRowPresent) {
                        removeNewRow();
                    }

                    $('.operating-on-child').removeClass('operating-on-child');
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
                if($(this).parent().parent().parent().children().length == 2){ // then it's the last widget in the row
                    $(this).parent().parent().parent().fadeOut(200, function() {
                        $(this).remove();
                        newVersion();
                    });
                }
                else {
                    $(this).parent().parent().fadeOut(100, function() {
                        var remover = $(this);
                        remover.next().css({'margin-left' : remover.outerWidth()});
                        remover.next().animate({'margin-left' : ''}, 120, function() {
                            remover.remove();
                            newVersion();
                        });
                    });
                }
            });

            $(element).on('click', '.remove-row', function(e){
                e.preventDefault();
                e.stopPropagation();
                var rowHeight =  $(this).parent().parent().outerHeight();
                $(this).parent().parent().fadeOut(100, function() {
                    var remover = $(this);
                    if($(this).next().length) {
                        $(this).next().css({'margin-top' : rowHeight });
                        $(this).next().animate({'margin-top' : ''}, 120, function(){
                            remover.remove();
                            newVersion();
                        });
                    }
                    else {
                        remove.remove();
                        newVersion();
                    }
                });
            });

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
                var rowHandler = $(rowMarkup);
                var rowNo = parseInt(index) + 1;
                var rowTitle = 'Row ' + rowNo;
                rowHandler.append(rowTitle);
                rowHandler.append('<a class="icon-remove remove-row"></a>');
                rowDOM.append(rowHandler);
                var widgetCount = homepageRow.length;
                function ajaxLoop(widgetIndex, rowArray) {
                    var widget = rowArray[widgetIndex];
                    var guid = widget.guid;
                    var version = widget.version;
                    var classes = widget.classes;
                    var loadingSpinner = $('<div><div class="overlay"></div><i class="icon-spinner"></i><div class="icon-container"><a class="edit-widget-settings icon-wrench"></a> <a class="remove-widget icon-remove"></a></div></div>');
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

        function createNewRow() {
            var rows = $('.widget-row'),
                lastRow = $('.widget-row:last-of-type'),
                rowDom = $('<div class="grid-container widget-row widget-row-new"></div>'),
                rowHandler = $(rowMarkup),
                rowNo = rows.length += 1,
                rowTitle = 'Row ' + rowNo;

            rowHandler.append(rowTitle);
            rowDom.append(rowHandler);
            lastRow.after(rowDom);

            newRowPresent = true;
        }

        function removeNewRow() {
            // our new row *should* always be the last one added
            var lastRow = $('.widget-row-new');

            // if the new row doesn't contain widgets, remove it
            if (lastRow.find('.widget').length <= 0) {
                lastRow.remove();
            }

            // reset the flag for the next dragging operation
            newRowPresent = false;
        }

        function loadHomepageObject(json, element) {
            var homepageLiteral = $.parseJSON(json); // Others
            //var homepageLiteral = $.parseJSON(JSON.stringify(json)); // IE
            paintHomepage(element, homepageLiteral);
        }

        function fetchHomepage(guid, element, eventParent) {
            $.ajax({
                url: homepagePath + '/' + guid + '.json'
            }).done(function (data) {
                loadHomepageObject(data, element);
            });
            attachEvents(element);

            // set up the tray
            $(trayContainer).tray();

            /**
             * only init droppable behaviour on the widget-rows when the tray button
             * is clicked, this makes the massive assumption that the homepage paint
             * will be completed before the user clicks this button
             */
            $('[data-toggle=tray]').on('click', function() {
                if (!newRowPresent) {
                    createNewRow();
                } else {
                    removeNewRow();
                }

                initDroppable();
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

        function initDroppable() {
            $('.widget-row').droppable({
                accept: '.widget',
                activeClass: 'ui-state-highlight',
                hoverClass: 'row-droppable',
                drop: function (e, ui) {

                    // clone the dragged widget and drop it
                    var droppedWidget = $(ui.draggable)
                                         .clone()
                                         .appendTo(this);

                    function isFetched() {

                        // check if we've got the widget data back from the ajax call
                        widgetData = $(widgetDataContainer).val();

                        // if we've got it, do stuff
                        if (widgetData !== '') {
                            var sender = ui.draggable;

                            // if a widget has a defined span, override the default
                            if (sender.data('widget-grid-span')) {
                                widgetSpan = sender.data('widget-grid-span');
                            }

                            // populate widget content
                            var widget = droppedWidget.html(widgetData)
                                          .addClass('grid-span-' + widgetSpan + ' column')
                                          .uniqueId(); // attach unique identifier

                            // reset last-appended flag on all widgets except this one
                            $(widgetClass).not(widget)
                                .removeAttr('data-last-appended');

                            // populate data attributes in new widget instance
                            widget.data('widget', sender.data('widget'))
                                  .data('widget-title', sender.data('widget-title'))
                                  .data('widget-description', sender.data('widget-description'))
                                  .attr('data-last-appended', 'true');

                            // tidy up after ourselves
                            $(widgetDataContainer).val('');
                            widgetData = '';
                        } else {

                            // otherwise ajax hasn't finished so wait a bit more...
                            setTimeout(isFetched, fetchRetryTimeout);
                        }
                    }

                    /**
                     * if the fetch started by the dragging event hasn't finished,
                     * keep checking for the response...
                     */
                    isFetched();
                }
            });

        }

    })(jQuery, window, document);
});
