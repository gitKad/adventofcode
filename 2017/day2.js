var chai = require('chai')
var expect = require('chai').expect
var chaiAsPromised = require("chai-as-promised")

chai.use(chaiAsPromised);

const day = 2
const Me = require('./me.js')
var AdventOfCodeChatter = require('./adventOfCodeChatter.js')

describe('I, on day '+day+', ', () => {

  beforeEach(() => {
    me = new Me()
    exampleSpreadsheet = '5\t1\t9\t5\n7\t5\t3\n2\t4\t6\t8\n'
  })

  it('can tell the difference between max and min in a spreadsheet row', () => {
    expect(me.differenceOfMinAndMax([5, 1, 9, 5])).to.be.eql(8)
    expect(me.differenceOfMinAndMax([7, 5, 3])).to.be.eql(4)
    expect(me.differenceOfMinAndMax([2, 4, 6, 8])).to.be.eql(6)
  })

  it('can resolve simple spreadsheet checksum I was given as examples', () => {
    expect(me.calculateChecksum(exampleSpreadsheet)).to.be.eql(18)
  })

  it('can earn a silver star on day '+day, () => {
    var aCC = new AdventOfCodeChatter()
    return aCC.getInput(day)
    .then((input) => {
      expect(me.calculateChecksum(input)).to.be.eql(47136)
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
