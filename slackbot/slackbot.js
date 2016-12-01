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

slackBot.prototype.postOnSlack = function (channel, emoji, message) {
  var channel = 'testsbyalexis'
  var username = 'tecslickbot'
  var url = process.env.adventofcode_slackwebhook

  return new Promise((resolve, reject) => {

    request.post({
      url: url,
      form: {
        payload: JSON.stringify({
          channel:channel,
          username:username,
          text:message,
          icon_emoji:emoji
        })
      }
    }, function(error, response, body) {
      if(!error && response.statusCode == 200) {
        resolve([error, response, body]);
      } else {
        reject(Error(response.statusCode));
      }
    });

  });
};

module.exports = slackBot
