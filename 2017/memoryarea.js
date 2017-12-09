'use strict'

var sha1 = require('sha1');

class MemoryArea {

  constructor (text) {

    this.area = text
      .replace(/\n/g,'')
      .split('\t')
      .map(e => parseInt(e))

    this.savedPatterns = {}
    this.cycles = 0
  }

  get bankWithMostBlocks() {
    return this.area.reduce((idxOfMax,val,idx,arr) => (idxOfMax = val > arr[idxOfMax] ? idx : idxOfMax),0)
  }

  resetMemory() {
    this.savedPatterns = {}
    this.cycles = 0
  }

  redistribute() {
    var memoryBankIndex = this.bankWithMostBlocks
    var blocksToRedistribute = this.area[memoryBankIndex]
    
    this.cycles++
    this.savedPatterns[sha1(this.area.join(''))] = 1
    this.area[memoryBankIndex] = 0
    this.area.map((_,idx,arr) => {
      arr[idx] += ~~(blocksToRedistribute/this.area.length)
      arr[idx] += (idx-memoryBankIndex-1+this.area.length)%this.area.length < blocksToRedistribute%this.area.length ? 1 : 0
    })
    
    return this
  }

  get hasEnteredInfiniteLoop() {
    return this.savedPatterns[sha1(this.area.join(''))] >= 1
  }
}

module.exports = MemoryArea