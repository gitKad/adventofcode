'use strict'

var Promise = require('bluebird')

class MemoryArea {

  constructor (text) {

    this.area = text
      .replace(/\n/g,'')
      .split('\t')
      .map(e => parseInt(e))

    this.savedMemoryPatterns = []
  }

  get bankWithMostBlocks() {
    return this.area.reduce((idxOfMax,val,idx,arr) => (idxOfMax = val > arr[idxOfMax] ? idx : idxOfMax),0)
  }

  get savedPatterns() {
    return this.savedMemoryPatterns
  }

  redistribute() {
    let memoryBankIndex = this.bankWithMostBlocks
    let blocksToRedistribute = this.area[memoryBankIndex]
    let insertionStep = 1

    this.savedMemoryPatterns.push(this.area.slice())
    this.area[memoryBankIndex] = 0

    for (let insertionStep = 1; insertionStep <= blocksToRedistribute; insertionStep++) {
      this.area[(memoryBankIndex+insertionStep)%this.area.length]++
    }
    return this
  }

  get hasEnteredInfiniteLoop() {
    return (this.savedMemoryPatterns.find((e) => (e.join('') == this.area.join(''))) != undefined)
  }
}

module.exports = MemoryArea