var inputLurker = require('../inputLurker.js'),
    expect = require('chai').expect;

inputLurker.getInput(1, function(input) {
  main(input);
});

function main(input) {
  floor = 0;
  consumeInstructions(input);
}

function consumeInstructions(instructions) {
  for (var i = 0; i < instructions.length; i++) {
    if (instructions[i] == '(') {
      floor++;
    } else {
      floor--;
    }
    if (floor == -1) {
       break;
    }
  }
}

function getCurrentFloor() {
  return floor;
}


// Tests
describe('day1silverstar',function() {

  beforeEach(function() {
    main('');
  });

  it('starts on the ground floor', function() {
    expect(getCurrentFloor()).to.equal(0);
  });

  it('understands go down', function() {
    consumeInstructions(')');
    expect(getCurrentFloor()).to.equal(-1);
  });

  it('understands go up', function() {
    consumeInstructions('(');
    expect(getCurrentFloor()).to.equal(1);
  });

  it('understands example sequence 1', function() {
    consumeInstructions('(())');
    expect(getCurrentFloor()).to.equal(0);
  });

  it('understands example sequence 2', function() {
    consumeInstructions('()()');
    expect(getCurrentFloor()).to.equal(0);
  });

  it('understands example sequence 3', function() {
    consumeInstructions('(((');
    expect(getCurrentFloor()).to.equal(3);
  });

  it('understands example sequence 4', function() {
    consumeInstructions('(()(()(');
    expect(getCurrentFloor()).to.equal(3);
  });

  it('understands example sequence 5', function() {
    consumeInstructions('))(((((');
    expect(getCurrentFloor()).to.equal(3);
  });

  it('can reach the basement level according to example sequence 6', function() {
    consumeInstructions('())');
    expect(getCurrentFloor()).to.equal(-1);
  });

  it('can reach the basement level according to example sequence 7', function() {
    consumeInstructions('))(');
    expect(getCurrentFloor()).to.equal(-1);
  });

  it('can reach the basement level according to example sequence 8', function() {
    consumeInstructions(')))');
    expect(getCurrentFloor()).to.equal(-3);
  });

  it('can reach the basement level according to example sequence 9', function() {
    consumeInstructions(')())())');
    expect(getCurrentFloor()).to.equal(-3);
  });

});
