var request = require('request-promise');

module.exports = {
  getInput: function(day,callback) {
    var options = {
      url: 'http://adventofcode.com/2016/day/'+day+'/input',
      headers: {
        'Cookie': 'session='+process.env.adventofcode_sessionid
      }
    };

    request(options).then( function(body){
      callback(body);
    });
  }
}
