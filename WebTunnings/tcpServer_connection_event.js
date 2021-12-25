var net = require('net');
var socketUtil = require("./socketUtil");
var fs = require("fs");

//fs.writeFile('tcpdata.csv', 'id,pm25,pm10,temp,hum,atm,loc,m1,m2,m3,m4,m5,m6,m7,m8,m9,m10.m11,m12,m13,m14,m15,m16\n', function (err) {
//fs.writeFile('tcpdata.csv', 'entry_id,field4,field5,field1,field2,field3,loc\n', function (err) {
fs.writeFile('feeds.csv', 'entry_id,field4,field5,field1,field2,field3,loc,m1,m2,m3,m4,m5,m6,m7,m8,m9,m10,m11,m12,m13,m14\n', function (err) {
  if (err) throw err;
  console.log('Created successfully.');
});

var tcpServer = net.createServer();

tcpServer.on('connection',function(socket){
		console.log('connection established....');
		
		socketUtil.socketAddress(socket);
		
		tcpServer.getConnections(function(error,count){
			console.log('Concurrent tcp connections= '+ count);
			});	
	
		socket.on('end', function(){
			socketUtil.socketStats(socket);
			console.log('end event on socket fired');
			});
		
		socket.on('close', function(){
			console.log('close event on socket fired');
			});
	
		socket.on('data', function(data){
			//console.log('data received from the tcp client');
			console.log('DATA: ' + data);
			fs.appendFile('feeds.csv', data, function(error){console.log('data written');});
			var flushed = socket.write('Server Reply: ' + data);
			console.log(flushed);
			//socket.emit('error', new Error('forcefully injected error'));
			});		

		socket.on('error', function(error){
			console.log('something wrong happpened here');
			//socket.end('socket can send some more data but it will be ended');
			socket.destroy();
			});
		
		socket.setTimeout(6000000);
		socket.on('timeout', function(){ socket.end('timed out...');});
		});

tcpServer.maxConnections=10;

//setTimeout(function(){ tcpServer.close(function(){console.log('server closed');})},600000);
			
tcpServer.on('close',function(){ console.log('second server close event handler');});

tcpServer.listen(function(){ 
		var port = tcpServer.address().port;
		console.log('server started listening on port: ' + port);
		});