const FaviconEditor = require('../../../../js/Notifications/FaviconEditor');
const $ = require('jquery');
const vanillaFavicon = require('./fixtures/favicon');
const faviconWithRedCircle = require('./fixtures/faviconWithRedCircle?radius=10&color=red');
const faviconWithCustomGraphic = require('./fixtures/faviconWithCustom?rect=0055&fillStyle=red');
const { AssertionError } = require('chai');

describe('FaviconEditor', () => {
    let faviconEditor;
    let $html;

    beforeEach(() => {
        $html = $(`
            <div id="head">
                <link id="favicon_0" rel="icon" type="image/png" href="original_favicon.png" sizes="32x32">
                <link id="favicon_1" rel="apple-touch-icon" sizes="57x57" href="original_favicon.png">
                <link id="favicon_2" rel="shortcut icon" href="original_favicon.png">
            </div>
        `);
        faviconEditor = new FaviconEditor($html[0]);
    });

    describe('init', () => {
        it('should create references to all favicon link nodes', () => {
            faviconEditor.init();

            faviconEditor.favicons.forEach(({ node, cachedHref }, index) => {
                const testNode = $html[0].querySelector(`#favicon_${index}`);

                expect(node.isSameNode(testNode)).to.be.true;
                expect(cachedHref).to.equal(node.href);
            });
        });
    });

    describe('restore', () => {
        it('should restore the cached value for a link element', () => {
            faviconEditor.init();

            $html.find('link').each((index, element) => {
                element.href = 'foo';
            });

            faviconEditor.restore();

            // not asserting the actual href in this case, as it will be prepended by
            // the host and port used by Phantom, I'm happy that if the value is not what
            // I've changed it to then it has been restored
            $html.find('link').each((index, element) => {
                expect(element.href).to.not.equal('foo');
            });
        });
    });

    describe('serializer', () => {

    });

    // Update methods are tested using snapshots saved in ./snapshots/
    // we assert that our favicon update methods return the same
    // data encoded URI as defined in the snapshot directory

    describe('update', () => {
        let $root;

        beforeEach(() => {
            $root = $(`
                <div>
                    <link rel="icon" href="${vanillaFavicon}">
                    <link rel="icon" href="${vanillaFavicon}">
                </div>`
            );

            $('body').append($root);
        });

        afterEach(() => {
            $root.remove();
        });

        it('should swallow errors when performing setup and leave link element untouched', (done) => {
            $root.html('<link rel="icon" href="!@£$%^&*().png">');

            faviconEditor = new FaviconEditor($root[0]);
            faviconEditor.init();

            faviconEditor.update(() => {})
                .then(() => {
                    expect($root.find('link').attr('href')).to.equal('!@£$%^&*().png');
                    done();
                })
                .catch(done);
        });

        it('should ignore favicons it cant handle', (done) => {
            const $invalidFavicon = $('<link rel="icon" href="favicon.svg">');

            $root.append($invalidFavicon);

            faviconEditor = new FaviconEditor($root[0]);
            faviconEditor.init();

            faviconEditor.addCircleNotification('red')
                .then((data) => {
                    expect(data).to.be.truthy;
                    done();
                })
                .catch(done);

            $invalidFavicon.remove();
        });

        /**
         * Convert fixture data array to a encoded URL for comparison debugging
         * @param data {Array<number>}
         * @param width {number}
         * @param height {number}
         * @returns {string|*}
         */
        function getExpectedURL (data, width, height) {
            const cvs = document.createElement('canvas');
            const ctx = cvs.getContext('2d');
            const imageData = new window.ImageData(Uint8ClampedArray.from(data), width, height);

            ctx.putImageData(imageData, 0, 0);

            return cvs.toDataURL('image/png');
        }

        /**
         * Create a custom Chai assertion error and print image URLs
         * @param expected {string}
         * @param actual {string}
         * @returns {*}
         */
        function faviconError (expected, actual) {
            return new AssertionError(`Favicons did not match:\n\nEXPECTED: ${expected}\n\nACTUAL: ${actual}`);
        }

        describe('addCircleNotification', () => {
            it('should draw a circle onto an image', (done) => {
                const expected = getExpectedURL(faviconWithRedCircle, 32, 32);
                let actual;

                faviconEditor = new FaviconEditor($root[0]);
                faviconEditor.init();

                // Override serializer to return raw image data, we cannot use the default
                // canvas.toDataURL(...) here as the png compression is different when
                // in the browser / headless test environments
                faviconEditor.setSerializer((canvas, ctx) => {
                    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
                    const debugCvs = document.createElement('canvas');
                    const debugCtx = debugCvs.getContext('2d');

                    debugCtx.width = canvas.width;
                    debugCtx.height = canvas.height;
                    debugCtx.putImageData(imageData, 0, 0);
                    actual = debugCvs.toDataURL('image/png');

                    return [...imageData.data];
                });

                faviconEditor.addCircleNotification('red', 5)
                    .then((data) => {
                        try {
                            expect(data).to.deep.equal(faviconWithRedCircle);
                            done();
                        } catch (error) {
                            done(faviconError(actual, expected));
                        }
                    })
                    .catch(done);
            });
        });

        describe('addCustomNotification', () => {
            it('should draw a custom graphic onto an image', (done) => {
                const expected = getExpectedURL(faviconWithCustomGraphic, 32, 32);
                let actual;

                faviconEditor = new FaviconEditor($root[0]);
                faviconEditor.init();

                // Override serializer to return raw image data, we cannot use the default
                // canvas.toDataURL(...) here as the png compression is different when
                // in the browser / headless test environments
                faviconEditor.setSerializer((canvas, ctx) => {
                    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
                    const debugCvs = document.createElement('canvas');
                    const debugCtx = debugCvs.getContext('2d');

                    debugCtx.width = canvas.width;
                    debugCtx.height = canvas.height;
                    debugCtx.putImageData(imageData, 0, 0);
                    actual = debugCvs.toDataURL('image/png');

                    return [...imageData.data];
                });

                faviconEditor.addCustomNotification(
                    (canvas, ctx) => {
                        ctx.fillStyle = 'red';
                        ctx.rect(0, 0, 5, 5);
                        ctx.fill();
                    })
                    .then(data => {
                        try {
                            expect(data).to.deep.equal(faviconWithCustomGraphic);
                            done();
                        } catch (error) {
                            done(faviconError(actual, expected));
                        }
                    })
                    .catch(done);
            });
        });
    });
});
