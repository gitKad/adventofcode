var SlackBot = require('./slackbot.js')

var sb = new SlackBot()

setTimeout(() => {

  console.log('polling');
  
  sb.persistLeaderboards()
  .then(() => {
    return sb.listNewSubscriptions()
  })
  .then((subscriptions) => {
    return sb.announceSubscriptions(subscriptions)
  })
  .then(() => {
    return sb.listNewStars()
  })
  .then((stars) => {
    return sb.announceStars(stars)
  })

}, 15000)
