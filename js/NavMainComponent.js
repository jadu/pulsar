'use strict';

var $ = require('jquery');

function NavMainComponent ($html, rootWindow, focusManagementService) {
    this.$html = $html;
    this.window = rootWindow;
    this.$window = $(rootWindow);
    this.focusManagementService = focusManagementService;
};

NavMainComponent.MISSING_ATTR_ERROR = 'A nav link must have a href or data-target attribute';
NavMainComponent.CLOSE_WITH_ESCAPE = "CLOSE_WITH_ESCAPE";
NavMainComponent.CLOSE_WITH_CLICK = "CLOSE_WITH_CLICK";

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
    component.$brandingLink = this.$html.find('.jadu-branding');
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

    // Check which tabindexes should be applied to navigation links to ensure WCAG compliance
    component.manageTabIndexes();

    // Hide nav from SR on mobile
    var isMobile = !component.window.matchMedia('(min-width: 992px)').matches;
    if (isMobile) {
        component.$navMain.attr('aria-hidden', 'true');
    }

    // Open navigation on mobile
    component.$mobileMenuButton.on('click', function(event) {
        var $self = $(this);
        event.stopImmediatePropagation();

        if ($self.text() === 'Menu') {
            component.showMobileNav(true);
        } else {
            component.showMobileNav(false);
        }
    });

    // More button is shown when window is too short to display all primary nav items
    component.$navMain.on('click', '.more-icon > .nav-link', function(event) {
        var $self = $(this);
        event.preventDefault();
        component.moreIconClickHandler($self)
    });

    // Re-adjust nav items on window resize to calc if more button is needed
    component.$window.on('resize', function () {
        var isMobile = !component.window.matchMedia('(min-width: 992px)').matches;

        component.adjustNavItems();
        component.manageTabIndexes();

        if (!isMobile) {
            component.showMobileNav(false);
            component.$navMain.removeAttr('aria-hidden');
        }
    });

    // Close navs when element outside of nav is clicked
    component.$body.find('.toolbar, .content-main, .footer').on('click', function () {
        if (component.isNavOpen()) {
            component.closeNavs($(this));
        }
    });

    // Open secondary nav on primary nav item click
    component.$primaryNavLinks.on('click', function (event) {
        component.openSecondaryNav($(this), event);
    });

    // Open quaternary nav on tertiary nav item click
    component.$tertiaryNavLinks.on('click', function (event) {
        var $self = $(this),
            target;

        if ($self.attr('href')) {
            target = $self.attr('href');
        }
        else if ($self.attr('data-target')) {
            target = $self.attr('data-target');
        } else {
            throw new Error(NavMainComponent.MISSING_ATTR_ERROR);
        }

        if (target.indexOf('#') !== -1) {
            event.preventDefault();

            // Change aria expanded to true
            $self.attr('aria-expanded', 'true');
        }

        component.openQuaternaryNav(target, $self);
    });

    // Close respective navs on close link click
    component.$closeLink.on('click', function (event) {
        event.preventDefault();
        component.closeNavs($(this));
    });

    // Close respective navs on ESC
    this.$html.on('keydown', function (event) {
        if (event.keyCode === 27) {
            if (component.$navQuaternary.hasClass('is-open')) {
                component.closeQuaternaryNav({ type: NavMainComponent.CLOSE_WITH_ESCAPE });
            } else if (component.$navTertiary.hasClass('is-open')) {
                component.closeTertiaryNav();
            } else if (component.$navSecondary.hasClass('is-open')) {
                component.closeSecondaryNav({ type: NavMainComponent.CLOSE_WITH_ESCAPE });
            } else if (isMobile && component.$body.hasClass('open-nav')) {
                component.showMobileNav(false)
            }
        }
    });
}

/**
 * Check if any navs are open
 * @returns {boolean}
 */
NavMainComponent.prototype.isNavOpen = function () {
    var component = this,
        isMobile = !component.window.matchMedia('(min-width: 992px)').matches;

    if (isMobile && component.$body.hasClass('open-nav')) {
        return true;
    } else if (component.$navSecondary.hasClass('is-open')) {
        return true;
    } else if (component.$navTertiary.hasClass('is-open')) {
        return true;
    } else if (component.$navQuaternary.hasClass('is-open')) {
        return true;
    } else {
        return false;
    }
}

/**
 * Unto the tabindex if the main nav is in responsive mode
 * This maintains the tab order to ensure WCAG compliance
 */
