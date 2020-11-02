var models = require('../models');

module.exports = {
  
  get: function(req, res) {
    models.cows.getAll( (err, data)=> {
      console.log('line 6', data);
      res.send(data);
    } )
  },

  post: function(req, res) {
    var val = req.body;
    //req.body is coming in as {request.body: ''} so take the key.
    var val;
    for (var i in req.body) {
      val = i;
    }
   
    //take string, make it an object to send to model
    var parsedCowString = val.split(';').reduce((pairs, pair) => {
      let index = pair.indexOf(':');
      let key = pair.slice(0, index);
      let value = pair.slice(index + 1);
      pairs[key] = value;

      return pairs;
    }, {})

    models.cows.create(parsedCowString, (err, data) => {
      console.log('line 14, data');
      if (err) {
        console.log('err line 18 cont cows',err)
      } else {
        console.log('line 35', data)
        res.send(data);
      }
    })
  }

}