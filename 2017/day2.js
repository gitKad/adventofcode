var chai = require('chai')
var expect = require('chai').expect
var chaiAsPromised = require("chai-as-promised")

chai.use(chaiAsPromised);

const day = 2
const Me = require('./me.js')
var AdventOfCodeChatter = require('./adventOfCodeChatter.js')

describe('On day '+day+', ', () => {

  beforeEach(() => {
    me = new Me()
  })

  describe('I ', () => {
    it('can tell the difference between max and min numbers in array', () => {
      expect(me.differenceOfMinAndMax([5, 1, 9, 5])).to.be.eql(8)
      expect(me.differenceOfMinAndMax([7, 5, 3])).to.be.eql(4)
      expect(me.differenceOfMinAndMax([2, 4, 6, 8])).to.be.eql(6)
    })
  
    it('can tell the division between evenly divisible numbers in array', () => {
      expect(me.divisionOfEvenlyDivisible([5, 9, 2, 8])).to.be.eql(4)
      expect(me.divisionOfEvenlyDivisible([9, 4, 7, 3])).to.be.eql(3)
      expect(me.divisionOfEvenlyDivisible([3, 8, 6, 5])).to.be.eql(2)
    })
  
    it('can resolve simple spreadsheet checksum I was given as examples', () => {
      expect(me.calculateMinMaxChecksum('5\t1\t9\t5\n7\t5\t3\n2\t4\t6\t8\n')).to.be.eql(18)
    })
  
    it('can resolve complex spreadsheet checksum I was given as examples', () => {
      expect(me.calculateEvenlyDivisibleChecksum('5\t9\t2\t8\n9\t4\t7\t3\n3\t8\t6\t5\n')).to.be.eql(9)
    })
  
    it('can earn a silver star on day '+day, () => {
      var aCC = new AdventOfCodeChatter()
      return aCC.getInput(day)
      .then((input) => {
        expect(me.calculateMinMaxChecksum(input)).to.be.eql(47136)
      })
    })
  
    it('can earn a gold star on day '+day, () => {
      var aCC = new AdventOfCodeChatter()
      return aCC.getInput(day)
      .then((input) => {
        expect(me.calculateEvenlyDivisibleChecksum(input)).to.be.eql(250)
      })
    })
  })

})
