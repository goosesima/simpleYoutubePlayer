const devToolScript = function (){
    if (!nw) return;
    const a = document.createElement('button');
    a.innerText = 'Open DevTools';
    a.onclick = function () {
        var win = nw.Window.get();
        win.showDevTools();
    }
    setTimeout(function () {
        loadingScreen.appendChild(a);
    }, 3000);
}
devToolScript();