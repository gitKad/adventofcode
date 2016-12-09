var chai = require('chai')
var expect = require('chai').expect
var chaiAsPromised = require("chai-as-promised")

chai.use(chaiAsPromised);

var Me = require('./me.js')
var AdventOfCodeChatter = require('./adventOfCodeChatter.js')

describe('I, on day 3, ', () => {

  beforeEach(() => {
    me = new Me()
  })

  it('can tell if measurements give me a triangle', () => {
    expect(me.isATriangle([5, 10, 25])).to.eventually.be.false
    expect(me.isATriangle([2, 3, 4])).to.eventually.be.true
    expect(me.isATriangle([1, 1, 1])).to.eventually.be.true
  })

  it('can count real triangles in a set of measurements', () => {
    expect(me.countTriangles('5 10 25\r\n2 3 4\n1 1 1')).to.eventually.be.a('number').equal(2)
  })

  it('can transpose a matrix', () => {
    expect(me.transposeMatrix([[5,2,1],[10,3,1],[25,4,1]])).to.eventually.be.a('array').eql([[5,10,25],[2,3,4],[1,1,1]])
  })

  it('can rearenge the triangle input', () => {
    var testInput = '5 2 1\r\n10 3 1\r\n25 4 1\r\n1 2 3\r\n4 5 6\r\n7 8 9'
    var testExpectation = '5 10 25\r\n2 3 4\r\n1 1 1\r\n1 4 7\r\n2 5 8\r\n3 6 9'
    expect(me.rearengeTriangles(testInput)).to.eventually.be.a('string').eql(testExpectation)
  })

  it('can earn a gold star on day 3', () => {
    var aCC = new AdventOfCodeChatter()
    return aCC.getInput(3)
    .then((input) => {
      return me.countTriangles(input)
    })
    .then((combination) => {
      expect(combination).to.be.a('number').equal(1050)
    })
  })

  it('can earn a second gold star on day 3', () => {
    var aCC = new AdventOfCodeChatter()
    return aCC.getInput(3)
    .then((input) => {
      return me.rearengeTriangles(input)
    })
    .then((transposedInput) => {
      return me.countTriangles(transposedInput)
    })
    .then((combination) => {
      expect(combination).to.be.a('number').equal(1921)
    })
  })

})
