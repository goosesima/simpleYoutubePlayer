var fs = require('fs');
const http = require('http');
const https = require('https');
const os = require('os');
const murl = require('url');
const util = require('util');
const networkInterfaces = os.networkInterfaces();
const path = require('path');
function getIP() {
  if(isBrowser){
    FULLADDRESS = 'https://127.0.0.1'
    return `${FULLADDRESS}`;
  }else{
    var keys = Object.keys(networkInterfaces);
    var i = 0;
    var addr = [];
    while(keys.length != i){
        var t = networkInterfaces[keys[i]];
        if(t.length == 2){
            t = t[1];
        }else{
            t = t[0];
        }
        if((t.address.startsWith('192.') && !t.address.endsWith('.1') && !t.internal) /*|| (t.address.startsWith('127.') && t.internal)*/){
             addr.push(t.address);
        }
        i++;
    }
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
var serverAddress = 'https://' + getIP() + ':' + portServer;
nwjsffmpeg.ask();

document.addEventListener("DOMContentLoaded", function () {
  window.yt = document.getElementById('youtube');
  yt.getURL = function () {
    return 'https://www.youtube.com/watch?v=' + new URL(thumbnail.src).pathname.split('/')[2];
  }
});

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
  nwjsffmpeg.install(function(){
    alert('Installed, reloading app...');
    setTimeout(updaterSYP.reloadApp, 3000);
  });
}

createFileIfNotExist = function(fn){try{if(!fs.existsSync(fn)){simpleWriteFile(fn,'')}}catch(e){}}
simpleWriteFile = function(name,data){fs.writeFile(name, data,function(){});}

var fileNotContains = false;

var madeby = document.getElementById('name').getElementsByTagName('p')[1];
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

function generateInfoJSON() {
  var c = {};
  if(typeof vRecommendations != 'undefined'){
    c['r'] = vRecommendations;
  }
  c['t'] = document.title.replace(' - SYP Player','');
  c['d'] = dislikes.innerText;
  c['l'] = likes.innerText;
  c['a'] = madeby.innerText;
  c = JSON.stringify(c);
  return c;
}
function importInfoJSON(c) {
  try{
    c = JSON.parse(c);
  }catch{
    console.log(c);
  }
  if(c['r']){
    vRecommendations = c['r'];
    openRecommendations();
  }
  document.title = c['t'] + ' - SYP Player';
  document.getElementsByTagName('marquee')[0].innerText = c['t'];
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
var fileh = {'favicon.ico': 'player/img/sypplayer.png', 'sypscript': 'player/userscript.js', '': 'player/userscript.html'};
function addToFileHDir(d) {
  fs.readdir('player/' + d, (err, files) => {
    files.forEach(file => {
      if(!isDir('player/' + d + '/' + file)){
          var locc = d + '/' + file;
          if(locc[0] == '/'){
            locc = locc.substring(1);
          }
          if(locc.indexOf('server-key.pem') == -1 && locc.indexOf('server-cert.pem') == -1 && locc.indexOf('storage.json') == -1){
            fileh[locc] = 'player/' + locc;
          }
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
    if (murl.parse(serverAddress + req.url).pathname == '/sypplayer') {
        const url2 = new URLSearchParams(murl.parse(serverAddress + req.url).search);
        var ipclient = req.connection.remoteAddress;
        if (ipclient == '::1') {
            ipclient = 'localhost';
        }
        if (url2.get('uuid')) {
            var uuidClient = url2.get('uuid');
            res.setHeader('Content-Type', 'text/plain');
            if (String(sypStorage.get('uuidWhiteList')).indexOf(uuidClient) != -1) {
                if (url2.get('open')) {
                    yt.src = 'https://www.youtube.com/watch?v=' + url2.get('open');
                } else {
                    var command = url2.get('command');
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
                        okay(res)
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
                        res.write(generateInfoJSON());
                        res.end();
                        break;
                      case 'rec':
                        opnRecommendations(Number(url2.get('i')));
                        ok(res);
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
                if (String(sypStorage.get('IPBannedList')).indexOf(String(ipclient)) == -1) {
                    // res.setHeader("UserId", 12);
                    res.setHeader("Content-Type", "text/plain; charset=utf-8;");
                    res.write('UUID');
                    res.end();
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
                    });
                } else {
                    // res.setHeader("UserId", 12);
                    res.setHeader("Content-Type", "text/plain; charset=utf-8;");
                    res.write('BANNED');
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
    // console.log(e);
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
  Function(e + " = document.getElementById('" + e + "')")();
}
includeIdE = function(){
  var e = document.body.getElementsByTagName("*");
  var i = 0;
  while(i!=e.length){
    if(e[i].id!=""){
      documentgetElementById(e[i].id);
    }
    i++;
  }
}

includeIdE();

var win = nw.Window.get();

win.setMinimumSize(400,500);

win.resizeTo(400,220);

playBrowser.onclick = function(){
  if(isBrowser){
    window.open(yt.getURL(), '_blank').focus();
  }else{
    require('nw.gui').Shell.openExternal( document.getElementById('youtube').src );
  }

   return false;
}

installSyp.onclick = function(){
  require('nw.gui').Shell.openExternal(serverAddress);
  return false;
}

checkupdate.onclick = function(){
  if(typeof checkUpdate != 'undefined'){
    window.checkUpdate();
  }else{
    alert('Something wrong!');
  }
}

btnSettings.onclick = function(){
  if(settingsMenu.classList.contains('leftSettings')){
    settingsMenu.classList.remove('leftSettings');
  }else{
    settingsMenu.classList.add('leftSettings');
  }
}

closeSettings.onclick = btnSettings.onclick;

hideBtn.onclick = function(){
  win.minimize();
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
}
setSlide(0);

window.canUse = 1;

onload = function(){
  listSearch.style.display = 'none';
try{
  versionUsing.innerText += fs.readFileSync(updaterSYP.fileVersion).toString();
}catch(e){
  if(!isBrowser){
    versionUsing.innerText = 'Can\'t get version';
    console.warn(e);
  }
}

var cm = contextMenu.new();

cm.add(contextMenu.button('DevTool Chromium','img/devtool.png',function(){win.showDevTools()}));

cm.add(contextMenu.button('Reload app','img/reload.png',function(){updaterSYP.reloadApp()}));

cm.add();

oncontextmenu = function(e){
  cm.open(e.clientX, e.clientY);
	e.preventDefault();
  return false;
}

onclick = function(){
  cm.close();
}

var p = sypStorage.get('lastUrl');
if(p){
  document.getElementById('youtube').src = p;
}

window.execCode = function(code){document.getElementById('youtube').executeScript({code:code});}

document.getElementById('youtube').onloadstart = function(){
window.canUse = 1;
}
window.onceOnLoadYt = function(){
  var p = sypStorage.get('positionPlay');
  if(p){
    setPlayPos2(p);
  }
  setTimeout(function(){
    loadingScreen.classList.add('fadeOut');
  }, 1300);
  easyrp.init();
  window.onceOnLoadYt = function(){};
}
document.getElementById('youtube').onloadstop = function(){
    // easyrp.update();
    window.onceOnLoadYt();
    var p = sypStorage.get('volume');
    if(typeof p == 'number'){
      setVolumeReal(p);
    }else{
      setVolumeReal(100);
    }
    window.canUse = 0;
    var url = yt.src;
    clearList();
    if(url.replace('results?','') != url){
        getSearch();
    }
    sypStorage.set('lastUrl', url);
    var idVideo;
    if(url.split('?v=')[1]){

    idVideo = url.split('?v=')[1].split('&')[0];

    document.body.style.background = '';

    thumbnail.src = 'http://img.youtube.com/vi/' + idVideo + '/default.jpg';
    setTimeout(function(){
      yt.executeScript({
          code: `document.getElementsByClassName('style-scope ytd-video-primary-info-renderer').info.getElementsByTagName('yt-formatted-string')[1].innerText`
        }, result => {
          likes.innerText = result[0];
      });
      yt.executeScript({
          code: `document.getElementsByClassName('style-scope ytd-video-primary-info-renderer').info.getElementsByTagName('yt-formatted-string')[2].innerText`
        }, result => {
          dislikes.innerText = result[0];
      });
    },0);
    document.body.style.backgroundImage = 'url("http://img.youtube.com/vi/' + idVideo + '/hqdefault.jpg")';
    playerContent.style.display = 'block';
    }else{
        document.body.style.backgroundImage = '';
        document.body.style.background = 'red';
        playerContent.style.display = 'none';
    }

    window.uuid = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
    window.uuid = 's' + window.uuid;
    execCode('self.' + uuid + '={};');

    execCode(uuid + `.getRecommendations = function(){
        var p = document.getElementsByTagName('ytd-watch-next-secondary-results-renderer')[0]
            p = p.getElementsByClassName('metadata style-scope ytd-compact-video-renderer');
			      var s = \`\n\`
            var i = 0;
            var g = '';
            while(i!=p.length){
                g += p[i].innerText.replace(new RegExp(s, 'g'),' ⏩ ') + s;
                i++;
            } return g;}`);
    execCode(uuid + `.getResultSearch = function(){
      var l = document.getElementsByClassName('yt-simple-endpoint style-scope ytd-video-renderer');
      var i = 0;
      var s = \`\n\`
      var t = '';
      while((l.length)!=i){
        t = t + l[i].innerText + s;
        i++;
      }
      return t;
    }`);
    execCode(uuid + `.goOutDialog = function(){
      try{var p = document.getElementsByClassName('style-scope yt-confirm-dialog-renderer no-padding scrolled-to-bottom'); if(p){p=p[0];}if(p){p.parentElement.getElementsByClassName('yt-simple-endpoint style-scope yt-button-renderer')[0].click();}}catch{}
    }`);
    execCode(uuid + `.getHelpfulResult = function(){
      var p = document.getElementsByClassName('gstl_50 sbdd_a')[0].getElementsByClassName('sbse');
      var i = 0, t = '';
      var l = \`\n\`;
      while(p.length != i){
      	t += p[i].innerText + l;
      	i++;
      }
      return t;
    }`);

    execCode(uuid + `.clickHelpfulResult = function(v){
      document.getElementsByClassName('gstl_50 sbdd_a')[0].getElementsByClassName('sbse')[v].click();
    }`);

    execCode(uuid + `.checkOnline = function(){
      var p = ` + nve + `;
      if(p){
          p = p[0].style;
          if(p){
            p = p.top;
            if(p){
              return (p == '0px');
            }
          }
      }
      return false;
    }`);

    execCode(uuid +  `.getPause = function(){
      var p = ` + nve + `;
      if(p){
          return p[0].paused;
        }
      return true;
    }`);

    /* Skip AD */

    execCode('var em = document.getElementsByClassName("ytp-large-play-button ytp-button")[0]; if(em) if(em.parentElement) if(em.parentElement.style.display != "none") em.click();');

    execCode("setInterval(function(){var p = document.getElementsByClassName('ytp-ad-skip-button ytp-button')[0]; if(p) p.click(); var d = document.getElementsByClassName('ytp-upnext-autoplay-icon')[0]; if(d) if(d.parentElement.style.display != 'none') d.click();},100); ");

    if(idVideo){
        yt.executeScript({
                code: `document.title`
            }, result => {
              if(result){
                if(result[0]){
                  this.title = result[0];
                }else{
                  this.title = yt.title
                }
              }
              const title = this.title.replace(' - YouTube','')
              document.getElementById('name').getElementsByTagName('marquee')[0].innerText = title;
              document.title = title + ' - SYP Player';
        });
        yt.executeScript({
        code: `document.getElementsByClassName('style-scope ytd-video-owner-renderer')[2].getElementsByTagName('a')[0].innerText`
        }, result => {
                document.getElementById('name').getElementsByTagName('p')[1].innerText = 'Made by: '+ result[0];
        });
    window.getRecommendations();
}}}

window.getRecommendations = function(){
        yt.executeScript({
        code: uuid + '.getRecommendations()'
        }, result => {
              if(result){
                if(result[0] != null){
                  window.vRecommendations = result[0];
                  openRecommendations();
                }
              }
        });
}

pause = function(){
  if(isBrowser){
    performActionRemote('pause');
  }else{
    execCode(nve + "[0].pause();");
  }
}

function getActionPerfURL(action) {
  var a = serverAddress.replace('https://', '');
  if(location.origin != 'file://'){
    a = a.replace(':' + portServer, '');
  }
  return a + '/sypplayer?uuid=' + localStorage.SYPPlayerUUID + '&command=' + action;
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
function performActionRemote(action) {
  var url = getActionPerfURL(action);
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
          document.body.style.backgroundImage = 'url("' + xhr.responseText + '")';
          thumbnail.src = xhr.responseText;
          infoLoad();
        }
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
        window.playing = Boolean(Number(xhr.responseText));
        btnPlay.setIcon(playing);
      }
    }
  };
  xhr.send(null);
}
play = function(){
  if(isBrowser){
    performActionRemote('play');
  }else{
    execCode(nve + "[0].play();");
  }
}
function infoLoad() {
  var xhr = new XMLHttpRequest();
  xhr.open("GET", getActionPerfURL('info'), true);
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
  infoLoad();
}
if(isBrowser){
  updaterforremote();
  setInterval(updaterforremote, 1000*2);
}
nextTrack = function(){
  if(isBrowser){
    performActionRemote('nextTrack');
  }else{
    execCode("document.getElementsByClassName('ytp-next-button ytp-button')[0].click();");
  }
}

replayTrack = function(){
  if(isBrowser){
    performActionRemote('replayTrack');
  }else{
    execCode("var p = document.getElementsByClassName('ytp-prev-button ytp-button')[0];if(p.style.display=='none'){ window.history.back()}else{p.click();}");
  }
}

playBtn = function(){
  var t;
  if(isBrowser){
    t = true;
  }else{
    t = playerOnline;
  }
  if(t){
    if(playing){
      pause();
    }else{
      play();
    }
  }
  if(isBrowser){
    setTimeout(setPlayStatus, 100);
  }
}

btnReplay.onclick = replayTrack;

btnPlay.onclick = playBtn;

btnNext.onclick = nextTrack;

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
  setPlayPos2(vCurrectTime - e.deltaY/5);
}
window.percentesVolume = 0;

function setVolumeReal(p) {
  if(isBrowser){
    performActionRemote('setvolume&i=' + String(Math.floor(p)));
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
          }
        }
        if(li){
          li.appendChild(p);
        }else{
          list.appendChild(p);
        }
      }
    }
    while(i!=a.length){
      if(timeout){
        const n = i;
        setTimeout(function () {
          z(n, a);
        }, i*timeout);
      }else {
        z(i, a);
      }
        i++;
    }
    window.onresize();
}

function clearList(li){
    if(li){
      li.innerHTML = '';
    }else{
      list.innerHTML = '';
    }
}

function openRecommendations(){
    clearList();
    if(vRecommendations!=null){
      putList(vRecommendations, opnRecommendations);
    }
}

function opnRecommendations(i){
  if(isBrowser){
    performActionRemote('rec&i=' + i);
  }else{
    execCode("document.getElementsByTagName('ytd-watch-next-secondary-results-renderer')[0].getElementsByClassName('style-scope yt-img-shadow')[" + i  +"].click();");
  }
}

function getSearch(){
    execCode('window.scrollTo(0,document.body.offsetWidth * 20 );');
    setTimeout(function(){
      yt.executeScript({
          code: uuid + `.getResultSearch()`
        }, result => {
          putList(result[0], playInListSearch)
        });
      },1000);
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

function playInListSearch(i){
    execCode("document.getElementsByClassName('yt-simple-endpoint style-scope ytd-video-renderer')[" + i + "].click();");
}

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
    document.getElementById('youtube').src = url;
  }catch{
    document.getElementById('youtube').src = alt(e);
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

searchImg.onclick = function(){ searchR.onkeyup({key: 'Enter'}); };

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
      while(i != a.length){
          z.push(a[i][0]);
          i++;
      }
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

function openSearch(text){
    execCode("document.getElementsByClassName('style-scope ytd-searchbox')[0].getElementsByTagName('button')[0].click();");
}
function setPlayPos(x){
    if(isBrowser){
      performActionRemote('timeset&i=' + vDuration / 100 * (x / sliderT.offsetWidth * 100));
    }else{
      execCode("var p = " + nve + "[0]; d = p.duration / 100 * Number(" + String(x / sliderT.offsetWidth * 100) + "); p.currentTime = d;");
    }
    setSlidePX(x);
}
function setPlayPos2(x){
  if(isBrowser){
    performActionRemote('timeset&i=' + x);
  }else{
    execCode(nve + '[0].currentTime = Number(' + x +');');
  }
}
function setVolume(v){
  if(!isBrowser){
    execCode(nve + '[0].volume = ' + (Number(v)/100));
  }
}

window.vCurrectTime = 0;
window.vDuration = 0;

secToTime = function(sec){
    if(new Date(sec * 1000).toISOString().substr(11, 2) == 00){
        return (new Date(sec * 1000).toISOString().substr(14, 5));
    }else{
        return (new Date(sec * 1000).toISOString().substr(11, 8));
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
setInterval(function(){
  if(!isBrowser){
    if(window.canUse == 0){
      yt.executeScript({
          code: uuid + '.checkOnline()'
        }, result => {
          try{
            window.playerOnline = result[0];
          }catch{

          }
      });
        yt.executeScript({
            code: uuid + '.getPause();'
          }, result => {
            try {
              window.playing = !result[0];
            } catch {

            }
        });
        execCode(uuid + '.goOutDialog()');
      if(playerOnline){
        btnPlay.setIcon(playing);
      }
      if(window.playerOnline){
        if(!statusClick){
        yt.executeScript({
            code: nve + '[0].currentTime + "|" + ' + nve + '[0].duration;'
          }, result => {
            try {
              updateTime(result[0]);
            } catch {

            }
          });
        }
      }
    }
  }else{
    window.playerOnline = false;
  }

},100);
