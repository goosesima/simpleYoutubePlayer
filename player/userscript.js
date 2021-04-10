add.CSS(`
  #sypplayeropen:hover{
    background:#aaa;
  }
  #sypplayeropen{
    background: #fff;
    color: #000;
    padding: 5px 16px 8px 16px;
    border-radius: 5px;
    background-repeat: no-repeat !important;
    background-image: url(` + '${FULLADDRESS}' + `/favicon.ico) !important;
    display: inline;
    cursor: pointer !important;
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
  var urlReq = "${FULLADDRESS}/sypplayer?open=" + idVideo + "&uuid=" + uuidSYP;

  oReq.open("GET",urlReq);
  oReq.send();
  document.getElementsByClassName('video-stream html5-main-video')[0].pause();
}
var p = document.getElementsByClassName('title style-scope ytd-video-primary-info-renderer')[0];
if(p) p.appendChild(g);
