/*jshint multistr: true */

'use strict'

var $ = require('jquery');

require('../../../js/libs/modal');

describe('Test extra functionality added to Bootstrap modals', function() {

    beforeEach(function() {
        this.$html = $('<div id="html"></div>').appendTo('html');
        this.$body = $('<div id="body"></div>').appendTo(this.$html);
        this.$code = $('\
            <a href="#theModal">\
            <div class="modal fade" id="theModal" tabindex="-1" role="dialog" aria-hidden="true">\
                <div class="modal__dialog">\
                    <div class="modal__content">\
                        <div class="modal__header">\
                            <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>\
                            <h4 class="modal__title">Standard modal</h4>\
                        </div>\
                        <div class="modal__body">\
                            <input type="text" id="textField" />\
                        </div>\
                    </div>\
                </div>\
            </div>\
').appendTo(this.$body);

        this.$modalToggle = this.$html.find('a[href="#theModal"]');
        this.$modal = this.$html.find('#theModal');
        this.$modalField = this.$html.find('#textField');

    });

    afterEach(function() {
        this.$html.remove();
    });

    describe('Opening a modal', function() {

        beforeEach(function() {
            this.$modalToggle.click();
            this.$modal.trigger('shown.bs.modal');
        });

        it('should focus the first input if one is available', function(done) {
            setTimeout(() => {
                expect(this.$modalField.is(':focus')).to.be.true;
                done();
            }, 500);
        });

    });

});

