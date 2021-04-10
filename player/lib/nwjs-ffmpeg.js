window.nwjsffmpeg = {};

nwjsffmpeg._version = '0.50.3';

nwjsffmpeg._getDownloadName = function(vers){
  var nameFile = 'https://github.com/iteufel/nwjs-ffmpeg-prebuilt/releases/download/';
  nameFile += vers + '/' + vers + '-';
  const s = ['linux','win32','darwin'];
  const p = process.platform;
  const a = process.arch;
  if(p == s[0]){
    nameFile += s[0];
  }
  if(p == s[1]){
    nameFile += 'win';
  }
  if(p == 'darwin'){
    nameFile += 'osx';
    if(a == 'ia32'){
      alert('You CPU 32bit + OSX don\'t support by nwjs-ffmpeg!');
      return undefined;
    }
  }
  nameFile += '-';
  if(!s.includes(p)){
    alert('You system: ' + p + ' don\'t support nwjs-ffmpeg');
    return undefined;
  }
  if(a == 'x64' || a == 'ia32'){
    nameFile += a;
  }else{
    alert('You CPU arch: ' + a + ' don\'t support by nwjs-ffmpeg!');
    return undefined;
  }
  nameFile += '.zip';
  return nameFile;
}

nwjsffmpeg.install = function(og){
  const fileUrl = nwjsffmpeg._getDownloadName(nwjsffmpeg._version);
  var xhr = new XMLHttpRequest();
  xhr.open('GET', fileUrl, true);
  xhr.responseType = 'blob';
  xhr.onload = function(e) {
    if(this.status == 200) {
      alert('Download succesfully (nwjs-ffmpeg)', true);
      var zip = new JSZip();
      zip.loadAsync(this.response).then(function(zip){ /* Load zip */
        try{
            function k(){
              sypStorage.set('installed_ffmpeg', true);
              if(typeof og != 'undefined') og();
            }
            var nameFile = Object.keys(zip.files)[0];
            var dir = './lib';

            if (!fs.existsSync(dir)){
                fs.mkdirSync(dir);
            }
            var wstream = fs.createWriteStream('./lib/' + nameFile);
            var stream = zip.files[nameFile].nodeStream().pipe(wstream);
            stream.on('finish', function () {
              // fs.copyFileSync('tmp-' + nameFile, 'lib/' + nameFile);
              // fs.unlinkSync('tmp-' + nameFile);
              k();
            });
          }
          catch(e){ console.warn('Error install nwjs-ffmpeg!\n' + e); }
      });
      }
    }
  if(fileUrl){
    xhr.send();
  }
}

nwjsffmpeg.ask = function(){
  if(typeof isBrowser == 'boolean'){
    if(isBrowser){
      return undefined;
    }
  }
  if(!sypStorage.get('installed_ffmpeg')){
    if(!sypStorage.get('dont_ask_installed_ffmpeg')){
      confirm('NW.JS not includes with propietary FFmpeg\nFFmpeg allow you play 99% video/music codecs\nDownload FFmpeg? ~5Mb',function(e){
        if(e){
          nwjsffmpeg.install(function(){
              confirm('FFmpeg installed. Reload app?',function(e){if(e){updaterSYP.reloadApp();}});
            });
        }else{
          confirm('If you need this go to Settings.\nDon\'t ask?',function(e){if(e){sypStorage.set('dont_ask_installed_ffmpeg', true)}});
        }
      });
    }
  }
}
