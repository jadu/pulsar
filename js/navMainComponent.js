function NavMainComponent(html) {
	this.$html = html;
};

NavMainComponent.prototype.init = function() {

	var component = this;

	component.$navMain = this.$html.find('.nav-main');
	component.$navPrimary = this.$html.find('.nav-primary');
	component.$primaryNavLinks = component.$navPrimary.find('.nav-link');
	component.$closeLink = component.$navMain.find('[data-nav-action=close]');

	component.$primaryNavLinks.on('click', function() {

		var $self = $(this);

		component.switchPrimaryNav($self.attr('href'));

		component.$navMain.addClass('nav-main--open');

		component.switchSecondaryNav($self.attr('href'));
	});

	component.$closeLink.on('click', function() {
		component.$navMain.removeClass('nav-main--open');
	});
};

NavMainComponent.prototype.switchPrimaryNav = function(target) {

	var component = this;

	component.$html.find('.nav-primary .nav-link').removeClass('is-active');

	component.$html.find('[href="' + target + '"]').addClass('is-active');

}

NavMainComponent.prototype.switchSecondaryNav = function(target) {

	var component = this;

	component.closeNavs();

	component.$html.find('[data-nav="' + target + '"]').addClass('is-active');
};

NavMainComponent.prototype.closeNavs = function() {

	var component = this;

	component.$html.find('.nav-secondary .nav-items').removeClass('is-active');
};

module.exports = NavMainComponent;
