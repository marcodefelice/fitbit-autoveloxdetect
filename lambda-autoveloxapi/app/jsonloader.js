const requestify = require('requestify');
const AutoveloxDb = require('../model/autoveloxmodel.js');
//dynamo.AWS.config.loadFromPath('credentials.json');

class JsonLoader{
    constructor(path) {
        this.path = path
    }

    loader() {
        requestify.get(this.path)
            .then(function(response) {
                // Get the response body (JSON parsed or jQuery object for XMLs)
                let data = response.getBody();
                let Autovelox = new AutoveloxDb();
                for(let i = 0; i <= data.length; i++) {
                  console.log("save " + i)
                  Autovelox.AutoveloxSaveData({
                        place: data[i].ccomune,
                        region:  data[i].cregione,
                        last_updated:  data[i].cdata_e_ora_inserimento,
                        city : data[i].cprovincia,
                        speed: 0,
                        longitude:  data[i].clongitude,
                        latitude : data[i].clatitudine
                    });
                }
            }
        );
    }

    find(data,callback) {
        let Autovelox = new AutoveloxDb();

        let dataToFind = {
          startLongitude: Number(data.longitude) - 0.02000,
          startLatitude: Number(data.latitude) - 0.02000,
          endLongitude: Number(data.longitude) + 0.02000,
          endLatitude: Number(data.latitude) + 0.02000,
        }

        console.log("searching " + JSON.stringify(dataToFind))
        return Autovelox.AutoveloxRead(dataToFind,function(res) {
          callback(res)
        })
    }

}

module.exports = JsonLoader;
