'use strict';

require('./tab');
var $ = require('jquery');

function HelpTextComponent(html, window, document) {
    this.$html = html;
    this.window = window;
    this.$document = $(document);
};

HelpTextComponent.prototype.init = function () {
    var component = this,
        $mobileToggleHelpButton = component.$html.find('.js-show-page-help'),
        $activeTabContainer = component.$html.find('.tab__pane.is-active .tab__container'),
        $tabHelpContainer = component.$html.find('.tab-help-container'),
        $body = component.$html.find('body'),
        $innerWrapper = component.$html.find('.inner-wrapper');

    $tabHelpContainer.addClass('visibility-hidden');

    $mobileToggleHelpButton.click(function (e) {
        e.preventDefault();
        e.stopPropagation();

        var $this = $(this);

        if ($this.hasClass('is-open')) {
            $this.removeClass('is-open')
        } else {
            $this.addClass('is-open')
        }

        // Closing sidebar
        if (component.$html.hasClass('open-help')) {
            component.$html.removeClass('open-help');

            if (component.$html.hasClass('lt-ie10')) {
                $tabHelpContainer.addClass('visibility-hidden');
            } else {
                $tabHelpContainer.one('webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend', function(e) {
                    $tabHelpContainer.addClass('visibility-hidden');
                });
            }
        } else {
            $tabHelpContainer.removeClass('visibility-hidden');
            component.$html.addClass('open-help');
        }
    });

    $tabHelpContainer.on('click', '.js-close-page-help', function(e) {
        e.preventDefault();
        $mobileToggleHelpButton.removeClass('is-open');

        // Closing sidebar
        if (component.$html.hasClass('open-help')) {
            component.$html.removeClass('open-help');
            if (component.$html.hasClass('lt-ie10')) {
                $tabHelpContainer.addClass('visibility-hidden');
            } else {
                $tabHelpContainer.one('webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend', function(e) {
                    $tabHelpContainer.addClass('visibility-hidden');
                });
            }
        } else {
            $tabHelpContainer.removeClass('visibility-hidden');
            component.$html.addClass('open-help')
        }
    });

    // If clicked outside of sidebar, close sidebar
    this.$document.on('touchstart click', function(e) {

        // side bar help is open
        if (component.$html.hasClass('open-help')) {

            // check if inside of sidebar
            if(!$(e.target).closest('.tab-help-container').length) {

                // Remove active class from button
                $mobileToggleHelpButton.removeClass('is-open');

                // Closing sidebar
                if (component.$html.hasClass('open-help')) {
                    component.$html.removeClass('open-help');
                    if (component.$html.hasClass('lt-ie10')) {
                        $tabHelpContainer.addClass('visibility-hidden');
                    } else {
                        $tabHelpContainer.one('webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend', function(e) {
                            $tabHelpContainer.addClass('visibility-hidden');
                        });
                    }
                } else {
                    $tabHelpContainer.removeClass('visibility-hidden');
                    component.$html.addClass('open-help')
                }
            }
        }
    });

    component.$html.find('a[data-toggle="tab"]').on('shown.bs.tab', function (e) {
        pulsar.helpText.updateTabHelp();
    });
};

HelpTextComponent.prototype.updateTabHelp = function () {

    var component = this,
        $activeTabContainer = component.$html.find('.tab__pane.is-active .tab__container'),
        activeTabSideBarContentHtml = component.$html.find('.tab__pane.is-active .tab__sidebar').html(),
        $tabHelp = component.$html.find('.tab-help'),
        isMobile,
        $mobileCloseHelpButton = $('<a href="#" class="close-page-help js-close-page-help"><i class="icon-remove-sign"></i></a>');

    // Check if active tab has help text
    if (activeTabSideBarContentHtml && activeTabSideBarContentHtml.length > 0) {

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
