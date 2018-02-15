const path = require('path');
const app = require('express')();
const server = require('http').Server(app);
const io = require('socket.io')(server);

server.listen(5000, () => {
  console.log("Listening on port 5000");
});

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, './index.html'));
});

io.on('connection', function (socket) {
  console.log('Socket now active');
  socket.emit('news', { hello: 'world' });
  socket.on('my other event', (data) => {
    console.log(data);
  });
  socket.on('disconnection', () => {
    console.log('Socket now offline');
  } )
});
