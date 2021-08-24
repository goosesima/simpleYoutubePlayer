//Updater made by SimaKyr
//Using jszip

var fs = require('fs');
const axios = require('axios');
const JSZip = require('jszip');
if(typeof window == 'undefined'){
  window = {};
  updaterSYP = {};
  updaterSYP.isNWJS = false;
  console.warn('*Node.js currently !only! can run updater for application when files are broken.')
}else{
  window.updaterSYP = {};
  updaterSYP.isNWJS = true;
}

updaterSYP.gitUrlZip = 'https://github.com/SimaKyr/simpleYoutubePlayer/archive/master.zip';
updaterSYP.repositoryName = 'simpleYoutubePlayer-master';
updaterSYP.appName = 'SYP Player';
updaterSYP.repositoryName += '/';
updaterSYP.fileVersion2 = updaterSYP.fileVersion = 'package.json';
updaterSYP.workingpath = '';
try {
  if (fs.existsSync('player.js')) {
    updaterSYP.fileVersion2 = '../package.json';
    updaterSYP.workingpath = '..';
  }
} catch (e){
}
updaterSYP.checkUpdate = function(onnewupdate, onnoupdate, dev, og){
  axios.get(updaterSYP.gitUrlZip, { responseType: 'arraybuffer' }).then(function (e) {
    var zip = new JSZip();
    zip.loadAsync(e.data).then(function(zip){ /* Load zip */
      var verfile = zip.file(updaterSYP.repositoryName + updaterSYP.fileVersion);
      verfile.async("string").then(function(versionRep){
      versionRep = JSON.parse(versionRep).version;
      var versionHere;
      try{
        try{
          versionHere = JSON.parse(fs.readFileSync(updaterSYP.fileVersion2).toString()).version;
          if(typeof versionHere == 'undefined'){
            versionHere = 'notinstalled';
          }
        }catch (e){
          versionHere = 'errorpackagejson';
        }
        if(dev != 'update'){
          if(versionRep != versionHere) onnewupdate(versionRep, versionHere);
          if(versionRep == versionHere) onnoupdate();
        }
        else{
          var fake = false; // Make fake upgrade files
          var updateFile = function(nameFile){
            if(!fake){
              var wstream = fs.createWriteStream(updaterSYP.workingpath + nameFile);
              var writer = zip.files[updaterSYP.repositoryName + nameFile].nodeStream();
              writer.on('finish', () => {
                wstream.end();
              });
              writer.pipe(wstream);
            }else{
              console.log('Fake upgrade:' + updaterSYP.repositoryName + nameFile);
            }
          }
          var createDir = function(dir){
            if(!fake){
              if (!fs.existsSync(dir)){
                  fs.mkdirSync(dir);
              }
            }else{
              console.log('Fake create dir:' + updaterSYP.repositoryName + dir);
            }
          }
          var fileNames = Object.keys(zip.files);
          var i = 0;
          while(i!=fileNames.length){
              var p = fileNames[i].replace(updaterSYP.repositoryName,'');
              if(p!=''){
                if(p.substring(p.length-1,p.length) == '/'){
                  createDir(p);
                }else{
                  updateFile(p);
                }
            }
            i++;
          }
          if(typeof og != 'undefined') og();
        }
      }
        catch(e){ console.log(e);console.warn('Where goes file VERSION in app dir?'); }
      });
    });
  }).catch(function (e) {
    console.log(e);
  });
}

updaterSYP.upgradeApp = function(onendupgrade){
  updaterSYP.checkUpdate(function(){}, function(){}, 'update', onendupgrade);
}
updaterSYP.reloadApp = function(){
  if(updaterSYP.isNWJS){
    chrome.runtime.reload()
  }else{
    console.log('**Trying to restart...**\n**Error! You need NW.JS to use this application.**\n**Tip: Restart using command line**')
  }
};

window.checkUpdate = function(){
  updaterSYP.checkUpdate(function(v1, v2){
    confirm('New version: ' + v1 + '\nYour version: ' + v2 + '\nUpgrade?',function(e){
      if(e){
        updaterSYP.upgradeApp(
        function(){
          confirm('Upgraded! Reload app?',function(e){if(e){updaterSYP.reloadApp();}});
        });
      }
    });
  }, function(){ alert('You are using latest version!', true)},'do not delete this');
}
if(!updaterSYP.isNWJS){
  alert = function (e, t) {
    console.warn(e);
  }
  confirm = function (text, then) {
    console.warn(`================CONFIRM================\n${text}\n================================`);
    then(true);
  }
  window.checkUpdate();
}
