var pf = {};
pf.debug = false;
pf.repeat = function (util, func, ov) {
  const detectWhile = 100000;
  const debug = pf.debug;
  if(typeof util != 'undefined'){
    var usingFunction = 'for';
    if(typeof util == 'number'){
      if(util > detectWhile){
        usingFunction = 'while';
      }
    }
    if(typeof ov == 'string'){
      usingFunction = ov;
      if(!(ov == 'for' || ov == 'while')){
        if(debug){
          console.warn('pf.js: Wrong override string!');
        }
      }
    }
    if(debug){
      console.log(usingFunction);
    }
    if(typeof util == 'object'){
      if(util.length){
        if(typeof util.length == 'number'){
          util = util.length;
        }
      }
    }
    if(typeof util == 'string'){
      util = Function('function(i){return ' + util + '}');
    }
    if(usingFunction == 'for'){
      if(typeof util == 'number'){
        for (var i = 0; i < util; i++) {
          func(i);
        }
      }
      if(typeof util == 'function'){
        for (var i = 0; !util(i); i++) {
          func(i);
        }
      }
      if(typeof util == 'boolean'){
        for (var i = 0; !util; i++) {
          func(i);
        }
      }
    }
    if(usingFunction == 'while'){
      if(typeof util == 'number'){
        var i = 0;
        while(i != util){
          func(i);
          i++;
        }
      }
      if(typeof util == 'function'){
        var i = 0;
        while(!util(i)){
          func(i);
          i++;
        }
      }
      if(typeof util == 'boolean'){
        var i = 0;
        while(!util){
          func(i);
          i++;
        }
      }
    }
    return true;
  }else{
    return false;
  }
}
