const JsonLoader = require("./app/jsonloader.js");
const Config = require("./config/config.js");
var config = Config.Config;

module.exports.handler = function(event,context,callback) {

  //first check if key ID is correct
  if(GetParameterByName("key",event.rawQueryString) != config.apikey) {
    callback(null, {error:true,message:"unable to access"})
  }

  let loader = new JsonLoader(null);
  let data = {
    longitude: GetParameterByName("longitude",event.rawQueryString),
    latitude: GetParameterByName("latitude",event.rawQueryString),
    key: GetParameterByName("key",event.rawQueryString)
  }
  console.log("Calling: " + JSON.stringify(data));
  loader.find(data,function(res) {
    callback(null, res)
  })
}

function GetParameterByName(name, url) {
    url = "?"+url;
    var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, " "));
}
