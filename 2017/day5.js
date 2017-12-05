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
    it('can step forward', () => {
      expect(new Instructions('0\n3\n0\n1\n-3\n').jump(0)).to.be.eql(0)
    })

    it('can step backward', () => {
      expect(new Instructions('0\n3\n0\n1\n-3\n').jump(4)).to.be.eql(1)
    })

    it('won\'t go out of bounds', () => {
      expect(new Instructions('2\n4\n0\n1\n-2\n').jump(5)).to.be.NaN
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
