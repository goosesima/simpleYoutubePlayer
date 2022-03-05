// Import axios, fs if not already present.

const appReload = function(){
  if(chrome){
    if(chrome.runtime){
      if(chrome.runtime.reload){
        return chrome.runtime.reload();
      }
    }
  }
  if (location){
    location.href = location.href;
    return;
  }
  console.error('Error appReload!');
}

var appUpdater = {
  url: 'https://raw.githubusercontent.com/goosesima/simpleYoutubePlayer/master/package.json',
  packagejsonPath: './package.json',
  getVersion: function (config){
    if(typeof config == 'object'){
      return config.version;
    }
    try {
      const obj = JSON.parse(config);
      return obj.version;
    } catch (error) {
      return {error: error};
    }
  },
  cache: null,
  localVersion: async function (){
    if (appUpdater.cache){
      return appUpdater.cache;
    }
    var data = {cfggit: null, cfgloc: null, vergit: null, verloc: null, latest: null};
    try {
      data.cfgloc = fs.readFileSync(appUpdater.packagejsonPath, { encoding: 'utf8' });
    } catch (error) {
      return { error: error };
    }
    data.verloc = appUpdater.getVersion(data.cfgloc);
    if(!data.error) {
      appUpdater.cache = data;
    }
    return data;
  },
  checkVersion: async function (){
    var data = await appUpdater.localVersion();
    if(data.error) return data;
    try {
      const response = await axios.get(appUpdater.url);
      data.cfggit = response.data;
    } catch (error) {
      return {error: error};
    }
    data.vergit = appUpdater.getVersion(data.cfggit);
    if (typeof data.vergit == 'object') {
      return data.vergit.error;
    }
    if (typeof data.verloc == 'object') {
      return data.verloc.error;
    }
    if(data.vergit != data.verloc){
      data.latest = false;
    }else{
      data.latest = true;
    }
    return data;
  },
  check: async function (){
    if(alert){
      const data = await appUpdater.checkVersion();
      if(data.error){
        alert(appUpdater.strings.error);
        return console.log(data.error);
      }
      if(data.latest){
        alert(appUpdater.strings.latestVersion, true);
      }else{
        alert(appUpdater.strings.newVersion.replace('CURVER', data.verloc).replace('NEWVER', data.vergit), true);
      }
    }
  }
};

appUpdater.strings = {
  newVersion: 'New version: NEWVER\nInstalled version: CURVER\nYou need to upgrade!',
  latestVersion: 'You are using latest version!',
  error: 'Error check version!'
};

appUpdater.check();