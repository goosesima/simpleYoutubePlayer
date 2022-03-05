
plugins.rezka = {
  load: function () {
    var plugin = plugins.rezka;
    plugin.type = 'source';
  },
  search: async function (keyword) {
    var out = [];
    const e = await axios.get('https://rezka.ag/search/?do=search&subaction=search&q=' + keyword);
    const d = new jsdom.JSDOM(e.data).window.document;
    const t = d.getElementsByClassName('b-content__inline_items')[0];
    const array = t.getElementsByClassName('b-content__inline_item');
    for (var i = 0; i < array.length; i++) {
      var outElm = {};
      const a = array[i];
      outElm.thumbnail = a.getElementsByTagName('img')[0].src;
      const txt = a.getElementsByTagName('a')[1];
      outElm.title = txt.textContent;
      outElm.url = txt.href;
      outElm.text = '???';
      out.push(outElm);
    }
    return out;
  }
}
