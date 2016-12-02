var request = require('request-promise')

module.exports = {
  getInput: function(day,callback) {
    var sessionID = process.env.adventofcode_sessionId;

    var options = {
      url: 'http://adventofcode.com/2016/day/'+day+'/input',
      headers: {
        'Cookie': 'session='+sessionID
      }
    }

    request(options).then( function(body){
      callback(body);
    })
  }
}
