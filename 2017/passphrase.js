'use strict'

var Promise = require('bluebird')

class Passphrase {
  constructor (text) {
    this.passphrase = text
  }

  hasAnagrams() {
    return this.passphrase
      .replace(/\n$/gm,'')
      .split(' ')
      .map((current) => (current.split('').sort().join()))
      .sort()
      .reduce(this.reduceIntoCountOfDuplicates,0) >= 1
  }

  reduceIntoCountOfDuplicates(acc,val,idx,arr) {
    return acc += (val === arr[idx+1]) ? 1 : 0
  }

  hasDuplicateWords() {
    return this.passphrase.match(/\b(\w+)\b.*\b(\1)\b/g) === null ? false : true
  }
}

module.exports = Passphrase