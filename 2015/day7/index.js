var inputLurker = require('../inputLurker.js'),
    expect = require('chai').expect,
    Bobby = require('./bobby.js');

inputLurker.getInput(1, function(input) {
  main(input);
});

function main(input) {

  var bobby = new Bobby();
  var wiresObject = {};
  input = input.split('\r\n');

  while(typeof wiresObject['a'] == 'undefined') {
    for (var i = 0; i < input.length; i++) {
      if(bobby.appliesInstruction(wiresObject,input[i]) !== false ) {
        input.splice(i,1);
      }
    }
  }
  console.log(wiresObject['a']);
}

describe('On day 7, Bobby',function() {

  before(function(){
    bobby = new Bobby();
    wiresObject = {};
  });

  it('can understand output wire from instruction', function() {
    expect(bobby.readsTargetWire('bla bla bla -> ac')).to.equal('ac');
    expect(bobby.readsTargetWire('bla 25 -> z')).to.equal('z');
  });

  it('can understand bitwise operations from instruction', function() {
    expect(bobby.readsBitwiseOperator('NOT 1337 -> bbq')).to.equal('not');
    expect(bobby.readsBitwiseOperator('1337 LSHIFT 1337 -> bbq')).to.equal('lshift');
    expect(bobby.readsBitwiseOperator('1337 RSHIFT 1337 -> bbq')).to.equal('rshift');
    expect(bobby.readsBitwiseOperator('1337 AND 1337 -> bbq')).to.equal('and');
    expect(bobby.readsBitwiseOperator('1337 OR 1337 -> bbq')).to.equal('or');
  });

  it('can perform any bitwise operation on a signal', function() {
    expect(bobby.performsBitOperation('not',[1337])).to.equal(64198);
    expect(bobby.performsBitOperation('lshift',[1337,1])).to.equal(2674);
    expect(bobby.performsBitOperation('rshift',[1337,1])).to.equal(668);
    expect(bobby.performsBitOperation('and',[1337,7331])).to.equal(1057);
    expect(bobby.performsBitOperation('or',[1337,7331])).to.equal(7611);
  });

  it('can assign and read value on wire', function() {
    bobby.assigns(wiresObject,'bbq',1337);
    expect(bobby.reads(wiresObject,'bbq')).to.equal(1337);
  });

  it('can understand an instruction', function() {
    bobby.appliesInstruction(wiresObject,'not 1337 -> bbq');
    expect(bobby.reads(wiresObject,'bbq')).to.equal(64198);
    bobby.appliesInstruction(wiresObject,'1337 and 7331 -> bbq');
    expect(bobby.reads(wiresObject,'bbq')).to.equal(1057);
    bobby.appliesInstruction(wiresObject,'1337 -> bbq');
    expect(bobby.reads(wiresObject,'bbq')).to.equal(1337);
  });

  it('can transform a signal in a circuit', function() {
    bobby.assigns(wiresObject,'bbq',1337);
    bobby.appliesInstruction(wiresObject,'not bbq -> wtf');
    expect(bobby.reads(wiresObject,'wtf')).to.equal(1337);
  });

  it('enjoys prooving he isn\'t lost following silver star samples');

  it('enjoys prooving he solves Alexis\' silver star input');

  it('enjoys prooving he isn\'t lost following gold star samples');

  it('enjoys prooving he solves Alexis\' gold star input');

});
