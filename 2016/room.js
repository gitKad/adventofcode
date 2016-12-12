'use strict'

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
  var encryptedName = this.encodedName
  encryptedName = encryptedName.substring(0,encryptedName.indexOf('[')).replace(/[0-9-]/g,'').split('')

  var letterCountObj = encryptedName.reduce((acc,val) => {
    acc[val] = (acc[val] || 0) + 1
    return acc
  }, {})
  var sortedLetterCountObj = Object.keys(letterCountObj).sort((a,b) => {
    if (letterCountObj[a] == letterCountObj[b]) {
      return a.charCodeAt(0) - b.charCodeAt(0)
    } else {
      return letterCountObj[b]-letterCountObj[a]
    }
  })

  sortedLetterCountObj.splice(5)
  return sortedLetterCountObj.join('')

}

module.exports = Room
