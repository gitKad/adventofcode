var chai = require('chai')
var expect = require('chai').expect
var chaiAsPromised = require("chai-as-promised")

chai.use(chaiAsPromised);

var Door = require('./door.js')
var AdventOfCodeChatter = require('./adventOfCodeChatter.js')

describe.only('I, on day 5, ', () => {

  beforeEach(() => {
    door = new Door()
  })

  it('can get the simple password for a door from its id.', function() {
    this.timeout(30000)
    expect(door.setId('abc').getSimplePassword()).to.be.a('string').eql('18f47a30')
  })

  it('can get the inspired password for a door from its id.', function() {
    this.timeout(60000)
    expect(door.setId('abc').getInspiredPassword()).to.be.a('string').eql('05ace8e3')
  })

  it('can earn a silver star on day 5', function() {
    this.timeout(0)

    var aCC = new AdventOfCodeChatter()
    return aCC.getInput(5)
    .then((input) => {
      expect(door.setId(input.trim()).getSimplePassword()).to.be.a('string').equal('f77a0e6e')
    })
  })

  it('can earn a silver star on day 5', function() {
    this.timeout(0)

    var aCC = new AdventOfCodeChatter()
    return aCC.getInput(5)
    .then((input) => {
      expect(door.setId(input.trim()).getInspiredPassword()).to.be.a('string').equal('999828ec')
    })
  })

})
