var chai = require('chai')
var expect = require('chai').expect
var chaiAsPromised = require("chai-as-promised")

chai.use(chaiAsPromised);

var Me = require('./me.js')
var AdventOfCodeChatter = require('./adventOfCodeChatter.js')

describe('I, on day 2, ', () => {

  beforeEach(() => {
    me = new Me()
  })

  it('can read keypad instructions', () => {
    expect(me.figureOutNextDigit('ordinary','5','ULL')).to.eventually.be.a('string').equal('1')
    expect(me.figureOutNextDigit('ordinary','1','RRDDD')).to.eventually.be.a('string').equal('9')
    expect(me.figureOutNextDigit('ordinary','9','LURDL')).to.eventually.be.a('string').equal('8')
    expect(me.figureOutNextDigit('ordinary','8','UUUUD')).to.eventually.be.a('string').equal('5')
  })

  it('can figure out combination from instructions on ordinary keypad', () => {
    expect(me.figureOutCombination('ordinary','ULL\r\nRRDDD\r\nLURDL\r\nUUUUD')).to.eventually.be.a('string').equal('1985')
  })

  it('can figure out combination from keypad instructions on funky keypad', () => {
    expect(me.figureOutCombination('funky','ULL\r\nRRDDD\r\nLURDL\r\nUUUUD')).to.eventually.be.a('string').equal('5DB3')
  })

  it('can earn a silver star on day 2', () => {
    var aCC = new AdventOfCodeChatter()
    return aCC.getInput(2)
    .then((input) => {
      return me.figureOutCombination('ordinary',input)
    })
    .then((combination) => {
      expect(combination).to.be.a('string').equal('95549')
    })
  })

  it('can earn a gold star on day 2', () => {
    var aCC = new AdventOfCodeChatter()
    return aCC.getInput(2)
    .then((input) => {
      return me.figureOutCombination('funky',input)
    })
    .then((combination) => {
      expect(combination).to.be.a('string').equal('D87AD')
    })
  })

})
