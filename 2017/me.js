'use strict'

var Promise = require('bluebird')

var Me = function() {
}

Me.prototype.resolveSimpleCaptcha = function (captcha) {
    return captcha
      .replace(/\n|\r/g, '')
      .split('')
      .map(e => parseInt(e))
      .filter((element, index, array) => (element == array[(index+1) % array.length]))
      .reduce((sum, current) => (sum + current), 0)
  }

Me.prototype.resolveComplexCaptcha = function (captcha) {
  return captcha
    .replace(/\n|\r/g, '')
    .split('')
    .map(e => parseInt(e))
    .filter((element, index, array) => (element == array[(index+ array.length / 2) % array.length]))
    .reduce((sum, current) => (sum + current), 0)
}

module.exports = Me
