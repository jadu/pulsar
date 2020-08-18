var $ = require('jquery');

/**
 * Enhance tab.js behaviour
*/
class TabEnhancements {
    /**
     * Initialise
     * @param {jQuery} $html - a jQuery wrapper of the html node
     */
    init ($html) {
        this.$html = $html;

        if(typeof $.fn.tab === 'undefined') {
            console.warn('PULSAR: tab.js must be loaded in order to use TabEnhacements.js');
        }

        // Make sure tab panes are at least as high as the tab list (cms legacy tabs list)
        this.$html.find('.tabs > .tabs__content > .tab__pane').css('min-height', this.$html.find('.tabs__list').height());

        // Remove skip target IDs set in markup
        this.$html.find('main.tab__content').removeAttr('id');

        // Add the skip-target ID to the active main
        this.$html.find('.tab__pane.is-active main.tab__content').attr('id', 'skip-target');

        // On tab change
        this.$html.find('.nav-inline [data-toggle="tab"]').on('show.bs.tab', (event) => {
            const $activeTab = this.$html.find($(event.target).attr('href'));

            // Remove previously set skip target IDs on other tabs
            this.$html.find('main.tab__content').removeAttr('id');

            // Add skip target ID to new active tab main
            $activeTab.find('main.tab__content').attr('id', 'skip-target');
        });
    }
}

module.exports = TabEnhancements;
