const $ = require('jquery');

class RepeaterPlaceholderService {
    /**
     * Repater placeholder service
     * @param queryService {QueryService}
     */
    constructor (
        queryService
    ) {
        this.queryService = queryService;
    }

    /**
     * Prepend the preview empty placeholder
     */
    add () {
        this.queryService.get('preview-root').insertBefore(
            this.queryService.get('preview-placeholder'),
            this.queryService.get('preview-root').firstChild
        );
    }

    /**
     * Remove preview placeholder and update reference
     */
    remove () {
        // remove placeholder
        const placeholder = this.queryService.get('preview-placeholder');

        // add a manual cached reference
        this.queryService.updateRef('preview-placeholder', placeholder.cloneNode(true));

        // remove the placeholder from the DOM
        placeholder.remove();
    }
}

module.exports = RepeaterPlaceholderService;
