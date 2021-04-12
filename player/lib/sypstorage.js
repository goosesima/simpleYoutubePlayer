window.sypStorage = {};
window.sypJSON = {};
sypStorage.storageFile = require('path').join('player', 'userdata', 'storage.json');

function simpleReadFileSync(filePath)
{
    var options = {encoding:'utf-8', flag:'r'};
    var buffer = fs.readFileSync(filePath, options);
    return buffer;
}

sypJSON.set = function(content, name, value){
  var p;
  try{
    p = JSON.parse(content);
  }catch{ p = {}; }
  p[name] = value;
  return JSON.stringify(p);
}
sypJSON.get = function(content, name){
  try{
    return JSON.parse(content)[name];
  }catch{ p = {}; }
}
sypJSON.getLength = function(content){
  try{
    return Number(Object.keys(JSON.parse(content)).length)
  }catch{
    return 0;
  }
}

sypStorage.getLength = function(){
  sypStorage.generate()
  try{
    return Number(sypJSON.getLength(simpleReadFileSync(sypStorage.storageFile)));
  }catch(e){ sypStorage.checkPerrmision(e, 'read'); }
}

sypStorage.checkPerrmision = function(e, what){
  console.error('Error ' + what + ' to: ' + sypStorage.storageFile + '\nCheck please permission to access this file.');
  console.error(e);
}

sypStorage.generate = function(onend){
  try{
    if(!fs.existsSync(sypStorage.storageFile)){
      fs.writeFileSync(sypStorage.storageFile,'{}');
    }
  }catch(e){ sypStorage.checkPerrmision(e, 'write'); }
  if(onend) onend();
}

sypStorage.generate();

sypStorage.set = function(name, value){
  sypStorage.generate(function(){
  var p;
  try{
    p = simpleReadFileSync(sypStorage.storageFile);
  }catch(e){ sypStorage.checkPerrmision(e, 'read'); }
  try{ p = sypJSON.set(p, name, value); }catch{}
  try{
    fs.writeFileSync(sypStorage.storageFile, p);
  }catch(e){ sypStorage.checkPerrmision(e, 'write'); }
  });
}
sypStorage.get = function(name){
  sypStorage.generate();
  try{
    return sypJSON.get(simpleReadFileSync(sypStorage.storageFile), name);
  }catch(e){ sypStorage.checkPerrmision(e, 'read'); }
}
sypStorage.get2 = function(namejsonfile, name){
  return sypJSON.get(sypStorage.get(namejsonfile), name);
}
sypStorage.set2 = function(namejsonfile, name, value){
  sypStorage.set(namejsonfile,sypJSON.set(sypStorage.get(namejsonfile),name,value));
}
sypStorage.getLength2 = function(namejsonfile){
  return Number(sypJSON.getLength(sypStorage.get(namejsonfile)));
}
