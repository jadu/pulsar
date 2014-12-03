/*global define */
define([
    'jquery',
    'greeter',
    'util'
], function (
    $,
    Greeter,
    util
) {

    'use strict';

    function GreeterPage () {
    }

    util.extend(GreeterPage.prototype, {

        init: function () {

            var greeter = new Greeter();
            greeter.init();

        }
    });

    return GreeterPage;
});
