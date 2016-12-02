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
        direction = newDirection

        switch (direction) {
          case 'N': return acc+distance
          case 'E': return acc+distance
          case 'S': return acc-distance
          case 'W': return acc-distance
        }
      })

    }, 0)
    .then((cityBlockDistance) => {
      resolve(Math.abs(cityBlockDistance))
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
