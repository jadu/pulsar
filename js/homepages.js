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
            mobileSize = 480,
            widgetPath = '/var/widgets/',
            homepagePath = '/var/homepages/',
            versions = [],
            fetchRetryTimeout = 50,
            fetchRetryLimit = 5,
            originalRow, // where a widget was dragged from
            hoveredRow, // where a widget is dragged over
            rowOverlay = '<div class="row-overlay"><i class="icon-plus-sign"></i> Drop widget here</div>',
            rowMarkup = '<div class="row-handler column grid-span-12"><a class="icon-magic fill-row" data-toggle="tooltips" data-original-title="Resize widgets to fill row" data-placement="left"></a><a class="icon-remove remove-row"></a></div>',
            enabledTooltipMessage = 'Resize widgets to fill row',
            disabledTooltipMessage = 'Widgets cannot be auto–sized',
            trayContainer = '.tray',
            widgetConfig,
            widgetData,
            widgetClass = '.widget',
            widgetSkeleton = $('<div></div>');
            widgetDataContainer = '#widget__data',
            widgetPath = '/var/widgets/',
            widgetSpan = 4,
            widgetRemoveAttribute = '[data-widget-action=remove]';
            currentVersion = 0,
            homepageHtml = '',
            versions = [],
            startPosition = 0, // used for calculating if a new version should be created when something is moved
            changed = false;

        function createHomepageObject(homepageElement) {
            var homepageObject = [];
            var i = 0;
            $(homepageElement).children('.widget-row').each(function(){
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

        /**
         * adds the handlers for drag/drop/settings/close functions for a widget
         * which may be painted on load, or dropped in from the tray
         */
        $.fn.attachWidgetUI = function() {
            return this.each(function(index, element) {
                var controls = '<div class="icon-container"><a class="edit-widget-settings icon-wrench"></a> <a class="remove-widget icon-remove"></a></div>',
                    overlay = '<div class="overlay"></div>',
                    resizer = '<div class="resizer"><div class="indicator"></div></div>',
                    resizerLeft = '<div class="resizer resizer__left"></div>',
                    spinner = '<i class="icon-spinner"></i>';

                $(this)
                    .addClass('homepage-widget draggable resizable')
                    .prepend(overlay, spinner, controls)
                    .append(resizer);
            });
        }

        function paintHomepage(element, homepage) {
            var homepageDOM = $('<div class="homepage-item"></div>');

            homepage.forEach(function(homepageRow, index) {
                var rowDOM = $('<div class="grid-container widget-row"></div>'),
                    rowHandler = $(rowMarkup),
                    rowNo = parseInt(index) + 1,
                    rowTitle = 'Row ' + rowNo;

                rowHandler.append(rowTitle);
                rowHandler.append('<a class="icon-remove remove-row"></a>');
                rowDOM.append(rowHandler);

                var widgetCount = homepageRow.length;

                function ajaxLoop(widgetIndex, rowArray) {
                    var widget = rowArray[widgetIndex],
                        guid = widget.guid,
                        version = widget.version,
                        classes = widget.classes,

                    widgetContainer = widgetSkeleton
                                        .clone()
                                        .addClass(classes)
                                        .attr('data-widget-guid', guid)
                                        .attachWidgetUI();

                    rowDOM.append(widgetContainer);

                    $.ajax({
                        url: widgetPath + guid + '/' + version + '/index.php',
                        success: function (data) {
                            var dataElement = $(data);
                            var newIndex = widgetIndex + 1;
                            widgetContainer.remove('h2').append(dataElement);
                            if(newIndex < widgetCount) {
                                var widget = rowArray[widgetIndex + 1];
                                ajaxLoop(newIndex, rowArray);
                            }
                            else {
                                homepageDOM.append(rowDOM);
                                if(rowNo == homepage.length) {
                                    versions[1] = homepageDOM.html();
                                    currentVersion = 1;
                                }
                            }
                            loadTooltips();
                            updateActionsMenu();
                            $('.icon-spinner', widgetContainer).remove();
                        }
                    });

                }
                ajaxLoop(0, homepageRow);
            });
            element.append(homepageDOM);
        }

        function loadTooltips() {
            $('.fill-row').each(function(){
                if($(this).hasClass('disabled')) {
                    $(this).attr('data-original-title', disabledTooltipMessage);
                }
                else {
                    $(this).attr('data-original-title', enabledTooltipMessage);
                }
            });
            $('[data-toggle="tooltips"]').tooltips();
        }

        function updateActionsMenu() {

            // disable actions if homepage empty
            if ($('.homepage-item > .widget-row').length === 0) {
                $('[data-action=clear-homepage-confirmation]').parent().addClass('disabled', 'disabled');
            };
        }

        function newVersion() {
            var elementHtml = $('.homepage-item').html();
            elementHtml = elementHtml;
            var numberToRemove = versions.length - currentVersion; // we want to remove everything after the current version in the array
            if(numberToRemove > 1) {
                // if the 'current' version (i.e. the version before the user's change) is not the latest change
                // then we have to remove everything after it in the versions array, so that the user
                // cannot perform the redo function to get to 'old' versions of their homepage
                numberToRemove *= -1; // so we can splice from the end of the versions array
                numberToRemove += 1;
                versions.splice(numberToRemove);
            }
            
            currentVersion += 1;

            // add the new version we've just created
            versions[currentVersion] = elementHtml; 
            
            // restart start position for next moves
            startPosition = 0; 

            // check rows and enable/disable auto–fill button accordingly
            $('.widget-row').each(function() {
                var noOfWidgets = $(this).children('.homepage-widget').length;
                var fillButton = $(this).find('.fill-row');
                if(columnCount % noOfWidgets) {
                    fillButton.addClass('disabled');
                }
                else {
                    fillButton.removeClass('disabled');
                }
                loadTooltips();
            });
            
            // enable or disable specific actions based on current homepage state
            updateActionsMenu();
        }

        /**
         * binds the event handlers for all widgets in a painted homepage, and
         * those that will be created later through ajax
         */
        $.fn.makeDraggable = function() {
            return this.each(function(index, element) {

                $(element).on('mousedown', '.homepage-widget', function(e){
                    e.preventDefault();
                    resizing = false;
                    dragging = true;
                    originalX = e.pageX;

                    $(this).addClass('operating');
                    $(this).parent().addClass('operating-on-child');

                    originalRow = $(this).parent();
                    hoveredRow = originalRow;
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

                $(element).on('click', '.remove-widget', function(e){
                    e.preventDefault();
                    e.stopPropagation();
                    var widgetRow = $(this).parent().parent().parent();
                    if(widgetRow.children().length == 2){ // then it's the last widget in the row
                        widgetRow.fadeOut(200, function() {
                            $(this).remove();
                            newVersion();
                        });
                    }
                    else {
                        $(this).parent().parent().fadeOut(100, function() {
                            var remover = $(this);
                            var nextWidget = remover.next();
                            if(nextWidget.length) {
                                remover.next().css({'margin-left' : remover.outerWidth()});
                                remover.next().animate({'margin-left' : ''}, 120, function() {
                                    remover.remove();
                                    newVersion();
                                });
                            }
                            else {
                                remover.remove();
                                newVersion();
                            }
                        });
                    }
                });

                $(element).on('click', '.remove-row', function(e) {
                    e.preventDefault();
                    e.stopPropagation();
                    var row = $(this).parent().parent();

                    /**
                     * request confirmation if attempting to remove a row which
                     * contains widgets
                     */
                    if (row.has('.homepage-widget').length) {
                        var modal = $('#remove_row_modal');

                        // pass the row's index to the modal action
                        $('[data-action=remove-row]', modal).data('row', $('.widget-row').index(row));
                        modal.modal('show');
                        return false;
                    }

                    // remove the row immediately if its empty
                    row.removeRow();
                });

                $(element).on('click', '.fill-row', function(e) {
                    e.stopPropagation();
                    var widgets = $(this).parent().parent().children('.homepage-widget');
                    var newSpan = columnCount / widgets.length;
                    newSpan = 'grid-span-' + newSpan;
                    widgets.addClass(newSpan);
                    newVersion();
                });
            });
        }

        /**
         * remove a homepage row and its contents (or a collection of them)
         */
        $.fn.removeRow = function() {
            var i = this.length;

            this.each(function(index, element) {
                var self = $(this),
                    rowHeight = self.outerHeight();

                self.animate({'opacity' : 0}, 150, function() {
                    self.slideUp(120, function() {
                        self.remove();
                        i--;

                        // create new version after all rows are removed
                        if (i === 0) {
                            newVersion();
                        }
                    });
                });
            });
        }

        /**
         * find out if the new row contains widgets or not
         * @return {boolean} true if empty, false if full
         */
        function newRowEmpty() {
            if (!newRowPresent && !$('.widget-row:last-of-type').not(':has(.homepage-widget)').length) {
                return false
            }
            return true;
        }

        function attachEvents(element) {
            $('body').on('mousemove', function(e) {
                if(dragging) {

                    /**
                     * add a new empty drop target when dragging starts, as long
                     * as the last row is not already empty
                     */
                    if (!newRowEmpty()) {
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
                            startPosition += 1;
                        }
                        else if(diffX > 90) {
                            manipulateOffset(operator, 'right');
                            diffX = 0;
                            originalX = e.pageX;
                            startPosition += 1;
                        }
                    }
                    else if(diffX < -60) {
                        if(!operator.is('[class*=offset]') && operator.prev('.homepage-widget').length) {
                            operator.prev('.homepage-widget').before(operator);
                            diffX = 0;
                            originalX = e.pageX;
                            startPosition -= 1;
                        }
                        else if(diffX < -90) {
                            manipulateOffset(operator, 'left');
                            diffX = 0;
                            originalX = e.pageX;
                            startPosition -= 1;
                        }
                    }

                    if(rowDragging) {
                        var operatingRow = $('.operating-row');
                        var previousHeight = operatingRow.prev().outerHeight() * -1;
                        var nextHeight = operatingRow.next().outerHeight();
                        currentY = e.pageY;
                        var diffY = currentY - originalY;
                        if(diffY < -100 && diffY < previousHeight) {
                            if(operatingRow.prev('.widget-row').length) {
                                operatingRow.prev('.widget-row').before(operatingRow);
                                diffY = 0;
                                originalY = e.pageY;
                                startPosition += 1;
                            }
                        }
                        else if(diffY > 100 && diffY > nextHeight) {
                            if(operatingRow.next('.widget-row').length) {
                                operatingRow.next('.widget-row').after(operatingRow);
                                diffY = 0;
                                originalY = e.pageY;
                                startPosition -= 1;
                            }
                        }
                    }
                }

                if(resizing) {
                    var columnWidth = parseInt($('.grid-span-1').outerWidth());
                    var columnMargin = parseInt($('.grid-span-1').css('margin-right')) + 1;
                    columnWidth += columnMargin;
                    currentX = e.pageX;
                    var diffX = currentX - originalX;
                    if(diffX > columnWidth) { // if we should resize upwards
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
                            startPosition += 1;
                        }
                    }
                    else if(diffX < -columnWidth) { // if we should resize downwards
                        var indicatorWidth = parseInt($('.operating .resizer .indicator').outerWidth());
                        indicatorWidth -= columnWidth;
                        $('.operating .resizer .indicator').css({ width : indicatorWidth + 'px', right : '-' + indicatorWidth + 'px'});
                        diffX = 0;
                        originalX = e.pageX;
                        columnsResized -= 1;
                        startPosition -= 1;
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
                    }
                    $('.indicator').hide();
                    columnsResized = 0;
                    resizing = false;
                }
                if(dragging) {
                    var operatedWidget = $('.operating');
                    dragging = false;

                    /**
                     * if we've dragged a widget to another row, move it, and
                     * strip any offset classes which would be carried over
                     * into the new row and affect the layout
                     */
                    if (hoveredRow != null && hoveredRow != originalRow) {
                        operatedWidget
                            .detach()
                            .removeClass(function(index, css) {
                                return (css.match(/\boffset-\d+/g) || []).join(' ');
                            })
                            .appendTo(hoveredRow);
                    }

                    operatedWidget.removeClass('operating');

                    /**
                     * if the new row hasn't been used, we can safely remove it,
                     * otherwise, we can promote it to a real row
                     */
                    if (newRowPresent) {
                        if (hoveredRow[0] != newRow[0]) {
                            removeNewRow();
                        } else {
                            newRow.removeClass('widget-row-new');
                            newRowPresent = false;
                        }
                    }

                    $('.operating-on-child').removeClass('operating-on-child');
                }

                // remove all row overlays
                $('.row-overlay').remove();

                if(rowDragging) {
                    rowDragging = false;
                    $('.operating-row').removeClass('operating-row');
                }
                if(startPosition != 0) {
                    newVersion();
                }

            });

            /**
             * show overlay when attempting to drag widgets to another row as
             * long as we're not attempting to drop onto the original row
             */
            $('body').on('mouseenter', '.widget-row', function(e) {
                if (dragging) {
                    hoveredRow = $(this);
                    if (hoveredRow[0] != originalRow[0]) {
                        $(this).prepend(rowOverlay);
                    }
                }
            }).on('mouseleave', '.widget-row', function(e) {
                if (dragging) {
                    hoveredRow = null;
                    $('.row-overlay', this).remove();
                }
            }).on('click', '[data-action=remove-row]', function(e) {
                $('.widget-row')[$(this).data('row')].remove();
                $('#remove_row_modal').modal('hide');
                newVersion();
            }).on('click', '[data-action=clear-homepage-confirmation]', function(e) {
                e.preventDefault();
                $('#clear_homepage_modal').modal('show');
            }).on('click', '[data-action=clear-homepage]', function(e) {
                $('.widget-row').removeRow();
                $('#clear_homepage_modal').modal('hide');
            });

            function undo(element) {
                if(currentVersion > 1) {
                    element.empty();
                    currentVersion -= 1;
                    var undoHtml = versions[currentVersion];
                    element.append(undoHtml);
                    $('.widget-row').makeDroppable();
                }
            }

            function redo(element) {
                if(currentVersion < versions.length - 1) {
                    element.empty();
                    var redoHtml = versions[currentVersion + 1];
                    element.append(redoHtml);
                    $('.widget-row').makeDroppable();
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

            $('[data-toggle="grid"]').on('click', function(e){
                e.preventDefault();
                $('.grid-master').fadeToggle(200);
                $(this).toggleClass('active');
            });

            $('[data-action="undo"]').on('click', function(e){
                e.preventDefault();
                undo($('.homepage-item'));
            });

            $('[data-action="redo"]').on('click', function(e){
                e.preventDefault();
                redo($('.homepage-item'));
            });

            $('[data-homepage-mode=mobile]').on('click', function(e){
                e.preventDefault();
                element.removeClass('tablet-view');
                element.addClass('mobile-view');
            });

            $('[data-homepage-mode=tablet]').on('click', function(e){
                e.preventDefault();
                element.removeClass('mobile-view');
                element.addClass('tablet-view');
            });

            $('[data-homepage-mode=desktop]').on('click', function(e){
                e.preventDefault();
                element.removeClass('mobile-view');
                element.removeClass('tablet-view');
            });

            /**
             * when the settings are toggled, update any actions which need to
             * use this widget's id
             */
            $('body').on('click', '.edit-widget-settings', function(e) {
                $('.widget-default-controls').fadeIn(200);
                $('[data-widget-id]').data('widget-id', $(this).closest('.homepage-widget').attr('id'));
            });

            $('[data-action=widget-duplicate]').on('click', function(e) {
                e.preventDefault();
                var self = $(this),
                    source = $('#' + self.data('widget-id')),
                    clone = source.clone();

                // make sure duplicated widgets have a new unique id
                clone
                    .removeUniqueId()
                    .uniqueId();

                // insert it immediately after the source widget
                source.after(clone);
                newVersion();
            });
        }

        function createNewRow(returnRow, rowNo) {
            var rows = $('.widget-row'),
                lastRow = $('.widget-row:last-of-type'),
                rowDom = $('<div class="grid-container widget-row"></div>'),
                rowHandler = $(rowMarkup),
                rowTitle = '';

            if (!rowNo) {
                rowNo = rows.length += 1;
                rowDom.addClass('widget-row-new');
            }

            rowTitle = 'Row ' + rowNo;
            rowHandler.append(rowTitle);
            rowDom.append(rowHandler);

            /**
             * store a reference to the new row which will be checked later to
             * see if anything has been added to it
             */
            newRow = rowDom;

            if (returnRow) {
                return rowDom;
            }
            else {
                lastRow.after(rowDom);
                newRowPresent = true;
            }
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

            // set up the tray
            $(trayContainer).tray();

            /**
             * only init droppable behaviour on the widget-rows when the tray button
             * is clicked, this makes the massive assumption that the homepage paint
             * will be completed before the user clicks this button
             */
            $('[data-toggle=tray]').on('click', function() {
                if (!newRowEmpty()) {
                    createNewRow();
                } else {
                    removeNewRow();
                }

                $('.widget-row').makeDroppable();
            });

            element.makeDraggable();
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

        /**
         * attach droppable behaviour to an element, or a selection or elements
         */
        $.fn.makeDroppable = function() {
            return this.each(function(index, element) {
                $(this).droppable({
                    accept: '.widget',
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
                                          .addClass('grid-span-' + widgetSpan + ' column homepage-widget')
                                          .attachWidgetUI()
                                          .uniqueId();

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
                                newVersion();
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
                    },
                    over: function (e, ui) {
                        $(this).prepend(rowOverlay);
                    },
                    out: function (e, ui) {
                        $('.row-overlay', this).remove();
                    }
                });
            });
        }

    })(jQuery, window, document);
});
