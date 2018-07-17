'use strict';

var $ = require('jquery');

function NavMainComponent ($html, rootWindow) {
    this.$html = $html;
    this.$window = $(rootWindow);
};

/**
 * Initialise
 */
NavMainComponent.prototype.init = function () {
    var component = this;

    if (!component.$html.length) {
        throw new Error('html must be passed to NavMainComponent');
    }

    if (!component.$window.length) {
        throw new Error('window must be passed to NavMainComponent');
    }

    component.$body = this.$html.find('body');
    component.$navMain = this.$html.find('.nav-main');
    component.$contentMain = this.$html.find('.content-main');
    component.$navPrimary = this.$html.find('.nav-primary');
    component.$navSecondary = this.$html.find('.nav-secondary');
    component.$navTertiary = component.$navMain.find('.nav-tertiary');
    component.$navQuaternary = component.$navMain.find('.nav-quaternary');
    component.$primaryNavLinks = component.$navPrimary.find('.nav-link');
    component.$tertiaryNavLinks = component.$navTertiary.find('.nav-link');
    component.$closeLink = component.$navMain.find('[data-nav-action=close]');
    component.$mobileMenuButton = this.$html.find('.mobile-menu-button');

    // Calculate what primary nav items can be shown and which need to be hidden in more menu
    component.adjustNavItems();

    // Open navigation on mobile
    component.$mobileMenuButton.on('click', function(event) {
        var $self = $(this);
        event.stopImmediatePropagation();
        component.$body.toggleClass('open-nav');
        $self.toggleClass('open');

        if ($self.text() === 'Menu') {
            $self.text('Close');
            $self.attr('aria-expanded', 'true');
        } else {
            $self.text('Menu');
            $self.attr('aria-expanded', 'false');
        }
    });

    // More button is shown when window is too short to display all primary nav items
    component.$navMain.on('click', '.more-icon > .nav-link', function(event) {
        var $self = $(this);
        event.preventDefault();
        component.moreIconClickHandler($self)
    });

    // Re-adjust nav items on window resize to calc if more button is needed 
    component.$window.resize(function () {
        component.adjustNavItems();
    });

    // Close navs on main content click
    component.$contentMain.on('click', function () {
        component.closeNavs($(this));
    });

    // Open secondary nav on primary nav item click
    component.$primaryNavLinks.on('click', function (event) {
        component.openSecondaryNav($(this), event);
    });

    // Open quaternary nav on tertiary nav item click
    component.$tertiaryNavLinks.on('click', function (event) {
        var $self = $(this),
            href = $self.attr('href');

        if (href.indexOf('#') !== -1) {
            event.preventDefault();

            // Change aria expanded to true
            $self.attr('aria-expanded', 'true');
        }

        component.openQuaternaryNav(href);
    });

    // Close respective navs on close link click
    component.$closeLink.on('click', function (event) {
        event.preventDefault();
        component.closeNavs($(this));
    });
};

/**
 * Open secondary navigation, close all other navs and highlight primary nav item parent
 * @param {jQuery} $linkClicked - jQuery object of the link clicked to open secondary nav
 * @param {Event} event - click event for the primary nav link
 */
NavMainComponent.prototype.openSecondaryNav = function ($linkClicked, event) {
    var component = this,
        target = $linkClicked.attr('href');

    // Close any previously open navs
    component.closeSecondaryNav();
    component.closeTertiaryNav();
    component.closeQuaternaryNav();

    // Close any open popovers which would appear over the navigation
    component.$html.find('[data-toggle="popover"]').popover('hide');

    // If href is a fragment (therefore opens a sub nav), don't add it to the URL because it breaks the back button
    if (target.indexOf('#') !== -1) {
        event.preventDefault();
        $linkClicked.attr('aria-expanded', 'true');
        component.$navSecondary.addClass('is-open');
        component.$navSecondary.find('.nav-list.is-active').removeClass('is-active');
        component.$navSecondary.find('[data-nav="' + target + '"]').addClass('is-active');
    }

    if (component.$html.find('[data-nav="' + target + '"]').length >= 1) {
        component.$navMain.addClass('is-open');
    } else {
        component.closeNavs($linkClicked);
    }

    component.$navPrimary.find('.is-active').removeClass('is-active');
    component.$navPrimary.find('[href="' + target + '"]').addClass('is-active');
};

/**
 * Open quaternary navigation
 * @param {string} target - href of target nav list
 */
NavMainComponent.prototype.openQuaternaryNav = function (target) {
    var component = this;

    // If menu item has child menu options and therefore is same-page link then open $navQuaternary
    if (target.indexOf('#') !== -1) {
        component.$navQuaternary.addClass('is-open');
    }

    // Show the target nav-list in the opened nav
    component.$navQuaternary.find('[data-nav="' + target + '"]').addClass('is-active');
};

