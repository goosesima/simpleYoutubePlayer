const jsdom = require("jsdom");
const axios = require("axios");
exports.sypStorage = require("player/lib/sypstorage.js");
exports.pf = require("player/lib/pf.js");

exports.getInfo = function (d) {
   const f = d.contents.twoColumnWatchNextResults.results.results.contents;
   const ld = f[0].videoPrimaryInfoRenderer.sentimentBar.sentimentBarRenderer.tooltip.split(' / ');
   return ld;
}
exports.recommendationList = function (d) {
  //
  const n = d.contents.twoColumnWatchNextResults.secondaryResults.secondaryResults.results;
  // function g(r) {
  //
  // }
  var data = [];
  var i = 0;
  exports.pf.repeat(n, function (i) {
    if(n[i].compactVideoRenderer){
      data.push(exports.parseVideoInfoFrom(n[i].compactVideoRenderer));
    }
  });
  return data;
}
exports.parseVideoInfoFrom = function (r) {
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
    }catch (e){
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
    }catch (e){

    }
    const owner = r.ownerText;
    try{
      if(owner){
        j.text += '🧑: ' + owner[owner.length - 1].text + '\n'
      }
    }catch (e){

    }
    try{
      const time = r.publishedTimeText.simpleText;
      if(time){
        j.text += '✨: ' + time;
      }
    }catch (e){

    }
    const id = r.videoId;
    if(id){
      j.url = 'https://youtube.com/watch?v=' + id;
  }
  return j;
}
exports.searchList = function (d) {
  const c = d.contents;
  const arr = c.twoColumnSearchResultsRenderer.primaryContents.sectionListRenderer.contents[0].itemSectionRenderer.contents;
  var data = [];
  var i = 0;
  exports.pf.repeat(arr, function (i) {
    if(arr[i].videoRenderer){
      data.push(exports.parseVideoInfoFrom(arr[i].videoRenderer));
    }
  });
  return data;
}
// if(exports.pf.async){
//   try{
//     exports.getYT = async exports.getYTAsync;
//   }catch(e) {
//     console.log('YAY');
//   }
// }
exports.getYT = async function(keyword, what){
    if(!keyword){
      return;
    }
    let promise = new Promise((resolve, reject) => {
      if(typeof axios == 'undefined'){
        resolve('undefined');
      }else{
        axios.get('https://www.youtube.com/results?search_query=' + encodeURIComponent(keyword)).then(function (e) {
          const ytInitialData = exports.ytInitialData(e.data);
          if(what == 'search'){
            if(ytInitialData.contents.twoColumnSearchResultsRenderer){
              resolve(JSON.stringify(exports.searchList(ytInitialData)));
            }else{
              resolve('undefined');
            }
          }
          if(what == 'recommendation'){
            if(ytInitialData.contents.twoColumnWatchNextResults){
              resolve(JSON.stringify(exports.recommendationList(ytInitialData)));
            }else{
              resolve('undefined')
            }
          }
        }).catch(function () {
          resolve('undefined');
        });
      }
    });
    return await promise;
  }
exports.yourAudio = function (e) {
  return exports.yourMedia(e, 'audio');
}
exports.yourVideo = function (e) {
  return exports.yourMedia(e, 'video');
}
exports.yourMedia = function (e, type) {
  const itagS = exports.sypStorage.get(type + 'ItagYT');
  const codecS = exports.sypStorage.get(type + 'CodecYT');
  if(typeof itagS != 'undefined'){
    var need = [];
    var need2 = [];
    exports.pf.repeat(e, function (i) {
      if(type == 'video'){
        const l = String(e.qualityLabel).replace('p', '');
        if(l == itagS.split('p')[0]){
          need.push(e[i]);
        }
      }else{
        if(e[i].itag){
          if(e[i].itag == Number(itagS)){
            need.push(e[i]);
          }
        }
      }
    });
    if(type == 'video'){
      exports.pf.repeat(need, function (i) {
        if(String(need[i].fps) == itagS.split('p')[1]){
          need2.push(need[i]);
        }
      });
      if(need2.length > 0){
        need = need2;
      }
      need2 = [];
      exports.pf.repeat(need, function (i) {
        if(String(need[i].substring(0, 4)) == codecS){
          need2.push(need[i]);
        }
      });
      if(need2.length > 0){
        need = need2;
      }
    }
    if(need.length == 0){
      return exports.best(e);
    }else{
      return exports.best(need);
    }
  }else{
    return exports.best(e);
  }
}

exports.js = {};

