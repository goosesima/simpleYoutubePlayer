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
  process = {};
  process.cwd = function () {
    return 'there is may be path, but not this time!'
  }
  window.require = function (e) {
    if(e == 'os') {
      var os = {};
      os.networkInterfaces = function () {
        return {'Loopback Pseudo-Interface':[{'address': '127.0.0.1', 'internal': true, 'type': 'IPv4'}], 'Ethernet':[{'address': '192.255.255.255', 'internal': true, 'type': 'IPv4'}]}
      }
      return os;
    }
    if(e == 'child_process'){
      var child_process = {};
      child_process.execFile = 'what?';
      return child_process;
    }
    if(e == 'path'){
      var path = {};
      path.join = function () {
        var args = arguments;
        var out = '';
        var i = 0;
        while(i != args.length) {
          out += args[i] + '/';
          i++;
        }
        return out;
      }
      return path;
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
    const forremove = ['norc', 'windowBar'];
    var i = 0;
    while(i != forremove.length) {
      document.getElementById(forremove[i]).remove();
      i++;
    }
  }
  function httpGetAsync(theUrl, callback){
      var xmlHttp = new XMLHttpRequest();
      xmlHttp.onreadystatechange = function() {
          if (xmlHttp.readyState == 4 && xmlHttp.status == 200)
              callback(xmlHttp.responseText);
      }
      xmlHttp.open("GET", theUrl, true); // true for asynchronous
      xmlHttp.send(null);
    }
  document.addEventListener("DOMContentLoaded", ready);
    document.addEventListener('readystatechange', function () {
      if(document.readyState == 'complete'){
        const axioss = document.createElement('script');
        axioss.type = 'text/javascript';
        axioss.src = 'lib/axios.min.js';
        document.head.appendChild(axioss);

        const pfjs = document.createElement('script');
        pfjs.type = 'text/javascript';
        pfjs.src = 'lib/pf.js';
        document.head.appendChild(pfjs);
        httpGetAsync('lib/sypstorage.js', function (e) {
          window.sypStorage = {};
          e = e.replaceAll('module.exports', 'window.sypStorage');
          Function(e)();
          setTimeout(function () {
            onceOnLoad();
          }, 1000);
        });
      }
    });
}
