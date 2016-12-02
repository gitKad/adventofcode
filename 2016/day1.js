var expect = require('chai').expect

var I = require('./I.js')
var AdventOfCodeChatter = require('./inputLurker.js');

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

    return i.simplifyAPathToADistance(example1Inputs)
    .then((result) => {
      expect(result).to.be.ok
      expect(result).to.be.a('number')
      expect(result).to.be.eql(example1Answer)
      return i.simplifyAPathToADistance(example2Inputs)
    })
    .then((result) => {
      expect(result).to.be.ok
      expect(result).to.be.a('number')
      expect(result).to.be.eql(example2Answer)
      return i.simplifyAPathToADistance(example3Inputs)
    })
    .then((result) => {
      expect(result).to.be.ok
      expect(result).to.be.a('number')
      expect(result).to.be.eql(example3Answer)
    })
  })

  it('can keep track of which direction I\'m going', () => {
    return i.wonderWhichDirectionIAmNowFacing('N','R')
    .then((result) => {
      expect(result).to.be.ok
      expect(result).to.be.a('string')
      expect(result).to.be.eql('E')
      return i.wonderWhichDirectionIAmNowFacing('E','R')
    })
    .then((result) => {
      expect(result).to.be.ok
      expect(result).to.be.a('string')
      expect(result).to.be.eql('S')
      return i.wonderWhichDirectionIAmNowFacing('N','L')
    })
    .then((result) => {
      expect(result).to.be.ok
      expect(result).to.be.a('string')
      expect(result).to.be.eql('W')
    })
  })

  it('can earn a silver star on day 1', () => {
    aCC = new AdventOfCodeChatter()
    aCC.getInput(1, function(input) {
      return i.simplifyAPathToADistance(input)
      .then((solution) => {
        console.log('sending solution '+solution+' to AoC');
        //aCC.postSolution(1, solution, () => {return Promise.resolve()})
      })
    })

  })
})
