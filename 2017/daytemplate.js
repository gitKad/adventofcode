var chai = require('chai')
var expect = require('chai').expect
var chaiAsPromised = require("chai-as-promised")

chai.use(chaiAsPromised);

const day = -1
const Me = require('./me.js')
var AdventOfCodeChatter = require('./adventOfCodeChatter.js')

describe.skip('I, on day '+day+', ', () => {

  beforeEach(() => {
    me = new Me()
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
      expect(input).to.be.ok
    })
  })

})
