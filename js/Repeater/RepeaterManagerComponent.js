class RepeaterManagerComponent {
    /**
     * Repeater Manager
     * @param pulsarFormComponent {PulsarFormComponent}
     * @param repeaterComponentFactory {repeaterComponentFactory}
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
        this.$html.find('.repeater').each((index, element) => {
            this.repeaterComponentFactory(this.pulsarFormComponent, element)
                .init();
        });
    }
}

module.exports = RepeaterManagerComponent;
