'use strict'

var Promise = require('bluebird')

const Passphrase = require('./passphrase.js')
const JumpInstructions = require('./jumpInstructions.js')

class Me {
  constructor() {

  }

  // Day 6 stuff
  countRedistributionCycles(memoryArea) {
    do {
      memoryArea.redistribute()
    }
    while(!memoryArea.hasEnteredInfiniteLoop)
    
    return memoryArea.cycles
  }

  countInfiniteLoopCycles(memoryArea) {
    do {
      memoryArea.redistribute()
    }
    while(!memoryArea.hasEnteredInfiniteLoop)
    
    memoryArea.resetMemory()

    do {
      memoryArea.redistribute()
    }
    while(!memoryArea.hasEnteredInfiniteLoop)
    return memoryArea.cycles
  }

  // Day 5 stuff
  followJumpInstructions(jumpInstructions) {
    var ji = new JumpInstructions(jumpInstructions)
    
    var pos = 0
    var steps = 0
    while(!ji.willGoOutOfBounds(pos)) {  
      pos = ji.jump(pos)
      steps++
    }
    return steps
  }

  followWeirdJumpInstructions(jumpInstructions) {
    var ji = new JumpInstructions(jumpInstructions)
    
    var pos = 0
    var steps = 0
    while(!ji.willGoOutOfBounds(pos)) {  
      pos = ji.weirdJump(pos)
      steps++
    }
    return steps
  }

  // Day 4 stuff
  parseStringToPassphrases(passphrases) {
    return passphrases
      .replace(/\n$/gm,'')
      .split('\n')
      .map((t) => new Passphrase(t))
  }

  countPassphrasesWithoutRepetition(passphrases) {
    return this.parseStringToPassphrases(passphrases)
      .filter((e) => !e.hasDuplicateWords())
      .length
  }

  countPassphrasesWithoutAnagrams(passphrases) {
    return this.parseStringToPassphrases(passphrases)
      .filter((e) => !e.hasAnagrams())
      .length
  }

  // Day 3 stuff
  measureStepsToCenter(grid, square) {
    return grid.measureStepsToCenter(square)
  }
  
  // Day 2 stuff
  calculateMinMaxChecksum(spreadsheet) {
    return spreadsheet.data
      .map( spreadsheet.differenceOfMinAndMax )
      .reduce((sum, current) => (sum+current), 0)
  }

  calculateEvenlyDivisibleChecksum(spreadsheet) {
    return spreadsheet.data
      .map( spreadsheet.divisionOfEvenlyDivisible )
      .reduce((sum, current) => (sum+current), 0)
  }


  // Day 1 stuff
  solveSimpleCaptcha (captcha) {
    return this.parseStringIntoCaptcha(captcha)
      .filter(this.matchingNextArrayDigit)
      .reduce((sum, current) => (sum + current), 0)
  }

  solveComplexCaptcha (captcha) {
    return this.parseStringIntoCaptcha(captcha)
      .filter(this.matchingHalfwayRoundDigit)
      .reduce((sum, current) => (sum + current), 0)
  }

  parseStringIntoCaptcha(captcha) {
    return captcha
      .replace(/\n|\r/g, '')
      .split('')
      .map(e => parseInt(e))
  }

  matchingNextArrayDigit(element, index, array) {
    return element == array[(index+1) % array.length]
  }

  matchingHalfwayRoundDigit(element, index, array) {
    return element == array[(index+ array.length / 2) % array.length]
  }
}

module.exports = Me
