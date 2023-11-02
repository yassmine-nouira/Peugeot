
function getPromoObj(name, position, modeId) {
    var promoObj = {
        'name': name,
        'id': modeId,
        'creative': '',
        'position': position
    }
}
var firstLine = false;
var secondLine = false;
function dataOnj() {
    var promo = {};
}

function isElementInViewport(el) {
    if (typeof jQuery !== 'undefined' && el instanceof jQuery)
        el = el[0];
    var rect = el[0].getBoundingClientRect();
    var windowHeight = (window.innerHeight || document.documentElement.clientHeight);
    var windowWidth = (window.innerWidth || document.documentElement.clientWidth);
    return (
        (rect.left >= 0)
        && (rect.top >= 0)
        && ((rect.left + rect.width) <= windowWidth)
        && ((rect.top + rect.height) <= windowHeight)
    );
}
function fnIsVis(ele) {
    var inVpFull = isElementInViewport(ele);
    return inVpFull;
}
var isLineSend = false;
var sendLine = [];
function checkLine(index) {
    if (sendLine.findIndex(e => e.line === index) !== -1) {
        return true;
    }
    return false;
}

function articleLines() {
    var articles = $('article');
    var articleLineCount = articles != undefined && articles.length != 0 ? Math.round(articles.length / 3) : 0;
    var sendItemCon = [];
    for (var i = 0; i < articleLineCount; i++) {
        var promoObj = [];
        var sendItem = [];
        if (articles.length - (i * 3) < 3) {
            sendItem.push($('article').eq((i * 3)));
            sendItem.push($('article').eq((i * 3) + 1));
        } else {
            sendItem.push($('article').eq((i * 3)));
            sendItem.push($('article').eq((i * 3) + 1));
            sendItem.push($('article').eq((i * 3) + 2));
        }
        //$(sendItem).each(function (index) {
        //    var isShow = fnIsVis($(this).find('img'));
        //    if (isShow && !isLineSend) {
        //        promoObj.push({
        //            'name': 'SatışKampanyaları-Component',
        //            'id': $(this).find('span').text().trim(),
        //            'creative': $(this).find('span').text().trim(),
        //            'position': index
        //        });
        //    }
        //});
        sendItemCon.push({ line: i+1 ,data: sendItem });
    }
    $(sendItemCon).each(function (index, element) {
        var selectedData = element.data;
        if (selectedData != undefined && selectedData.length != 0) {
            var lineFirstItem = selectedData[0];
            var isShow = fnIsVis($(lineFirstItem).find('img'));
            if (isShow && !checkLine(index)) {
                sendLine.push({ line: index, isSend: true });
                $(selectedData).each(function (index) {
                    promoObj.push({
                        'name': 'SatışKampanyaları-Component',
                        'id': $(this).find('span').text().trim(),
                        'creative': $(this).find('span').text().trim(),
                        'position': index
                    });
                });
                dataLayer.push({
                    'event': 'gaEvent',
                    'eventCategory': 'Promotion Impression',
                    'eventAction': 'Satış Kampanyaları',
                    'eventLabel': 'Satış Kampanyaları',
                    'eventNonInteraction': true,
                    'ecommerce': {
                        'promoView': {
                            'promotions': promoObj
                        }
                    }
                });
            }
        }
    });
}

$(window).scroll(function () {
    articleLines();
});
$('a.more-btn').on('click', function (e) {
    e.preventDefault();
    var data = $(this).parent().parent();
    var promoObj = [
        {
            'name': 'SatışKampanyaları-Component',
            'id': $(data).find('span').text().trim(),
            'creative': $(data).find('span').text().trim(),
            'position': 1
        }
    ];
    dataLayer.push({
        'event': 'gaEvent',
        'eventCategory': 'Promotion Click',
        'eventAction': 'Satış Kampanyaları',
        'eventLabel': $(data).find('span').text().trim(),
        'eventNonInteraction': true,
        'ecommerce': {
            'promoView': {
                'promotions': promoObj
            }
        }
    });
    window.location.href = $(this).attr('href');
});
dataLayer.push(pageObj);
dataLayer.push(dataLayerObj);
