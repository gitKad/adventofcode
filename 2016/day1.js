var chai = require('chai')
var expect = require('chai').expect
var chaiAsPromised = require("chai-as-promised")

chai.use(chaiAsPromised);

var I = require('./me.js')
var AdventOfCodeChatter = require('./inputLurker.js')

describe('I', () => {

  beforeEach(() => {
    i = new I()
  })

  it('can simplify a path to a single distance', () => {
    var example1Inputs = 'R2, L3'
    var example2Inputs = 'R2, R2, R2'
    var example3Inputs = 'R5, L5, R5, R3'
    var example1Answer = 5
    var example2Answer = 2
    var example3Answer = 12

    expect(i.simplifyAPathToADistance(example1Inputs)).to.eventually.be.a('number').equal(example1Answer)
    expect(i.simplifyAPathToADistance(example2Inputs)).to.eventually.be.a('number').equal(example2Answer)
    expect(i.simplifyAPathToADistance(example3Inputs)).to.eventually.be.a('number').equal(example3Answer)
  })

  it('can keep track of which direction I\'m going', () => {
    expect(i.wonderWhichDirectionIAmNowFacing('N','R')).to.eventually.be.a('string').equal('E')
    expect(i.wonderWhichDirectionIAmNowFacing('E','R')).to.eventually.be.a('string').equal('S')
    expect(i.wonderWhichDirectionIAmNowFacing('N','L')).to.eventually.be.a('string').equal('W')
    expect(i.wonderWhichDirectionIAmNowFacing('W','R')).to.eventually.be.a('string').equal('N')
    expect(i.wonderWhichDirectionIAmNowFacing('W','L')).to.eventually.be.a('string').equal('S')
  })

  it('works when going far', function() {
      return expect(i.simplifyAPathToADistance('L1337')).to.eventually.be.a('number').equal(1337)
  });

  it.skip('can remember I\'ve been here', () => {
    return i.walkUntilIRememberBeingHere(path)
    .then((result) => {
      expect(result).to.be.ok
      expect(result).to.be.a('number')
      expect(result).to.be.eql(example2Answer)
      return i.simplifyAPathToADistance(example3Inputs)
    })
  })

  it('can earn a gold star on day 1', () => {
    aCC = new AdventOfCodeChatter()
    aCC.getInput(1, function(input) {
      return expect(i.simplifyAPathToADistance(input)).to.eventually.be.a('number').equal(243)
    })

  })
})
