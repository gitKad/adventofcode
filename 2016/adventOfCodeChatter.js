var http = require('http')

var adventOfCodeChatter = function() {

}

  var request = require('request')

adventOfCodeChatter.prototype.getInput = function (day) {
  var options = {
    url: 'http://www.adventofcode.com/2016/day/'+day+'/input',
    headers: {
      'Cookie': 'session='+process.env.adventofcode_sessionId,
      'user-agent': 'node.js'
    }
  }

  return new Promise((resolve, reject) => {
    request(options, function (error, response, body) {
      if (!error && response.statusCode == 200) {
        resolve(body)
      } else {
        reject(response.statusCode)
      }
    })
  })
}

// adventOfCodeChatter.prototype.getInput = function (day) {
//   var options = {
//     hostname: 'adventofcode.com',
//     port: 80,
//     path: '/2016/day/'+day+'/input',
//     method: 'GET',
//     headers: {
//       'Cookie': 'session='+process.env.adventofcode_sessionId,
//       'user-agent': 'node.js'
//     }
//   }
//
//   return new Promise((resolve, reject) => {
//     var request = http.get(options, (response) => {
//       if (response.statusCode < 200 || response.statusCode > 299) {
//          reject(new Error('Failed to load page, status code: ' + response.statusCode));
//       }
//       const body = [];
//       response.on('data', (chunk) => body.push(chunk));
//       response.on('end', () => resolve(body.join('')));
//     })
//     request.on('error', (err) => reject(err))
//   })
// }

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
