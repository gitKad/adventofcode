var request = require('request-promise');

module.exports = {
  getInput: function(day,callback) {
    var sessionID = '53616c7465645f5fe973b4942c12d5068641fc1cc5496e572dec6e32d7f9bc2f0dce82d034117a74412b866c7eb46050';

    var options = {
      url: 'http://adventofcode.com/day/'+day+'/input',
      headers: {
        'Cookie': 'session='+sessionID
      }
    };

    request(options).then( function(body){
      callback(body);
    });
  }
}
