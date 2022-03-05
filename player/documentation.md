
# Draft

	1. Search videos.
	2. Player parsing.
3. Player m3u8 (parameters: url m3u8).

url hls

    var hls = new Hls();
    hls.loadSource(a);
    hls.attachMedia(futurevideo);

# Guides

No currently guides.

# API for plugins

## Resource object

{urlaudio: '...', urlvideo: '...'}

## Source (Provider) plugins

type = 'source';

pluginname.quicksearch(keyword)
['shrek 1', 'shrek 2', 'shrek 3', 'shrek 4', 'shrek 5']

pluginname.search(keyword)
[{'thumbnail': 'URL', 'title': 'Shrek', 'url': 'URL', MORE}...]

pluginname.comments(url/html)
[{'author': 'GooseSima', 'msg': 'My favorite cartoon.', 'likes': 10, 'dislikes': 0, 'thread': [...], 'avatar': 'URL'}, ...]

pluginname.series(url/html) - for services with series
[{'season': '1', 'name': '1', 'version':[{'name': 'English 720p', 'series':[{'thumbnail': 'URL', 'serie': 1, 'name': '???'}...]}...]}...]

pluginname.play(url/html, config)
config = {qaudio: 'highest/lowest', qvideo: '...p/lowest/highest', qvideoalt: 'lowest/highest',videocodec: 'vp9', audiocodec: '}
Output: resource object
qvideo - 1080p,144p,240p,360p,720p

pluginname.info(url/html)
{likes: 0, dislikes: 0, views: 0, title: 'Never gonna...', author: 'Rick Astley', description: 'cool song', published: 'Today', thumbnail: 'URL', url: 'URL', length: '1:00'}

pluginname.recommendation(url/html)
outputs same as pluginname.search if not available

pluginname.login('password', 'login')
outputs: wrongpass, wronglogin, error, error, succesfully

pluginname.cache.export()
output: encrypted JSON {cookies: ???}

pluginname.cache.import(encrypted JSON)

## Plugins for External players

type = 'externalplayer';

api.externalplayer.register(program, playername, icon, play)

- program - player in system (mpv, vlc)
- playername - userfriendly name of player (MPV player, VLC media player)
- play - function what called when player need to play resource object with given resource object
- icon - icon of player (location)

output: id for player access

api.externalplayer.play(id, command)

- id - from register function
- command - command to execute