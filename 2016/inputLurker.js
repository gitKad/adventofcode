var request = require('request-promise')

var adventOfCodeChatter = function() {

}

adventOfCodeChatter.prototype.getInput = function (day, callback) {
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

adventOfCodeChatter.prototype.postSolution = function (day, solution, callback) {
  var sessionID = process.env.adventofcode_sessionId;

  var options = {
    url: 'http://adventofcode.com/2016/day/'+day+'/answer',
    form: {
      'level': day,
      'answer':solution
    },
    headers: {
      'Cookie': 'session='+sessionID
    }
  }

  request.post(options).then( function(body){
    callback(body);
  })
}


module.exports = adventOfCodeChatter
