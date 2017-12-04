'use strict'

var Promise = require('bluebird')

var Me = function() {
}

// Day 3 steps
Me.prototype.measureStepsToCenter = function(square) {
  let squareSize = Math.ceil(Math.sqrt(square))
  squareSize += squareSize % 2 == 0 ? 1 : 0
  let maxDistanceToCenter = (squareSize - 1)
  let minDistanceToCenter = maxDistanceToCenter / 2

  var distance = maxDistanceToCenter
  var direction = -1
  for(let i = squareSize**2; i > square; i--) {
    if(distance == minDistanceToCenter) {
      direction = 1
    }
    else if(distance == maxDistanceToCenter){
      direction = -1
    }
    distance += direction
  }

  return distance
}

// Day 2 stuff
Me.prototype.calculateMinMaxChecksum = function(spreadsheet) {
  return parseStringIntoSpreadsheet(spreadsheet)
    .map( this.differenceOfMinAndMax )
    .reduce((sum, current) => (sum+current), 0)
}

Me.prototype.calculateEvenlyDivisibleChecksum = function(spreadsheet) {
  return parseStringIntoSpreadsheet(spreadsheet)
    .map( this.divisionOfEvenlyDivisible )
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

Me.prototype.divisionOfEvenlyDivisible = function(cur) {
  return cur
    .filter((element, _, array) => {
      return array
        .filter( (c) => c != element && (element%c == 0 || c%element == 0), 0 ).length > 0
    })
    .reduce((a, b) => b > a ? b/a : a/b)
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
