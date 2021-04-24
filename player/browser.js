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
    window.mobileCheck = function() {
      let check = false;
      (function(a){if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(a)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0,4))) check = true;})(navigator.userAgent||navigator.vendor||window.opera);
      return check;
    };
    if(window.mobileCheck()){
      window.onscroll = function(){
        document.body.scroll(0, 0);
      }
    }
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
        httpGetAsync('lib/sypstorage.js', function (e) {
          window.sypStorage = {};
          e = e.replaceAll('module.exports', 'window.sypStorage');
          Function(e)();
          setTimeout(function () {
            onceOnLoadYt();
          }, 1000);
        })
      }
    });
}
