window.visual = {};
visual.fps = 60;
visual.canvasSetup = function () {
  function size() {
    var perc = 20;
    visual.width = canvas.width = window.outerWidth || window.innerWidth;
    const n = Math.floor((window.outerHeight || window.innerHeight) / 100 * 20);
    visual.height = canvas.height = n;
  }
  size();
  window.addEventListener('resize', size);
  canvas.style.bottom = '0px';
  canvas.style.position = 'absolute';
  canvas.style['pointer-events'] = 'none';
}
visual.init = function () {
  visual.canvasSetup();
  stylevisual.onchange = function(){
    sypStorage.set('stylevisual', stylevisual.selectedIndex);
    visual.style = stylevisual.selectedIndex;
  }
  if(sypStorage.get('stylevisual')){
    stylevisual.selectedIndex = visual.style = sypStorage.get('stylevisual');
  }else{
    visual.style = 0
  }
  visual.connect();
}
visual.clear = function () {
  visual.ctx.clearRect(0, 0, visual.width, visual.height);
}
visual.render = function() {
  var dataArray = new Uint8Array(visual.bufferLength);
  function byteString(n) {
    if (n < 0 || n > 255 || n % 1 !== 0) {
        throw new Error(n + " does not fit in a byte");
    }
    return ("000000000" + n.toString(2)).substr(-8)
  }

  function fixColor(a) {
    if(0 > a){
      a = 0;
    }
    if(a > 255){
      a = 255;
    }
    return a;
  }

 visual.clear();
 if(visual.style == 2){
   return undefined;
 }
 visual.analyser.getByteFrequencyData(dataArray);
 pf.repeat(visual.bufferLength, function (i) {
   const t = byteString(dataArray[i]);
   var r = 0, g = 0, b = 0, a = 0;
   // Glithed 80s effect
   if(visual.style == 1){
     r = parseInt(t.substring(0, 3) + t.substring(0, 3) + t.substring(0, 2), 2);
     g = parseInt(t.substring(3, 6) + t.substring(3, 6) + t.substring(3, 5), 2);
     b = t.substring(6, 8) + t.substring(6, 8)
     b += b;
     b = parseInt(b, 2);
   }
   //Normal

   if(visual.style == 0){
     r = i;
     g = t.substring(0, 4)
     g += g;
     g = parseInt(g, 2);
     b = t.substring(4);
     b += b;
     b = parseInt(b, 2);
   }
   a = i + 200;
   a = (fixColor(a)+1) / 256;
   visual.ctx.fillStyle = 'rgba(' + r + ',' + g + ',' + b + ',' + a + ')';
   visual.ctx.fillRect(visual.width / visual.bufferLength * i, visual.height - visual.height/visual.analyser.fftSize * dataArray[i], visual.width / visual.bufferLength, visual.height);
 });
}
visual.connect = function () {
  visual.context = new AudioContext();
  visual.src = visual.context.createMediaElementSource(futureplayer);
  visual.analyser = visual.context.createAnalyser();
  visual.ctx = canvas.getContext("2d");
  visual.src.connect(visual.analyser);
  visual.analyser.connect(visual.context.destination);

  visual.analyser.fftSize = 256;

  visual.bufferLength = visual.analyser.frequencyBinCount;

  visual.worker = setInterval(function () {
    window.requestAnimationFrame(visual.render);
  }, 1000 / visual.fps);
}
document.addEventListener("DOMContentLoaded", function () {
  if(!isBrowser){
    visual.init();
  }else{
    contentWin.removeChild(canvas)
  }
});
