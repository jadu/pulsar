'use strict';

var $ = require('jquery');

function HelpTextComponent(html, window, document) {
    this.$html = html;
    this.window = window;
    this.$document = $(document);
}

HelpTextComponent.prototype.init = function () {
    var component = this,
        $tabHelpContainer = component.$html.find('.tab-help-container');

    // Visually hide sidebar so you can't tab to it with keyboard/screenreaders
    $tabHelpContainer
        .addClass('hide')
        .attr('aria-hidden', 'true');

    // Help toggle click bind
    component.$html
        .on('touchstart click', '.js-show-page-help', function(e) {
            e.preventDefault();
            e.stopPropagation();
            component.toggleHelpSidebar();
        })
        .on('focusout', '.tab-help-container', (event) => component.handleFocusOut(event));

    // Close help button
    $tabHelpContainer.on('touchstart click', '.js-close-page-help', function(e) {
        e.preventDefault();
        e.stopPropagation();
        component.toggleHelpSidebar();
    });

    // Make mobile help container child element non-interactive
    component.toggleChildElementInteractivity($tabHelpContainer, false);

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
        component.toggleChildElementInteractivity($tabHelpContainer, false);
    } else {
        $mobileToggleHelpButton.addClass('is-open');
        component.toggleChildElementInteractivity($tabHelpContainer, true);
    }

    if (component.$html.hasClass('open-help')) {
        component.$html.removeClass('open-help');
        if (component.$html.hasClass('lt-ie10')) {
            $tabHelpContainer
                .addClass('hide')
                .attr('aria-hidden', 'true');
        } else {
            $tabHelpContainer.one('webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend', function(e) {
                component.$html.find('.js-show-page-help').trigger('focus');

                $tabHelpContainer
                    .addClass('hide')
                    .attr('aria-hidden', 'true');
            });
        }
    } else {
        $tabHelpContainer
            .removeClass('hide')
            .removeAttr('aria-hidden');
        component.$html.addClass('open-help');

        // Jump focus to the help container
        $tabHelpContainer.one('webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend', function(e) {
            $tabHelpContainer.find('.js-close-page-help').trigger('focus');
        });
    }
};

HelpTextComponent.prototype.updateHelpSidebar = function () {
    var component = this,
        $activeTabContainer = component.$html.find('.tab__pane.is-active .tab__container'),
        activeTabSideBarContentHtml = component.$html.find('.tab__pane.is-active .tab__sidebar').html(),
        $mobileToggleHelpButton = $('<button class="show-page-help js-show-page-help"><i class="icon-question-sign" aria-hidden="true"></i><span class="hide">Show on-page help</span></button>'),
        $mobileToggleContainer = component.$html.find('.toolbar'),
        $tabHelp = component.$html.find('.tab-help'),
        isMobile,
        mobileCloseHelpButton = '<button class="close-page-help js-close-page-help"><i class="icon-remove-sign" aria-hidden="true"></i><span class="hide">Close on-page help</span></button>';

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
        if (!$mobileToggleContainer.find('.js-show-page-help').length) {
            $mobileToggleHelpButton.appendTo($mobileToggleContainer);
        }

        // Add class used for setting desktop column widths
        $activeTabContainer.addClass('has-sidebar');

        // Check if mobile
        isMobile = !component.window.matchMedia('(min-width: 992px)').matches;

        // Populate mobile sidebar help content
        if (isMobile) {
            $tabHelp.html(activeTabSideBarContentHtml);

            // Add mobile help close button
            $(mobileCloseHelpButton).prependTo($tabHelp);

            // Hide mobile sidebar interactive elements from a11y tree while closed
            component.toggleChildElementInteractivity($tabHelp, false);
        }

        // Watch for window resizes
        $(component.window).on('resize', function () {
            isMobile = !component.window.matchMedia('(min-width: 992px)').matches;
            if (isMobile) {
                $tabHelp.html(activeTabSideBarContentHtml);

                // Add mobile help close button
                $(mobileCloseHelpButton).prependTo($tabHelp);

                // Hide mobile sidebar interactive elements from a11y tree while closed
                component.toggleChildElementInteractivity($tabHelp, false);
            }
        });
    } else {
        $activeTabContainer.removeClass('has-sidebar');
    }
};

/**
 * Return focus to the open help control when focus leaves the help container
 */
HelpTextComponent.prototype.handleFocusOut = function (e) {
    var component = this;

    if (component.$html.hasClass('open-help')) {
        // Using timeout due to :focus return body when an element loses focus before new element gains focus
        setTimeout(() => {
            const $elementWithFocus = $(':focus');
            if (!$elementWithFocus.closest('.tab-help').length) {
                component.toggleHelpSidebar();
            }
        }, 1);
    }
}

/**
 * Toggle focusability of elements
 */
HelpTextComponent.prototype.toggleChildElementInteractivity = function ($container, interactive) {
    var focusableElements = 'a[href], button';

    if (interactive === true) {
        $container.find(focusableElements).removeAttr('tabindex');
    } else {
        $container.find(focusableElements).attr('tabindex', '-1');
    }
}

module.exports = HelpTextComponent;
