var fs = require('fs');
const http = require('http');
const https = require('https');
const os = require('os');
const murl = require('url');
const util = require('util');
const networkInterfaces = os.networkInterfaces();
const path = require('path');
var sypStorage = require('player/lib/sypstorage.js');
var jsmediatags = require("jsmediatags");

var clientWantConnect = [];

var workingpath;
function getIP() {
  if(isBrowser){
    FULLADDRESS = 'https://127.0.0.1'
    return `${FULLADDRESS}`;
  }else{
    var keys = Object.keys(networkInterfaces);
    var i = 0;
    var addr = [];
    pf.repeat(keys, function(i){
      var t = networkInterfaces[keys[i]];
      if(t.length == 2){
          t = t[1];
      }else{
          t = t[0];
      }
      if((t.address.startsWith('192.') && !t.address.endsWith('.1') && !t.internal) /*|| (t.address.startsWith('127.') && t.internal)*/){
           addr.push(t.address);
      }
    })
    return addr[0];
  }
}
const learnSyp = '<p>Should you check source code to discover how SYP work? You makes big errors in request</p><br><a href="https://github.com/SimaKyr/simpleYoutubePlayer">Discover source code</a>';
var options = {
  key: fs.readFileSync(path.join('player', 'userdata', 'server-key.pem')),
  cert: fs.readFileSync(path.join('player', 'userdata', 'server-cert.pem')),
  requestCert: false,
  rejectUnauthorized: false
};

var portServer = 49902;
sypStorageonload = function () {
  if(typeof sypStorage.get('sypport') != 'undefined'){
    portServer = Number(sypStorage.get('sypport'));
  }
}
if(typeof sypStorage == 'object'){
  sypStorageonload();
  if(typeof sypStorage.get('autoplayenabled') != 'undefined'){
    autoplayenabled.checked = Boolean(sypStorage.get('autoplayenabled'));
  }
}
var serverAddress = 'https://' + getIP() + ':' + portServer;
nwjsffmpeg.ask();

