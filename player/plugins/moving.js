data.title = q;
data.text = v;
data.click = function () {
    global.sypStorage.set(type + 'ItagYT', qualitySimplified);
    global.sypStorage.set(type + 'CodecYT', codec.substring(0, 4));
    try {
        global.sypStorage.set('settimeonload', global.vCurrectTime - 1);
    } catch (e) {
        console.log(e);
    }

    global.setpage(global.page);
}
if (type == 'audio') {
    global.advancedList(qualityAudio, [data]);
} else {
    global.advancedList(qualityVideo, [data]);
}
























plugins.yt.recommendationList = function (d) { //Request update
    //
    const n = d.contents.twoColumnWatchNextResults.secondaryResults.secondaryResults.results;
    // function g(r) {
    //
    // }
    var data = [];
    var i = 0;
    plugins.yt.pf.repeat(n, function (i) {
        if (n[i].compactVideoRenderer) {
            data.push(plugins.yt.videoInfo(n[i].compactVideoRenderer));
        }
    });
    return data;
}