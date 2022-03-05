const { exec } = require('child_process');
var api = {};

api.externalplayer.availablePlayers = [];
api.externalplayer = {
    register: function (program, playername, icon, play){
        api.externalplayer.availablePlayers.push({program: program, playername: playername, icon: icon});
        if(typeof document != 'undefined'){
            var player = document.createElement('img');
            player.src = icon;
            player.alt = player.title = playername;
            player.onclick = function (){
                play();
            };
        }
        return api.externalplayer.availablePlayers.length;
    },
    play: function (id, command){
        const player = api.externalplayer.availablePlayers[id];
        if(player){
            exec(player.program + ' ' + command);
        }
    }
};