var chai = require('chai')
var expect = require('chai').expect
var chaiAsPromised = require("chai-as-promised")

chai.use(chaiAsPromised);

const day = 2
const Me = require('./me.js')
const Spreadsheet = require('./spreadsheet.js')
var AdventOfCodeChatter = require('./adventOfCodeChatter.js')

describe('On day '+day+', ', () => {

  beforeEach(() => {
    me = new Me()
    s1 = new Spreadsheet('5\t1\t9\t5\n7\t5\t3\n2\t4\t6\t8\n')
    s2 = new Spreadsheet('5\t9\t2\t8\n9\t4\t7\t3\n3\t8\t6\t5\n')
  })

  describe('My spreadsheet', () => {
    it('can be built from a text input', () => {
      expect(s1.data).to.be.an('array').with.lengthOf(3)
    })

    it('can tell the difference between max and min numbers in array', () => {
      expect(s1.differenceOfMinAndMax(s1.data[0])).to.be.eql(8)
      expect(s1.differenceOfMinAndMax(s1.data[1])).to.be.eql(4)
      expect(s1.differenceOfMinAndMax(s1.data[2])).to.be.eql(6)
    })
  
    it('can tell the division between evenly divisible numbers in array', () => {
      expect(s2.divisionOfEvenlyDivisible(s2.data[0])).to.be.eql(4)
      expect(s2.divisionOfEvenlyDivisible(s2.data[1])).to.be.eql(3)
      expect(s2.divisionOfEvenlyDivisible(s2.data[2])).to.be.eql(2)
    })
  })

  describe('I ', () => {
    it('can resolve simple spreadsheet checksum I was given as examples', () => {
      expect(me.calculateMinMaxChecksum(s1)).to.be.eql(18)
    })
  
    it('can resolve complex spreadsheet checksum I was given as examples', () => {
      expect(me.calculateEvenlyDivisibleChecksum(s2)).to.be.eql(9)
    })
  
    it('can earn a silver star on day '+day, () => {
      var aCC = new AdventOfCodeChatter()
      return aCC.getInput(day)
      .then((input) => {
        expect(me.calculateMinMaxChecksum(new Spreadsheet(input))).to.be.eql(47136)
      })
    })
  
    it('can earn a gold star on day '+day, () => {
      var aCC = new AdventOfCodeChatter()
      return aCC.getInput(day)
      .then((input) => {
        expect(me.calculateEvenlyDivisibleChecksum(new Spreadsheet(input))).to.be.eql(250)
      })
    })
  })

})
