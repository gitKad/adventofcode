var chai = require('chai')
var expect = require('chai').expect
var chaiAsPromised = require("chai-as-promised")

chai.use(chaiAsPromised);

var Me = require('./me.js')
var AdventOfCodeChatter = require('./adventOfCodeChatter.js')

describe('I, on day 1, ', () => {

  beforeEach(() => {
    me = new Me()
  })

  it('can tell how far I am from the drop location', () => {
    expect(me.howFarIs({x:2, y:3})).to.eventually.be.a('number').equal(5)
    expect(me.howFarIs({x:0, y:-2})).to.eventually.be.a('number').equal(2)
    expect(me.howFarIs({x:10, y:2})).to.eventually.be.a('number').equal(12)
  })

  it('can walk a path', () => {
    expect(me.walkAPath('R2, L3')).to.eventually.be.eql({x:2, y:3})
    expect(me.walkAPath('R2, R2, R2')).to.eventually.be.eql({x:0, y:-2})
    expect(me.walkAPath('R5, L5, R5, R3')).to.eventually.be.eql({x:10, y:2})
  })

  it('can keep track of which direction I\'m going', () => {
    expect(me.wonderWhichDirectionIAmNowFacing('N','R')).to.eventually.be.a('string').equal('E')
    expect(me.wonderWhichDirectionIAmNowFacing('N','L')).to.eventually.be.a('string').equal('W')
    expect(me.wonderWhichDirectionIAmNowFacing('W','R')).to.eventually.be.a('string').equal('N')
    expect(me.wonderWhichDirectionIAmNowFacing('W','L')).to.eventually.be.a('string').equal('S')
  })

  it('can go far without getting list', () => {
    return me.walkAPath('L1337')
    .then((position) => {
      expect(position).to.be.eql({x:-1337,y:0})
      return me.howFarIs(position)
    })
    .then((distance) => {
      expect(distance).to.be.a('number').eql(1337)
    })
  })

  it('can remember I\'ve been here', () => {
    var examplePath = 'R8, R4, R4, R8'
    var exampleSolution = 4

    return me.walkAPath(examplePath)
    .then(() => {
      return me.rememberBeingHere()
    })
    .then((position) => {
      expect(position).to.be.eql({x:4,y:0})
      return me.howFarIs(position)
    })
    .then((distance) => {
      expect(distance).to.be.a('number').eql(exampleSolution)
    })
  })

  it('can earn a gold star on day 1', () => {
    var aCC = new AdventOfCodeChatter()
    return aCC.getInput(1)
    .then((input) => {
      return me.walkAPath(input)
    })
    .then((position) => {
      return me.howFarIs(position)
    })
    .then((distance) => {
      expect(distance).to.be.a('number').equal(243)
    })
  })

  it('can earn a silver star on day 1', () => {
    var aCC = new AdventOfCodeChatter()
    return aCC.getInput(1)
    .then((input) => {
      return me.walkAPath(input)
    })
    .then(() => {
      return me.rememberBeingHere()
    })
    .then((position) => {
      return me.howFarIs(position)
    })
    .then((distance) => {
      expect(distance).to.be.a('number').equal(142)
    })
  })

})
