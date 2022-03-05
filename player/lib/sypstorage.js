var fs = require('fs');
module.exports.path = require('path');
var sypJSON = {};
sypJSON.set = (content, name, value) => {
  var p;
  try{
    p = JSON.parse(content);
  }catch(e){ p = {}; }
  p[name] = value;
  return JSON.stringify(p);
}
sypJSON.get = (content, name) => {
  try{
    return JSON.parse(content)[name];
  }catch(e){ p = {}; }
}
sypJSON.getLength = (content) => {
  try{
    return Number(Object.keys(JSON.parse(content)).length)
  }catch(e){
    return 0;
  }
}
var storageFile;
if (localStorage) {
  storageFile = 'storage.json';
}
module.exports.simpleReadFileSync = function(filePath){
  if(typeof localStorage == 'object'){
    return localStorage[filePath];
  }else{
    var options = {encoding:'utf-8', flag:'r'};
    var buffer = fs.readFileSync(filePath, options);
    return buffer;
  }
}
module.exports.getLength = function(){
  module.exports.generate()
  try{
    return Number(sypJSON.getLength(module.exports.simpleReadFileSync(storageFile)));
  }catch(e){ module.exports.checkPermission(e, 'read'); }
}
module.exports.checkPermission = function(e, what){
  console.error('Error ' + what + ' to: ' + storageFile + '\nCheck please permission to access module.exports file.');
  console.error(e);
}
module.exports.generate = function(onend){
  try{
    if(typeof localStorage == 'object'){
      if(typeof localStorage[storageFile] == 'undefined'){
        localStorage[storageFile] = '{}';
      }
    }else{
      if(!fs.existsSync(storageFile)){
        fs.writeFileSync(storageFile,'{}');
      }
    }
  }catch(e){ module.exports.checkPermission(e, 'write'); }
  if(onend) onend();
}
module.exports.set = function(name, value){
  module.exports.generate(function(){
  var p;
  try{
    p = module.exports.simpleReadFileSync(storageFile);
  }catch(e){ module.exports.checkPermission(e, 'read'); }
  try{ p = sypJSON.set(p, name, value); }catch(e){}
  try{
    if(typeof localStorage == 'object'){
      localStorage[storageFile] = p;
    }else{
      fs.writeFileSync(storageFile, p);
    }
  }catch(e){ module.exports.checkPermission(e, 'write'); }
  });
}
module.exports.get = function(name){
  module.exports.generate();
  try{
    return sypJSON.get(module.exports.simpleReadFileSync(storageFile), name);
  }catch(e){ module.exports.checkPermission(e, 'read'); }
}
module.exports.get2 = function(namejsonfile, name){
  return sypJSON.get(module.exports.get(namejsonfile), name);
}
module.exports.set2 = function(namejsonfile, name, value){
  module.exports.set(namejsonfile, sypJSON.set(module.exports.get(namejsonfile), name, value));
}
module.exports.getLength2 = function(namejsonfile){
  return Number(sypJSON.getLength(module.exports.get(namejsonfile)));
}
module.exports.generate();
