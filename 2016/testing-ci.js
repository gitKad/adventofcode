var expect = require('chai').expect,
    inputLurker = require('../inputLurker');

describe('Environment', function () {

  // from ericmigno@github
  it('is ready to use chai with mocha', function () {
      expect(1 + 1).to.equal(2);
  });

  it('has helper that can get input from adventofcode',function() {
    inputLurker.getInput(1, function(input) {
      expect(input).to.have.length.above(0);
    });
  });

});
