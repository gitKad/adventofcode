var chai = require('chai')
var expect = require('chai').expect
var chaiAsPromised = require("chai-as-promised")

chai.use(chaiAsPromised);

var Me = require('./me.js')
var AdventOfCodeChatter = require('./adventOfCodeChatter.js')

describe('I, on day 6, ', () => {

  beforeEach(() => {
    me = new Me()
  })

  it('can error-correct a message with the "most common" method', function() {
    var testInput = 'eedadn\r\ndrvtee\r\neandsr\r\nraavrd\r\natevrs\r\ntsrnev\r\nsdttsa\r\nrasrtv\r\nnssdts\r\nntnada\r\nsvetve\r\ntesnvt\r\nvntsnd\r\nvrdear\r\ndvrsen\r\nenarar'
    return expect(me.errorCorrect(testInput,'most')).to.eventually.be.a('string').with.lengthOf(6).eql('easter')
  })

  it('can error-correct a message with the "least common" method', function() {
    var testInput = 'eedadn\r\ndrvtee\r\neandsr\r\nraavrd\r\natevrs\r\ntsrnev\r\nsdttsa\r\nrasrtv\r\nnssdts\r\nntnada\r\nsvetve\r\ntesnvt\r\nvntsnd\r\nvrdear\r\ndvrsen\r\nenarar'
    return expect(me.errorCorrect(testInput,'least')).to.eventually.be.a('string').with.lengthOf(6).eql('advent')
  })

  it('can earn a silver star on day 6', function() {
    var aCC = new AdventOfCodeChatter()
    return aCC.getInput(6)
    .then((input) => {
      expect(me.errorCorrect(input, 'most')).to.eventually.be.a('string').equal('tsreykjj')
    })
  })

  it('can earn a gold star on day 6', function() {
    var aCC = new AdventOfCodeChatter()
    return aCC.getInput(6)
    .then((input) => {
      expect(me.errorCorrect(input, 'least')).to.eventually.be.a('string').equal('hnfbujie')
    })
  })

})
