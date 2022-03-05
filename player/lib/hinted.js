window.hintedJS = {};

hintedJS.default = function(){
  hintedJS._style = 'simple';
  hintedJS.hintText = 'Hint';
  hintedJS.enabled = true;
  hintedJS.shadow = true;
}

hintedJS.default();

onmousemove = function(e){
  var l;
  if(l){
    l = document.elementFromPoint(e.clientX, e.clientY);
  }else{
    var h = document.getElementsByClassName('hover');
    if(h){
      h = h[0];
      if(h){
          const rect = h.getBoundingClientRect();
          l = {};
          l.clientX = rect.left;
          l.clientY = rect.top;
      }
    }
  }
  var paras = document.getElementsByClassName('hintedJS');
  while(paras[0]){
    paras[0].parentNode.removeChild(paras[0]);
  }
  if(l){
    if(l.getAttribute){
      const altText = l.getAttribute('alt');
      const tmp2 = [null, undefined, NaN, 'null', 'undefined', 'NaN'];
      if(!tmp2.includes(altText)){
        l = {'alt': l.getAttribute('alt')};
      }
    }
    if(l.alt){
      var p = document.createElement('div');
      p.style.position = 'absolute';
      p.style.left = e.clientX + 15 + 'px';
      p.style.top = e.clientY + 15 + 'px';
      p.className = 'hintedJS';
      p.style.zIndex = '999999';
      var g = document.createElement('p');
      if(hintedJS.hintText != ''){
        g.style.margin = '0';
        g.innerText = hintedJS.hintText;
        g.style.fontWeight = 'bold';
        p.appendChild(g);
      }

      var v = document.createElement('p');
      v.style.margin = '0';
      v.innerText = l.alt;
      p.appendChild(v);

      p.style.background = '#fff';

      if(hintedJS._style == 'simple'){
        p.style.border = '1px #000 solid';
      }else{
        if(hintedJS._style == 'material'){
          p.style.borderRadius = '15px';
          p.style.padding = '5px 15px';
        }else{
          if(hintedJS._style == 'black-simple'){
            p.style.background = '#000';
            v.style.color = '#fff';
            g.style.color = '#fff';
            p.style.border = '1px #fff solid';
          }else{
            if(hintedJS._style == 'black-material'){
              p.style.background = '#000';
              v.style.color = '#fff';
              g.style.color = '#fff';
              p.style.borderRadius = '15px';
              p.style.padding = '5px 15px';
            }
          }
        }
      }
      if(hintedJS.shadow){
        p.style.boxShadow = '0 0 3px rgba(0,0,0,0.5)';
      }
      document.body.appendChild(p);
    }
  }
}

hintedJS.style = function(e) {
  if(e){
    if(e.toLowerCase() == 'material' || e.toLowerCase() == 'simple' || e.toLowerCase() == 'black-simple' || e.toLowerCase() == 'black-material'){
      hintedJS._style = e;
      }else{
        console.warn('hintedJS: Wrong style');
      }
    }else{
    console.log('hintedJS: Available styles: simple, material, black-simple');
  }
}

hintedJS.help = function(){
  console.log('hintedJS: Script made by GooseSima\nUsage: add in you element attribute alt\nnChange style using: hintedJS.style()\nDisable or change text hint: hintedJS.hintText=\'some text\'\nDisable shadow: hintedJS.shadow = false;\nDisable hintedJS: hintedJS.enabled = false;');
}
