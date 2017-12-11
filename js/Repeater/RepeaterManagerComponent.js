class RepeaterManagerComponent {
    /**
     * Repeater Manager
     * @param pulsarFormComponent {PulsarFormComponent}
     * @param repeaterComponentFactory {repeaterComponentFactory}
     * @param dataTablesService {DataTableService}
     * @param $html {$}
     */
    constructor (
        pulsarFormComponent,
        repeaterComponentFactory,
        dataTablesService,
        $html
    ) {
        this.pulsarFormComponent = pulsarFormComponent;
        this.repeaterComponentFactory = repeaterComponentFactory;
        this.dataTableService = dataTablesService;
        this.$html = $html;
    }

    /**
     * Initiate repeaters on the page
     */
    init () {
        this.$html.find('.repeater').each((index, repeaterElement) => {
            const repeater = this.repeaterComponentFactory(
                this.pulsarFormComponent,
                this.dataTableService,
                repeaterElement
            );

           repeater.init();
        });
    }
}

module.exports = RepeaterManagerComponent;
