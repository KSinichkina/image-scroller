(function (Utils, Moves, Jsonp) {
    'use strict';

    var DEFAULTS = {
        keyUp: 38,
        keyDown: 40,
        keyLeft: 37,
        keyRight: 39,
        wheelDelay: 100
    };

    var wheeling = null,
        imageHolder = Utils.getEl('.image-holder');

    var preventDefaultForScrollKeys = function(e) {
            if (e.keyCode === DEFAULTS.keyLeft || e.keyCode === DEFAULTS.keyUp ||
                e.keyCode === DEFAULTS.keyRight || e.keyCode === DEFAULTS.keyDown) {
                preventDefault(e);

                return false;
            }
        },

        preventDefault = function (e) {
            e = e || window.event;

            if (e.preventDefault) {
                e.preventDefault();
            }
            e.returnValue = false;
        },
        onChangeFocusWithKeys = function (e) {
            if (e.keyCode === DEFAULTS.keyUp) {
                Moves.moveUp();
            } else if (e.keyCode === DEFAULTS.keyDown) {
                Moves.moveDown();
            } else if (e.keyCode === DEFAULTS.keyLeft) {
                Moves.moveLeft();
            } else if (e.keyCode === DEFAULTS.keyRight) {
                Moves.moveRight();
            }
        },
        onChangeFocusWithScroll = function (e) {
            if (!wheeling) {
                if (~~e.deltaY > 0) {
                    Moves.moveDown();
                } else {
                    Moves.moveUp();
                }
            }

            clearTimeout(wheeling);
            wheeling = setTimeout(function() {
                wheeling = undefined;
            }, DEFAULTS.wheelDelay);
        };

    Jsonp.getFlickrPhoto();
    imageHolder.addEventListener('wheel', onChangeFocusWithScroll, false);
    imageHolder.addEventListener('mousewheel', preventDefault, false);
    imageHolder.addEventListener('touchmove', preventDefault, false);
    imageHolder.addEventListener('keydown', preventDefaultForScrollKeys, false);
    imageHolder.addEventListener('keydown', onChangeFocusWithKeys, false);
})(Utils, Moves, Jsonp);