/**
 * Close respective nav(s) depending on which close link was clicked
 * @param {jQuery} $linkClicked - jQuery object of the close link clicked
 */
NavMainComponent.prototype.closeNavs = function ($linkClicked) {
    var component = this,
        $linkParent = $linkClicked.parent();

    if ($linkParent.hasClass('nav-secondary')) {
        component.closeSecondaryNav();
    }

    else if ($linkParent.hasClass('nav-tertiary')) {
        component.closeTertiaryNav();
    }

    else if ($linkParent.hasClass('nav-quaternary')) {
        component.closeQuaternaryNav();
    }

    else {
        component.closeSecondaryNav();
        component.closeTertiaryNav();
        component.closeQuaternaryNav();
    }
}

/**
 * Close secondary navigation
 */
NavMainComponent.prototype.closeSecondaryNav = function () {
    var component = this;

    component.$navMain.removeClass('is-open');
    component.$navMain.find('[aria-expanded=true]').attr( 'aria-expanded', 'false');
    component.$navSecondary.removeClass('is-open');
    component.$primaryNavLinks.removeClass('is-active')
    component.$navSecondary.find('.nav-list').removeClass('is-active');
}

/**
 * Close tertiary navigation
 */
NavMainComponent.prototype.closeTertiaryNav = function () {
    var component = this;

    component.$navTertiary.removeClass('is-open');
    component.$navTertiary.find('.nav-list').removeClass('is-active');

    // Reset aria-expanded on more button
    component.$navMain.find('[aria-expanded=true]')
        .removeClass('is-active')
        .attr('aria-expanded', 'false');
}

/**
 * Close quaternary navigation
 */
NavMainComponent.prototype.closeQuaternaryNav = function () {
    var component = this;

    component.$navQuaternary.removeClass('is-open');
    component.$navQuaternary.find('.nav-list.is-active').removeClass('is-active');

    // Reset aria-expanded on tertiary link
    component.$navTertiary.find('[aria-expanded=true]').attr('aria-expanded', 'false');
}

/**
 * Detect window height, adjust the number of items in the primary nav and check when to add "More" option
 */
NavMainComponent.prototype.adjustNavItems = function () {
    var component = this,
        availableHeight = component.$window.height(),
        navItemsHeight = (component.$html.find('.nav-primary .nav-items').outerHeight(true) + component.$html.find('.jadu-branding').outerHeight(true)),
        moreIconHeight = 72, // Pre calculated height of the "More" nav item
        navItemsCountTotal = component.$html.find('.nav-primary .nav-items li').length,
        numberOfHiddenNavItems = 0;
        
    // When nav items + more icon height is greater than available window height
    if (navItemsHeight + moreIconHeight > availableHeight) {
        // If there is not enough space hide the last primary nav items
        component.hidePrimaryNavItems(navItemsHeight, moreIconHeight, availableHeight);
        // Get the number of hidden items to make only them visible in the tertiary menu
        numberOfHiddenNavItems = component.$html.find('.nav-primary .nav-items li:hidden').length;
        // Add "More" nav item and check its visibility if already exists
        component.addMoreNavItem(numberOfHiddenNavItems);
        // Hide the primary nav items duplicate in tertiary menu
        component.hideMoreCategoriesTopItems(navItemsCountTotal, numberOfHiddenNavItems);
    } else if (navItemsHeight + moreIconHeight < availableHeight) {
        // Unhide items if they were hidden and there is space in the primary nav
        component.unhidePrimaryNavItems();
        numberOfHiddenNavItems = component.$html.find('.nav-primary .nav-items li:hidden').length;
        component.lastItemSubstitution(numberOfHiddenNavItems);
    }
};

/**
 * Hide primary nav items that don't fit in window
 * @param {number} navItemsHeight - PX height of primary nav items
 * @param {number} moreIconHeight - PX height of more link
 * @param {number} availableHeight - PX height of window
 */
NavMainComponent.prototype.hidePrimaryNavItems = function (navItemsHeight, moreIconHeight, availableHeight) {
    var component = this,
        navItems = component.$html.find('.nav-primary .nav-items'),
        lastPrimaryNavItem =  navItems.find('li:last-child'),
        nthChild = 2; // This number represents the item before the last in the nth-last-child;

    while (navItemsHeight + moreIconHeight > availableHeight) {
        // If last nav item is visible hide it
        if (lastPrimaryNavItem.is(':visible')) {
            lastPrimaryNavItem.hide();
        } else {
            // If last nav item is hidden hide the next one up
            navItems.find('li:nth-last-child('+ nthChild +')').hide();
            nthChild++;
        }

        // Recalculate nav items height based on items just hidden
        navItemsHeight = (navItems.outerHeight(true) + component.$html.find('.jadu-branding').outerHeight(true));
    }
};

