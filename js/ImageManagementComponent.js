'use strict';

import Cropper from 'cropperjs';

var $ = require('jquery');

function ImageManagement(html) {
    this.$html = html;
}

ImageManagement.prototype.init = function () {

    this.$html.on('show.bs.modal', '#editModal', function () { 
        const image = document.getElementById('cropper-source');
        const cropper = new Cropper(image, {
            autoCropArea: 1,
            crop(event) {
                console.log(event.detail.x);
                console.log(event.detail.y);
                console.log(event.detail.width);
                console.log(event.detail.height);
                console.log(event.detail.rotate);
                console.log(event.detail.scaleX);
                console.log(event.detail.scaleY);
            },
        });
    });
};

module.exports = ImageManagement;