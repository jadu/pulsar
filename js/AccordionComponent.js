/*
*   This content is licensed according to the W3C Software License at
*   https://www.w3.org/Consortium/Legal/2015/copyright-software-and-document
*
*   Simple accordion pattern example
*/

'use strict';

var $ = require('jquery');

function AccordionComponent(html) {
    this.$html = html;
    this.openPanelId;
};

AccordionComponent.prototype.init = function () {
    let component = this;
    
    component.$content = component.$html.find('.accordion__content');

    // Hide all panels
    // component.$content.attr('hidden', '');

    // check which panel has defined as open in the markup
    // component.openPanelId = component.$html.find('.accordion-trigger[aria-expanded=true]').attr('aria-controls');
    
    // component.hidePanel(component.$content);
    // component.showPanel(component.$html.find('[id=' + component.openPanelId + ']'));

    component.$html.on('click', '.accordion__trigger', function(e) {
        component.toggle(this, component);
    });
};

AccordionComponent.prototype.toggle = function (trigger, component) {
    console.log('toggle');

    let $target = $(component.$html.find('[id= ' + $(trigger).attr('aria-controls') + ']')),
        $button = $(trigger);

    if ($target.attr('hidden') === 'hidden') {
        component.showPanel(component, $target);
        $button
            .attr('aria-expanded', 'true')
            .find('.accordion__icon')
            .removeClass('icon-chevron-up')
            .addClass('icon-chevron-down');
    }
    else {
        component.hidePanel(component, $target);
        $button
            .attr('aria-expanded', 'false')
            .find('.accordion__icon')
            .removeClass('icon-chevron-down')
            .addClass('icon-chevron-up');
    }
};

AccordionComponent.prototype.showPanel = function (component, panel) {
    console.log('show');

    let $panel = $(panel);

    component.openPanelId = $panel.attr('id');
    $panel.removeAttr('hidden');
};

AccordionComponent.prototype.hidePanel = function (component, panel) {
    console.log('hide');

    let $panel = $(panel);

    $panel.attr('hidden', '')
};

module.exports = AccordionComponent;