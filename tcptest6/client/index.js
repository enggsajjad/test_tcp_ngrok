const net = require('net');
const client = new net.Socket();
const port = 8080;
const host = '127.0.0.1';

client.connect(port, host, function() {
    console.log('Connected');
    client.write("Hello From Client TCPTEST6 " + client.address().address);
});

client.on('data', function(data) {
    console.log('Server Says : ' + data);
});

client.on('close', function() {
    console.log('Connection closed');
});