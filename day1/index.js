var inputLurker = require('../inputLurker.js'),
    expect = require('chai').expect;

inputLurker.getInput(1, function(input) {
  main(input);
});

function main(input) {
  finalFloor = 0;
  enteringBasementAtInstruction = 0;
  receiveInstructions(input);
}

function receiveInstructions(instructions) {

  finalFloor = instructions.split('').reduce(function(currentFloor,nextInstruction,step) {
    currentFloor += nextInstruction == '(' ? 1 : -1;
    if (currentFloor == -1 && !hasGoneToTheBasementBefore()) {
        enteringBasementAtInstruction = (step+1);
    }
    return currentFloor;
  },0);

}

function hasGoneToTheBasementBefore() {
  return enteringBasementAtInstruction;
}

function getCurrentFloor() {
  return finalFloor;
}

describe('On day 1, Santa',function() {

  beforeEach(function() {
    main('');
  });

  it('starts on the ground floor', function() {
    expect(getCurrentFloor()).to.equal(0);
  });

  it('can go down', function() {
    receiveInstructions(')');
    expect(getCurrentFloor()).to.equal(-1);
  });

  it('can go up', function() {
    receiveInstructions('(');
    expect(getCurrentFloor()).to.equal(1);
  });

  it('can follow a path', function() {
    receiveInstructions('))(');
    expect(getCurrentFloor()).to.equal(-1);
  });

  it('can remember when he first got into the basement',function(){
    receiveInstructions('())((()))))(((((');
    expect(hasGoneToTheBasementBefore()).to.equal(3);
  });

  it('enjoys prooving he isn\'t lost following silver star samples', function() {
    receiveInstructions('(())');
    expect(getCurrentFloor()).to.equal(0);
    main('');
    receiveInstructions('()()');
    expect(getCurrentFloor()).to.equal(0);
    main('');
    receiveInstructions('(((');
    expect(getCurrentFloor()).to.equal(3);
    main('');
    receiveInstructions('(()(()(');
    expect(getCurrentFloor()).to.equal(3);
    main('');
    receiveInstructions('))(((((');
    expect(getCurrentFloor()).to.equal(3);
    main('');
    receiveInstructions('())');
    expect(getCurrentFloor()).to.equal(-1);
    main('');
    receiveInstructions('))(');
    expect(getCurrentFloor()).to.equal(-1);
    main('');
    receiveInstructions(')))');
    expect(getCurrentFloor()).to.equal(-3);
    main('');
    receiveInstructions(')())())');
    expect(getCurrentFloor()).to.equal(-3);
  });

  it('enjoys prooving he solves Alexis\' silver star input', function() {
    inputLurker.getInput(1, function(input) {
      main(input);
      expect(getCurrentFloor()).to.equal(1783);
    });
  });

  it('enjoys prooving he isn\'t lost following gold star samples', function() {
    receiveInstructions(')');
    expect(hasGoneToTheBasementBefore()).to.equal(1);
    main('');
    receiveInstructions('()())');
    expect(hasGoneToTheBasementBefore()).to.equal(5);
  });

  it('enjoys prooving he solves Alexis\' gold star input', function() {
    inputLurker.getInput(1, function(input) {
      main(input);
      expect(hasGoneToTheBasementBefore()).to.equal(232);
    });
  });

});
