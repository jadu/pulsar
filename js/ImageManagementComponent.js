'use strict';

import Cropper from 'cropperjs';

var $ = require('jquery');

function ImageManagement(html) {
    this.$html = html;
    this.cropper;
}

ImageManagement.prototype.init = function () {
    
    var component = this;
    
    component.$html.on('show.bs.modal', '#editModal', function () { 
        const image = document.getElementById('cropper-source');
        
        component.cropper = new Cropper(image, {
            viewMode: 1,
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
    
    component.$html.on('click', '[data-method]', function(event) {
        var e = event || window.event;
        
        var target = e.target || e.srcElement;
        var cropped;
        var result;
        var input;
        var data;
        
        console.log(target.className.indexOf('radio'));
        if (target.className.indexOf('radio') == -1) {
            e.preventDefault();
        }
        
        if (!component.cropper) {
            return;
        }
        
        while (target !== this) {
            if (target.getAttribute('data-method')) {
                break;
            }
            
            target = target.parentNode;
        }
        
        
        if (target.disabled || target.className.indexOf('disabled') > -1) {
            return;
        }
        
        data = {
            method: target.getAttribute('data-method'),
            target: target.getAttribute('data-target'),
            option: target.getAttribute('data-option') || undefined,
            secondOption: target.getAttribute('data-second-option') || undefined
        };
        
        cropped = component.cropper.cropped;
        
        if (data.method) {
            if (typeof data.target !== 'undefined') {
                input = document.querySelector(data.target);
                
                if (!target.hasAttribute('data-option') && data.target && input) {
                    try {
                        data.option = JSON.parse(input.value);
                    } catch (e) {
                        console.log(e.message);
                    }
                }
            }
            
            switch (data.method) {
                case 'rotate':
                if (cropped && component.cropper.options.viewMode > 0) {
                    component.cropper.clear();
                }
                
                break;
                
                case 'getCroppedCanvas':
                try {
                    data.option = JSON.parse(data.option);
                } catch (e) {
                    console.log(e.message);
                }
                
                if (uploadedImageType === 'image/jpeg') {
                    if (!data.option) {
                        data.option = {};
                    }
                    
                    data.option.fillColor = '#fff';
                }
                
                break;
            }
            
            result = component.cropper[data.method](data.option, data.secondOption);
            
            if (typeof result === 'object' && result !== component.cropper && input) {
                try {
                    input.value = JSON.stringify(result);
                } catch (e) {
                    console.log(e.message);
                }
            }
        }
    });
};

module.exports = ImageManagement;