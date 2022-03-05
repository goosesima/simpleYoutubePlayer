includeIdE = function(){
  var e = document.body.getElementsByTagName("*");
  var i = 0;
  for (var i = 0; i < e.length; i++) {
    if(e[i].id != ""){
      const t = e[i].id;
      window[t] = document.getElementById(t);
      global[t] = window[t];
    }
  }
}

function closeFullscreen() {
  if (document.exitFullscreen) {
    document.exitFullscreen();
  } else if (document.webkitExitFullscreen) { /* Safari */
    document.webkitExitFullscreen();
  } else if (document.msExitFullscreen) { /* IE11 */
    document.msExitFullscreen();
  }
}
function openFullscreen(elem) {
  if (elem.requestFullscreen) {
    elem.requestFullscreen();
  } else if (elem.webkitRequestFullscreen) { /* Safari */
    elem.webkitRequestFullscreen();
  } else if (elem.msRequestFullscreen) { /* IE11 */
    elem.msRequestFullscreen();
  }
}
var win = nw.Window.get();

// win.showDevTools();
win.setMinimumSize(400,500);

win.resizeTo(400,220);

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
window.page = '';
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
setSlide(0);
function advancedList(list, data) {
  if(list){
    var i = 0;
    pf.repeat(data, function (i) {
      var div = document.createElement('div');
      div.classList.add('div-adl');
      if(data[i].img || data[i].thumbnail){
        var img = document.createElement('img');
        img.classList.add('img-adl');
        img.src = data[i].img || data[i].thumbnail;
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
            setpage(n);
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
    list.scroll(0, 0);
  }
}
global.advancedList = advancedList;
setInterval(function () {
  listSearch3(true);
}, 3000);
function searchMediaForKeyword(i, e) {
  searchMedia(e);
  searchR.value = '';
  listSearch2 = false;
  listSearch3(true);
}
function putList(l, f, li, timeout){ //Remove this function in future
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
}

function clearList(li){
    if(li){
      li.innerHTML = '';
    }else{
      list.innerHTML = '';
    }
}
global.clearList = clearList;

setIconPlay = function (bool) {
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

initSYP = function(){
  includeIdE();

  futureplayer.ontimeupdate = function () {
    if(String(futureplayer.duration) == 'NaN'){
      updateTime(futurevideo.currentTime + '|' + futurevideo.duration);
    }else{
      updateTime(futureplayer.currentTime + '|' + futureplayer.duration);
    }
  }
  futurevideo.ontimeupdate = function () {
    if(String(futureplayer.duration) == 'NaN'){
      futureplayer.ontimeupdate();
    }
  }
  futureplayer.onpause = futureplayer.onplaying = function () {
    window.playing = !futureplayer.paused;
    if(futurevideo.networkState === futurevideo.NETWORK_LOADING){
    }else{
      if(futurevideo.networkState != 1){
        futurevideo.paused = futureplayer.paused;
        setCT(futureplayer.currentTime);
      }
    }
    setIconPlay(playing);
  }
  futurevideo.onpause = futurevideo.onplaying = function (e) {
    if(futurevideo.networkState === futurevideo.NETWORK_LOADING){
      if(futureplayer.playing){
        futureplayer.pause();
      }
    }
    if (futurevideo.readyState == futurevideo.HAVE_CURRENT_DATA) {
      futureplayer.currentTime = futureplayer.duration / futurevideo.duration * futurevideo.currentTime;
      futureplayer.paused = window.playing;
    }
    if(String(futureplayer.duration) == 'NaN'){
      window.playing = !futurevideo.paused;
      setIconPlay(playing);
    }
  }
  futureplayer.addEventListener("ended", function(){
       if(autoplayenabled.checked){
         nextTrack();
       }
  });
  futureplayer.addEventListener("ended", function(){
    if(String(futureplayer.duration) == 'NaN' && autoplayenabled.checked){
      nextTrack();
    }
  });
  sliderTMusic.onwheel = function(e){
    e.preventDefault();
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
  btnAudioQ.onclick = function () {
    qualitySettings('audio');
  }
  btnVideoQ.onclick = function () {
    qualitySettings('video');
  }
  sliderT.onpointerdown  = function(e){
      statusClick = true;
      if((e.clientX - sliderT.offsetLeft) > -1){
        if(e.clientX < (sliderT.offsetLeft + sliderT.getBoundingClientRect().width)){
          e.preventDefault();
          setPlayPos(e.clientX - sliderT.offsetLeft);
        }
      }
  }
  document.onpointermove = function(e){
      if(statusClick){
          if((e.clientX - sliderT.offsetLeft) > -1){
            if(e.clientX < (sliderT.offsetLeft + sliderT.getBoundingClientRect().width)){
              setPlayPos(e.clientX - sliderT.offsetLeft);
              e.preventDefault();
          }
        }
      }
      if(statusClickMusic){
        sliderMusicP(e);
        e.preventDefault();
      }
  }
  sliderT.onwheel = function(e){
    e.preventDefault();
    var n = vCurrectTime;
    if(navigator.userAgent.indexOf("Firefox") !== -1){
      n-=e.deltaY*4;
    }else{
      n-=e.deltaY/5;
    }
    setPlayPos2(n);
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
        e.preventDefault();
        setVolumeReal(p);
      }
    }
  }
  searchR.onkeyup = function(e){
      if(e.key == 'Enter'){
          if(searchR.value.length > 0){
              searchMedia(searchR.value);
              searchR.value = '';
              clearList(listSearch);
          }
      }
  }
  searchR.oninput = function(){
      plugins.quicksearch(searchR.value).then(function (e) {
        clearList(listSearch);
        putList(e.join('\n'), searchMediaForKeyword, listSearch, 20);

        listSearch2 = true;
        listSearch3(false);
      });
  }
  searchImg.onclick = function(){ searchR.onkeyup({key: 'Enter'}); vibrationPhone(); };
  matrixbutton.onclick = function () {
    openInBrowser('https://matrix.to/#/#syp:matrix.org');
    vibrationPhone();
  }
  nwjsbutton.onclick = function () {
    openInBrowser('https://nwjs.io/');
    vibrationPhone();
  }
  playBrowser.onclick = function(){
    openInBrowser(page);
    vibrationPhone();
  }
  if(!isBrowser){
    installSyp.onclick = function(){
      openInBrowser(serverAddress);
      vibrationPhone();
    }
    hideBtn.onclick = function(){
      win.minimize();
      vibrationPhone();
    }

    closeBtn.onclick = function(){
      sypStorage.set('volume', window.percentesVolume);
      sypStorage.set('positionPlay', vCurrectTime - 1);
      win.close();
      vibrationPhone();
    }
    sypremoteport.onchange = function(){
      const a = Number(sypremoteport.value);
      if(a>-1 && 65536>a)
      sypStorage.set('sypport', sypremoteport.value);
    }
    allowsypremote.onchange = function(){
      sypStorage.set('allowsypremote', String(allowsypremote.checked));
    }
    sypremoteport.value = portServer;
    changelogopen.onclick = function () {
      window.open('https://raw.githubusercontent.com/GooseSima/simpleYoutubePlayer/master/player/CHANGELOG.txt');
      vibrationPhone();
    }
    autoplayenabled.oninput = function () {
      sypStorage.set('autoplayenabled', autoplayenabled.checked);
    }
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
    listSearch.style.display = 'none';
  try{
    appUpdater.localVersion().then(function(data){
      versionUsing.innerText += String(data.verloc);
    });
  }catch(e){
    if(!isBrowser){
      versionUsing.innerText = 'Can\'t get version';
      console.warn(e);
    }else{
      versionUsing.innerText = versionUsing.innerText.replace(' v', '');
    }
  }

  try {
    const allrc = sypStorage.get('allowsypremote');
    if(typeof allrc != 'undefined'){
      allowsypremote.checked = Boolean(allrc);
    }
  } catch (e) {

  }
  var cm = contextMenu.new();

  cm.add(contextMenu.button('DevTool Chromium','img/devtool.png',function(){win.showDevTools()}));

  cm.add(contextMenu.button('Reload app','img/reload.png', sypReload));

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
          var path = file.path;
          if(path[0] == '/'){
            path = 'file://' + path;
          }
          path = encodeURI(path);
          if(supportedFormat){
            setpage(path)
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
  btnReplay.onclick = function () {
    vibrationPhone();
    replayTrack();
  };

  window.onkeyup = function (e) {
    if(e.key == 'Escape'){
      if(document.webkitIsFullScreen){
        closeFullscreen();
      }
    }
    if(e.key == 'F11'){
      if(!document.webkitIsFullScreen){
        openFullscreen(futurevideo);
      }
    }
  }

  btnFullscreen.onclick = function () {
    if(!isBrowser){
      openFullscreen(futurevideo);
    }else{
      alert("Only server side is supported");
    }
  }
  btnPlay.onclick = playBtn;

  btnNext.onclick = function () {
    vibrationPhone();
    nextTrack();
  };

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
}
