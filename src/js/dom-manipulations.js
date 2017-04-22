var Moves = (function(Utils, Jsonp) {
    'use strict';

    var storage = [],
        animationLayout = Utils.getEl('.animation-layout'),
        animationLayoutStyle = animationLayout.style,
        setLine, line = 0, img = 0;

    var moveUp = function () {
        if (line - 1 < 0 && storage.length === 0) {
            return;
        }

        if (line - 1 < storage.length && storage.length > 0) {
            Utils.getEl('.line').remove();
            Utils.getElAll('.line')[storage.length - 1].insertAdjacentHTML("beforeBegin", storage.pop());
            line = storage.length;
            setLine = Utils.getElAll('.line')[line];
            setLine.children[img].focus();
        } else {
            setLine = Utils.getElAll('.line')[--line];
            setLine.children[img].focus();
        }
        if (line === 0) {
            animationLayoutStyle.transform = 'translate(0, 0)';
        } else {
            animationLayoutStyle.transform = 'translate(0,' + ((-244 * line) + 30) + 'px)';
        }
    },
    moveDown = function () {
        var hiddenLine, imgInLine, n;

        if (line > 1) {
            storage.push(Utils.getElAll('.line')[line - 2].outerHTML);
            hiddenLine = Utils.getElAll('.line')[line - 2];
            imgInLine = hiddenLine.children.length;

            for (n = 0; n < imgInLine; n ++) {
              hiddenLine.children[0].remove();
            }
        }
        setLine = Utils.getElAll('.line')[++line];
        setLine.children[img].focus();

        animationLayoutStyle.transform = 'translate(0,' + (-244 * line) + 'px)';

        if (line % 7 === 0 ) {
            Jsonp.getFlickrPhoto();
        }
    },
    moveLeft = function () {
        if (img > 0) {
            setLine = Utils.getElAll('.line')[line];
            setLine.children[--img].focus();
        }
    },
    moveRight = function () {
        if (img < 4) {
            setLine = Utils.getElAll('.line')[line];
            setLine.children[++img].focus();
        }
    };

    return {
        moveUp: moveUp,
        moveDown: moveDown,
        moveLeft: moveLeft,
        moveRight: moveRight
    };
})(Utils, Jsonp);
