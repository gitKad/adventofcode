'use strict'

var Promise = require('bluebird')

var Me = function() {
}

Me.prototype.resolveSimpleCaptcha = function (captcha) {
  return parseStringIntoCaptcha(captcha)
    .filter(matchingNextArrayDigit)
    .reduce((sum, current) => (sum + current), 0)
}

Me.prototype.resolveComplexCaptcha = function (captcha) {
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
