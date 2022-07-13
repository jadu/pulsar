'use strict';

var $ = require('jquery');

/**
 * Accessible tooltips using the tippyjs library with some custom behaviour to meet WCAG 2.1 1.4.13
 */
class TooltipListener {

    /**
     * Tooltip listener
     * @constructor
     * @param {jQuery} $html - jQuery wrapper of the container node
     * @param {tippy} TippyJS lib
     * @param {hideAll} Tippy hideAll method
     */
    constructor ($html, tippy, hideAll) {
        this.$html = $html;
        this.tippy = tippy;
        this.hideAll = hideAll
        this.tippys = [];
        this.tippyConfig = {
            // Default to not allowing html inside of tooltip
            allowHTML: false,

            // Remove the default fade animation
            animation: 'none',

            // To prevent overflow issues, always append to body
            appendTo: this.$html.find('body')[0],

            // Remove the animation duration
            duration: 0,

            // Interactive allows us the hover over the tooltip contents, needed for WCAG 1.4.13: Content on Hover or Focus
            // unfortunately, adding aria: 'describedby' here doesn't work as the interactive option removes it and replaces
            // with aria-expanded see https://github.com/atomiks/tippyjs/issues/709
            // therefore we manually handle the tooltip aria-describedby attribute in the onMount and onHide lifecycle hooks
            interactive: true,

            // Custom methods, also required for WCAG compliance
            onCreate: this.onCreate,
            onMount: this.onMount,
            onHide: this.onHide,
            onHidden: this.onHidden
        };
    }

    /**
     * Initialise
     */
    init () {
        this.tippys = this.tippy('[data-tippy-content]', this.tippyConfig);

        // Close ESC button
        this.$html.on('keydown', (event) => {
            if (event.keyCode === 27) {
                this.hideAll();
            }
        });
    }

    /**
     * Listen for new elements with tippys, ignore if already instantiated, create tooltip if not
     * @param {jQuery} $html - jQuery wrapper of the container node
     */
    listen ($html) {
        // Only create new tippys
        $html.find('[data-tippy-content]').each((index, element) => {
            if (this.isInstantiated(element)) {
                return;
            }

            this.tippys.push(this.tippy(element, this.tippyConfig));
        });
    }

    /**
     * Check if element is instantiated
     * @param {Element} element - element to check for tippy instance
     */
    isInstantiated(element) {
        for (const tippy of this.tippys) {
            if (tippy.reference === element) {
                return true;
            }
        }
        return false;
    }

    /**
     * Get tippy instance of element
     * @returns {(object|null)} tippy object relating to an element or null
     */
    getInstance(element) {
        for (const tippy of this.tippys) {
            if (tippy.reference === element) {
                return tippy;
            }
        }

        return null;
    }

    onCreate (instance) {
        // Remove unnecessary aria-expanded attribute (added by the interactive option - needed for content hover)
        $(instance.reference).removeAttr('aria-expanded');
    }

    onMount(instance) {
        let existingValue;

        // If the element already has aria-describedby text, keep it and add the tippy reference ID
        if ($(instance.reference).attr('aria-describedby')) {
            existingValue = $(instance.reference).attr('aria-describedby');
            $(instance.reference).attr('aria-describedby', 'tippy-' + instance.id + ' ' + existingValue);
        } else {
            $(instance.reference).attr('aria-describedby', 'tippy-' + instance.id);
        }

        // Remove unnecessary re-added aria-expanded attribute
        $(instance.reference).removeAttr('aria-expanded');
    }

    onHide(instance) {
        let existingValue = $(instance.reference).attr('aria-describedby');

        // Remove tippy aria-describedby reference
        existingValue = existingValue.replace('tippy-' + instance.id, '').trim();

        // If no existing aria-describedby, remove the attribute
        if (existingValue.length < 1) {
            $(instance.reference).removeAttr('aria-describedby');
        } else {
            $(instance.reference).attr('aria-describedby', existingValue);
        }
    }

    onHidden(instance) {
        // Remove unnecessary aria-expanded attribute
        $(instance.reference).removeAttr('aria-expanded');
    }
}

module.exports = TooltipListener;
