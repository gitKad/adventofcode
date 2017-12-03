'use strict'

var Promise = require('bluebird')

var Me = function() {
}

// Day 2 stuff
Me.prototype.calculateChecksum = function(spreadsheet) {
  return parseStringIntoSpreadsheet(spreadsheet)
    .map( this.differenceOfMinAndMax )
    .reduce((sum, current) => (sum+current), 0)
}

function parseStringIntoSpreadsheet(spreadsheet) {
  return spreadsheet
  .replace(/\n$/gm,'')
  .split(/\n/g)
  .map((current) => {
    return current
      .split(/\t/g)
      .map(e => parseInt(e))
  })
}

Me.prototype.differenceOfMinAndMax = function(cur) {
  return Math.max(...cur) - Math.min(...cur)
}

// Day 1 stuff
Me.prototype.solveSimpleCaptcha = function (captcha) {
  return parseStringIntoCaptcha(captcha)
    .filter(matchingNextArrayDigit)
    .reduce((sum, current) => (sum + current), 0)
}

Me.prototype.solveComplexCaptcha = function (captcha) {
  return parseStringIntoCaptcha(captcha)
    .filter(matchingHalfwayRoundDigit)
    .reduce((sum, current) => (sum + current), 0)
}

function parseStringIntoCaptcha(captcha) {
  return captcha
    .replace(/\n|\r/g, '')
    .split('')
    .map(e => parseInt(e))
}

function matchingNextArrayDigit(element, index, array) {
  return element == array[(index+1) % array.length]
}

function matchingHalfwayRoundDigit(element, index, array) {
  return element == array[(index+ array.length / 2) % array.length]
}

module.exports = Me
