const FaviconEditor = require('../../../../js/Notifications/FaviconEditor');
const $ = require('jquery');
const vanillaFavicon = require('./fixtures/favicon');
const faviconWithRedCircle = require('./fixtures/faviconWithRedCircle?radius=10&color=red');
const faviconWithCustomText = require('./fixtures/faviconWithCustom?text=TEST');

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

    // Update methods are tested using snapshots saved in ./snapshots/
    // we assert that our favicon update methods return the same
    // data encoded URI as defined in the snapshot directory

    describe('update', () => {
        let $root;

        beforeEach(() => {
            $root = $(`
                <div>
                    <link rel="icon" href="${vanillaFavicon}">
                </div>`
            );

            $('body').append($root);
        });

        afterEach(() => {
            $root.remove();
        });

        describe('addCircleNotification', () => {
            it('should draw a circle onto an image', (done) => {
                faviconEditor = new FaviconEditor($root[0]);
                faviconEditor.init();

                // Override serializer to return raw image data, we cannot use the default
                // canvas.toDataURL(...) here as the png compression is different when
                // in the browser / headless test environments
                faviconEditor.setSerializer((canvas, ctx) => {
                    return [...ctx.getImageData(0, 0, canvas.width, canvas.height).data];
                });


                faviconEditor.addCircleNotification('red', 10)
                    .then((data) => {
                        expect(data).to.deep.equal(faviconWithRedCircle);
                        done();
                    })
                    .catch(done);
            });
        });

        describe('addCustomNotification', () => {
            it('should draw a custom graphic onto an image', (done) => {
                faviconEditor = new FaviconEditor($root[0]);
                faviconEditor.init();

                // Override serializer to return raw image data, we cannot use the default
                // canvas.toDataURL(...) here as the png compression is different when
                // in the browser / headless test environments
                faviconEditor.setSerializer((canvas, ctx) => {
                    return [...ctx.getImageData(0, 0, canvas.width, canvas.height).data];
                });

                faviconEditor.addCustomNotification(
                    (canvas, ctx) => {
                        ctx.font = '5px Arial';
                        ctx.textAlign = 'center';
                        ctx.fillText('TEST', canvas.width / 2, canvas.height / 2);
                    })
                    .then(data => {
                        expect(data).to.deep.equal(faviconWithCustomText);
                        done();
                    })
                    .catch(done);
            });
        });
    });
});
