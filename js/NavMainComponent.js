'use strict';

var $ = require('jquery');

function NavMainComponent(html, window) {
    this.$html = html;
    this.$window = $(window);
};

NavMainComponent.prototype.init = function() {

    var component = this;

    component.adjustNavItems();

    component.$navMain = this.$html.find('.nav-main');
    component.$navPrimary = this.$html.find('.nav-primary');
    component.$navSecondary = this.$html.find('.nav-secondary');
    component.$navTertiary = component.$navMain.find('.nav-tertiary');
    component.$navQuaternary = component.$navMain.find('.nav-quaternary');
    component.$primaryNavLinks = component.$navPrimary.find('.nav-link');
    component.$secondaryNavLinks = component.$navSecondary.find('.nav-link');
    component.$tertiaryNavLinks = component.$navTertiary.find('.nav-link');
    component.$quaternaryNavLinks = component.$navQuaternary.find('.nav-link');
    component.$moreIcon = component.$navMain.find('.more-icon');
    component.$closeLink = component.$navMain.find('[data-nav-action=close]');

    component.$window.resize(function(){
        component.adjustNavItems();
    });

    component.closeHandler = function() {
        component.closeNavs();
    };

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

        component.$html.find('.content-main').on('click', component.closeHandler);
    });

    component.$secondaryNavLinks.on('click', function() {
        component.changeActiveSecondaryNavLink($(this).attr('href'));
    });

    component.$tertiaryNavLinks.on('click', function(e) {

        var $self = $(this),
            href = $self.attr('href');

        if (href.substring(0,1) === '#') {
            e.preventDefault();
        }

        component.switchTertiartyNav(href);
        component.switchQuaternaryNav(href);

        component.$html.find('.content-main').on('click', component.closeHandler);
    });

    component.$quaternaryNavLinks.on('click', function() {
        component.changeActiveQuaternaryNavLink($(this).attr('href'));
    });

    component.$moreIcon.find('.nav-link').on('click', function() {
        component.$navTertiary.toggleClass('is-open');
        component.$navTertiary.find('.nav-list').toggleClass('is-active');
    });

    component.$closeLink.on('click', function(e) {
        e.preventDefault();
        component.closeNavs();
    });
};

NavMainComponent.prototype.switchPrimaryNav = function(target) {

    var component = this;

    component.$html.find('.nav-primary .nav-link').removeClass('is-active');
    component.$html.find('.nav-tertiary').removeClass('is-open');
    component.$html.find('.nav-quaternary').removeClass('is-open');

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
        .addClass('is-active');
};

NavMainComponent.prototype.switchTertiartyNav = function(target) {

    var component = this;

    component.$html.find('.navTertiary .nav-link').removeClass('is-active');

    if (component.$html.find('[data-nav="' + target + '"]').length < 1) {
        component.closeNavs();
    }

    component.$html.find('.navTertiary .is-active').removeClass('is-active');
    component.$html.find('[href="' + target + '"]').addClass('is-active');
};

NavMainComponent.prototype.switchQuaternaryNav = function(target) {

    var component = this;

    // If Category Item has encapsulated options and if it is same-page link then open the proper menu
    if(target.indexOf('#') > -1) {
        component.$navQuaternary.addClass('is-open');
    }

    component.$html.find('[data-nav="' + target + '"]')
        .addClass('is-active');
};

NavMainComponent.prototype.changeActiveSecondaryNavLink = function(target) {

    var component = this;

    component.$html.find('.nav-secondary .nav-item.is-active').removeClass('is-active');
    component.$html.find('[href="' + target + '"]').addClass('is-active');
};

NavMainComponent.prototype.changeActiveQuaternaryNavLink = function(target) {

    var component = this;

    component.$html.find('.nav-quaternary .nav-item.is-active').removeClass('is-active');
    component.$html.find('[href="' + target + '"]').addClass('is-active');
};

NavMainComponent.prototype.closeNavs = function() {

    var component = this;

    if(component.$navQuaternary.hasClass('is-open')) {
        component.$navQuaternary.removeClass('is-open');
    } else {
        component.$navTertiary.removeClass('is-open');
    }

    if(component.$navMain.hasClass('is-open')) {
        component.$navMain.removeClass('is-open');
    }

    component.$html.find('.content-main').unbind('click', component.closeHandler);
};

