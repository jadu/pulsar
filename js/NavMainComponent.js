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
    component.$primaryNavLinks = component.$navPrimary.find('.nav-link');
    component.$secondaryNavLinks = component.$navSecondary.find('.nav-link');
    component.$closeLink = component.$navMain.find('[data-nav-action=close]');

    /* Sliding Menu  */
    component.$moreIcon = component.$navMain.find('.more-icon');
    component.$navMainSliding = component.$navMain.find('.nav-main--sliding');
    component.$navAdditionalSliding = component.$navMain.find('.nav-additional--sliding');
    component.$mainSlidingLinks = component.$navMainSliding.find('.nav-link');
    component.$additionalSlidingLinks = component.$navAdditionalSliding.find('.nav-link');

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

    component.$moreIcon.find('.nav-link').on('click', function() {
        component.$navMainSliding.toggleClass('is-open');
        component.$navMainSliding.find('.nav-list').toggleClass('is-active');
    });

    component.$mainSlidingLinks.on('click', function(e) {

        var $self = $(this),
            href = $self.attr('href');

        if (href.substring(0,1) === '#') {
            e.preventDefault();
        }

        component.switchNavMainSliding(href);
        component.switchNavAdditionalSliding(href);

        component.$html.find('.content-main').on('click', component.closeHandler);
    });

    component.$additionalSlidingLinks.on('click', function() {
        component.changeActiveAdditionalSlidingNavLink($(this).attr('href'));
    });

    component.$closeLink.on('click', function(e) {
        e.preventDefault();
        component.closeNavs();
    });
};

NavMainComponent.prototype.switchPrimaryNav = function(target) {

    var component = this;

    component.$html.find('.nav-primary .nav-link').removeClass('is-active');
    component.$html.find('.nav-main--sliding').removeClass('is-open');
    component.$html.find('.nav-additional--sliding').removeClass('is-open');

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

NavMainComponent.prototype.switchNavMainSliding = function(target) {

    var component = this;

    component.$html.find('.navMainSliding .nav-link').removeClass('is-active');

    if (component.$html.find('[data-nav="' + target + '"]').length < 1) {
        component.closeNavs();
    }

    component.$html.find('.navMainSliding .is-active').removeClass('is-active');
    component.$html.find('[href="' + target + '"]').addClass('is-active');
};

NavMainComponent.prototype.switchNavAdditionalSliding = function(target) {

    var component = this;

    /* Check if Category Item has options but checking if it links inside the same page */
    if(target.indexOf('#') > -1) {
        component.$navAdditionalSliding.addClass('is-open');
    }

    component.$html.find('[data-nav="' + target + '"]')
        .addClass('is-active');
};

NavMainComponent.prototype.changeActiveSecondaryNavLink = function(target) {

    var component = this;

    component.$html.find('.nav-secondary .nav-item.is-active').removeClass('is-active');
    component.$html.find('[href="' + target + '"]').addClass('is-active');
};

NavMainComponent.prototype.changeActiveAdditionalSlidingNavLink = function(target) {

    var component = this;

    component.$html.find('.nav-additional--sliding .nav-item.is-active').removeClass('is-active');
    component.$html.find('[href="' + target + '"]').addClass('is-active');
};

NavMainComponent.prototype.closeNavs = function() {

    var component = this;

    if(component.$navAdditionalSliding.hasClass('is-open')) {
        component.$navAdditionalSliding.removeClass('is-open');
    } else {
        component.$navMainSliding.removeClass('is-open');
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

/* some notes
- Feels like the JS should handle the creation of the third level menu to avoid unlessisary markup changes
- close icon on 3rd level menu should point the other way (direction of animation)
- class name nav-main--sliding does not follow bem (not a modifier) suggest nav-tertiary
- doesn't current respond to window height changes
- more categories icon should use fixed width icons
- you can't test $('.nav-primary 
- lots going on here even though I've tried to simplify, suggest moving chunks of functionality into functions with 1 role each.
- no need for this to be on prototype
- /* comments are in compiled js // are not
*/


NavMainComponent.prototype.adjustNavItems = function() {
    var component = this,
        availableHeight = component.$window.height(),
        navItemsHeight = (component.$html.find('.nav-primary .nav-items').outerHeight(true) + component.$html.find('.jadu-branding').outerHeight(true)),
        moreIconHeight = 72, // Pre calculated height of the "More" nav item 
        navItemsCountTotal = component.$html.find('.nav-primary .nav-items li').length,
        i = 2, // This number represents the item before the last in the nth-last-child 
        numberOfHiddenNavItems,
        itemsToHideCount;

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
        navItemsHeight = (component.$html.find('.nav-items').outerHeight(true) + component.$html.find('.jadu-branding').outerHeight(true));
    }

    numberOfHiddenNavItems = component.$html.find('.nav-primary .nav-items li:hidden').length;

    // Add the "More" nav item
    if ((navItemsHeight + moreIconHeight < availableHeight) && (numberOfHiddenNavItems > 0)) { // can't we just test for numberOfHiddenNavItems here?
        component.$html.find('.nav-primary .nav-items').append('<li label="More" class="nav-item t-nav-item more-icon" aria-haspopup="true"><a href="#more" class="nav-link t-nav-link"><i aria-hidden="true" class="icon-ellipsis-horizontal nav-link__icon t-nav-icon"></i><span class="nav-link__label">More</span></a></li>');
    }

    // Calculate the number of visible nav items any that don't fit in the window
    itemsToHideCount = navItemsCountTotal - numberOfHiddenNavItems - 1; // 1 is for the "More" nav item 
    i = 1;

    while (itemsToHideCount >= 0) {
        component.$html.find('.nav-main--sliding .nav-items li:nth-child('+ i +')').hide();
        i++;
        itemsToHideCount--;
    }
};

module.exports = NavMainComponent;
