'use strict'

var Promise = require('bluebird')

class Spreadsheet {

  constructor (text) {

    this.data = text
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

}

module.exports = Spreadsheet