urlToJSON = function(e){
  return JSON.parse('{"' + decodeURI(e).replace(/"/g, '\\"').replace(/&/g, '","').replace(/=/g,'":"').replace(/\s/g,'') + '"}');
}

function httpGetAsync(theUrl, callback)
{
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.onreadystatechange = function() {
        if (xmlHttp.readyState == 4 && xmlHttp.status == 200)
            callback(xmlHttp.responseText);
    }
    xmlHttp.open("GET", theUrl, true); // true for asynchronous
    xmlHttp.send(null);
}

function advancedList(list, data) {
  if(list){
    var i = 0;
    pf.repeat(data, function (i) {
      var div = document.createElement('div');
      div.classList.add('div-adl');
      if(data[i].img){
        var img = document.createElement('img');
        img.classList.add('img-adl');
        img.src = data[i].img;
        div.appendChild(img);
      }
      var div2 = document.createElement('div');
      if(data[i].title){
        var title = document.createElement('b');
        title.innerText = data[i].title
        title.classList.add('title-adl');
        div.appendChild(title);
      }
      if(data[i].text){
        var z = 0;
        const n = data[i].text.split('\n');
        pf.repeat(n, function (z) {
          var text = document.createElement('p');
          text.innerText = n[z];
          text.classList.add('text-adl');
          div2.appendChild(text);
        });
      }
      if(data[i].selected){
        div.classList.add('selected-adl');
      }
      if(data[i].click){
        const n = data[i].click;
        div.onclick = n;
        vibrationPhone();
      }else{
        if(data[i].url){
          const n = data[i].url;
          div.onclick = function () {
            setcurrectWEBPAGE(n);
            if(isBrowser){
              const u = new URL(n);
              if(typeof u.searchParams.get('v') != 'undefined'){
                performActionRemote('', u.searchParams.get('v'));
              }
            }
            vibrationPhone();
          };
        }
      }
      div.appendChild(div2);
      list.appendChild(div);
    });
    window.onresize();
    list.scroll(0, 0);
  }
}
const nve = "document.getElementsByClassName('video-stream html5-main-video')";

function simpleReadFile(filePath, callback){
    const p = util.promisify(fs.readFile)
    const options = {encoding:'utf-8', flag:'r'};
    const a = function (e) {
      const out = e.replaceAll('${FULLADDRESS}', serverAddress);
      callback(out);
    }
    p(filePath, options).then(a);
}

installffmpeg.onclick = function(){
  alert('Run (you need nodejs installed)"node player/lib/nwjs-ffmpeg.js"')
  vibrationPhone();
}

createFileIfNotExist = function(fn){try{if(!fs.existsSync(fn)){simpleWriteFile(fn,'')}}catch(e){}}
simpleWriteFile = function(name,data){fs.writeFile(name, data,function(){});}

var fileNotContains = false;

simpleCheckFile = function(name,f){
    window.uwu2 = f;
    try {
    if (fs.existsSync(name)) {
        f(true);
    }
    } catch(err) {
        f(false);
    }
}

async function generateInfoJSON(up) {
  let promise = new Promise((resolve, reject) => {
    var c = {};
    ytparser.getRecommendation(up).then(function (e) {
      if(e != 'undefined'){
        c['r'] = e;
      }
      c['t'] = document.title.replace(' - SYP Player','');
      c['d'] = dislikes.innerText;
      c['l'] = likes.innerText;
      c['a'] = madeby.innerText;
      c = JSON.stringify(c);
      resolve(c);
    })
  }).catch(function () {
      resolve('undefined');
  });
  return await promise;
}
function importInfoJSON(c) {
  try{
    c = JSON.parse(c);
  }catch{
    console.log(c);
  }
  if(c['r']){
    clearList();
    advancedList(list, JSON.parse(c['r']));
  }
  document.title = c['t'] + ' - SYP Player';
  namemedia.innerText = c['t'];
  dislikes.innerText = c['d'];
  likes.innerText = c['l'];
  madeby.innerText = c['a'];
}
function sendFile(res, loc) {
  var type = 'text/plain'
  if(loc.endsWith('.html')){
    type = 'text/html';
  }
  const image = loc.endsWith('.png') || loc.endsWith('.svg');
  if(image){
    if(loc.endsWith('.png')){
      type = 'image/png';
    }else{
      type = 'image/svg+xml';
    }
    var s = fs.createReadStream(loc);
    s.on('open', function() {
        res.setHeader('Content-Type', type);
        s.pipe(res);
    });
    s.on('error', function() {
        res.setHeader('Content-Type', 'text/plain');
        res.statusCode = 404;
        res.end('Not found');
    });
  }
  if(loc.endsWith('.js')){
    type = 'text/javascript';
  }
  if(loc.endsWith('.css')){
    type = 'text/css';
  }
  if(!image){
    simpleReadFile(loc, function (e) {
      res.setHeader("Content-Type", type + "; charset=utf-8;");
      res.write(e);
      res.end();
    });
  }
}
function isDir(path) {
    try {
        var stat = fs.lstatSync(path);
        return stat.isDirectory();
    } catch (e) {
        // lstatSync throws an error if path doesn't exist
        return false;
    }
}
var fileh = {'favicon.ico': 'player/img/sypplayer.png', 'sypscript': 'player/userscript.js', '': 'player/userscript.html', 'userscript.user.js': 'player/sypplayer.user.js'};
function addToFileHDir(d) {
  fs.readdir('player/' + d, (err, files) => {
    files.forEach(file => {
      if(!isDir('player/' + d + '/' + file)){
          var locc = d + '/' + file;
          if(locc[0] == '/'){
            locc = locc.substring(1);
          }
            fileh[locc] = 'player/' + locc;
      }
    });
  });
}
if(!isBrowser){
  addToFileHDir('');
  addToFileHDir('lang');
  addToFileHDir('img');
  addToFileHDir('lib');
}

const requestListener = function(req, res) {

    if(typeof fileh[req.url.substring(1)] != 'undefined'){
      sendFile(res, fileh[req.url.substring(1)]);
    }
    if (murl.parse(serverAddress + req.url).pathname == '/rc') {
        const url2 = new URLSearchParams(murl.parse(serverAddress + req.url).search);
        var ipclient = String(req.connection.remoteAddress);
        if (ipclient == '::1') {
            ipclient = 'localhost';
        }
        if (url2.get('d')) {
            var uuidClient = String(url2.get('d'));
            res.setHeader('Content-Type', 'text/plain; charset=utf-8');
            if (String(sypStorage.get('uuidWhiteList')).indexOf(uuidClient) != -1) {
                if (url2.get('o')) {
                    setcurrectWEBPAGE('https://www.youtube.com/watch?v=' + url2.get('o'));
                } else {
                    var command = url2.get('c');
                    res.setHeader('Access-Control-Allow-Origin', '*');
                    res.setHeader('Access-Control-Allow-Headers', 'origin, content-type, accept');
                    switch (command) {
                      case 'nextTrack':
                        nextTrack();
                        ok(res);
                        break;
                      case 'replayTrack':
                        replayTrack();
                        ok(res);
                        break;
                      case 'pause':
                        pause();
                        ok(res);
                        break;
                      case 'play':
                        play();
                        ok(res);
                        break;
                      case 'timeset':
                        setPlayPos2(Number(url2.get('i')));
                        ok(res)
                        break
                      case 'thumbnail':
                        res.write(thumbnail.src);
                        res.end();
                        break;
                      case 'time':
                        res.write(String(vCurrectTime + '|' + vDuration));
                        res.end();
                        break;
                      case 'playing':
                        res.write(String(Number(window.playing)));
                        res.end();
                        break;
                      case 'volume':
                        res.write(String(Math.floor(percentesVolume)));
                        res.end();
                        break;
                      case 'info':
                        var up = currectWEBPAGE;
                        if(url2.get('i')){
                          up = 'https://youtube.com/watch?v=' + url2.get('i');
                        }
                        generateInfoJSON(up).then(function (e) {
                          res.write(e);
                          res.end();
                        });
                        break;
                      case 'sk':
                        ytparser.getSearch(String(url2.get('i'))).then(function (e) {
                          res.write(e);
                          res.end();
                        });
                        break;
                      case 'setvolume':
                        const a = Number(url2.get('i'));
                        if(a == NaN){
                          a = 0;
                        }
                        setVolumeReal(a);
                        ok(res);
                        break;
                      case 'keyword':
                        getKeyword(url2.get('k'), function(e) {
                            res.write(e);
                            res.end();
                        });
                        break;
                    }
                }
            } else {
              res.setHeader("Content-Type", "text/plain; charset=utf-8;");
                if (String(sypStorage.get('IPBannedList')).indexOf(ipclient) == -1 && !clientWantConnect.includes(uuidClient) && allowsypremote.checked) {
                    // res.setHeader("UserId", 12);
                    res.write('UUID');
                    res.end();
                    clientWantConnect.push(uuidClient);
                    confirm('Someone(IP:' + ipclient + ') trying get control to SYP Player. Allow?', function(e) {
                        if (e) {
                            sypStorage.set2('uuidWhiteList', Number(sypStorage.getLength2('uuidWhiteList')), uuidClient);
                        } else {
                            confirm('Would you ban him (IP:' + ipclient + ')?', function() {
                                if (e) {
                                    sypStorage.set2('IPBannedList', Number(sypStorage.getLength2('IPBannedList')), ipclient);
                                }
                            });
                        }
                        clientWantConnect = clientWantConnect.filter(e => e !== uuidClient)
                    });
                } else {
                  if(clientWantConnect.includes(uuidClient)){
                    res.write('UUID');
                  }else{
                      if(!allowsypremote.checked){
                        res.write('NONEW');
                      }else{
                        res.write('BANNED');
                      }
                  }
                  res.end();
                }
            }
        } else {
            res.setHeader("UserId", 12);
            res.setHeader("Content-Type", "text/html; charset=utf-8;");
            res.write();
            res.end();
        }
    }
}
function ok(res) {
  res.write('OK');
  res.end();
}
// const server = http.createServer(requestListener);
const server = https.createServer(options, function (req, res) {
  try{
    requestListener(req, res);
  }catch(e){
    console.log(e);
    res.setHeader("Content-Type", "text/plain; charset=utf-8;");
    res.write('ERROR');
    res.end();
  }
})
server.listen(portServer);
if(!isBrowser){
  console.log('SYP Player server started!');
}

window.playerOnline = false;

documentgetElementById = function(e){
  window[e] = document.getElementById(e);
}
includeIdE = function(){
  var e = document.body.getElementsByTagName("*");
  var i = 0;
  pf.repeat(e.length, function (i) {
    if(e[i].id!=""){
      documentgetElementById(e[i].id);
    }
  });
}

includeIdE();

var win = nw.Window.get();

// win.showDevTools();
win.setMinimumSize(400,500);

win.resizeTo(400,220);

function openInBrowser(e) {
  if(isBrowser){
    window.open(e, '_blank').focus();
  }else{
    require('nw.gui').Shell.openExternal(e);
  }
}
discordbutton.onclick = function () {
  openInBrowser('https://discord.gg/asp3UzzUHR');
  vibrationPhone();
}
nwjsbutton.onclick = function () {
  openInBrowser('https://nwjs.io/');
  vibrationPhone();
}
playBrowser.onclick = function(){
  openInBrowser(currectWEBPAGE);
  vibrationPhone();
}

installSyp.onclick = function(){
  openInBrowser(serverAddress);
  vibrationPhone();
}

checkupdate.onclick = function(){
  if(typeof checkUpdate != 'undefined'){
    window.checkUpdate();
  }else{
    alert('Something wrong!');
  }
  vibrationPhone();
}

btnSettings.onclick = function(){
  if(settingsMenu.classList.contains('leftSettings')){
    settingsMenu.classList.remove('leftSettings');
  }else{
    settingsMenu.classList.add('leftSettings');
  }
  vibrationPhone();
}

closeSettings.onclick = btnSettings.onclick;

hideBtn.onclick = function(){
  win.minimize();
  vibrationPhone();
}

function vibrationPhone() {
  if(isBrowser){
    try{
      window.navigator.vibrate(200);
    }catch(e){
      alert(String(e));
    }
  }
}
win.setAlwaysOnTop(true);

setSlide = function(val){
    slider.style.marginLeft = val + '%';
}
setSlideMusic = function(val){
  var p = Math.floor(val);
  if(p<101){
    sliderMusic.style.paddingBottom = 95/100*p + 'px';
    sliderMusic.style.transition = p/100;
    music.innerText = p + '%';
  }
}
setSlidePX = function(val){
    slider.style.marginLeft = val + 'px';
}
getSlide = function(val){
    return Number(slider.style.marginLeft.replace('%',''));
}

closeBtn.onclick = function(){
  sypStorage.set('volume', window.percentesVolume);
  sypStorage.set('positionPlay', vCurrectTime - 1);
  win.close();
  vibrationPhone();
}
btnAudioQ.onclick = function () {
  if(!isBrowser){
    if(qualityAudio.classList.contains('sA')){
      qualityAudio.classList.remove('sA');
      qualityAudio.style.display = 'flex';
      qualityAudio.classList.add('sAReverse');
      onresize();
    }else{
      qualityAudio.classList.add('sA');
      qualityAudio.classList.remove('sAReverse');
      setTimeout(function () {
        qualityAudio.style.display = 'none';
        onresize();
      }, 1000);
    }
  }else{
    alert('Only server side!')
  }
  vibrationPhone();
}
setSlide(0);

initSYP = function(){
    listSearch.style.display = 'none';
  try{
    versionUsing.innerText += JSON.parse(fs.readFileSync(updaterSYP.fileVersion).toString()).version;
  }catch(e){
    if(!isBrowser){
      versionUsing.innerText = 'Can\'t get version';
      console.warn(e);
    }else{
      versionUsing.innerText = versionUsing.innerText.replace(' v', '');
    }
  }

  sypremoteport.onchange = function(){
    const a = Number(sypremoteport.value);
    if(a>-1 && 65536>a)
    sypStorage.set('sypport', sypremoteport.value);
  }
  allowsypremote.onchange = function(){
    sypStorage.set('allowsypremote', String(allowsypremote.checked));
  }
  changelogopen.onclick = function () {
    window.open('https://raw.githubusercontent.com/SimaKyr/simpleYoutubePlayer/master/player/CHANGELOG.txt');
    vibrationPhone();
  }
  sypremoteport.value = portServer;
  const allrc = sypStorage.get('allowsypremote');
  if(typeof allrc != 'undefined'){
    allowsypremote.checked = Boolean(allrc);
  }
  var cm = contextMenu.new();

  cm.add(contextMenu.button('DevTool Chromium','img/devtool.png',function(){win.showDevTools()}));

  cm.add(contextMenu.button('Reload app','img/reload.png',function(){easyrp.stop(); if(server.close) server.close(); if(typeof updaterSYP == 'undefined'){ location.href = location.href; }else{updaterSYP.reloadApp();}}));

  cm.add();

  oncontextmenu = function(e){
    cm.open(e.clientX, e.clientY);
  	e.preventDefault();
    return false;
  }

  onclick = function(){
    cm.close();
    vibrationPhone();
  }
  document.body.ondrop = function (e) {
    e.preventDefault();
    if (e.dataTransfer.items) {
      // Use DataTransferItemList interface to access the file(s)
      pf.repeat(e.dataTransfer.items, function (i) {
        if (e.dataTransfer.items[i].kind === 'file') {
          var file = e.dataTransfer.items[i].getAsFile();
          const supportedFormat = file.type.startsWith('video') || file.type.startsWith('audio');
          if(supportedFormat){
            setcurrectWEBPAGE(file.path)
          }
          // console.log('... file[' + i + '].name = ' + file.name);
        }
      });
    } else {
    }
  }
  document.body.ondragover = function (e) {
    e.preventDefault();
    // e.clientX
    // e.clientY
    // e.preventDefault();
  }
}

window.currectWEBPAGE = '';
window.onceOnLoadYt = function(){
  if(isBrowser){
    sypStorage = window.sypStorage;
  }
  if(typeof sypStorage.get('lastUrl') == 'undefined'){
    sypStorage.set('lastUrl', 'https://www.youtube.com/watch?v=qJclmkpJbrk')
  }
  setcurrectWEBPAGE(sypStorage.get('lastUrl'));
  var p = sypStorage.get('positionPlay');
  if(p){
    setPlayPos2(p);
  }
  setTimeout(function(){
    loadingScreen.classList.add('fadeOut');
  }, 1300);
  easyrp.init();
  if(typeof sypStorage.get('discordrpc') != 'undefined'){
    const n = Boolean(sypStorage.get('discordrpc'));
    if(n){
      easyrp.start();
    }else{
      easyrp.stop();
    }
    discordrpc.checked = n;
  }
  discordrpc.oninput = function () {
    const n = discordrpc.checked;
    if(n){
      easyrp.start();
    }else{
      easyrp.stop();
    }
    sypStorage.set('discordrpc', n);
  }
  window.onceOnLoadYt = function(){};
}
async function searchImage(text) {
  let promise = new Promise((resolve, reject) => {
    axios.get(encodeURI('https://www.google.com/search?q=' + text + '&tbm=isch')).then(function (response) {
      const k = response.data.split('src="https://e')
      const tmp = 'https://e';
      var i = 0;
      var t = [];
      pf.repeat(k, function (i) {
        if(k[i].indexOf('gstatic.com') == 14){
            t.push(decodeURIComponent(tmp + k[i].split('"')[0]));
        }
      })
      resolve(t);
    })
      .catch(function (error) {
        // handle error
        // console.log(error);
      })
  });
  return await promise;
}
function setBackground(e) {
  var u = thumbnail.src
  if(typeof e == 'string'){
    u = e;
  }
  if(document.body.style.backgroundImage != u){
    document.body.style.backgroundImage = 'url("' + u + '")';
  }
}
window.setcurrectWEBPAGE = function (e) {
  oldcurrectWEBPAGE = currectWEBPAGE;
  currectWEBPAGE = window.currectWEBPAGE = e;
  var localfile = false;
  if(isBrowser){
    infoLoad();
  }
  // easyrp.update();
  function standartPlay(e) {
    futureplayer.src = e;
    futureplayer.play();
    localfile = true;
    function onloadinfo(tag) {
      desc.style.display = 'block';
      var tags;
      if(typeof tag != 'object'){
        tags = {};
      }else{
        tags = tag.tags;
      }
      var image = tags.picture;
      if(tags.title && tags.album){
        name = tags.album + ' - ' + tags.title
      }
      document.title = name + ' - SYP Player';
      namemedia.innerText = name;
      if(tags.artist){
        madeby.innerText = tags.artist;
      }else{
        if(tag == undefined){
          desc.style.display = 'none';
        }
      }
      thumbnail.title = tags.title;
        if (image) {
          var base64String = "";
          pf.repeat(image.data, function (i) {
            base64String += String.fromCharCode(image.data[i]);
          })
          var base64 = "data:" + image.format + ";base64," + window.btoa(base64String);
          thumbnail.setAttribute('src', base64);
          setBackground();
        } else {
          var unknownname = false;
          if(name == 'videoplayback'){
            thumbnail.src = 'img/music.png';
            name = 'music notes wallpaper';
            unknownname = true;
          }
          searchImage(name).then(function (e) {
            const r = e[Math.floor(Math.random() * e.length)]
            if(!unknownname){
              thumbnail.src = e[0];
              setBackground(e[0]);
            }else{
              setBackground(r);
            }
          });
      }
    }
    var pathfile = new URL(futureplayer.src).pathname;
    pathfile = decodeURIComponent(pathfile);
    if(process.platform == 'win32'){
      pathfile = pathfile.substring(1);
    }
    var name = path.parse(String(pathfile)).name;
    jsmediatags.read(pathfile, {
      onSuccess: function(tag) {
        onloadinfo(tag);
      },
      onError: function(error) {
        try {
          onloadinfo();
        } catch (e) {
          console.log(e);
        }
      }
    });
  }
  if(!isBrowser){
    try{
      const t = new URL(currectWEBPAGE);
      if(t.protocol == 'file:'){
        standartPlay(e);
      }else{
        ytparser.play();
      }
    }catch{
      standartPlay(e);
    }
  }else{
    const thu = new URL(currectWEBPAGE);
    if(thu.pathname.endsWith('results')){
      httpGetAsync(getActionPerfURL('sk&i=' + encodeURI(thu.searchParams.get('search_query'))), function(e){
        if(e != 'undefined'){
          clearList();
          advancedList(list, JSON.parse(e));
        }
      });
    }
  }
  var p = sypStorage.get('volume');
  if(typeof p == 'number'){
    setVolumeReal(p);
  }else{
    setVolumeReal(100);
  }
  var url = currectWEBPAGE;
  sypStorage.set('lastUrl', url);
  if(url.split('?v=')[1] || localfile){
    document.body.style.background = '';
    playerContent.style.display = 'block';
  }
  else{
      document.body.style.backgroundImage = '';
      document.body.style.background = 'red';
      playerContent.style.display = 'none';
  }
}

window.onload = function () {
  initSYP();
  if(!isBrowser){
    onceOnLoadYt();
  }
};

pause = function(){
  if(isBrowser){
    performActionRemote('pause');
  }else{
    futureplayer.pause();
  }
}

function getActionPerfURL(action, open) {
  var a = serverAddress.replace('https://', '');
  if(location.origin != 'file://'){
    a = a.replace(':' + portServer, '');
  }
  a = a + '/rc?d=' + localStorage.SYPPlayerUUID;
  if(open){
    a += '&o=' + open
  }else{
    a += '&c=' + action;
  }
  return a;
}
function updateVolume() {
  var xhr = new XMLHttpRequest();
  xhr.open("GET", getActionPerfURL('volume'), true);
  xhr.onload = function (e) {
    if (xhr.readyState === 4) {
      if (xhr.status === 200) {
        var a = Number(xhr.responseText);
        if(a == NaN){
          a = 0;
        }
        setVolumeReal(a);
      }
    }
  };
  xhr.send(null);
}
function performActionRemote(action, open) {
  var url;
  if(open){
    url = getActionPerfURL(undefined, open);
  }else{
    url = getActionPerfURL(action);
  }
  var xhr = new XMLHttpRequest();
  xhr.open("GET", url, true);
  xhr.send(null);
}
function setRemoteThumbnail() {
  var xhr = new XMLHttpRequest();
  xhr.open("GET", getActionPerfURL('thumbnail'), true);
  xhr.onload = function (e) {
    if (xhr.readyState === 4) {
      if (xhr.status === 200) {
        if(thumbnail.src != xhr.responseText){
          thumbnail.src = xhr.responseText;
        }
        setBackground(xhr.responseText);
      }
    }
  };
  xhr.send(null);
}
function setPlayStatus() {
  var xhr = new XMLHttpRequest();
  xhr.open("GET", getActionPerfURL('playing'), true);
  xhr.onload = function (e) {
    if (xhr.readyState === 4) {
      if (xhr.status === 200) {
        const rsp = xhr.responseText;
        if(rsp == 'UUID'){
          splashinfo.innerText = 'Allow in real SYP Player connection!';
          loadingScreen.classList.remove('fadeOut');
        }else{
          if(rsp == 'BANNED' || rsp == 'NONEW'){
            if(rsp == 'NONEW'){
              splashinfo.innerText = 'Server don\'t accept new connections!';
            }else{
              splashinfo.innerText = 'YOU ARE BANNED!';
            }
            loadingScreen.classList.remove('fadeOut');
          }else{
            if(!loadingScreen.classList.contains('fadeOut')){
              loadingScreen.classList.add('fadeOut');
            }
            window.playing = Boolean(Number(xhr.responseText));
            btnPlay.setIcon(playing);
          }
        }
      }
    }
  };
  xhr.onerror = function (e) {
    splashinfo.innerText = 'Player disconnected!';
    loadingScreen.classList.remove('fadeOut');
  }
  xhr.send(null);
}
play = function(){
  if(isBrowser){
    performActionRemote('play');
  }else{
    futureplayer.play();
  }
}
function infoLoad() {
  var ur = getActionPerfURL('info');
  try{
    const n = new URL(currectWEBPAGE).searchParams;
    if(n.get('v')){
      ur += '&i=' + n.get('v');
    }
  }catch{}
  var xhr = new XMLHttpRequest();
  xhr.open("GET", ur, true);
  xhr.onload = function (e) {
    if (xhr.readyState === 4) {
      if (xhr.status === 200) {
        importInfoJSON(xhr.responseText);
      }
    }
  };
  xhr.send(null);
}
updaterforremote = function () {
  setRemoteThumbnail();
  setPlayStatus();
  updateTime();
  updateVolume();
}
if(isBrowser){
  updaterforremote();
  setInterval(updaterforremote, 1000*2);
}
nextTrack = function(){
  if(isBrowser){
    performActionRemote('nextTrack');
  }else{
    if(typeof nextYT != 'undefined'){
      setcurrectWEBPAGE(nextYT);
    }
  }
}

replayTrack = function(){
  if(isBrowser){
    performActionRemote('replayTrack');
  }else{
    if(typeof oldcurrectWEBPAGE != 'undefined'){
      setcurrectWEBPAGE(oldcurrectWEBPAGE);
    }
  }
}

playBtn = function(){
  if(playing){
    pause();
  }else{
    play();
  }
  if(isBrowser){
    setTimeout(setPlayStatus, 100);
  }
  vibrationPhone();
}

btnReplay.onclick = function () {
  vibrationPhone();
  replayTrack();
};

btnPlay.onclick = playBtn;

btnNext.onclick = function () {
  vibrationPhone();
  nextTrack();
};


autoplayenabled.oninput = function () {
  sypStorage.set('autoplayenabled', autoplayenabled.checked);
}
function downloadFile(filePath){
    var link=document.createElement('a');
    link.href = filePath;
    // link.download = filePath.substr(filePath.lastIndexOf('/') + 1);
    link.download = document.title;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}

btnDownload.onclick = function () {
  downloadFile(futureplayer.src);
  vibrationPhone();
}

var statusClick = false;
var statusClickMusic = false;

function changeStateD(){
    statusClick = false;
    statusClickMusic = false;
}

onpointerup = changeStateD;

sliderT.onpointerdown  = function(e){
    statusClick = true;
    if((e.clientX - sliderT.offsetLeft) > -1){
      if(e.clientX < (sliderT.offsetLeft + sliderT.getBoundingClientRect().width)){
        setPlayPos(e.clientX - sliderT.offsetLeft);
      }
    }
}
document.onpointermove = function(e){
    if(statusClick){
        if((e.clientX - sliderT.offsetLeft) > -1){
          if(e.clientX < (sliderT.offsetLeft + sliderT.getBoundingClientRect().width)){
            setPlayPos(e.clientX - sliderT.offsetLeft);
        }
      }
    }

    if(statusClickMusic){
      sliderMusicP(e);
    }
}
sliderT.onwheel = function(e){
  var n = vCurrectTime;
  if(navigator.userAgent.indexOf("Firefox") !== -1){
    n-=e.deltaY*4;
  }else{
    n-=e.deltaY/5;
  }
  setPlayPos2(n);
}
window.percentesVolume = 0;

function setVolumeReal(p) {
  if(isBrowser){
    if(Math.floor(p) != Math.floor(percentesVolume)){
      performActionRemote('setvolume&i=' + String(Math.floor(p)));
    }
  }else{
    if(sypStorage.get('volume') != p){
      sypStorage.set('volume', p);
    }
  }
  window.percentesVolume = p;
  setVolume(p);
  setSlideMusic(p);
}
sliderTMusic.onwheel = function(e){
  var p = window.percentesVolume-e.deltaY/10;
  p = Math.floor(p)
  var g = setVolumeReal;
  if(p>0 && p<101){
    g(p);
  }else{
    if(p>100){
      g(100);
    }else{
      g(0);
    }
  }
}
//Slider music
sliderTMusic.onpointerdown  = function(e){
    statusClickMusic = true;
    sliderMusicP(e);
}

sliderMusicP = function(e){
  if((e.clientY - sliderTMusic.offsetTop) > -1){
    if(e.clientY < (sliderTMusic.offsetTop + 85)){
      var p = (e.clientY - sliderTMusic.offsetTop) / 84 * 100;
      p = 100 - p;
      setVolumeReal(p);
    }
  }
}

function putList(l, f, li, timeout){
    const a = l.split('\n');
    var i = 0;
    function z(i, a) {
      if(a[i] != ''){
        var p = document.createElement('p');
        p.innerText = a[i];
        if(f){
          const k = i;
          p.onclick = function () {
            f(k, a[k]);
            vibrationPhone();
          }
        }
        if(li){
          li.appendChild(p);
        }else{
          list.appendChild(p);
        }
      }
    }
    pf.repeat(a, function (i) {
      if(timeout){
        const n = i;
        setTimeout(function () {
          z(n, a);
        }, i*timeout);
      }else {
        z(i, a);
      }
    });
    window.onresize();
}

function clearList(li){
    if(li){
      li.innerHTML = '';
    }else{
      list.innerHTML = '';
    }
}
onresize = function(){
    list.style.height = (innerHeight - list.offsetTop - 12) + 'px';
    contentWin.style.height = (innerHeight - contentWin.offsetTop*2) + 'px';
    searchBox.style.width = (innerWidth - searchBox.offsetLeft - contentWin.offsetLeft) + 'px';
}
userwarn = function(text){
  console.log("%c" + text, "color: #fff; background: #aaa; border-radius: 100px; padding: 10px; margin: 1px; font-size: 18px; font-weight: 800; margin-left: 3% !important;");
}
userwarn('SYP Player warning!')
userwarn('Don\'t put text from other people, they can hack you');
userwarn('Please download SYP Player only from https://is.gd/SYPSimaKyr')
userwarn('Don\'t forget install security updates!')
onresize();

function urlOpenYT(e) {
  e = String(e);
  function alt(e) {
    return 'https://www.youtube.com/results?search_query=' + e;
  }
  var url;
  try{
    var p = murl.parse(e);
    if(p.hostname == 'youtu.be' || p.hostname == 'www.youtu.be' ||
        p.hostname == 'youtube.com' || p.hostname == 'www.youtube.com'){
            url = e;
    }else{
        url = alt(e);
    }
    setcurrectWEBPAGE(url);
  }catch{
    setcurrectWEBPAGE(alt(e));
  }
}
searchR.onkeyup = function(e){
    if(e.key == 'Enter'){
        if(searchR.value.length > 0){
            urlOpenYT(searchR.value);
            searchR.value = '';
        }
    }
}

searchImg.onclick = function(){ searchR.onkeyup({key: 'Enter'}); vibrationPhone(); };

listSearch2 = false;
function listSearch3(timer) {
  if(listSearch2){
      if(listSearch.style.display == 'none'){
          listSearch.style.display = 'block';
      }else{
          if(timer){
            listSearch.style.display = 'none';
          }
      }
    listSearch2 = false;
  }else{
    if(timer){
      if(listSearch.style.display == 'block'){
        listSearch2 = true;
      }
    }
  }
}
setInterval(function () {
  listSearch3(true);
}, 3000);
function urlOpenYTForKeyword(i, e) {
  urlOpenYT(e);
  searchR.value = '';
  listSearch2 = false;
  listSearch3(true);
}
function getKeyword(word, endpoint) {
  if(isBrowser){
    var xhr = new XMLHttpRequest();
    xhr.open("GET", getActionPerfURL('keyword') + '&k=' + encodeURIComponent(word), true);
    xhr.onload = function (e) {
      if (xhr.readyState === 4) {
        if (xhr.status === 200) {
          if(thumbnail.src != xhr.responseText){
            endpoint(xhr.responseText);
          }
        }
      }
    };
    xhr.send(null);
  }else{
    const url = 'https://suggestqueries-clients6.youtube.com/complete/search?client=youtube&q=' + word;
    httpGetAsync(url, function (e) {
      const a = JSON.parse(e.replace('window.google.ac.h(','').replace('"}])', '"}]'))[1];
      var i = 0;
      var z = [];
      pf.repeat(a, function (i) {
        z.push(a[i][0]);
      });
      endpoint(z.join('\n'));
    });
  }
}
searchR.oninput = function(){
    getKeyword(searchR.value, function (e) {
      clearList(listSearch);
      putList(e, urlOpenYTForKeyword, listSearch, 20);

      listSearch2 = true;
      listSearch3(false);
    });
}

function setPlayPos(x){
  const i = vDuration / 100 * (x / sliderT.offsetWidth * 100);
    if(isBrowser){
      performActionRemote('timeset&i=' + i);
    }else{
      futureplayer.currentTime = i;
    }
    setSlidePX(x);
}
function setPlayPos2(x){
  if(isBrowser){
    performActionRemote('timeset&i=' + x);
  }
  futureplayer.currentTime = Number(x);
}
function setVolume(v){
  if(!isBrowser){
    futureplayer.volume = Number(v)/100;
  }
}

window.vCurrectTime = 0;
window.vDuration = 0;

function secToTime(sec){
  if(String(sec) == 'NaN'){
      return '0'
  }else{
    if(new Date(sec * 1000).toISOString().substr(11, 2) == 00){
        return (new Date(sec * 1000).toISOString().substr(14, 5));
    }else{
        return (new Date(sec * 1000).toISOString().substr(11, 8));
    }
  }
}

function updateTime(t){
  function a(t) {
    window.vCurrectTime = Number(t.split('|')[0]);
    window.vDuration = Number(t.split('|')[1]);
    time.innerText = secToTime(vDuration) + '/' + secToTime(vCurrectTime);
    setSlide(vCurrectTime / vDuration * 100);
  }
  if(t){
    if(t.toString().split('|')[1]!='NaN'){
      a(t);
    }
  }else{
    if(isBrowser){
      var xhr = new XMLHttpRequest();
      xhr.open("GET", getActionPerfURL('time'), true);
      xhr.onload = function (e) {
        if (xhr.readyState === 4) {
          if (xhr.status === 200) {
              a(xhr.responseText);
            }
          }
        }
      xhr.send(null);
    };
  }
}

btnPlay.setIcon = function (bool) {
  if(!bool){
    if(btnPlay.src.indexOf('img/play.png') == -1){
      btnPlay.src = 'img/play.png';
    }
  }else{
    if(btnPlay.src.indexOf('img/pause.png') == -1){
      btnPlay.src = 'img/pause.png';
    }
  }
}
futureplayer.ontimeupdate = function () {
  updateTime(futureplayer.currentTime + '|' + futureplayer.duration);
}
futureplayer.onpause = futureplayer.onplaying = function () {
  window.playing = !futureplayer.paused;
  btnPlay.setIcon(playing);
}
futureplayer.addEventListener("ended", function(){
     if(autoplayenabled.checked){
       nextTrack();
     }
});
