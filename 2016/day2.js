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

  it.skip('can read keypad instructions', () => {
    expect(me.figureOutNextDigit(5,'ULL')).to.eventually.be.a('number').equal(1)
    expect(me.figureOutNextDigit(1,'RRDDD')).to.eventually.be.a('number').equal(9)
    expect(me.figureOutNextDigit(9,'LURDL')).to.eventually.be.a('number').equal(8)
    expect(me.figureOutNextDigit(8,'UUUUD')).to.eventually.be.a('number').equal(5)
  })

  it.skip('can figure out combination from keypad instructions', () => {
    expect(me.figureOutCombination(5,'ULL\r\nRRDDD\r\nLURDL\r\nUUUUD')).to.eventually.be.a('number').equal(1985)
  })

  it.skip('can earn a gold star on day 2', () => {
    var aCC = new AdventOfCodeChatter()
    return aCC.getInput(1)
    .then((input) => {
      return me.walkAPath(input)
    })
    .then((position) => {
      return me.howFarIs(position)
    })
    .then((distance) => {
      expect(distance).to.be.a('number').equal(243)
    })
  })

  it.skip('can earn a second gold star on day 2', () => {
    var aCC = new AdventOfCodeChatter()
    return aCC.getInput(1)
    .then((input) => {
      return me.walkAPath(input)
    })
    .then(() => {
      return me.rememberBeingHere()
    })
    .then((position) => {
      return me.howFarIs(position)
    })
    .then((distance) => {
      expect(distance).to.be.a('number').equal(142)
    })
  })

})
