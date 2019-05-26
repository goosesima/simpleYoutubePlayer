var fs = require('fs');

function simpleReadFileSync(filePath)
{
    var options = {encoding:'utf-8', flag:'r'};

    var buffer = fs.readFileSync(filePath, options);

    return buffer;
}

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

var slider = document.getElementById('statusP');

var sliderT = document.getElementById('status');

var thumbnail = document.getElementById('thumbnail');

var win = nw.Window.get();

var playBrowser = document.getElementById('playBrowser');

var playerContent = document.getElementById('playerContent');

var more = document.getElementById("more");

var searchBox = document.getElementById('searchBox');

var time = document.getElementById('time');

playBrowser.onclick = function(){
   require('nw.gui').Shell.openExternal( document.getElementById('youtube').src );
   return false;    
}

win.setMinimumSize(400,500)

win.resizeTo(400,220)

var btnReplay = document.getElementById('btnReplay');
var btnNext = document.getElementById('btnNext');
var btnPlay = document.getElementById('btnPlay');

var urlYt = document.getElementById('urlYt');
win.setAlwaysOnTop(true);

setSlide = function(val){
    slider.style.marginLeft = val + '%';
}
setSlidePX = function(val){
    slider.style.marginLeft = val + 'px';
}
getSlide = function(val){
    return Number(slider.style.marginLeft.replace('%',''));
}

document.getElementById('close').onclick = function(){win.close();}
setSlide(0);

window.canUse = 1;

onload = function(){

simpleCheckFile('lastUrl.txt',function(e){
if(e){
    document.getElementById('youtube').src = simpleReadFileSync('lastUrl.txt');
}});

window.execCode = function(code){document.getElementById('youtube').executeScript({code:code});}

document.getElementById('youtube').onloadstart = function(){
window.canUse = 1;
}
document.getElementById('youtube').onloadstop = function(){
    window.canUse = 0;
    window.yt = document.getElementById('youtube');
    var url = yt.src;
    clearList();
    if(url.replace('results?','') != url){
        getSearch();
    }
    simpleWriteFile('lastUrl.txt',url);
    var idVideo;
    if(url.split('?v=')[1]){

    idVideo = url.split('?v=')[1].split('&')[0];
    
    document.body.style.background = '';
    
    thumbnail.src = 'http://img.youtube.com/vi/' + idVideo + '/default.jpg';
    
    document.body.style.backgroundImage = 'url("http://img.youtube.com/vi/' + idVideo + '/hqdefault.jpg")';
    playerContent.style.display = 'block';
    }else{
        document.body.style.backgroundImage = '';
        document.body.style.background = 'red';
        playerContent.style.display = 'none';
    }
    
    window.uuid = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
    
    execCode('(function(){self.' + uuid + '={};})();');
    
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
    
    execCode('var em = document.getElementsByClassName("ytp-large-play-button ytp-button")[0]; if(em.parentElement.style.display != "none") em.click();');
    
    execCode("setInterval(function(){var p = document.getElementsByClassName('ytp-ad-skip-button ytp-button')[0]; if(p) p.click(); var d = document.getElementsByClassName('ytp-upnext-autoplay-icon')[0]; if(d) if(d.parentElement.style.display != 'none') d.click();},100); ");
    if(idVideo){
        
        yt.executeScript({
                code: `document.title`
            }, result => {
                this.title = result[0];
                document.getElementById('name').getElementsByTagName('marquee')[0].innerText = this.title.replace(' - YouTube','');
        });
        yt.executeScript({
        code: `document.getElementsByClassName('style-scope ytd-video-owner-renderer')[2].getElementsByTagName('a')[0].innerText`
        }, result => {
                document.getElementById('name').getElementsByTagName('p')[0].innerText = 'Made by: '+ result[0];
        });
    window.getRecommendations();
}}}

window.getRecommendations = function(){
        yt.executeScript({
        code: uuid + '.getRecommendations()'
        }, result => {
                window.vRecommendations = result[0];
                openRecommendations();
        });
}

function executeCodeAndReturn(code,main){

window.uwu = main;

window.onmessage = function(e){
    if(e.data != '/'){
            window.returnWebview = e.data;
            if(window.uwu != undefined) window.uwu()
            window.uwu = undefined;
            window.onmessage = undefined;
        }
    }

execCode(String(code).replace('return','window.uwu=').replace(new RegExp('}' + '$'), "window.onmessage = function(e){ e.source.postMessage(window.uwu,e.origin);window.uwu=undefined;window.onmessage = undefined;}").replace('function(){',''));
setTimeout(function(){
document.getElementById('youtube').contentWindow.postMessage('/',document.getElementById('youtube').src);
},1000);}

nextTrack = function(){
    execCode("document.getElementsByClassName('ytp-next-button ytp-button')[0].click();");
}

