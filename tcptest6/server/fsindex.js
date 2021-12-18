const net = require('net');
const port = 8080;
const host = '127.0.0.1';
var fs = require("fs");

const server = net.createServer();
server.listen(port, host, () => {
    console.log('TCP Server is running on port ' + port + '.');
});

let sockets = [];
//fs.appendFile('tcpdata.log', 'id,pm25,pm10,temp,hum,atm,loc,m1,m2,m3,m4,m5,m6,m7,m8,m9,m10.m11,m12,m13,m14,m15,m16\n', function(error){console.log('data written');});
// writeFile function with filename, content and callback function
fs.writeFile('tcpdata.log', 'id,pm25,pm10,temp,hum,atm,loc,m1,m2,m3,m4,m5,m6,m7,m8,m9,m10.m11,m12,m13,m14,m15,m16\n', function (err) {
  if (err) throw err;
  console.log('Created successfully.');
});

server.on('connection', function(sock) {
    console.log('CONNECTED: ' + sock.remoteAddress + ':' + sock.remotePort);

    sockets.push(sock);

    sock.on('data', function(data) {
        console.log('DATA ' + sock.remoteAddress + ': ' + data);
        fs.appendFile('tcpdata.log', data, function(error){console.log('data written');});
        // Write the data back to all the connected, the client will receive it as data from the server
        sockets.forEach(function(sock, index, array) {
            sock.write(sock.remoteAddress + ':' + sock.remotePort + " said " + data + '\n');
        });
    });

    // Add a 'close' event handler to this instance of socket
    sock.on('close', function(data) {
        let index = sockets.findIndex(function(o) {
            return o.remoteAddress === sock.remoteAddress && o.remotePort === sock.remotePort;
        })
        if (index !== -1) sockets.splice(index, 1);
        console.log('CLOSED: ' + sock.remoteAddress + ' ' + sock.remotePort);
    });
});