'use strict'

var crypto = require('crypto')

var Door = function() {
  this.id = ''
}

Door.prototype.setId = function (id) {
  this.id = id
  return this
}

Door.prototype.getSimplePassword = function () {
  var password = ''
  var i = 0

  do {
    var result = this.getNextCoolHash(i)
    i = result[1]
    let hash = result[0]
    password += hash.substring(5,6)
  }
  while (password.length < 8)

  return password
}

Door.prototype.getInspiredPassword = function () {
  var password = '________'
  var i = 0

  do {
    var result = this.getNextCoolHash(i)
    i = result[1]
    let hash = result[0]
    let charPosition = parseInt(hash.substring(5,6))

    if (charPosition >= 0 && charPosition <= 7 && password.charAt(charPosition) == '_') {
      password = password.substring(0,charPosition)+hash.substring(6,7)+password.substring(charPosition+1);
    }
    console.log(hash,password)
  }
  while (password.indexOf('_') >= 0)

  return password
}

Door.prototype.getNextCoolHash = function (startingIndex) {
  var hash = ''
  var i = startingIndex

  do {
    hash = crypto.createHash('md5').update(this.id+i).digest('hex')
    i++
  }
  while (hash.substring(0,5) != '00000')

  return [hash, i]
}



module.exports = Door
