'use strict';

var $ = require('jquery');

function NavMainComponent(html) {
    this.$html = html;
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

    component.$moreIcon.on('click', function() {
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
NavMainComponent.prototype.adjustNavItems = function() {

    var availableHeight = $(window).height();
    var itemsHeight = ($('.nav-items').outerHeight(true) + $('.jadu-branding').outerHeight(true));
    var moreIconHeight = 72; /* Pre calculated height of the "More" nav item */
    var navItemsCountTotal = $('.nav-primary .nav-items li').length;
    var i = 2; /* This number represents the item before the last in the nth-last-child */

    /* Initial Check of Height */
    while (itemsHeight + moreIconHeight > availableHeight) {
        if($('.nav-primary .nav-items li:last-child').css('display') === 'none') {
            $('.nav-primary .nav-items li:nth-last-child('+ i +')').addClass('is-hidden');
            i++;
        } else {
            $('.nav-primary .nav-items li:last-child').addClass('is-hidden');
        }
        itemsHeight = ($('.nav-items').outerHeight(true) + $('.jadu-branding').outerHeight(true));
    }

    var hiddenItemsCount = $('.nav-primary .nav-items .is-hidden').length;

    /* Add the "More" nav item */
    if((itemsHeight + moreIconHeight < availableHeight) && (hiddenItemsCount > 0)){
        $('.nav-primary .nav-items').append('<li label="More" class="nav-item t-nav-item more-icon"><a href="#more" class="nav-link t-nav-link"><i aria-hidden="true" class="icon-ellipsis-horizontal nav-link__icon t-nav-icon"></i><span class="nav-link__label">More</span></a></li>');
    }

    /* Calculate the number of visible nav items and hide them in the main sliding nav */
    var toHideCount = navItemsCountTotal - hiddenItemsCount - 1; /* 1 is for the "More" nav item */
    i = 1;
    do {
        $('.nav-main--sliding .nav-items li:nth-child('+ i +')').addClass('is-hidden');
        i++;
        toHideCount--;
    } while(toHideCount >= 0);
};

module.exports = NavMainComponent;
