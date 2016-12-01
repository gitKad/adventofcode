var expect = require('chai').expect
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

    return sb.retrieveLeaderboard(110888)
    .then((v) => {
      return sb.listUsersScores(v[2])
    })
    .then((v) => {
      var error = v[0], list = v[1]
      expect(error).to.be.null
      expect(list).to.be.a('array')
      expect(list).to.contain('Alexis Philippe')
      expect(response.length).to.be.above(0)
    })

  })

  it.skip('can post payload to tecsysteam\'s slack', () => {

  })

  it.skip('can recognize a new leaderboard subscription', () => {

  })

  it.skip('can recognize a leaderboard score change', () => {

  })

})
