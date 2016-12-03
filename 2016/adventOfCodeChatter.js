var request = require('request-promise')

var adventOfCodeChatter = function() {

}

adventOfCodeChatter.prototype.getInput = function (day) {
  var sessionID = process.env.adventofcode_sessionId;

  var options = {
    url: 'http://adventofcode.com/2016/day/'+day+'/input',
    headers: {
      'Cookie': 'session='+sessionID
    }
  }

  return request(options).then( (body) => {
    return Promise.resolve(body)
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
