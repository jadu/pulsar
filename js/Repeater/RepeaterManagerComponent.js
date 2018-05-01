class RepeaterManagerComponent {
    /**
     * Repeater Manager
     * @param pulsarFormComponent {PulsarFormComponent}
     * @param repeaterComponentFactory {repeaterComponentFactory}
     * @param $html {$}
     */
    constructor (
        pulsarFormComponent,
        repeaterComponentFactory,
        $html
    ) {
        this.pulsarFormComponent = pulsarFormComponent;
        this.repeaterComponentFactory = repeaterComponentFactory;
        this.$html = $html;
    }

    /**
     * Initiate repeaters on the page
     */
    init () {
        this.$html.find('[data-repeater]').each((index, element) => {
            const repeater = this.repeaterComponentFactory(this.pulsarFormComponent, element);

            repeater.init();
        });
    }
}

module.exports = RepeaterManagerComponent;
