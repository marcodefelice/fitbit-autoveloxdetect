import { geolocation } from "geolocation";
import document from "document";
import { peerSocket } from "messaging";
import { vibration } from "haptics";

import { CheckAutovelox } from "./checkautovelox.js";

//define variable
let position = { longitude : '', latitude : '' };
let autovelox = { longitude : '', latitude : ''};
var currentposition = { longitude : '', latitude : '', speed : ''};

peerSocket.onopen = function() {
  console.log("open socket");
  vibration.start("ping");
}

peerSocket.onmessage = function(evt) {  
  let resp = evt.data

    geolocation.getCurrentPosition(function(position) {
      currentposition.longitude = position.coords.longitude;
      currentposition.latitude = position.coords.latitude;
      currentposition.speed = position.coords.speed;
      
      if(resp.dataRes.error === true) {
         console.log("ERROR calling data")
      }
      
      let respPosition = resp.dataRes.result
      //autovelox data
      autovelox.longitude = respPosition[0].longitude;
      autovelox.latitude = respPosition[0].latitude;
      
      console.log(JSON.stringify(respPosition))
      
      let checkAutovelox = new CheckAutovelox(currentposition,autovelox,resp.settings);
      if(checkAutovelox.checkstatus() === true) {
        //vibraaaaaaaaaaaaa
        console.log("vibraaaa");
        vibration.start("alert");
      };
    })
      
  
}

peerSocket.onerror = function(err) {
  // Handle any errors
  console.log("send error" + err);
}



var options = {enableHighAccuracy:true,maximumAge:5000,timeout: 30 * 1000};
geolocation.watchPosition(locationSuccess, locationError, options);

console.log("Max message size=" + peerSocket.MAX_MESSAGE_SIZE);

function locationSuccess(position) {
  console.info("Whatch position: " + JSON.stringify(position))
  vibration.stop();
	position.latitude =  position.coords.latitude;
	position.longitude = position.coords.longitude;
  if (peerSocket.readyState === peerSocket.OPEN) {
	  peerSocket.send(position);  
  }
	
}

function locationError(error) {
  console.log("Error: " + error.code, "Message: " + error.message);
}