var chai = require('chai')
var expect = require('chai').expect
var chaiAsPromised = require("chai-as-promised")

chai.use(chaiAsPromised);

const day = 21
const Me = require('./me.js')
const Password = require('./password.js')
var Promise = require('bluebird')
var AdventOfCodeChatter = require('./adventOfCodeChatter.js')

describe('I, on day '+day, () => {

  beforeEach(() => {
    me = new Me()
    password = new Password()
  })

  it('can swap position X with position Y', function() {
    expect(password.setRawPassword('abcde').applyOperation('swap position 4 with position 0').getScrambledPassword()).to.be.a('string').eql('ebcda')
    expect(password.setRawPassword('acgebfhd').applyOperation('swap position 6 with position 4').getScrambledPassword()).to.be.a('string').eql('acgehfbd')
  })

  it('swap letter X with letter Y', function() {
    expect(password.setRawPassword('ebcda').applyOperation('swap letter d with letter b').getScrambledPassword()).to.be.a('string').eql('edcba')
  })

  it('can rotate left/right X steps', function() {
    expect(password.setRawPassword('abcde').applyOperation('rotate left 1 step').getScrambledPassword()).to.be.a('string').eql('bcdea')
  })

  it('can rotate based on position of letter X', function() {
    expect(password.setRawPassword('abdec').applyOperation('rotate based on position of letter b').getScrambledPassword()).to.be.a('string').eql('ecabd')
    expect(password.applyOperation('rotate based on position of letter d').getScrambledPassword()).to.be.a('string').eql('decab')
  })

  it('can reverse positions X through Y', function() {
    expect(password.setRawPassword('edcba').applyOperation('reverse positions 0 through 4').getScrambledPassword()).to.be.a('string').eql('abcde')
    expect(password.applyOperation('reverse positions 1 through 3').getScrambledPassword()).to.be.a('string').eql('adcbe')
  })

  it('can move position X to position Y', function() {
    expect(password.setRawPassword('bcdea').applyOperation('move position 1 to position 4').getScrambledPassword()).to.be.a('string').eql('bdeac')
    expect(password.setRawPassword('bdeac').applyOperation('move position 3 to position 0').getScrambledPassword()).to.be.a('string').eql('abdec')
  })

  it('can earn a silver star on day '+day, () => {
    var aCC = new AdventOfCodeChatter()

    password.setRawPassword('abcdefgh')

    return aCC.getInput(day)
    .then((input) => {
      expect(input).to.be.ok
      return Promise.each(input.trim().split('\n'),function(operation) {
        password.applyOperation(operation)
      })
    })
    .then(() => {
      expect(password.getScrambledPassword()).to.be.a('string').eql('aefgbcdh')
    })
  })

  it.skip('can earn a gold star on day '+day, () => {
    var aCC = new AdventOfCodeChatter()

    password.setRawPassword('abcdefgh')

    return aCC.getInput(day)
    .then((input) => {
      expect(input).to.be.ok
      return Promise.each(input.trim().split('\n'),function(operation) {
        password.applyOperation(operation)
      })
    })
    .then(() => {
      expect(password.getScrambledPassword()).to.be.a('string').eql('')
    })

  })

})
