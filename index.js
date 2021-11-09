const { createSocket } = require('dgram');
let express = require('express');
let app = express();

app.use('/', express.static('public'));

let http = require('http');
let server = http.createServer(app);
let port = process.env.PORT || 3000;

server.listen(port, () => {
    console.log('server is listening at ' + port);
});

let io = require('socket.io');
io = new io.Server(server);

io.sockets.on('connection', (socket) => {
    console.log('we have a new client: ' + socket.id);

    socket.on('data', (data) => {
        // console.log(data);

        io.sockets.emit('drawPath', data);
    });

    socket.on('disconnect', () => {
        console.log('client has disconnected: ' + socket.id);
    });
});

