'use strict';

var $ = require('jquery');

function NavMainComponent(html) {
    this.$html = html;
};

NavMainComponent.prototype.init = function() {

    var component = this;

    component.$navMain = this.$html.find('.nav-main');
    component.$navPrimary = this.$html.find('.nav-primary');
    component.$navSecondary = this.$html.find('.nav-secondary');
    component.$primaryNavLinks = component.$navPrimary.find('.nav-link');
    component.$secondaryNavLinks = component.$navSecondary.find('.nav-link');
    component.$closeLink = component.$navMain.find('[data-nav-action=close]');
    component.$quickstart = component.$navMain.find('[data-nav="#quickstart"]');
    component.$quickstartHint = component.$navMain.find('[data-ui="quickstart-hint"]');
    component.$quickstartMainMenu = component.$navMain.find('[data-nav="#quickstart-main"]');
    component.$quickstartAdditionalMenu = component.$navMain.find('[data-nav="#quickstart-additional"]');
    component.$quickstartManageLink = component.$navMain.find('[data-nav-action=quickstart-manage]');
    component.$quickstartSaveLink = component.$navMain.find('[data-nav-action=quickstart-save]');

    component.$primaryNavLinks.on('click', function(e) {

        var $self = $(this),
            href = $self.attr('href');

        // If href is a fragment, don't add it to the URL because it breaks the
        // back button
        if (href.substring(0,1) === '#') {
            e.preventDefault();
        }

        component.switchPrimaryNav(href);
        component.switchSecondaryNav(href);
    });

    component.$secondaryNavLinks.on('click', function() {
        component.changeActiveSecondaryNavLink($(this).attr('href'));
    });

    component.$quickstartManageLink.on('click', function() {
        component.quickstartManage();
    });

    component.$quickstartSaveLink.on('click', function() {
        component.quickstartClose();
    });

    component.$closeLink.on('click', function(e) {
        e.preventDefault();
        component.closeNavs();
    });
};

NavMainComponent.prototype.switchPrimaryNav = function(target) {

    var component = this;

    component.$html.find('.nav-primary .nav-link').removeClass('is-active');

    if (component.$html.find('[data-nav="' + target + '"]').length >= 1) {
        component.$navMain.addClass('is-open');
    } else {
        component.closeNavs();
    }

    component.$html.find('.nav-primary .is-active').removeClass('is-active');
    component.$html.find('[href="' + target + '"]').addClass('is-active');
};

NavMainComponent.prototype.switchSecondaryNav = function(target) {
    var component = this;

    component.closeSubNavs();

    component.$html.find('.nav-list.is-active').removeClass('is-active');
    component.$html.find('[data-nav="' + target + '"]')
        .addClass('is-active')
        .closest('[data-ui=nav-container]')
        .addClass('is-open');
};

NavMainComponent.prototype.changeActiveSecondaryNavLink = function(target) {

    var component = this;

    component.$html.find('.nav-secondary .nav-item.is-active').removeClass('is-active');
    component.$html.find('[href="' + target + '"]').addClass('is-active');
};

NavMainComponent.prototype.quickstartManage = function() {

    var component = this;

    // Swap the manage link for the save link
    component.$quickstartManageLink.fadeOut(125, function() {
        component.$quickstartSaveLink
            .fadeIn(125)
            .removeClass('visually-hidden');
    });

    // Double the width of the quickstart container to accommodate the
    // additional menu
    component.$quickstart
        .animate({
            width: '495'
        }, 125, function() {

            // Show the hints
            component.$quickstartHint
                .slideDown(125)
                .removeClass('visually-hidden');
        });

    // Attach sortable to main menu
    component.$quickstartMainMenu
        .find('.nav-items')
        .addClass('is-sortable')
        .sortable({
            connectWith: '[data-nav="#quickstart-additional"] .nav-items',
            containment: '.nav-quickstart',
            placeholder: 'is-sorting',
            helper: 'clone',
            opacity: 0.9,
            revert: 125,
            tolerance: 'pointer',
            zIndex: 1080,
            start: function(e, ui) {
                $(ui.helper).addClass('is-dragging');
            }
        }).disableSelection();

    // Attach sortable to additional menu
    component.$quickstartAdditionalMenu
        .removeClass('hide')
        .find('.nav-items')
        .addClass('is-sortable')
        .sortable({
            connectWith: '[data-nav="#quickstart-main"] .nav-items',
            containment: '.nav-quickstart',
            placeholder: 'is-sorting',
            helper: 'clone',
            opacity: 0.9,
            revert: 125,
            tolerance: 'pointer',
            zIndex: 1080,
            start: function(e, ui) {
                $(ui.helper).addClass('is-dragging');
            }
        }).disableSelection();
};

NavMainComponent.prototype.quickstartClose = function() {

    var component = this;

    // Shrink back to normal size of container
    component.$quickstart
        .animate({
            width: '245'
        }, 125, function() {

            // Hide the hints and swap the save button for the manage button and
            // remove sortable behaviours
            component.$quickstartHint.slideUp(125);
            component.$quickstartSaveLink.fadeOut(125, function() {
                component.$quickstartManageLink.fadeIn(125);
            });
        })
        .find('.nav-items.is-sortable')
        .sortable('destroy')
        .removeClass('is-sortable');
};

NavMainComponent.prototype.closeNavs = function() {

    var component = this;

    component.$navMain.find('.is-open')
        .removeClass('is-open');

    component.closeSubNavs();
};

NavMainComponent.prototype.closeSubNavs = function() {

    var component = this;

    component.$html.find('[data-ui=nav-container]')
        .width('245')
        .removeClass('is-open');

    component.quickstartClose();
};

module.exports = NavMainComponent;