replayTrack = function(){
    execCode("var p = document.getElementsByClassName('ytp-prev-button ytp-button')[0];if(p.style.display=='none'){ window.history.back()}else{p.click();}");
}

play = function(){
execCode("var p=document.getElementsByClassName('ytp-left-controls')[0].getElementsByTagName('button')[0];p.click();");
if(btnPlay.src.replace('pause','') != btnPlay.src){
        btnPlay.src = 'img/play.png';
    }else{
        btnPlay.src = 'img/pause.png';
    }
}

btnReplay.onclick = replayTrack;

btnPlay.onclick = play;

btnNext.onclick = nextTrack;

var statusClick = false;

function changeStateD(){
    statusClick = false;
}

onmouseup = changeStateD;

function changeState(e){
    statusClick = true;
    setPlayPos(e.clientX - sliderT.offsetLeft);
}
function changeStateT(e){
    window.dada = e;
    if(statusClick){
        setPlayPos(e.clientX - sliderT.offsetLeft);
    }
}

sliderT.onmousedown = changeState;
sliderT.onpointermove = changeStateT;

var list = document.getElementById('list');

function putList(l,f){
    var a = l.split('\n');
    var i = 0;
    while(i!=a.length){
        var p = document.createElement('p');
        p.innerText = a[i];
        p.onclick = Function(f + '(' + i + ')');
        list.appendChild(p);
        i++;
    }
    window.onresize();
}

function clearList(){
    list.innerHTML = '';
}

function openRecommendations(){
    clearList();
    if(vRecommendations!=null)
    putList(vRecommendations,'opnRecommendations')
}

function opnRecommendations(i){
    execCode("document.getElementsByTagName('ytd-watch-next-secondary-results-renderer')[0].getElementsByClassName('style-scope yt-img-shadow')[" + i  +"].click();");
}
var listSelect = document.getElementById('listSelect').getElementsByTagName('p');

listSelect[0].onclick = openRecommendations;

function getSearch(){
    window.canUse = 1; 
    execCode('window.scrollTo(0,document.body.offsetWidth * 20 );');
    setTimeout(function(){
    executeCodeAndReturn(function(){var l = document.getElementsByClassName('yt-simple-endpoint style-scope ytd-video-renderer');
i=0;var t = '';while((l.length)!=i){t = t + l[i].innerText + '\n';i++;}return t;},function(){window.canUse = 0;putList(returnWebview,'playInListSearch')});
},1000);}

var contentWin = document.getElementById('contentWin');

onresize = function(){
    list.style.height = (innerHeight - list.offsetTop - contentWin.offsetTop) + 'px'; 
    contentWin.style.height = (innerHeight - contentWin.offsetTop*2) + 'px';
    searchBox.style.width = (innerWidth - searchBox.offsetLeft - contentWin.offsetLeft*2) + 'px';
}

onresize();

function playInListSearch(i){
    execCode("document.getElementsByClassName('yt-simple-endpoint style-scope ytd-video-renderer')[" + i + "].click();");
}

searchR.onkeyup = function(e){
    if(e.key == 'Enter'){
        if(searchR.value.length>0){
            var p = document.createElement('a');
            p.href = String(searchR.value);
            if(p.hostname == 'youtu.be' || p.hostname == 'www.youtu.be' ||
                p.hostname == 'youtube.com' || p.hostname == 'www.youtube.com'){
                    document.getElementById('youtube').src = searchR.value;
            }else{
                openSearch(searchR.value);
            }
            searchR.value = '';
        }
    }
}
function openSearch(text){
    execCode("var p = document.getElementsByClassName('topbar-icons style-scope ytd-masthead')[0]; if(p) p.click();document.getElementById('search').getElementsByTagName('input')[0].value = '" + text + "';document.getElementsByClassName('style-scope ytd-searchbox')[0].getElementsByTagName('button')[1].click();");
}
function setPlayPos(x){
    execCode("var p = document.getElementsByClassName('video-stream html5-main-video')[0]; d = p.duration / 100 * Number(" + String(x / sliderT.offsetWidth * 100) + "); console.log(d); p.currentTime = d;");
    setSlidePX(x);
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
    if(t.split('|')[1].toString()!='NaN'){
        window.vCurrectTime = Number(t.split('|')[0]);
        window.vDuration = Number(t.split('|')[1]);
        time.innerText = secToTime(vDuration) + '/' + secToTime(vCurrectTime);
        setSlide(vCurrectTime / vDuration * 100);}
}
    
setInterval(function(){
    if(window.canUse == 0){
        if(!statusClick){
    yt.executeScript({
        code: `document.getElementsByClassName('video-stream html5-main-video')[0].currentTime + '|' + document.getElementsByClassName('video-stream html5-main-video')[0].duration;`
      }, result => {
        updateTime(result[0]);
      })
        
    }}
},100);
