var chai = require('chai')
var expect = require('chai').expect
var chaiAsPromised = require("chai-as-promised")

chai.use(chaiAsPromised);

const Promise = require('bluebird')
const Me = require('./me.js')
const Disk = require('./disk.js')
const AdventOfCodeChatter = require('./adventOfCodeChatter.js')

describe('I, on day 16, ', () => {

  beforeEach(() => {
    me = new Me()
  })

  it('understand what a modified dragon curves does', function() {
    var disk = new Disk(24)
    expect(disk.setData('1').tamper().getData()).to.be.a('string').eql('100')
    expect(disk.setData('0').tamper().getData()).to.be.a('string').eql('001')
    expect(disk.setData('11111').tamper().getData()).to.be.a('string').eql('11111000000')
    expect(disk.setData('111100001010').tamper().getData()).to.be.a('string').eql('1111000010100101011110000')
  })

  it('can overwrite disk with undetectable tampered data', function() {
    var disk = new Disk(24)
    expect(disk.setData('1').fillWithTamperedData().getData()).to.be.a('string').with.a.lengthOf(24).eql('100011001001110010001101')
  })

  it('can calculate a disk checksum', function() {
    var disk = new Disk(24)
    expect(disk.setData('110010110100').getChecksum()).to.be.a('string').with.a.lengthOf(3).eql('100')
    expect(disk.setData('10000011110010000111').getChecksum()).to.be.a('string').with.a.lengthOf(5).eql('01100')
  })

  it('can cover my tracks', function() {
    var disk = new Disk(20)
    expect(disk.setData('10000').fillWithTamperedData().getChecksum()).to.be.a('string').with.a.lengthOf(5).eql('01100')
  })

  it('can earn a silver star on day 6', () => {
    let aCC = new AdventOfCodeChatter()
    var disk = new Disk(272)
    return aCC.getInput(16)
    .then((input) => {
      expect(disk.setData(input).fillWithTamperedData().getChecksum()).to.be.a('string').with.a.lengthOf(17).eql('10100011010101011')
    })
  })

  it.skip('can earn a gold star on day 6', () => {
    var aCC = new AdventOfCodeChatter()
    return aCC.getInput(16)
    .then((input) => {
      expect(input).to.be.ok
    })
  })

})
