'use strict'

var Promise = require('bluebird')

var Grid = function() {
}

Grid.prototype.measureStepsToCenter = function(square) {
  let squareSize = this.getRingSizeFromSquare(square)
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

Grid.prototype.getRingMinDistanceFromCenter = function(squareSize) {
  return (squareSize - 1) / 2
}

Grid.prototype.getRingMaxDistanceFromCenter = function(squareSize) {
  return (squareSize - 1)
}

Grid.prototype.getRingSizeFromSquare = function(square) {
  let squareSize = Math.ceil(Math.sqrt(square))
  squareSize += squareSize % 2 == 0 ? 1 : 0
  return squareSize
}

module.exports = Grid