'use strict'

var Promise = require('bluebird')

class MemoryArea {

  constructor (text) {

    this.area = text
      .replace(/\n$/gm,'')
      .split(' ')
      .map(e => parseInt(e))
  }

  get bankWithMostBlocks() {
    return this.area.reduce((idxOfMax,val,idx,arr) => (idxOfMax = val > arr[idxOfMax] ? idx : idxOfMax),0)
  }
}

module.exports = MemoryArea