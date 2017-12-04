'use strict'

var Promise = require('bluebird')

class Passphrase {
  constructor (text) {
    this.passphrase = text
  }

  hasDuplicateWords() {
    return this.passphrase.match(/\b(\w+)\b.*\b(\1)\b/g) === null ? false : true
  }

  isValid() {
    return !this.hasDuplicateWords(this.passphrase)
  }

}

module.exports = Passphrase