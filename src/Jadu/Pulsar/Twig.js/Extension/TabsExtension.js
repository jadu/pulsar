var _ = require('lodash');

function TabsExtension() {
}

TabsExtension.prototype.getName = function () {
    return 'tabs_extension';
};

TabsExtension.prototype.getActiveParentTabID = function (tabs, active_parent_tab_id) {
    if (!tabs) {
        return false;
    }

    if (_.isArray(tabs)) {
        tabs = JSON.stringify(tabs);
    }

    var ob;
    try {
        ob = JSON.parse(tabs);
    } catch (e) {
        return false;
    }

    if (active_parent_tab_id === undefined || active_parent_tab_id === null) {
        return ob[0].id;
    }

    var active_id = 1;

    _.each(ob, function (item) {
        // If we have subnavigation
        if (item.sub_tabs) {
            // Loop through its sub tabs
            _.each(item.sub_tabs, function (sub_tab) {
                if (sub_tab.id === active_parent_tab_id) {
                    active_id = item.id;
                    return null;
                }
            });
        }
    });

    return active_id;
};

TabsExtension.prototype.install = function (Twig) {
    Twig.extendFunction('get_active_tab', this.getActiveParentTabID);
};

module.exports = TabsExtension;
