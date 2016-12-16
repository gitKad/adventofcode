'use strict'
const Me = require('./me.js')

var Room = function () {
}

Room.prototype.encryptedName = function (value) {
  this.encodedName = value
  this.decodedName = ''
  return this
}

Room.prototype.decypheredName = function() {
  let sectorId = this.sectorId()
  let encodedName = this.encodedName.match(/[\w -]+(?=-[0-9]+)/)[0].split('')
  sectorId = sectorId%26

  this.decodedName = encodedName.map((val,idx,arr) => {
    if(arr[idx] == '-') {
      return ' '
    } else {
      return String.fromCharCode((val.charCodeAt(0)+sectorId-97)%26+97)
    }
  })

  return this.decodedName.join('')
}

Room.prototype.sectorId = function () {
  return parseInt(this.encodedName.match(/[\w]+(?=\[)/gm)[0])
}

Room.prototype.isDecoy = function () {
  var encryptedName = this.encodedName
  return this.checksum() != encryptedName.substring(encryptedName.indexOf('[')+1,encryptedName.indexOf(']'))
}

Room.prototype.checksum = function () {
  var me = new Me()
  var encryptedName = this.encodedName
  encryptedName = encryptedName.substring(0,encryptedName.indexOf('[')).replace(/[0-9-]/g,'')

  return me.sortCharactersByFrequency(encryptedName).substring(0,5)
}

module.exports = Room
