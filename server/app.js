/**
 * Main application file
 */

'use strict';

// Set default node environment to development
process.env.NODE_ENV = process.env.NODE_ENV || 'development';

var express = require('express');
var config = require('./config/environment');
// Setup server
var app = express();
var server = require('http').createServer(app);
require('./config/express')(app);
require('./routes')(app);

// Start server
server.listen(config.port, config.ip, function () {
  console.log('Express server listening on %d, in %s mode', config.port, app.get('env'));
});

// Expose app
exports = module.exports = app;


// var io = require('socket.io')(server);




var midi = require('midi');
var Leap = require('leapjs');

// Set up a new input.
// var input = new midi.input();

// // Count the available input ports.
// input.getPortCount();

// // Get the name of a specified input port.
// input.getPortName(0);

// console.log("MIDI device on port 0: ", input.getPortName(0));

// // Open the first available input port.
// input.openPort(0);

var output = new midi.output();
output.openVirtualPort("Leap MIDI");
output.getPortCount();
console.log('found', output.getPortCount(), 'output ports');

// Note On: 144, 64, 90
// Note Off: 128, 64, 40

var controller = new Leap.Controller({
      enableGestures: false
});

controller.on('connect', function() {
  console.log("Leap Motion connected!");

  setInterval(function(){
	  var frame = controller.frame();
	  var hand1 = frame.hands[0];
	  var hand2 = frame.hands[1];


      if (hand1) {
        var actualHeight = hand1.palmPosition[1];
	    var grabStrength = hand1.grabStrength;
	    var rotation = hand1.roll();

        console.log("actualHeight: ", actualHeight, "grabStrength: ", grabStrength, "rotation: ", rotation);
      }


  }, 50);


});

controller.connect();

// var interval = setInterval(function() {
// 	console.log('sending MIDI output...');
// 	output.sendMessage([144,60,127]);
// }, 1000);

