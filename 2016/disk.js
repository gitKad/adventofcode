'use strict'

var Disk = function (size) {
  this.data = ''
  this.size = size
}

Disk.prototype.setData = function (data) {
  this.data = data.trim()
  return this
}

Disk.prototype.getData = function () {
  return this.data
}

Disk.prototype.getChecksum = function () {
  let data = this.data
  let checksum = []

  do {
    checksum = []
    data.split('').map((val, idx, arr) => {
      if(idx % 2 == 0) {
        checksum.push( (val == arr[idx+1]) ? 1 : 0 )
      }
    })
    data = checksum.join('')
  } while(checksum.length % 2 == 0)

  return checksum.join('')
}

Disk.prototype.tamper = function () {
  let b = this.data
  b = b.split('').reverse().join('').replace(/[1]/g,'x').replace(/[0]/g,'1').replace(/[x]/g,'0')
  this.data = this.data+'0'+b
  return this
}

Disk.prototype.fillWithTamperedData = function () {
  do {
    this.tamper()
  } while (this.data.length < this.size)
  this.data = this.data.slice(0, this.size)
  return this
}

module.exports = Disk
