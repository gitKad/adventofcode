var http = require('http')

var adventOfCodeChatter = function() {

}

adventOfCodeChatter.prototype.getInput = function (day) {
  var options = {
    hostname: 'adventofcode.com',
    port: 80,
    path: '/2016/day/'+day+'/input',
    method: 'GET',
    headers: {
      'Cookie': 'session='+process.env.adventofcode_sessionid
    }
  }

  return new Promise(function(resolve, reject) {
    var request = http.request(options, function(response) {
      var body = ''

      if (response.statusCode < 200 || response.statusCode > 299) {
         reject(new Error('Failed to load page, status code: ' + response.statusCode));
      }
      response.on('data', function(chunk) {
        body += chunk
      })
      response.on('end', function() {
        resolve(body)
      })
    })
    request.on('error', function(err) {
      reject(err)
    })
    request.end()
  })
}

// adventOfCodeChatter.prototype.postSolution = function (day, solution, callback) {
//   var sessionID = process.env.adventofcode_sessionId;
//
//   var options = {
//     url: 'http://adventofcode.com/2016/day/'+day+'/answer',
//     form: {
//       'level': day,
//       'answer':solution
//     },
//     headers: {
//       'Cookie': 'session='+sessionID
//     }
//   }
//
//   request.post(options).then( function(body){
//     callback(body);
//   })
// }


module.exports = adventOfCodeChatter
