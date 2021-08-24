nwjsffmpeg = {};
nwjsffmpeg.fs = require('fs');
nwjsffmpeg.axios = require('axios');
nwjsffmpeg.path = require('path');
nwjsffmpeg.JSZip = require('jszip');
if(typeof window == 'undefined'){
  nwjsffmpeg.isNWJS = false;
  nwjsffmpeg.sypStorage = require('./sypstorage.js');
}else{
  nwjsffmpeg.isNWJS = true;
}

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
  if(p == s[2]){
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
  if(typeof fileUrl == 'undefined'){
    return undefined;
  }
  nwjsffmpeg.axios.get(fileUrl, { responseType: 'arraybuffer' }).then(function (e) {
    console.log('Download succesfully (nwjs-ffmpeg)', true);
    var zip = new nwjsffmpeg.JSZip();
    zip.loadAsync(e.data).then(function(zip){ /* Load zip */
      try{
          function k(){
            sypStorage.set('installed_ffmpeg', true);
            if(typeof og != 'undefined') og();
          }
          var dir = nwjsffmpeg.path.resolve(__dirname, '../..');
          if(process.platform == 'linux') {
            dir += '/lib'
          }
          var nameFile = Object.keys(zip.files)[0];
          const filepath = dir + '/' + nameFile;
          console.log(filepath);
          var wstream = nwjsffmpeg.fs.createWriteStream(filepath);
          var writer = zip.files[nameFile].nodeStream();
          writer.on('finish', function () {
            k();
          });
          writer.pipe(wstream);
        }
        catch(e){ console.warn('Error install nwjs-ffmpeg!\n' + e); }
    });
  });
}

nwjsffmpeg.ask = function(){
  if(typeof isBrowser == 'boolean'){
    if(isBrowser){
      return undefined;
    }
  }
  if(!sypStorage.get('installed_ffmpeg')){
    if(!sypStorage.get('dont_ask_installed_ffmpeg')){
      confirm('NW.JS not includes with propietary FFmpeg\nFFmpeg allow you play 99% video/music codecs\nYou need run nwjs-ffmpeg.js using nodejs',function(e){
        if(e){
          alert('Open command-line in "player/lib" folder and write "node ./nwjs-ffmpeg.js" and wait.')
        }else{
          confirm('If you need this go to Settings.\nDon\'t ask?',function(e){if(e){sypStorage.set('dont_ask_installed_ffmpeg', true)}});
        }
      });
    }
  }
}

if(!nwjsffmpeg.isNWJS){
  nwjsffmpeg.install(function(){
      console.log('FFmpeg installed. You need need reload SYP Player!')
  });
}
