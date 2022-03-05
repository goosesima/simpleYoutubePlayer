var fs = require('fs');
var translation = {};

/* Configs START*/
translation._defaultLanguage = 'en';
var folderWithTranslations = 'player/lang';
/* Configs END */

translation._translationReady = function(){
  console.log('Please change this function!');
}

translation._load = function(lang, o){
  translation._checkLangDIR(function(){
    var fileContent;
    try{
      fileContent = fs.readFileSync(folderWithTranslations + '/' + lang + '.json','utf8');
    }catch(er){
      console.error(er);
    }
    var t;
    try {
      t = JSON.parse(fileContent);
    }
    catch(err){
      alert('translationOn.js:\nFailed parse JSON: ' + err);
      if(!o){
        translation._load(translation._defaultLanguage, true);
      }else{
        alert('translationOn.js:\nI can\'t find default translation ): ', true);
      }
    }
    var i = 0;
    const tmp2 = Object.keys(t);
    while(i!=tmp2.length){
      if(tmp2[i].charAt(0) != '_'){
        translation[tmp2[i]] = t[tmp2[i]];
      }else{
        console.warn('translationOn.js: Skip ID: ' + tmp2[i])
      }
      i++;
    }
    translation._translationReady();
  }
  );
}

translation._list = function(func){
  translation._checkLangDIR(function(){
    fs.readdir(folderWithTranslations, (err, files) => {
      if(!err){
        func(files);
      }else{
        console.warn(err);
      }
    });
  })
}

translation._lang = function(){
  return (navigator.language || navigator.userLanguage).split('-')[0];
}

translation._checkLangDIR = function(func){
  if(fs.existsSync(folderWithTranslations)){
    func();
  }else{
    console.warn('translationOn.js: Where goes ' + folderWithTranslations);
  }
}