NavMainComponent.prototype.closeSubNavs = function() {

    var component = this;
    component.$html.find('.nav-secondary .nav-container').removeClass('is-active');
};

/* Detect window height, adjust the number of items in the primary nav and check when to add "More" option */

/* Notes:
- Feels like the JS should handle the creation of the third level menu to avoid unlessisary markup changes
- no need for this to be on prototype
*/

NavMainComponent.prototype.adjustNavItems = function() {

    var component = this,
        availableHeight = component.$window.height(),
        navItemsHeight = (component.$html.find('.nav-primary .nav-items').outerHeight(true) + component.$html.find('.jadu-branding').outerHeight(true)),
        moreIconHeight = 72, // Pre calculated height of the "More" nav item
        navItemsCountTotal = component.$html.find('.nav-primary .nav-items li').length,
        i = 2, // This number represents the item before the last in the nth-last-child
        numberOfHiddenNavItems = 0;

    if (navItemsHeight + moreIconHeight > availableHeight) {
        component.hidePrimaryNavItems(navItemsHeight, moreIconHeight, availableHeight, i);
        numberOfHiddenNavItems = component.$html.find('.nav-primary .nav-items li:hidden').length;
        component.addMoreNavItem(numberOfHiddenNavItems);
        component.hideMoreCategoriesTopItems(navItemsCountTotal, numberOfHiddenNavItems);
    } else {
        // Unhide items if they were hidden and there is space in the primary nav
        component.$html.find('.nav-primary .nav-items li').show();
        component.$html.find('.nav-primary .nav-items [label="More"]').hide();
    }
};

NavMainComponent.prototype.hidePrimaryNavItems = function(navItemsHeight, moreIconHeight, availableHeight, i) {

    var component = this;

    // While nav items and branding height is greater than the window height
    while (navItemsHeight + moreIconHeight > availableHeight) {

        // If last nav item is visable hide it
        if (component.$html.find('.nav-primary .nav-items li:last-child').is(':visible')) {
            component.$html.find('.nav-primary .nav-items li:last-child').hide();
        } else {
            // if last nav item is hidden hide the next one up
            component.$html.find('.nav-primary .nav-items li:nth-last-child('+ i +')').hide();
            i++;
        }

        // Recalculate nav items height based on items just hidden
        navItemsHeight = (component.$html.find('.nav-primary .nav-items').outerHeight(true) + component.$html.find('.jadu-branding').outerHeight(true));
    }
};

NavMainComponent.prototype.addMoreNavItem = function(numberOfHiddenNavItems) {

    var component = this;

    // Add the "More" nav item
    if ((numberOfHiddenNavItems > 0) && (component.$html.find('.more-icon').length <= 0)){
        component.$html.find('.nav-primary .nav-items').append('<li label="More" class="nav-item t-nav-item more-icon" aria-haspopup="true"><a href="#more" class="nav-link t-nav-link"><i aria-hidden="true" class="icon-ellipsis-horizontal nav-link__icon t-nav-icon"></i><span class="nav-link__label">More</span></a></li>');
    }

    // Check if "More" nav item is visible
    if (component.$html.find('.nav-primary .nav-items [label="More"]').is(':visible') === false) {
        component.$html.find('.nav-primary .nav-items [label="More"]').show();
    }
};

NavMainComponent.prototype.hideMoreCategoriesTopItems = function(navItemsCountTotal, numberOfHiddenNavItems) {

    var component = this,
        i = 1, // Number used to iterate nth-child
        itemsToHideCount = 0;

    // Reset hidden nav items
    component.$html.find('.nav-tertiary .nav-items li').show();

    // Calculate the number of visible nav items in primary nav
    itemsToHideCount = navItemsCountTotal - numberOfHiddenNavItems - 1; // 1 is for the "More" nav item

    // Hide top items in "More Categories" equal to the number of visible items of primary nav
    while (itemsToHideCount >= 0) {
        component.$html.find('.nav-tertiary .nav-items li:nth-child('+ i +')').hide();
        i++;
        itemsToHideCount--;
    }
};

module.exports = NavMainComponent;
