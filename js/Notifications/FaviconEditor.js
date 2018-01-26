const { filterFileExtension, getFileExtension } = require('../utilities/fileUtilities');

class FaviconEditor {
    /**
     * @param root {HTMLElement}
     */
    constructor (root) {
        /**
         * <link/> references
         * @type {Array<{ node: HTMLLinkElement, cachedHref: string }>}
         */
        this.favicons = [];

        /**
         * Root element for favicon queries
         * @type {HTMLElement}
         */
        this.root = root

        /**
         * A serializer function that can be overwritten using
         * the public API, this is for altering the return data type
         * from the update methods
         * @param canvas {HTMLCanvasElement}
         * @param ctx {CanvasRenderingContext2D}
         * @param originalImage {HTMLImageElement}
         */
        this.serializer = (canvas, ctx, originalImage) => {
            const ext = getFileExtension(originalImage.src);

            // If we can derive an extension from the file
            // we will assume the mime type. If we cannot get
            // an extension we will return the original favicon
            // src in order the gracefully degrade
            if (ext) {
                return canvas.toDataURL(`image/${ext}`);
            } else {
                return originalImage.src;
            }
        }
    }

    /**
     * Override the canvas serializer function
     * @param serializer {function}
     */
    setSerializer (serializer) {
        this.serializer = serializer;
    }

    /**
     * Initiate service
     */
    init () {
        // Get favicon nodes from DOM
        this.favicons = [].slice.call(this.root.querySelectorAll('[rel*="icon"]'))
            .map(node => ({ node, cachedHref: node.href }));
    }

    /**
     * Update the favicon href, takes a custom graphics function
     * that exposes the canvas context for adding favicon details
     * @param customGraphics {function}
     */
    async update (customGraphics) {
        const setupPromises = [];
        let favicons;
        let data;

        this.favicons.forEach(({ node }) => {
            if (filterFileExtension(node.href, 'ico png')) {
                setupPromises.push(this.setup(node));
            }
        });

        try {
            favicons = await Promise.all(setupPromises);
        } catch (error) {
            favicons = [];
        }


        for (let index = 0; index < favicons.length; index++) {
            const { node, canvas, image } = favicons[index];
            const uri = this.draw(canvas, image, customGraphics);

            // assign the uri to data so we can return the new
            // favicon data uri
            if (!index) {
                data = uri;
            }

            node.href = uri;
        }

        return data;
    }

    /**
     * Add a circle to the top right of the favicon
     * @param color {string}
     * @param size {number}
     * @returns {Promise<string>}
     */
    async addCircleNotification (color, size = 10) {
        const radius = size / 2;

        return await this.update((canvas, ctx) => {
            ctx.fillStyle = color;
            ctx.beginPath();
            ctx.arc(canvas.width - radius, radius, radius, 0, 2 * Math.PI);
            ctx.fill();
        });
    }

    /**
     * Add a notification with a custom graphics function,
     * the callback will receive the canvas and context as
     * arguments
     * @param customGraphics {function}
     * @returns {Promise<string>}
     */
    async addCustomNotification (customGraphics) {
        return await this.update(customGraphics);
    }

    /**
     * Setup an in-memory canvas
     * @param faviconNode {HTMLLinkElement}
     */
    setup (faviconNode) {
        // Create an image from our favicon
        const favicon = document.createElement('img');

        // Create canvas
        const canvas = document.createElement('canvas');

        // Side step issues with CORs and "tainted" canvases
        favicon.crossOrigin = '';

        return new Promise((resolve, reject) => {
            favicon.src = faviconNode.href;

            // Wait for our favicon to load
            favicon.addEventListener('load', event => {
                resolve({ canvas, image: event.target, node: faviconNode });
            });

            favicon.addEventListener('error', reject);
        });
    }

    /**
     * Draw favicon on a canvas
     * @param canvas {HTMLCanvasElement}
     * @param favicon {HTMLImageElement}
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

        // pass canvas, ctx & favicon image node to our
        // serializer function
        return this.serializer(canvas, ctx, favicon);
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
