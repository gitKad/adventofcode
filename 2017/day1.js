var chai = require('chai')
var expect = require('chai').expect
var chaiAsPromised = require("chai-as-promised")

chai.use(chaiAsPromised);

const day = 1
const Me = require('./me.js')
var AdventOfCodeChatter = require('./adventOfCodeChatter.js')

describe('On day '+day+', ', () => {

  beforeEach(() => {
    me = new Me()
  })

  describe('I ', () => {
    it('can resolve simple captcha I was given as examples', () => {
      expect(me.solveSimpleCaptcha('1122')).to.be.eql(3)
      expect(me.solveSimpleCaptcha('1111')).to.be.eql(4)
      expect(me.solveSimpleCaptcha('1234')).to.be.eql(0)
      expect(me.solveSimpleCaptcha('91212129')).to.be.eql(9)
    })

    it('can resolve complex captcha I was given as examples', () => {
      expect(me.solveComplexCaptcha('1212')).to.be.eql(6)
      expect(me.solveComplexCaptcha('1221')).to.be.eql(0)
      expect(me.solveComplexCaptcha('123425')).to.be.eql(4)
      expect(me.solveComplexCaptcha('123123')).to.be.eql(12)
      expect(me.solveComplexCaptcha('12131415')).to.be.eql(4)
    })

    it('can earn a silver star on day '+day, () => {
      var aCC = new AdventOfCodeChatter()
      return aCC.getInput(day)
      .then((input) => {
        expect(me.solveSimpleCaptcha(input)).to.be.eql(1158)
      })
    })

    it('can earn a gold star on day '+day, () => {
      var aCC = new AdventOfCodeChatter()
      return aCC.getInput(day)
      .then((input) => {
        expect(me.solveComplexCaptcha(input)).to.be.eql(1132)
      })
    })
  })

})
