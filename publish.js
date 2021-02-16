const redis = require("redis");
const publisher = redis.createClient();

const game1 = {
  id: 1,
  homeTeam: 'Real Madrid',
  awayTeam: 'Barcelona',
  homeScore: 0,
  awayScore: 0,
}

const game2 = {
  id: 2,
  homeTeam: 'Bayern Munich',
  awayTeam: 'Borussia Dortmund',
  homeScore: 0,
  awayScore: 0,
}

const publish = (channel, message) => {
  console.log(`publishing "${message}" to channel "${channel}"`)
  publisher.publish(channel, message)
}

publish('new-game', JSON.stringify(game1))

setInterval(() => {
  game1.homeScore++  
  publish('updated-game', JSON.stringify(game1))
}, 1000)

setTimeout(() => {
  publish('new-game', JSON.stringify(game2))

  setInterval(() => {
    game2.awayScore++
    publish('updated-game', JSON.stringify(game2))
  }, 1000)  
}, 3000)
