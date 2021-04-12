var easyrp = {};
var exec = require('child_process').execFile;

easyrp.timestamp = function () {
  const now = new Date;
  const utc_timestamp = Date.UTC(now.getUTCFullYear(),now.getUTCMonth(), now.getUTCDate() , now.getUTCHours(), now.getUTCMinutes(), now.getUTCSeconds(), now.getUTCMilliseconds());
  return Math.floor(utc_timestamp / 1000);
}

easyrp.startTimestamp = easyrp.timestamp();

easyrp.clientID = '829665429466906675';
easyrp.cfgfile = 'player/easyrp/config.ini';
easyrp.workingPath = process.cwd();

easyrp.autoconfig = function () {
  const madeby = 'by SimaKyr, see more in GitHub';
  if(typeof generateInfoJSON == 'function'){
    var url = '???';
    if(typeof yt == 'object'){
      if(typeof yt.src == 'string'){
        url = yt.src;
      }
    }
    url = 'youtu.be/' + new URL(yt.src).searchParams.get('v');
    const g = JSON.parse(generateInfoJSON());
    const title = '' + g.t + ' | ' + g.a;
    return easyrp.config(title, url, madeby)
  }else{
    return easyrp.config('Intialization...', 'URL: ???', madeby);
  }
}
easyrp.start = function () {
  if(!easyrp.online){
    const wrkPath = path.join(easyrp.workingPath, 'player', 'easyrp');
    const options = {'cwd': wrkPath}
    const process = exec(easyrp.executable(), options, function(err, data) {
   });
   easyrp.pid = process.pid;
   easyrp.online = true;
  }
}
easyrp.stop = function () {
  if(easyrp.online){
    process.kill(easyrp.pid);
    easyrp.online = false;
  }
}
easyrp.online = false;
easyrp.update = function () {
  if(!isBrowser){
    const config = { encoding: "utf8", flag: "w"}
    fs.writeFile(easyrp.cfgfile, easyrp.autoconfig(), function (e, data) {
    });
  }
}
easyrp.config = function (details, state, hold) {
  const time = easyrp.timestamp();
  var icon = 'sypplayer';
  var placeholder = 'Just SYP Player';
  const p = window.playing;
  if(typeof p == 'boolean'){
    if(typeof vDuration != 'undefined' && typeof vCurrectTime != 'undefined'){
      easyrp.endTimeStamp = Math.floor(time + Math.floor(vDuration-vCurrectTime));
      easyrp.startTimeStamp = Math.floor(time - vCurrectTime);
    }
    if(!p){
      icon = 'paused';
      placeholder = 'Paused.';
    }else{
      icon = 'playing';
      placeholder = 'Playing...';
    }
  }else{
    easyrp.endTimeStamp = time;
    easyrp.startTimeStamp = time;
  }
  return `[Identifiers]
ClientID=${easyrp.clientID}

[State]
State=${state}
Details=${details}
StartTimestamp=${easyrp.startTimeStamp}
EndTimestamp=${easyrp.endTimeStamp}

[Images]
LargeImage=sypplayer
LargeImageTooltip=${hold}
SmallImage=${icon}
SmallImageTooltip=${placeholder}`
}
easyrp.executable = function () {
  const p = process.platform;
  if(p == 'win32'){
    return 'easyrp.exe';
  }else{
    if(p == 'linux'){
      return 'easyrp';
    }else{
      console.log('You platform don\'t support: EASYRP');
      return 'error';
    }
  }
}

easyrp.init = function () {
  if(!isBrowser){
    easyrp.update();
    easyrp.start();
    setInterval(function () {
      try {
        easyrp.update();
      } catch (e) {

      }
    }, 400);
  }
}
