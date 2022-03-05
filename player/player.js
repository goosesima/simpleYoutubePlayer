var fs = require('fs');
const http = require('http');
const jsdom = require("jsdom");
const https = require('https');
const os = require('os');
const murl = require('url');
const util = require('util');
const networkInterfaces = os.networkInterfaces();
const path = require('path');
var isNodeJS = false;
if(typeof nw == 'undefined' && typeof window == 'undefined'){
  window = {};
  isBrowser = window.isBrowser = false;
  isNodeJS = window.isNodeJS = true;
  allowsypremote = { checked: true };
  setVolumeReal = function () {

  }
  confirm = function (msg, f) {
    console.log('========MESSAGE========');
    console.log(msg);
    console.log('*Automatically selects YES*');
    console.log('========================');
    f(true);
  }
}
var pf;
try {
  pf = require('player/lib/pf.js');
} catch (e) {
  pf = require('./lib/pf.js');
} finally {

}

function sypReload(){
  easyrp.stop(); if (server.close) server.close();
  appReload();
}

var plugins = {};
plugins.list = [/*'rezka', */'yt'];
plugins.knownUrls = [];
plugins.search = async function (searchTerm) {
  return await plugins.retrieve(searchTerm, 'search');
}
plugins.quicksearch = async function (searchTerm) {
  return await plugins.retrieve(searchTerm, 'quicksearch');
}
plugins.retrieve = async function (searchTerm, type) {
  if(isBrowser){
    const url = getActionPerfURL(type) + '&k=' + encodeURIComponent(searchTerm);
    const e = await axios.get(url);
    return e.data;
  }else{
    var out = [];
    var scanI = 0;
    var waitingI = 0;
    var pluginsList = [];
    for (var i = 0; i < plugins.list.length; i++) {
      const t = plugins[plugins.list[i]];
      if(t && t.type == 'source' && t[type]){
        pluginsList.push(t);
        waitingI++;
      }
    }
    return new Promise(resolve => {
      for (var i = 0; i < pluginsList.length; i++) {
        const plugin = pluginsList[i];
        plugin[type](searchTerm).then(function (tmp) {
          scanI++;
          if(scanI == waitingI){
            resolve(out);
          }
          for (var i = 0; i < tmp.length; i++) {
            out.push(tmp[i]);
          }
        });
      }
    });
  }
}
plugins.import = function(onload) {
  var loaded = 0;
  for (var i = 0; i < plugins.list.length; i++) {
    const name = plugins.list[i];
    const dir = 'plugins/' + name + '.js';
    var script = document.createElement('script');
    script.src = dir;
    script.onload = function () {
      try {
        plugins[name].load();
      } catch (e) {
        console.log('Error load plugin: ', e);
      }
      loaded++;
      if(loaded == plugins.list.length){
        onload();
      }
      if(plugins[name]){
        if(typeof plugins[name].knownUrls == 'object'){
          const knownUrls = plugins[name].knownUrls;
          for (var i = 0; i < knownUrls.length; i++) {
            plugins.knownUrls.push(knownUrls[i]);
          }
        }
      }
    }
    script.onerror = function(){
      loaded++;
      if (loaded == plugins.list.length) {
        onload();
      }
    }
    document.body.appendChild(script);
  }
}
try {
  window.sypStorage = global.sypStorage  = require('player/lib/sypstorage.js');
} catch (e) {
  // Compatibility for Windows XP nwjs
  global.sypStorage = require('./lib/sypstorage.js');
}
var jsmediatags = require("jsmediatags");
const { log } = require('console');
const { ifError } = require('assert');
const { default: axios } = require('axios');

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
      if((t.address.startsWith('192') && !t.address.endsWith('.1') && !t.internal) /*|| (t.address.startsWith('127.') && t.internal)*/){
           addr.push(t.address);
      }
    });
    var usage = 0;
    if(!addr && keys.length > 1){
        usage = 1;
    }
    return addr[0] || networkInterfaces[keys[usage]][0].address;
  }
}
const learnSyp = '<p>Should you check source code to discover how SYP work? You makes big errors in request</p><br><a href="https://github.com/GooseSima/simpleYoutubePlayer">Discover source code</a>';
var options = {
  key: null,
  cert: null,
  requestCert: false,
  rejectUnauthorized: false
};
try {
  options.key = fs.readFileSync(path.join('player', 'userdata', 'server-key.pem'));
  options.cert = fs.readFileSync(path.join('player', 'userdata', 'server-cert.pem'));
} catch (e) {
  options.key = fs.readFileSync(path.join('userdata', 'server-key.pem'));
  options.cert = fs.readFileSync(path.join('userdata', 'server-cert.pem'));
}
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
urlToJSON = function(e){
  return JSON.parse('{"' + decodeURI(e).replace(/"/g, '\\"').replace(/&/g, '","').replace(/=/g,'":"').replace(/\s/g,'') + '"}');
}

function simpleReadFile(filePath, callback){
    const p = util.promisify(fs.readFile)
    const options = {encoding:'utf-8', flag:'r'};
    const a = function (e) {
      const out = e.replaceAll('${FULLADDRESS}', serverAddress).replaceAll('global', 'window');
      callback(out);
    }
    p(filePath, options).then(a);
}

createFileIfNotExist = function(fn){try{if(!fs.existsSync(fn)){simpleWriteFile(fn,'')}}catch(e){}}
simpleWriteFile = function(name,data){fs.writeFile(name, data,function(){});}

var fileNotContains = false;

simpleCheckFile = function(name, f){
    try {
      if (fs.existsSync(name)) {
          f(true);
      }
    } catch(err) {
        f(false);
    }
}

function importInfo(data) { //Need remaking (reason: plugins support and nodejs)
  var c;
  global.info = data;
  if(typeof data === 'string'){
    try{
      c = JSON.parse(c);
    }catch{
      console.log(c);
    }
  }else{
    c = data;
  }
  if(c.next){
    global.nextTrack = c.next;
  }
  if (c.recommendation){
    clearList();
    var recommendation = c.recommendation;
    for (let i = 0; i < recommendation.length; i++) {
      var e = recommendation[i];
      if (String(e.length) != 'NaN'){
        e.text = ['⌛:' + e.length, e.published, e.views].join('\n');
        if (e.dislikes){
          e.text += '👎:' + e.dislikes + ' 👍:' + e.likes;
        }
      }else{
        e.text = '🔴 Live';
      }
    }
    advancedList(list, recommendation);
  }
  document.title = c.title + ' - SYP Player';
  namemedia.innerText = c.title;
  thumbnail.setAttribute('src', c.thumbnail);
  setBackground(c.thumbnail);
  if (c.dislikes){
    dislikes.style.display = 'display';
    dislikes.innerText = c.dislikes;
  }else{
    dislikes.style.display = 'none';
  }

  likes.innerText = c.likes;
  madeby.innerText = c.author;
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
var root = '';
if(!isNodeJS){
  root = 'player/';
}else{
  root = './'
}
var fileh = {'favicon.ico': root + 'img/sypplayer.png', 'sypscript': root + 'userscript.js', '': root + 'userscript.html', 'userscript.user.js': root + 'sypplayer.user.js'};
function addToFileHDir(d) {
  dir = root;
  dir += d;
  fs.readdir(dir, (err, files) => {
    files.forEach(file => {
      if(!isDir(root + d + '/' + file)){
          var locc = d + '/' + file;
          if(locc[0] == '/'){
            locc = locc.substring(1);
          }
            fileh[locc] = root + locc;
      }
    });
  });
}
if(!isBrowser){
  addToFileHDir('');
  addToFileHDir('lang');
  addToFileHDir('img');
  addToFileHDir('lib');
  addToFileHDir('plugins');
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
                    setpage('https://www.youtube.com/watch?v=' + url2.get('o'));
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
                        var url = null;
                        if(typeof thumbnail != 'undefined'){
                          url = thumbnail;
                        }
                        if(url){
                          url = url.src;
                        }else{
                          url = 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d9/Node.js_logo.svg/1200px-Node.js_logo.svg.png';
                        }
                        res.write(url);
                        res.end();
                        break;
                      case 'time':
                        res.write(String(window.vCurrectTime + '|' + window.vDuration));
                        res.end();
                        break;
                      case 'playing':
                        res.write(String(Number(window.playing)));
                        res.end();
                        break;
                      case 'volume':
                        res.write(String(Math.floor(window.percentesVolume)));
                        res.end();
                        break;
                      case 'info':
                        var up = page;
                        if(url2.get('i')){
                          up = 'https://youtube.com/watch?v=' + url2.get('i');
                        }
                        plugins.info(up).then(function (e) {
                          res.write(JSON.stringify(e));
                          res.end();
                        });
                        break;
                      case 'sk':
                        plugins.search(String(url2.get('i'))).then(function (e) {
                          res.write(JSON.stringify(e));
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
                        plugins.quicksearch(url2.get('k'), function(e) {
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
                            confirm('Would you block him (IP:' + ipclient + ')?', function() {
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

function openInBrowser(e) {
  if(isBrowser){
    window.open(e, '_blank').focus();
  }else{
    require('nw.gui').Shell.openExternal(e);
  }
}
function qualitySettings(type) {
  let elm = qualityAudio;
  if(type == 'video'){
    elm = qualityVideo;
  }
  if(!isBrowser){
    if(elm.classList.contains('sA')){
      elm.classList.remove('sA');
      elm.style.display = 'flex';
      elm.classList.add('sAReverse');
    }else{
      elm.classList.add('sA');
      elm.classList.remove('sAReverse');
      setTimeout(function () {
        elm.style.display = 'none';
      }, 1000);
    }
  }else{
    alert('Only server side!')
  }
  vibrationPhone();
}

function setTimeFromStorage(e){
  if(e){
    var time = futureplayer.currentTime || futurevideo.currentTime;
    if(0 > time){
      time = 0;
    }
    sypStorage.set('positionPlay', time);
  }else{
    let p = sypStorage.get('positionPlay');
    if(p){
      setPlayPos2(Number(p));
    }
  }
}
window.onceOnLoad = function(){
  if(isBrowser){
    sypStorage = window.sypStorage;
  }
  if(typeof sypStorage.get('lastUrl') == 'undefined'){
    sypStorage.set('lastUrl', 'syp://search?keyword=' + 'Bonnie Tyler - Holding Out for a Hero | Pokémon: Detective Pikachu | Trailer 2 Music')
  }
  setTimeout(function(){
    loadingScreen.classList.add('fadeOut');
  }, 800);
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
  if(!isBrowser){
    if(window.isNodeJS){
      console.warn('Warn: Discord RPC for NodeJS not implemented!');
    }else{
      discordrpc.oninput = function () {
        const n = discordrpc.checked;
        if(n){
          easyrp.start();
        }else{
          easyrp.stop();
        }
        sypStorage.set('discordrpc', n);
      }
    }
  }
  window.onceOnLoad = function(){};
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
  document.title = namemedia.innerText + ' - SYP Player';
}
global.setBackground = setBackground;
var loadTimeFromStorage = true;

setInterval(function () {
  if(!loadTimeFromStorage){
    setTimeFromStorage(true);
  }
}, 1000);

window.setpage = global.setpage = function (e) {
  if(typeof scroll != 'undefined'){
    scroll(0, 0);
  }
  if(typeof page != 'undefined'){
    oldpage = global.page || window.page || page;
  }
  global.page = window.page = page = e;
  var localfile = false;
  if(isBrowser){
    infoLoad();
  }
  // easyrp.update();
  desc.style.display = 'table-caption';
  function standartPlay(e) {
    futureplayer.src = e;
    futurevideo.src = e;
    futureplayer.play();
    localfile = true;
    function onloadinfo(tag) {
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
      const t = new URL(page);
      if(t.protocol == 'file:'){
        standartPlay(e);
      }else{
        if(t.protocol == 'syp:'){
          if(t.pathname == '//search'){
            var searchTerm = t.searchParams.get('keyword');
            if(!searchTerm){
              searchTerm = 'rick roll';
            }
            plugins.search(searchTerm).then(function (out) {
              clearList();
              advancedList(list, out);
            });
          }
        }else{
          const domain = t.host;
          var pluginProvider = null;
          for (let i = 0; i < plugins.list.length; i++) {
            const pluginName = plugins.list[i];
            const plugin = plugins[pluginName];
            if(plugin){
              if (typeof plugin.knownUrls == 'object') {
                for (let z = 0; z < plugin.knownUrls.length; z++) {
                  const knownDomain = plugin.knownUrls[z];
                  if (knownDomain == domain) {
                    pluginProvider = pluginName;
                  }
                }
              }
            }
          }

          if (pluginProvider == null) {
            return alert('Unknown video provider!', true);
          }
          const testConfig = {
            qaudio: 'highest', qvideo: 'highest', qvideoalt: 'highest', videocodec: 'vp9'
          };
          plugins[pluginProvider].info(page).then(function (data){
            importInfo(data);
          });
          plugins[pluginProvider].play(page, testConfig).then(function (resource){
            
            if (resource.urlaudio){
              futureplayer.src = resource.urlaudio;
            }
            if (resource.urlvideo){
              futurevideo.src = resource.urlvideo;
            }
            futureplayer.play();
            if (loadTimeFromStorage) {
              loadTimeFromStorage = false;
              setTimeFromStorage();
              console.log(futureplayer, futurevideo);
            }
          });
        }
      }
    }catch(e){
      console.log(e);
      standartPlay(e);
    }
  }else{
    const thu = new URL(page);
    if(thu.pathname.endsWith('results')){
      const url = getActionPerfURL('sk&i=' + encodeURI(thu.searchParams.get('search_query')));
      axios.get(url).then(function(response){
        const data = response.data;
        if(typeof data == 'object'){
          clearList();
          advancedList(list, data);
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
  var url = page;
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
    onceOnLoad();
  }
  plugins.import(function(){
    setpage(sypStorage.get('lastUrl'));
  });
};

pause = function(){
  if(isBrowser){
    performActionRemote('pause');
  }else{
    futureplayer.pause();
    futurevideo.pause();
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
            setIconPlay(playing);
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
    futurevideo.play();
  }
}
function infoLoad() {
  var ur = getActionPerfURL('info');
  try{
    const n = new URL(page).searchParams;
    if(n.get('v')){
      ur += '&i=' + n.get('v');
    }
  }catch{}
  var xhr = new XMLHttpRequest();
  xhr.open("GET", ur, true);
  xhr.onload = function (e) {
    if (xhr.readyState === 4) {
      if (xhr.status === 200) {
        importInfo(xhr.responseText);
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
    if(typeof global.nextTrack != 'undefined'){
      setpage(global.nextTrack);
    }
  }
}

replayTrack = function(){
  if(isBrowser){
    performActionRemote('replayTrack');
  }else{
    if(typeof oldpage != 'undefined'){
      setpage(oldpage);
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

var statusClick = false;
var statusClickMusic = false;

function changeStateD(){
    statusClick = false;
    statusClickMusic = false;
}

onpointerup = changeStateD;

window.percentesVolume = 0;

userwarn = function(text){
  console.log("%c" + text, "color: #fff; background: #aaa; border-radius: 100px; padding: 10px; margin: 1px; font-size: 18px; font-weight: 800; margin-left: 3% !important;");
}
userwarn('SYP Player warning!')
userwarn('Don\'t put text from other people, they can hack you');
userwarn('Please download SYP Player only from https://is.gd/sypplayer')
userwarn('Don\'t forget install security updates!')
async function searchMedia(e) {
  var p;
  try{
    p = new URL(String(e));
  }catch (e){
  }
  try {
    for (var i = 0; i < plugins.knownUrls.length; i++) {
      if(p.hostname == plugins.knownUrls[i]){
          return setpage(String(e));
      }
    }
  } catch (e) {

  }
  return setpage('syp://search?keyword=' + encodeURI(String(e)));
}

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
function setCT(i) {
  if(i > 0){
    let n;
    if(String(futureplayer.duration) != 'NaN'){
       n = futurevideo.duration / futureplayer.duration * i;
    }else{
      n = i;
    }
    if(n > 0){
      futureplayer.currentTime = i;
      futurevideo.currentTime = n;
    }
  }
}
function setPlayPos(x){
  const i = vDuration / 100 * (x / sliderT.offsetWidth * 100);
    if(isBrowser){
      performActionRemote('timeset&i=' + i);
    }else{
       setCT(i);
    }
    setSlidePX(x);
}
function setPlayPos2(x){
  if(isBrowser){
    performActionRemote('timeset&i=' + x);
  }
  setCT(Number(x));
}
function setVolume(v){
  if(!isBrowser){
    // futurevideo.volume = Number(v)/100;
    futurevideo.muted = true;
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
    global.vCurrectTime = window.vCurrectTime = Number(t.split('|')[0]);
    global.vDuration = window.vDuration = Number(t.split('|')[1]);
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
