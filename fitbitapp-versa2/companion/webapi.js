export function WebApi(apiKey) {
  if (apiKey !== undefined) {
    this.apiKey = apiKey;
  }
  else {
    // Default key for open public access.
    this.apiKey = ""; //here api key
  }
};

WebApi.prototype.getAutovelox = function(dataposition) {
  let self = this;
  return new Promise(function(resolve, reject) {
    let url = "https://2b5gaegqa3.execute-api.eu-west-1.amazonaws.com/default/autoveloxDetect";
    url += "?longitude=" + dataposition.longitude;
    url += "&latitude=" + dataposition.latitude;
    url += "&key=" + self.apiKey;
    fetch(url).then(function(response) {
      return response.json();
    }).then(function(json) {
      //console.log("Got JSON response from server:" + JSON.stringify(json));
		  resolve(JSON.stringify(json));	
    }).catch(function (error) {
      reject(error);
    });
  });
}