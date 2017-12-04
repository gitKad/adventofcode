var chai = require('chai')
var expect = require('chai').expect
var chaiAsPromised = require("chai-as-promised")

chai.use(chaiAsPromised);

const day = 3
const Me = require('./me.js')
const Grid = require('./grid.js')
var AdventOfCodeChatter = require('./adventOfCodeChatter.js')

describe('On day '+day+', ', () => {

  beforeEach(() => {
    me = new Me()
    grid = new Grid()
  })

  describe('My grid ', () => {
    it('can tell the size of the ring in which a number is found', () => {
      expect(grid.getSquareRingSize(1)).to.be.eql(1)
      expect(grid.getSquareRingSize(12)).to.be.eql(5)
      expect(grid.getSquareRingSize(23)).to.be.eql(5)
      expect(grid.getSquareRingSize(1024)).to.be.eql(33)
    })

    it('can tell the min distance from center of a ring', () => {
      expect(grid.getRingMinDistanceFromCenter(1)).to.be.eql(0)
      expect(grid.getRingMinDistanceFromCenter(5)).to.be.eql(2)
      expect(grid.getRingMinDistanceFromCenter(33)).to.be.eql(16)
    })

    it('can tell the max distance from center of a ring', () => {
      expect(grid.getRingMaxDistanceFromCenter(1)).to.be.eql(0)
      expect(grid.getRingMaxDistanceFromCenter(5)).to.be.eql(4)
      expect(grid.getRingMaxDistanceFromCenter(33)).to.be.eql(32)
    })
  })

  describe('I ', () => {
    it('can measure the number of steps to reach 1 in given examples', () => {
      expect(me.measureStepsToCenter(grid, 1)).to.be.eql(0)
      expect(me.measureStepsToCenter(grid, 12)).to.be.eql(3)
      expect(me.measureStepsToCenter(grid, 23)).to.be.eql(2)
      expect(me.measureStepsToCenter(grid, 1024)).to.be.eql(31)
    })
  
    it('can earn a silver star on day '+day, () => {
      var aCC = new AdventOfCodeChatter()
      return aCC.getInput(day)
      .then((input) => {
        expect(me.measureStepsToCenter(grid, input)).to.be.eql(475)
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
