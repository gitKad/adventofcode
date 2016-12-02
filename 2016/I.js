'use strict'

var Promise = require('bluebird')

var I = function() {

}

I.prototype.simplifyAPathToADistance = function (easterBunnyRecruitingDocument) {
  var i = this

  return new Promise(function(resolve, reject) {

    easterBunnyRecruitingDocument = easterBunnyRecruitingDocument.split(/\s*,\s*/)
    var direction = 'N'

    return Promise.reduce(easterBunnyRecruitingDocument, (acc, val) => {
      let turn = val[0]
      let distance = parseInt(val[1])

      return i.wonderWhichDirectionIAmNowFacing(direction,turn)
      .then((newDirection) => {
        console.log(acc, turn,newDirection, distance)
        direction = newDirection

        switch (direction) {
          case 'W': return {x: acc.x-distance, y:acc.y}
          case 'E': return {x: acc.x+distance, y:acc.y}
          case 'N': return {x: acc.x, y:acc.y+distance}
          case 'S': return {x: acc.x, y:acc.y-distance}
        }
      })

    }, {x:0, y:0})
    .then((cityBlockDistance) => {
      console.log(cityBlockDistance,Math.abs(cityBlockDistance.x)+Math.abs(cityBlockDistance.y));
      resolve(Math.abs(cityBlockDistance.x)+Math.abs(cityBlockDistance.y))
    })

  });
}

I.prototype.wonderWhichDirectionIAmNowFacing = function (direction, turn) {
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

module.exports = I
