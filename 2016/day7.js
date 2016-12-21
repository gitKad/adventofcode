var chai = require('chai')
var expect = require('chai').expect
var chaiAsPromised = require("chai-as-promised")

chai.use(chaiAsPromised);

const Me = require('./me.js')
var AdventOfCodeChatter = require('./adventOfCodeChatter.js')

describe.skip('I, on day 7, ', () => {

  beforeEach(() => {
    me = new Me()
  })

  it.skip('can earn a silver star on day 6', () => {
    var aCC = new AdventOfCodeChatter()
    return aCC.getInput(7)
    .then((input) => {
      expect(input).to.be.ok
    })
  })

  it.skip('can earn a gold star on day 6', () => {
    var aCC = new AdventOfCodeChatter()
    return aCC.getInput(7)
    .then((input) => {
      expect(input).to.be.ok
    })
  })

})
