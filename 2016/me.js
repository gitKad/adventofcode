'use strict'

var Promise = require('bluebird')

var Me = function() {
  this.placesIHaveBeen = []
}

Me.prototype.figureOutCombination = function (keypad, instructions) {
  var combination = []
  var position = '5'
  var instructionRows = instructions.trim().split(/[\s]+/)
  return Promise.each(instructionRows, (instructionRow) => {
    return this.figureOutNextDigit(keypad, position, instructionRow)
    .then((digit) => {
      position = digit
      combination.push(digit)
      return Promise.resolve()
    })
  })
  .then(() => {
    return Promise.resolve(combination.join(''))
  })
}

Me.prototype.figureOutNextDigit = function (keypad, position, instructions) {
  return Promise.each(instructions, (instruction) => {
    return this.applyNextDigitInstruction(keypad, position, instruction)
    .then((digit) => {
      position = digit
      return Promise.resolve()
    })
  }).then(() => {
    return Promise.resolve(position)
  })

}

Me.prototype.applyNextDigitInstruction = function (keypad, position, instruction) {
  const ordinaryKeypad = {
    '1' : {'U':'1', 'R':'2', 'D':'4', 'L':'1'},
    '2' : {'U':'2', 'R':'3', 'D':'5', 'L':'1'},
    '3' : {'U':'3', 'R':'3', 'D':'6', 'L':'2'},
    '4' : {'U':'1', 'R':'5', 'D':'7', 'L':'4'},
    '5' : {'U':'2', 'R':'6', 'D':'8', 'L':'4'},
    '6' : {'U':'3', 'R':'6', 'D':'9', 'L':'5'},
    '7' : {'U':'4', 'R':'8', 'D':'7', 'L':'7'},
    '8' : {'U':'5', 'R':'9', 'D':'8', 'L':'7'},
    '9' : {'U':'6', 'R':'9', 'D':'9', 'L':'8'}}

  const funkyKeypad = {
    '1' : {'U':'1', 'R':'1', 'D':'3', 'L':'1'},
    '2' : {'U':'2', 'R':'3', 'D':'6', 'L':'2'},
    '3' : {'U':'1', 'R':'4', 'D':'7', 'L':'2'},
    '4' : {'U':'4', 'R':'4', 'D':'8', 'L':'3'},
    '5' : {'U':'5', 'R':'6', 'D':'5', 'L':'5'},
    '6' : {'U':'2', 'R':'7', 'D':'A', 'L':'5'},
    '7' : {'U':'3', 'R':'8', 'D':'B', 'L':'6'},
    '8' : {'U':'4', 'R':'9', 'D':'C', 'L':'7'},
    '9' : {'U':'9', 'R':'9', 'D':'9', 'L':'8'},
    'A' : {'U':'6', 'R':'B', 'D':'A', 'L':'A'},
    'B' : {'U':'7', 'R':'C', 'D':'D', 'L':'A'},
    'C' : {'U':'8', 'R':'C', 'D':'C', 'L':'B'},
    'D' : {'U':'B', 'R':'D', 'D':'D', 'L':'D'}}

  switch (keypad) {
    case 'funky':
      return Promise.resolve(funkyKeypad[position][instruction])
    case 'ordinary':
      return Promise.resolve(ordinaryKeypad[position][instruction])
    default:
      return Promise.reject(keypad+' is not a known keypad model')
  }
}

Me.prototype.walkAPath = function (easterBunnyRecruitingDocument) {
  var i = this
  var direction = 'N'
  easterBunnyRecruitingDocument = easterBunnyRecruitingDocument.split(/\s*,\s*/)

  return Promise.reduce(easterBunnyRecruitingDocument, (acc, val) => {
    let turn = val[0]
    let distance = parseInt(val.substring(1))

    return i.wonderWhichDirectionIAmNowFacing(direction,turn)
    .then((newDirection) => {
      direction = newDirection

      for (var j = 0; j < distance; j++) {
        switch (direction) {
          case 'W': acc.x--; break;
          case 'E': acc.x++; break;
          case 'N': acc.y++; break;
          case 'S': acc.y--; break;
        }
        i.placesIHaveBeen.push({x: acc.x, y:acc.y})
      }
      return {x: acc.x, y:acc.y}
    })

  }, {x:0, y:0})
}

Me.prototype.howFarIs = function(position) {
  return Promise.resolve(Math.abs(position.x)+Math.abs(position.y))
}

Me.prototype.wonderWhichDirectionIAmNowFacing = function (direction, turn) {
  var directionVal
  var directions = ['N','E','S','W']

  return new Promise(function(resolve, reject) {
    for (var i = 0; i < directions.length; i++) {
      if( directions[i] == direction) {
        directionVal = i
        break;
      }
    }

    directions.push('N')
    directions.splice(0,0,'W')
    directionVal++

    switch (turn) {
      case 'L': resolve(directions[--directionVal]); break;
      case 'R': resolve(directions[++directionVal]); break;
      default: reject('not a valid turn {\'L\',\'R\'}')
    }
  })
}

Me.prototype.rememberBeingHere = function () {
  for (var i = 0; i < this.placesIHaveBeen.length; i++) {
    for (var j = 0; j < this.placesIHaveBeen.length; j++) {
      if( j != i &&
        this.placesIHaveBeen[i].x == this.placesIHaveBeen[j].x &&
        this.placesIHaveBeen[i].y == this.placesIHaveBeen[j].y ) {
        return Promise.resolve(this.placesIHaveBeen[i])
      }
    }
  }
  return Promise.reject('never been to the same place twice')
}

module.exports = Me
