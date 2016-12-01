var request = require('request');

function slackBot() {
};

slackBot.prototype.retrieveLeaderboard = function (leaderboardId) {

  return new Promise((resolve, reject) => {

    var url = 'http://adventofcode.com/2016/leaderboard/private/view/'+leaderboardId+'.json';

    request.get({
      url: url, headers: {
      'Cookie': 'session='+process.env.adventofcode_sessionid
    }}, (error, response, body) => {

      if(!error && response.statusCode == 200) {
        resolve([error, response, body]);
      } else {
        reject(Error(response.statusCode));
      }

    });
  });

};

slackBot.prototype.listUsersScores = function (jsonleaderboard) {
  return new Promise(function(resolve, reject) {

    var leaderboardPayload = JSON.parse(jsonleaderboard)
    var leaderboard = []

    for (var key in leaderboardPayload.members) {
      if (leaderboardPayload.members.hasOwnProperty(key)) {
        leaderboard.push({
          name: leaderboardPayload.members[key].name,
          score: leaderboardPayload.members[key].stars,
        });
      }
    }

    resolve([null,leaderboard])

  });
};

module.exports = slackBot
