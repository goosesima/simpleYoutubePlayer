plugins.yt = {};
plugins.yt.type = 'source';
plugins.yt.pf = pf;
plugins.yt.knownUrls = ['youtu.be', 'www.youtu.be', 'youtube.com', 'www.youtube.com'];
plugins.yt.load = function () {
  plugins.yt.videoInfo = function (r){
    var video = {};
    const t = r.thumbnail.thumbnails;
    video.thumbnail = t[t.length - 1].url;

    video.title = r.title;
    if(typeof video.title == 'object'){
      if (video.title.runs) {
        video.title = video.title.runs[0].text
      } else {
        video.title = video.title.simpleText;
      }
    }

    if (r.shortViewCountText){
      video.views = r.shortViewCountText.simpleText;
    }else{
      if(r.viewCountText){
        video.views = r.viewCountText.run.join('');
      }else{
        video.views = Number(r.viewCount);
      }
    }

    if (r.lengthText){
      video.length = r.lengthText.simpleText;
    }else{
      video.length = Number(r.lengthSeconds);
    }

    if(r.author){
      video.author = r.author;
    }else{
      const owner = r.ownerText;
      if (typeof owner == 'array'){
        video.author = owner[owner.length - 1].text;
      }
    }

    video.likes = 404;
    video.dislikes = undefined;
    if (r.publishedTimeText){
      const time = r.publishedTimeText.simpleText;
      if (time) {
        video.published = time;
      }
    }

    if(r.keywords){
      video.keywords = r.keywords;
    }

    video.description = r.shortDescription;
    const id = r.videoId;
    if (id) {
      video.url = 'https://youtube.com/watch?v=' + id;
    }
    return video;
  }
  plugins.yt.info = async function (url){
    var data = url;
    var isURL = false;
    try {
      isURL = new URL(url);
    }catch(err){

    }
    if (isURL) {
      data = await axios.get(data);
      data = data.data;
    }

    var initial;
    const ytInitialData = plugins.yt.ytInitialData(data);
    if (ytInitialData.contents.twoColumnSearchResultsRenderer) {
      // ???
    } else {
      initial = plugins.yt.ytInitialGet(data);
    }
    var out = plugins.yt.videoInfo(initial.videoDetails);
    out.published = ytInitialData.contents.twoColumnWatchNextResults.results.results.contents[0].videoPrimaryInfoRenderer.dateText.simpleText;
    out.initial = initial;
    out.ytInitialData = ytInitialData;
    out.recommendation = [];
    const recommendation = ytInitialData.contents.twoColumnWatchNextResults.secondaryResults.secondaryResults.results;
    for (let i = 0; i < recommendation.length; i++) {
      const e = recommendation[i].compactVideoRenderer;
      if(e){
        out.recommendation.push(plugins.yt.videoInfo(e));
      }
    }
    out.next = 'https://youtube.com/watch?v=' + ytInitialData.contents.twoColumnWatchNextResults.autoplay.autoplay.sets[0].autoplayVideo.watchEndpoint.videoId;
    out.html = data;
    return out;
  }
  // plugins.yt.getInfo = function (d) {
  //    const ld = f[0].videoPrimaryInfoRenderer.sentimentBar.sentimentBarRenderer.tooltip.split(' / ');
  //    return ld;
  // }
  plugins.yt.searchList = function (d) {
    const c = d.contents;
    const arr = c.twoColumnSearchResultsRenderer.primaryContents.sectionListRenderer.contents[0].itemSectionRenderer.contents;
    var data = [];
    var i = 0;
    plugins.yt.pf.repeat(arr, function (i) {
      if(arr[i].videoRenderer){
        data.push(plugins.yt.videoInfo(arr[i].videoRenderer));
      }
    });
    return data;
  }
  plugins.yt.search = async function(keyword, what){
      if(!keyword || typeof axios == 'undefined'){
        return [];
      }
      const e = await axios.get('https://www.youtube.com/results?search_query=' + encodeURIComponent(keyword))
      const ytInitialData = plugins.yt.ytInitialData(e.data);
      if(what == 'search' || !what){
          if(ytInitialData.contents.twoColumnSearchResultsRenderer){
            return plugins.yt.searchList(ytInitialData);
          }
        }
      if(what == 'recommendation'){
          if(ytInitialData.contents.twoColumnWatchNextResults){
            return plugins.yt.recommendationList(ytInitialData);
        }
    }
    return;
  }

  plugins.yt.js = {};

  function functionInfo(func) {
    let info = [];
    const w = func.split('.')[1];
    info[0] = w.split('(')[0]; // Function name
    const args = w.split('(')[1].split(')')[0].split(',');
    info[1] = args[0];
    info[2] = args[1];
    return info;
  }
  function changeFirstToI(a, b) {
    var c = a[0];
    a[0] = a[b % a.length];
    a[b % a.length] = c;
    return a;
  }
  plugins.yt.js.execute = function (code, jscode) {
    var out = code;
    if(typeof jscode != 'object'){
      jscode = plugins.yt.js.jscode;
    }else{
      plugins.yt.js.jscode = jscode;
    }
    const f = jscode[3].split('{')[1].split('}')[0];
    const commands = f.split(';');

    function executeCommand(cmd, a) {
      const info = functionInfo(cmd);
      if(info[0] == jscode[0]){
        let b = info[2];
        //YT
        var c = a[0];
        a[0] = a[b % a.length];
        a[b % a.length] = c;
        return a;
      }
      if(info[0] == jscode[1]){
        return a.reverse();
      }
      if(info[0] == jscode[2]){
        a.splice(0, info[2]);
        return a;
      }
      if(info[0] == 'join'){
        return a.join('');
      }
      if(info[0] == 'split'){
        return a.split('');
      }
    }
    pf.repeat(commands, function (i) {
      out = executeCommand(commands[i], out)
    });
    return out;
  }
  plugins.yt.decryptURL = function (e) {
    if(typeof plugins.yt.js.jscode == 'object'){
      var b = e.replace('s=', '').split('&sp=sig&');
      b[1] = b[1].replace('url=', '');
      const an = decodeURIComponent(b[1]) + '&sig=' + plugins.yt.js.execute(decodeURIComponent(b[0]));
      return an;
    }else{
      return undefined;
    }
  }
  plugins.yt.ytInitialData = function (html) {
    return plugins.yt.get(html, 'ytInitialData =', 1);
  }
  plugins.yt.ytInitialGet = function (html) {
    return plugins.yt.get(html, 'ytInitialPlayerResponse =', 2);
  }
  plugins.yt.ytBaseJS = function (html) {
    const dom = new jsdom.JSDOM(html);
    const script = dom.window.document.getElementsByTagName('script');
    for (let i = 0; i < script.length; i++) {
      const e = script[i];
      if(e.src){
        if (e.src.indexOf('base.js') > -1) {
          var url = e.src;
          if (url[0] == '/'){
            url = 'https://www.youtube.com' + url; 
          }
          return url;
        }
      }
    }
  }
  plugins.yt.get = function(html, find, key){
    const dom = new jsdom.JSDOM(html);
    const script = dom.window.document.getElementsByTagName('script');
    var i = 0;
    var bad = false;
    function detectyt(i) {
      if(typeof i == 'undefined'){
        bad = true;
        return false;
      }else{
        if (typeof i.innerHTML == 'undefined') {
          bad = true;
          return false;
        } else {
          return i.innerHTML.indexOf(find) == -1;
        }
      }
    }
    while (script.length != i && detectyt(script[i])) {
      i++;
    }
    if(bad){
      return undefined;
    }
    if(!detectyt(script[i])){
      var ytInitial = script[i].innerHTML.split('{');
      ytInitial[0] = '';
      ytInitial = ytInitial.join('{');
      if(key == 1){
        ytInitial = ytInitial.substring(0, ytInitial.length - 1);
      }
      if(key == 2){
        var n = ytInitial.split(';var m');
        n.pop();
        ytInitial = n.join('');
      }
      return JSON.parse(ytInitial);
    }else{
      return undefined;
    }
  }

  plugins.yt.filterCodec = function(array, filter){
    var array2 = [];
    for (let i = 0; i < array.length; i++) {
      const element = array[i];
      const codecName = element.mimeType.split('"')[1].split('.')[0];
      if (codecName == filter){
        array2.push(element);
      }
    }
    return array2;
  }
  plugins.yt.filterType = function(array, type){
    var array2 = [];
    for (let i = 0; i < array.length; i++) {
      const e = array[i];
      if(type){
        if(e.mimeType.startsWith(type)){
          array2.push(e);
        }
      }else{
        array2.push(e);
      }
    }
    return array2;
  }
  plugins.yt.findMedia = function (ytInitial, type, config) {
    const f = ytInitial.streamingData.adaptiveFormats;
    var i = 0;
    var out = [];
    function getUrl(a){
      if (a.signatureCipher) {
        return plugins.yt.decryptURL(a.signatureCipher);
      } else {
        return a.url;
      }
    }
    var array = f;
    array = plugins.yt.filterType(array, type);
    var array2 = [];
    if(type == 'video'){
      if (typeof config.videocodec == 'string'){
        array = plugins.yt.filterCodec(array, config.videocodec, type);
      }
    }
    if (type == 'audio') {
      if (typeof config.audiocodec == 'string') {
        array = plugins.yt.filterCodec(array, config.audiocodec, type);
      }
    }

    var quality = 'highest';
    if(type == 'video'){
      quality = config.qvideo;
    }else{
      quality = config.qaudio;
    }
    
    var value = 0, id = 0;
    for (let i = 0; i < array.length; i++) {
      const e = array[i];
      if(quality == 'highest'){
        if(e.bitrate > value){
          id = i;
          value = e.bitrate;
        }
      }else{
        if(quality == 'lowest'){
          if (e.bitrate < value) {
            id = i;
            value = e.bitrate;
          }
        }else{
          if (quality == e.qualityLabel){
            return getUrl(e);
          }
        }
      }
    }
    if(value != 0){
      return getUrl(array[id]);
    }
    const altquality = config.qvideoalt || 'highest';
    for (let i = 0; i < array.length; i++) {
      const e = array[i];
      if (quality == 'highest') {
        if (e.bitrate > value) {
          id = i;
          value = e.bitrate;
        }
      } else {
        if (e.bitrate < value) {
          id = i;
          value = e.bitrate;
        }
      }
    }
    return getUrl(array[id]);
  }
  plugins.yt.quicksearch = async function (keyword) {
    const url = 'https://suggestqueries-clients6.youtube.com/complete/search?client=youtube&q=' + keyword;
    const e = await axios.get(url);
    const a = JSON.parse(e.data.replace('window.google.ac.h(','').replace('"}])', '"}]'))[1];
    var i = 0;
    var z = [];
    for (var i = 0; i < a.length; i++) {
      z.push(a[i][0]);
    }
    return z;
  }
  plugins.yt.findLine = function(need, text){
    for (let i = 0; i < text.length; i++) {
      const e = text[i];
      if (e.indexOf(need) > -1) {
        return i;
      }
    }
  }
  plugins.yt.play = async function (url, config) {
    const data = await plugins.yt.info(url);
    var ytInitialData = data.ytInitialData;
    var initial = data.initial;
    if (ytInitialData.contents.twoColumnWatchNextResults) {
      // When video/stream detected
      if (initial.streamingData.adaptiveFormats[0].signatureCipher) {
        //When detected encryption key
        const bsjs = plugins.yt.ytBaseJS(data.html); //Get path to base js file on YT
        if (bsjs) {
          const e = await axios.get(bsjs); //Download base.js
          let jscode = e.data.toString(); //Get js
          jscode = jscode.split('\n');

          // 1. Find place name of functions

          var findedIndex = 0;

          findedIndex = plugins.yt.findLine('a.reverse()', jscode);

          if (!findedIndex) {
            console.error('yt.js:Find place name of functions - Error!');
          }

          // 2. Find out names

          const names = [
            jscode[findedIndex].split('{')[2].split(':')[0], // a.reverse()
            jscode[findedIndex + 1].split(':')[0], // a.splice(0,b)
            jscode[findedIndex + 2].split(':')[0] // var c=a[0];a[0]=a[b%a.length];a[b%a.length]=c
          ];

          // 3. Find out function

          var findedIndex = plugins.yt.findLine('a=a.split("");', jscode);

          if (findedIndex) {
            // 4. Finish
            plugins.yt.js.jscode = [
              names[2],
              names[0],
              names[1],
              jscode[findedIndex]
            ];
          } else {
            console.error('yt.js:Find out function - Error!');
          }
        }
      }
    }
    if(!config){
      config = {};
    }
    if(initial){
      const urlaudio = plugins.yt.findMedia(initial, 'audio', config);
      const urlvideo = plugins.yt.findMedia(initial, 'video', config);
      return { urlaudio: urlaudio, urlvideo: urlvideo };
    }
  }
}
