const mqtt = require('mqtt')
const influxClient = require('./influxClient')
const settings = require('../../config/settings');

module.exports = class mqttClient {

	static _url;
	static _host;
	static _topics = {}
	static _client;

	/*
	**	mqttClient constructor
	**	Builded from server object
	*/

	static init({host, topics, url}) {
		this._topics = topics
		this._host = host
		this._url = url
		console.log("Initializing mqtt broker: " + this.url);
		if (this._client)
			return this._client
		this._client = mqtt.connect(this._url, settings.name);
		this._client.on("connect",function(){
			console.log("MQTT connected ");
			mqttClient.connect()
		})
		
		//handle errors
		this.client.on("error",function(error){
			console.log("Can't connect " + error);
		});
		return this._client
	}
	
	static get client() {
		if (this._client)
			return this._client
		return null
	}

	static connect() {
		//handle incoming messages
		this.client.on('message',function(topic, message, packet){
			mqttClient.processMessage(topic, message);
		});
		for (const topic in this._topics) {
			console.log("Registering topic " + topic);
			this._client.subscribe(topic,{qos:1});
		}
	}

	static subscribe(topic, callback) {
		//handle incoming messages
		this.client.subscribe(topic,{qos:1});
		if (!(this._topics.includes(topic))) {
			this._topics[topic] = callback
		}
	}

	/*
	* Process telemetry message from mqtt telemetry topic
	*/
	static processMessage(topic, message) {
		console.log("Processing Message:");
		console.log("topic: " + topic);
		console.log("message: " + message);
		if (mqttClient._topics) {
			mqttClient._topics[topic](message)
		}
	}		
}

function telemetryCB(message) {
	console.log("MQTT Received Telemetry message");
	console.log(message);
}