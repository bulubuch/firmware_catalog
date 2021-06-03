const mqtt = require('mqtt');
const telemetrySchema = require('../schema/telemetry');
const Device = require('../model/device/device');
const Component = require('../model/component/component');
const influxClient = require('./influxclient')

function getMessageUid(message) {
	var str = "" + message;
	var parts = str.split(",");
	console.log("GET UID in message : " + message);
	if (parts.length > 1) {
		console.log("Parts " + parts.length);
		return parts[0];
	}
	return null;
}

function getValue(message, key) {
	var str = "" + message;
	var parts = str.split(",");
	var result = "";
	var n = -1;
	var i;
	
	console.log("GET value of " + key + " in message : " + str);
	for (i = 0; i < parts.length; i++) {
		n = parts[i].search(key + "=");
		if (n == 0) {
			result = parts[i].slice(key.length + 1);
			console.log("Found : " + result);
			return result;
		}
	}
	return (null);
}
/*
 * Process telemetry message from mqtt telemetry topic
 */
function processTelemetry(message) {
	var uid;
	var field = null;
	var fields = {};
	let components = [];

	console.log("Processing telemetry:");
	if ((uid = getMessageUid(message))) {
		console.log("GETTING DEVICE:");
		if (uid) {
			console.log("UID = " + uid);
			Device.findMatching(Device, {uid: uid}).then((_result) => {
				console.log("RESULT");
				console.log(_result);
				if (_result.length) {
					device = _result[0];

					Component.findMatching(Component, {device_id: device.id}).then((_result) => {
						if (_result.length) {
							for (var i = 0; i < _result.length; i ++) {
								field = getValue(message, _result[i].type);
								if (field) {
									fields[_result[i].type] = field;
								}
							}
						influxClient.insert("telemetry", {device_uid: uid}, fields);


						} else {
							console.log("Could not find components matching the received telemetry");
						}
						})
				} else {
					console.log("Could not find a device matching the received telemetry");
				}
			}).catch(err => {
				console.log("Could not find a device matching the received telemetry", err);
			});
		}
	}
}

class mqttClient {
	static _mqttClient = null;
	static _influx = null;

	
    static init(mqtt_broker, mqtt_client_id) {
		if (this._mqttClient == null)
			this._mqttClient = mqtt.connect(mqtt_broker, mqtt_client_id);
		this._mqttClient.on("connect",function(){	
			console.log("MQTT connected ");
		})
	
		//handle errors
		this._mqttClient.on("error",function(error){
			console.log("Can't connect" + error);
		});
		this._influx = null;
		return this._mqttClient;
	};

	static start(client) {
		if (this._mqttClient && client) {
			this._influx = client;
	//handle incoming messages
			this._mqttClient.on('message',function(topic, message, packet){
				console.log("message is "+ message);
				console.log("topic is "+ topic);
				if (topic == "telemetry") {
					processTelemetry(message);
				} else if (topic == "register") {
					processTelemetry(message);
				}
			});	
			this._mqttClient.subscribe("telemetry",{qos:1});
			this._mqttClient.subscribe("register",{qos:1});
		}
	};

	static publish(topic, message) {
		if (this._mqttClient && this._influx) {
			this._mqttClient.subscribe(topic,message);
		}
	}

}
module.exports = mqttClient