const express = require('express');
const app = express();


var PORT = process.env.PORT || 3001;

// http.get('/', (req, res) => {
//   res.send('Hello World!')
// })

// app.use(express("public"));

//Listen on port 3000
let server = app.listen(PORT, () => {
  console.log(`App listening at http://localhost:${PORT}`)
})

//socket.io instantiation
const io = require("socket.io")(server)

 
//listen on every connection
io.on('connection', (socket) => {
	console.log('New user connected')

    //default username
    socket.username = "Anonymous"

    socket.on('disconnect', function(){
      console.log(`Socket ${socket.id} disconnected`);
      console.log("Number of clients: ", Object.keys(io.sockets.connected).length);
    });
    //listen on change_username
    socket.on('change_username', (data) => {
        socket.username = data.username
    })

    //listen on typing
    socket.on('typing', (data) => {
    	socket.broadcast.emit('typing', {username : socket.username})
    })

    socket.on('receive', (data) => {
      console.log('Send data: ', data)
    })

    socket.on('send', (data) => {
      console.log('Received data: ', data)
    })
})


// initialize serial port
const serialPort = require('serialport');
const Readline = require('@serialport/parser-readline')
const parser = new Readline();


var ArduinoPort = '/dev/cu.usbserial-01D415B6';
var ucSerial;

connectDevice();


async function connectDevice() {
  serialPort.list().then(function(ports) {
    ports.forEach(function(port) {
      console.log("Manufacturer: %s, Vendor: %s", port.manufacturer, port.vendorId);
    })
  });
  ucSerial = new serialPort(ArduinoPort, {
    baudRate: 115200
  });

  ucSerial.on('open', function(){
    console.log('info', "Opened Serial port at %s", ArduinoPort);
  })



  // parser = ucSerial.pipe(new Readline({ delimiter: '\n'}))
  var index = 0;
  ucSerial.on('data', function(data) {
    console.log('Got word from arduino:', data.toString());

    
    var res = data.toString();
    res = res.split(',');

    io.sockets.emit('serial', {temp : res[1], humidity : res[2], index: index});

    index++;
  })


}
