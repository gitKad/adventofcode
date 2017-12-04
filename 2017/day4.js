var chai = require('chai')
var expect = require('chai').expect
var chaiAsPromised = require("chai-as-promised")

chai.use(chaiAsPromised);

const day = 4
const Me = require('./me.js')
const Passphrase = require('./passphrase.js')
var AdventOfCodeChatter = require('./adventOfCodeChatter.js')

describe('On day '+day+', ', () => {

  beforeEach(() => {
    me = new Me()
    passphrase = new Passphrase()
  })

  describe('My passphrase', () => {
    it('can tell if it has duplicate words', () => {
      expect(new Passphrase('aa bb cc dd ee\n').hasDuplicateWords()).to.be.false
      expect(new Passphrase('aa bb cc dd aa\n').hasDuplicateWords()).to.be.true
      expect(new Passphrase('aa bb cc dd aaa\n').hasDuplicateWords()).to.be.false
    })

    it('can be valid or invalid', () => {
      expect(new Passphrase('aa bb cc dd ee\n').isValid()).to.be.true
      expect(new Passphrase('aa bb cc dd aa\n').isValid()).to.be.false
      expect(new Passphrase('aa bb cc dd aaa\n').isValid()).to.be.true
    })
  })

  describe('I', () => {
    it('can count valid passphrases', () => {
      expect(me.countValidPassphrases('aa bb cc dd ee\naa bb cc dd aa\naa bb cc dd aaa\n')).to.be.eql(2)
    })

    it('can earn a silver star on day '+day, () => {
      var aCC = new AdventOfCodeChatter()
      return aCC.getInput(day)
      .then((input) => {
        expect(input).to.be.ok
      })
    })
  
    it('can earn a gold star on day '+day, () => {
      var aCC = new AdventOfCodeChatter()
      return aCC.getInput(day)
      .then((input) => {
        expect(me.countValidPassphrases(input)).to.be.eql(2)
      })
    })
  })

})
