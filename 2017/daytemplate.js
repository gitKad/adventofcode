var chai = require('chai')
var expect = require('chai').expect
var chaiAsPromised = require("chai-as-promised")

chai.use(chaiAsPromised);

const day = -1 // <-- here
const Me = require('./me.js')
// const Thing = require('./thing.js')
var AdventOfCodeChatter = require('./adventOfCodeChatter.js')

describe.skip('On day '+day+', ', () => {

  beforeEach(() => {
    me = new Me()
  })

  // describe('My thing', () => {
  //   it('can do a basic thing', () => {
  //     expect(true).to.be.ok
  //   })
  // })

  describe('I', () => {
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

})
