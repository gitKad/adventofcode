'use strict'

var Password = function () {
  this.rawPassword = ''
  this.scrambledPassword
}

Password.prototype.setRawPassword = function (data) {
  this.rawPassword = data.trim()
  this.scrambledPassword = undefined
  return this
}

Password.prototype.getScrambledPassword = function () {
  return this.scrambledPassword
}

Password.prototype.applyOperation = function (operation) {


    if(operation.match(/^(rotate based on position of letter )[a-h]+[\r\n]*$/g)) {
      let letter = operation.match(/[a-h]+[\r\n]*$/g)[0].trim()
      this.letterRotation(letter)

    } else if (operation.trim().match(/^(swap position )[0-9]+( with position )[0-9]+/g)) {
      let positions = operation.trim().match(/[0-9]+/g)
      this.positionSwap(positions[0],positions[1])

    } else if (operation.trim().match(/^(swap letter )[a-h]+( with letter )[a-h]+/g)) {
      let letters = operation.trim().match(/((swap letter )|(with letter ))[a-h]+/g)
      letters[0] = letters[0].match(/\s[a-h]+/g)[0].trim()
      letters[1] = letters[1].match(/\s[a-h]+/g)[0].trim()
      this.letterSwap(letters[0],letters[1])

    } else if (operation.trim().match(/^(rotate ((left)|(right)) )[0-9]+( step)[s]*/g)) {
      let direction = operation.trim().match(/((left)|(right))/g)[0]
      let steps = operation.trim().match(/[0-9]+/g)[0]
      this.stepRotation(direction,steps)

    } else if (operation.trim().match(/^(reverse positions )[0-9]+( through )[0-9]+[\r\n]*$/g)) {
      let positions = operation.trim().match(/[0-9]+/g)
      this.reversePositions(positions[0],positions[1])

    } else if (operation.trim().match(/^(move position )[0-9]+( to position )[0-9]+[\r\n]*$/g)) {
      let positions = operation.trim().match(/[0-9]+/g)
      this.movePositions(positions[0], positions[1])

    } else {
      throw(new Error('Can\'t recognize the following operation: '+operation))
    }
    return this
}

Password.prototype.movePositions = function (position1, position2) {
  let scrambledPassword = this.scrambledPassword || this.rawPassword
  scrambledPassword = scrambledPassword.trim()

  position1 = parseInt(position1)
  position2 = parseInt(position2)

  let charToMove = scrambledPassword.substr(position1, 1)
  scrambledPassword = scrambledPassword.substring(0, position1) + scrambledPassword.substring(position1+1)

  this.scrambledPassword = scrambledPassword.substring(0, position2)
  this.scrambledPassword += charToMove
  this.scrambledPassword += scrambledPassword.substring(position2)
  return this
}

Password.prototype.reversePositions = function (position1, position2) {
  let scrambledPassword = this.scrambledPassword || this.rawPassword
  scrambledPassword = scrambledPassword.trim()

  position2 = parseInt(position2)

  this.scrambledPassword = scrambledPassword.substring(0, position1)
  this.scrambledPassword += scrambledPassword.substring(position1, position2+1).split('').reverse().join('')
  this.scrambledPassword += scrambledPassword.substring(position2+1)
  return this
}

Password.prototype.stepRotation = function (direction, steps) {
  let scrambledPassword = this.scrambledPassword || this.rawPassword
  steps = parseInt(steps) % scrambledPassword.length

  switch (direction) {
    case 'left':
      scrambledPassword = scrambledPassword.substr(steps) + scrambledPassword.substr(0,steps)
      break;
    case 'right':
      scrambledPassword = scrambledPassword.substr(scrambledPassword.length - steps) + scrambledPassword.substr(0,scrambledPassword.length - steps)
      break;
    default: throw(new Error(direction+' is not a valid direction.'))
  }

  this.scrambledPassword = scrambledPassword
  return this
}

Password.prototype.letterRotation = function (letter) {
  let scrambledPassword = this.scrambledPassword || this.rawPassword
  let steps = scrambledPassword.indexOf(letter)
  let isGreaterThanFour = (steps >= 4) ? 1 : 0;
  steps = 1 + steps + isGreaterThanFour

  return this.stepRotation('right', steps )
}

Password.prototype.positionSwap = function (position1, position2) {
  let scrambledPassword = this.scrambledPassword || this.rawPassword
  let letter1 = scrambledPassword[position1]
  let letter2 = scrambledPassword[position2]
  position1 = parseInt(position1)
  position2 = parseInt(position2)

  scrambledPassword = scrambledPassword.substr(0, position1) + letter2 + scrambledPassword.substr(position1 + 1)
  scrambledPassword = scrambledPassword.substr(0, position2) + letter1 + scrambledPassword.substr(position2 + 1)

  this.scrambledPassword = scrambledPassword
  return this
}

Password.prototype.letterSwap = function (letter1, letter2) {
  let scrambledPassword = this.scrambledPassword || this.rawPassword
  let position1 = scrambledPassword.indexOf(letter1)
  let position2 = scrambledPassword.indexOf(letter2)

  return this.positionSwap(position1, position2)
}

module.exports = Password