exports.putQualityAudio = function (e) {
  exports.putQuality(e, 'audio')
}
exports.putQualityVideo = function (e) {
  exports.putQuality(e, 'video');
}
exports.putQuality = function (e, type) {
  const codec = e.mimeType.replace('""', '').split('=')[1];
  const arrQ = ['Best', 'Proprietary codec', 'Normal', 'Worst'];
  var data = {};
  var q = '';
  const itag = e.itag;
  const itagS = exports.sypStorage.get(type + 'ItagYT');
  const codecS = exports.sypStorage.get(type + 'CodecYT');
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
  var qualitySimplified;
  if(type == 'audio'){
    qualitySimplified = e.itag;
  }else{
    qualitySimplified = e.qualityLabel + e.fps;
  }
  if(q == ''){
    if(type == 'video'){
      q = qualitySimplified + 'FPS';
    }
  }
  if(typeof itagS != 'undefined'){
    if(type == 'video'){
      if(String(itagS) == qualitySimplified && String(codecS) == codec.substring(0, 4)){
        data.selected = true;
      }
    }else{
      if(itag == Number(itagS)){
        data.selected = true;
      }
    }
  }
  var v = 'Codec: ' + codec + '\n';
  v += 'Bitrate: ' + Math.floor(e.bitrate/1000/128*60) + 'Mgbpm';
  data.title = q;
  data.text = v;
  data.click = function () {
    global.sypStorage.set(type + 'ItagYT', qualitySimplified);
    global.sypStorage.set(type + 'CodecYT', codec.substring(0, 4));
    try{
      global.sypStorage.set('settimeonload', global.vCurrectTime - 1);
    }catch(e){
      console.log(e);
    }

    global.setcurrectWEBPAGE(global.currectWEBPAGE);
  }
  if(type == 'audio'){
    global.advancedList(qualityAudio, [data]);
  }else{
    global.advancedList(qualityVideo, [data]);
  }
}
function functionInfo(func) {
  let info = [];
  const w = func.split('.')[1];
  info[0] = w.split('(')[0]; // Function name
  const args = w.split('(')[1].split(')')[0].split(',');
  info[1] = args[0];
  info[2] = args[1];
  return info;
}
exports.js.execute = function (code, jscode) {
  var out = code;
  if(typeof jscode != 'object'){
    jscode = exports.js.jscode;
  }else{
    exports.js.jscode = jscode;
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
  exports.pf.repeat(commands, function (i) {
    out = executeCommand(commands[i], out)
  });
  return out;
}
exports.js.getF = function (jscode) {
  const n = jscode.split('\n');
  const sP = ['var c=a[0]', 'a.reverse()', 'a.splice(0,b)', 'a=a.split("");'];
  var answ  = ['', '', '', ''];
  exports.pf.repeat(sP, function (y) {
    exports.pf.repeat(n, function (i) {
      if(n[i].indexOf(sP[y]) != -1){
          answ[i] = n[y];
      }
    });
  });
  exports.pf.repeat(answ, function (i) {
    if(i != 3){
      answ[i] = answ[i].split(':')[0];
      if(answ[i].indexOf('=') > -1){
        if(answ[i].indexOf('{') > -1){
          answ[i] = answ[i].split('{')[1];
        }else{
          answ[i] = answ[i].split('=')[0];
        }
      }
    }
  });
  window.answ = answ;
  return answ;
}
exports.decryptURL = function (e) {
  if(typeof exports.js.jscode == 'object'){
    var b = e.replace('s=', '').split('&sp=sig&');
    b[1] = b[1].replace('url=', '');
    const an = decodeURIComponent(b[1]) + '&sig=' + exports.js.execute(decodeURIComponent(b[0]));
    return an;
  }else{
    return undefined;
  }
}
exports.ytInitialData = function (html) {
  return exports.get(html, 'ytInitialData =', 1);
}
exports.ytInitialGet = function (html) {
  return exports.get(html, 'ytInitialPlayerResponse =', 2);
}
exports.ytBaseJS = function (html) {
  return exports.get(html, 'base.js', 3);
}
exports.get = function(html, find, key){
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

exports.findAudio = function (ytInitial) {
  return exports.findMedia(ytInitial, 'audio');
}
exports.findVideo = function (ytInitial) {
  return exports.findMedia(ytInitial, 'video');
}
exports.findMedia = function (ytInitial, type) {
  if(type == 'audio'){
    global.clearList(qualityAudio);
  }else{
    global.clearList(qualityVideo);
  }
  const f = ytInitial.streamingData.adaptiveFormats;
  var i = 0;
  var out = [];
  exports.pf.repeat(f, function(i){
    if(type == 'audio'){
      if(typeof f[i].audioQuality != 'undefined'){
        exports.putQualityAudio(f[i])
        out.push(f[i]);
      }
    }else{
      if(typeof f[i].audioQuality == 'undefined'){
        exports.putQualityVideo(f[i])
        out.push(f[i]);
      }
    }
  });
  return out;
}
exports.best = function (a) {
  var i = 0;
  var bit = 0;
  var out = '';
  exports.pf.repeat(a, function (i) {
    if(a[i].bitrate > bit /*&& a[i].mimeType.indexOf('mp4')*/){
      bit = a[i].bitrate;
      if(a[i].signatureCipher){
        out = exports.decryptURL(a[i].signatureCipher);
      }else{
        out = a[i].url;
      }
    }
  });
  return out;
}
exports.playmediaFromYT = function (initial) {
  const urlaudio = exports.yourAudio(exports.findAudio(initial));
  global.urlaudio = urlaudio
  global.futureplayer.src = urlaudio;
  global.futurevideo.src = exports.yourVideo(exports.findVideo(initial));
  global.futureplayer.play();
  global.futureplayer.oncanplay = function () {
    setTimeFromStorage(true);
  }
}
exports.playmediaYT =  function(){
   axios.get(global.currectWEBPAGE).then(function(e){
       window.tmpuu = e.data;
       // ^ I think this can add RAM usage. But Helpful for debug.
       var initial;
       const ytInitialData = exports.ytInitialData(e.data);
       if(ytInitialData.contents.twoColumnSearchResultsRenderer){
         const data = exports.searchList(ytInitialData);
         global.clearList();
         global.advancedList(list, data);
       }else{
         if(ytInitialData.contents.twoColumnWatchNextResults){
           const data = exports.recommendationList(ytInitialData);
           global.clearList();
           global.advancedList(list, data);
           const datainfo = exports.getInfo(ytInitialData);
           likes.innerText = datainfo[0];
           dislikes.innerText = datainfo[1];
           global.nextYT = 'https://youtube.com/watch?v=' + ytInitialData.contents.twoColumnWatchNextResults.autoplay.autoplay.sets[0].autoplayVideo.watchEndpoint.videoId;
         }
         initial = exports.ytInitialGet(e.data)
       }
       window.tmpuuu = initial;
       if(ytInitialData.contents.twoColumnWatchNextResults){
         // When video/stream detected
         if(initial.streamingData.adaptiveFormats[0].signatureCipher){
           //When detected encryption key
           const bsjs = exports.ytBaseJS(e.data); //Get path to base js file on YT
           if(bsjs){
             const urlbasejs = new URL(global.currectWEBPAGE).origin + bsjs; //Get full path
             if(/*exports.js.jscode == 'object'*/ false){
               exports.playmediaFromYT(initial);
             }else{
               axios.get(urlbasejs).then(function (e) { //Download base.js
                 let jscode = e.data.toString(); //Get js
                 jscode = jscode.split('\n');
                 const findSettings = ['a=a.split("");', 'function(a,b){a.splice(', 'a.reverse()', 'c=a[0];a[0]'];
                 var finded = [];
                 for (var i = 0; i < jscode.length; i++) {
                   const a = jscode[i];
                   for (var z = 0; z < findSettings.length; z++) {
                     const b = findSettings[z];
                     if(a.indexOf(b) > -1){
                       finded.push(a);
                     }
                   }
                 }
                 finded[1] = finded[1].split('var ')[1].replace('},', '}');
                 jscode = finded.join('\n');
                 window.jscoder = jscode;
                 delete finded;
                 // jscode = jscode.substring(jscode.indexOf('a=a.split("");') - 15, jscode.length);
                 // jscode = jscode.substring(0, jscode.indexOf('a.splice(0,b)') + 15);
                 // const tmp = '{return this.audioTracks};';
                 // const tmp2 = 'return a.join("")};';
                 // let freplace = jscode.substring(jscode.indexOf(tmp2) + 1 + tmp2.length, jscode.lastIndexOf(tmp) + tmp.length);
                 // jscode = jscode.replace(freplace, '');
                 exports.js.jscode = exports.js.getF(jscode);
                 window.nnn = jscode;
                 exports.playmediaFromYT(initial);
               });
             }
           }
         }else{
           exports.playmediaFromYT(initial);
         }
       }
       var data = undefined;
       if(initial){
         data = initial.videoDetails;
       }
       if(data != undefined){
         //data.viewCount
         global.madeby.innerText = 'Made by: ' + data.author;
         global.namemedia.innerText = data.title;
         global.thumbnail.src = 'https://img.youtube.com/vi/' + data.videoId + '/default.jpg';
         global.setBackground();

       }else{
         global.pause();
       }

   }).catch(function(e){ console.log(e); });
}
