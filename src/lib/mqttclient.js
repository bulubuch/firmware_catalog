const mqtt = require('mqtt');

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

	start() {
	
		this.mqttClient.subscribe("telemetry",{qos:1});
		this.mqttClient.subscribe("register",{qos:1});
	};

}
module.exports = mqttClient