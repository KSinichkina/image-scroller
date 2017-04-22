var Utils = (function () {
    'use strict';

    var getEl = function(selector) {
        return document.querySelector(selector);
    },
    getElAll = function(selector) {
        return document.querySelectorAll(selector);
    };

    return {
        getEl: getEl,
        getElAll: getElAll
    };
})();
