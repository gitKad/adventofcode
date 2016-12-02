var path = require('path');
var fs = require('fs');
var request = require('request');

function slackBot() {
  var sb = this
  sb.latestAnnouncedLeaderboardPath = path.join(__dirname, 'latestAnnouncedLeaderboard')
  sb.latestRetrievedLeaderboardPath = path.join(__dirname, 'latestRetrievedLeaderboard')
}

slackBot.prototype.getPayloadFromAdventOfCode = function (leaderboardId) {

  return new Promise(function(resolve, reject) {
    var url = 'http://adventofcode.com/2016/leaderboard/private/view/'+leaderboardId+'.json';
    request.get({
      url: url,
      headers: {
        'Cookie': 'session='+process.env.adventofcode_sessionid
      }}, (error, response, body) => {

      if(!error && response.statusCode == 200) {
        resolve([error, response, body]);
      } else {
        reject(Error('k1003: '+response.statusCode));
      }
    })
  })

}

slackBot.prototype.persistLeaderboards = function (leaderboardId) {
  var sb = this
  return new Promise((resolve, reject) => {

    sb.getPayloadFromAdventOfCode(leaderboardId)
    .then((v) => {
      var body = v[2]

      fs.writeFile(sb.latestRetrievedLeaderboardPath, body, 'utf8', (err) => {
        if (err) reject(Error('k1000: '+err))

        fs.open(sb.latestAnnouncedLeaderboardPath, 'r', (err, fd) => {
          if (err) {
            if(err.code === "ENOENT") {
              fs.writeFile(sb.latestAnnouncedLeaderboardPath, body, 'utf8', (err) => {
                if (err) reject(Error('k1001: '+err))
                resolve([null,body])
              })
            } else {
              reject(Error('k1009: '+err))
            }
          }
          resolve([null,body]);
        })
      })
    })
  })

};

slackBot.prototype.listUsersScores = function (jsonleaderboard) {
  return new Promise(function(resolve, reject) {

    if(jsonleaderboard == "") reject(Error("k1008: the json leaderboard to parse is an empty string!"))

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

  })
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
        resolve([error, response, body])
      } else {
        reject(Error('k1007: '+response.statusCode))
      }
    })

  })
}

slackBot.prototype.listNewSubscriptions = function () {
  var sb = this

  return new Promise((resolve, reject) => {

    var readUserListsPromises = []
    var latestRetrievedUsersList, latestAnnouncedUsersList

    var latestRetrievedLeaderboardPromise = new Promise((fileResolve, fileReject) => {
      fs.readFile(sb.latestRetrievedLeaderboardPath, (err, data) => {
        if (err) fileReject(Error('k1005'+err))
        fileResolve(data)
      })
    })
    .then((latestRetrievedLeaderboardFile) => {
      return sb.listUsersScores(latestRetrievedLeaderboardFile)
    })
    .then((v) => {
      latestRetrievedUsersList = v[1]
      Promise.resolve()
    })

    var latestAnnouncedLeaderboard = new Promise((fileResolve, fileReject) => {
      fs.readFile(sb.latestAnnouncedLeaderboardPath, (err, data) => {
        if (err) fileReject(Error('k1006'+err))
        fileResolve(data)
      })
    })
    .then((latestAnnouncedLeaderboardFile) => {
      return sb.listUsersScores(latestAnnouncedLeaderboardFile)
    })
    .then((v) => {
      latestAnnouncedUsersList = v[1]
      Promise.resolve()
    })

    readUserListsPromises.push(latestRetrievedLeaderboardPromise)
    readUserListsPromises.push(latestAnnouncedLeaderboard)
    Promise.all(readUserListsPromises)
    .then(() => {
      var newSubscriptions = latestRetrievedUsersList.filter(function(obj) {
        return !latestAnnouncedUsersList.some(function(obj2) {
            return obj.name == obj2.name;
          });
      });

      newSubscriptions.map((val,idx,arr)=>{ arr[idx] = val.name })

      resolve([null,newSubscriptions])
    })
    .catch(reason => {
      reject(Error('k1004: '+reason))
    })
  })
}

slackBot.prototype.announceSubscriptions = function (subscriptions) {
  var sb = this
  var postsPromises = []

  for (var i = 0; i < subscriptions.length; i++) {
    postsPromises.push(sb.postOnSlack('testsbyalexis',':floppy_disk:','I ANNOUNCE A SUBSCRIPTION OF '+subscriptions[i]))
  }

  return Promise.all(postsPromises)
}

module.exports = slackBot
