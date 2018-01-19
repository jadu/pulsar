const { filterFileExtension } = require('../utilities/filterByFileExtension');

class FaviconEditor {
    /**
     * @param root {HTMLElement}
     */
    constructor (root) {
        /**
         * <link/> references
         * @type {Array<{ node: HTMLElement, cachedHref: string }>}
         */
        this.favicons = [];

        /**
         * Root element for favicon queries
         * @type {HTMLElement}
         */
        this.root = root;
    }

    /**
     * Initiate service
     */
    async init () {
        // Get favicon nodes from DOM
        this.favicons = [].slice.call(this.root.querySelectorAll('[rel*="icon"]'))
            .map(node => ({node, cachedHref: node.href}));
    }

    /**
     * Update the favicon href, takes a custom graphics function
     * that exposes the canvas context for adding favicon details
     * @param customGraphics {function}
     */
    async update (customGraphics) {
        const setupPromises = [];
        let favicons;

        this.favicons.forEach(({ node }) => {
            if (filterFileExtension(node.href, 'ico png')) {
                setupPromises.push(this.setup(node));
            }
        });

        try {
            favicons = await Promise.all(setupPromises);
        } catch (error) {

        }

        favicons.forEach(({ canvas, image, node }) => {
            node.href = this.draw(canvas, image, customGraphics);
        });
    }

    /**
     * Add a circle to the top right of the favicon
     * @param color {string}
     * @param size {number}
     */
    async addCircleNotification (color, size = 6) {
        return await this.update((canvas, ctx) => {
            ctx.fillStyle = color;
            ctx.beginPath();
            ctx.arc(canvas.width - size, size, size, 0, 2 * Math.PI);
            ctx.fill();
        });
    }

    /**
     * Add a notification with a custom graphics function,
     * the callback will receive the canvas and context as
     * arguments
     * @param customGraphics {function}
     */
    addCustomNotification (customGraphics) {
        this.update(customGraphics);
    }

    /**
     * Setup an in-memory canvas
     * @param faviconNode {HTMLElement}
     */
    setup (faviconNode) {
        // Create an image from our favicon
        const favicon = document.createElement('img');
        // Create canvas
        const canvas = document.createElement('canvas');

        return new Promise((resolve, reject) => {
            // Wait for our favicon to load
            favicon.addEventListener('load', event => {
                resolve({ canvas, image: event.target, node: faviconNode });
            });

            favicon.addEventListener('error', reject)

            favicon.src = faviconNode.href;
        });
    }

    /**
     * Draw favicon on a canvas
     * @param canvas {HTMLElement}
     * @param favicon {HTMLElement}
     * @param customGraphics {function}
     */
    draw (canvas, favicon, customGraphics) {
        const ctx = canvas.getContext('2d');

        // Setup dimensions
        canvas.width = favicon.width;
        canvas.height = favicon.height;

        // Draw favicon
        ctx.drawImage(favicon, 0, 0);

        // Add graphics
        customGraphics(canvas, ctx);

        // TODO: derive type from source
        // Return data URL of canvas
        return canvas.toDataURL('image/png');
    }

    /**
     * Restore favicons to cached state
     */
    restore () {
        this.favicons.forEach(({ node, cachedHref }) => {
            node.href = cachedHref;
        });
    }
}

module.exports = FaviconEditor;
