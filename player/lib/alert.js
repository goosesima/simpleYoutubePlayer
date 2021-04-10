window.alert = function(text, close){
  var p = document.createElement('div');
  var g = document.createElement('p');
  var v = document.createElement('img');
  p.className = 'sypplayeralert';
  g.innerText = text;
  v.src = 'img/close.png';
  v.className = 'controlpad';
  p.appendChild(g);
  if(!close){
    v.onclick = function(){
      p.classList.add('sypalertgoodbye');
      setTimeout(function(){
        p.parentNode.removeChild(p);
      },400)
    }
    p.appendChild(v);
  }else{
    setTimeout(function(){
      p.classList.add('sypalertgoodbye');
      setTimeout(function(){
        p.parentNode.removeChild(p);
      },400)
    },5000);
  }
  document.body.appendChild(p);
  setTimeout(function(){p.classList.add('sypalerthello');},100);
}

window.confirm = function(text, then){
  var p = document.createElement('div');
  var g = document.createElement('p');
  var v = document.createElement('img');
  var q = document.createElement('img');
  p.className = 'sypplayeralert';
  g.innerText = text;
  g.classList.add('sypconfirm');
  
  v.src = 'img/close.png';
  v.className = 'controlpad';

  q.src = 'img/checkbox.png';
  q.className = 'controlpad';

  p.appendChild(g);
  v.onclick = function(){
    then(false);
    p.classList.add('sypalertgoodbye');
    setTimeout(function(){
      p.parentNode.removeChild(p);
    },400)
  }
  q.onclick = function(){
    then(true);
    p.classList.add('sypalertgoodbye');
    setTimeout(function(){
      p.parentNode.removeChild(p);
    },400);
  }
  p.appendChild(v);
  p.appendChild(q);
  document.body.appendChild(p);
  setTimeout(function(){p.classList.add('sypalerthello');},100);
}