NavMainComponent.prototype.manageTabIndexes = function () {
    var component = this,
        isMobile = !component.window.matchMedia('(min-width: 992px)').matches;

    if (isMobile) {
        component.$brandingLink.attr('tabindex', '-1');
        component.$primaryNavLinks.attr('tabindex', '-1');
    } else {
        component.$brandingLink.attr('tabindex', '1');
        component.$primaryNavLinks.attr('tabindex', '1');
    }
}

/**
 * Open secondary navigation, close all other navs and highlight primary nav item parent
 * @param {jQuery} $triggeringElement - the element clicked to open secondary nav
 * @param {Event} event - click event for the primary nav link
 */
NavMainComponent.prototype.openSecondaryNav = function ($triggeringElement, event) {
    var component = this,
        target;

    if ($triggeringElement.attr('href')) {
        target = $triggeringElement.attr('href');
    }
    else if ($triggeringElement.attr('data-target')) {
        target = $triggeringElement.attr('data-target');
    } else {
        throw new Error(NavMainComponent.MISSING_ATTR_ERROR)
    }

    // Close any previously open navs
    component.closeSecondaryNav();
    component.closeTertiaryNav();
    component.closeQuaternaryNav();

    // Close any open popovers which would appear over the navigation
    component.$html.find('[data-toggle="popover"]').popover('hide');

    // If href is a fragment (therefore opens a sub nav), don't add it to the URL because it breaks the back button
    if (target.indexOf('#') !== -1) {
        event.preventDefault();
        $triggeringElement.attr('aria-expanded', 'true');
        component.$navSecondary.addClass('is-open');
        component.$navSecondary.find('.nav-list.is-active').removeClass('is-active');
        component.$navSecondary.find('[data-nav="' + target + '"]').addClass('is-active');
    }

    if (component.$html.find('[data-nav="' + target + '"]').length >= 1) {
        component.$navMain.addClass('is-open');
    } else {
        component.closeNavs($triggeringElement);
    }

    component.$navPrimary.find('.is-active').removeClass('is-active');
    component.$navPrimary.find('[href="' + target + '"], [data-target="' + target + '"]').addClass('is-active');

    // Manage focus
    component.focusManagementService.storeElement($triggeringElement);
    component.focusManagementService.focusFirstFocusableElement(component.$navSecondary);
    component.focusManagementService.trapFocus(component.$navSecondary);
}

/**
 * Open quaternary navigation
 * @param {string} target - href of target nav list
 */
NavMainComponent.prototype.openQuaternaryNav = function (target, $trigger) {
    var component = this;

    // If menu item has child menu options and therefore is same-page link then open $navQuaternary
    if (target.indexOf('#') !== -1) {
        component.$navQuaternary.addClass('is-open');
    }

    // Show the target nav-list in the opened nav
    component.$navQuaternary.find('[data-nav="' + target + '"]').addClass('is-active');

    // Manage focus
    component.focusManagementService.storeElement($trigger);
    component.focusManagementService.focusFirstFocusableElement(component.$navQuaternary);
    component.focusManagementService.trapFocus(component.$navQuaternary);
}

/**
 * Close respective nav(s) depending on which close link was clicked
 * @param {jQuery} $linkClicked - jQuery object of the close link clicked
 */
NavMainComponent.prototype.closeNavs = function ($linkClicked) {
    var component = this,
        $linkParent = $linkClicked.closest('.nav-flyout');

    if ($linkParent.hasClass('nav-secondary')) {
        component.closeSecondaryNav({ type: NavMainComponent.CLOSE_WITH_CLICK, trigger: $linkClicked });
    }

    else if ($linkParent.hasClass('nav-tertiary')) {
        component.closeTertiaryNav();
    }

    else if ($linkParent.hasClass('nav-quaternary')) {
        component.closeQuaternaryNav({ type: NavMainComponent.CLOSE_WITH_CLICK, trigger: $linkClicked });
    }

    // like a body click or something outside of navs
    else {
        component.closeSecondaryNav({ type: NavMainComponent.CLOSE_WITH_CLICK, trigger: $linkClicked });
        component.closeTertiaryNav();
        component.closeQuaternaryNav({ type: NavMainComponent.CLOSE_WITH_CLICK, trigger: $linkClicked });
    }
}

/**
 * Close secondary navigation
 * @param {Object} [action]
 */
