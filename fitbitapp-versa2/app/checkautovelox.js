

export function CheckAutovelox(position,autovelox,settings) {
    this.position = position;
    this.autovelox = autovelox;
    this.settings = settings.settings;
};


CheckAutovelox.prototype.checkstatus = function() {
  let self = this;
  let startposizion = self.autovelox.longitude;
  let endposizion = self.autovelox.longitude;
  
  let distance = calculateDistance(
    self.position.latitude,
    self.position.longitude,
    self.autovelox.latitude,
    self.autovelox.longitude
  )
   
  let distanceSettings = self.settings.distance / 1000 ;
  
  //first check latitude
  let isNear = ( distance <= distanceSettings );  
  if(isNear === true) {
  	return true;
  }	
  return false;
}

function calculateDistance(lat1, lon1, lat2, lon2) {
  var p = 0.017453292519943295;    // Math.PI / 180
  var c = Math.cos;
  var a = 0.5 - c((lat2 - lat1) * p)/2 + 
          c(lat1 * p) * c(lat2 * p) * 
          (1 - c((lon2 - lon1) * p))/2;

  return 12742 * Math.asin(Math.sqrt(a)); // 2 * R; R = 6371 km
}