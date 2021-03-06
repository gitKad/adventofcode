var path = require('path');
var fs = require('fs');
var sinon = require('sinon')
var chai = require('chai')
chai.use(require('sinon-chai'));
chai.use(require('chai-fs'));

var SlackBot = require('./slackbot.js')
var expect = chai.expect

describe('slackbot', function() {

  beforeEach(() => {
    sb = new SlackBot()

    var promisesOfFilesDeletion = []

    promisesOfFilesDeletion.push(fs.unlink(sb.latestRetrievedLeaderboardPath,() => {Promise.resolve()}))
    promisesOfFilesDeletion.push(fs.unlink(sb.latestAnnouncedLeaderboardPath,() => {Promise.resolve()}))

    return Promise.all(promisesOfFilesDeletion)
  })

  it('can retrieve private leaderbord from adventofcode', () => {

    var privateBoardOwnerId = 110888

    return sb.getPayloadFromAdventOfCode(privateBoardOwnerId)
    .then((v) => {
      var error = v[0], response = v[1];
      expect(error).to.be.null;
      expect(response.statusCode).to.be.eql(200);
      expect(JSON.parse(response.body)).to.include.keys('owner_id');
    })

  })

  it('can save leaderboards to disk', () => {
    var privateBoardOwnerId = 110888
    var latestAnnouncedLeaderboardPath = sb.latestAnnouncedLeaderboardPath
    var latestRetrievedLeaderboardPath = sb.latestRetrievedLeaderboardPath

    return sb.persistLeaderboards(privateBoardOwnerId)
    .then((v) => {
      var error = v[0], body = v[1];
      expect(error).to.be.null;
      expect(JSON.parse(body)).to.include.keys('owner_id');
      // expect(latestAnnouncedLeaderboardPath).to.be.a.file().and.not.empty; //manual test confirms this is okay!!
      expect(latestRetrievedLeaderboardPath).to.be.a.file().and.not.empty;
    })

  })

  it('can list users and scores', () => {

    // hardcoded, valid results from a a call to retrieveLeaderboard()
    var stubbedReturn = [null, {statusCode:200}, JSON.stringify({"members":{
      "13934":{"name":"Joel Bourbonnais","id":"13934","stars":0,"completion_day_level":{},"last_star_ts":"1969-12-31T19:00:00-0500"},
      "110888":{"last_star_ts":"1969-12-31T19:00:00-0500","completion_day_level":{},"stars":1,"id":"110888","name":"Alexis Philippe"}
      }, "event":"2016","owner_id":"110888"
    })]

    return sb.listUsersScores(stubbedReturn[2])
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

  it('can figure there has been a new subscription', () => {

    var firstStubbedReturn = new Promise(function(resolve, reject) {
      resolve([null, {statusCode:200}, JSON.stringify({"members":{
            "110888":{"last_star_ts":"1969-12-31T19:00:00-0500","completion_day_level":{},"stars":1,"id":"110888","name":"Alexis Philippe"}
          }, "event":"2016","owner_id":"110888"}
        )]
      )})
    var secondStubbedReturn = new Promise(function(resolve, reject) {
      resolve([null, {statusCode:200}, JSON.stringify({"members":{
            "13934":{"name":"Joel Bourbonnais","id":"13934","stars":0,"completion_day_level":{},"last_star_ts":"1969-12-31T19:00:00-0500"},
            "110888":{"last_star_ts":"1969-12-31T19:00:00-0500","completion_day_level":{},"stars":1,"id":"110888","name":"Alexis Philippe"}
          }, "event":"2016","owner_id":"110888"}
        )]
      )})
    var privateBoardOwnerId = 110888
    var getPayloadFromAdventOfCodeStub = sinon.stub(sb,'getPayloadFromAdventOfCode')
    getPayloadFromAdventOfCodeStub.onFirstCall().returns(firstStubbedReturn)
    getPayloadFromAdventOfCodeStub.onSecondCall().returns(secondStubbedReturn)

    return sb.persistLeaderboards(privateBoardOwnerId)
    .then(() => {
      return sb.listNewSubscriptions()
    })
    .then((v) => {
      var error = v[0], list = v[1]
      expect(error).to.be.null
      expect(list).to.be.a('array')
      expect(list).to.have.a.lengthOf(0)
      return sb.persistLeaderboards(privateBoardOwnerId)
    })
    .then(() => {
      return sb.listNewSubscriptions()
    })
    .then((v) => {
      var error = v[0], list = v[1]
      expect(getPayloadFromAdventOfCodeStub).calledTwice
      expect(error).to.be.null
      expect(list).to.be.a('array')
      expect(list).to.have.a.lengthOf(1)
      expect(list).to.include('Joel Bourbonnais')
    })
  })

  it('can announce a new leaderboard subscription', () => {

    var postOnSlackStub = sinon.stub(sb,'postOnSlack')
    var listNewSubscriptionsStub = sinon.stub(sb,'listNewSubscriptions')

    listNewSubscriptionsStub.returns(Promise.resolve(['Kad','Kotix']))

    return sb.listNewSubscriptions()
    .then((subscriptions) => {
      return sb.announceSubscriptions(subscriptions)
    })
    .then(() => {
      expect(postOnSlackStub).calledTwice
    })

  })

  it('can recognize a leaderboard score change', () => {
    var firstStubbedReturn = new Promise(function(resolve, reject) {
      resolve([null, {statusCode:200}, JSON.stringify({"members":{
            "110888":{"last_star_ts":"1969-12-31T19:00:00-0500","completion_day_level":{},"stars":1,"id":"110888","name":"Alexis Philippe"}
          }, "event":"2016","owner_id":"110888"}
        )]
      )})
    var secondStubbedReturn = new Promise(function(resolve, reject) {
      resolve([null, {statusCode:200}, JSON.stringify({"members":{
            "110888":{"last_star_ts":"1969-12-31T19:00:00-0500","completion_day_level":{},"stars":2,"id":"110888","name":"Alexis Philippe"}
          }, "event":"2016","owner_id":"110888"}
        )]
      )})
    var privateBoardOwnerId = 110888
    var getPayloadFromAdventOfCodeStub = sinon.stub(sb,'getPayloadFromAdventOfCode')
    getPayloadFromAdventOfCodeStub.onFirstCall().returns(firstStubbedReturn)
    getPayloadFromAdventOfCodeStub.onSecondCall().returns(secondStubbedReturn)

    return sb.persistLeaderboards(privateBoardOwnerId)
    .then(() => {
      return sb.listNewStars()
    })
    .then((v) => {
      var error = v[0], list = v[1]
      expect(error).to.be.null
      expect(list).to.be.a('array')
      expect(list).to.have.a.lengthOf(0)
      return sb.persistLeaderboards(privateBoardOwnerId)
    })
    .then(() => {
      return sb.listNewStars()
    })
    .then((v) => {
      var error = v[0], list = v[1]
      expect(getPayloadFromAdventOfCodeStub).calledTwice
      expect(error).to.be.null
      expect(list).to.be.a('array')
      expect(list).to.have.a.lengthOf(1)
      expect(list).to.include({name:'Alexis Philippe', stars:3})
    })
  })

})
