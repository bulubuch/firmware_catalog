const mqtt = require('mqtt');
const telemetrySchema = require('../schema/telemetry');
const Device = require('../model/device/device');
const Component = require('../model/component/component');
class mqttClient {

    constructor(mqtt_broker, mqtt_client_id) {
		this.mqttClient = mqtt.connect(mqtt_broker, mqtt_client_id);
		this.mqttClient.on("connect",function(){	
			console.log("connected ");
		})
	
		//handle errors
		this.mqttClient.on("error",function(error){
			console.log("Can't connect" + error);
		});
	};

	/**
	 * Process telemetry message from mqtt telemetry topic
	 */
	processTelemetry(message) {
		var uid;
		var field = null;
		var fields = {};
		let components = [];

		console.log("Processing telemetry:");
		if ((uid = getMessageUid(message))) {
			console.log("GETTING DEVICE:");
			if (uid) {
				Device.findMatching({uid: uid}).then((_result) => {
					if (_result.length) {
						device = _result[0];
						Component.findMatching({device_id: device.id}).then((_result) => {
							if (_result.length) {
								components = _result;
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
	start() {
//handle incoming messages
		this.mqttClient.on('message',function(topic, message, packet){
			console.log("message is "+ message);
			console.log("topic is "+ topic);
			if (topic == "telemetry") {
				processTelemetry(message);
			}
			if (topic == "register") {
				telemetry.process(message);
			}
		});	
		this.mqttClient.subscribe("telemetry",{qos:1});
		this.mqttClient.subscribe("register",{qos:1});
	};

}
module.exports = mqttClient