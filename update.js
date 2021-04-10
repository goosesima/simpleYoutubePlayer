//Updater made by SimaKyr
//Using jszip

var fs = require('fs');

window.updaterSYP = {};

updaterSYP.gitUrlZip = 'https://github.com/SimaKyr/simpleYoutubePlayer/archive/master.zip';
updaterSYP.repositoryName = 'simpleYoutubePlayer-master';
updaterSYP.appName = 'SYP Player';
updaterSYP.repositoryName += '/';
updaterSYP.fileVersion = 'VERSION';
updaterSYP.checkUpdate
updaterSYP.checkUpdate = function (onnewupdate, onnoupdate, dev, og) {
  if(typeof JSZip != 'function'){
    var xhr = new XMLHttpRequest();
    xhr.open("GET", "https://raw.githubusercontent.com/Stuk/jszip/master/dist/jszip.min.js", true);
    xhr.onload = function (e) {
      if (xhr.readyState === 4) {
        if (xhr.status === 200) {
          Function(httpGet(xhr.responseText))();
          updaterSYP.checkUpdate2(onnewupdate, onnoupdate, dev, og);
        }
      }
    };
    xhr.onerror = function (e) {
      console.error(xhr.statusText);
    };
    xhr.send(null);
  }else{
    updaterSYP.checkUpdate2(onnewupdate, onnoupdate, dev, og);
  }
};

function httpGet(theUrl){
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.open( "GET", theUrl, false ); // false for synchronous request
    xmlHttp.send( null );
    return xmlHttp.responseText;
}



updaterSYP.checkUpdate2 = function(onnewupdate, onnoupdate, dev, og){
  var xhr = new XMLHttpRequest();
  xhr.open('GET', updaterSYP.gitUrlZip, true);
  xhr.responseType = 'blob';
  xhr.onload = function(e) {
    if(this.status == 200) {
      var zip = new JSZip();
      zip.loadAsync(this.response).then(function(zip){ /* Load zip */
        var verfile = zip.file(updaterSYP.repositoryName + updaterSYP.fileVersion);
        verfile.async("string").then(function(versionRep){
        var versionHere;
        try{
          versionHere = fs.readFileSync(updaterSYP.fileVersion).toString();
          if(dev != 'update'){
            if(versionRep != versionHere) onnewupdate(versionRep, versionHere);
            if(versionRep == versionHere) onnoupdate();
          }
          else{
            var fake = true; // Make fake upgrade files
            var updateFile = function(nameFile){
              if(!fake){
                var wstream = fs.createWriteStream(nameFile);
                zip.files[updaterSYP.repositoryName + nameFile].pipe(wstream);
                wstream.end();
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
          catch{ console.warn('Where goes file VERSION in app dir?'); }
        });
      });
      }
    }
  xhr.send();
}

updaterSYP.upgradeApp = function(onendupgrade){
  updaterSYP.checkUpdate(function(){}, function(){}, 'update', onendupgrade);
}
updaterSYP.reloadApp = function(){ location.reload(); };

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
