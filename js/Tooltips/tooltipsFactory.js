'use strict';

const tippy = require('tippy.js').default;
const { hideAll } = require('tippy.js');
const TooltipListener = require('./TooltipListener');

/**
 * Create a Tooltip listener instance
 * @param {jQuery} $html - jQuery wrapper of the html node
 */
function tooltipFactory ($html) {
    const tooltipListener = new TooltipListener($html, tippy, hideAll);

    tooltipListener.init();
}

module.exports = tooltipFactory;
