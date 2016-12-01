var expect = require('chai').expect
var sinon = require('sinon')
var SlackBot = require('./slackbot.js')

describe('slackbot', function() {

  before(() => {
    sb = new SlackBot()
  })

  it('can retrieve private leaderbord from adventofcode', () => {

    var privateBoardOwnerId = 110888

    return sb.retrieveLeaderboard(privateBoardOwnerId)
    .then((v) => {
      var error = v[0], response = v[1];
      expect(error).to.be.null;
      expect(response.statusCode).to.be.eql(200);
      expect(JSON.parse(response.body)).to.include.keys('owner_id');
    })

  })

  it('can list users and scores', () => {

    // hardcoded, valid results from a a call to retrieveLeaderboard()
    var v = [null, 200, JSON.stringify({"members":{
      "13934":{"name":"Joel Bourbonnais","id":"13934","stars":0,"completion_day_level":{},"last_star_ts":"1969-12-31T19:00:00-0500"},
      "110888":{"last_star_ts":"1969-12-31T19:00:00-0500","completion_day_level":{},"stars":1,"id":"110888","name":"Alexis Philippe"}
    }, "event":"2016","owner_id":"110888"}) ]

    return sb.listUsersScores(v[2])
    .then((v) => {
      var error = v[0], list = v[1]
      expect(error).to.be.null
      expect(list).to.be.a('array')
      expect(list).to.have.a.lengthOf(2)
      expect(list).to.contain({name: 'Alexis Philippe', score: 1})
      expect(list).to.contain({name: 'Joel Bourbonnais', score: 0})

    })

  })

  it('can post payload to tecsysteam\'s slack', () => {

    return sb.postOnSlack('testsbyalexis','christmas_tree','test message!')
    .then((v) => {
      var error = v[0], response = v[1]
      expect(error).to.be.null
      expect(response.statusCode).to.be.eql(200)
    })

  })

  it('can recognize a new leaderboard subscription', () => {

  })

  it.skip('can recognize a leaderboard score change', () => {

  })

})
