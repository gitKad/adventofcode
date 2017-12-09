var chai = require('chai')
var expect = require('chai').expect
var chaiAsPromised = require("chai-as-promised")

chai.use(chaiAsPromised);

const day = 6
const Me = require('./me.js')
const MemoryArea = require('./memoryarea.js')
var AdventOfCodeChatter = require('./adventOfCodeChatter.js')

describe.only('On day '+day+', ', () => {

  beforeEach(() => {
    me = new Me()
  })

  describe('My memory area', () => {
    it('can be built from a text input', () => {
      expect(new MemoryArea('0\t2\t7\t0\n').area).to.be.an('array').with.lengthOf(4)
    })

    it('can tell the memory bank with the most blocks', () => {
      expect(new MemoryArea('0\t2\t7\t0\n').bankWithMostBlocks).to.be.eql(2)
      expect(new MemoryArea('2\t4\t1\t2\n').bankWithMostBlocks).to.be.eql(1)
      expect(new MemoryArea('3\t1\t2\t3\n').bankWithMostBlocks).to.be.eql(0)
      expect(new MemoryArea('0\t2\t3\t4\n').bankWithMostBlocks).to.be.eql(3)
      expect(new MemoryArea('1\t3\t4\t1\n').bankWithMostBlocks).to.be.eql(2)
    })

    it('can redistribute a memory bank\'s blocks', () => {
      let ma = new MemoryArea('0\t2\t7\t0\n')
      expect(ma.redistribute().area).to.be.eql([2, 4, 1, 2])
      expect(ma.redistribute().area).to.be.eql([3, 1, 2, 3])
      expect(ma.redistribute().area).to.be.eql([0, 2, 3, 4])
      expect(ma.redistribute().area).to.be.eql([1, 3, 4, 1])
      expect(ma.redistribute().area).to.be.eql([2, 4, 1, 2])
    })

    it('can save a memory bank size pattern', () => {
      let ma = new MemoryArea('0\t2\t7\t0\n')
      expect(ma.savedPatterns).to.be.an('array').with.lengthOf(0)
      ma.redistribute()
      expect(ma.savedPatterns).to.be.an('array').with.lengthOf(1).eql([[0, 2, 7, 0]])
    })

    it('can recognize a memory bank size pattern', () => {
      let ma = new MemoryArea('2\t4\t1\t2\n')
      expect(ma.hasEnteredInfiniteLoop).to.be.false
      ma.redistribute()
      ma.redistribute()
      ma.redistribute()
      ma.redistribute()
      expect(ma.hasEnteredInfiniteLoop).to.be.true
    })
  })

  describe('I', () => {
    it('can count redistribution cycles it takes to reach an infinite loop', () => {
      expect(me.countRedistributionCycles(new MemoryArea('0\t2\t7\t0\n'))).to.be.eql(5)
    })

    it('can count the number of cycles in an infinite loop', () => {
      expect(me.countInfiniteLoopCycles(new MemoryArea('0\t2\t7\t0\n'))).to.be.eql(4)
    })

    it.skip('can earn a silver star on day '+day, () => {
      var aCC = new AdventOfCodeChatter()
      return aCC.getInput(day)
      .then((input) => {
        expect(me.countRedistributionCycles(new MemoryArea(input))).to.be.eql(7864)
      })
    })
  
    it('can earn a gold star on day '+day, () => {
      var aCC = new AdventOfCodeChatter()
      return aCC.getInput(day)
      .then((input) => {
        expect(me.countInfiniteLoopCycles(new MemoryArea(input))).to.be.eql(1695)
      })
    })
  })

})
