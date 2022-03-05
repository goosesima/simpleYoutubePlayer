plugins.yt.putQuality = function (e) {
    console.log(e);
  //   const codec = e.mimeType.replace('""', '').split('=')[1];
  //   // const arrQ = ['Best', 'Proprietary codec', 'Normal', 'Worst'];
  //   var data = {};
  //   var q = '';
  //   const itag = e.itag;
  //   if(itag == 251){
  //     q += arrQ[0];
  //   }
  //   if(itag == 140){
  //     q += arrQ[1];
  //   }
  //   if(itag == 250){
  //     q += arrQ[2];
  //   }
  //   if(itag == 249){
  //     q += arrQ[3];
  //   }
  //   var qualitySimplified;
  //   if(type == 'audio'){
  //     qualitySimplified = e.itag;
  //   }else{
  //     qualitySimplified = e.qualityLabel + e.fps;
  //   }
  //   if(q == ''){
  //     if(type == 'video'){
  //       q = qualitySimplified + 'FPS';
  //     }
  //   }
  //   if(typeof itagS != 'undefined'){
  //     if(type == 'video'){
  //       if(String(itagS) == qualitySimplified && String(codecS) == codec.substring(0, 4)){
  //         data.selected = true;
  //       }
  //     }else{
  //       if(itag == Number(itagS)){
  //         data.selected = true;
  //       }
  //     }
  //   }
  //   var v = 'Codec: ' + codec + '\n';
  //   v += 'Bitrate: ' + Math.floor(e.bitrate/1000/128*60) + 'Mgbpm';
    plugins.yt.playmedia = function () { //request removing
        axios.get(global.page).then(function (e) {
            var initial;
            const ytInitialData = plugins.yt.ytInitialData(e.data);
            if (ytInitialData.contents.twoColumnSearchResultsRenderer) {
            } else {
                if (ytInitialData.contents.twoColumnWatchNextResults) {
                    const data = plugins.yt.recommendationList(ytInitialData);
                    global.clearList();
                    global.advancedList(list, data);
                    const datainfo = plugins.yt.getInfo(ytInitialData);
                    likes.innerText = datainfo[0];
                    dislikes.innerText = datainfo[1];
                }
                initial = plugins.yt.ytInitialGet(e.data)
            }
            if (data != undefined) {
                //data.viewCount
                global.madeby.innerText = 'Made by: ' + data.author;
                global.namemedia.innerText = data.title;
                global.thumbnail.src = 'https://img.youtube.com/vi/' + data.videoId + '/default.jpg';
                global.setBackground();

            } else {
                global.pause();
            }

        }).catch(function (e) { console.log(e); });
    }