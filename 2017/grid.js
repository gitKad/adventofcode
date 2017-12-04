'use strict'

var Promise = require('bluebird')

var Grid = function() {
}

Grid.prototype.measureStepsToCenter = function(square) {
  let squareSize = Math.ceil(Math.sqrt(square))
  squareSize += squareSize % 2 == 0 ? 1 : 0
  let maxDistanceToCenter = (squareSize - 1)
  let minDistanceToCenter = maxDistanceToCenter / 2

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

module.exports = Grid