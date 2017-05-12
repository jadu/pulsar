'use strict';

require('./libs/tab');
var $ = require('jquery');

function HelpTextComponent(html, window, document) {
    this.$html = html;
    this.window = window;
    this.$document = $(document);
};

HelpTextComponent.prototype.init = function () {
    var component = this,
        $tabsContent = component.$html.find('.tabs__content'),
        $tabHelpContainer = component.$html.find('.tab-help-container'),
        $activeTabContainer = component.$html.find('.tab__pane.is-active .tab__container');

    // Visually hide sidebar so you can't tab to it with keyboard/screenreaders
    $tabHelpContainer.addClass('hide');

    // Help toggle click bind
    $tabsContent.on('touchstart click', '.js-show-page-help', function(e) {
        e.preventDefault();
        e.stopPropagation();
        component.toggleHelpSidebar();
    });

    // Close help button
    $tabHelpContainer.on('touchstart click', '.js-close-page-help', function(e) {
        e.preventDefault();
        e.stopPropagation();
        component.toggleHelpSidebar();
    });

    // Bind to tab.js event to update help text in sidebar on tab change
    component.$html.find('a[data-toggle="tab"]').on('shown.bs.tab', function (e) {
        component.updateHelpSidebar();
    });
};

HelpTextComponent.prototype.toggleHelpSidebar = function () {
    var component = this,
        $mobileToggleHelpButton = component.$html.find('.js-show-page-help'),
        $tabHelpContainer = component.$html.find('.tab-help-container');

    if ($mobileToggleHelpButton.hasClass('is-open')) {
        $mobileToggleHelpButton.removeClass('is-open');
    } else {
        $mobileToggleHelpButton.addClass('is-open');
    }

    if (component.$html.hasClass('open-help')) {
        component.$html.removeClass('open-help');
        if (component.$html.hasClass('lt-ie10')) {
            $tabHelpContainer.addClass('hide');
        } else {
            $tabHelpContainer.one('webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend', function(e) {
                $tabHelpContainer.addClass('hide');
            });
        }
    } else {
        $tabHelpContainer.removeClass('hide');
        component.$html.addClass('open-help');
    }
};

HelpTextComponent.prototype.updateHelpSidebar = function () {
    var component = this,
        $activeTabContainer = component.$html.find('.tab__pane.is-active .tab__container'),
        activeTabSideBarContentHtml = component.$html.find('.tab__pane.is-active .tab__sidebar').html(),
        $mobileToggleHelpButton = $('<a href="#" class="show-page-help js-show-page-help"><i class="icon-question-sign"></i><span class="hide">Show on page help</span></a>'),
        $pageMainTitle = component.$html.find('.main-title'),
        $tabHelp = component.$html.find('.tab-help'),
        isMobile,
        $mobileCloseHelpButton = $('<a href="#" class="close-page-help js-close-page-help"><i class="icon-remove-sign"></i></a>');

    // Check if active tab has help text
    if (activeTabSideBarContentHtml && activeTabSideBarContentHtml.length > 0) {

        // If clicked outside of sidebar, close sidebar
        this.$document.on('touchstart click', function(e) {

            // side bar help is open
            if (component.$html.hasClass('open-help')) {

                // check if inside of sidebar
                if(!$(e.target).closest('.tab-help-container').length) {
                    component.toggleHelpSidebar();
                }
            }
        });

        // If mobile help button doesn't already exist add it if help text exists
        if (!$pageMainTitle.find('.js-show-page-help').length) {
            $mobileToggleHelpButton.appendTo($pageMainTitle);
        }

        // Add class used for setting desktop column widths
        $activeTabContainer.addClass('has-sidebar');

        // Check if mobile
        isMobile = !component.window.matchMedia('(min-width: 992px)').matches;

        // Populate mobile sidebar help content
        if (isMobile) {
            $tabHelp.html(activeTabSideBarContentHtml);

            // Add mobile help close button
            $mobileCloseHelpButton.prependTo($tabHelp);
        }

        // Watch for window resizes
        $(component.window).resize(function () {
            isMobile = !component.window.matchMedia('(min-width: 992px)').matches;
            if (isMobile) {
                $tabHelp.html(activeTabSideBarContentHtml);

                // Add mobile help close button
                $mobileCloseHelpButton.prependTo($tabHelp);
            }
        });
    } else {
        $activeTabContainer.removeClass('has-sidebar');
    }
};

module.exports = HelpTextComponent;
