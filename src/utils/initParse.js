import Parse from 'parse';

function initParse() {
  Parse.initialize(process.env.VUE_APP_B4APPID, process.env.VUE_APP_B4AJAVASCRIPTKEY);
  Parse.serverURL = process.env.VUE_APP_SERVERURL;
}

export default initParse;
