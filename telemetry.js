/*
   Copyright 2018 Makoto Consulting Group, Inc.

   Licensed under the Apache License, Version 2.0 (the "License");
   you may not use this file except in compliance with the License.
   You may obtain a copy of the License at

       http://www.apache.org/licenses/LICENSE-2.0

   Unless required by applicable law or agreed to in writing, software
   distributed under the License is distributed on an "AS IS" BASIS,
   WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   See the License for the specific language governing permissions and
   limitations under the License.
 */
'use strict'

const telemetry = require('./controllers/telemetry.js');

var mqtt    = require('mqtt');
var client  = mqtt.connect("mqtt://localhost",{clientId:"modulabTelemetry"});

//handle incoming messages
client.on('message',function(topic, message, packet){
	console.log("message is "+ message);
	console.log("topic is "+ topic);
	if (topic == "telemetry") {
		telemetry.process(message);
	}
});

client.on("connect",function(){	
	console.log("connected  "+ client.connected);
})

//handle errors
client.on("error",function(error){
	console.log("Can't connect" + error);
});

client.subscribe("telemetry",{qos:1});