NavMainComponent.prototype.closeSecondaryNav = function (action) {
    var component = this;

    component.$navMain.removeClass('is-open');
    component.$navMain.find('[aria-expanded=true]').attr( 'aria-expanded', 'false');
    component.$navSecondary.removeClass('is-open');
    component.$primaryNavLinks.removeClass('is-active');
    component.$navMain.find('.nav-item.is-active').removeClass('is-active');
    component.$navSecondary.find('.nav-list').removeClass('is-active');

    if (action === undefined) {
        return;
    }

    switch (action.type) {
        case NavMainComponent.CLOSE_WITH_ESCAPE:
            if (component.focusManagementService.hasStoredElement()) {
                component.focusManagementService.returnFocusToElement();
            }
            break;
        case NavMainComponent.CLOSE_WITH_CLICK:
            if (action.trigger.parents('.nav-secondary').length > 0) {
                if (component.focusManagementService.hasStoredElement()) {
                    component.focusManagementService.returnFocusToElement();
                }
            }
            break;
    }
}

/**
 * Close tertiary navigation
 */
NavMainComponent.prototype.closeTertiaryNav = function () {
    var component = this;

    component.$navTertiary.removeClass('is-open');
    component.$navTertiary.find('.nav-list').removeClass('is-active');

    component.$navMain.find('[aria-expanded=true]')
        .removeClass('is-active')
        .attr('aria-expanded', 'false')
        .trigger('focus');
}

/**
 * Close quaternary navigation
 * @param {Object} [action]
 */
NavMainComponent.prototype.closeQuaternaryNav = function (action) {
    var component = this;

    component.$navQuaternary.removeClass('is-open');
    component.$navQuaternary.find('.nav-list.is-active').removeClass('is-active');
    component.$navTertiary.find('[aria-expanded=true]').attr('aria-expanded', 'false');

    if (action === undefined) {
        return;
    }

    switch (action.type) {
        case NavMainComponent.CLOSE_WITH_ESCAPE:
            if (component.focusManagementService.hasStoredElement()) {
                component.focusManagementService.returnFocusToElement();
            }
            break;
        case NavMainComponent.CLOSE_WITH_CLICK:
            if (action.trigger.parents('.nav-quaternary').length > 0) {
                if (component.focusManagementService.hasStoredElement()) {
                    component.focusManagementService.returnFocusToElement();
                }
            }
            break;
    }
}

/**
 * Toggle mobile navigation
 */
NavMainComponent.prototype.showMobileNav = function (show) {
    var component = this;

    if (show === false) {
        component.$body.removeClass('open-nav');
        component.$mobileMenuButton
            .removeClass('open')
            .text('Menu')
            .attr('aria-expanded', 'false');
        component.$brandingLink.attr('tabindex', '-1');
        component.$primaryNavLinks.attr('tabindex', '-1');
        component.$navMain.attr('aria-hidden', 'true');
        component.$body.find('.skip-link').removeAttr('aria-hidden');
        component.$body.find('.toolbar > :not(.mobile-menu-button)').removeAttr('aria-hidden');
        component.$body.find('.content-main').removeAttr('aria-hidden');
        component.$body.find('.footer').removeAttr('aria-hidden');

        return;
    }

    component.$body.addClass('open-nav');
    component.$mobileMenuButton
        .addClass('open')
        .text('Close')
        .attr('aria-expanded', 'true');
    component.$brandingLink.attr('tabindex', '3');
    component.$primaryNavLinks.attr('tabindex', '3');
    component.$navMain.attr('aria-hidden', 'false');

    // Hide rest of page from SR while nav open
    component.$body.find('.skip-link').attr('aria-hidden', 'true');
    component.$body.find('.toolbar > :not(.mobile-menu-button)').attr('aria-hidden', 'true');
    component.$body.find('.content-main').attr('aria-hidden', 'true');
    component.$body.find('.footer').attr('aria-hidden', 'true');
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
        navItems.append('<li class="nav-item t-nav-item more-icon"><button tabindex="3" class="nav-link t-nav-link" aria-haspopup="true" aria-expanded="false" aria-controls="aria-tertiary-nav"><i aria-hidden="true" class="icon-ellipsis-horizontal nav-link__icon t-nav-icon"></i><span class="nav-link__label">More</span></button></li>');
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
        component.$navQuaternary.removeClass('is-open');
        component.$navTertiary.find('.nav-list').removeClass('is-active');
        component.$navQuaternary.find('.nav-list').removeClass('is-active');
    } else {
        $moreLink.attr('aria-expanded', 'true');

        // Open $navTertiary
        component.$navTertiary.find('.nav-list').addClass('is-active');
        component.$navTertiary.addClass('is-open');

        // Manage focus
        component.focusManagementService.storeElement($moreLink);
        component.focusManagementService.focusFirstFocusableElement(component.$navTertiary);
        component.focusManagementService.trapFocus(component.$navTertiary);
    }
};

module.exports = NavMainComponent;
