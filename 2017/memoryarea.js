'use strict'

var Promise = require('bluebird')

class MemoryArea {

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

}

module.exports = MemoryArea