/**
 * Unhide primary nav items
 */
NavMainComponent.prototype.unhidePrimaryNavItems = function () {
    var component = this,
        navItems = component.$html.find('.nav-primary .nav-items'),
        navItemMore = navItems.find('.more-icon'),
        firstHiddenPrimaryNavItem = navItems.find('li:hidden').first();

        if ((firstHiddenPrimaryNavItem.length > 0) && (navItemMore.is(':visible'))) {

            // Reset display type to list-item rather than show() to make sure they don't get recreated as inline-block
            firstHiddenPrimaryNavItem.css({display: 'list-item'});
        }
};

/**
 * Add the more link to the primary nav
 * @param {number} numberOfHiddenNavItems - Number of hidden nav items
 */
NavMainComponent.prototype.addMoreNavItem = function (numberOfHiddenNavItems) {
    var component = this,
        navItems = component.$html.find('.nav-primary .nav-items'),
        navItemMore = navItems.find('.more-icon');

    // Add the "More" nav item
    if ((numberOfHiddenNavItems > 0) && (!component.$html.find('.more-icon').length)) {
        navItems.append('<li class="nav-item t-nav-item more-icon"><a href="#more" class="nav-link t-nav-link" aria-haspopup="true" aria-expanded="false" aria-controls="aria-tertiary-nav"><i aria-hidden="true" class="icon-ellipsis-horizontal nav-link__icon t-nav-icon"></i><span class="nav-link__label">More</span></a></li>');
    }

    // Check if "More" nav item is visible
    if (navItemMore.is(':hidden') && (numberOfHiddenNavItems > 0)) {
        navItemMore.show();
    } else {
        component.$html.find('.nav-tertiary').removeClass('is-open');
        component.$html.find('.nav-quaternary').removeClass('is-open');
    }
};

/**
 * Hide the nav items in nav tertiary that are already displayed in the primary nav
 * @param {number} navItemsCountTotal - Total number of nav items
 * @param {number} numberOfHiddenNavItems - Number of hidden nav items
 */
NavMainComponent.prototype.hideMoreCategoriesTopItems = function (navItemsCountTotal, numberOfHiddenNavItems) {
    var component = this,
        nthChild = 1, // Number used to iterate nth-child
        itemsToHideCount;

    // Reset hidden nav items
    component.$html.find('.nav-tertiary .nav-items li').show();

    // Calculate the number of visible nav items in primary nav
    itemsToHideCount = navItemsCountTotal - numberOfHiddenNavItems - 1; // 1 is for the "More" nav item

    // Hide top items in "More Categories" equal to the number of visible items of primary nav
    while (itemsToHideCount >= 0) {
        component.$html.find('.nav-tertiary .nav-items li:nth-child('+ nthChild +')').hide();
        nthChild++;
        itemsToHideCount--;
    }
};

/**
 * Hide more link if there are no hidden nav items
 * @param {number} numberOfHiddenNavItems - Number of hidden nav items
 */
NavMainComponent.prototype.lastItemSubstitution = function (numberOfHiddenNavItems) {
    var component = this,
        navItems = component.$html.find('.nav-primary .nav-items'),
        navItemMore = navItems.find('.more-icon');

    if (numberOfHiddenNavItems === 0) {
        navItemMore.hide();
        component.$html.find('.nav-tertiary').removeClass('is-open');
        component.$html.find('.nav-quaternary').removeClass('is-open');
    }
};

/**
 * Hide more link if there are no hidden nav items
 * @param {jQuery} $moreLink - jQuery object of the more link
 */
NavMainComponent.prototype.moreIconClickHandler = function ($moreLink) {
    var component = this;

    $moreLink.addClass('is-active');

    // Close secondary nav if already open
    component.closeSecondaryNav();

    // If tertiary nav is already open
    if (component.$navTertiary.find('.nav-list').hasClass('is-active')) {
        $moreLink.attr('aria-expanded', 'false');
        component.$navTertiary.removeClass('is-open');
        component.$navTertiary.find('.nav-list').removeClass('is-active');
    } else {
        $moreLink.attr('aria-expanded', 'true');

        // Open $navTertiary
        component.$navTertiary.find('.nav-list').addClass('is-active');
        component.$navTertiary.addClass('is-open');
    }
};

module.exports = NavMainComponent;
