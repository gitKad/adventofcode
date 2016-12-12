var chai = require('chai')
var expect = require('chai').expect
var chaiAsPromised = require("chai-as-promised")

chai.use(chaiAsPromised);

var Me = require('./me.js')
var Room = require('./room.js')
var Kiosk = require('./kiosk.js')
var AdventOfCodeChatter = require('./adventOfCodeChatter.js')

describe.only('I, on day 4, ', () => {

  beforeEach(() => {
    room1 = new Room().encryptedName('aaaaa-bbb-z-y-x-123[abxyz]')
    room2 = new Room().encryptedName('a-b-c-d-e-f-g-h-987[abcde]')
    room3 = new Room().encryptedName('not-a-real-room-404[oarel]')
    room4 = new Room().encryptedName('totally-real-room-200[decoy]')
    room5 = new Room().encryptedName('aczupnetwp-dnlgpyrpc-sfye-dstaatyr-561[patyc]')
    kiosk = new Kiosk()
  })

  it('can compute a room checksum',() => {
    expect(room1.checksum()).to.be.a('string').eql('abxyz')
    expect(room2.checksum()).to.be.a('string').eql('abcde')
    expect(room3.checksum()).to.be.a('string').eql('oarel')
    expect(room4.checksum()).to.be.a('string').eql('loart')
    expect(room5.checksum()).to.be.a('string').eql('patyc')
  })

  it('can recognize decoy rooms',() => {
    expect(room1.isDecoy()).to.be.false
    expect(room2.isDecoy()).to.be.false
    expect(room3.isDecoy()).to.be.false
    expect(room4.isDecoy()).to.be.true
    expect(room5.isDecoy()).to.be.false
  })

  it('can tell sector id',() => {
    expect(room1.sectorId()).to.be.a('number').eql(123)
    expect(room2.sectorId()).to.be.a('number').eql(987)
    expect(room3.sectorId()).to.be.a('number').eql(404)
    expect(room4.sectorId()).to.be.a('number').eql(200)
    expect(room5.sectorId()).to.be.a('number').eql(561)
  })

  it('can list real rooms',() => {
    kiosk.attach(room1).attach(room2).attach(room3).attach(room4)
    expect(kiosk.getRealRooms().list).to.be.a('array').with.lengthOf(3)
  })

  it('can sum valid sector ids',() => {
    kiosk.attach(room1).attach(room2).attach(room3).attach(room4)
    expect(kiosk.getRealRooms().sectorSum).to.be.a('number').eql(1514)
  })

  it('can import rooms from data file',() => {
    var testData = 'hqcfqwydw-fbqijys-whqii-huiuqhsx-660[qhiwf]\r\noxjmxdfkd-pzxsbkdbo-erkq-ixyloxqlov-913[xodkb]\r\nbpvctixr-eaphixr-vgphh-gthtpgrw-947[smrkl]\r\niwcjapey-lhwopey-cnwoo-wymqeoepekj-992[eowpy]\r\naaaaa-bbb-z-y-x-123[abxyz]'
    return kiosk.importRooms(testData)
    .then(() => {
      return expect(kiosk.getRealRooms().list).to.be.a('array').with.lengthOf(4)
    })
  })

  it('can decypher a room\'s encrypted name', () => {
    var room6 = new Room().encryptedName('qzmt-zixmtkozy-ivhz-343[?????]')
    expect(room6.decypheredName()).to.be.a('string').eql('very encrypted name')
  })

  it('can earn a silver star on day 4', () => {
    var aCC = new AdventOfCodeChatter()
    return aCC.getInput(4)
    .then((input) => {
      return kiosk.importRooms(input)
    })
    .then(() => {
      expect(kiosk.getRealRooms().sectorSum).to.be.a('number').eql(245102)
    })
  })

  it('can earn a gold star on day 4', () => {
    var aCC = new AdventOfCodeChatter()
    return aCC.getInput(4)
    .then((input) => {
      return kiosk.importRooms(input)
    })
    .then(() => {
      kiosk.getRealRooms().list.map((val) => {
        if(val.decypheredName() == 'northpole object storage') {
          expect(val.sectorId()).to.be.a('number').eql(324)
        }
      })
    })
  })

})
