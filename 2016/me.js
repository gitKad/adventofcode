'use strict'

var Promise = require('bluebird')

var Me = function() {
  this.placesIHaveBeen = []
}

Me.prototype.walkAPath = function (easterBunnyRecruitingDocument) {
  var i = this
  var direction = 'N'
  easterBunnyRecruitingDocument = easterBunnyRecruitingDocument.split(/\s*,\s*/)

  return Promise.reduce(easterBunnyRecruitingDocument, (acc, val) => {
    let turn = val[0]
    let distance = parseInt(val.substring(1))

    return i.wonderWhichDirectionIAmNowFacing(direction,turn)
    .then((newDirection) => {
      direction = newDirection

      for (var j = 0; j < distance; j++) {
        switch (direction) {
          case 'W': acc.x--; break;
          case 'E': acc.x++; break;
          case 'N': acc.y++; break;
          case 'S': acc.y--; break;
        }
        i.placesIHaveBeen.push({x: acc.x, y:acc.y})
      }
      return {x: acc.x, y:acc.y}
    })

  }, {x:0, y:0})
}

Me.prototype.howFarIs = function(position) {
  return Promise.resolve(Math.abs(position.x)+Math.abs(position.y))
}

Me.prototype.wonderWhichDirectionIAmNowFacing = function (direction, turn) {
  var directionVal
  var directions = ['N','E','S','W']

  return new Promise(function(resolve, reject) {
    for (var i = 0; i < directions.length; i++) {
      if( directions[i] == direction) {
        directionVal = i
        break;
      }
    }

    directions.push('N')
    directions.splice(0,0,'W')
    directionVal++

    switch (turn) {
      case 'L': resolve(directions[--directionVal]); break;
      case 'R': resolve(directions[++directionVal]); break;
      default: reject('not a valid turn {\'L\',\'R\'}')
    }
  })
}

Me.prototype.rememberBeingHere = function () {
  for (var i = 0; i < this.placesIHaveBeen.length; i++) {
    for (var j = 0; j < this.placesIHaveBeen.length; j++) {
      if( j != i &&
        this.placesIHaveBeen[i].x == this.placesIHaveBeen[j].x &&
        this.placesIHaveBeen[i].y == this.placesIHaveBeen[j].y ) {
        return Promise.resolve(this.placesIHaveBeen[i])
      }
    }
  }
  return Promise.reject('never been to the same place twice')
}

module.exports = Me
