/*global define */
define(function () {

  'use strict';

  var hasOwn = {}.hasOwnProperty,
  inheritFrom = Object.create || function (from) {
    function F() {}
    F.prototype = from;
    return new F();
  },
  slice = [].slice,
  util = {
    each: function (obj, callback, options) {
        var key,
            length;

        if (!obj) {
            return;
        }

        options = options || {};

        if (('length' in obj) && !options.keys) {
            for (key = 0, length = obj.length; key < length; key += 1) { // Keep JSLint happy with '+= 1'
                if (callback.call(obj[key], obj[key], key, obj) === false) {
                    break;
                }
            }
        } else {
            for (key in obj) {
                if (hasOwn.call(obj, key)) {
                    if (callback.call(obj[key], obj[key], key, obj) === false) {
                        break;
                    }
                }
            }
        }
    },
    extend: function (target) {
      util.each(slice.call(arguments, 1), function (obj) {
        util.each(obj, function (val, key) {
          target[key] = val;
        }, { keys: true });
      });

      return target;
    }
  };

  return util;
});
