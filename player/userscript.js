//add.js
"undefined"==typeof add&&(window.add={}),add.help=function(){console.clear();var e=function(e){console.log(e)};return e("What is this addJS?\n  addJS - this is a script what make add CSS, JS simpler to pages"),e('How to use?\n  add.JS("function or URL to JS file","After load do somethings");\n  add.CSS("styles or URL to CSS file","After load do somethings");\n    Note: You can use one argument'),e('How to connect addJS?\n\nvar a=document.createElement("script");a.src="https://simakyr.github.io/addJS/addJS.js";document.body.appendChild(a)'),""},add.detectUrl=function(e){var t=document.createElement("a");return t.href=e,e==t.href},add.JS=function(e,t){var d=document.createElement("script");add.detectUrl(e)?d.src=e:d.innerHTML=e,"function"==typeof t&&(d.onload=t),document.getElementsByTagName("body")[0].appendChild(d)},add.CSS=function(e,t){var d;add.detectUrl(e)?((d=document.createElement("link")).rel="stylesheet",d.href=e):(d=document.createElement("style")).innerHTML=e,"function"==typeof t&&(d.onload=t),document.getElementsByTagName("body")[0].appendChild(d)};
//userscript.js
add.CSS(`
  #sypplayeropen:hover{
    background:#aaa;
  }
  #sypplayeropen{
    color: #000;
    border-radius: 50px !important;
    padding: 5px 16px 8px 16px;
    border-radius: 5px;
    background-repeat: no-repeat !important;
    background-image: url(` + '${FULLADDRESS}' + `/favicon.ico) !important;
    display: inline;
    cursor: pointer !important;
    transition: .3s background;
    background-size: 32px !important;
  }
  `);
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

var g = document.createElement('p');
g.id = 'sypplayeropen';
g.alt = 'Open in SYP Player by SimaKyr';
g.onclick = function(){
  var oReq = new XMLHttpRequest();
  oReq.addEventListener("load", function(e){
    if(e.responseText=='UUID'){
      alert('SYP Player click Contine in SYP Player to contine.');
    }
    if(e.responseText=='BANNED'){
      alert('You are banned! Unban in Settings in SYP Player.');
    }
  });
  var idVideo = new URL(location.href).searchParams.get('v');
  var uuidSYP = localStorage.SYPPlayerUUID;
  var urlReq = "${FULLADDRESS}/rc?o=" + idVideo + "&d=" + uuidSYP;

  oReq.open("GET", urlReq);
  oReq.send();
  document.getElementsByClassName('video-stream html5-main-video')[0].pause();
}
var p = document.getElementsByClassName('title style-scope ytd-video-primary-info-renderer')[0];
if(typeof p == 'object'){
  p.appendChild(g);
}
