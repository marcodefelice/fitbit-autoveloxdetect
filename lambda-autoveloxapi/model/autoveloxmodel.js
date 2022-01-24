const mysql = require('mysql');
const Config = require('../config/config.js');
var config = Config.Config;

const TABLE = "autovelox_map";

class AutoveloxModel {
    constructor() {
      this.connection = mysql.createConnection({
       host: config.dbHost,
       user: config.dbUser,
       password: config.dbPsw,
       port: config.dbPort,
       database: config.dbName
      });

    }

    AutoveloxSaveData(dataObj) {

      this.connection.connect(function(err){
        if (err) throw err;
        console.log("connect!")

        let sqlquery = "INSERT INTO " + TABLE + " "
                     + "('place','city','region','last_updated','speed','longitude','latitude') values "
                     + "('" + dataObj.city + "',"
                     + "'" + dataObj.place + "',"
                     + "'" + dataObj.region + "',"
                     + "'" + dataObj.lastUpdated + "',"
                     + "" + dataObj.speed + ","
                     + "" + dataObj.longitude + ","
                     + "" + dataObj.latitude + ")";

        console.log(sqlquery);

        this.connection.query(sqlquery, function (err, result) {
         if (err) throw err;
           return result;
         });

         connection.end();

      });

    }

    AutoveloxRead(dataObj,callback) {
      let sqlquery = "SELECT * FROM " + TABLE + " WHERE "
                   + " longitude BETWEEN  " + dataObj.startLongitude + " and  " + dataObj.endLongitude + " and"
                   + " latitude BETWEEN  " + dataObj.startLatitude + " and  " + dataObj.endLatitude;
      var resultData;
      this.connection.query(sqlquery, function (err, result) {
       if (err) throw err;
          let date = new Date();
          date = date.getTime();
          let dataRes = {
            error: false,
            timestamp: date,
            result: result
          }
         callback(dataRes)
       });

       this.connection.end();

    }

}

module.exports = AutoveloxModel;
