window.contextMenu = {};
contextMenu.new = function(){
  var p = document.createElement('div');
  p.className = 'contextMenu';
  p.add = function(e){
    if(e){
      p.appendChild(e);
    }else{
      document.body.appendChild(p);
    }
  }
  p.open = function(x, y){
    p.style.display = 'block';
    p.style.left = x + 'px';
    p.style.top = y + 'px';
  }
  p.close = function(){
    p.style.display = 'none';
  }
  p.style.position = 'absolute';
  p.close();
  return p;
}
contextMenu.separator = function(){
  var p = document.createElement('p');
  p.className = 'contextMenuSeperator';
  return p;
}
contextMenu.button = function(text, img, onclick){
  var t = document.createElement('div');
  t.className = 'contextMenuButton';
  t.onclick = function(){
    if(onclick) onclick();
  }
  if(img){
    var p = new Image();
    p.src = img;
    t.appendChild(p);
  }
  var v = document.createElement('p');
  v.innerText = text;
  t.appendChild(v);
  return t;
}
