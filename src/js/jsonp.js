var Jsonp = (function() {
    'use strict';
    var url = 'https://api.flickr.com/services/rest/?method=flickr.photos.getRecent&api_key=12f875333f5571816a8d8b5ed8679743&format=json';

    var getFlickrPhoto = function () {
        var script = document.createElement('script');
        script.src = url + (url.indexOf('?') >= 0 ? '&' : '?') + 'callback=?';
        document.body.appendChild(script);
    };

    return {
        getFlickrPhoto: getFlickrPhoto
    };
})();

function jsonFlickrApi (json) {
    var ph = {}, imgPath = '', imgEl = '',
        lineTmpl = '', photoCounter = 0,
        animationLayout = Utils.getEl('.animation-layout');


    for (var i = 0; i < 10; i++) {
        for (var j = 0; j < 5; j++) {
            ph = json.photos.photo[photoCounter++];
            imgPath = 'https://farm' + ph.farm + '.staticflickr.com/' + ph.server + '/' + ph.id + '_' + ph.secret + '.jpg';
            imgEl += '<a href="#" class="image-link"><img src="' + imgPath + '" /></a>';
        }
        lineTmpl += '<div class="line">' + imgEl + '</div>';
        imgEl = '';
    }
    animationLayout.insertAdjacentHTML("beforeEnd", lineTmpl);

    if (!jsonFlickrApi.wasFirstLoad) {
        Utils.getEl('.image-link').focus();
        jsonFlickrApi.wasFirstLoad = true;
    }
}
