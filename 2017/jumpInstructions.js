'use strict'

var Promise = require('bluebird')

class JumpInstructions {
  constructor (text) {
    this.instructions = text
      .replace(/\n$/gm,'')
      .split('\n')
      .map(Number)
  }

  jump(i) {
    let inc = this.instructions[i]
    this.instructions[i]++
    return i += inc
  }

  weirdJump(i) {
    let inc = this.instructions[i]
    if(inc >= 3) {
      this.instructions[i]--
    } else {
      this.instructions[i]++
    }    
    return i += inc
  }
  
  willGoOutOfBounds(position) {
    return !(this.instructions[position] <= (this.instructions.length - position) && this.instructions[position] >= -position)
  }

}

module.exports = JumpInstructions