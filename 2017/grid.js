'use strict'

var Promise = require('bluebird')

class Grid {
  constructor () {

  }

  measureStepsToCenter (square) {
    let squareSize = this.getSquareRingSize(square)
    let maxDistanceToCenter = this.getRingMaxDistanceFromCenter(squareSize)
    let minDistanceToCenter = this.getRingMinDistanceFromCenter(squareSize)
  
    var distance = maxDistanceToCenter
    var direction = -1
    for(let i = squareSize**2; i > square; i--) {
      if(distance == minDistanceToCenter) {
        direction = 1
      }
      else if(distance == maxDistanceToCenter){
        direction = -1
      }
      distance += direction
    }
  
    return distance
  }
  
  getSquareRingSize (square) {
    let squareSize = Math.ceil(Math.sqrt(square))
    squareSize += squareSize % 2 == 0 ? 1 : 0
    return squareSize
  }

  getRingMinDistanceFromCenter (squareSize) {
    return (squareSize - 1) / 2
  }

  getRingMaxDistanceFromCenter (squareSize) {
    return (squareSize - 1)
  }

}

module.exports = Grid