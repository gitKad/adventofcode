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
  })

  describe('My passphrase', () => {
    it('can tell if it has duplicate words', () => {
      expect(new Passphrase('aa bb cc dd ee\n').hasDuplicateWords()).to.be.false
      expect(new Passphrase('aa bb cc dd aa\n').hasDuplicateWords()).to.be.true
      expect(new Passphrase('aa bb cc dd aaa\n').hasDuplicateWords()).to.be.false
    })

    it('can tell if it has anagrams', () => {
      expect(new Passphrase('abcde xyz ecdab\n').hasAnagrams()).to.be.true
      expect(new Passphrase('abcde fghij\n').hasAnagrams()).to.be.false
      expect(new Passphrase('a ab abc abd abf abj\n').hasAnagrams()).to.be.false
      expect(new Passphrase('iiii oiii ooii oooi oooo\n').hasAnagrams()).to.be.false
      expect(new Passphrase('oiii ioii iioi iiio\n').hasAnagrams()).to.be.true
    })
  })

  describe('I', () => {
    it('can count passphrases without repetition', () => {
      expect(me.countPassphrasesWithoutRepetition('aa bb cc dd ee\naa bb cc dd aa\naa bb cc dd aaa\n')).to.be.eql(2)
    })

    it('can count passphrases without anagrams', () => {
      expect(me.countPassphrasesWithoutAnagrams('abcde xyz ecdab\nabcde fghij\na ab abc abd abf abj\niiii oiii ooii oooi oooo\noiii ioii iioi iiio\n')).to.be.eql(3)
    })

    it('can earn a silver star on day '+day, () => {
      var aCC = new AdventOfCodeChatter()
      return aCC.getInput(day)
      .then((input) => {
        expect(me.countPassphrasesWithoutRepetition(input)).to.be.eql(477)
      })
    })
  
    it('can earn a gold star on day '+day, () => {
      var aCC = new AdventOfCodeChatter()
      return aCC.getInput(day)
      .then((input) => {
        expect(me.countPassphrasesWithoutAnagrams(input)).to.be.eql(167)
      })
    })
  })

})
