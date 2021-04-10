window.isBrowser = false;
if(typeof require == 'undefined'){
  isBrowser = true;
  function makeid(length) {
    var result = '';
    var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for ( var i = 0; i < length; i++ ) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
  }
  if(!localStorage.SYPPlayerUUID){
    localStorage.SYPPlayerUUID = makeid(16);
  }
  window.nw = {};
  nw.Window = {};
  nw.Window.get = function () {
    var get = {};
    get.setMinimumSize = function (width, height) {
      return undefined;
    }
    get.resizeTo = function (width, height) {
      return undefined;
    }
    get.setAlwaysOnTop = function (top) {
      return undefined;
    }
    get.showDevTools = function () {
      alert('In browser we can\'t open Developer Tool. \nSo press next combination to open:\nUSE: Option + ⌘ + J (on macOS), or Shift + CTRL + J (on Windows/Linux).', true)
    }
    return get;
  }
  window.require = function (e) {
    if(e == 'os') {
      var os = {};
      os.networkInterfaces = function () {
        return {'Loopback Pseudo-Interface':[{'address': '127.0.0.1', 'internal': true, 'type': 'IPv4'}], 'Ethernet':[{'address': '192.255.255.255', 'internal': true, 'type': 'IPv4'}]}
      }
      return os;
    }
    if(e == 'fs'){
      var fs = {};
      fs.readFileSync = function (path, options) {
        if(path == 'VERSION'){
          return '???';
        }else{
          return 'ERROR!';
        }
      }
      fs.readFile = function (path, options, callback) {
        if(path == 'VERSION'){
          callback('???');
        }else{
          callback('???');
        }
      }
      fs.existsSync = function () {
        return true;
      }
      return fs;
    }
    if(e == 'https'){
      var https = {};
      https.createServer = function () {
        return { 'listen' : function () {
          return undefined;
        }}
      }
      return https;
    }
  }
  function ready(){
    const forremove = ['installSyp', 'checkupdate', 'installffmpeg', 'windowBar'];
    var i = 0;
    while(i != forremove.length) {
      document.getElementById(forremove[i]).remove();
      i++;
    }
    document.getElementById('youtube').executeScript = function () {

    }
  }
  document.addEventListener("DOMContentLoaded", ready);
    document.addEventListener('readystatechange', function () {
      if(document.readyState == 'complete'){
        setTimeout(function () {
          onceOnLoadYt();
        }, 0);
      }
    });
}
