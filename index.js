const app = require('express')();
const http = require('http').Server(app);
const io = require('socket.io')(http);
const redis = require("redis");

const port = process.env.PORT || 3000

const subscriber = redis.createClient();

subscriber.on("subscribe", (channel, _count) => {
  console.log(`subscribed to "${channel}"`);
});

subscriber.on('message', (channel, message) => {
  console.log(channel, message)
  io.emit(channel, message);
});

subscriber.subscribe('new-game');
subscriber.subscribe('updated-game');

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

io.on('connection', (socket) => {
  console.log('client connected');
});

http.listen(port, () => {
  console.log(`listening on *:${port}`);
});
