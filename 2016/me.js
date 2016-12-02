'use strict'

var Promise = require('bluebird')

var Me = function() {
  this.placesIHaveBeen = [{x: 0, y: 0}]
}

Me.prototype.simplifyAPathToADistance = function (easterBunnyRecruitingDocument) {
  var i = this
  var direction = 'N'
  easterBunnyRecruitingDocument = easterBunnyRecruitingDocument.split(/\s*,\s*/)

  return Promise.reduce(easterBunnyRecruitingDocument, (acc, val) => {
    let turn = val[0]
    let distance = parseInt(val.substring(1))

    return i.wonderWhichDirectionIAmNowFacing(direction,turn)
    .then((newDirection) => {
      direction = newDirection

      switch (direction) {
        case 'W': return {x: acc.x-distance, y:acc.y}
        case 'E': return {x: acc.x+distance, y:acc.y}
        case 'N': return {x: acc.x, y:acc.y+distance}
        case 'S': return {x: acc.x, y:acc.y-distance}
      }
      i.placesIHaveBeen.push({x: acc.x, y:acc.y})
    })

  }, {x:0, y:0})
  .then((finalPosition) => {
    return i.howFarAmI(finalPosition)
  })

}

Me.prototype.howFarAmI = function(position) {
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
  });
};

module.exports = Me
