var chai = require('chai')
var expect = require('chai').expect
var chaiAsPromised = require("chai-as-promised")

chai.use(chaiAsPromised);

const day = 5
const Me = require('./me.js')
const Instructions = require('./jumpInstructions.js')
var AdventOfCodeChatter = require('./adventOfCodeChatter.js')

describe('On day '+day+', ', () => {

  beforeEach(() => {
    me = new Me()
  })

  describe('My jump instructions', () => {
    it('can jump base on simple instructions', () => {
      expect(new Instructions('0\n3\n0\n1\n-3\n').jump(0)).to.be.eql(0)
      expect(new Instructions('0\n3\n0\n1\n-3\n').jump(4)).to.be.eql(1)
      expect(new Instructions('0\n3\n0\n1\n-3\n').jump(5)).to.be.NaN
    })

    it('can jump base on weird instructions', () => {
      expect(new Instructions('0\n3\n0\n1\n-3\n').weirdJump(1)).to.be.eql(4)
      expect(new Instructions('2\n4\n0\n1\n-2\n').weirdJump(1)).to.be.eql(5)
    })

    it('can predict it will go out of bounds', () => {
      expect(new Instructions('2\n4\n0\n1\n-2\n').willGoOutOfBounds(5)).to.be.true
    })
  })

  describe('I', () => {
    it('can reach the exit of the example in 5 steps', () => {
      expect(me.followJumpInstructions('0\n3\n0\n1\n-3\n')).to.be.eql(5)
      expect(me.followWeirdJumpInstructions('0\n3\n0\n1\n-3\n')).to.be.eql(10)
    })

    it('can earn a silver star on day '+day, () => {
      var aCC = new AdventOfCodeChatter()
      return aCC.getInput(day)
      .then((input) => {
        expect(me.followJumpInstructions(input)).to.be.eql(343467)
      })
    })
  
    it('can earn a gold star on day '+day, () => {
      var aCC = new AdventOfCodeChatter()
      return aCC.getInput(day)
      .then((input) => {
        expect(me.followWeirdJumpInstructions(input)).to.be.eql(24774780)
      })
    })
  })

})
