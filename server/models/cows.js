var db = require('../db');

module.exports = {
  
  getAll: function (cb) {
    var queryStr = 'SELECT * from cows';
    db.query(queryStr, (err, data) => {
      var dataPacket = data.map((x) => ({...x}) );
      console.log('line 7 models/cows', dataPacket);
      cb(null, dataPacket);
    })
  },

  create: function(val, cb) {

    //options: an object with key/vals : colnames/values;
    //how to do ? syntax
    //var options = Object.values(val);
    //console.log('line 18 val', options);
    console.log('input from the app is', typeof val);
    var cowName = val['cows'];
    var cowDesc = val['descriptions'];
    console.log('cowName is: ', cowName);
    console.log('cowDesc is: ', cowDesc);
    var queryStr = `INSERT INTO cows (cows, descriptions) VALUES ('${cowName}', '${cowDesc}')` 
    db.query(queryStr, (err, results) => {
      if (err) {
        console.log('models cows line 22 err', err);
      } else {
        //console.log('results models cowls line 24', results);
        //could just invoke callback, don't neeed to send anything rlly
        cb(null, results);
      }
    });
  }
}