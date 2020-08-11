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

        // Switch the first active tab to use <main> with the skip target
        this.changeActiveTabElementToMain(this.$html.find('.tab__pane.is-active'));

        // Make the current tabs .tab__content <main> and the previous tabs .tab__content <div>
        // to avoid multiple <main>'s in the DOM at one time
        this.$html.find('.nav-inline [data-toggle="tab"]').on('show.bs.tab', (event) => {
            const $activeTab = this.$html.find($(event.target).attr('href'));
            const $previousTab = this.$html.find($(event.relatedTarget).attr('href'));

            this.changeActiveTabElementToMain($activeTab);
            this.changePreviousTabElementToDiv($previousTab);
        });

    }

    /**
     * Change the active tab's main element from a <div> to a <main> and add the skip target ID
     * @param {jQuery} $activeTab - a jQuery wrapper of the newly active tab
     */
    changeActiveTabElementToMain($activeTab) {
        const $activeTabInner = $activeTab.find('.tab__inner');
        const $activeTabChildrenOfMain = $activeTab.find('.tab__content').contents();
        const $activeTabNewMain = $('<main class="tab__content" id="skip-target"></main>').append($activeTabChildrenOfMain);
        const $activeTabOldMain = $activeTab.find('.tab__content');

        $activeTabOldMain.remove();
        $activeTabNewMain.prependTo($activeTabInner);
    }

    /**
     * Change the previous tab's main element from a <main> to a <div>
     * @param {jQuery} $previousTab - a jQuery wrapper of the previously active tab
     */
    changePreviousTabElementToDiv($previousTab) {
        const $previousTabInner = $previousTab.find('.tab__inner');
        const $previousTabChildrenOfMain = $previousTab.find('.tab__content').contents();
        const $previousTabNewMain = $('<div class="tab__content"></div>').append($previousTabChildrenOfMain);
        const $previousTabOldMain = $previousTab.find('.tab__content');

        $previousTabOldMain.remove();
        $previousTabNewMain.prependTo($previousTabInner);
    }
}

module.exports = TabEnhancements;
