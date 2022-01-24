import { me } from "companion";
import * as messaging from "messaging";
import { settingsStorage } from "settings";
import { WebApi } from "./webapi.js";
import { settingsStorage } from "settings";

messaging.peerSocket.onmessage = function(evt) {
	// Ready to send or receive messages
  	sendSchedule(evt.data);
}

function sendSchedule(data) {
  let webApi = new WebApi();
  webApi.getAutovelox(data).then(function(data) {
    if (messaging.peerSocket.readyState === messaging.peerSocket.OPEN) {
      
      let settings = {
          settings: { 
            distance: settingsStorage.getItem("distanceSetting"),
          }
        }
      
      let dataRes = JSON.parse(data);
      let dataToSend = {dataRes, settings};
    
      messaging.peerSocket.send(dataToSend);
    }
  }).catch(function (e) {
    console.log("error"); console.log(e)
  });
}