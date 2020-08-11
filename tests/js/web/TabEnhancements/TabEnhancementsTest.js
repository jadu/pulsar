import $ from 'jquery';
import TabEnhancements from '../../../../js/TabEnhancements/TabEnhancements'

describe('TabEnhancements', () => {
    let $html;
    let $body;
    let $legacyTabs;
    let $tabs;
    let tabEnhancements;
    let consoleWarnStub;

    beforeEach(() => {
        $html = $('html');
        $body = $('body');

        $legacyTabs = $(`
            <div class="tabs" id="legacyTabs">
                <div class="tabs__content">
                    <div class="tab__pane"></div>
                </div>
            </div>
            <div class="tabs__list" id="legacyTabsList"></div>
        `).appendTo($body);

        $tabs = $(`
            <div class="tabs__content" id="currentTabs">
                <nav class="nav-inline">
                    <ul class="nav-inline__list">
                        <li class="nav-inline__item nav-inline__item--is-active is-active">
                            <a href="#tab1" data-toggle="tab" class="nav-inline__link" id="tabLink1">Tab one</a>
                        </li>
                        <li class="nav-inline__item">
                            <a href="#tab2" data-toggle="tab" class="nav-inline__link" id="tabLink2">Tab two</a>
                        </li>
                    </ul>
                </nav>

                <div class="tab__pane is-active" id="tab1">
                    <div class="tab__container">
                        <div class="tab__inner">
                            <div class="tab__content">
                                <p>tab 1 content</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="tab__pane" id="tab2">
                    <div class="tab__container">
                        <div class="tab__inner">
                            <div class="tab__content">
                                <p>tab 2 content</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `).appendTo($body);

        tabEnhancements = new TabEnhancements();
    });

    afterEach(() => {
        $body.empty();
    });

    describe('init()', () => {
        it('should console.warn if tab.js is not loaded', () => {
            consoleWarnStub = sinon.stub(console, 'warn');
            $.fn.tab = undefined;

            tabEnhancements.init($html);

            expect(consoleWarnStub).to.be.calledOnce;
        });

        it('should set the min-height of legacy tabs tab__pane to the height of tabs__list', () => {
            const $legacyTabsPane = $body.find('#legacyTabs .tab__pane');
            const $legacyTabsList = $body.find('#legacyTabsList');
            $legacyTabsList.height(100);

            tabEnhancements.init($html);

            expect($legacyTabsPane.css('min-height')).to.be.equal('100px');
        });
    });

    describe('When the page loads', () => {
        beforeEach(() => {
            tabEnhancements.init($html);
        });

        it('should change the active tabs main element to <main>', () => {
            expect($body.find('#currentTabs #tab1 .tab__content').is('main')).to.be.true;
        });

        it('should add id="skip-target" to the active tabs <main>', () => {
            expect($body.find('#currentTabs #tab1 .tab__content').attr('id')).to.equal('skip-target');
        });
    });

    describe('When a new tab is shown', () => {
        beforeEach(() => {
            sinon.spy(tabEnhancements, 'changePreviousTabElementToDiv');

            tabEnhancements.init($html);

            $body.find('#tabLink2').trigger('show.bs.tab');
        });

        it('should change the active tabs main element to <main>', () => {
            expect($body.find('#currentTabs #tab2 .tab__content').is('main')).to.be.true;
        });

        it('should add id="skip-target" to the active tabs <main>', () => {
            expect($body.find('#currentTabs #tab2 .tab__content').attr('id')).to.equal('skip-target');
        });

        it('should copy the contents active tabs main element over to the the new <main>', () => {
            expect($body.find('#currentTabs #tab2 .tab__content').html().trim()).to.equal('<p>tab 2 content</p>');
        });

        // Test event is missing event.relatedTarget so testing the method is called and behaviour separately
        it('should reset the previous tab by calling changePreviousTabElementToDiv()', () => {
            expect(tabEnhancements.changePreviousTabElementToDiv).to.have.been.calledOnce;
        });

        describe('changePreviousTabElementToDiv()', () => {
            beforeEach(() => {
                tabEnhancements.changePreviousTabElementToDiv($body.find('#tab1'));
            });

            it('should replace the previous tabs <main class="tab__content"> element with <div class="tab__content">', () => {
                expect($body.find('#currentTabs #tab1 .tab__content').is('div')).to.be.true;
            });

            it('should remove the id="skip-target"', () => {
                expect($body.find('#currentTabs #tab1 .tab__content').attr('id')).to.be.undefined;
            });

            it('should copy the content from the old <main> to the new <div>', () => {
                expect($body.find('#currentTabs #tab1 .tab__content').html().trim()).to.equal('<p>tab 1 content</p>');
            });
        });
    });
});
