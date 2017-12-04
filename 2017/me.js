'use strict'

var Promise = require('bluebird')

const Passphrase = require('./passphrase.js')

class Me {
  constructor() {

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
    return this.parseStringIntoSpreadsheet(spreadsheet)
      .map( this.differenceOfMinAndMax )
      .reduce((sum, current) => (sum+current), 0)
  }

  calculateEvenlyDivisibleChecksum(spreadsheet) {
    return this.parseStringIntoSpreadsheet(spreadsheet)
      .map( this.divisionOfEvenlyDivisible )
      .reduce((sum, current) => (sum+current), 0)
  }

  parseStringIntoSpreadsheet(spreadsheet) {
    return spreadsheet
    .replace(/\n$/gm,'')
    .split(/\n/g)
    .map((current) => {
      return current
        .split(/\t/g)
        .map(e => parseInt(e))
    })
  }

  divisionOfEvenlyDivisible(cur) {
    return cur
      .filter((element, _, array) => {
        return array
          .filter( (c) => c != element && (element%c == 0 || c%element == 0), 0 ).length > 0
      })
      .reduce((a, b) => b > a ? b/a : a/b)
  }

  differenceOfMinAndMax(cur) {
    return Math.max(...cur) - Math.min(...cur)
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
