var chai = require('chai')
var expect = require('chai').expect
var chaiAsPromised = require("chai-as-promised")

chai.use(chaiAsPromised);

var Me = require('./me.js')
var AdventOfCodeChatter = require('./adventOfCodeChatter.js')

describe('I, on day 5, ', () => {

  beforeEach(() => {
    me = new Me()
  })

  it.skip('can earn a silver star on day 5', () => {
    var aCC = new AdventOfCodeChatter()
    return aCC.getInput(5)
    .then((input) => {
      expect(input).to.be.a('number').equal(1050)
    })
  })

  it.skip('can earn a gold star on day 5', () => {
    var aCC = new AdventOfCodeChatter()
    return aCC.getInput(5)
    .then((input) => {
      expect(input).to.be.a('number').equal(1921)
    })
  })

})
