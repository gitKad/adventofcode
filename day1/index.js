var inputLurker = require('../inputLurker.js'),
    expect = require('chai').expect;

inputLurker.getInput(1, function(input) {
  main(input);
});

function main(input) {
  floor = 0;
  enteringBasementAtInstruction = false;
  consumeInstructions(input);
}

function consumeInstructions(instructions) {
  for (var i = 0; i < instructions.length; i++) {
    if (instructions[i] == '(') {
      floor++;
    } else {
      floor--;
    }
    if (floor == -1 && !hasGoneToTheBasementBefore()) {
        enteringBasementAtInstruction = (i+1);
    }
  }
}

function hasGoneToTheBasementBefore() {
  return enteringBasementAtInstruction;
}

function getCurrentFloor() {
  return floor;
}

describe('On day 1, Santa',function() {

  beforeEach(function() {
    main('');
  });

  it('starts on the ground floor', function() {
    expect(getCurrentFloor()).to.equal(0);
  });

  it('can go down', function() {
    consumeInstructions(')');
    expect(getCurrentFloor()).to.equal(-1);
  });

  it('can go up', function() {
    consumeInstructions('(');
    expect(getCurrentFloor()).to.equal(1);
  });

  it('can follow a path', function() {
    consumeInstructions('))(');
    expect(getCurrentFloor()).to.equal(-1);
  });

  it('can remember when he first got into the basement');

  it('enjoys prooving he isn\'t lost following silver star samples', function() {
    consumeInstructions('(())');
    expect(getCurrentFloor()).to.equal(0);
    main('');
    consumeInstructions('()()');
    expect(getCurrentFloor()).to.equal(0);
    main('');
    consumeInstructions('(((');
    expect(getCurrentFloor()).to.equal(3);
    main('');
    consumeInstructions('(()(()(');
    expect(getCurrentFloor()).to.equal(3);
    main('');
    consumeInstructions('))(((((');
    expect(getCurrentFloor()).to.equal(3);
    main('');
    consumeInstructions('())');
    expect(getCurrentFloor()).to.equal(-1);
    main('');
    consumeInstructions('))(');
    expect(getCurrentFloor()).to.equal(-1);
    main('');
    consumeInstructions(')))');
    expect(getCurrentFloor()).to.equal(-3);
    main('');
    consumeInstructions(')())())');
    expect(getCurrentFloor()).to.equal(-3);
  });

  it('enjoys prooving he solves Alexis\' silver star input', function() {
    inputLurker.getInput(1, function(input) {
      main(input);
      expect(getCurrentFloor()).to.equal(1783);
    });
  });

  it('enjoys prooving he isn\'t lost following gold star samples', function() {
    consumeInstructions(')');
    expect(hasGoneToTheBasementBefore()).to.equal(1);
    main('');
    consumeInstructions('()())');
    expect(hasGoneToTheBasementBefore()).to.equal(5);
  });

  it('enjoys prooving he solves Alexis\' gold star input', function() {
    inputLurker.getInput(1, function(input) {
      main(input);
      expect(hasGoneToTheBasementBefore()).to.equal(232);
    });
  });

});
