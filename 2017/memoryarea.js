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
    const memoryBankIndex = this.bankWithMostBlocks
    const blocksToRedistribute = this.area[memoryBankIndex]
    this.savedMemoryPatterns.push(this.area.slice())
    this.area[memoryBankIndex] = 0

    this.area.map((_,idx,arr) => {
      arr[idx] += ~~(blocksToRedistribute/this.area.length)
      arr[idx] += (memoryBankIndex+idx+this.area.length-1)%this.area.length <= (blocksToRedistribute%this.area.length)-1 ? 1 : 0
    })

    return this
  }

  get hasEnteredInfiniteLoop() {
    return (this.savedMemoryPatterns.find((e) => (e.join('') == this.area.join(''))) != undefined)
  }
}

module.exports = MemoryArea