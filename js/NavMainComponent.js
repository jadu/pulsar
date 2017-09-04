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

    component.$closeLink.on('click', function(e) {
        e.preventDefault();
        component.closeNavs();
        component.closeSubNavs();

        component.$html.find('.nav-primary .nav-link').removeClass('is-active');
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
        .addClass('is-active');
};

NavMainComponent.prototype.changeActiveSecondaryNavLink = function(target) {

    var component = this;

    component.$html.find('.nav-secondary .nav-item.is-active').removeClass('is-active');
    component.$html.find('[href="' + target + '"]').addClass('is-active');
};

NavMainComponent.prototype.closeNavs = function() {

    var component = this;

    component.$navMain.removeClass('is-open');

    component.$html.find('.content-main').unbind('click', component.closeHandler);
};

NavMainComponent.prototype.closeSubNavs = function() {

    var component = this;

    component.$html.find('.nav-secondary .nav-list').removeClass('is-active');
};

module.exports = NavMainComponent;
