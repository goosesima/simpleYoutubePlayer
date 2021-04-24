const jsdom = require("jsdom");

ytparser = {};

ytparser.setInfo = function (d) {
   const f = d.contents.twoColumnWatchNextResults.results.results.contents;
   const ld = f[0].videoPrimaryInfoRenderer.sentimentBar.sentimentBarRenderer.tooltip.split(' / ');
   likes.innerText = ld[0];
   dislikes.innerText = ld[1];
}
ytparser.recommendationList = function (d) {
  //
  const n = d.contents.twoColumnWatchNextResults.secondaryResults.secondaryResults.results;
  // function g(r) {
  //
  // }
  var data = [];
  var i = 0;
  pf.repeat(n, function (i) {
    if(n[i].compactVideoRenderer){
      data.push(ytparser.parseVideoInfoFrom(n[i].compactVideoRenderer));
    }
  });
  return data;
}
ytparser.parseVideoInfoFrom = function (r) {
    var j = {};
    const t = r.thumbnail.thumbnails;
    j.img = t[t.length-1].url;
    var title = r.title;
    if(title.runs){
      title = title.runs[0].text
    }else{
      title = title.simpleText;
    }
    if(title){
      j.title = title;
    }
    var view;
    try{
      view = r.shortViewCountText.simpleText;
    }catch{
      vire = r.viewCountText.run.join('')
    }
    //const view =  ||  /*|| r.viewCount.videoViewCountRenderer.shortViewCount.simpleText*/;
    j.text = '';
    if(view){
      j.text += '👁️: ' + view + '\n';
    }
    try{
      const length = r.lengthText.simpleText;
      if(length){
        j.text += '🕒: ' + length + '\n';
      }
    }catch{

    }
    const owner = r.ownerText;
    try{
      if(owner){
        j.text += '🧑: ' + owner[owner.length - 1].text + '\n'
      }
    }catch{

    }
    try{
      const time = r.publishedTimeText.simpleText;
      if(time){
        j.text += '✨: ' + time;
      }
    }catch{

    }
    const id = r.videoId;
    if(id){
      j.url = 'https://youtube.com/watch?v=' + id;
  }
  return j;
}
ytparser.searchList = function (d) {
  const c = d.contents;
  const arr = c.twoColumnSearchResultsRenderer.primaryContents.sectionListRenderer.contents[0].itemSectionRenderer.contents;
  var data = [];
  var i = 0;
  pf.repeat(arr, function (i) {
    if(arr[i].videoRenderer){
      data.push(ytparser.parseVideoInfoFrom(arr[i].videoRenderer));
    }
  });
  return data;
}
ytparser.getSearch = async function(keyword){
  let promise = new Promise((resolve, reject) => {
    if(typeof axios == 'undefined'){
      resolve('undefined');
    }else{
      axios.get('https://www.youtube.com/results?search_query=' + encodeURIComponent(keyword)).then(function (e) {
        const ytInitialData = ytparser.ytInitialData(e.data);
        if(ytInitialData.contents.twoColumnSearchResultsRenderer){
          resolve(JSON.stringify(ytparser.searchList(ytInitialData)));
        }else{
          resolve('undefined');
        }
      }).catch(function () {
        resolve('undefined');
      });
    }
  });
  return await promise;
}
ytparser.getRecommendation = async function (url) {
  let promise = new Promise((resolve, reject) => {
    if(typeof axios == 'undefined'){
      resolve('undefined');
    }else{
      axios.get(url).then(function (e) {
        const ytInitialData = ytparser.ytInitialData(e.data);
        if(ytInitialData.contents.twoColumnWatchNextResults){
          resolve(JSON.stringify(ytparser.recommendationList(ytInitialData)));
        }else{
          resolve('undefined')
        }
      }).catch(function (e) {
        resolve('undefined');
      });
    }
  });
  return await promise;
}
ytparser.yourAudio = function (e) {
  var itagS = sypStorage.get('audioItagYT');
  if(typeof itagS != 'undefined'){
    var need = [];
    pf.repeat(e, function (i) {
      if(e[i].itag){
        if(e[i].itag == Number(itagS)){
          need.push(e[i]);
        }
      }
    });
    if(need.length == 0){
      return ytparser.bestAudio(e);
    }else{
      return ytparser.bestAudio(need);
    }
  }else{
    return ytparser.bestAudio(e);
  }
}
ytparser.play = function(){
  function playmedia(initial) {
    futureplayer.src = ytparser.yourAudio(ytparser.findAudio(initial));
    futureplayer.play();
  }
  axios.get(currectWEBPAGE).then(function(e){
      // window.tmpuu = e.data;
      // ^ I think this can add RAM usage. But Helpful for debug.
      var initial;
      const ytInitialData = ytparser.ytInitialData(e.data);
      if(ytInitialData.contents.twoColumnWatchNextResults){
        const bsjs = ytparser.ytBaseJS(e.data);
        if(bsjs != undefined){
          const urlbasejs = new URL(currectWEBPAGE).origin + bsjs;
          if(ytparser.sandbox.e == 'function'){
            playmedia(initial);
          }else{
            axios.get(urlbasejs).then(function (e) {
              const n = ytparser.js.getF(e.data);
              ytparser.js.execute(n);
              playmedia(initial);
            });
          }
        }
      }
      if(ytInitialData.contents.twoColumnSearchResultsRenderer){
        const data = ytparser.searchList(ytInitialData);
        clearList();
        advancedList(list, data);
      }else{
        if(ytInitialData.contents.twoColumnWatchNextResults){
          const data = ytparser.recommendationList(ytInitialData);
          clearList();
          advancedList(list, data);
          ytparser.setInfo(ytInitialData);
          window.nextYT = 'https://youtube.com/watch?v=' + ytInitialData.contents.twoColumnWatchNextResults.autoplay.autoplay.sets[0].autoplayVideo.watchEndpoint.videoId;
        }
        initial = ytparser.ytInitialGet(e.data)
      }
      // console.log(initial);
      var data = undefined;
      if(initial){
        data = initial.videoDetails;
      }
      if(data != undefined){
        //data.viewCount
        madeby.innerText = 'Made by: ' + data.author;
        namemedia.innerText = data.title;
        document.title = data.title + ' - SYP Player';
        thumbnail.src = 'https://img.youtube.com/vi/' + data.videoId + '/default.jpg';
        setBackground();

      }else{
        pause();
      }

  }).catch(function(e){ console.log(e); });
}
ytparser.js = {};
ytparser.sandbox = {};
ytparser.js.makeSecure = function (e) {
  e = e.substring(0, 150);
  e = e.replaceAll('script', '');
  e = e.replaceAll('https://', '');
  e = e.replaceAll('http://', '');
  e = e.replaceAll('atob', '');
  e = e.replaceAll('btoa', '');
  e = e.replaceAll('://', '')
  e = e.replaceAll('sypStorage', '');
  e = e.replaceAll('[', '');
  e = e.replaceAll(']', '');
  e = e.replaceAll('require', '');
  e = e.replaceAll('fs', '');
  return e;
}
ytparser.putQualityAudio = function (e) {
  const codec = e.mimeType.replace('""', '').split('=')[1];
  const arrQ = ['Best', 'Compatibility', 'Normal', 'Worst'];
  var data = {};
  var q = '';
  const itag = e.itag;
  const itagS = sypStorage.get('audioItagYT');
  if(typeof itagS != 'undefined'){
    if(itag == Number(itagS)){
      data.selected = true;
    }
  }
  if(itag == 251){
    q += arrQ[0];
  }
  if(itag == 140){
    q += arrQ[1];
  }
  if(itag == 250){
    q += arrQ[2];
  }
  if(itag == 249){
    q += arrQ[3];
  }
  var v = '';
  v += 'Codec: ' + codec + '\n';
  v += 'Bitrate: ' + Math.floor(e.bitrate/1000/128*60) + 'Mgbpm';
  data.title = q;
  data.text = v;
  data.click = function () {
    sypStorage.set('audioItagYT', String(itag));
    sypStorage.set('positionPlay', vCurrectTime - 1);
    setcurrectWEBPAGE(currectWEBPAGE);
  }
  advancedList(qualityAudio, [data]);
}
ytparser.js.execute = function (answ) {
  var f = ytparser.js.makeSecure(answ[3]);
  function makeSandbox(e) {
    e = e.replaceAll(answ[4], 'ytparser.sandbox')
    return e;
  }
  ytparser.sandbox[answ[0]] = function (a, b) {
    var c=a[0];a[0]=a[b%a.length];a[b%a.length]=c;
  }
  ytparser.sandbox[answ[1]] = function (a) {
    a.reverse();
  }
  ytparser.sandbox[answ[2]] = function (a, b) {
    a.splice(0,b)
  }
  f = makeSandbox(f);
  namef = f.substring(0, 2);
  f = f.replaceAll(namef, 'ytparser.sandbox.e')
  try{
    Function(f)();
  }catch(e){
    console.log(e);
  }
  // ^ This is dangerous function, because someone can send fake base.js and then hack SYP Player.
  // NEED TO FIX
}
ytparser.js.getF = function (e) {
  var sP = ['var c=a[0]', 'a.reverse()', 'a.splice(0,b)', 'a=a.split("");'];
  var answ  = ['', '', '', '', ''];
  var n = String(e).split('\n');
  var i = 0;
  pf.repeat(n, function (i) {
    if(n[i].indexOf(sP[0]) != -1){
        answ[0] = n[i];
    }
    if(n[i].indexOf(sP[1]) != -1){
        answ[1] = n[i];
    }
    if(n[i].indexOf(sP[2]) != -1){
        answ[2] = n[i];
    }
    if(n[i].indexOf(sP[3]) != -1){
        answ[3] = n[i];
    }
  });
  answ[4] = answ[0].split('var ')[1].substring(0, 2);
  answ[0] = answ[0].split('var ')[1].split('{')[1].split(':')[0];
  answ[1] = answ[1].split(':')[0];
  answ[2] = answ[2].split(':')[0];
  return answ;
}
ytparser.decryptURL = function (e) {
  if(typeof ytparser.sandbox.e == 'function'){
    var b = e.replace('s=', '').split('&sp=sig&');
    b[1] = b[1].replace('url=', '');
    const an = decodeURIComponent(b[1]) + '&sig=' + ytparser.sandbox.e(decodeURIComponent(b[0]));
    return an;
  }else{
    return undefined;
  }
}
ytparser.ytInitialData = function (html) {
  return ytparser.get(html, 'ytInitialData =', 1);
}
ytparser.ytInitialGet = function (html) {
  return ytparser.get(html, 'ytInitialPlayerResponse =', 2);
}
ytparser.ytBaseJS = function (html) {
  return ytparser.get(html, 'base.js', 3);
}
ytparser.get = function(html, find, key){
  const dom = new jsdom.JSDOM(html);
  const script = dom.window.document.getElementsByTagName('script');
  var i = 0;
  var bad = false;
  function detectyt(i) {
    if(typeof i == 'undefined'){
      bad = true;
      return false;
    }else{
      if(key == 3){
        if(typeof i.src == 'undefined'){
          bad = true;
          return false;
        }else{
          return i.src.indexOf(find) == -1;
        }
      }else{
        if(typeof i.innerHTML == 'undefined'){
          bad = true;
          return false;
        }else{
          return i.innerHTML.indexOf(find) == -1;
        }
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
    if(key != 3){
      return JSON.parse(ytInitial);
    }else{
      return script[i].src;
    }
  }else{
    return undefined;
  }
}


ytparser.findAudio = function (ytInitial) {
  clearList(qualityAudio);
  const f = ytInitial.streamingData.adaptiveFormats;
  var i = 0;
  var out = [];
  pf.repeat(f, function(i){
    if(typeof f[i].audioQuality != 'undefined'){
      ytparser.putQualityAudio(f[i])
      out.push(f[i]);
    }
  });
  return out;
}
ytparser.bestAudio = function (a) {
  var i = 0;
  var bit = 0;
  var out = '';
  pf.repeat(a, function (i) {
    if(a[i].bitrate > bit /*&& a[i].mimeType.indexOf('mp4')*/){
      bit = a[i].bitrate;
      if(a[i].signatureCipher){
        out = ytparser.decryptURL(a[i].signatureCipher);
      }else{
        out = a[i].url;
      }
    }
  });
  return out;
}
