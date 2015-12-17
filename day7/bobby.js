var Bobby = function(){
};

Bobby.prototype.readsTargetWire = function (instruction) {
  var words = instruction.split(' ');
  return words[words.length - 1];
};

Bobby.prototype.readsBitwiseOperator = function (instruction) {
  var operators = instruction.match(/(not|or|and|not|lshift|rshift)/gi);
  return (operators == null) ? 'assign' : operators[0].toLowerCase();
};

Bobby.prototype.performsBitOperation = function (bitwiseOperator,properties) {
  var result = false;
  switch (bitwiseOperator) {
    case 'not':
      result = +properties[0] ^ 65535;
      break;
    case 'lshift':
      result = +properties[0] << +properties[1];
      break;
    case 'rshift':
      result = +properties[0] >> +properties[1];
      break;
    case 'and':
      result = +properties[0] & +properties[1];
      break;
    case 'or':
      result = +properties[0] | +properties[1];
      break;
    case 'assign':
      result = +properties[0];
      break;
    default:
      result
  }
  return result;
};

Bobby.prototype.appliesInstruction = function (wiresObject, instruction) {
  var operator = this.readsBitwiseOperator(instruction);
  var words = instruction.split(' ');
  var properties;
  switch (operator) {
    case 'not':
      properties = [words[1]];
      break;
    case 'lshift':
      properties = [words[0],words[2]];
      break;
    case 'rshift':
      properties = [words[0],words[2]];
      break;
    case 'and':
      properties = [words[0],words[2]];
      break;
    case 'or':
      properties = [words[0],words[2]];
      break;
    case 'assign':
      properties = [words[0]];
      break;
    default:
      console.log('u mad!?');
  }

  // checks if every properties are numbers
  var propertiesAreNumbers = properties.reduce(function(a,b) {
    var patt = new RegExp("/\d+/g");
    return (patt.test(a) && patt.test(b));
  }, '1' );

  if (propertiesAreNumbers)
    return this.assigns(wiresObject, this.readsTargetWire(instruction), this.performsBitOperation(operator,properties));
  else {
    return false;
  }
};

Bobby.prototype.assigns = function(wiresObject, wire, value) {
  wiresObject[wire] = value;
  return wiresObject;
};

Bobby.prototype.reads = function(wiresObject, wire){
  return wiresObject[wire];
};

module.exports = Bobby;
