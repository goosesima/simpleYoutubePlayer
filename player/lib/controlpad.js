window.controlPad = {};

controlPad.disabled = false;

controlPad._getElement = function(){
  return controlPad._getElements()[controlPad._selectedElement];
}
controlPad._getElements = function(){
  const g = document.body.querySelectorAll('*');
  var a = [];
  var i = 0;
  while(i!=g.length){
    if(g[i].onclick){
      a.push(g[i]);
    }
    i++;
  }
  return a;
  // return document.body.querySelectorAll('button');
}
controlPad._unfocus = function(i){
  var g = controlPad._getElement();
  if(g){
    g.style.border = controlPad._selectedElementBorder;
    g.classList.remove('hover');
    if(onmousemove) onmousemove();
  }
}
controlPad._focus = function(i){
  var g = controlPad._getElement();
  if(g){
    const p = g.getBoundingClientRect();
    controlPad._selectedElementBorder = g.style.border;
    g.style.border = '#00f solid 2px';
    if(p){
      g.scrollIntoView();
    }
    g.classList.add('hover');
    if(onmousemove) onmousemove();
  }
}
controlPad._decrease = function(){
  if(controlPad._selectedElement != 0){
    controlPad._unfocus();
    controlPad._selectedElement--;
    controlPad._focus();
  }
}
controlPad._increase = function(){
  if(controlPad._selectedElement != controlPad._getElements().length-1){
    controlPad._unfocus();
    controlPad._selectedElement++;
    controlPad._focus();
  }
}
controlPad._selectedElement = 0;
controlPad._selectedElementBorder = 0;

controlPad.gamepadConnectOnce = function(){
  controlPad._focus();
  controlPad.gamepadConnectOnce = function(){}
}

window.addEventListener("gamepaddisconnected", function(e) {
  controlPad.gamepadAvailable = false;
});

window.addEventListener("gamepadconnected", function(e) {
  controlPad.gamepadConnectOnce();
  controlPad.gamepadAvailable = true;
});

setInterval(
  function(){
    if(!controlPad.disabled){
      if(controlPad.gamepadAvailable){
        var gamepads = navigator.getGamepads ? navigator.getGamepads() : (navigator.webkitGetGamepads ? navigator.webkitGetGamepads : []);
        var controler = gamepads[0];
        function feedback(s) {
          controler.vibrationActuator.playEffect('dual-rumble', {
            startDelay: 0, // Add a delay in milliseconds
            duration: 250, // Total duration in milliseconds
            weakMagnitude: s/2, // intensity (0-1) of the small ERM
            strongMagnitude: s // intesity (0-1) of the bigger ERM
          });
        }
        if(Math.floor(controler.axes[1]) == 1){
          controlPad._increase();
          feedback(0.1);
        }
        if(Math.floor(controler.axes[1]) == -1){
          controlPad._decrease();
          feedback(0.1);
        }
        if(controler.buttons[2].pressed || controler.buttons[2].touched){
          controlPad._getElement().click();
          feedback(1);
        }
        const xRight = -Number(String(controler.axes[2]).substring(0,4))*100;
        const yRight = Number(String(controler.axes[3]).substring(0,4))*100;
        if(xRight != 0){
          document.getElementById('sliderT').onwheel({'deltaY': xRight});
        }
        if(yRight != 0){
          document.getElementById('sliderTMusic').onwheel({'deltaY': yRight});
        }
        // if(!controlPad._getElement()){
        //   while(!controlPad._getElement()){
        //     controlPad._decrease();
        //   }
        // }
      }
    }
  },150
);
