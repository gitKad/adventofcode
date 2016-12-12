'use strict'

var Promise = require('bluebird')
var Room = require('./room.js')

var Kiosk = function() {
  this.realRooms = {list: [], sectorSum: 0}
}

Kiosk.prototype.attach = function (room) {
  if(!room.isDecoy()) {
    this.realRooms.list.push(room)
    this.realRooms.sectorSum += room.sectorId()
  }

  return this
}

Kiosk.prototype.getRealRooms = function () {
  return this.realRooms
}

Kiosk.prototype.importRooms = function (data) {
  var kiosk = this
  var arrayOfEncryptedRoomNames = data.trim().split(/[\r\n]+/)

  return Promise.map(arrayOfEncryptedRoomNames, (encryptedRoomName) => {
    return new Promise(function(resolve, reject) {
      let r = new Room().encryptedName(encryptedRoomName)
      kiosk.attach(r)
      resolve()
    })
  })
}

module.exports = Kiosk
