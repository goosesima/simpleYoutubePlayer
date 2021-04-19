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
  while (i != n.length) {
    if(n[i].compactVideoRenderer){
      data.push(ytparser.parseVideoInfoFrom(n[i].compactVideoRenderer));
    }
    i++;
  }
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
  while(i != arr.length){
    if(arr[i].videoRenderer){
      data.push(ytparser.parseVideoInfoFrom(arr[i].videoRenderer));
    }
    i++;
  }
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
ytparser.play = function(){
  axios.get(currectWEBPAGE).then(function(e){
      // window.tmpuu = e.data;
      // ^ I think this can add RAM usage. But Helpful for debug.
      var initial;
      const ytInitialData = ytparser.ytInitialData(e.data);
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
        madeby.innerText = 'Made by: '+ data.author;
        namemedia.innerText = data.title;
        document.title = data.title + ' - SYP Player';
        thumbnail.src = 'https://img.youtube.com/vi/' + data.videoId + '/default.jpg';
        setBackground();
        futureplayer.src = ytparser.bestAudio(ytparser.findAudio(initial));
        futureplayer.play();
      }else{
        pause();
      }

  }).catch(function(e){ console.log(e); });
}
ytparser.decryptURL = function (e) {
  Jy = function(a) {
    var Iy = {
      Ev: function(a, b) {
        var c = a[0];
        a[0] = a[b % a.length];
        a[b % a.length] = c
      },
      rC: function(a) {
        a.reverse()
      },
      EN: function(a, b) {
        a.splice(0, b)
      }
    };
    a = a.split("");
    Iy.EN(a, 3);
    Iy.rC(a, 20);
    Iy.EN(a, 3);
    Iy.rC(a, 59);
    Iy.EN(a, 2);
    Iy.Ev(a, 4);
    Iy.Ev(a, 41);
    Iy.Ev(a, 41);
    Iy.rC(a, 51);
    return a.join("")
  };
  var b = e.replace('s=', '').split('&sp=sig&');
  b[1] = b[1].replace('url=', '');
  const an = decodeURIComponent(b[1]) + '&sig=' + Jy(decodeURIComponent(b[0]));
  return an;
}
ytparser.ytInitialData = function (html) {
  return ytparser.get(html, 'ytInitialData =', 1);
}
ytparser.ytInitialGet = function (html) {
  return ytparser.get(html, 'ytInitialPlayerResponse =', 2);
}
ytparser.get = function(html, find, key){
  const dom = new jsdom.JSDOM(html);
  const script = dom.window.document.getElementsByTagName('script');
  var i = 0;
  var bad = false;
  function detectyt(i) {
    if(typeof i.innerHTML == 'undefined' || typeof i == 'undefined'){
      bad = true;
      return false;
    }else{
      return i.innerHTML.indexOf(find) == -1;
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
    }else{
      var n = ytInitial.split(';var m');
      n.pop();
      ytInitial = n.join('');
      // console.log(ytInitial);
      // var temp = '}}}]};';
      // ytInitial = ytInitial.split(temp)[0] + temp.substr(0, temp.length-1);
    }
    return JSON.parse(ytInitial);
  }else{
    return undefined;
  }
}


ytparser.findAudio = function (ytInitial) {
  const f = ytInitial.streamingData.adaptiveFormats;
  var i = 0;
  var out = [];
  while(i != f.length){
    if(typeof f[i].audioQuality != 'undefined'){
      out.push(f[i]);
    }
    i++;
  }
  return out;
}
ytparser.bestAudio = function (a) {
  var i = 0;
  var bit = 0;
  var out = '';
  while(i != a.length){
    if(a[i].bitrate > bit /*&& a[i].mimeType.indexOf('mp4')*/){
      bit = a[i].bitrate;
      if(a[i].signatureCipher){
        out = ytparser.decryptURL(a[i].signatureCipher);
      }else{
        out = a[i].url;
      }
    }
    i++;
  }
  return out;
}
