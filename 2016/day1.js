var expect = require('chai').expect

var I = require('./I.js')
var inputLurker = require('./inputLurker.js');



describe('I', () => {

  beforeEach(() => {
    i = new I()
    inputLurker.getInput(1, function(input) {
      silverStarInput = input
    });
  })

  it('can simplify a path to a single distance', () => {
    var example1Inputs = 'R2, R2, R2'
    var example1Answer = 2

    return i.simplifyAPathToADistance(example1Inputs)
    .then((result) => {
      expect(result).to.be.ok
      expect(result).to.be.a('number')
      expect(result).to.be.eql(example1Answer)
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

  it.skip('can earn a silver star', () => {

  })
})
