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
easyrp.update = async function () {
  let promise = new Promise((resolve, reject) => {
    if(!isBrowser){
      const config = { encoding: "utf8", flag: "w"};
      const madeby = 'by SimaKyr, see more in GitHub';
      if(typeof generateInfoJSON == 'function'){
        var url = currectWEBPAGE;
        try{
          url = 'youtu.be/' + new URL(currectWEBPAGE).searchParams.get('v');
        }catch{

        }
        generateInfoJSON().then(function (e) {
          const g = JSON.parse(e);
          const title = '' + g.t + ' | ' + g.a;
          return easyrp.config(title, url, madeby)
        });
      }else{
        return easyrp.config('Intialization...', 'URL: ???', madeby);
      }
    }
  }).catch(function () {
      resolve('undefined');
  });
  return await promise;
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
