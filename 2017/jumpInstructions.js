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
  
}

module.exports = JumpInstructions