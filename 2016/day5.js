var chai = require('chai')
var expect = require('chai').expect
var sinon = require('sinon')
var chaiAsPromised = require("chai-as-promised")

chai.use(chaiAsPromised);

var Door = require('./door.js')
var AdventOfCodeChatter = require('./adventOfCodeChatter.js')

describe('I, on day 5, ', () => {

  beforeEach(() => {
    door = new Door()
  })

  it('can get the next interesting hash', function() {
    expect(door.setId('abc').getNextInterestingHash(3231920)[0]).to.be.a('string').match(/[0]{5}[1][0-f]{10}/)
    expect(door.setId('abc').getNextInterestingHash(3231920)[1]).to.be.a('number').eql(3231929)
    expect(door.setId('abc').getNextInterestingHash(5017300)[0]).to.be.a('string').match(/[0]{5}[8][0-f]{10}/)
    expect(door.setId('abc').getNextInterestingHash(5017300)[1]).to.be.a('number').eql(5017308)
    expect(door.setId('abc').getNextInterestingHash(5278560)[0]).to.be.a('string').match(/[0]{5}[f][0-f]{10}/)
    expect(door.setId('abc').getNextInterestingHash(5278560)[1]).to.be.a('number').eql(5278568)
  })

  it('can get the simple password for a door from its id.', function() {
    var getNextInterestingHashStub = sinon.stub(door,'getNextInterestingHash')
    getNextInterestingHashStub.onCall(0).returns(['00000155f8105dff7f56ee10fa9b9abd', 3231929])
    getNextInterestingHashStub.onCall(1).returns(['000008f82c5b3924a1ecbebf60344e00', 5017308])
    getNextInterestingHashStub.onCall(2).returns(['00000f9a2c309875e05c5a5d09f1b8c4', 5278568])
    getNextInterestingHashStub.onCall(3).returns(['000004e597bd77c5cd2133e9d885fe7e', 5357525])
    getNextInterestingHashStub.onCall(4).returns(['0000073848c9ff7a27ca2e942ac10a4c', 5708769])
    getNextInterestingHashStub.onCall(5).returns(['00000a9c311683dbbf122e9611a1c2d4', 6082117])
    getNextInterestingHashStub.onCall(6).returns(['000003c75169d14fdb31ec1593915cff', 8036669])
    getNextInterestingHashStub.onCall(7).returns(['0000000ea49fd3fc1b2f10e02d98ee96', 8605828])

    expect(door.setId('abc').getSimplePassword()).to.be.a('string').eql('18f47a30')
  })

  it.skip('can get the inspired password for a door from its id.', function() {
    this.timeout(60000)
    expect(door.setId('abc').getInspiredPassword()).to.be.a('string').eql('05ace8e3')
  })

  it.skip('can earn a silver star on day 5', function() {
    this.timeout(0)

    var aCC = new AdventOfCodeChatter()
    return aCC.getInput(5)
    .then((input) => {
      expect(door.setId(input.trim()).getSimplePassword()).to.be.a('string').equal('f77a0e6e')
    })
  })

  it.skip('can earn a silver star on day 5', function() {
    this.timeout(0)

    var aCC = new AdventOfCodeChatter()
    return aCC.getInput(5)
    .then((input) => {
      expect(door.setId(input.trim()).getInspiredPassword()).to.be.a('string').equal('999828ec')
    })
  })

})
