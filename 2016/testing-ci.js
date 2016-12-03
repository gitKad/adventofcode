var chai = require('chai')
var expect = chai.expect
var chaiAsPromised = require("chai-as-promised")

chai.use(chaiAsPromised);
var AdventOfCodeChatter = require('./adventOfCodeChatter.js');

describe('Environment', function () {

  // from ericmigno@github
  it('is ready to use chai with mocha', function () {
      expect(1 + 1).to.equal(2);
  });

  it('has helper that can get input from adventofcode',function() {
    var aCC = new AdventOfCodeChatter()
    expect(aCC.getInput(1)).to.eventually.be.a('number').of.length.above(0)
  });

});
